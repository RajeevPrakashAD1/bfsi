import Marquee from "react-fast-marquee";
import { HIRING_PARTNERS } from "@/data/site";

export default function PartnersStrip() {
  return (
    <section className="relative bg-navy py-16 border-t border-white/5" data-testid="partners-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-white/50 mb-8">
          <span className="h-px w-10 bg-gold/60" />
          Private Bank & Insurance Partners
        </div>
      </div>
      <div className="marquee-fade">
        <Marquee gradient={false} speed={30} pauseOnHover>
          {HIRING_PARTNERS.concat(HIRING_PARTNERS).map((p, i) => (
            <span
              key={i}
              className="mx-8 font-display text-2xl md:text-3xl text-white/70 hover:text-gold transition-colors whitespace-nowrap"
            >
              {p}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
