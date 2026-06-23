"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./motion/Reveal";
import ChapterEyebrow from "./motion/ChapterEyebrow";
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from "@/app/lib/motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const STATS = [
  ["4×",   "Falstaff"],
  ["150+", "Cocktails"],
  ["300+", "Spirituosen"],
  ["2019", "Gegründet"],
];

export default function AboutSection() {
  return (
    <section id="about" className="section-pad noise" style={{ background: "var(--surface-1)", position: "relative", overflow: "hidden" }}>

      {/* Ambient */}
      <div style={{ position: "absolute", top: "60%", right: "-5%", width: "35%", height: "50%", background: "radial-gradient(ellipse, rgba(154,124,63,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 6vw, 96px)", alignItems: "center" }} className="about-grid">

          {/* Image */}
          <Reveal variants={scaleIn} style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=1000&q=90"
                alt="Bartender Craft"
                fill
                style={{
                  objectFit: "cover", objectPosition: "center top",
                  transition: "transform 1.0s var(--ease-smooth)",
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,8,13,0.55) 0%, transparent 50%)" }} />
            </div>

            {/* Floating award */}
            <Reveal delay={0.3} style={{
              position: "absolute", bottom: -24, right: -20,
              background: "var(--black)",
              border: "1px solid var(--border-mid)",
              padding: "24px 28px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            }}>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.6rem", color: "var(--gold)", lineHeight: 1, fontWeight: 300, marginBottom: 4 }}>
                4×
              </div>
              <div style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)" }}>
                Falstaff Award
              </div>
              <div style={{ fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-4)", fontFamily: "var(--font-sans)", marginTop: 2 }}>
                Beste American Bar
              </div>
            </Reveal>
          </Reveal>

          {/* Text */}
          <div>
            <ChapterEyebrow roman="I" style={{ marginBottom: 28 }}>Herkunft</ChapterEyebrow>

            <Reveal delay={0.1}>
              <h2 style={{
                fontFamily: "var(--font-cormorant)", fontWeight: 300,
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", lineHeight: 1.08,
                color: "var(--text-1)", marginBottom: 28, letterSpacing: "-0.005em",
              }}>
                Mehr als eine Bar —<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>eine Erfahrung</em>
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="t-body" style={{ marginBottom: 18 }}>
                Im Herzen des ersten Bezirks hat Heinz Kaiser einen Ort erschaffen,
                der die Grenzen zwischen Bar, Labor und Wohnzimmer aufhebt.
                Dino&apos;s Apothecary Bar steht für die Philosophie, dass jeder Drink
                eine Geschichte erzählt.
              </p>
              <p className="t-body" style={{ marginBottom: 36 }}>
                Unsere Cocktails entstehen aus handverlesenen Zutaten, klassischen
                Techniken und dem unaufhörlichen Streben nach dem Außergewöhnlichen —
                ausgezeichnet mit vier Falstaff-Awards.
              </p>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.26} style={{ borderLeft: "1px solid var(--gold)", paddingLeft: 24, marginBottom: 48, opacity: 0.9 }}>
              <p style={{
                fontFamily: "var(--font-cormorant)", fontStyle: "italic",
                fontSize: "clamp(1.05rem, 2vw, 1.35rem)", fontWeight: 300,
                color: "var(--text-1)", lineHeight: 1.6,
              }}>
                „Ein guter Cocktail ist kein Zufall –<br />
                er ist das Ergebnis von Leidenschaft<br />
                und dem richtigen Moment.&rdquo;
              </p>
              <p style={{ fontSize: "0.56rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)", marginTop: 14 }}>
                Heinz Kaiser · Bartender des Jahres 2024
              </p>
            </Reveal>

            {/* Stats */}
            <motion.div
              initial="hidden" whileInView="show" viewport={viewportOnce}
              variants={staggerContainer(0.08, 0.05)}
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--border)", gap: 1, background: "var(--border)" }}
              className="about-stats"
            >
              {STATS.map(([v, l]) => (
                <motion.div
                  key={l}
                  variants={fadeUp}
                  style={{
                    padding: "24px 12px", background: "var(--surface-1)",
                    textAlign: "center", transition: "background 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--surface-1)")}
                >
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: "0.52rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--text-3)", marginTop: 7, fontFamily: "var(--font-sans)" }}>{l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
