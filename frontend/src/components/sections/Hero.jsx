import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { IMAGES } from "@/data/site";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: 0,
    transition: { delay: 0.25 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-navy-deep grain">
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          src={IMAGES.hero}
          alt="Financial district skyline"
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/85 to-navy-deep" />
        <div className="absolute inset-0 radial-glow" />
      </div>

      {/* Framing corners */}
      <div className="pointer-events-none absolute inset-6 lg:inset-10 border border-white/8 z-10" />

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-10 pt-40 pb-24 min-h-[100svh] flex flex-col justify-center">
        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-white/70"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-gold">Est. Patna</span>
          <span>BFSI Training & Placement Institute</span>
        </motion.div>

        {/* Main headline - masked line by line */}
        <h1 className="mt-8 font-display text-[13vw] leading-[0.92] tracking-tight text-white sm:text-[9vw] lg:text-[7.5rem] max-w-6xl">
          {[
            <>Careers built</>,
            <>for the <em className="gold-gradient" style={{ fontStyle: "italic" }}>next</em></>,
            <>banking era.</>,
          ].map((txt, i) => (
            <span key={i} className="mask-line">
              <motion.span
                variants={line}
                initial="hidden"
                animate="show"
                custom={i}
                className="block will-change-transform"
              >
                {txt}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 max-w-xl text-white/70 text-lg leading-relaxed"
        >
          RivalEdge Ventures trains India's next generation of bankers, insurance
          professionals and financial advisors — with industry-written programs,
          placement drives and mentorship from BFSI veterans.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#apply"
            data-testid="hero-apply-btn"
            className="btn-gold rounded-full px-7 py-3.5 text-sm inline-flex items-center gap-2"
          >
            Apply for a program
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#programs"
            data-testid="hero-programs-btn"
            className="btn-outline-gold rounded-full px-7 py-3.5 text-sm inline-flex items-center gap-2"
          >
            Explore programs
          </a>
        </motion.div>

        {/* Floating info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl"
        >
          {[
            { k: "1,200+", v: "Students Placed" },
            { k: "60+", v: "Hiring Partners" },
            { k: "92%", v: "Placement Rate" },
            { k: "6", v: "Career Tracks" },
          ].map((s, i) => (
            <div key={i} className="border-l border-white/12 pl-4">
              <div className="font-display text-3xl text-white">{s.k}</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/60 mt-1">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Corner badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
        className="hidden lg:flex absolute bottom-14 right-14 z-20 items-center gap-2 text-white/60 text-[11px] uppercase tracking-[0.28em]"
      >
        <Sparkles className="h-3.5 w-3.5 text-gold" />
        Scroll to explore
      </motion.div>
    </section>
  );
}
