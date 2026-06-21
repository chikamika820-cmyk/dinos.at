"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "./motion/Magnetic";
import { EASE_SMOOTH, staggerContainer, wordReveal, fadeUp, withDelay } from "@/app/lib/motion";

const AWARDS = [
  "Falstaff · Beste American Bar 2025",
  "Falstaff · Beste American Bar 2024",
  "Falstaff · Bartender des Jahres 2024",
  "Falstaff · Beste American Bar 2023",
];

const LINE_1 = ["Die", "Kunst", "des"];
const LINE_2 = ["perfekten", "Cocktails"];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section ref={heroRef} className="noise" style={{ position: "relative", height: "100svh", minHeight: 640, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* Background image — scroll-linked parallax + slow ambient Ken Burns drift */}
      <motion.div
        style={{ position: "absolute", inset: 0, y: parallaxY, transformOrigin: "center top" }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1.16 }}
        transition={{ duration: 26, ease: "linear" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1800&q=85"
          alt="Dino's Apothecary Bar Interior"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          sizes="100vw"
        />
      </motion.div>

      {/* Layered overlays — deeper contrast, warm color grade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,7,0.78) 0%, rgba(10,8,7,0.5) 40%, rgba(10,8,7,0.88) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 50%, transparent 25%, rgba(10,8,7,0.58) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(184,112,62,0.06)", mixBlendMode: "multiply" }} />

      {/* Cabinet-door curtain reveal on load */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.05, ease: EASE_SMOOTH, delay: 0.15 }}
        style={{ position: "absolute", inset: 0, left: 0, width: "50%", background: "var(--black)", transformOrigin: "left", zIndex: 50, pointerEvents: "none" }}
      />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.05, ease: EASE_SMOOTH, delay: 0.15 }}
        style={{ position: "absolute", inset: 0, left: "50%", width: "50%", background: "var(--black)", transformOrigin: "right", zIndex: 50, pointerEvents: "none" }}
      />

      <motion.div style={{ opacity: fade, position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Vertical side text */}
        <motion.div
          initial="hidden" animate="show" variants={withDelay(fadeIn(), 1.0)}
          style={{
            position: "absolute", left: 32, top: "50%", transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "center center",
            fontSize: "0.55rem", letterSpacing: "0.5em", textTransform: "uppercase",
            color: "var(--text-3)", fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
          }}
        >
          Salzgries 19 · 1010 Wien · Österreich
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial="hidden" animate="show" variants={withDelay(fadeIn(), 1.2)}
          style={{
            position: "absolute", right: 32, top: "50%", transform: "translateY(-50%) rotate(90deg)",
            fontSize: "0.55rem", letterSpacing: "0.5em", textTransform: "uppercase",
            color: "var(--text-3)", fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          Scroll
          <span style={{ display: "block", width: 32, height: 1, background: "var(--text-3)" }} />
        </motion.div>

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 900, padding: "0 32px" }}>

          {/* Eyebrow */}
          <motion.div
            initial="hidden" animate="show" variants={withDelay(fadeUp, 0.55)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 40 }}
          >
            <span className="gold-rule" />
            <span className="t-eyebrow" style={{ letterSpacing: "0.45em" }}>℞ Wien · 1. Bezirk · Seit 2019</span>
            <span className="gold-rule" />
          </motion.div>

          {/* Headline — word-by-word stagger reveal */}
          <motion.h1
            initial="hidden" animate="show" variants={staggerContainer(0.07, 0.75)}
            style={{
              fontFamily: "var(--font-cormorant)", fontWeight: 300,
              fontSize: "clamp(4rem, 11vw, 9.5rem)",
              lineHeight: 0.98, letterSpacing: "-0.02em",
              color: "var(--text-1)", marginBottom: 32,
            }}
          >
            {LINE_1.map((w, i) => (
              <motion.span key={i} variants={wordReveal} style={{ display: "inline-block", marginRight: "0.28em" }}>{w}</motion.span>
            ))}
            <br />
            <em style={{ fontStyle: "italic" }}>
              {LINE_2.map((w, i) => (
                <motion.span key={i} variants={wordReveal} className="gold-text" style={{ display: "inline-block", marginRight: "0.28em" }}>{w}</motion.span>
              ))}
            </em>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial="hidden" animate="show" variants={withDelay(fadeUp, 1.15)}
            style={{
              fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--text-2)",
              marginBottom: 56, maxWidth: 520, margin: "0 auto 56px",
            }}
          >
            Handgefertigte Cocktails. Ausgewählte Spirituosen.<br />
            Atmosphäre, die unvergessliche Abende schafft.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden" animate="show" variants={withDelay(fadeUp, 1.35)}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Magnetic>
              <motion.button
                className="btn-gold" style={{ fontSize: "0.75rem", padding: "18px 44px" }}
                animate={{ boxShadow: ["0 8px 30px rgba(196,151,58,0.25)", "0 8px 48px rgba(196,151,58,0.5)", "0 8px 30px rgba(196,151,58,0.25)"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}
              >
                Tisch reservieren
              </motion.button>
            </Magnetic>
            <Magnetic strength={0.25} max={10}>
              <button className="btn-outline" onClick={() => document.querySelector("#drinks")?.scrollIntoView({ behavior: "smooth" })}>
                Karte entdecken
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Awards marquee strip */}
        <motion.div
          initial="hidden" animate="show" variants={withDelay(fadeIn(), 1.6)}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            borderTop: "1px solid var(--border)",
            background: "rgba(10,8,7,0.6)",
            backdropFilter: "blur(12px)",
            overflow: "hidden", padding: "14px 0",
          }}
        >
          <div style={{ display: "flex", gap: 80, animation: "marquee 22s linear infinite", width: "max-content" }}>
            {[...AWARDS, ...AWARDS, ...AWARDS, ...AWARDS].map((a, i) => (
              <span key={i} style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-3)", whiteSpace: "nowrap", fontFamily: "var(--font-sans)" }}>
                <span style={{ color: "var(--gold)", marginRight: 12 }}>℞</span>
                {a}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Opening hours pill */}
        <motion.div
          initial="hidden" animate="show" variants={withDelay(fadeIn(0.7), 1.75)}
          style={{ position: "absolute", bottom: 72, right: 40, flexDirection: "column", gap: 4 }}
          className="hidden lg:flex"
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
}

function fadeIn(targetOpacity = 1) {
  return {
    hidden: { opacity: 0 },
    show: { opacity: targetOpacity, transition: { duration: 1.0, ease: EASE_SMOOTH } },
  };
}
