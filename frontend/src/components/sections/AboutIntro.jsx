import { motion } from "framer-motion";
import { IMAGES, MANIFESTO } from "@/data/site";

export default function AboutIntro() {
  return (
    <section className="relative bg-navy-deep py-32 lg:py-40 overflow-hidden" data-testid="about-intro-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: image — spotlight/clipped frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <div className="absolute inset-0 border border-gold/30" />
            <img
              src={IMAGES.about}
              alt="Students in modern classroom"
              className="h-full w-full object-cover"
              style={{ clipPath: "polygon(6% 0, 100% 0, 100% 94%, 94% 100%, 0 100%, 0 6%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent" style={{ clipPath: "polygon(6% 0, 100% 0, 100% 94%, 94% 100%, 0 100%, 0 6%)" }} />
          </div>
          <div className="absolute -bottom-6 -right-6 w-40 h-40 border border-gold/40 hidden lg:block" />
        </motion.div>

        {/* Right: copy + manifesto */}
        <div className="lg:col-span-7 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold"
          >
            <span className="h-px w-10 bg-gold/60" />
            The Institute
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance"
          >
            A career studio for the BFSI sector — built in Patna, wired to India.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            RivalEdge Ventures is a leading banking and financial services training and
            placement company. We help students build durable careers in the BFSI
            sector through industry-focused programs, hands-on labs, live mock drills
            and a dedicated placement engine that plugs directly into India's top
            recruiters.
          </motion.p>

          {/* Manifesto chapters */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            {MANIFESTO.map((m, i) => (
              <motion.div
                key={m.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="border-t border-white/10 pt-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="chapter-number text-3xl">{m.n}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-white leading-tight">
                  {m.h}
                </h3>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">{m.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
