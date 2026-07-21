"""Backend tests for RivalEdge Ventures API."""
import io
import os
import pytest
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load frontend .env to get public backend URL
load_dotenv(Path(__file__).resolve().parents[2] / "frontend" / ".env")
BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_USER = "admin"
ADMIN_PASS = "RivalEdge@2026"


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    return s


@pytest.fixture(scope="session")
def admin_token(session):
    r = session.post(f"{API}/admin/login", json={"username": ADMIN_USER, "password": ADMIN_PASS}, timeout=30)
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    tok = r.json().get("access_token")
    assert tok
    return tok


# ---------- Health ----------
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"

    def test_health(self, session):
        r = session.get(f"{API}/health", timeout=30)
        assert r.status_code == 200
        assert r.json().get("status") == "healthy"


# ---------- Contact ----------
class TestContact:
    def test_contact_success(self, session):
        payload = {
            "name": "TEST_Contact User",
            "email": "test_contact@example.com",
            "phone": "9999999999",
            "subject": "Test",
            "message": "Hello, this is a test message.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("id")
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]

    def test_contact_missing_name(self, session):
        r = session.post(f"{API}/contact", json={"name": "", "email": "a@b.com", "message": "hi"}, timeout=30)
        assert r.status_code == 400

    def test_contact_missing_message(self, session):
        r = session.post(f"{API}/contact", json={"name": "x", "email": "a@b.com", "message": ""}, timeout=30)
        assert r.status_code == 400


# ---------- Applications ----------
def _app_form(overrides=None):
    d = {
        "full_name": "TEST_Applicant",
        "email": "test_applicant@example.com",
        "phone": "9876543210",
        "city": "Patna",
        "qualification": "B.Com",
        "course_interest": "Banking & Insurance",
        "experience": "Fresher",
        "message": "Interested in banking program",
    }
    if overrides:
        d.update(overrides)
    return d


class TestApplications:
    def test_apply_success_with_pdf(self, session):
        pdf_bytes = b"%PDF-1.4\n%test pdf content\n%%EOF"
        files = {"resume": ("resume.pdf", pdf_bytes, "application/pdf")}
        r = session.post(f"{API}/applications", data=_app_form(), files=files, timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("id")
        assert data["full_name"] == "TEST_Applicant"
        assert data["resume_filename"]
        assert data["resume_size"] == len(pdf_bytes)
        # Store for later admin test
        pytest.created_app_id = data["id"]

    def test_apply_reject_exe(self, session):
        files = {"resume": ("virus.exe", b"MZ\x00binary", "application/octet-stream")}
        r = session.post(f"{API}/applications", data=_app_form(), files=files, timeout=30)
        assert r.status_code == 400

    def test_apply_reject_oversize(self, session):
        big = b"A" * (5 * 1024 * 1024 + 10)
        files = {"resume": ("big.pdf", big, "application/pdf")}
        r = session.post(f"{API}/applications", data=_app_form(), files=files, timeout=60)
        assert r.status_code == 400

    def test_apply_missing_required(self, session):
        # missing full_name & phone entirely -> FastAPI 422
        r = session.post(f"{API}/applications", data={"email": "a@b.com"}, timeout=30)
        assert r.status_code in (400, 422)

    def test_apply_empty_full_name(self, session):
        # Present but blank -> explicit 400 from route
        form = _app_form({"full_name": "   "})
        r = session.post(f"{API}/applications", data=form, timeout=30)
        assert r.status_code == 400


# ---------- Admin auth & protection ----------
class TestAdmin:
    def test_admin_login_wrong(self, session):
        r = session.post(f"{API}/admin/login", json={"username": "admin", "password": "wrong"}, timeout=30)
        assert r.status_code == 401

    def test_admin_login_correct(self, session):
        r = session.post(f"{API}/admin/login", json={"username": ADMIN_USER, "password": ADMIN_PASS}, timeout=30)
        assert r.status_code == 200
        assert r.json().get("access_token")

    def test_applications_requires_auth(self, session):
        r = session.get(f"{API}/admin/applications", timeout=30)
        assert r.status_code == 401

    def test_applications_with_auth(self, session, admin_token):
        r = session.get(f"{API}/admin/applications", headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
        assert r.status_code == 200
        docs = r.json()
        assert isinstance(docs, list)
        # verify our created application persisted
        ids = [d.get("id") for d in docs]
        created = getattr(pytest, "created_app_id", None)
        if created:
            assert created in ids, "Newly created application not returned"

    def test_contacts_requires_auth(self, session):
        r = session.get(f"{API}/admin/contacts", timeout=30)
        assert r.status_code == 401

    def test_contacts_with_auth(self, session, admin_token):
        r = session.get(f"{API}/admin/contacts", headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
        assert r.status_code == 200
        docs = r.json()
        assert isinstance(docs, list)
        names = [d.get("name") for d in docs]
        assert "TEST_Contact User" in names

    def test_excel_export(self, session, admin_token):
        r = session.get(f"{API}/admin/applications/export", headers={"Authorization": f"Bearer {admin_token}"}, timeout=60)
        assert r.status_code == 200
        assert r.headers.get("content-type", "").startswith(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        cd = r.headers.get("content-disposition", "")
        assert "attachment" in cd.lower()
        assert ".xlsx" in cd.lower()
        assert len(r.content) > 100  # non-empty file
