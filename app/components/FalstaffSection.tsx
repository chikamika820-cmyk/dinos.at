"use client";
import { motion } from "framer-motion";
import { viewportOnce } from "@/app/lib/motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const AWARDS = [
  { award: "Beste American Bar",           magazine: "Falstaff Restaurant & Bar",   year: "2025" },
  { award: "Beste American Bar",           magazine: "Falstaff Restaurant & Bar",   year: "2024" },
  { award: "Bartender des Jahres",         magazine: "Falstaff Bars & Spirits",      year: "2024" },
  { award: "Beste American Bar",           magazine: "Falstaff Restaurant & Bar",   year: "2023" },
];

export default function FalstaffSection() {
  return (
    <section
      style={{
        background: "var(--surface-1)",
        padding: "clamp(72px, 10vw, 120px) 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Very subtle ambient light */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60%", height: "60%", background: "radial-gradient(ellipse, rgba(154,124,63,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p style={{
            fontSize: "0.56rem", letterSpacing: "0.4em", textTransform: "uppercase",
            color: "var(--gold)", fontFamily: "var(--font-sans)", marginBottom: 20,
          }}>
            Ausgezeichnet
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            color: "var(--text-1)",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
          }}>
            Falstaff
          </h2>
        </motion.div>

        {/* Award list — editorial, minimal */}
        <div>
          {AWARDS.map((a, i) => (
            <motion.div
              key={`${a.award}-${a.year}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 24,
                padding: "28px 0",
                borderBottom: "1px solid var(--border)",
                transition: "opacity 0.28s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {/* Left: award info */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 24, flexWrap: "wrap", flex: 1 }}>
                <span style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                  fontWeight: 400,
                  color: "var(--text-1)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.2,
                }}>
                  {a.award}
                </span>
                <span style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-3)",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap",
                }}>
                  {a.magazine}
                </span>
              </div>

              {/* Right: year */}
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 300,
                color: "var(--gold)",
                letterSpacing: "0.05em",
                flexShrink: 0,
                lineHeight: 1,
              }}>
                {a.year}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.0, delay: 0.5, ease: EASE }}
          style={{
            marginTop: 40,
            fontSize: "0.62rem",
            letterSpacing: "0.08em",
            color: "var(--text-3)",
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          Österreichs renommierteste Gastronomieauszeichnung —
          verliehen an die Besten ihres Fachs.
        </motion.p>
      </div>
    </section>
  );
}
