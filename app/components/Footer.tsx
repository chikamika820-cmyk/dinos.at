"use client";
import Reveal from "./motion/Reveal";

export default function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 32px 48px" }}>
        <Reveal style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 64, marginBottom: 64 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "2.4rem", color: "var(--gold)", letterSpacing: "0.06em", lineHeight: 1 }}>
              Dino&apos;s
            </div>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginTop: 4, marginBottom: 24 }}>
              Apothecary Bar
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.8, maxWidth: 300 }}>
              Wiens beste American Bar im Herzen des ersten Bezirks.
              Handgefertigte Cocktails. Unvergessliche Abende.
            </p>
            <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
              <p className="t-label" style={{ marginBottom: 12 }}>AUSZEICHNUNGEN</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Beste American Bar 2025", "Beste American Bar 2024", "Bartender des Jahres 2024", "Beste American Bar 2023"].map(a => (
                  <span key={a} style={{ fontSize: "0.58rem", letterSpacing: "0.15em", color: "var(--gold)", fontFamily: "var(--font-sans)", padding: "5px 10px", border: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                    ℞ {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 28 }}>Navigation</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {[["Über uns", "#about"],["Speisekarte","#menu"],["Getränke","#drinks"],["Galerie","#gallery"],["Reservierung","#reservation"],["Kontakt","#contact"]].map(([l, h]) => (
                <li key={h}>
                  <a href={h} style={{ fontSize: "0.85rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-sans)", marginBottom: 28 }}>Informationen</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1.7 }}>
                Salzgries 19<br />1010 Wien
              </p>
              <a href="tel:+43155357230" style={{ fontSize: "0.85rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}>
                +43 1 5357230
              </a>
              <a href="mailto:heinz@dinos.at" style={{ fontSize: "0.85rem", color: "var(--text-2)", fontFamily: "var(--font-sans)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}>
                heinz@dinos.at
              </a>
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: "0.7rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", lineHeight: 1.9 }}>
                  Di–Do: 17–02 Uhr<br />
                  Fr–Sa: 17–03 Uhr<br />
                  So: 20–00 Uhr
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: "0.62rem", color: "var(--text-3)", fontFamily: "var(--font-sans)" }}>
            © {new Date().getFullYear()} Dino&apos;s Apothecary Bar · Salzgries 19, 1010 Wien
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Impressum", "Datenschutz", "AGB"].map(item => (
              <a key={item} href="#" style={{ fontSize: "0.62rem", color: "var(--text-3)", fontFamily: "var(--font-sans)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
