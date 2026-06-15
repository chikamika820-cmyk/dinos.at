"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Über uns",    href: "#about" },
  { label: "Speisekarte", href: "#menu" },
  { label: "Getränke",    href: "#drinks" },
  { label: "Galerie",     href: "#gallery" },
  { label: "Team",        href: "#team" },
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
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "0.12em", color: "var(--gold)", lineHeight: 1 }}>
            Dino's
          </div>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.55em", textTransform: "uppercase", color: "var(--text-3)", marginTop: 3 }}>
            Apothecary Bar
          </div>
        </button>

        {/* Desktop */}
        <ul style={{ display: "flex", gap: 36, listStyle: "none", alignItems: "center" }} className="hidden lg:flex">
          {NAV.map(l => (
            <li key={l.href}>
              <button onClick={() => go(l.href)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-2)", transition: "color 0.25s", fontFamily: "var(--font-sans)", fontWeight: 400 }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
              >{l.label}</button>
            </li>
          ))}
        </ul>

        <button onClick={() => go("#reservation")} className="btn-gold hidden lg:inline-flex" style={{ padding: "12px 28px", fontSize: "0.62rem" }}>
          Reservieren
        </button>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold)", padding: 8 }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "480px" : "0",
        transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
        background: "rgba(8,8,8,0.97)",
        backdropFilter: "blur(20px)",
      }} className="lg:hidden">
        <ul style={{ padding: "24px 32px 32px", display: "flex", flexDirection: "column", gap: 20, listStyle: "none" }}>
          {NAV.map(l => (
            <li key={l.href}>
              <button onClick={() => go(l.href)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", fontFamily: "var(--font-cormorant)", fontWeight: 300, color: "var(--text-1)", width: "100%", textAlign: "left" }}>
                {l.label}
              </button>
            </li>
          ))}
          <li style={{ marginTop: 8 }}>
            <button onClick={() => go("#reservation")} className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
              Reservieren
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
