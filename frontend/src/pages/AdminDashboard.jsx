import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, LogOut, RefreshCw, Loader2, FileText, Mail as MailIcon } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { fetchApplications, fetchContacts, downloadApplicationsExcel } from "@/lib/api";

export default function AdminDashboard() {
  const [tab, setTab] = useState("applications");
  const [apps, setApps] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const nav = useNavigate();

  const load = useCallback(async () => {
    if (!localStorage.getItem("re_admin_token")) {
      nav("/admin/login");
      return;
    }
    setLoading(true);
    try {
      const [a, c] = await Promise.all([fetchApplications(), fetchContacts()]);
      setApps(a || []);
      setContacts(c || []);
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("re_admin_token");
        nav("/admin/login");
        return;
      }
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [nav]);

  useEffect(() => { load(); }, [load]);

  const logout = () => {
    localStorage.removeItem("re_admin_token");
    nav("/admin/login");
  };

  const onExport = async () => {
    setExporting(true);
    try {
      await downloadApplicationsExcel();
      toast.success("Excel downloaded.");
    } catch (err) {
      toast.error("Export failed.");
    } finally {
      setExporting(false);
    }
  };

  const rows = tab === "applications" ? apps : contacts;

  return (
    <div className="min-h-screen bg-navy-deep text-white" data-testid="admin-dashboard-page">
      <header className="glass-strong sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <button onClick={load} data-testid="admin-refresh-btn" className="btn-outline-gold rounded-full px-4 py-2 text-sm inline-flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={logout} data-testid="admin-logout-btn" className="text-white/70 hover:text-white text-sm inline-flex items-center gap-2 px-3 py-2">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24">
        <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Admin</div>
        <h1 className="mt-4 font-display text-5xl tracking-tight">Dashboard.</h1>
        <p className="mt-3 text-white/60">Review student applications and contact messages. Export applications to Excel.</p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <TabBtn active={tab === "applications"} onClick={() => setTab("applications")} testid="tab-applications">
              <FileText className="h-4 w-4" /> Applications ({apps.length})
            </TabBtn>
            <TabBtn active={tab === "contacts"} onClick={() => setTab("contacts")} testid="tab-contacts">
              <MailIcon className="h-4 w-4" /> Contacts ({contacts.length})
            </TabBtn>
          </div>
          {tab === "applications" && (
            <button
              onClick={onExport}
              disabled={exporting}
              data-testid="admin-export-btn"
              className="btn-gold rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 disabled:opacity-60"
            >
              {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Export Excel
            </button>
          )}
        </div>

        <div className="mt-8 border border-white/10 overflow-x-auto">
          {loading ? (
            <div className="p-16 text-center text-white/60"><Loader2 className="h-6 w-6 mx-auto animate-spin" /></div>
          ) : rows.length === 0 ? (
            <div className="p-16 text-center text-white/60">No records yet.</div>
          ) : tab === "applications" ? (
            <table className="w-full text-sm" data-testid="applications-table">
              <thead className="bg-[#0b1330] text-[10px] uppercase tracking-[0.2em] text-gold">
                <tr>
                  <Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>City</Th>
                  <Th>Qualification</Th><Th>Course</Th><Th>Resume</Th><Th>Submitted</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <Td className="text-white">{a.full_name}</Td>
                    <Td>{a.email}</Td>
                    <Td>{a.phone}</Td>
                    <Td>{a.city}</Td>
                    <Td>{a.qualification}</Td>
                    <Td>{a.course_interest}</Td>
                    <Td>{a.resume_filename ? "Uploaded" : "-"}</Td>
                    <Td>{new Date(a.created_at).toLocaleString()}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm" data-testid="contacts-table">
              <thead className="bg-[#0b1330] text-[10px] uppercase tracking-[0.2em] text-gold">
                <tr>
                  <Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>Subject</Th><Th>Message</Th><Th>Submitted</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <Td className="text-white">{c.name}</Td>
                    <Td>{c.email}</Td>
                    <Td>{c.phone || "-"}</Td>
                    <Td>{c.subject || "-"}</Td>
                    <Td className="max-w-xs truncate">{c.message}</Td>
                    <Td>{new Date(c.created_at).toLocaleString()}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

function TabBtn({ active, onClick, children, testid }) {
  return (
    <button
      onClick={onClick}
      data-testid={testid}
      className={`px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2 border transition ${
        active ? "bg-gold text-navy-deep border-gold" : "border-white/10 text-white/70 hover:text-white hover:border-white/30"
      }`}
    >
      {children}
    </button>
  );
}

function Th({ children }) { return <th className="text-left px-4 py-3 font-semibold">{children}</th>; }
function Td({ children, className = "" }) { return <td className={`px-4 py-3 text-white/75 ${className}`}>{children}</td>; }
