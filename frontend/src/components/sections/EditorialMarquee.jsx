import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";

const items = [
  "BFSI Excellence",
  "Top Placements",
  "Industry Veterans",
  "Career Aligned Curriculum",
  "60+ Hiring Partners",
  "Live Mock Drills",
  "Since Patna",
  "Backed by Recruiters",
];

export default function EditorialMarquee() {
  return (
    <div className="relative border-y border-white/8 bg-navy-deep py-8 overflow-hidden marquee-fade" data-testid="editorial-marquee">
      <Marquee gradient={false} speed={38} pauseOnHover>
        {items.concat(items).map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-14 font-display italic text-4xl md:text-5xl lg:text-6xl text-white/85"
          >
            <Star className="h-6 w-6 text-gold shrink-0" strokeWidth={1.2} />
            {t}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
