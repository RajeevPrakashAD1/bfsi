import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, IndianRupee, Briefcase, Clock, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { COURSES } from "@/data/site";

export default function Programs() {
  const [openBank, setOpenBank] = useState(null); // { course, bank }

  return (
    <section id="programs" className="relative bg-navy py-32 lg:py-40" data-testid="programs-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold">
              <span className="h-px w-10 bg-gold/60" />
              Programs
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance">
              Five career tracks. <em className="gold-gradient not-italic" style={{ fontStyle: "italic" }}>One placement engine.</em>
            </h2>
          </div>
          <p className="text-white/60 max-w-md">
            Each track is short, intense and recruiter-aligned — with a clear fee,
            expected salary band and duration up-front. Pick what fits your goal.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`program-card-${c.id}`}
              className="card-gold-hover group relative border border-white/10 bg-[#0b1330] p-8 flex flex-col h-full min-h-[500px]"
            >
              <div className="flex items-start justify-between">
                <span className="chapter-number text-4xl">{c.number}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold border border-gold/40 rounded-full px-3 py-1">
                  {c.tag}
                </span>
              </div>

              <h3 className="mt-8 font-display text-2xl text-white leading-tight">{c.title}</h3>
              <p className="mt-4 text-white/60 text-sm leading-relaxed">{c.description}</p>

              {/* Meta grid */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <MetaChip icon={<IndianRupee className="h-3.5 w-3.5" />} label="Fee" value={c.fee} />
                <MetaChip icon={<Briefcase className="h-3.5 w-3.5" />} label="Salary" value={c.salary} />
                <MetaChip icon={<Clock className="h-3.5 w-3.5" />} label="Duration" value={c.duration} />
              </div>

              {/* Highlights */}
              <ul className="mt-6 space-y-1.5">
                {c.highlights.map((h) => (
                  <li key={h} className="text-[13px] text-white/70 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Banks (only BRE) */}
              {c.banks && (
                <div className="mt-6">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-white/50 mb-3 flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-gold" /> Hiring Banks — tap to learn more
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {c.banks.map((b) => (
                      <button
                        key={b.code}
                        type="button"
                        onClick={() => setOpenBank({ course: c, bank: b })}
                        data-testid={`bre-bank-${b.code.toLowerCase()}`}
                        className="group/bank relative flex items-center justify-between border border-white/10 hover:border-gold/60 bg-white/[0.02] hover:bg-gold/[0.06] px-3 py-2 transition-all"
                      >
                        <div className="text-left">
                          <div className="text-sm font-semibold text-white group-hover/bank:text-gold transition-colors">{b.code}</div>
                          <div className="text-[9px] uppercase tracking-widest text-white/40">Know More</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white/40 group-hover/bank:text-gold group-hover/bank:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-white/50">{c.duration}</span>
                <a
                  href="#apply"
                  data-testid={`program-apply-${c.id}`}
                  className="inline-flex items-center gap-1.5 text-gold text-sm hover:text-gold-light"
                >
                  Enrol
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Bank Detail Modal */}
      <AnimatePresence>
        {openBank && <BankModal payload={openBank} onClose={() => setOpenBank(null)} />}
      </AnimatePresence>
    </section>
  );
}

function MetaChip({ icon, label, value }) {
  return (
    <div className="border border-white/8 bg-white/[0.02] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-gold text-[10px] uppercase tracking-[0.2em]">
        {icon} {label}
      </div>
      <div className="mt-1 text-[12px] text-white leading-tight">{value}</div>
    </div>
  );
}

function BankModal({ payload, onClose }) {
  const { course, bank } = payload;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      data-testid="bank-modal"
    >
      <div className="absolute inset-0 bg-navy-deep/85 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10 bg-[#0b1330] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* Header */}
        <div className="relative px-8 lg:px-12 pt-8 pb-6 border-b border-white/8">
          <button
            type="button"
            onClick={onClose}
            data-testid="bank-modal-close"
            className="absolute top-6 right-6 h-9 w-9 grid place-items-center rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4">
            <div
              className="h-14 w-14 rounded-md grid place-items-center font-display text-xl font-bold text-white shadow-lg shrink-0"
              style={{ background: `linear-gradient(135deg, ${bank.color} 0%, ${bank.color}CC 100%)` }}
            >
              {bank.code}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{bank.tag}</div>
              <h3 className="mt-1 font-display text-2xl lg:text-3xl text-white leading-tight">{bank.name}</h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 lg:px-12 py-8 space-y-8">
          <p className="text-white/75 leading-relaxed">{bank.intro}</p>

          {/* Role band */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <MetaChip icon={<Briefcase className="h-3.5 w-3.5" />} label="Role" value={bank.role} />
            <MetaChip icon={<IndianRupee className="h-3.5 w-3.5" />} label="Fee" value={course.fee} />
            <MetaChip icon={<Clock className="h-3.5 w-3.5" />} label="Training" value={course.duration} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-gold mb-4">Key Responsibilities</div>
              <ul className="space-y-3">
                {bank.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-white/80 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold mb-3">Eligibility</div>
                <p className="text-sm text-white/80 leading-relaxed">{bank.eligibility}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold mb-3">What You Get</div>
                <ul className="space-y-2">
                  {bank.perks.map((p) => (
                    <li key={p} className="text-sm text-white/80 flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/50">Expected Salary</div>
              <div className="mt-1 font-display text-xl text-white">{course.salary}</div>
            </div>
            <a
              href="#apply"
              onClick={onClose}
              data-testid={`bank-apply-${bank.code.toLowerCase()}`}
              className="btn-gold rounded-full px-6 py-3 text-sm inline-flex items-center gap-2"
            >
              Apply for {bank.code} placement
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
