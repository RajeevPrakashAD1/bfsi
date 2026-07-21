import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COURSES } from "@/data/site";

export default function Programs() {
  return (
    <section id="programs" className="relative bg-navy py-32 lg:py-40" data-testid="programs-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold">
              <span className="h-px w-10 bg-gold/60" />
              Programs
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance">
              Six career tracks. <em className="gold-gradient not-italic" style={{ fontStyle: "italic" }}>One placement engine.</em>
            </h2>
          </div>
          <p className="text-white/60 max-w-md">
            Choose a program aligned with your goals. Every track ends with recruiter drives,
            interview readiness and placement support — not just a certificate.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((c, i) => (
            <motion.article
              key={c.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`program-card-${c.number}`}
              className="card-gold-hover group relative border border-white/10 bg-[#0b1330] p-8 flex flex-col h-full min-h-[360px]"
            >
              <div className="flex items-start justify-between">
                <span className="chapter-number text-4xl">{c.number}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold border border-gold/40 rounded-full px-3 py-1">
                  {c.tag}
                </span>
              </div>

              <h3 className="mt-8 font-display text-2xl text-white leading-tight">
                {c.title}
              </h3>
              <p className="mt-4 text-white/60 text-sm leading-relaxed flex-1">{c.description}</p>

              <ul className="mt-6 space-y-1.5">
                {c.highlights.map((h) => (
                  <li key={h} className="text-[13px] text-white/70 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-white/50">{c.duration}</span>
                <a
                  href="#apply"
                  data-testid={`program-apply-${c.number}`}
                  className="inline-flex items-center gap-1.5 text-gold text-sm group-hover:text-gold-light"
                >
                  Enrol
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
