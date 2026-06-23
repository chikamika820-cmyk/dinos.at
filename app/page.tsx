import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FalstaffSection from "./components/FalstaffSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import DrinksSection from "./components/DrinksSection";
import GallerySection from "./components/GallerySection";
import ShopSection from "./components/ShopSection";
import ReservationSection from "./components/ReservationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import StickyMobileCTA from "./components/StickyMobileCTA";
import DesktopReservationCTA from "./components/DesktopReservationCTA";
import TinctureRail from "./components/TinctureRail";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <CartProvider>
      <CustomCursor />
      <TinctureRail />
      <Navbar />
      <CartDrawer />
      <main>
        <HeroSection />
        <FalstaffSection />
        <AboutSection />
        <MenuSection />
        <DrinksSection />
        <GallerySection />
        <ShopSection />
        <ReservationSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCTA />
      <DesktopReservationCTA />
    </CartProvider>
  );
}
