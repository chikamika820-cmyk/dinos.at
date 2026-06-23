"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "./motion/Magnetic";
import { EASE_SMOOTH } from "@/app/lib/motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function fadeUp(delay = 0) {
  return {
    hidden: { opacity: 0, y: 22 },
    show:   { opacity: 1, y: 0, transition: { duration: 1.1, delay, ease: EASE } },
  };
}
function fadeIn(delay = 0, duration = 1.2) {
  return {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { duration, delay, ease: EASE } },
  };
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY   = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="noise"
      style={{ position: "relative", height: "100svh", minHeight: 680, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Background — cinematic dark bar interior */}
      <motion.div style={{ position: "absolute", inset: 0, y: imgY }}>
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 24, ease: "linear" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2200&q=90"
            alt="Dino's Apothecary Bar"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
        </motion.div>
      </motion.div>

      {/* Grading layers — cinematic dark grade */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,13,0.60)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,8,13,0.88) 0%, rgba(6,8,13,0.40) 40%, rgba(6,8,13,0.92) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 46%, transparent 20%, rgba(6,8,13,0.55) 100%)" }} />
      {/* Warm amber undertone */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(80,50,20,0.10)", mixBlendMode: "multiply" }} />

      {/* Curtain reveal on load */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.2, ease: EASE_SMOOTH, delay: 0.05 }}
        style={{ position: "absolute", inset: 0, left: 0, width: "50%", background: "var(--black)", transformOrigin: "left", zIndex: 50, pointerEvents: "none" }}
      />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.2, ease: EASE_SMOOTH, delay: 0.05 }}
        style={{ position: "absolute", inset: 0, left: "50%", width: "50%", background: "var(--black)", transformOrigin: "right", zIndex: 50, pointerEvents: "none" }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY, position: "relative", zIndex: 10, textAlign: "center", width: "100%", padding: "0 32px" }}
      >
        {/* Location eyebrow */}
        <motion.div
          initial="hidden" animate="show" variants={fadeIn(0.7)}
          style={{ marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}
        >
          <span style={{ display: "block", width: 28, height: 1, background: "var(--gold)", opacity: 0.5 }} />
          <span style={{
            fontSize: "0.54rem", letterSpacing: "0.42em", textTransform: "uppercase",
            color: "var(--gold)", fontFamily: "var(--font-sans)", opacity: 0.9,
          }}>
            Wien · 1. Bezirk · Seit 2019
          </span>
          <span style={{ display: "block", width: 28, height: 1, background: "var(--gold)", opacity: 0.5 }} />
        </motion.div>

        {/* Brand name — the visual hero */}
        <motion.div
          initial="hidden" animate="show" variants={fadeUp(0.85)}
          style={{ marginBottom: 16 }}
        >
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(4.5rem, 10vw, 8.5rem)",
            letterSpacing: "0.12em",
            color: "var(--text-1)",
            lineHeight: 1,
            textTransform: "uppercase",
          }}>
            Dino&apos;s
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial="hidden" animate="show" variants={fadeIn(1.05)}
          style={{ marginBottom: 52 }}
        >
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "var(--text-2)",
            fontWeight: 400,
          }}>
            Apothecary Bar
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial="hidden" animate="show" variants={fadeUp(1.2)}
          style={{ marginBottom: 60 }}
        >
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2.4vw, 1.75rem)",
            color: "var(--text-2)",
            lineHeight: 1.5,
            maxWidth: 480,
            margin: "0 auto",
            letterSpacing: "0.01em",
          }}>
            Die Kunst des perfekten Cocktails
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial="hidden" animate="show" variants={fadeUp(1.4)}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Magnetic>
            <button
              className="btn-gold"
              onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}
              style={{ fontSize: "0.6rem", padding: "15px 40px" }}
            >
              Tisch reservieren
            </button>
          </Magnetic>
          <button
            className="btn-outline"
            onClick={() => document.querySelector("#drinks")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontSize: "0.6rem", padding: "14px 40px" }}
          >
            Karte entdecken
          </button>
        </motion.div>

        {/* Falstaff note — minimal, bottom of hero */}
        <motion.div
          initial="hidden" animate="show" variants={fadeIn(1.7, 1.0)}
          style={{ marginTop: 72 }}
        >
          <p style={{
            fontSize: "0.52rem", letterSpacing: "0.35em", textTransform: "uppercase",
            color: "var(--text-3)", fontFamily: "var(--font-sans)",
          }}>
            Falstaff · Beste American Bar · 2023 · 2024 · 2025
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--border)" }} />
    </section>
  );
}
