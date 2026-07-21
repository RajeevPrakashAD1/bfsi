import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES, STATS, MANIFESTO } from "@/data/site";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-navy-deep text-white" data-testid="about-page">
      <Navbar />
      <main>
        {/* Hero for About */}
        <section className="relative min-h-[80vh] pt-40 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMAGES.about} alt="Classroom" className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/85 to-navy-deep" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              About RivalEdge Ventures
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight text-balance max-w-5xl"
            >
              We turn ambitious students into BFSI professionals.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed"
            >
              Since day one, RivalEdge Ventures has existed for one reason: to make
              banking, insurance and financial services careers accessible, fast and
              genuinely rewarding for students across India — especially those who
              refuse to be limited by their pincode.
            </motion.p>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-y border-white/8 bg-navy">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.v} className="border-l border-white/10 pl-6">
                <div className="font-display text-4xl text-white">{s.k}</div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/60 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Chapter One</div>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.02] tracking-tight">
                What we do.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-white/75 text-lg leading-relaxed">
              <p>
                RivalEdge Ventures is a specialist banking and financial services training and
                placement company. We build career-first programs that combine classroom
                fundamentals, live case studies, tool-based labs and non-stop interview
                preparation — all designed with input from the recruiters we serve.
              </p>
              <p>
                Every cohort is deliberately small. Every student is coached individually.
                And every graduate is introduced to a rotating panel of hiring partners
                across banks, NBFCs, insurance houses and fintech firms. It's how we've
                built a placement track record that speaks for itself.
              </p>
              <p>
                We opened our doors in Patna with a simple belief: talent is evenly
                distributed, opportunity is not. RivalEdge is our answer to that gap.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-navy py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Chapter Two</div>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.02] tracking-tight">
                What we stand for.
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
              {MANIFESTO.map((m) => (
                <div key={m.n} className="border-t border-white/10 pt-8">
                  <div className="flex items-baseline gap-3">
                    <span className="chapter-number text-3xl">{m.n}</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl">{m.h}</h3>
                  <p className="mt-3 text-white/60 leading-relaxed">{m.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-4xl mx-auto text-balance">
              Ready to build a career in BFSI? <em className="gold-gradient not-italic" style={{ fontStyle: "italic" }}>Let's begin.</em>
            </h2>
            <Link
              to="/#apply"
              data-testid="about-cta-apply"
              className="mt-10 btn-gold rounded-full px-8 py-3.5 inline-flex items-center gap-2"
            >
              Apply Now <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
