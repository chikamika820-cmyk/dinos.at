/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView, useReducedMotion, MotionConfig, animate } from "framer-motion";
import type { ReviewsData } from "../lib/reviews";

/* ============================================================
   BRAND ASSETS — PLACEHOLDERS
   Replace with the real Dino's logo + original bar photography.
   All image refs are centralised here for a one-line swap.
============================================================ */
const ASSETS = {
  logo: "/IMG_8595.jpeg",   // offizielles Logo (Navy-Lockup) — Navbar/Footer/Kontakt
  logoTransparent: "/logo-transparent.png", // freigestellt — für den Hero auf dem Foto
  hero: "/IMG_8677.jpeg",   // Barraum
  about: "/IMG_8674.jpeg",  // Team
  gallery: [
    "/IMG_8675.jpeg",       // Bartender
    "/IMG_8676.jpeg",       // Lounge
    "/IMG_8677.jpeg",       // Barraum
    "/IMG_8674.jpeg",       // Team
  ],
};

const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   PRIMITIVES — one consistent set, reused everywhere
============================================================ */
function Reveal({ children, delay = 0, y = 20, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Staggered reveal for groups of similar cards (fade-in + slide-up, sequential) */
const staggerGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* Count-up number — driven by a single in-view trigger (the whole stats group),
   plays once, updates the DOM via ref (no per-frame React re-renders → 60fps),
   and respects prefers-reduced-motion. Tabular figures avoid width jitter. */
function CountUp({ value, suffix = "", play }: { value: number; suffix?: string; play: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !play) return;
    if (reduce) { el.textContent = `${value}${suffix}`; return; }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { el.textContent = `${Math.round(v)}${suffix}`; },
    });
    return () => controls.stop();
  }, [play, reduce, value, suffix]);
  return <span ref={ref} className="tnum">{`0${suffix}`}</span>;
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

function Button({ children, href, variant = "solid", dark = false, className = "", ...props }: any) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 active:scale-[0.98]";
  const styles: Record<string, string> = dark
    ? {
        solid: "bg-[var(--night-ink)] text-[var(--night)] hover:bg-white",
        ghost: "text-[var(--night-ink)] ring-1 ring-white/25 hover:ring-white/50 hover:bg-white/5",
      }
    : {
        solid: "bg-[var(--ink)] text-white hover:bg-black",
        ghost: "text-[var(--ink)] ring-1 ring-[var(--line)] hover:ring-[var(--ink)]/30 hover:bg-black/[0.03]",
        gold:  "bg-[var(--gold)] text-white hover:bg-[var(--gold-deep)]",
      };
  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

function Segmented({ items, active, onChange, dark = false }: { items: string[]; active: number; onChange: (i: number) => void; dark?: boolean }) {
  return (
    <div className={`inline-flex rounded-full p-1 ${dark ? "bg-white/8" : "bg-[var(--surface-2)]"}`}>
      {items.map((it, i) => (
        <button
          key={it}
          onClick={() => onChange(i)}
          className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
            active === i ? (dark ? "text-[var(--night)]" : "text-[var(--ink)]") : dark ? "text-[var(--night-ink-2)] hover:text-[var(--night-ink)]" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
          }`}
        >
          {active === i && (
            <motion.span
              layoutId={`seg-${items.join()}`}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className={`absolute inset-0 rounded-full ${dark ? "bg-[var(--night-ink)]" : "bg-white"} shadow-sm`}
            />
          )}
          <span className="relative z-10">{it}</span>
        </button>
      ))}
    </div>
  );
}

/* Placeholder-aware image (dark surface until the real photo loads/replaces) */
function Img({ src, alt, className = "", placeholder = "var(--surface-2)", eager = false }: { src: string; alt: string; className?: string; placeholder?: string; eager?: boolean }) {
  return (
    <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} className={className} style={{ backgroundColor: placeholder }} />
  );
}

/* ============================================================
   NAVBAR — frosted, light, Apple-style
============================================================ */
const NAV_LINKS = [
  ["Über uns", "#about"],
  ["Speisekarte", "#speisekarte"],
  ["Drinks", "#drinks"],
  ["Galerie", "#galerie"],
  ["Kontakt", "#kontakt"],
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h(); window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--line)]" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center" aria-label="Dino's Hausapotheke — Startseite">
          <img src={ASSETS.logo} alt="Dino's Hausapotheke" width={72} height={72} className="h-9 w-auto rounded-lg" />
        </a>
        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map(([l, h]) => (
            <li key={h}>
              <a href={h} className={`text-sm font-medium transition-colors ${scrolled ? "text-[var(--ink-2)] hover:text-[var(--ink)]" : "text-white/80 hover:text-white"}`}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#reservierung" className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95 md:inline-flex ${scrolled ? "bg-[var(--ink)] text-white hover:bg-black" : "bg-white text-[var(--ink)] hover:bg-white/90"}`}>
            Reservieren
          </a>
          <button onClick={() => setOpen(!open)} className={`p-2 lg:hidden ${scrolled ? "text-[var(--ink)]" : "text-white"}`} aria-label="Menü">
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 rounded-full bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 rounded-full bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 rounded-full bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden border-t border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-xl lg:hidden">
            <ul className="space-y-1 px-5 py-4">
              {[...NAV_LINKS, ["Reservieren", "#reservierung"]].map(([l, h]) => (
                <li key={h}>
                  <a href={h} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]">{l}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============================================================
   HERO — dark, cinematic, calm
============================================================ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex h-[100svh] min-h-[680px] items-center justify-center overflow-hidden bg-[var(--night)]">
      <motion.div style={{ y }} className="absolute inset-0">
        <Img src={ASSETS.hero} alt="Dino's Hausapotheke — Barraum" eager className="h-full w-full object-cover" placeholder="var(--night-2)" />
        {/* Soft top grade (navbar legibility) — keep the photo otherwise clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--night)]/45 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(5,4,35,0.42)_100%)]" />
        {/* Long, smooth fade that dissolves the photo into the next (navy) section — no hard bar */}
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-transparent via-[var(--night)]/55 to-[var(--night)]" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
          <Eyebrow className="text-[var(--gold)] [text-shadow:0_1px_12px_rgba(2,1,34,0.85)]">Wien · 1. Bezirk</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mt-4"
        >
          {/* Official logo, cut out (transparent) and placed straight on the photo — only a soft glow, no box */}
          <img src={ASSETS.logoTransparent} alt="Dino's Hausapotheke" width={1078} height={1062} className="mx-auto h-auto w-[clamp(168px,30vw,280px)] -translate-x-[2.5%] [filter:drop-shadow(0_4px_10px_rgba(2,1,34,0.55))_drop-shadow(0_10px_34px_rgba(0,0,0,0.45))]" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.34 }}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[var(--night-ink)] [text-shadow:0_1px_16px_rgba(2,1,34,0.9)]"
        >
          Wiens preisgekrönte Cocktailbar seit 2019.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.46 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="#reservierung" variant="solid" dark>Tisch reservieren</Button>
          <Button href="#drinks" variant="ghost" dark>Karte entdecken</Button>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="h-9 w-5 rounded-full border border-white/30">
          <div className="mx-auto mt-2 h-1.5 w-0.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   AWARDS — official Falstaff graphic, embedded 1:1 on brand navy.
   No custom cards/colours/text. Add the file at public/falstaff-awards.png
   (cropped to the four awards, without the social-media icons).
============================================================ */
const FALSTAFF_GRAPHIC = "/falstaff-awards.png";

function Awards() {
  return (
    <section className="bg-[var(--night)] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal>
          <img
            src={FALSTAFF_GRAPHIC}
            alt="Falstaff Auszeichnungen: Beste American Bar 2023, 2024, 2025 und Bartender des Jahres 2024 (Heinz Kaiser)"
            className="mx-auto w-full max-w-3xl"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT — light, editorial-clean
============================================================ */
function About() {
  const stats = [
    { value: 4, suffix: "×", label: "Falstaff Award" },
    { value: 150, suffix: "+", label: "Cocktails" },
    { value: 300, suffix: "+", label: "Spirituosen" },
    { value: 2019, suffix: "", label: "Gegründet" },
  ];
  // Single trigger for the whole stats group: fire once the complete group is visible.
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: "all" });
  return (
    <section id="about" className="bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[var(--line)]">
            <Img src={ASSETS.about} alt="Das Team von Dino's Hausapotheke" className="aspect-[3/2] w-full object-cover" />
          </div>
        </Reveal>
        <div>
          <Reveal><Eyebrow>Herkunft</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">Mehr als eine Bar — eine Erfahrung.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-[var(--ink-2)]">
              <p>Im Herzen des 1. Bezirks, am Salzgries, entstand 2019 ein Ort zwischen Bar, Labor und Wohnzimmer — heute eine der besten American Bars Österreichs.</p>
              <p>Jeder Cocktail erzählt eine Geschichte: handverlesene Spirituosen, hauseigene Infusionen und die ruhige Präzision eines Handwerks, das mit Leidenschaft gepflegt wird.</p>
            </div>
          </Reveal>
          <motion.div ref={statsRef} variants={staggerGroup} initial="hidden" animate={statsInView ? "show" : "hidden"} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={i} variants={staggerItem} className="rounded-2xl bg-[var(--surface-2)] p-5">
                <div className="text-3xl font-semibold text-[var(--gold)]"><CountUp value={s.value} suffix={s.suffix} play={statsInView} /></div>
                <div className="mt-1 text-sm text-[var(--ink-2)]">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MENU DATA (placeholder content — to be replaced with real)
============================================================ */
type Item = { name: string; desc: string; price: string; base?: string };
const FOOD: Record<string, Item[]> = {
  "Starters": [
    { name: "Oliven & Focaccia", desc: "Hausgemachte Focaccia, marinierte Oliven, Olivenöl extra vergine.", price: "8" },
    { name: "Charcuterie Board", desc: "Auswahl italienischer Salumi, Pickles, Sauerteigbrot.", price: "18" },
    { name: "Burrata", desc: "Apulische Burrata, Heirloom-Tomaten, Basilikum, Aceto.", price: "14" },
    { name: "Beef Tartare", desc: "Handgeschnitten, Schalotten, Kapern, Eigelb, Brioche.", price: "16" },
  ],
  "Kleine Gerichte": [
    { name: "Wagyu Slider", desc: "Wagyu-Patty, gereifter Cheddar, karamellisierte Zwiebeln.", price: "19" },
    { name: "Lobster Bisque", desc: "Klassische Hummerbisque, Cognac, Crème fraîche.", price: "17" },
    { name: "Tagliatelle al Tartufo", desc: "Frische Pasta, Butter, Parmigiano, schwarzer Trüffel.", price: "22" },
    { name: "Steak & Bourbon Butter", desc: "Dry-aged Entrecôte, Bourbon-Kräuterbutter.", price: "34" },
  ],
  "Desserts": [
    { name: "Dark Chocolate Fondant", desc: "Valrhona 70%, flüssiger Kern, Vanilleeis.", price: "11" },
    { name: "Crème Brûlée", desc: "Madagaskar-Vanille, karamellisierter Zucker.", price: "9" },
    { name: "Cheese Selection", desc: "Drei europäische Käse, Feigensenf, Walnussbrot.", price: "16" },
  ],
};
const DRINKS: Record<string, Item[]> = {
  "Signature": [
    { name: "Apothecary No.1", desc: "Hausgegossener Gin, Kamille, Honig, Zitronenöl.", price: "16", base: "Gin" },
    { name: "Kaiser's Gold", desc: "Bourbon, Safran, gerösteter Pfirsich, Rauchnote.", price: "17", base: "Bourbon" },
    { name: "Salzgries Sour", desc: "Aperol, Wermut, Eiweiß, frische Zitrone.", price: "15", base: "Aperol" },
    { name: "Vienna Noir", desc: "Mezcal, schwarzer Sesam, Kakao, Birne.", price: "17", base: "Mezcal" },
    { name: "The Remedy", desc: "Gereifter Rum, Falernum, Limette, Bittermandel.", price: "15", base: "Rum" },
    { name: "Garden Elixir", desc: "Floral Gin, Estragon, Holunder, Gurke.", price: "14", base: "Gin" },
  ],
  "Classics": [
    { name: "Old Fashioned", desc: "Bourbon, Demerara, Angostura, Orangenöl.", price: "14", base: "Bourbon" },
    { name: "Negroni", desc: "Gin, Campari, Wermut, Orange.", price: "13", base: "Gin" },
    { name: "Dry Martini", desc: "London Dry Gin, Vermouth, Zitronenzeste.", price: "13", base: "Gin" },
    { name: "Whisky Sour", desc: "Bourbon, Zitrone, Zucker, Eiweiß.", price: "13", base: "Whisky" },
    { name: "Espresso Martini", desc: "Vodka, Espresso, Kaffeelikör.", price: "14", base: "Vodka" },
    { name: "Daiquiri", desc: "Weißer Rum, Limette, Zucker.", price: "12", base: "Rum" },
  ],
  "Alkoholfrei": [
    { name: "Garden of Eden", desc: "Gurke, Kamille, Limette, Tonic.", price: "9", base: "Botanical" },
    { name: "Golden Hour", desc: "Passionsfrucht, Vanille, Zitrus, Soda.", price: "9", base: "Tropical" },
    { name: "Vienna Rose", desc: "Hibiskus, Rose, Granatapfel, Sekt-Soda.", price: "9", base: "Floral" },
    { name: "Smoked Citrus", desc: "Geräucherter Rosmarin, Grapefruit, Bitter.", price: "10", base: "Smoky" },
  ],
};

function MenuCard({ it }: { it: Item }) {
  return (
    <div className="group flex items-start justify-between gap-5 rounded-3xl bg-[var(--surface)] p-6 ring-1 ring-[var(--line)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-16px_rgba(26,22,19,0.22)]">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-semibold tracking-[-0.02em]">{it.name}</h3>
          {it.base && <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[var(--ink-2)]">{it.base}</span>}
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-2)]">{it.desc}</p>
      </div>
      <span className="tnum shrink-0 text-lg font-semibold text-[var(--gold)]">€{it.price}</span>
    </div>
  );
}

function MenuSection({ id, eyebrow, title, intro, data }: { id: string; eyebrow: string; title: string; intro: string; data: Record<string, Item[]> }) {
  const cats = Object.keys(data);
  const [active, setActive] = useState(0);
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
      <Reveal className="mb-10 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--ink-2)]">{intro}</p>
      </Reveal>
      <Reveal className="mb-10 flex justify-center"><Segmented items={cats} active={active} onChange={setActive} /></Reveal>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }} className="grid gap-4 md:grid-cols-2">
          {data[cats[active]].map((it, i) => (
            <motion.div key={it.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.5, ease: EASE }}>
              <MenuCard it={it} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ============================================================
   GALLERY — dark, rounded image cards
============================================================ */
function Gallery() {
  return (
    <section id="galerie" className="bg-[var(--night)] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow className="text-[var(--gold)]">Atmosphäre</Eyebrow>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.03em] text-balance text-[var(--night-ink)] sm:text-5xl">Momente bei Dino&apos;s</h2>
          </div>
          <Button href="#reservierung" variant="ghost" dark>Platz reservieren</Button>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
          {ASSETS.gallery.map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-white/10">
                <Img src={src} alt={`Dino's Hausapotheke — Eindruck ${i + 1}`} placeholder="var(--night-2)" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RESERVATION — light, one big elegant card
============================================================ */
function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[var(--ink-2)]">{label}</span>
      <input {...props} className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3.5 text-[15px] text-[var(--ink)] outline-none transition-colors duration-200 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20" />
    </label>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.6l2.9 6.03 6.6.87-4.85 4.5 1.24 6.5L12 17.9l-5.89 3.1 1.24-6.5-4.85-4.5 6.6-.87L12 2.6z" />
    </svg>
  );
}

function Stars({ value, className = "", size = "h-4 w-4" }: { value: number; className?: string; size?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${value.toLocaleString("de-DE")} von 5 Sternen`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <StarIcon className={`absolute inset-0 ${size} text-[var(--ink)]/15`} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarIcon className={`${size} text-[var(--gold)]`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function TripadvisorWordmark() {
  return <span className="font-semibold tracking-tight text-[#00AA6C]">Tripadvisor</span>;
}

/* Premium reviews carousel — real Tripadvisor data (API or curated), custom design */
function Reviews({ data }: { data: ReviewsData }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const reduce = useReducedMotion();
  const n = data.reviews.length;
  const go = (d: number) => { setDir(d); setIdx((p) => (p + d + n) % n); };
  const jump = (k: number) => { setDir(k > idx ? 1 : -1); setIdx(k); };
  useEffect(() => {
    if (reduce || n <= 1) return;
    const id = setInterval(() => { setDir(1); setIdx((p) => (p + 1) % n); }, 6500);
    return () => clearInterval(id);
  }, [reduce, n]);
  const r = data.reviews[idx];
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 44 : -44 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -44 : 44 }),
  };
  return (
    <div className="mt-20 lg:mt-28">
      <Reveal className="flex flex-col items-center text-center">
        <Eyebrow>Bewertungen</Eyebrow>
        <div className="mt-6 flex items-center gap-5">
          <span className="tnum text-6xl font-semibold leading-none">{data.rating.toLocaleString("de-DE")}</span>
          <div className="flex flex-col items-start">
            <Stars value={data.rating} size="h-5 w-5" />
            <span className="mt-1.5 text-sm text-[var(--ink-2)]">{data.count.toLocaleString("de-DE")} Bewertungen</span>
          </div>
        </div>
        <a href={data.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
          Bewertungen auf <TripadvisorWordmark /> ansehen <span aria-hidden>↗</span>
        </a>
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-3xl">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.blockquote
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            drag={n > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            dragSnapToOrigin
            onDragEnd={(_e, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
            className="cursor-grab rounded-[2rem] bg-[var(--surface)] p-8 text-center shadow-[0_24px_70px_-34px_rgba(12,14,38,0.30)] ring-1 ring-[var(--line)] active:cursor-grabbing sm:p-12"
          >
            <Stars value={r.rating} className="justify-center" size="h-5 w-5" />
            {r.title && <p className="mt-6 text-xl font-semibold tracking-[-0.01em]">{r.title}</p>}
            <p className={`${r.title ? "mt-3" : "mt-6"} text-lg leading-relaxed text-[var(--ink-2)]`}>“{r.text}”</p>
            <footer className="mt-7 text-sm font-medium">
              {r.author}{r.date ? <span className="text-[var(--ink-2)]"> · {r.date}</span> : null}
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        {n > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Vorherige Bewertung" className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface)] text-lg text-[var(--ink)] shadow-lg ring-1 ring-[var(--line)] transition hover:scale-105 md:flex">‹</button>
            <button onClick={() => go(1)} aria-label="Nächste Bewertung" className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[var(--surface)] text-lg text-[var(--ink)] shadow-lg ring-1 ring-[var(--line)] transition hover:scale-105 md:flex">›</button>
          </>
        )}
      </div>

      {n > 1 && (
        <div className="mt-7 flex justify-center gap-2">
          {data.reviews.map((_, k) => (
            <button key={k} onClick={() => jump(k)} aria-label={`Bewertung ${k + 1}`} className={`h-2 rounded-full transition-all duration-300 ${k === idx ? "w-6 bg-[var(--gold)]" : "w-2 bg-[var(--ink)]/15 hover:bg-[var(--ink)]/30"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

function Reservation({ reviews }: { reviews: ReviewsData | null }) {
  const [done, setDone] = useState(false);
  return (
    <section id="reservierung" className="bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal><Eyebrow>Reservierung</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">Ihren Abend vorbestellen.</h2></Reveal>
            <Reveal delay={0.1}><p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--ink-2)]">Wir empfehlen eine Reservierung — besonders Freitag und Samstag. Für größere Gruppen kontaktieren Sie uns gerne direkt.</p></Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-[15px]">
                <div><div className="text-sm text-[var(--ink-2)]">Telefon</div><a href="tel:+4315357230" className="font-medium hover:text-[var(--gold)]">+43 1 5357230</a></div>
                <div><div className="text-sm text-[var(--ink-2)]">E-Mail</div><a href="mailto:heinz@dinos.at" className="font-medium hover:text-[var(--gold)]">heinz@dinos.at</a></div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[2rem] bg-[var(--surface-2)] p-7 ring-1 ring-[var(--line)] sm:p-9">
              {done ? (
                <div className="py-12 text-center">
                  <div className="text-3xl font-semibold tracking-[-0.03em] text-balance">Vielen Dank.</div>
                  <p className="mt-3 text-[var(--ink-2)]">Ihre Anfrage ist eingegangen — wir bestätigen in Kürze.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Datum" type="date" required />
                    <Field label="Uhrzeit" type="time" required />
                  </div>
                  <Field label="Gäste" type="number" min={1} max={20} defaultValue={2} required />
                  <Field label="Name" type="text" placeholder="Ihr Name" required />
                  <Field label="Telefon oder E-Mail" type="text" placeholder="So erreichen wir Sie" required />
                  <button type="submit" className="w-full rounded-full bg-[var(--ink)] py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-black active:scale-[0.99]">Anfrage senden</button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {reviews && reviews.reviews.length > 0 && <Reviews data={reviews} />}
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT — light cards
============================================================ */
function Contact() {
  const hours = [["Montag", "Ruhetag", true], ["Di – Do", "17:00 – 02:00", false], ["Fr – Sa", "17:00 – 03:00", false], ["Sonntag", "20:00 – 00:00", false]] as const;
  return (
    <section id="kontakt" className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
      <Reveal className="mb-12">
        <Eyebrow>Kontakt & Standort</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">Besuchen Sie uns am Salzgries.</h2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        <Reveal>
          <div className="h-full rounded-3xl bg-[var(--surface)] p-8 ring-1 ring-[var(--line)]">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-2)]">Kontakt</h3>
            <div className="mt-5 space-y-4 text-[15px]">
              <p className="font-medium leading-snug">Salzgries 19<br />1010 Wien, Österreich</p>
              <p><a href="tel:+4315357230" className="hover:text-[var(--gold)]">+43 1 5357230</a></p>
              <p><a href="mailto:heinz@dinos.at" className="hover:text-[var(--gold)]">heinz@dinos.at</a></p>
              <div className="flex gap-4 pt-1 text-sm text-[var(--ink-2)]">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)]">Instagram</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)]">Facebook</a>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="h-full rounded-3xl bg-[var(--surface)] p-8 ring-1 ring-[var(--line)]">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-2)]">Öffnungszeiten</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {hours.map(([d, h, closed]) => (
                <li key={d} className="flex items-center justify-between border-b border-[var(--line)] pb-3 last:border-0">
                  <span className="font-medium">{d}</span>
                  <span className={closed ? "text-[var(--ink-2)]" : "tnum text-[var(--gold)]"}>{h}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-[var(--ink-2)]">Küche schließt 1 Stunde vor Barbetrieb.</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="flex h-full flex-col rounded-3xl bg-[var(--surface)] p-8 ring-1 ring-[var(--line)]">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-2)]">Standort</h3>
            <a href="https://maps.google.com/?q=Salzgries+19,+1010+Wien" target="_blank" rel="noopener noreferrer" aria-label="Standort auf Google Maps öffnen" className="group relative mt-5 block overflow-hidden rounded-2xl ring-1 ring-[var(--line)]">
              <iframe
                title="Standort von Dino's Hausapotheke — Salzgries 19, 1010 Wien"
                src="https://maps.google.com/maps?q=Salzgries%2019%2C%201010%20Wien&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="pointer-events-none block h-40 w-full transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span aria-hidden className="absolute inset-0" />
            </a>
            <div className="mt-5 flex flex-col items-center text-center">
              <img src={ASSETS.logo} alt="Dino's Hausapotheke" className="h-12 w-auto rounded-xl" />
              <div className="mt-2 text-sm text-[var(--ink-2)]">Salzgries 19 · 1010 Wien</div>
            </div>
            <a href="https://maps.google.com/?q=Salzgries+19,+1010+Wien" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black">In Google Maps öffnen</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER — dark
============================================================ */
function Footer() {
  return (
    <footer className="bg-[var(--night)] py-16 text-[var(--night-ink-2)]">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end">
          <div>
            <img src={ASSETS.logo} alt="Dino's Hausapotheke" className="h-20 w-auto rounded-xl" />
            <p className="mt-4 text-sm">Hausapotheke · Wien</p>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {NAV_LINKS.map(([l, h]) => <li key={h}><a href={h} className="transition-colors hover:text-[var(--night-ink)]">{l}</a></li>)}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-8 text-sm md:flex-row">
          <span>© 2026 Dino&apos;s Apothecary Bar</span>
          <span>Salzgries 19 · 1010 Wien · Österreich</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MOBILE STICKY CTA
============================================================ */
function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 640);
    h(); window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a href="#reservierung" initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-4 bottom-4 z-40 rounded-full bg-[var(--ink)] py-4 text-center text-sm font-medium text-white shadow-xl md:hidden">
          Tisch reservieren
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   PAGE
============================================================ */
export default function DinosPage({ reviews }: { reviews: ReviewsData | null }) {
  return (
    <MotionConfig reducedMotion="user">
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main>
        <Hero />
        <Awards />
        <About />
        <MenuSection id="speisekarte" eyebrow="Tafel" title="Speisekarte" intro="Eine kuratierte Auswahl, die unsere Drinks begleitet — saisonal, ehrlich, präzise." data={FOOD} />
        <div className="bg-[var(--surface-2)]">
          <MenuSection id="drinks" eyebrow="Rezepturen" title="Getränkekarte" intro="Über 150 Cocktails, 300+ Spirituosen — jede Kreation aus unserer hauseigenen Apotheke." data={DRINKS} />
        </div>
        <Gallery />
        <Reservation reviews={reviews} />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
    </MotionConfig>
  );
}
