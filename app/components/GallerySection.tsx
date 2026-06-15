"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=900&q=85", alt: "Cocktail Komposition",    span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1527761939622-933c972c16ef?w=700&q=85", alt: "Bar Detail",              span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=700&q=85", alt: "Nacht Atmosphäre",        span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=700&q=85", alt: "Signature Cocktail",      span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=700&q=85", alt: "Innenraum Detail",       span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=700&q=85", alt: "Bartender Craft",        span: "col-span-1 row-span-1" },
];

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="gallery" ref={ref} className="section-pad" style={{ background: "var(--black)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64,
          opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span className="gold-rule" />
              <span className="t-eyebrow">Galerie</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.4rem, 4vw, 3.6rem)", color: "var(--text-1)", lineHeight: 1.1 }}>
              Unsere Atmosphäre
            </h2>
          </div>
          <p className="t-body hidden lg:block" style={{ maxWidth: 280, textAlign: "right" }}>
            Jeder Abend bei Dino's ist einzigartig – lass dich von der Atmosphäre verzaubern.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 280px)", gap: 6 }}>
          {PHOTOS.map((p, i) => (
            <div
              key={p.alt}
              className={p.span}
              style={{
                position: "relative", overflow: "hidden", cursor: "pointer",
                opacity: v ? 1 : 0, transform: v ? "scale(1)" : "scale(0.97)",
                transition: `opacity 0.8s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1)`,
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <Image src={p.src} alt={p.alt} fill
                style={{ objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                  transform: active === i ? "scale(1.06)" : "scale(1)" }}
                sizes="(max-width: 1320px) 25vw, 330px"
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 55%)",
                opacity: active === i ? 1 : 0, transition: "opacity 0.4s",
              }} />
              <div style={{
                position: "absolute", bottom: 20, left: 20,
                opacity: active === i ? 1 : 0, transform: active === i ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.35s, transform 0.35s",
              }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)" }}>
                  {p.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden" style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16, scrollSnapType: "x mandatory" }}>
          {PHOTOS.map((p, i) => (
            <div key={p.alt} style={{ flexShrink: 0, width: "76vw", height: 340, position: "relative", overflow: "hidden", borderRadius: 2, scrollSnapAlign: "center",
              opacity: v ? 1 : 0, transition: `opacity 0.7s ${i * 0.1}s` }}>
              <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} sizes="76vw" />
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div style={{
          marginTop: 48, textAlign: "center",
          opacity: v ? 1 : 0, transition: "opacity 0.8s 0.5s",
        }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="btn-outline" style={{ display: "inline-flex" }}>
            Mehr auf Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}
