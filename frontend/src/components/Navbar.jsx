import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { label: "Home", to: "/", hash: "#home" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/", hash: "#programs" },
  { label: "Placements", to: "/", hash: "#placements" },
  { label: "Team", to: "/", hash: "#team" },
  { label: "Contact", to: "/", hash: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (link) => {
    setOpen(false);
    if (link.hash && location.pathname === link.to) {
      const el = document.querySelector(link.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          scrolled ? "glass-strong" : "bg-transparent"
        }`}
        data-testid="site-navbar"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.hash ? `${l.to}${l.hash}` : l.to}
                onClick={() => goTo(l)}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className="text-sm text-white/80 hover:text-white link-underline transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/#apply"
              data-testid="nav-apply-btn"
              onClick={() => {
                if (location.pathname === "/") {
                  const el = document.querySelector("#apply");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="hidden md:inline-flex items-center gap-2 btn-gold rounded-full px-5 py-2.5 text-sm"
            >
              Apply Now
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((s) => !s)}
              className="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-white/10 text-white"
              data-testid="nav-mobile-toggle"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden glass-strong border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.hash ? `${l.to}${l.hash}` : l.to}
                  onClick={() => goTo(l)}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}`}
                  className="text-white/90 text-lg font-display"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/#apply"
                onClick={() => setOpen(false)}
                data-testid="nav-mobile-apply-btn"
                className="btn-gold rounded-full px-5 py-3 text-center mt-2"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
