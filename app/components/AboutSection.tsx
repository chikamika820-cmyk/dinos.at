"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./motion/Reveal";
import ChapterEyebrow from "./motion/ChapterEyebrow";
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from "@/app/lib/motion";

const STATS = [["150+", "Cocktails"], ["300+", "Spirituosen"], ["5+", "Jahre"]];

export default function AboutSection() {
  return (
    <section id="about" className="section-pad noise" style={{ background: "var(--surface-1)", position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 6vw, 100px)", alignItems: "center" }} className="about-grid">

          {/* Image column */}
          <Reveal variants={scaleIn} style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: 2 }}>
              <Image
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=85"
                alt="Bartender bei der Arbeit"
                fill
                style={{ objectFit: "cover", objectPosition: "center 20%", transition: "transform 0.8s var(--ease-smooth)" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,7,0.6) 0%, transparent 50%)" }} />
            </div>

            {/* Floating award card */}
            <Reveal
              delay={0.25}
              style={{ position: "absolute", bottom: -28, right: -24, background: "var(--black)", border: "1px solid var(--border-mid)", padding: "24px 28px", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
            >
              <div style={{ fontSize: "2.8rem", fontFamily: "var(--font-cormorant)", color: "var(--gold)", lineHeight: 1, fontWeight: 300 }}>3×</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-2)", marginTop: 4, fontFamily: "var(--font-sans)" }}>
                Falstaff Award
              </div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)" }}>
                Beste American Bar
              </div>
            </Reveal>
          </Reveal>

          {/* Text column */}
          <div>
            <ChapterEyebrow roman="I" style={{ marginBottom: 28 }}>Herkunft</ChapterEyebrow>

            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", lineHeight: 1.05, color: "var(--text-1)", marginBottom: 32 }}>
                Mehr als eine Bar —
                <br />
                <em className="gold-text" style={{ fontStyle: "italic" }}>eine Erfahrung</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="t-body" style={{ marginBottom: 20 }}>
                Im Herzen des ersten Bezirks hat Heinz Kaiser einen Ort erschaffen,
                der die Grenzen zwischen Bar, Labor und Wohnzimmer aufhebt.
                Dino&apos;s Apothecary Bar steht für die Philosophie, dass jeder Drink
                eine Geschichte erzählt.
              </p>
              <p className="t-body" style={{ marginBottom: 20 }}>
                Unsere Cocktails entstehen aus handverlesenen Zutaten, klassischen
                Techniken und dem unaufhörlichen Streben nach dem Außergewöhnlichen.
                Drei Falstaff-Awards in Folge und die Auszeichnung als
                „Bartender des Jahres 2024&rdquo; sprechen für sich.
              </p>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.3} style={{ borderLeft: "2px solid var(--gold)", paddingLeft: 24, marginTop: 40, marginBottom: 48 }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.4rem", fontWeight: 300, color: "var(--text-1)", lineHeight: 1.5 }}>
                „Ein guter Cocktail ist kein Zufall – er ist das Ergebnis
                von Leidenschaft, Präzision und dem richtigen Moment.&rdquo;
              </p>
              <p className="t-label" style={{ marginTop: 12, color: "var(--gold)" }}>
                HEINZ KAISER · ALCHEMIST, MIXOLOGIST, OPTIMIST
              </p>
            </Reveal>

            {/* Stats */}
            <motion.div
              initial="hidden" whileInView="show" viewport={viewportOnce}
              variants={staggerContainer(0.1, 0.1)}
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, borderTop: "1px solid var(--border)" }}
            >
              {STATS.map(([v, l], i) => (
                <motion.div key={l} variants={fadeUp} style={{ padding: "28px 0", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.4rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-3)", marginTop: 6, fontFamily: "var(--font-sans)" }}>{l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
