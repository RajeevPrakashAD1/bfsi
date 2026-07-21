import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { adminLogin } from "@/lib/api";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("re_admin_token")) nav("/admin");
  }, [nav]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(form.username, form.password);
      localStorage.setItem("re_admin_token", res.access_token);
      toast.success("Logged in.");
      nav("/admin");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Login failed";
      toast.error(typeof msg === "string" ? msg : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-deep grain relative flex items-center justify-center px-6" data-testid="admin-login-page">
      <div className="absolute inset-0 radial-glow" />
      <div className="relative w-full max-w-md">
        <div className="mb-8"><Logo /></div>
        <form
          onSubmit={onSubmit}
          className="border border-white/10 bg-[#0b1330]/70 backdrop-blur-xl p-10"
          data-testid="admin-login-form"
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-gold">
            <Lock className="h-3.5 w-3.5" />
            Admin Portal
          </div>
          <h1 className="mt-4 font-display text-3xl text-white">Sign in.</h1>
          <p className="mt-2 text-white/60 text-sm">Access the applications dashboard.</p>

          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-[0.24em] text-white/60">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
                data-testid="admin-username-input"
                className="bg-transparent border-b border-white/15 text-white py-2.5 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-[0.24em] text-white/60">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                data-testid="admin-password-input"
                className="bg-transparent border-b border-white/15 text-white py-2.5 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-btn"
            className="mt-10 w-full btn-gold rounded-full py-3.5 inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
