import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";
import { BRAND } from "@/data/site";

const empty = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Message sent. We'll get back to you shortly.");
      setForm(empty);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Failed to send message.";
      toast.error(typeof msg === "string" ? msg : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-navy-deep py-32 lg:py-40" data-testid="contact-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Contact
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance">
            Talk to a career advisor.
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-md leading-relaxed">
            Have questions about programs, batches or placements? Reach out — we'll get
            back within one working day.
          </p>

          <div className="mt-10 space-y-6">
            <ContactRow icon={<Phone className="h-5 w-5" />} label="Phone" value={BRAND.phone} href={`tel:${BRAND.phone.replace(/\s/g, "")}`} testid="contact-phone" />
            <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} testid="contact-email" />
            <ContactRow icon={<MapPin className="h-5 w-5" />} label="Location" value={BRAND.location} testid="contact-location" />
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={onSubmit}
          className="lg:col-span-7 border border-white/10 bg-[#0b1330]/70 backdrop-blur-xl p-8 lg:p-12"
          data-testid="contact-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field name="name" label="Name *" value={form.name} onChange={onChange} testid="contact-name" />
            <Field name="email" type="email" label="Email *" value={form.email} onChange={onChange} testid="contact-email-input" />
            <Field name="phone" label="Phone" value={form.phone} onChange={onChange} testid="contact-phone-input" />
            <Field name="subject" label="Subject" value={form.subject} onChange={onChange} testid="contact-subject" />
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-[0.24em] text-white/60">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={4}
                data-testid="contact-message"
                className="bg-transparent border-b border-white/15 text-white py-2.5 focus:outline-none resize-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            data-testid="contact-submit-btn"
            className="mt-10 btn-gold rounded-full px-8 py-3.5 inline-flex items-center gap-2 disabled:opacity-60"
          >
            {loading ? (<><Loader2 className="h-4 w-4 animate-spin" />Sending...</>) : <>Send Message</>}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href, testid }) {
  const content = (
    <div className="flex items-start gap-4 border-t border-white/10 pt-6 group" data-testid={testid}>
      <div className="text-gold mt-0.5">{icon}</div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.28em] text-white/50">{label}</div>
        <div className="mt-1 text-white group-hover:text-gold transition-colors">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function Field({ name, label, value, onChange, type = "text", testid }) {
  return (
    <div className="flex flex-col gap-1.5">
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
