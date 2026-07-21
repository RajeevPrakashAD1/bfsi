import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { BRAND } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative bg-[#040814] pt-24 pb-10 border-t border-white/5" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 text-white/60 max-w-sm leading-relaxed">
              India's premium BFSI training and placement institute. Built for students
              who want a banking career — fast, deliberate and future-ready.
            </p>

            <a
              href="#apply"
              data-testid="footer-apply-btn"
              className="mt-8 inline-flex items-center gap-2 btn-gold rounded-full px-6 py-3 text-sm"
            >
              Apply Now
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold">Quick Links</div>
            <ul className="mt-6 space-y-3 text-white/70">
              <li><Link to="/" data-testid="footer-link-home" className="link-underline hover:text-white">Home</Link></li>
              <li><Link to="/about" data-testid="footer-link-about" className="link-underline hover:text-white">About Us</Link></li>
              <li><a href="/#programs" data-testid="footer-link-programs" className="link-underline hover:text-white">Programs</a></li>
              <li><a href="/#team" data-testid="footer-link-team" className="link-underline hover:text-white">Our Team</a></li>
              <li><a href="/#contact" data-testid="footer-link-contact" className="link-underline hover:text-white">Contact</a></li>
              <li><Link to="/privacy" data-testid="footer-link-privacy" className="link-underline hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" data-testid="footer-link-terms" className="link-underline hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold">Reach Us</div>
            <ul className="mt-6 space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-gold mt-1 shrink-0" />
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} data-testid="footer-phone" className="hover:text-white">{BRAND.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gold mt-1 shrink-0" />
                <a href={`mailto:${BRAND.email}`} data-testid="footer-email" className="hover:text-white break-all">{BRAND.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold mt-1 shrink-0" />
                <span data-testid="footer-location">{BRAND.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 gold-divider" />

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-white/40 text-sm" data-testid="footer-copyright">
            © 2026 RivalEdge Ventures. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <SocialLink href="https://facebook.com" label="Facebook" icon={<Facebook className="h-4 w-4" />} testid="social-facebook" />
            <SocialLink href="https://instagram.com" label="Instagram" icon={<Instagram className="h-4 w-4" />} testid="social-instagram" />
            <SocialLink href="https://linkedin.com" label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} testid="social-linkedin" />
            <SocialLink href="https://youtube.com" label="YouTube" icon={<Youtube className="h-4 w-4" />} testid="social-youtube" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon, testid }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-testid={testid}
      className="h-10 w-10 grid place-items-center rounded-full border border-white/10 text-white/70 hover:text-navy-deep hover:bg-gold hover:border-gold transition-all"
    >
      {icon}
    </a>
  );
}
