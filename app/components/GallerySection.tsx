"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./motion/Reveal";
import ChapterEyebrow from "./motion/ChapterEyebrow";
import { staggerContainer, scaleIn, viewportOnce, EASE_SMOOTH } from "@/app/lib/motion";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=900&q=85", full: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1800&q=90", alt: "Cocktail Komposition",    span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=700&q=85", full: "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=1800&q=90", alt: "Bar Detail",              span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=700&q=85", full: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=1800&q=90", alt: "Nacht Atmosphäre",        span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=700&q=85", full: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=1800&q=90", alt: "Signature Cocktail",      span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=700&q=85", full: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1800&q=90", alt: "Innenraum Detail",       span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=700&q=85", full: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=1800&q=90", alt: "Bartender Craft",        span: "col-span-1 row-span-1" },
];

export default function GallerySection() {
  const [active, setActive] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const onMobileScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.scrollWidth / PHOTOS.length;
    setMobileIdx(Math.round(el.scrollLeft / slide));
  };

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => setLightbox(i => (i === null ? null : (i + 1) % PHOTOS.length)), []);
  const prev = useCallback(() => setLightbox(i => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, next, prev]);

  return (
    <section id="gallery" className="section-pad" style={{ background: "var(--black)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
          <div>
            <ChapterEyebrow roman="IV" style={{ marginBottom: 20 }}>Atmosphäre</ChapterEyebrow>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", color: "var(--text-1)", lineHeight: 1.05 }}>
                Unsere Atmosphäre
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="t-body hidden lg:block" style={{ maxWidth: 280, textAlign: "right" }}>
            Jeder Abend bei Dino&apos;s ist einzigartig – lass dich von der Atmosphäre verzaubern.
          </Reveal>
        </div>

        {/* Desktop grid */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="hidden md:grid"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 300px)", gap: 6 }}
        >
          {PHOTOS.map((p, i) => (
            <motion.div
              key={p.alt}
              variants={scaleIn}
              className={p.span}
              data-cursor="Vergrößern"
              style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setLightbox(i)}
            >
              <Image src={p.src} alt={p.alt} fill
                style={{ objectFit: "cover", transition: "transform 0.7s var(--ease-smooth)",
                  transform: active === i ? "scale(1.06)" : "scale(1)" }}
                sizes="(max-width: 1320px) 25vw, 330px"
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(10,8,7,0.78) 0%, transparent 55%)",
                opacity: active === i ? 1 : 0, transition: "opacity 0.4s",
              }} />
              <div style={{
                position: "absolute", bottom: 20, left: 20, right: 20,
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                opacity: active === i ? 1 : 0, transform: active === i ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.35s, transform 0.35s",
              }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)" }}>
                  {p.alt}
                </span>
                <span className="t-label">{String(i + 1).padStart(2, "0")}/{String(PHOTOS.length).padStart(2, "0")}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: horizontal scroll with snap dots */}
        <div className="md:hidden">
          <div ref={scrollerRef} onScroll={onMobileScroll} style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16, scrollSnapType: "x mandatory" }}>
            {PHOTOS.map((p, i) => (
              <div key={p.alt} onClick={() => setLightbox(i)} style={{ flexShrink: 0, width: "76vw", height: 340, position: "relative", overflow: "hidden", borderRadius: 2, scrollSnapAlign: "center", cursor: "pointer" }}>
                <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} sizes="76vw" />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
            {PHOTOS.map((_, i) => (
              <span key={i} style={{
                width: i === mobileIdx ? 18 : 6, height: 4, borderRadius: 2,
                background: i === mobileIdx ? "var(--gold)" : "var(--border-mid)",
                transition: "width 0.3s var(--ease-smooth), background 0.3s",
              }} />
            ))}
          </div>
        </div>

        {/* Instagram CTA */}
        <Reveal delay={0.1} style={{ marginTop: 48, textAlign: "center" }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="btn-outline" style={{ display: "inline-flex" }}>
            Mehr auf Instagram ↗
          </a>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_SMOOTH }}
            onClick={close}
            style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(10,8,7,0.95)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "5vw" }}
          >
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE_SMOOTH }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", maxWidth: 1100, maxHeight: "80vh", width: "100%" }}
            >
              <div style={{ position: "relative", width: "100%", height: "min(80vh, 720px)" }}>
                <Image src={PHOTOS[lightbox].full} alt={PHOTOS[lightbox].alt} fill style={{ objectFit: "contain" }} sizes="90vw" priority />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 20 }}>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "var(--text-1)", fontStyle: "italic" }}>{PHOTOS[lightbox].alt}</span>
                <span className="t-label">{String(lightbox + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}</span>
              </div>
            </motion.div>

            <button onClick={close} aria-label="Schließen" style={{ position: "absolute", top: 28, right: 28, background: "none", border: "1px solid var(--border-mid)", color: "var(--text-1)", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X size={18} />
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }} aria-label="Vorheriges Bild" className="hidden md:flex" style={{ position: "absolute", left: 28, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid var(--border-mid)", color: "var(--text-1)", width: 48, height: 48, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={e => { e.stopPropagation(); next(); }} aria-label="Nächstes Bild" className="hidden md:flex" style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid var(--border-mid)", color: "var(--text-1)", width: 48, height: 48, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
