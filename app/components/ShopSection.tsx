"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import Reveal from "./motion/Reveal";
import ChapterEyebrow from "./motion/ChapterEyebrow";
import { staggerContainer, scaleIn, viewportOnce, DUR, EASE_SMOOTH } from "@/app/lib/motion";
import { useCart } from "@/app/context/CartContext";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
};

const CATEGORIES = ["Alle", "Cocktail Kits", "Spirituosen", "Geschenke", "Gutscheine"];

const PRODUCTS: Product[] = [
  {
    id: "shop-01",
    name: "Apothecary Home Kit",
    subtitle: "Signature Cocktail Set",
    desc: "Alles, was Sie brauchen, um unsere Signature Cocktails zu Hause zu kreieren. Mit handsignierten Rezeptkarten.",
    price: 49,
    category: "Cocktail Kits",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=85",
    badge: "Bestseller",
  },
  {
    id: "shop-02",
    name: "Kaiser's Selection Box",
    subtitle: "Kuratierte Whisky-Edition",
    desc: "Vier handverlesene Single Malts, persönlich ausgewählt von Bartender-des-Jahres Heinz Kaiser.",
    price: 129,
    category: "Spirituosen",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&q=85",
    badge: "Premium",
  },
  {
    id: "shop-03",
    name: "Vienna Cocktail Set",
    subtitle: "Zwei Signature Cocktails & Gläser",
    desc: "Das ultimative Geschenk: zwei Signature Cocktails in Flaschen abgefüllt, dazu zwei handgefertigte Rocks-Gläser.",
    price: 65,
    category: "Geschenke",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=85",
  },
  {
    id: "shop-04",
    name: "Dino's Glaswaren Set",
    subtitle: "4× Premium Rocks Glas",
    desc: "Handgefertigte Rocks-Gläser mit dem Dino's Apothecary Monogramm — eine elegante Ergänzung jeder Hausbar.",
    price: 75,
    category: "Geschenke",
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&q=85",
  },
  {
    id: "shop-05",
    name: "Gin Botanicals Kit",
    subtitle: "Craft Gin Erlebnis",
    desc: "Zwölf seltene Botanicals und ein kleines Still-Destillat als Basis — erschaffen Sie Ihren eigenen Gin.",
    price: 55,
    category: "Cocktail Kits",
    image: "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=600&q=85",
  },
  {
    id: "shop-06",
    name: "Bartender Experience",
    subtitle: "Private Cocktail Masterclass",
    desc: "Zwei Stunden private Cocktail-Masterclass mit einem unserer Expert-Bartender — für unvergessliche 2 Personen.",
    price: 160,
    category: "Geschenke",
    image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=600&q=85",
    badge: "Erlebnis",
  },
  {
    id: "voucher-50",
    name: "Geschenkgutschein",
    subtitle: "Wert: € 50",
    desc: "Einlösbar für alle Produkte, Erlebnisse und Barbesuche bei Dino's Apothecary Bar. Gültig 3 Jahre.",
    price: 50,
    category: "Gutscheine",
    image: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=600&q=85",
  },
  {
    id: "voucher-100",
    name: "Geschenkgutschein",
    subtitle: "Wert: € 100",
    desc: "Das perfekte Geschenk für jeden Anlass — einlösbar für alle Produkte und Erlebnisse.",
    price: 100,
    category: "Gutscheine",
    image: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=600&q=85",
    badge: "Beliebt",
  },
];

function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    dispatch({
      type: "ADD",
      item: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.article
      variants={scaleIn}
      style={{ position: "relative", background: "var(--surface-1)", border: "1px solid var(--border)", overflow: "hidden", cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: "absolute", top: 16, left: 16, zIndex: 10,
          padding: "5px 12px",
          background: "var(--gold)",
          fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase",
          fontFamily: "var(--font-sans)", color: "var(--black)", fontWeight: 500,
        }}>
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="eager"
          style={{
            objectFit: "cover",
            transition: "transform 0.8s var(--ease-smooth)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(13,20,33,0.7) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0.3, transition: "opacity 0.4s",
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "28px 28px 32px" }}>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 6 }}>
          {product.subtitle}
        </div>
        <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.35rem", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.2, marginBottom: 12, letterSpacing: "0.02em" }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "0.8rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.75, marginBottom: 24 }}>
          {product.desc}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", color: "var(--gold)" }}>
            € {product.price}
          </span>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "11px 20px",
              background: added ? "var(--gold-dim)" : "transparent",
              border: added ? "1px solid var(--gold)" : "1px solid var(--border-mid)",
              color: added ? "var(--gold)" : "var(--text-2)",
              fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)", cursor: "pointer",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { if (!added) { (e.currentTarget).style.borderColor = "var(--gold)"; (e.currentTarget).style.color = "var(--gold)"; } }}
            onMouseLeave={e => { if (!added) { (e.currentTarget).style.borderColor = "var(--border-mid)"; (e.currentTarget).style.color = "var(--text-2)"; } }}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: DUR.fast }}>
                  <Check size={12} />
                </motion.span>
              ) : (
                <motion.span key="bag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: DUR.fast }}>
                  <ShoppingBag size={12} />
                </motion.span>
              )}
            </AnimatePresence>
            {added ? "Hinzugefügt" : "In den Korb"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filtered = activeCategory === "Alle"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="shop" className="section-pad" style={{ background: "var(--surface-2)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 32 }}>
          <div>
            <ChapterEyebrow roman="VII" style={{ marginBottom: 24 }}>Shop</ChapterEyebrow>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", color: "var(--text-1)", lineHeight: 1.05 }}>
                Dino&apos;s Shop
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p style={{ marginTop: 12, fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.2rem", color: "var(--text-2)" }}>
                Cocktail-Erleben für Zuhause. Unvergessliche Geschenke.
              </p>
            </Reveal>
          </div>

          {/* Category filter */}
          <Reveal delay={0.2}>
            <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)" }} className="shop-cats">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    position: "relative", padding: "12px 20px",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase",
                    fontFamily: "var(--font-sans)", fontWeight: 400,
                    color: activeCategory === cat ? "var(--gold)" : "var(--text-3)",
                    marginBottom: -1, transition: "color 0.25s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="shop-cat-pill"
                      transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
                      style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 1, background: "var(--gold)" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.07)}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 1, background: "var(--border)" }}
              className="shop-grid"
            >
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.1}>
          <p style={{ marginTop: 32, fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--text-3)", fontFamily: "var(--font-sans)", opacity: 0.7 }}>
            Kostenlose Lieferung ab € 80 · Sichere Zahlung · 30 Tage Rückgabe
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .shop-cats { flex-wrap: wrap; }
          .shop-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 960px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
