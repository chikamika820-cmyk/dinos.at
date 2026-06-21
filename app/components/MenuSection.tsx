"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./motion/Reveal";
import ChapterEyebrow from "./motion/ChapterEyebrow";
import { DUR, EASE_SMOOTH } from "@/app/lib/motion";

const CATS = [
  {
    label: "Starters",
    items: [
      { name: "Oliven & Focaccia",     desc: "Marinierte Oliven · hausgemachtes Focaccia · Kräuteröl",                    price: "€ 8" },
      { name: "Charcuterie Board",      desc: "Österreichische Wurst & Käse · Senf · Cornichons · Brioche",                price: "€ 18" },
      { name: "Burrata",                desc: "Hausgemachte Burrata · Heirloom-Tomaten · Basilikumöl · Fleur de Sel",      price: "€ 14" },
      { name: "Beef Tartare",           desc: "Handgehacktes Rindfleisch · Eigelb · Kapern · Challot · Baguette",          price: "€ 16" },
      { name: "Black Truffle Fries",    desc: "Crispy Pommes · schwarze Trüffel · Parmigiano Reggiano · Aioli",            price: "€ 12" },
    ],
  },
  {
    label: "Kleine Gerichte",
    items: [
      { name: "Wagyu Slider",           desc: "Wagyu-Patty · karamellisierte Zwiebeln · Aged Cheddar · Brioche",           price: "€ 19" },
      { name: "Lobster Bisque",         desc: "Cremige Hummerbisque · Cognac-Schaum · Kräuteröl · Baguette",               price: "€ 17" },
      { name: "Tagliatelle al Tartufo", desc: "Hausgemachte Pasta · schwarze Trüffel · Parmigiano · Butter",               price: "€ 22" },
      { name: "Steak & Bourbon Butter", desc: "200g Dry-Aged Entrecôte · Bourbon-Kräuterbutter · Watercress",              price: "€ 34" },
    ],
  },
  {
    label: "Desserts",
    items: [
      { name: "Dark Chocolate Fondant", desc: "Valrhona 70% · Vanilleeis · Meersalz · Haselnusskrokant",                   price: "€ 11" },
      { name: "Crème Brûlée",          desc: "Madagaskar Vanille · karamellisierte Zuckerkruste · Beeren",                 price: "€ 9" },
      { name: "Cheese Selection",       desc: "3 kuratierte Käsesorten · Wildhonig · Walnüsse · Weintrauben",               price: "€ 16" },
    ],
  },
];

export default function MenuSection() {
  const [cat, setCat] = useState(0);

  return (
    <section id="menu" className="section-pad" style={{ background: "var(--black)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <ChapterEyebrow roman="II" align="center" style={{ justifyContent: "center", marginBottom: 24 }}>Tafel</ChapterEyebrow>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", color: "var(--text-1)", lineHeight: 1.05 }}>
              Speisekarte
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p style={{ marginTop: 16, fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.2rem", color: "var(--text-2)" }}>
              Sorgfältig komponierte Küche, die den Abend begleitet.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={0.2} style={{ display: "flex", justifyContent: "center", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 56 }}>
          {CATS.map((c, i) => (
            <button key={c.label} onClick={() => setCat(i)} style={{
              position: "relative", padding: "14px 36px", background: "none", border: "none", cursor: "pointer",
              fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)", fontWeight: 400,
              color: cat === i ? "var(--gold)" : "var(--text-3)",
              marginBottom: -1, transition: "color 0.25s",
            }}>
              {c.label}
              {cat === i && (
                <motion.div layoutId="menu-tab-pill" transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
                  style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 1, background: "var(--gold)" }} />
              )}
            </button>
          ))}
        </Reveal>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
          >
            {CATS[cat].items.map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: i * 0.05, duration: DUR.medium } }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 0", borderBottom: "1px solid var(--border)" }}
              >
                <div style={{ flex: 1, paddingRight: 40 }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 400, color: "var(--text-1)", marginBottom: 8 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", fontWeight: 300, letterSpacing: "0.02em", lineHeight: 1.8 }}>
                    {item.desc}
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 400, color: "var(--gold)", flexShrink: 0 }}>
                  {item.price}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.1}>
          <p style={{ marginTop: 36, textAlign: "center", fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--text-3)", fontFamily: "var(--font-sans)", opacity: 0.7 }}>
            Alle Preise inkl. MwSt. · Küche schließt 1 Stunde vor Barbetrieb.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
