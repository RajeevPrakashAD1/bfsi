import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ variant = "light", size = "md", withText = true }) {
  const isSmall = size === "sm";
  const textColor = variant === "light" ? "text-white" : "text-navy";

  return (
    <Link to="/" data-testid="brand-logo" className="flex items-center gap-3 group">
      <motion.div
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="relative flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[#F0D97E] via-[#D4AF37] to-[#A6841F] shadow-[0_6px_24px_-6px_rgba(212,175,55,0.6)]">
          <ShieldCheck className="h-5 w-5 text-navy" strokeWidth={2.4} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-white/90" />
        </div>
      </motion.div>
      {withText && (
        <div className="leading-tight">
          <div className={`font-display text-lg ${textColor} tracking-tight`}>
            RivalEdge
          </div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold">
            Ventures
          </div>
        </div>
      )}
    </Link>
  );
}
