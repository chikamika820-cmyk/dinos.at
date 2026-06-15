"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TEAM = [
  { name: "Heinz Kaiser", role: "Head Bartender & Inhaber", award: "Bartender des Jahres 2024",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    bio: "Mit über 15 Jahren hinter der Bar hat Heinz Kaiser einen unverwechselbaren Stil entwickelt. Sein Antrieb: jeden Gast mit dem perfekten Cocktail zu überraschen." },
  { name: "Lisa", role: "Bar Managerin", award: null,
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&q=80",
    bio: "Lisa sorgt für den reibungslosen Ablauf jedes Abends und ist die erste Ansprechpartnerin für besondere Wünsche." },
  { name: "Clemens", role: "Bartender", award: null,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bio: "Clemens' Leidenschaft gilt rare Spirituosen. Gemeinsam mit Heinz entwickelt er unsere Saisonkarten." },
  { name: "Edyta", role: "Bartenderin", award: null,
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    bio: "Edyta ist unsere Spezialistin für alkoholfreie Kompositionen – ihre Mocktails sind genauso komplex wie ihre Signature-Cocktails." },
];

export default function TeamSection() {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="team" ref={ref} className="section-pad" style={{ background: "var(--surface-1)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80,
          opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 24 }}>
            <span className="gold-rule" />
            <span className="t-eyebrow">Das Team</span>
            <span className="gold-rule" />
          </div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.4rem, 4.5vw, 4rem)", color: "var(--text-1)", lineHeight: 1.05 }}>
            Die Menschen hinter dem Erlebnis
          </h2>
        </div>

        {/* Team grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 32 }}>
          {TEAM.map((m, i) => (
            <div key={m.name} style={{
              opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(32px)",
              transition: `opacity 0.8s ${i * 0.12}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${i * 0.12}s cubic-bezier(0.22,1,0.36,1)`,
            }}>
              {/* Photo */}
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: 24 }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}
              >
                <Image src={m.img} alt={m.name} fill
                  style={{ objectFit: "cover", objectPosition: "center top", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
                  sizes="(max-width: 768px) 100vw, 280px"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 55%)" }} />
                {m.award && (
                  <div style={{ position: "absolute", bottom: 16, left: 16, right: 16,
                    fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "var(--gold)", fontFamily: "var(--font-sans)",
                    background: "rgba(8,8,8,0.6)", backdropFilter: "blur(8px)",
                    padding: "8px 12px", border: "1px solid var(--border-mid)" }}>
                    ✦ {m.award}
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text-1)", marginBottom: 4 }}>
                {m.name}
              </h3>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)", marginBottom: 14 }}>
                {m.role}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.75 }}>
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
