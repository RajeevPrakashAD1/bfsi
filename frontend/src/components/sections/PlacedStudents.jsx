import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, ArrowUpRight, Pause, Play } from "lucide-react";
import { PLACEMENTS } from "@/data/site";

const AUTOPLAY_MS = 3800;

export default function PlacedStudents() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const total = PLACEMENTS.length;
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  const goTo = (newIdx) => {
    setDir(newIdx > index ? 1 : -1);
    setIndex(((newIdx % total) + total) % total);
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const current = PLACEMENTS[index];

  return (
    <section
      id="placements"
      className="relative bg-navy-deep py-32 lg:py-40 overflow-hidden"
      data-testid="placements-section"
    >
      {/* subtle gold vignette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-gold/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-gold">
              <span className="h-px w-10 bg-gold/60" />
              Placement Wins
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight text-balance">
              Our students. <em className="gold-gradient not-italic" style={{ fontStyle: "italic" }}>Now bankers.</em>
            </h2>
            <p className="mt-6 text-white/60 max-w-xl leading-relaxed">
              Real offer letters, real designations, real packages. Every card below is a
              RivalEdge graduate who walked in as a student and walked out with a career.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Resume" : "Pause"}
              data-testid="placements-play-pause"
              className="h-11 w-11 grid place-items-center rounded-full border border-white/10 text-white/70 hover:text-gold hover:border-gold/50 transition"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button
              onClick={prev}
              aria-label="Previous"
              data-testid="placements-prev"
              className="h-11 w-11 grid place-items-center rounded-full border border-white/10 text-white/70 hover:text-gold hover:border-gold/50 transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              data-testid="placements-next"
              className="h-11 w-11 grid place-items-center rounded-full border border-white/10 text-white/70 hover:text-gold hover:border-gold/50 transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left: student poster */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6] w-full max-w-2xl mx-auto overflow-hidden bg-[#0b1330] border border-white/10">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.img
                  key={current.id}
                  src={current.img}
                  alt={`${current.name} placed at ${current.company}`}
                  custom={dir}
                  initial={{ opacity: 0, x: dir > 0 ? 40 : -40, scale: 1.02 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: dir > 0 ? -40 : 40, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  data-testid={`placement-poster-${current.id}`}
                />
              </AnimatePresence>

              {/* Subtle top gradient for badge legibility */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Corner trophy badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-navy-deep/85 backdrop-blur border border-gold/40 rounded-full px-3.5 py-1.5">
                <Trophy className="h-3.5 w-3.5 text-gold" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-gold">Placed</span>
              </div>

              {/* Slide index */}
              <div className="absolute bottom-4 right-4 bg-navy-deep/85 backdrop-blur border border-white/10 px-3 py-1 text-[11px] tracking-[0.24em] text-white/80">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-6 grid grid-cols-4 gap-3">
              {PLACEMENTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  data-testid={`placement-thumb-${p.id}`}
                  className={`relative aspect-[3/4] overflow-hidden border transition-all ${
                    i === index
                      ? "border-gold ring-2 ring-gold/40"
                      : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: details */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Success Story</div>
                <h3 className="mt-4 font-display text-5xl md:text-6xl text-white leading-[1.02] tracking-tight">
                  {current.name}
                </h3>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    className="h-10 min-w-10 px-3 rounded-md grid place-items-center font-display font-bold text-white text-sm"
                    style={{ background: `linear-gradient(135deg, ${current.color} 0%, ${current.color}CC 100%)` }}
                  >
                    {current.company.split(" ").map((w) => w[0]).slice(0, 3).join("")}
                  </span>
                  <div>
                    <div className="text-white font-medium">{current.company}</div>
                    <div className="text-white/50 text-xs uppercase tracking-widest">{current.role}</div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-white/50">Package Signed</div>
                    <div className="mt-1 font-display text-4xl gold-gradient">{current.package}</div>
                  </div>
                  <a
                    href="#apply"
                    data-testid="placements-cta"
                    className="btn-gold rounded-full px-5 py-3 text-xs inline-flex items-center gap-2"
                  >
                    Be Next
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Progress bar */}
                <div className="mt-10 h-0.5 w-full bg-white/8 relative overflow-hidden">
                  <motion.div
                    key={`bar-${current.id}-${paused}`}
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? "0%" : "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-gold"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
