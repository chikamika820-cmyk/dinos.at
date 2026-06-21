import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import DrinksSection from "./components/DrinksSection";
import GallerySection from "./components/GallerySection";
import ReservationSection from "./components/ReservationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import StickyMobileCTA from "./components/StickyMobileCTA";
import DesktopReservationCTA from "./components/DesktopReservationCTA";
import TinctureRail from "./components/TinctureRail";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <TinctureRail />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <DrinksSection />
        <GallerySection />
        <ReservationSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCTA />
      <DesktopReservationCTA />
    </>
  );
}
