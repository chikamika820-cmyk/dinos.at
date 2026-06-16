"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const t = (delay: number): React.CSSProperties => ({
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.9s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.9s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
  });

  return (
    <section id="about" ref={ref} className="section-pad noise" style={{ background: "var(--surface-1)", position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 6vw, 100px)", alignItems: "center" }} className="about-grid">

          {/* Image column */}
          <div style={{ ...t(0), position: "relative" }}>
            {/* Main image */}
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: 2 }}>
              <Image
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=85"
                alt="Bartender bei der Arbeit"
                fill
                style={{ objectFit: "cover", objectPosition: "center 20%", transition: "transform 0.8s ease" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)" }} />
            </div>

            {/* Floating award card */}
            <div style={{
              position: "absolute", bottom: -28, right: -24,
              background: "var(--black)",
              border: "1px solid var(--border-mid)",
              padding: "24px 28px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              ...t(0.2),
            }}>
              <div style={{ fontSize: "2.8rem", fontFamily: "var(--font-cormorant)", color: "var(--gold)", lineHeight: 1, fontWeight: 300 }}>3×</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-2)", marginTop: 4, fontFamily: "var(--font-sans)" }}>
                Falstaff Award
              </div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)" }}>
                Beste American Bar
              </div>
            </div>
          </div>

          {/* Text column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, ...t(0.15) }}>
              <span className="gold-rule" />
              <span className="t-eyebrow">Über uns</span>
            </div>

            <h2 style={{ ...t(0.25), fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.6rem, 4.5vw, 4rem)", lineHeight: 1.1, color: "var(--text-1)", marginBottom: 32 }}>
              Mehr als eine Bar —
              <br />
              <em className="gold-text" style={{ fontStyle: "italic" }}>eine Erfahrung</em>
            </h2>

            <div style={{ ...t(0.35) }}>
              <p className="t-body" style={{ marginBottom: 20 }}>
                Im Herzen des ersten Bezirks hat Heinz Kaiser einen Ort erschaffen,
                der die Grenzen zwischen Bar, Labor und Wohnzimmer aufhebt.
                Dino's Apothecary Bar steht für die Philosophie, dass jeder Drink
                eine Geschichte erzählt.
              </p>
              <p className="t-body" style={{ marginBottom: 20 }}>
                Unsere Cocktails entstehen aus handverlesenen Zutaten, klassischen
                Techniken und dem unaufhörlichen Streben nach dem Außergewöhnlichen.
                Drei Falstaff-Awards in Folge und die Auszeichnung als
                „Bartender des Jahres 2024" sprechen für sich.
              </p>
            </div>

            {/* Pull quote */}
            <div style={{ ...t(0.45), borderLeft: "2px solid var(--gold)", paddingLeft: 24, marginTop: 40, marginBottom: 48 }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.4rem", fontWeight: 300, color: "var(--text-1)", lineHeight: 1.5 }}>
                „Ein guter Cocktail ist kein Zufall – er ist das Ergebnis
                von Leidenschaft, Präzision und dem richtigen Moment."
              </p>
              <p style={{ marginTop: 12, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)" }}>
                Heinz Kaiser · Head Bartender
              </p>
            </div>

            {/* Stats */}
            <div style={{ ...t(0.55), display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, borderTop: "1px solid var(--border)" }}>
              {[["150+", "Cocktails"], ["300+", "Spirituosen"], ["5+", "Jahre"]].map(([v, l]) => (
                <div key={i} style={{ padding: "28px 0", borderRight: "1px solid var(--border)"
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.4rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-3)", marginTop: 6, fontFamily: "var(--font-sans)" }}>{l}</div>
                </div>
              ))}
            </div>
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
