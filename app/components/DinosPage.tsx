/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ============================================================
   CUSTOM CURSOR
============================================================ */
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ scale: hover ? 2.2 : 1, opacity: hover ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-2 w-2 rounded-full bg-[var(--gold-bright)]" />
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   CURTAIN REVEAL on load
============================================================ */
function Curtain() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOpen(true), 200); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!open && (
        <motion.div className="fixed inset-0 z-[90] pointer-events-none" initial={false}>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-101%" }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[var(--ink)]"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "101%" }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[var(--ink)]"
          />
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="font-display italic text-3xl text-[var(--gold-bright)]">Dino&apos;s</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAGNETIC BUTTON
============================================================ */
function Magnetic({ children, className = "", as = "button", ...props }: any) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const handle = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };
  const Comp = (motion as any)[as] as any;
  return (
    <Comp ref={ref} onMouseMove={handle} onMouseLeave={reset} style={{ x: sx, y: sy }} className={className} {...props}>
      {children}
    </Comp>
  );
}

/* ============================================================
   REVEAL ON SCROLL
============================================================ */
function Reveal({ children, delay = 0, className = "", y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   CHAPTER EYEBROW
============================================================ */
function Chapter({ numeral, title }: { numeral: string; title: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs text-[var(--gold-bright)] tracking-[0.3em]">{numeral}</span>
        <span className="h-px w-12 bg-[var(--gold)]/40" />
        <span className="eyebrow">{title}</span>
      </div>
    </Reveal>
  );
}

/* ============================================================
   NAVBAR
============================================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h(); window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    ["Über uns", "#about"],
    ["Speisekarte", "#speisekarte"],
    ["Drinks", "#drinks"],
    ["Galerie", "#galerie"],
    ["Reservierung", "#reservierung"],
    ["Kontakt", "#kontakt"],
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[var(--ink)]/85 backdrop-blur-xl border-b border-[var(--gold)]/15" : "bg-transparent"}`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <a href="#top" className="font-display italic text-2xl tracking-wide text-[var(--cream)] flex items-center gap-2">
          <span className="text-[var(--gold-bright)]">D</span>INO&apos;S
        </a>
        <ul className="hidden lg:flex items-center gap-10">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="gold-underline text-[11px] uppercase tracking-[0.3em] text-[var(--cream)]/80 hover:text-[var(--cream)] transition-colors">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Magnetic
            as="a"
            href="#reservierung"
            className="hidden md:inline-flex items-center gap-3 border border-[var(--gold)]/60 px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors"
          >
            Reservieren
            <span className="text-[var(--gold-bright)] group-hover:text-[var(--ink)]">→</span>
          </Magnetic>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-[var(--cream)]" aria-label="Menu">
            <div className="space-y-1.5">
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="lg:hidden overflow-hidden bg-[var(--ink-2)] border-t border-[var(--gold)]/15"
          >
            <ul className="px-6 py-8 space-y-5">
              {links.map(([l, h]) => (
                <li key={h}>
                  <a href={h} onClick={() => setOpen(false)} className="block font-display italic text-2xl text-[var(--cream)]">{l}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ============================================================
   HERO
============================================================ */
const HERO_IMG = "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=2200&q=80";

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[700px] w-full overflow-hidden grain">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.img
          src={HERO_IMG}
          alt="Dino's Apothecary Bar Interieur"
          className="h-full w-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/70 via-[var(--ink)]/55 to-[var(--ink)]" />
        <div className="absolute inset-0 gold-glow opacity-60" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="eyebrow text-[var(--gold-bright)]">Wien · 1. Bezirk · Seit 2019</span>
            </motion.div>

            <h1 className="font-display text-[clamp(4.5rem,16vw,17rem)] leading-[0.85] tracking-tight text-[var(--cream)]">
              {"DINO'S".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.8 }}
              className="mt-6 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10"
            >
              <span className="eyebrow text-[var(--cream)]/70">Apothecary Bar</span>
              <p className="font-display italic text-2xl md:text-3xl text-[var(--cream)]/90 max-w-xl">
                Die Kunst des perfekten Cocktails.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Magnetic
                as="a" href="#reservierung"
                className="group inline-flex items-center gap-4 bg-[var(--gold)] text-[var(--ink)] px-9 py-4 text-[11px] uppercase tracking-[0.35em] hover:bg-[var(--gold-bright)] transition-colors"
              >
                Tisch reservieren
                <span>→</span>
              </Magnetic>
              <Magnetic
                as="a" href="#drinks"
                className="inline-flex items-center gap-4 border border-[var(--cream)]/30 text-[var(--cream)] px-9 py-4 text-[11px] uppercase tracking-[0.35em] hover:border-[var(--gold)] hover:text-[var(--gold-bright)] transition-colors"
              >
                Karte entdecken
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.4 }}
          className="px-6 lg:px-10 pb-10"
        >
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] uppercase tracking-[0.4em] text-[var(--cream-dim)]">
            <div>Falstaff · Beste American Bar · 2023 · 2024 · 2025</div>
            <div className="flex items-center gap-3">
              <span>Scroll</span>
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="text-[var(--gold-bright)]">↓</motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   AWARDS STRIP
============================================================ */
function Awards() {
  const cards = [
    { big: "2023", sub: "Beste American Bar" },
    { big: "2024", sub: "Beste American Bar" },
    { big: "2025", sub: "Beste American Bar" },
    { big: "2024", sub: "Bartender des Jahres" },
  ];
  return (
    <section className="border-y border-[var(--gold)]/15 bg-[var(--ink-2)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <div className="eyebrow text-[var(--gold-bright)]">Auszeichnungen</div>
            <h3 className="font-display italic text-3xl md:text-4xl mt-3 text-[var(--cream)]">Vierfach Falstaff prämiert</h3>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--gold)]/15">
          {cards.map((card, i) => (
            <Reveal key={i} delay={i * 0.1} className="bg-[var(--ink-2)]">
              <div className="text-center p-10 group cursor-default">
                <div className="font-display italic text-[var(--gold-bright)] text-2xl mb-4 transition-transform group-hover:scale-110">Falstaff</div>
                <div className="h-px w-10 mx-auto bg-[var(--gold)]/40 mb-4" />
                <div className="font-mono text-3xl text-[var(--cream)]">{card.big}</div>
                <div className="eyebrow mt-3 text-[var(--cream-dim)]">{card.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
============================================================ */
const ABOUT_IMG = "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1400&q=80";

function About() {
  const stats = [
    ["4×", "Falstaff Award"],
    ["150+", "Cocktails"],
    ["300+", "Spirituosen"],
    ["2019", "Gegründet"],
  ];
  return (
    <section id="about" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] gold-glow opacity-40" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Chapter numeral="I" title="Herkunft" />
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 relative">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  src={ABOUT_IMG} alt="Heinz Kaiser, Bartender des Jahres" loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/40 to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="absolute -bottom-8 -right-4 md:-right-12 bg-[var(--ink)] border border-[var(--gold)]/40 px-8 py-6 max-w-[220px]">
                <div className="font-display italic text-4xl text-[var(--gold-bright)]">4×</div>
                <div className="h-px w-8 bg-[var(--gold)]/40 my-3" />
                <div className="eyebrow text-[var(--cream)]">Falstaff Award</div>
                <div className="text-xs text-[var(--cream-dim)] mt-1">2023 · 2024 · 2025</div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-[var(--cream)]">
                Mehr als eine Bar — <em className="text-[var(--gold-bright)]">eine Erfahrung.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-6 text-[var(--cream)]/80 text-lg leading-relaxed max-w-xl">
                <p>
                  Im Herzen des 1. Bezirks, am Salzgries, schuf Heinz Kaiser 2019 einen Ort zwischen Bar, Labor und Wohnzimmer. Was als Vision begann, wurde zu einer Adresse, die heute zu den besten American Bars Österreichs zählt.
                </p>
                <p>
                  Jeder Cocktail erzählt eine Geschichte — von handverlesenen Spirituosen, hauseigenen Infusionen und der ruhigen Präzision eines Handwerks, das Heinz Kaiser 2024 zum Bartender des Jahres machte.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <figure className="mt-12 border-l border-[var(--gold)]/40 pl-8 py-2 max-w-xl">
                <blockquote className="font-display italic text-2xl md:text-3xl text-[var(--cream)] leading-snug">
                  „Ein guter Cocktail ist kein Zufall — er ist das Ergebnis von Leidenschaft und dem richtigen Moment.&ldquo;
                </blockquote>
                <figcaption className="mt-5 eyebrow text-[var(--gold-bright)]">— Heinz Kaiser</figcaption>
              </figure>
            </Reveal>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--gold)]/15">
              {stats.map(([n, l], i) => (
                <Reveal key={i} delay={i * 0.08} className="bg-[var(--ink)]">
                  <div className="p-6">
                    <div className="font-display text-3xl md:text-4xl text-[var(--gold-bright)]">{n}</div>
                    <div className="eyebrow mt-2 text-[var(--cream-dim)] text-[10px]">{l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MENU (Speisekarte)
============================================================ */
type Item = { name: string; desc: string; price: string };
const FOOD: Record<string, Item[]> = {
  "Starters": [
    { name: "Oliven & Focaccia", desc: "Hausgemachte Focaccia, marinierte Oliven, Olivenöl extra vergine.", price: "8" },
    { name: "Charcuterie Board", desc: "Auswahl italienischer Salumi, Pickles, Sauerteigbrot.", price: "18" },
    { name: "Burrata", desc: "Apulische Burrata, Heirloom-Tomaten, Basilikum, Aceto Balsamico.", price: "14" },
    { name: "Beef Tartare", desc: "Handgeschnitten, Schalotten, Kapern, Eigelb, geröstetes Brioche.", price: "16" },
    { name: "Black Truffle Fries", desc: "Pommes frites, schwarzer Trüffel, Parmesan, Trüffelmayonnaise.", price: "12" },
  ],
  "Kleine Gerichte": [
    { name: "Wagyu Slider", desc: "Wagyu-Patty, gereifter Cheddar, karamellisierte Zwiebeln, Brioche.", price: "19" },
    { name: "Lobster Bisque", desc: "Klassische Hummerbisque, Cognac, Crème fraîche.", price: "17" },
    { name: "Tagliatelle al Tartufo", desc: "Frische Tagliatelle, Butter, Parmigiano, schwarzer Trüffel.", price: "22" },
    { name: "Steak & Bourbon Butter", desc: "Dry-aged Entrecôte, Bourbon-Kräuterbutter, geröstete Schalotten.", price: "34" },
  ],
  "Desserts": [
    { name: "Dark Chocolate Fondant", desc: "Valrhona 70%, flüssiger Kern, Vanilleeis.", price: "11" },
    { name: "Crème Brûlée", desc: "Madagaskar-Vanille, karamellisierter Zucker.", price: "9" },
    { name: "Cheese Selection", desc: "Drei europäische Käse, Feigensenf, Walnussbrot.", price: "16" },
  ],
};

const DRINKS: Record<string, (Item & { base: string })[]> = {
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

function MenuTabs({ data, withBase = false }: { data: Record<string, (Item & { base?: string })[]>; withBase?: boolean }) {
  const cats = Object.keys(data);
  const [active, setActive] = useState(cats[0]);
  return (
    <>
      <div className="flex flex-wrap gap-2 md:gap-4 border-b border-[var(--gold)]/15 mb-12">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`relative px-1 py-4 text-[11px] uppercase tracking-[0.35em] transition-colors ${active === c ? "text-[var(--cream)]" : "text-[var(--cream-dim)] hover:text-[var(--cream)]"}`}
          >
            <span className="px-3">{c}</span>
            {active === c && (
              <motion.span layoutId={`tab-${cats.join()}`} className="absolute inset-x-0 -bottom-px h-px bg-[var(--gold-bright)]" />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-2 gap-x-16 gap-y-10"
        >
          {data[active].map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="group border-b border-[var(--gold)]/10 pb-6"
            >
              <div className="flex items-baseline gap-4">
                <h4 className="font-display text-2xl text-[var(--cream)] group-hover:text-[var(--gold-bright)] transition-colors">
                  {it.name}
                </h4>
                <span className="flex-1 border-b border-dotted border-[var(--gold)]/30 translate-y-[-4px]" />
                <span className="font-mono text-[var(--gold-bright)] text-base">€{it.price}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--cream-dim)] leading-relaxed max-w-md">{it.desc}</p>
              {withBase && it.base && (
                <span className="mt-3 inline-block text-[9px] uppercase tracking-[0.35em] text-[var(--gold-bright)]/80 border border-[var(--gold)]/30 px-2 py-1">
                  {it.base}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function Speisekarte() {
  return (
    <section id="speisekarte" className="py-32 md:py-48 bg-[var(--ink-2)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Chapter numeral="II" title="Tafel" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-[var(--cream)] max-w-3xl">
            Speisekarte — <em className="text-[var(--gold-bright)]">kleine Küche, große Aromen.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[var(--cream-dim)] max-w-xl">
            Eine kuratierte Auswahl, die unsere Drinks begleitet — saisonal, ehrlich, präzise.
          </p>
        </Reveal>
        <div className="mt-20">
          <MenuTabs data={FOOD} />
        </div>
      </div>
    </section>
  );
}

function Getraenke() {
  return (
    <section id="drinks" className="py-32 md:py-48 relative overflow-hidden">
      <div className="absolute top-1/3 -right-40 w-[700px] h-[700px] gold-glow opacity-30" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
        <Chapter numeral="III" title="Rezepturen" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-[var(--cream)] max-w-3xl">
            Getränkekarte — <em className="text-[var(--gold-bright)]">Cocktails wie Rezepturen.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[var(--cream-dim)] max-w-xl">
            Über 150 Cocktails, 300+ Spirituosen. Jede Kreation entsteht in unserer hauseigenen Apotheke.
          </p>
        </Reveal>
        <div className="mt-20">
          <MenuTabs data={DRINKS} withBase />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GALLERY
============================================================ */
const GALLERY = [
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?auto=format&fit=crop&w=900&q=80",
];

function Galerie() {
  return (
    <section id="galerie" className="py-32 md:py-48 bg-[var(--ink-2)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Chapter numeral="IV" title="Atmosphäre" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-[var(--cream)] max-w-2xl">
              Galerie — <em className="text-[var(--gold-bright)]">Momente in Bernstein.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#reservierung" className="gold-underline text-[11px] uppercase tracking-[0.35em] text-[var(--cream)]/80">Reservieren →</a>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {GALLERY.map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className={`group relative overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}>
                <img
                  src={src} alt={`Dino's Bar — ${i + 1}`} loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/60 via-transparent to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RESERVIERUNG
============================================================ */
const RES_BG = "https://images.unsplash.com/photo-1538488881038-e252a119ace7?auto=format&fit=crop&w=1900&q=80";
function Reservierung() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="reservierung" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0">
        <img src={RES_BG} alt="" loading="lazy" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-[var(--ink)]/85 to-[var(--ink)]" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <Chapter numeral="V" title="Reservierung" />
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2">
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-[var(--cream)]">
                Ihren Abend <em className="text-[var(--gold-bright)]">vorbestellen.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[var(--cream-dim)]">
                Wir empfehlen eine Reservierung — besonders Freitag und Samstag. Für größere Gruppen kontaktieren Sie uns bitte direkt.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 pt-8 border-t border-[var(--gold)]/15 text-sm space-y-2 text-[var(--cream)]/80">
                <div><span className="eyebrow text-[var(--cream-dim)]">Telefon</span><br/><a href="tel:+4315357230" className="font-mono text-[var(--gold-bright)]">+43 1 5357230</a></div>
                <div className="pt-3"><span className="eyebrow text-[var(--cream-dim)]">E-Mail</span><br/><a href="mailto:heinz@dinos.at" className="font-mono text-[var(--gold-bright)]">heinz@dinos.at</a></div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="bg-[var(--ink-2)]/80 backdrop-blur border border-[var(--gold)]/20 p-8 md:p-12 space-y-6"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div className="font-display italic text-3xl text-[var(--gold-bright)]">Vielen Dank.</div>
                  <p className="mt-3 text-[var(--cream-dim)]">Ihre Anfrage ist eingegangen. Wir bestätigen in Kürze.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Datum" type="date" required />
                    <Field label="Uhrzeit" type="time" required />
                  </div>
                  <Field label="Gäste" type="number" min={1} max={20} defaultValue={2} required />
                  <Field label="Name" type="text" required />
                  <Field label="Telefon oder E-Mail" type="text" required />
                  <button type="submit" className="w-full mt-4 bg-[var(--gold)] text-[var(--ink)] py-4 text-[11px] uppercase tracking-[0.35em] hover:bg-[var(--gold-bright)] transition-colors">
                    Anfrage senden →
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow text-[var(--cream-dim)] text-[10px]">{label}</span>
      <input
        {...props}
        className="mt-2 w-full bg-transparent border-b border-[var(--gold)]/30 focus:border-[var(--gold-bright)] outline-none py-3 text-[var(--cream)] font-mono text-sm transition-colors"
      />
    </label>
  );
}

/* ============================================================
   KONTAKT
============================================================ */
function Kontakt() {
  return (
    <section id="kontakt" className="py-32 md:py-48 bg-[var(--ink-2)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Chapter numeral="VI" title="Kontakt & Standort" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-[var(--cream)] max-w-3xl">
            Besuchen Sie uns — <em className="text-[var(--gold-bright)]">am Salzgries.</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-3 gap-px bg-[var(--gold)]/15">
          <Reveal className="bg-[var(--ink-2)]">
            <div className="p-10 h-full">
              <div className="eyebrow text-[var(--gold-bright)] mb-6">Kontakt</div>
              <div className="space-y-5 text-[var(--cream)]/85">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[var(--cream-dim)] mb-1">Adresse</div>
                  <div className="font-display text-xl leading-snug">Salzgries 19<br/>1010 Wien, Österreich</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[var(--cream-dim)] mb-1">Telefon</div>
                  <a href="tel:+4315357230" className="font-mono text-[var(--gold-bright)] gold-underline">+43 1 5357230</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[var(--cream-dim)] mb-1">E-Mail</div>
                  <a href="mailto:heinz@dinos.at" className="font-mono text-[var(--gold-bright)] gold-underline">heinz@dinos.at</a>
                </div>
                <div className="pt-3 flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="gold-underline text-[11px] uppercase tracking-[0.3em]">Instagram</a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="gold-underline text-[11px] uppercase tracking-[0.3em]">Facebook</a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="bg-[var(--ink-2)]">
            <div className="p-10 h-full">
              <div className="eyebrow text-[var(--gold-bright)] mb-6">Öffnungszeiten</div>
              <ul className="space-y-3 text-[var(--cream)]/85 font-mono text-sm">
                <Row d="Montag" h="Ruhetag" closed />
                <Row d="Di – Do" h="17:00 – 02:00" />
                <Row d="Fr – Sa" h="17:00 – 03:00" />
                <Row d="Sonntag" h="20:00 – 00:00" />
              </ul>
              <p className="mt-6 text-xs text-[var(--cream-dim)] italic">Küche schließt 1 Stunde vor Barbetrieb.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="bg-[var(--ink-2)]">
            <div className="p-10 h-full flex flex-col">
              <div className="eyebrow text-[var(--gold-bright)] mb-6">Standort</div>
              <div className="relative flex-1 aspect-square md:aspect-auto min-h-[200px] bg-[var(--ink)] border border-[var(--gold)]/15 overflow-hidden mb-6">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(154,124,63,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(154,124,63,0.2) 1px, transparent 1px)", backgroundSize: "30px 30px, 30px 30px" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display italic text-3xl text-[var(--gold-bright)]">D</div>
                    <div className="eyebrow mt-2 text-[var(--cream-dim)] text-[10px]">Salzgries 19</div>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Salzgries+19,+1010+Wien"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-between border border-[var(--gold)]/40 px-6 py-4 text-[11px] uppercase tracking-[0.3em] text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors"
              >
                In Google Maps öffnen <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ d, h, closed }: { d: string; h: string; closed?: boolean }) {
  return (
    <li className="flex justify-between items-baseline border-b border-[var(--gold)]/10 pb-2">
      <span className="text-[var(--cream)]">{d}</span>
      <span className={closed ? "text-[var(--cream-dim)] italic" : "text-[var(--gold-bright)]"}>{h}</span>
    </li>
  );
}

/* ============================================================
   FOOTER
============================================================ */
function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            <div className="font-display italic text-4xl text-[var(--cream)]">
              <span className="text-[var(--gold-bright)]">D</span>ino&apos;s
            </div>
            <div className="eyebrow mt-3 text-[var(--cream-dim)]">Apothecary Bar · Vienna</div>
          </div>
          <ul className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.3em] text-[var(--cream)]/70">
            {[["Über uns","#about"],["Speisekarte","#speisekarte"],["Drinks","#drinks"],["Reservierung","#reservierung"],["Kontakt","#kontakt"]].map(([l,h]) => (
              <li key={h}><a href={h} className="gold-underline">{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--gold)]/10 flex flex-col md:flex-row gap-3 justify-between text-xs text-[var(--cream-dim)]">
          <div>© 2026 Dino&apos;s Apothecary Bar</div>
          <div>Salzgries 19 · 1010 Wien · Österreich</div>
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
    const h = () => setShow(window.scrollY > 600);
    h(); window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#reservierung"
          initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-4 inset-x-4 z-40 bg-[var(--gold)] text-[var(--ink)] py-4 text-center text-[11px] uppercase tracking-[0.35em] shadow-2xl"
        >
          Tisch reservieren →
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   PAGE
============================================================ */
export default function DinosPage() {
  return (
    <div className="bg-[var(--ink)] text-[var(--cream)] relative overflow-x-hidden">
      <Curtain />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Awards />
        <About />
        <Speisekarte />
        <Getraenke />
        <Galerie />
        <Reservierung />
        <Kontakt />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
