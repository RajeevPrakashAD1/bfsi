import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-navy-deep text-white" data-testid="terms-page">
      <Navbar />
      <main className="pt-40 pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Legal</div>
          <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight">Terms & Conditions</h1>
          <p className="mt-4 text-white/50 text-sm">Last updated: December 2026</p>

          <div className="mt-12 space-y-6 text-white/75 leading-relaxed">
            <Section title="1. Programs & enrolment">
              Enrolment is confirmed on receipt of the program fee and completion of admission
              formalities. Batch schedules, program duration and curriculum are subject to periodic
              revision.
            </Section>
            <Section title="2. Placement support">
              RivalEdge Ventures provides placement assistance and interview opportunities. We do not
              guarantee an offer; placement outcomes depend on individual performance during recruiter
              drives.
            </Section>
            <Section title="3. Fees & refunds">
              Fees are payable as per the program schedule. Refund requests are reviewed on a case-by-case
              basis in line with our published refund policy.
            </Section>
            <Section title="4. Conduct">
              Learners are expected to maintain professional conduct on campus, in interviews and across
              all recruiter interactions. RivalEdge reserves the right to discontinue enrolment for
              breach of conduct.
            </Section>
            <Section title="5. Intellectual property">
              All course material, brand assets and content on this website are the property of RivalEdge
              Ventures and may not be reproduced without written consent.
            </Section>
            <Section title="6. Governing law">
              These terms are governed by the laws of India and disputes fall under the jurisdiction of
              Patna, Bihar.
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
