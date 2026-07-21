import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import EditorialMarquee from "@/components/sections/EditorialMarquee";
import AboutIntro from "@/components/sections/AboutIntro";
import Programs from "@/components/sections/Programs";
import Team from "@/components/sections/Team";
import PartnersStrip from "@/components/sections/PartnersStrip";
import ApplyForm from "@/components/sections/ApplyForm";
import Contact from "@/components/sections/Contact";

export default function Landing() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-navy-deep text-white" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <EditorialMarquee />
        <AboutIntro />
        <Programs />
        <PartnersStrip />
        <Team />
        <ApplyForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
