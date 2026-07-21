import axios from "axios";

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
  const res = await api.post("/contact", data);
  return res.data;
}

export async function submitApplication(formData) {
  const res = await api.post("/applications", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
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
