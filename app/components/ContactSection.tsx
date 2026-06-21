"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Reveal from "./motion/Reveal";
import ChapterEyebrow from "./motion/ChapterEyebrow";
import { staggerContainer, fadeUp, viewportOnce } from "@/app/lib/motion";

const HOURS = [
  { day: "Montag",     time: "Ruhetag",      closed: true },
  { day: "Di–Do",      time: "17:00–02:00" },
  { day: "Fr–Sa",      time: "17:00–03:00" },
  { day: "Sonntag",    time: "20:00–00:00" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function ContactSection() {
  const [today, setToday] = useState(-1);
  useEffect(() => {
    // Date() is client-only — read it after mount to avoid an SSR/client hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(new Date().getDay());
  }, []);

  const isOpen = (day: string) => {
    if (day === "Di–Do") return today >= 2 && today <= 4;
    if (day === "Fr–Sa") return today === 5 || today === 6;
    if (day === "Sonntag") return today === 0;
    return false;
  };

  return (
    <section id="contact" className="section-pad" style={{ background: "var(--black)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <ChapterEyebrow roman="VI" style={{ marginBottom: 24 }}>Kontakt & Standort</ChapterEyebrow>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", color: "var(--text-1)", lineHeight: 1.05 }}>
              Wir freuen uns auf dich
            </h2>
          </Reveal>
        </div>

        <motion.div
          initial="hidden" whileInView="show" viewport={viewportOnce} variants={staggerContainer(0.12)}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }} className="contact-grid"
        >

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <p className="t-eyebrow" style={{ marginBottom: 32 }}>Kontakt</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { icon: MapPin, label: "Adresse", value: "Salzgries 19\n1010 Wien, Österreich", href: "https://maps.google.com/?q=Salzgries+19,+1010+Wien" },
                { icon: Phone,  label: "Telefon", value: "+43 1 5357230", href: "tel:+43155357230" },
                { icon: Mail,   label: "E-Mail",  value: "heinz@dinos.at", href: "mailto:heinz@dinos.at" },
              ].map(c => (
                <a key={c.label} href={c.href} target={c.icon === MapPin ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ display: "flex", gap: 16, textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  <div style={{ width: 40, height: 40, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <c.icon size={15} color="var(--gold)" />
                  </div>
                  <div>
                    <p className="t-label" style={{ marginBottom: 4 }}>{c.label}</p>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-1)", fontFamily: "var(--font-sans)", fontWeight: 300, whiteSpace: "pre-line" }}>{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 40 }}>
              <p className="t-eyebrow" style={{ marginBottom: 16 }}>Social Media</p>
              <div style={{ display: "flex", gap: 10 }}>
                {[InstagramIcon, FacebookIcon].map((Icon, i) => (
                  <button key={i} style={{ width: 44, height: 44, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-2)", transition: "border-color 0.25s, color 0.25s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)"; }}>
                    <Icon />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div variants={fadeUp}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <Clock size={13} color="var(--gold)" />
              <p className="t-eyebrow">Öffnungszeiten</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {HOURS.map((h) => {
                const active = !h.closed && isOpen(h.day);
                return (
                  <div key={h.day} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0", borderBottom: "1px solid var(--border)",
                    background: active ? "rgba(196,151,58,0.04)" : "transparent",
                    transition: "background 0.4s",
                  }}>
                    <span style={{ fontSize: "0.85rem", color: active ? "var(--gold)" : "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                      {h.day}
                      {active && <span style={{ marginLeft: 8, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.7 }}>· Heute</span>}
                    </span>
                    <span style={{ fontSize: "0.85rem", fontFamily: "var(--font-sans)", fontWeight: 300, color: h.closed ? "var(--text-3)" : "var(--text-1)", fontStyle: h.closed ? "italic" : "normal" }}>
                      {h.time}
                    </span>
                  </div>
                );
              })}
            </div>
            <p style={{ marginTop: 16, fontSize: "0.62rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", letterSpacing: "0.05em" }}>
              Küche schließt 1 Stunde vor Barbetrieb.
            </p>
          </motion.div>

          {/* Map */}
          <motion.div variants={fadeUp}>
            <p className="t-eyebrow" style={{ marginBottom: 32 }}>Standort</p>
            <div style={{ position: "relative", height: 320, border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", background: "var(--surface-2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(196,151,58,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(196,151,58,0.06) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
                <div style={{ zIndex: 1, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <MapPin size={20} color="var(--gold)" />
                  </div>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", color: "var(--text-1)", marginBottom: 4 }}>Salzgries 19</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-3)", fontFamily: "var(--font-sans)" }}>1010 Wien</p>
                  <a href="https://maps.google.com/?q=Salzgries+19,+1010+Wien" target="_blank" rel="noopener noreferrer"
                    className="btn-outline" style={{ display: "inline-flex", marginTop: 24, padding: "10px 24px", fontSize: "0.58rem" }}>
                    In Google Maps öffnen ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px)  { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
