import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-navy-deep text-white" data-testid="privacy-page">
      <Navbar />
      <main className="pt-40 pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Legal</div>
          <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-white/50 text-sm">Last updated: December 2026</p>

          <div className="mt-12 space-y-6 text-white/75 leading-relaxed">
            <p>
              RivalEdge Ventures ("we", "our", "us") respects your privacy. This policy explains what
              information we collect when you visit rivaledgeventures.com or submit our forms, and how
              we use it.
            </p>
            <Section title="1. Information we collect">
              We collect the information you voluntarily provide through the Apply Now form (name, email,
              phone, city, qualification, program interest, resume) and the Contact form (name, email,
              phone, subject, message).
            </Section>
            <Section title="2. How we use it">
              To respond to enquiries, share program details, schedule counselling calls, process
              applications, and connect qualifying candidates with our hiring partners.
            </Section>
            <Section title="3. Storage & security">
              Your data is stored in a secured database. Uploaded resumes are stored in an access-controlled
              location and shared only with the RivalEdge admissions and placement team.
            </Section>
            <Section title="4. Third-party services">
              We use a managed email service to send transactional confirmations. We do not sell or rent
              your personal information to any third party.
            </Section>
            <Section title="5. Your rights">
              You may write to us at rivaledgeventuresinfo@gmail.com to request access, correction or
              deletion of your data.
            </Section>
            <Section title="6. Contact">
              For any privacy-related questions, contact us at +91 9288194815 or
              rivaledgeventuresinfo@gmail.com.
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <h2 className="font-display text-2xl text-white">{title}</h2>
      <p className="mt-3 text-white/70">{children}</p>
    </div>
  );
}
