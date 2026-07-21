import { motion } from "framer-motion";
import { Target, Compass, ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    n: "I.",
    label: "Integrity",
    body: "We coach students the way we'd coach our own family — no false promises, no shortcuts, just honest career work.",
  },
  {
    n: "II.",
    label: "Excellence",
    body: "Every classroom hour is auditable against real BFSI job descriptions. If it won't help you clear an interview, it doesn't make the cut.",
  },
  {
    n: "III.",
    label: "Access",
    body: "A pincode should never decide a career. RivalEdge exists so students from Patna get the same shot as students in Mumbai.",
  },
  {
    n: "IV.",
    label: "Partnership",
    body: "We treat recruiters as co-creators — their feedback shapes our syllabus, and our alumni become their most reliable hires.",
  },
];

export default function VisionMission() {
  return (
    <section
      id="vision-mission"
      className="relative bg-navy-deep py-32 lg:py-40 overflow-hidden"
      data-testid="vision-mission-section"
    >
      {/* subtle gold vignette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-gold/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Vision & Mission
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance">
            Why <em className="gold-gradient not-italic" style={{ fontStyle: "italic" }}>RivalEdge</em> exists.
          </h2>
        </div>

        {/* Vision + Mission cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative border border-white/10 bg-[#0b1330] p-10 lg:p-12 overflow-hidden group card-gold-hover"
            data-testid="vision-card"
          >
            <div className="absolute top-0 right-0 h-40 w-40 bg-gold/5 rounded-full blur-3xl" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 grid place-items-center rounded-full border border-gold/30 text-gold">
                  <Compass className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.32em] text-gold">Our Vision</span>
              </div>
              <span className="chapter-number text-2xl opacity-70">01.</span>
            </div>

            <h3 className="mt-10 font-display text-3xl md:text-4xl text-white leading-[1.05] text-balance">
              To become India's most trusted launchpad for BFSI careers.
            </h3>

            <p className="mt-6 text-white/70 leading-relaxed">
              We see a country where a determined student — regardless of city, college
              or background — walks into a branch, an NBFC or a wealth desk with the
              same confidence as any metro graduate. RivalEdge Ventures was founded to
              close that gap, one cohort at a time, until "banker from Patna" is a
              statement of pride, not a caveat.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative border border-white/10 bg-[#0b1330] p-10 lg:p-12 overflow-hidden group card-gold-hover"
            data-testid="mission-card"
          >
            <div className="absolute bottom-0 left-0 h-40 w-40 bg-gold/5 rounded-full blur-3xl" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 grid place-items-center rounded-full border border-gold/30 text-gold">
                  <Target className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.32em] text-gold">Our Mission</span>
              </div>
              <span className="chapter-number text-2xl opacity-70">02.</span>
            </div>

            <h3 className="mt-10 font-display text-3xl md:text-4xl text-white leading-[1.05] text-balance">
              Turn every ambitious learner into a job-ready BFSI professional.
            </h3>

            <p className="mt-6 text-white/70 leading-relaxed">
              We do it through industry-written curriculum, mentorship from working
              bankers, live case labs, mock recruiter drives and a placement engine
              that treats each student's first offer letter as our personal
              deliverable. We don't teach subjects — we build careers.
            </p>
          </motion.article>
        </div>

        {/* Core Values */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Core Values</div>
              <h3 className="mt-4 font-display text-3xl md:text-4xl text-white leading-tight">
                The four things we refuse to compromise on.
              </h3>
            </div>
            <a
              href="#apply"
              data-testid="vm-apply-btn"
              className="btn-outline-gold rounded-full px-6 py-2.5 text-sm inline-flex items-center gap-2 self-start md:self-auto"
            >
              Join the next cohort
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="border-t border-white/10 pt-6 group"
                data-testid={`value-${p.label.toLowerCase()}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="chapter-number text-2xl">{p.n}</span>
                  <div className="h-px flex-1 bg-white/10 group-hover:bg-gold/40 transition-colors" />
                </div>
                <h4 className="mt-4 font-display text-xl text-white leading-tight">
                  {p.label}
                </h4>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
