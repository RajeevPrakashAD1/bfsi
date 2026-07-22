import { motion } from "framer-motion";
import { TEAM } from "@/data/site";

export default function Team() {
  return (
    <section id="team" className="relative bg-navy-deep py-28 lg:py-36" data-testid="team-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Our Team
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance">
            Bankers, mentors, matchmakers.
          </h2>
          <p className="mt-5 text-white/60 text-base max-w-2xl leading-relaxed">
            The people who make RivalEdge Ventures a career studio — not a classroom.
          </p>
        </div>

        {/* Horizontal single-row strip */}
        <div
          className="mt-12 -mx-6 lg:-mx-10 px-6 lg:px-10 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex gap-6 pb-4 items-start">
            {TEAM.map((m, i) => (
              <motion.figure
                key={m.role + m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={
                  m.featured
                    ? "group shrink-0 w-[240px] sm:w-[280px] lg:w-[320px] bg-gradient-to-b from-[#12204a] to-[#0b1330] border border-gold/40 shadow-[0_20px_60px_-20px_rgba(212,175,55,0.35)] overflow-hidden hover:border-gold/70 transition-all"
                    : "group shrink-0 w-[160px] sm:w-[175px] lg:w-[190px] flex flex-col items-center text-center px-2"
                }
                style={{ scrollSnapAlign: "start" }}
                data-testid={`team-card-${m.role.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {m.featured ? (
                  <>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={m.img}
                        alt={m.role}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
                      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.22em] text-gold bg-navy-deep/70 backdrop-blur border border-gold/25 px-2.5 py-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute top-3 right-3 text-[9px] uppercase tracking-[0.22em] text-navy-deep bg-gold px-2 py-1 font-semibold">
                        Leadership
                      </span>
                    </div>
                    <figcaption className="p-5">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold">{m.role}</div>
                      <div className="mt-0.5 font-display text-xl text-white leading-tight">{m.name}</div>
                      <p className="mt-2.5 text-white/55 text-xs leading-snug line-clamp-3">{m.bio}</p>
                    </figcaption>
                  </>
                ) : (
                  <>
                    <div className="relative w-[150px] sm:w-[165px] lg:w-[175px] aspect-square rounded-full overflow-hidden border-2 border-white/10 group-hover:border-gold/60 transition-all duration-500 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)]">
                      <img
                        src={m.img}
                        alt={m.role}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/5" />
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.22em] text-navy-deep bg-gold px-2 py-0.5 rounded-full shadow-md">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-5 w-full">
                      <div className="text-[9px] uppercase tracking-[0.22em] text-gold">{m.role}</div>
                      <div className="mt-1 font-display text-base text-white leading-tight">{m.name}</div>
                      <p className="mt-2 text-white/55 text-[11px] leading-snug line-clamp-2">{m.bio}</p>
                    </div>
                  </>
                )}
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-6 text-[10px] uppercase tracking-[0.28em] text-white/40">
          &larr; Scroll to explore the team &rarr;
        </div>
      </div>
    </section>
  );
}
