"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { EASE_SMOOTH } from "@/app/lib/motion";

export default function CartDrawer() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <AnimatePresence>
      {state.open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            onClick={() => dispatch({ type: "CLOSE" })}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(8,10,18,0.85)", backdropFilter: "blur(6px)" }}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.48, ease: EASE_SMOOTH }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
              width: "min(500px, 100vw)",
              background: "var(--surface-1)",
              borderLeft: "1px solid var(--border)",
              display: "flex", flexDirection: "column",
              boxShadow: "-40px 0 120px rgba(0,0,0,0.7)",
            }}
          >
            {/* Drawer header */}
            <div style={{
              padding: "36px 32px 28px",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: "0.58rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)", marginBottom: 6 }}>
                  Dino&apos;s Shop
                </div>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.9rem", fontWeight: 300, color: "var(--text-1)", lineHeight: 1 }}>
                  Warenkorb
                  {count > 0 && (
                    <span style={{ fontSize: "1rem", color: "var(--gold)", marginLeft: 12 }}>({count})</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: "CLOSE" })}
                aria-label="Warenkorb schließen"
                style={{
                  width: 44, height: 44, border: "1px solid var(--border)", background: "none",
                  cursor: "pointer", color: "var(--text-2)", display: "flex", alignItems: "center",
                  justifyContent: "center", transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget).style.borderColor = "var(--gold)"; (e.currentTarget).style.color = "var(--gold)"; }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = "var(--border)"; (e.currentTarget).style.color = "var(--text-2)"; }}
              >
                <X size={17} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 32px" }}>
              {state.items.length === 0 ? (
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", height: "100%", gap: 24, textAlign: "center", padding: "48px 0",
                }}>
                  <div style={{
                    width: 72, height: 72, border: "1px solid var(--border)",
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: "var(--gold-dim)",
                  }}>
                    <ShoppingCart size={26} color="var(--text-3)" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 300, color: "var(--text-2)", marginBottom: 8, fontStyle: "italic" }}>
                      Ihr Warenkorb ist derzeit leer.
                    </p>
                    <p style={{ fontSize: "0.76rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.7, marginBottom: 4 }}>
                      Entdecken Sie unsere exklusiven Produkte.
                    </p>
                    <p style={{ fontSize: "1rem", opacity: 0.5 }}>&#128542;</p>
                  </div>
                  <button
                    onClick={() => { dispatch({ type: "CLOSE" }); setTimeout(() => document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" }), 400); }}
                    className="btn-outline"
                    style={{ padding: "13px 36px", fontSize: "0.62rem" }}
                  >
                    Shop entdecken
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", paddingTop: 8 }}>
                  <AnimatePresence>
                    {state.items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0, paddingBottom: 0 }}
                        transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                        style={{
                          display: "flex", gap: 18,
                          padding: "24px 0", borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <div style={{ width: 80, height: 80, position: "relative", flexShrink: 0, overflow: "hidden", border: "1px solid var(--border)" }}>
                          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="80px" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 4 }}>
                            {item.category}
                          </div>
                          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", fontWeight: 400, color: "var(--text-1)", marginBottom: 6, letterSpacing: "0.02em", lineHeight: 1.3 }}>
                            {item.name}
                          </div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--gold)", marginBottom: 14 }}>
                            € {item.price.toFixed(2)}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                            <button
                              onClick={() => dispatch({ type: "QTY", id: item.id, qty: item.qty - 1 })}
                              style={{ width: 30, height: 30, border: "1px solid var(--border)", background: "none", cursor: "pointer", color: "var(--text-2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
                              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--gold)")}
                              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                            ><Minus size={10} /></button>
                            <span style={{ width: 36, textAlign: "center", fontSize: "0.88rem", fontFamily: "var(--font-sans)", color: "var(--text-1)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", height: 30, lineHeight: "28px" }}>
                              {item.qty}
                            </span>
                            <button
                              onClick={() => dispatch({ type: "QTY", id: item.id, qty: item.qty + 1 })}
                              style={{ width: 30, height: 30, border: "1px solid var(--border)", background: "none", cursor: "pointer", color: "var(--text-2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
                              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--gold)")}
                              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                            ><Plus size={10} /></button>
                            <button
                              onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                              style={{ marginLeft: "auto", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", fontFamily: "var(--font-sans)", transition: "color 0.2s", padding: "4px 0" }}
                              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
                            >Entfernen</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ padding: "28px 32px 40px", borderTop: "1px solid var(--border)" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 4 }}>Gesamt inkl. MwSt.</div>
                    <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.75rem", color: "var(--text-3)", fontWeight: 300 }}>zzgl. Versand</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", color: "var(--gold)" }}>
                    € {total.toFixed(2)}
                  </div>
                </div>
                <button className="btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "0.68rem", padding: "17px" }}>
                  Zur Kasse ↗
                </button>
                <p style={{ textAlign: "center", fontSize: "0.56rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", marginTop: 14 }}>
                  Sichere Zahlung · 30 Tage Rückgabe
                </p>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
