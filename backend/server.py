from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends, Header
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import io
import logging
import tempfile
import httpx
import jwt as pyjwt
import bcrypt
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from openpyxl import Workbook

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase (PostgREST over HTTP: stateless, so no connection pool to leak on serverless)
SUPABASE_REST = f"{os.environ['SUPABASE_URL'].rstrip('/')}/rest/v1"
SUPABASE_KEY = os.environ['SUPABASE_SERVICE_ROLE_KEY']
SUPABASE_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}

# Email
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "RivalEdge Ventures")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "rivaledgeventuresinfo@gmail.com")

# Auth
JWT_SECRET = os.environ.get("JWT_SECRET", "change-me")
JWT_ALG = "HS256"
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin")

# App
app = FastAPI(title="RivalEdge Ventures API")
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# ---------- Models ----------
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str

class Application(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    phone: str
    city: str
    qualification: str
    course_interest: str
    experience: Optional[str] = None
    message: Optional[str] = None
    resume_filename: Optional[str] = None
    resume_size: Optional[int] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# ---------- Data access ----------
async def db_insert(table: str, row: dict) -> None:
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.post(f"{SUPABASE_REST}/{table}", headers=SUPABASE_HEADERS, json=row)
    if resp.status_code >= 400:
        logger.error(f"Supabase insert into {table} failed: {resp.status_code} {resp.text}")
        raise HTTPException(status_code=500, detail="Could not save your submission")


async def db_list(table: str, limit: int) -> List[dict]:
    params = {"select": "*", "order": "created_at.desc", "limit": str(limit)}
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.get(f"{SUPABASE_REST}/{table}", headers=SUPABASE_HEADERS, params=params)
    if resp.status_code >= 400:
        logger.error(f"Supabase read from {table} failed: {resp.status_code} {resp.text}")
        raise HTTPException(status_code=500, detail="Could not load records")
    return resp.json()


# ---------- Utils ----------
async def send_email(to_email: str, subject: str, html: str, reply_to: Optional[str] = None) -> bool:
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing; skipping email send")
        return False
    payload = {
        "to": [to_email],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
    }
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Email send error to {to_email}: {e}")
        return False


def create_token(sub: str) -> str:
    payload = {
        "sub": sub,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "iat": datetime.now(timezone.utc),
    }
    return pyjwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


def require_admin(authorization: Optional[str] = Header(None)) -> str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1]
    try:
        data = pyjwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        return data.get("sub", "")
    except pyjwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def brand_email_wrapper(title: str, body_html: str) -> str:
    return f"""
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr>
            <td style="background:#0A1128;padding:28px 32px;color:#ffffff;">
              <div style="font-size:12px;letter-spacing:3px;color:#D4AF37;text-transform:uppercase;">RivalEdge Ventures</div>
              <div style="font-size:24px;font-weight:700;margin-top:6px;">{title}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#111827;font-size:15px;line-height:1.6;">
              {body_html}
            </td>
          </tr>
          <tr>
            <td style="background:#0A1128;padding:20px 32px;color:#9ca3af;font-size:12px;">
              RivalEdge Ventures &middot; Vijay Nagar, near Bhootnath Metro Station, Patna, Bihar<br/>
              +91 9288194815 &middot; rivaledgeventuresinfo@gmail.com
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>
"""


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "RivalEdge Ventures API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "time": datetime.now(timezone.utc).isoformat()}


# --- Contact form ---
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactMessageCreate):
    if not payload.name.strip() or not payload.message.strip():
        raise HTTPException(status_code=400, detail="Name and message are required")
    msg = ContactMessage(**payload.model_dump())
    await db_insert("contact_messages", msg.model_dump())

    admin_body = f"""
    <p>You have received a new contact enquiry.</p>
    <table cellpadding="8" style="border-collapse:collapse;font-size:14px;">
      <tr><td><b>Name</b></td><td>{msg.name}</td></tr>
      <tr><td><b>Email</b></td><td>{msg.email}</td></tr>
      <tr><td><b>Phone</b></td><td>{msg.phone or '-'}</td></tr>
      <tr><td><b>Subject</b></td><td>{msg.subject or '-'}</td></tr>
      <tr><td valign="top"><b>Message</b></td><td>{msg.message}</td></tr>
    </table>
    """
    await send_email(ADMIN_EMAIL, f"New Enquiry — {msg.name}", brand_email_wrapper("New Contact Enquiry", admin_body), reply_to=str(msg.email))

    user_body = f"""
    <p>Hi {msg.name},</p>
    <p>Thank you for reaching out to RivalEdge Ventures. Our team has received your message and will get back to you shortly.</p>
    <p>For urgent queries, call us at <b>+91 9288194815</b>.</p>
    <p style="margin-top:24px;">Warm regards,<br/>Team RivalEdge Ventures</p>
    """
    await send_email(str(msg.email), "We received your message — RivalEdge Ventures", brand_email_wrapper("Thank you for contacting us", user_body))

    return msg


# --- Apply Now form (multipart with optional file) ---
@api_router.post("/applications", response_model=Application)
async def submit_application(
    full_name: str = Form(...),
    email: EmailStr = Form(...),
    phone: str = Form(...),
    city: str = Form(...),
    qualification: str = Form(...),
    course_interest: str = Form(...),
    experience: Optional[str] = Form(None),
    message: Optional[str] = Form(None),
    resume: Optional[UploadFile] = File(None),
):
    if not full_name.strip() or not phone.strip():
        raise HTTPException(status_code=400, detail="Full name and phone are required")

    resume_filename = None
    resume_size = None
    if resume is not None and resume.filename:
        # Basic secure handling: validate extension + size cap 5MB
        allowed_ext = {".pdf", ".doc", ".docx", ".rtf"}
        ext = os.path.splitext(resume.filename)[1].lower()
        if ext not in allowed_ext:
            raise HTTPException(status_code=400, detail="Resume must be PDF/DOC/DOCX/RTF")
        content = await resume.read()
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Resume exceeds 5MB limit")
        safe_name = f"{uuid.uuid4().hex}{ext}"
        # Serverless hosts give us a read-only app dir, so default to the temp dir.
        upload_dir = Path(os.environ.get("UPLOAD_DIR", tempfile.gettempdir())) / "uploads"
        upload_dir.mkdir(parents=True, exist_ok=True)
        (upload_dir / safe_name).write_bytes(content)
        resume_filename = safe_name
        resume_size = len(content)

    app_obj = Application(
        full_name=full_name.strip(),
        email=email,
        phone=phone.strip(),
        city=city.strip(),
        qualification=qualification.strip(),
        course_interest=course_interest.strip(),
        experience=(experience or "").strip() or None,
        message=(message or "").strip() or None,
        resume_filename=resume_filename,
        resume_size=resume_size,
    )
    await db_insert("applications", app_obj.model_dump())

    admin_body = f"""
    <p>A new student application has been submitted.</p>
    <table cellpadding="8" style="border-collapse:collapse;font-size:14px;">
      <tr><td><b>Name</b></td><td>{app_obj.full_name}</td></tr>
      <tr><td><b>Email</b></td><td>{app_obj.email}</td></tr>
      <tr><td><b>Phone</b></td><td>{app_obj.phone}</td></tr>
      <tr><td><b>City</b></td><td>{app_obj.city}</td></tr>
      <tr><td><b>Qualification</b></td><td>{app_obj.qualification}</td></tr>
      <tr><td><b>Course Interest</b></td><td>{app_obj.course_interest}</td></tr>
      <tr><td><b>Experience</b></td><td>{app_obj.experience or '-'}</td></tr>
      <tr><td valign="top"><b>Message</b></td><td>{app_obj.message or '-'}</td></tr>
      <tr><td><b>Resume</b></td><td>{'Attached (' + str(resume_size) + ' bytes)' if resume_filename else 'Not uploaded'}</td></tr>
    </table>
    """
    await send_email(ADMIN_EMAIL, f"New Application — {app_obj.full_name}", brand_email_wrapper("New Student Application", admin_body), reply_to=str(app_obj.email))

    user_body = f"""
    <p>Hi {app_obj.full_name},</p>
    <p>Your application for <b>{app_obj.course_interest}</b> has been submitted successfully.</p>
    <p>Our team will contact you soon to discuss the next steps, batch details, and career roadmap.</p>
    <p>For any questions, call us at <b>+91 9288194815</b>.</p>
    <p style="margin-top:24px;">Welcome aboard,<br/>Team RivalEdge Ventures</p>
    """
    await send_email(str(app_obj.email), "Application received — RivalEdge Ventures", brand_email_wrapper("Application Submitted Successfully", user_body))

    return app_obj


# --- Admin auth ---
@api_router.post("/admin/login", response_model=TokenResponse)
async def admin_login(payload: LoginRequest):
    if payload.username != ADMIN_USERNAME or payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return TokenResponse(access_token=create_token(payload.username))


@api_router.get("/admin/me")
async def admin_me(user: str = Depends(require_admin)):
    return {"username": user}


# --- Admin: list applications ---
@api_router.get("/admin/applications")
async def list_applications(_: str = Depends(require_admin)):
    return await db_list("applications", 1000)


@api_router.get("/admin/contacts")
async def list_contacts(_: str = Depends(require_admin)):
    return await db_list("contact_messages", 1000)


# --- Admin: export applications as Excel ---
@api_router.get("/admin/applications/export")
async def export_applications(_: str = Depends(require_admin)):
    docs = await db_list("applications", 5000)
    wb = Workbook()
    ws = wb.active
    ws.title = "Applications"
    headers = ["ID", "Full Name", "Email", "Phone", "City", "Qualification",
               "Course Interest", "Experience", "Message", "Resume File", "Submitted At"]
    ws.append(headers)
    for d in docs:
        ws.append([
            d.get("id", ""),
            d.get("full_name", ""),
            d.get("email", ""),
            d.get("phone", ""),
            d.get("city", ""),
            d.get("qualification", ""),
            d.get("course_interest", ""),
            d.get("experience", "") or "",
            d.get("message", "") or "",
            d.get("resume_filename", "") or "",
            d.get("created_at", ""),
        ])
    # Column widths
    for col_idx in range(1, len(headers) + 1):
        ws.column_dimensions[chr(64 + col_idx)].width = 22

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    filename = f"rivaledge_applications_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}.xlsx"
    return StreamingResponse(
        buf,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
