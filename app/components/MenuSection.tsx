"use client";
import { useEffect, useRef, useState } from "react";

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
  const ref  = useRef<HTMLElement>(null);
  const [v, setV]   = useState(false);
  const [cat, setCat] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="menu" ref={ref} className="section-pad" style={{ background: "var(--black)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64,
          opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 24 }}>
            <span className="gold-rule" />
            <span className="t-eyebrow">Kulinarik</span>
            <span className="gold-rule" />
          </div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.4rem, 4.5vw, 4rem)", color: "var(--text-1)", lineHeight: 1.05 }}>
            Speisekarte
          </h2>
          <p style={{ marginTop: 16, fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.2rem", color: "var(--text-2)" }}>
            Sorgfältig komponierte Küche, die den Abend begleitet.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 56,
          opacity: v ? 1 : 0, transition: "opacity 0.8s 0.15s" }}>
          {CATS.map((c, i) => (
            <button key={c.label} onClick={() => setCat(i)} style={{
              padding: "14px 36px", background: "none", border: "none", cursor: "pointer",
              fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)", fontWeight: 400,
              color: cat === i ? "var(--gold)" : "var(--text-3)",
              borderBottom: cat === i ? "1px solid var(--gold)" : "1px solid transparent",
              marginBottom: -1, transition: "color 0.25s",
            }}>{c.label}</button>
          ))}
        </div>

        {/* Items */}
        <div>
          {CATS[cat].items.map((item, i) => (
            <div key={item.name}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                padding: "28px 0", borderBottom: "1px solid var(--border)",
                opacity: v ? 1 : 0, transition: `opacity 0.6s ${0.08 * i}s`,
              }}
            >
              <div style={{ flex: 1, paddingRight: 40 }}>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 400, color: "var(--text-1)", marginBottom: 8 }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", fontWeight: 300, letterSpacing: "0.02em", lineHeight: 1.8 }}>
                  {item.desc}
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 400, color: "var(--gold)", flexShrink: 0 }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 36, textAlign: "center", fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--text-3)", fontFamily: "var(--font-sans)", opacity: v ? 0.7 : 0, transition: "opacity 0.8s 0.5s" }}>
          Alle Preise inkl. MwSt. · Küche schließt 1 Stunde vor Barbetrieb.
        </p>
      </div>
    </section>
  );
}
