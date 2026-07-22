import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { IMAGES } from "@/data/site";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: 0,
    transition: { delay: 0.25 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-navy-deep grain"
      data-testid="hero-section"
    >
      {/* Parallax layered background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img
          src={IMAGES.hero}
          alt="Premium financial towers at golden hour"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Navy tint + gold vignette layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-navy-deep/75 to-navy-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/30 to-transparent" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(60% 50% at 20% 40%, rgba(212,175,55,0.18) 0%, rgba(10,17,40,0) 60%)"
        }} />
      </motion.div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] z-[1]"
           style={{
             backgroundImage:
               "linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)",
             backgroundSize: "80px 80px",
             maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
             WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
           }}
      />

      {/* Framing corners */}
      <div className="pointer-events-none absolute inset-6 lg:inset-10 border border-white/8 z-10" />

      {/* Floating decorative badge (top-right) */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="hidden lg:flex absolute top-32 right-14 z-20 flex-col items-end gap-3"
      >
        <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/85">Batches Live</span>
        </div>
        <div className="glass rounded-md px-4 py-3 max-w-[220px]">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
            <TrendingUp className="h-3 w-3" /> Latest Placement
          </div>
          <div className="mt-2 font-display text-white text-lg leading-tight">Nishant Kumar</div>
          <div className="mt-1 text-[11px] text-white/60">HDFC Bank · Deputy Manager</div>
          <div className="mt-2 text-gold text-sm font-semibold">₹5.80 LPA</div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOp }}
        className="relative z-20 mx-auto max-w-7xl px-6 lg:px-10 pt-40 pb-24 min-h-[100svh] flex flex-col justify-center"
      >
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

        {/* Main headline */}
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
          className="mt-10 max-w-xl text-white/75 text-lg leading-relaxed"
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

        {/* Stats row */}
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
            { k: "5", v: "Career Tracks" },
          ].map((s, i) => (
            <div key={i} className="border-l border-white/12 pl-4">
              <div className="font-display text-3xl text-white">{s.k}</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/60 mt-1">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Corner scroll indicator */}
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
