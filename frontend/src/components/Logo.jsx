import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Logo({ size = "md" }) {
  const heights = { sm: "h-9", md: "h-11", lg: "h-16", xl: "h-24" };
  const h = heights[size] || heights.md;

  return (
    <Link to="/" data-testid="brand-logo" className="flex items-center group">
      <motion.img
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        src="/rivaledge-logo.jpg"
        alt="RivalEdge Ventures Pvt Ltd"
        className={`${h} w-auto object-contain rounded-md shadow-[0_6px_24px_-8px_rgba(212,175,55,0.35)] group-hover:shadow-[0_10px_36px_-8px_rgba(212,175,55,0.55)] transition-shadow duration-500`}
      />
    </Link>
  );
}
