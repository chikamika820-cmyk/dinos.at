import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import DrinksSection from "./components/DrinksSection";
import GallerySection from "./components/GallerySection";
import TeamSection from "./components/TeamSection";
import ReservationSection from "./components/ReservationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import StickyMobileCTA from "./components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <DrinksSection />
        <GallerySection />
        <TeamSection />
        <ReservationSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
