"use client";
import Reveal from "./motion/Reveal";

const NAV_LINKS = [
  ["Über uns",      "#about"],
  ["Speisekarte",   "#menu"],
  ["Getränke",      "#drinks"],
  ["Galerie",       "#gallery"],
  ["Shop",          "#shop"],
  ["Reservierung",  "#reservation"],
  ["Kontakt",       "#contact"],
];

const AWARDS = [
  "Beste American Bar 2025",
  "Beste American Bar 2024",
  "Bartender des Jahres 2024",
  "Bars & Spirits Award 2024",
  "Beste American Bar 2023",
];

export default function Footer() {
  return (
    <footer style={{ background: "#040609", borderTop: "1px solid var(--border)" }}>

      {/* Top decorative bar */}
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, var(--gold), var(--copper), var(--gold), transparent)", opacity: 0.4 }} />

      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "88px 36px 52px" }}>
        <Reveal style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1.2fr", gap: "clamp(40px, 5vw, 80px)", marginBottom: 72 }} className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "2.8rem", color: "var(--gold)", letterSpacing: "0.08em", lineHeight: 1, marginBottom: 4 }}>
              Dino&apos;s
            </div>
            <div style={{ fontSize: "0.5rem", letterSpacing: "0.55em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 28 }}>
              Apothecary Bar · Wien
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.82, maxWidth: 280 }}>
              Wiens beste American Bar im Herzen des ersten Bezirks.
              Handgefertigte Cocktails. Unvergessliche Abende.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              {[
                { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M21 2H3v20h18V2zM17.5 6.5h.01" },
                { label: "Facebook",  path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              ].map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{
                    width: 40, height: 40, border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-3)", transition: "border-color 0.25s, color 0.25s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-3)"; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Awards */}
            <div style={{ marginTop: 36, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
              <p className="t-label" style={{ marginBottom: 14, color: "var(--text-3)" }}>AUSZEICHNUNGEN</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {AWARDS.map(a => (
                  <span key={a} style={{
                    fontSize: "0.54rem", letterSpacing: "0.14em", color: "var(--gold)",
                    fontFamily: "var(--font-sans)", padding: "5px 10px",
                    border: "1px solid var(--border)", whiteSpace: "nowrap",
                  }}>
                    ★ {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)", marginBottom: 28 }}>Navigation</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV_LINKS.map(([l, h]) => (
                <li key={h}>
                  <a href={h} style={{
                    fontSize: "0.85rem", color: "var(--text-2)", fontFamily: "var(--font-sans)",
                    fontWeight: 300, textDecoration: "none", transition: "color 0.2s",
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)", marginBottom: 28 }}>Öffnungszeiten</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { d: "Montag",  t: "Ruhetag",      closed: true },
                { d: "Di–Do",   t: "17:00 – 02:00" },
                { d: "Fr–Sa",   t: "17:00 – 03:00" },
                { d: "Sonntag", t: "20:00 – 00:00" },
              ].map(h => (
                <div key={h.d} style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "0.8rem", color: h.closed ? "var(--text-4)" : "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300 }}>{h.d}</span>
                  <span style={{ fontSize: "0.8rem", color: h.closed ? "var(--text-4)" : "var(--text-3)", fontFamily: "var(--font-sans)", fontStyle: h.closed ? "italic" : "normal" }}>{h.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-sans)", marginBottom: 28 }}>Kontakt</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 4 }}>Adresse</p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.7 }}>
                  Salzgries 19<br />1010 Wien, Österreich
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 4 }}>Telefon</p>
                <a href="tel:+43155357230" style={{ fontSize: "0.875rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}>
                  +43 1 5357230
                </a>
              </div>
              <div>
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 4 }}>E-Mail</p>
                <a href="mailto:heinz@dinos.at" style={{ fontSize: "0.875rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}>
                  heinz@dinos.at
                </a>
              </div>
              <a
                href="#reservation"
                className="btn-gold"
                style={{ marginTop: 12, justifyContent: "center", fontSize: "0.6rem", padding: "13px 20px" }}
              >
                Reservieren
              </a>
            </div>
          </div>
        </Reveal>

        {/* Bottom */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 32, borderTop: "1px solid var(--border)",
          flexWrap: "wrap", gap: 16,
        }}>
          <p style={{ fontSize: "0.6rem", color: "var(--text-4)", fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Dino&apos;s Apothecary Bar · Salzgries 19, 1010 Wien
          </p>
          <div style={{ display: "flex", gap: 28 }}>
            {["Impressum", "Datenschutz", "AGB"].map(item => (
              <a key={item} href="#" style={{ fontSize: "0.6rem", color: "var(--text-4)", fontFamily: "var(--font-sans)", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.06em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-4)")}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px)  { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
