"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./motion/Magnetic";
import { EASE_SMOOTH, DUR, staggerContainer, fadeUp } from "@/app/lib/motion";

const NAV = [
  { label: "Über uns",    href: "#about" },
  { label: "Speisekarte", href: "#menu" },
  { label: "Getränke",    href: "#drinks" },
  { label: "Galerie",     href: "#gallery" },
  { label: "Kontakt",     href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "background 0.5s, border-color 0.5s",
        background: scrolled ? "rgba(10,8,7,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "0.12em", color: "var(--gold)", lineHeight: 1 }}>
            Dino&apos;s
          </div>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.55em", textTransform: "uppercase", color: "var(--text-3)", marginTop: 3 }}>
            Apothecary Bar
          </div>
        </button>

        {/* Desktop */}
        <ul style={{ gap: 36, listStyle: "none", alignItems: "center" }} className="hidden lg:flex">
          {NAV.map(l => (
            <li key={l.href}>
              <button onClick={() => go(l.href)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-2)", transition: "color 0.25s", fontFamily: "var(--font-sans)", fontWeight: 400 }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
              >{l.label}</button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:inline-flex">
          <Magnetic strength={0.3} max={8}>
            <button onClick={() => go("#reservation")} className="btn-gold" style={{ padding: "12px 28px", fontSize: "0.62rem" }}>
              Reservieren
            </button>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold)", padding: 8 }} aria-label={open ? "Menü schließen" : "Menü öffnen"}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
            transition={{ duration: DUR.slow, ease: EASE_SMOOTH }}
            style={{ background: "rgba(10,8,7,0.97)", backdropFilter: "blur(20px)", overflow: "hidden" }}
          >
            <motion.ul
              variants={staggerContainer(0.06, 0.08)}
              initial="hidden"
              animate="show"
              style={{ padding: "24px 32px 32px", display: "flex", flexDirection: "column", gap: 20, listStyle: "none" }}
            >
              {NAV.map(l => (
                <motion.li key={l.href} variants={fadeUp}>
                  <button onClick={() => go(l.href)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", fontFamily: "var(--font-cormorant)", fontWeight: 300, color: "var(--text-1)", width: "100%", textAlign: "left" }}>
                    {l.label}
                  </button>
                </motion.li>
              ))}
              <motion.li variants={fadeUp} style={{ marginTop: 8 }}>
                <button onClick={() => go("#reservation")} className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                  Reservieren
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
