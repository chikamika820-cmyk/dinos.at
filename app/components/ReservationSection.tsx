"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const WHY = [
  "Handverlesene Plätze – keine Massenreservierungen",
  "Persönliche Begrüßung durch unser Team",
  "Auf Wunsch individuelle Cocktail-Empfehlungen",
  "Besondere Anlässe werden stilvoll arrangiert",
  "Garantierter Tisch im von Ihnen gewünschten Bereich",
];

export default function ReservationSection() {
  const ref = useRef<HTMLElement>(null);
  const [v, setV]     = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "2", message: "" });

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const set = (k: string, val: string) => setForm(f => ({ ...f, [k]: val }));

  const Field = ({ id, label, type = "text", children }: { id: string; label: string; type?: string; children?: React.ReactNode }) => (
    <div className={`field-wrap${form[id as keyof typeof form] ? " has-value" : ""}`}>
      {children ?? (
        <input type={type} value={form[id as keyof typeof form]} onChange={e => set(id, e.target.value)} required={id !== "phone" && id !== "message"} />
      )}
      <label>{label}</label>
    </div>
  );

  return (
    <section id="reservation" ref={ref} style={{ position: "relative", background: "var(--surface-1)", overflow: "hidden" }}>

      {/* Background image accent */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1400&q=70"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,14,0.93)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1320, margin: "0 auto", padding: "clamp(72px,10vw,120px) 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 6vw, 96px)", alignItems: "start" }} className="res-grid">

          {/* Left: Trust + info */}
          <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <span className="gold-rule" />
              <span className="t-eyebrow">Reservierung</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.4rem, 4vw, 3.8rem)", lineHeight: 1.1, color: "var(--text-1)", marginBottom: 24 }}>
              Reserviere deinen
              <br />
              <em className="gold-text" style={{ fontStyle: "italic" }}>perfekten Abend</em>
            </h2>
            <p className="t-body" style={{ marginBottom: 48 }}>
              Bei Dino's Apothecary Bar ist jeder Abend ein Erlebnis.
              Mit einer Reservierung stellst du sicher, dass wir uns
              die Zeit nehmen, deinen Abend unvergesslich zu machen.
            </p>

            {/* Why list */}
            <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 56 }}>
              {WHY.map((w, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <Check size={10} color="var(--gold)" />
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.6 }}>{w}</span>
                </li>
              ))}
            </ul>

            {/* Direct contact */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 12, fontFamily: "var(--font-sans)" }}>
                Oder direkt anrufen
              </p>
              <a href="tel:+43155357230" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300, color: "var(--gold)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--gold)")}>
                +43 1 5357230
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.9s 0.2s cubic-bezier(0.22,1,0.36,1), transform 0.9s 0.2s cubic-bezier(0.22,1,0.36,1)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "80px 40px", border: "1px solid var(--border)" }}>
                <div style={{ width: 64, height: 64, margin: "0 auto 28px", borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={24} color="var(--gold)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300, color: "var(--text-1)", marginBottom: 16 }}>
                  Anfrage gesendet
                </h3>
                <p className="t-body">
                  Wir melden uns innerhalb von 24 Stunden
                  unter <span style={{ color: "var(--gold)" }}>{form.email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{ display: "flex", flexDirection: "column", gap: 12, padding: "40px", border: "1px solid var(--border)", background: "rgba(8,8,8,0.5)" }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field id="name" label="Name" />
                  <Field id="email" label="E-Mail" type="email" />
                  <Field id="phone" label="Telefon" type="tel" />
                  <Field id="guests" label="Personen">
                    <select value={form.guests} onChange={e => set("guests", e.target.value)}>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "Person" : "Personen"}</option>)}
                      <option value="9+">9+ Personen</option>
                    </select>
                  </Field>
                  <Field id="date" label="Datum" type="date" />
                  <Field id="time" label="Uhrzeit">
                    <select value={form.time} onChange={e => set("time", e.target.value)}>
                      <option value="">Bitte wählen</option>
                      {["17:00","18:00","19:00","20:00","21:00","22:00","23:00"].map(t => (
                        <option key={t} value={t}>{t} Uhr</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className={`field-wrap textarea-wrap${form.message ? " has-value" : ""}`}>
                  <textarea rows={4} value={form.message} onChange={e => set("message", e.target.value)} style={{ resize: "none" }} />
                  <label>Anmerkungen (optional)</label>
                </div>

                <button type="submit" className="btn-gold" style={{ marginTop: 8, justifyContent: "center" }}>
                  Reservierung anfragen
                </button>
                <p style={{ fontSize: "0.62rem", textAlign: "center", color: "var(--text-3)", fontFamily: "var(--font-sans)", letterSpacing: "0.05em" }}>
                  Kostenlos & unverbindlich · Bestätigung innerhalb 24h
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .res-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
