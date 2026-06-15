"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const AWARDS = [
  "Falstaff · Beste American Bar 2025",
  "Falstaff · Beste American Bar 2024",
  "Falstaff · Bartender des Jahres 2024",
  "Falstaff · Beste American Bar 2023",
];

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const parallax = scrollY * 0.35;

  return (
    <section ref={heroRef} style={{ position: "relative", height: "100svh", minHeight: 640, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* Background image with parallax */}
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${parallax}px)`, willChange: "transform", scale: "1.08", transformOrigin: "center top" }}>
        <Image
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1800&q=85"
          alt="Dino's Apothecary Bar Interior"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          sizes="100vw"
        />
      </div>

      {/* Layered overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.45) 40%, rgba(8,8,8,0.82) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(8,8,8,0.5) 100%)" }} />

      {/* Vertical side text */}
      <div style={{
        position: "absolute", left: 32, top: "50%", transform: "translateY(-50%) rotate(-90deg)",
        transformOrigin: "center center",
        fontSize: "0.55rem", letterSpacing: "0.5em", textTransform: "uppercase",
        color: "var(--text-3)", fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
        opacity: ready ? 1 : 0, transition: "opacity 1.5s 1s",
      }}>
        Salzgries 19 · 1010 Wien · Österreich
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", right: 32, top: "50%", transform: "translateY(-50%) rotate(90deg)",
        fontSize: "0.55rem", letterSpacing: "0.5em", textTransform: "uppercase",
        color: "var(--text-3)", fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
        opacity: ready ? 1 : 0, transition: "opacity 1.5s 1.2s",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        Scroll
        <span style={{ display: "block", width: 32, height: 1, background: "var(--text-3)" }} />
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 900, padding: "0 32px" }}>

        {/* Eyebrow */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 40,
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s 0.2s cubic-bezier(0.22,1,0.36,1), transform 0.9s 0.2s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <span className="gold-rule" />
          <span className="t-eyebrow" style={{ letterSpacing: "0.45em" }}>Wien · 1. Bezirk · Seit 2019</span>
          <span className="gold-rule" />
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-cormorant)", fontWeight: 300,
          fontSize: "clamp(3.8rem, 10vw, 8.5rem)",
          lineHeight: 1.0, letterSpacing: "-0.02em",
          color: "var(--text-1)", marginBottom: 32,
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s 0.4s cubic-bezier(0.22,1,0.36,1), transform 1s 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}>
          Die Kunst des<br />
          <em className="gold-text" style={{ fontStyle: "italic" }}>perfekten Cocktails</em>
        </h1>

        {/* Subline */}
        <p style={{
          fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic",
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--text-2)",
          marginBottom: 56, maxWidth: 520, margin: "0 auto 56px",
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.9s 0.65s cubic-bezier(0.22,1,0.36,1)",
        }}>
          Handgefertigte Cocktails. Ausgewählte Spirituosen.<br />
          Atmosphäre, die unvergessliche Abende schafft.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.9s 0.85s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <button className="btn-gold" onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}>
            Tisch reservieren
          </button>
          <button className="btn-outline" onClick={() => document.querySelector("#drinks")?.scrollIntoView({ behavior: "smooth" })}>
            Karte entdecken
          </button>
        </div>
      </div>

      {/* Awards marquee strip */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        borderTop: "1px solid var(--border)",
        background: "rgba(8,8,8,0.6)",
        backdropFilter: "blur(12px)",
        overflow: "hidden", padding: "14px 0",
        opacity: ready ? 1 : 0, transition: "opacity 1s 1.4s",
      }}>
        <div style={{ display: "flex", gap: 80, animation: "marquee 22s linear infinite", width: "max-content" }}>
          {[...AWARDS, ...AWARDS, ...AWARDS, ...AWARDS].map((a, i) => (
            <span key={i} style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-3)", whiteSpace: "nowrap", fontFamily: "var(--font-sans)" }}>
              <span style={{ color: "var(--gold)", marginRight: 12 }}>✦</span>
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Opening hours pill */}
      <div style={{
        position: "absolute", bottom: 72, right: 40,
        display: "flex", flexDirection: "column", gap: 4,
        opacity: ready ? 0.7 : 0, transition: "opacity 1s 1.6s",
      }} className="hidden lg:flex">
        {[
          { d: "Di–Do", t: "17–02" },
          { d: "Fr–Sa", t: "17–03" },
          { d: "So",    t: "20–00" },
        ].map(h => (
          <div key={h.d} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "var(--gold)", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>{h.d}</span>
            <span style={{ fontSize: "0.58rem", color: "var(--text-3)", fontFamily: "var(--font-sans)" }}>{h.t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
