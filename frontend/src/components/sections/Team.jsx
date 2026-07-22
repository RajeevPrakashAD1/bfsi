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
          <div className="flex gap-5 pb-4">
            {TEAM.map((m, i) => (
              <motion.figure
                key={m.role + m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`group shrink-0 border overflow-hidden hover:border-gold/50 transition-all ${
                  m.featured
                    ? "w-[240px] sm:w-[280px] lg:w-[320px] bg-gradient-to-b from-[#12204a] to-[#0b1330] border-gold/40 shadow-[0_20px_60px_-20px_rgba(212,175,55,0.35)]"
                    : "w-[140px] sm:w-[155px] lg:w-[170px] bg-[#0b1330] border-white/10"
                }`}
                style={{ scrollSnapAlign: "start" }}
                data-testid={`team-card-${m.role.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={`relative overflow-hidden ${m.featured ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                  <img
                    src={m.img}
                    alt={m.role}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
                  <span className={`absolute top-3 left-3 uppercase tracking-[0.22em] text-gold bg-navy-deep/70 backdrop-blur border border-gold/25 ${
                    m.featured ? "text-[10px] px-2.5 py-1" : "text-[9px] px-2 py-1"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {m.featured && (
                    <span className="absolute top-3 right-3 text-[9px] uppercase tracking-[0.22em] text-navy-deep bg-gold px-2 py-1 font-semibold">
                      Leadership
                    </span>
                  )}
                </div>
                <figcaption className={m.featured ? "p-5" : "p-3"}>
                  <div className={`uppercase tracking-[0.22em] text-gold ${m.featured ? "text-[10px]" : "text-[8.5px]"}`}>{m.role}</div>
                  <div className={`mt-0.5 font-display text-white leading-tight ${m.featured ? "text-xl" : "text-sm"}`}>{m.name}</div>
                  <p className={`text-white/55 leading-snug ${
                    m.featured ? "mt-2.5 text-xs line-clamp-3" : "mt-1.5 text-[10px] line-clamp-2"
                  }`}>{m.bio}</p>
                </figcaption>
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
