"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./motion/Reveal";
import ChapterEyebrow from "./motion/ChapterEyebrow";
import Magnetic from "./motion/Magnetic";
import { staggerContainer, fadeUp, viewportOnce, EASE_SMOOTH } from "@/app/lib/motion";

const WHY = [
  "Handverlesene Plätze – keine Massenreservierungen",
  "Persönliche Begrüßung durch unser Team",
  "Auf Wunsch individuelle Cocktail-Empfehlungen",
  "Besondere Anlässe werden stilvoll arrangiert",
  "Garantierter Tisch im von Ihnen gewünschten Bereich",
];

const REQUIRED = ["name", "email", "date", "time"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  id, label, type = "text", children, value, error, onChange, onBlur,
}: {
  id: string; label: string; type?: string; children?: React.ReactNode;
  value: string; error: string | null; onChange: (v: string) => void; onBlur: () => void;
}) {
  return (
    <div>
      <div className={`field-wrap${value ? " has-value" : ""}`} style={error ? { borderColor: "#C0524A" } : undefined}>
        {children ?? (
          <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur}
            style={error ? { borderColor: "#C0524A" } : undefined} />
        )}
        <label htmlFor={id}>{label}</label>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "0.65rem", color: "#C0524A", marginTop: 4, fontFamily: "var(--font-sans)" }}>
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function ReservationSection() {
  const [sent, setSent]   = useState(false);
  const [form, setForm]   = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "2", area: "Keine Präferenz", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (k: string, val: string) => setForm(f => ({ ...f, [k]: val }));
  const blur = (k: string) => setTouched(t => ({ ...t, [k]: true }));

  const fieldError = (id: string) => {
    if (!touched[id]) return null;
    if (REQUIRED.includes(id) && !form[id as keyof typeof form]) return "Pflichtfeld";
    if (id === "email" && form.email && !EMAIL_RE.test(form.email)) return "Bitte gültige E-Mail angeben";
    return null;
  };

  return (
    <section id="reservation" style={{ position: "relative", background: "var(--surface-1)", overflow: "hidden" }}>

      {/* Background image accent */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1400&q=70"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(21,16,12,0.93)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1320, margin: "0 auto", padding: "clamp(72px,10vw,120px) 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 6vw, 96px)", alignItems: "start" }} className="res-grid">

          {/* Left: Trust + info */}
          <Reveal>
            <ChapterEyebrow roman="V" style={{ marginBottom: 28 }}>Reservierung</ChapterEyebrow>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.6rem, 4.5vw, 4rem)", lineHeight: 1.05, color: "var(--text-1)", marginBottom: 24 }}>
              Reserviere deinen
              <br />
              <em className="gold-text" style={{ fontStyle: "italic" }}>perfekten Abend</em>
            </h2>
            <p className="t-body" style={{ marginBottom: 48 }}>
              Bei Dino&apos;s Apothecary Bar ist jeder Abend ein Erlebnis.
              Mit einer Reservierung stellst du sicher, dass wir uns
              die Zeit nehmen, deinen Abend unvergesslich zu machen.
            </p>

            {/* Why list */}
            <motion.ul
              initial="hidden" whileInView="show" viewport={viewportOnce} variants={staggerContainer(0.08)}
              style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}
            >
              {WHY.map((w, i) => (
                <motion.li key={i} variants={fadeUp} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontSize: "0.6rem", color: "var(--gold)" }}>
                    ✓
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.6 }}>{w}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Trust badge */}
            <Reveal delay={0.1} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 16px", border: "1px solid var(--border-mid)", marginBottom: 40 }}>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", color: "var(--gold)", lineHeight: 1 }}>3×</span>
              <span className="t-label">Falstaff Award · Beste American Bar</span>
            </Reveal>

            {/* Direct contact */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
              <p className="t-label" style={{ marginBottom: 12 }}>ODER DIREKT ANRUFEN</p>
              <a href="tel:+43155357230" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300, color: "var(--gold)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--gold)")}>
                +43 1 5357230
              </a>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE_SMOOTH }}
                  style={{ textAlign: "center", padding: "80px 40px", border: "1px solid var(--border)" }}>
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                    style={{ width: 64, height: 64, margin: "0 auto 28px", borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <motion.path d="M5 12.5L9.5 17L19 6.5" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: "easeInOut", delay: 0.35 }} />
                    </svg>
                  </motion.div>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300, color: "var(--text-1)", marginBottom: 16 }}>
                    Anfrage gesendet
                  </h3>
                  <p className="t-body">
                    Wir melden uns innerhalb von 24 Stunden
                    unter <span style={{ color: "var(--gold)" }}>{form.email}</span>.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTouched({ name: true, email: true, date: true, time: true });
                    const valid = REQUIRED.every(k => form[k as keyof typeof form]) && EMAIL_RE.test(form.email);
                    if (valid) setSent(true);
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: 14, padding: "44px", border: "1px solid var(--border)", borderTop: "2px solid var(--gold)", background: "rgba(10,8,7,0.55)", boxShadow: "0 32px 90px rgba(0,0,0,0.45)" }}>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field id="name" label="Name" value={form.name} error={fieldError("name")} onChange={v => set("name", v)} onBlur={() => blur("name")} />
                    <Field id="email" label="E-Mail" type="email" value={form.email} error={fieldError("email")} onChange={v => set("email", v)} onBlur={() => blur("email")} />
                    <Field id="phone" label="Telefon" type="tel" value={form.phone} error={fieldError("phone")} onChange={v => set("phone", v)} onBlur={() => blur("phone")} />
                    <Field id="guests" label="Personen" value={form.guests} error={null} onChange={v => set("guests", v)} onBlur={() => {}}>
                      <select id="guests" value={form.guests} onChange={e => set("guests", e.target.value)}>
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "Person" : "Personen"}</option>)}
                        <option value="9+">9+ Personen</option>
                      </select>
                    </Field>
                    <Field id="date" label="Datum" type="date" value={form.date} error={fieldError("date")} onChange={v => set("date", v)} onBlur={() => blur("date")} />
                    <Field id="time" label="Uhrzeit" value={form.time} error={fieldError("time")} onChange={v => set("time", v)} onBlur={() => blur("time")}>
                      <select id="time" value={form.time} onChange={e => set("time", e.target.value)} onBlur={() => blur("time")}>
                        <option value="">Bitte wählen</option>
                        {["17:00","18:00","19:00","20:00","21:00","22:00","23:00"].map(t => (
                          <option key={t} value={t}>{t} Uhr</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="area" label="Bereich" value={form.area} error={null} onChange={v => set("area", v)} onBlur={() => {}}>
                      <select id="area" value={form.area} onChange={e => set("area", e.target.value)}>
                        <option value="Bar">Bar</option>
                        <option value="Lounge">Lounge</option>
                        <option value="Saal">Saal (Separée)</option>
                        <option value="Keine Präferenz">Keine Präferenz</option>
                      </select>
                    </Field>
                  </div>

                  <div className={`field-wrap textarea-wrap${form.message ? " has-value" : ""}`}>
                    <textarea id="message" rows={4} value={form.message} onChange={e => set("message", e.target.value)} style={{ resize: "none" }} />
                    <label htmlFor="message">Anmerkungen (optional)</label>
                  </div>

                  <Magnetic strength={0.2} max={6}>
                    <button type="submit" className="btn-gold" style={{ marginTop: 8, justifyContent: "center", width: "100%" }}>
                      Reservierung anfragen
                    </button>
                  </Magnetic>
                  <p style={{ fontSize: "0.62rem", textAlign: "center", color: "var(--text-3)", fontFamily: "var(--font-sans)", letterSpacing: "0.05em" }}>
                    Kostenlos & unverbindlich · Antwort meist in unter 2 Stunden
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .res-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
