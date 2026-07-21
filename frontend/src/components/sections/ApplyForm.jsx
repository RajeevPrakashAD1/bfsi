import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitApplication } from "@/lib/api";
import { COURSES, IMAGES } from "@/data/site";

const emptyForm = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  qualification: "",
  course_interest: "",
  experience: "",
  message: "",
};

export default function ApplyForm() {
  const [form, setForm] = useState(emptyForm);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.city || !form.qualification || !form.course_interest) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (resume) fd.append("resume", resume);
      await submitApplication(fd);
      setDone(true);
      toast.success("Application submitted! Our team will contact you soon.");
      setForm(emptyForm);
      setResume(null);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" className="relative bg-navy py-32 lg:py-40 overflow-hidden" data-testid="apply-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 radial-glow opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: intro */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Apply Now
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance">
            Your first offer letter starts with this form.
          </h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-md">
            Submit your details and upload your resume. A career advisor will reach
            out with program details, batch schedule and next steps.
          </p>

          <div className="mt-10 relative hidden lg:block aspect-[4/3] overflow-hidden">
            <img src={IMAGES.banking} alt="Investment charts" className="h-full w-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
            <div className="absolute inset-0 border border-gold/25" />
          </div>
        </div>

        {/* Right: form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={onSubmit}
          className="lg:col-span-7 border border-white/10 bg-[#0b1330]/70 backdrop-blur-xl p-8 lg:p-12"
          data-testid="apply-form"
        >
          {done && (
            <div className="mb-6 flex items-center gap-3 border border-gold/40 bg-gold/5 p-4 text-gold">
              <CheckCircle2 className="h-5 w-5" />
              Application submitted successfully. Our team will contact you soon.
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput name="full_name" label="Full Name *" value={form.full_name} onChange={onChange} testid="apply-full-name" />
            <FormInput name="email" type="email" label="Email *" value={form.email} onChange={onChange} testid="apply-email" />
            <FormInput name="phone" label="Phone *" value={form.phone} onChange={onChange} testid="apply-phone" />
            <FormInput name="city" label="City *" value={form.city} onChange={onChange} testid="apply-city" />
            <FormInput name="qualification" label="Highest Qualification *" value={form.qualification} onChange={onChange} testid="apply-qualification" />
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-[0.24em] text-white/60">Course Interest *</label>
              <select
                name="course_interest"
                value={form.course_interest}
                onChange={onChange}
                data-testid="apply-course-interest"
                className="bg-transparent border-b border-white/15 text-white py-2.5 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-navy-deep">Select a program</option>
                {COURSES.map((c) => (
                  <option key={c.number} value={c.title} className="bg-navy-deep">
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <FormInput name="experience" label="Experience (optional)" value={form.experience} onChange={onChange} testid="apply-experience" full />
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-[0.24em] text-white/60">Message (optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={3}
                data-testid="apply-message"
                className="bg-transparent border-b border-white/15 text-white py-2.5 focus:outline-none resize-none"
              />
            </div>

            {/* File upload */}
            <div className="md:col-span-2">
              <label className="text-[11px] uppercase tracking-[0.24em] text-white/60">Resume (PDF/DOC, max 5MB)</label>
              <label
                className="mt-3 flex items-center justify-between gap-4 border border-dashed border-white/20 hover:border-gold/60 transition-colors px-5 py-4 cursor-pointer"
                data-testid="apply-resume-dropzone"
              >
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-gold" />
                  <span className="text-white/80 text-sm">
                    {resume ? resume.name : "Click to upload your resume"}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                  {resume ? `${(resume.size / 1024).toFixed(0)} KB` : "PDF · DOC · DOCX"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.rtf"
                  className="hidden"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  data-testid="apply-resume-input"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="apply-submit-btn"
            className="mt-10 btn-gold rounded-full px-8 py-3.5 inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>Submit Application</>
            )}
          </button>
          <p className="mt-4 text-xs text-white/40">By submitting you agree to be contacted by RivalEdge Ventures regarding program admissions.</p>
        </motion.form>
      </div>
    </section>
  );
}

function FormInput({ name, label, value, onChange, type = "text", testid, full }) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <label className="text-[11px] uppercase tracking-[0.24em] text-white/60">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        data-testid={testid}
        className="bg-transparent border-b border-white/15 text-white py-2.5 focus:outline-none"
      />
    </div>
  );
}
