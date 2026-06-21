"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./motion/Reveal";
import ChapterEyebrow from "./motion/ChapterEyebrow";
import { DUR, EASE_SMOOTH } from "@/app/lib/motion";

type Drink = { name: string; desc: string; base: string; price: string };
const CATS: { label: string; drinks: Drink[] }[] = [
  {
    label: "Signature",
    drinks: [
      { name: "Apothecary No. 1",  desc: "Gin · Chartreuse Verte · Yuzu · Thymianblüte · Egg White",           base: "GIN",    price: "€ 16" },
      { name: "Kaiser's Gold",     desc: "Bourbon · Honig-Ingwer · Zitrone · Angostura · Goldstaub",            base: "BOURBON",price: "€ 17" },
      { name: "Salzgries Sour",    desc: "Aperol · Campari · Grapefruit · Rosé Champagner · Rosenwasser",       base: "APEROL", price: "€ 15" },
      { name: "Vienna Noir",       desc: "Mezcal · Cold Brew · Kahlúa · Madagaskar Vanille · Mole Bitters",     base: "MEZCAL", price: "€ 17" },
      { name: "The Remedy",        desc: "Rum · Kurkuma · Kokoswasser · Limette · Ingwer",                       base: "RUM",    price: "€ 15" },
      { name: "Garden Elixir",     desc: "Hendrick's · Gurke · Dill · Elderflower · Tonic",                      base: "GIN",    price: "€ 14" },
    ],
  },
  {
    label: "Classics",
    drinks: [
      { name: "Old Fashioned",    desc: "Woodford Reserve · Demerara · Angostura · Orangenschale",              base: "BOURBON",price: "€ 14" },
      { name: "Negroni",          desc: "Tanqueray · Campari · Martini Rosso · Orangenbitter",                  base: "GIN",    price: "€ 13" },
      { name: "Dry Martini",      desc: "Belvedere oder Beefeater · Noilly Prat · Oliven-Zeste",               base: "VODKA",  price: "€ 13" },
      { name: "Whisky Sour",      desc: "Monkey Shoulder · Zitrone · Zuckersirup · Egg White",                 base: "WHISKY", price: "€ 13" },
      { name: "Espresso Martini", desc: "Absolut · Kahlúa · frischer Espresso · Vanille",                      base: "VODKA",  price: "€ 14" },
      { name: "Daiquiri",         desc: "Bacardi Blanco · frischer Limettensaft · Zuckersirup",                base: "RUM",    price: "€ 12" },
    ],
  },
  {
    label: "Alkoholfrei",
    drinks: [
      { name: "Garden of Eden",   desc: "Gurke · Basilikum · Limette · Agave · Soda",                         base: "MOCKTAIL",price: "€ 9" },
      { name: "Golden Hour",      desc: "Mango · Maracuja · Ingwer · Zitronengras · Kokoswasser",             base: "MOCKTAIL",price: "€ 9" },
      { name: "Vienna Rose",      desc: "Himbeere · Rosenwasser · Zitrone · Tonic · Blütendekor",             base: "MOCKTAIL",price: "€ 9" },
      { name: "Smoked Citrus",    desc: "Rauchige Kräuter · Blutorange · Honig · Ginger Beer",                base: "MOCKTAIL",price: "€ 10" },
    ],
  },
];

export default function DrinksSection() {
  const [cat, setCat] = useState(0);

  return (
    <section id="drinks" className="section-pad" style={{ background: "var(--surface-2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", marginBottom: 72 }}>
          <div>
            <ChapterEyebrow roman="III" style={{ marginBottom: 24 }}>Rezepturen</ChapterEyebrow>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", color: "var(--text-1)", lineHeight: 1.05 }}>
                Getränkekarte
              </h2>
            </Reveal>
          </div>
          {/* Tab switcher */}
          <Reveal delay={0.2} style={{ gap: 0, borderBottom: "1px solid var(--border)" }} className="hidden md:flex">
            {CATS.map((c, i) => (
              <button key={c.label} onClick={() => setCat(i)} style={{
                position: "relative", padding: "12px 28px", background: "none", border: "none", cursor: "pointer",
                fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase",
                fontFamily: "var(--font-sans)", fontWeight: 400,
                color: cat === i ? "var(--gold)" : "var(--text-3)",
                marginBottom: -1, transition: "color 0.25s",
              }}>
                {c.label}
                {cat === i && (
                  <motion.div layoutId="drinks-tab-pill" transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
                    style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 1, background: "var(--gold)" }} />
                )}
              </button>
            ))}
          </Reveal>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden" style={{ display: "flex", gap: 8, marginBottom: 40, overflowX: "auto" }}>
          {CATS.map((c, i) => (
            <button key={c.label} onClick={() => setCat(i)} style={{
              padding: "10px 20px", flexShrink: 0,
              background: cat === i ? "var(--gold-dim)" : "transparent",
              border: cat === i ? "1px solid var(--gold)" : "1px solid var(--border)",
              borderRadius: 2, cursor: "pointer",
              fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)", color: cat === i ? "var(--gold)" : "var(--text-3)",
              transition: "background 0.25s, border-color 0.25s, color 0.25s",
            }}>{c.label}</button>
          ))}
        </div>

        {/* Drinks list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))", gap: 1, background: "var(--border)" }}
          >
            {CATS[cat].drinks.map((d, i) => (
              <motion.div key={d.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: i * 0.04, duration: DUR.medium } }}
                style={{ padding: "32px 28px", background: "var(--surface-2)", display: "flex", gap: 20, alignItems: "flex-start", cursor: "default", transition: "background 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-3)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--surface-2)")}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 400, color: "var(--text-1)" }}>
                      {d.name}
                    </h3>
                    <span className="t-label" style={{ paddingTop: 2 }}>{d.base}</span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", fontWeight: 300, letterSpacing: "0.02em", lineHeight: 1.7 }}>
                    {d.desc}
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 400, color: "var(--gold)", flexShrink: 0, paddingTop: 4 }}>
                  {d.price}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.1}>
          <p style={{ marginTop: 32, fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--text-3)", fontFamily: "var(--font-sans)", opacity: 0.7 }}>
            Saisonale Kreationen · Alle Preise inkl. MwSt. · Bitte Allergien beim Personal angeben.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
