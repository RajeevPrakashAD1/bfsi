import { motion } from "framer-motion";
import { TEAM } from "@/data/site";

export default function Team() {
  return (
    <section id="team" className="relative bg-navy-deep py-32 lg:py-40" data-testid="team-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Our Team
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance">
            Bankers, mentors, matchmakers.
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed">
            The people who make RivalEdge Ventures a career studio — not a classroom.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((m, i) => (
            <motion.figure
              key={m.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card-gold-hover group border border-white/10 bg-[#0b1330] overflow-hidden"
              data-testid={`team-card-${m.role.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={m.img}
                  alt={m.role}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gold bg-navy-deep/60 backdrop-blur px-3 py-1 border border-gold/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <figcaption className="p-6">
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{m.role}</div>
                <div className="mt-2 font-display text-xl text-white">{m.name}</div>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">{m.bio}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
