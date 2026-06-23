"use client";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./motion/Magnetic";
import { EASE_SMOOTH, DUR, staggerContainer, fadeUp } from "@/app/lib/motion";
import { useCart } from "@/app/context/CartContext";

const NAV = [
  { label: "Über uns",    href: "#about"  },
  { label: "Speisekarte", href: "#menu"   },
  { label: "Getränke",    href: "#drinks" },
  { label: "Galerie",     href: "#gallery"},
  { label: "Shop",        href: "#shop"   },
  { label: "Kontakt",     href: "#contact"},
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { state, dispatch }     = useCart();
  const cartCount = state.items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), open ? 350 : 0);
  };

  return (
    <>
      {/* Scoped responsive styles */}
      <style>{`
        .nav-desktop-links { display: none; }
        .nav-desktop-actions { display: none; }
        .nav-mobile-actions { display: flex; align-items: center; gap: 10px; }
        @media (min-width: 1024px) {
          .nav-desktop-links { display: flex; gap: 32px; list-style: none; align-items: center; }
          .nav-desktop-actions { display: flex; align-items: center; gap: 16px; }
          .nav-mobile-actions { display: none; }
        }
      `}</style>

      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "background 0.55s, border-color 0.55s, box-shadow 0.55s",
          background: scrolled ? "rgba(8,10,18,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <nav
          style={{
            maxWidth: 1360, margin: "0 auto", padding: "0 36px",
            height: 80, display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}
          >
            <div style={{
              fontFamily: "var(--font-cormorant)", fontWeight: 300,
              fontSize: "1.65rem", letterSpacing: "0.16em",
              color: "var(--gold)", lineHeight: 1,
            }}>
              Dino&apos;s
            </div>
            <div style={{
              fontSize: "0.5rem", letterSpacing: "0.58em", textTransform: "uppercase",
              color: "var(--text-3)", marginTop: 3, fontFamily: "var(--font-sans)",
            }}>
              Apothecary Bar · Wien
            </div>
          </button>

          {/* Desktop nav links */}
          <ul className="nav-desktop-links">
            {NAV.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase",
                    color: "var(--text-2)", transition: "color 0.22s",
                    fontFamily: "var(--font-sans)", fontWeight: 400,
                    padding: "4px 0",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop right actions */}
          <div className="nav-desktop-actions">
            {/* Cart icon */}
            <motion.button
              onClick={() => dispatch({ type: "OPEN" })}
              aria-label="Warenkorb öffnen"
              style={{
                position: "relative", width: 44, height: 44, background: "none",
                border: "1px solid var(--border)", cursor: "pointer",
                color: "var(--text-2)", display: "flex", alignItems: "center",
                justifyContent: "center", transition: "border-color 0.25s, color 0.25s",
              }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={e => { (e.currentTarget).style.borderColor = "var(--gold)"; (e.currentTarget).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget).style.borderColor = "var(--border)"; (e.currentTarget).style.color = "var(--text-2)"; }}
            >
              <ShoppingCart size={16} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      position: "absolute", top: -7, right: -7,
                      width: 18, height: 18, borderRadius: "50%",
                      background: "var(--gold)", color: "var(--black)",
                      fontSize: "0.55rem", fontFamily: "var(--font-sans)",
                      fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <Magnetic strength={0.3} max={8}>
              <button
                onClick={() => go("#reservation")}
                className="btn-gold"
                style={{ padding: "12px 28px", fontSize: "0.6rem" }}
              >
                Reservieren
              </button>
            </Magnetic>
          </div>

          {/* Mobile right actions */}
          <div className="nav-mobile-actions">
            <button
              onClick={() => dispatch({ type: "OPEN" })}
              aria-label="Warenkorb"
              style={{
                position: "relative", width: 40, height: 40, background: "none",
                border: "1px solid var(--border)", cursor: "pointer",
                color: "var(--text-2)", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <ShoppingCart size={15} />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -6, right: -6,
                  width: 16, height: 16, borderRadius: "50%",
                  background: "var(--gold)", color: "var(--black)",
                  fontSize: "0.5rem", fontFamily: "var(--font-sans)", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen(!open)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold)", padding: 6 }}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="drawer"
              initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
              transition={{ duration: DUR.slow + 0.1, ease: EASE_SMOOTH }}
              style={{ background: "rgba(8,10,18,0.97)", backdropFilter: "blur(24px)", display: "block" }}
              className="lg:hidden"
            >
              <motion.ul
                variants={staggerContainer(0.07, 0.05)}
                initial="hidden"
                animate="show"
                style={{ padding: "28px 36px 36px", display: "flex", flexDirection: "column", gap: 4, listStyle: "none" }}
              >
                {NAV.map(l => (
                  <motion.li key={l.href} variants={fadeUp}>
                    <button
                      onClick={() => go(l.href)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "1.8rem", fontFamily: "var(--font-cormorant)",
                        fontWeight: 300, color: "var(--text-1)",
                        width: "100%", textAlign: "left", padding: "12px 0",
                        borderBottom: "1px solid var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-1)")}
                    >
                      {l.label}
                      <span style={{ fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-3)", fontFamily: "var(--font-sans)" }}>→</span>
                    </button>
                  </motion.li>
                ))}
                <motion.li variants={fadeUp} style={{ marginTop: 20 }}>
                  <button
                    onClick={() => go("#reservation")}
                    className="btn-gold"
                    style={{ width: "100%", justifyContent: "center", fontSize: "0.65rem" }}
                  >
                    Tisch reservieren
                  </button>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
