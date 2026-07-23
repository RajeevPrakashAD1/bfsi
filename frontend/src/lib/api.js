import axios from "axios";

// Web3Forms: free form-to-email service. Submissions are emailed to the address
// registered with this access key. The key is public/client-safe by design.
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY =
  process.env.REACT_APP_WEB3FORMS_KEY || "8316aedb-4a0c-498a-b766-895295609d09";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const api = axios.create({ baseURL: API });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("re_admin_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;

export async function submitContact(data) {
  const res = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: "RivalEdge Ventures Website",
      subject: `New Contact Enquiry — ${data.name}`,
      ...data,
    }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Failed to send message.");
  return json;
}

export async function submitApplication(formData) {
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("from_name", "RivalEdge Ventures Website");
  formData.append("subject", `New Application — ${formData.get("full_name") || ""}`);
  const res = await fetch(WEB3FORMS_URL, { method: "POST", body: formData });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Failed to submit application.");
  return json;
}

export async function adminLogin(username, password) {
  const res = await api.post("/admin/login", { username, password });
  return res.data;
}

export async function fetchApplications() {
  const res = await api.get("/admin/applications");
  return res.data;
}

export async function fetchContacts() {
  const res = await api.get("/admin/contacts");
  return res.data;
}

export async function downloadApplicationsExcel() {
  const res = await api.get("/admin/applications/export", { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const a = document.createElement("a");
  a.href = url;
  a.download = `rivaledge_applications_${Date.now()}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
