"use client";
import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      setShow(window.scrollY > heroHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="lg:hidden"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90,
        transform: show ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        padding: "12px 16px",
        background: "rgba(8,8,8,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border)",
        display: "flex", gap: 10,
      }}
    >
      <button
        onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}
        className="btn-gold"
        style={{ flex: 1, justifyContent: "center", padding: "14px" }}
      >
        Tisch reservieren
      </button>
      <a href="tel:+43155357230" className="btn-outline" style={{ padding: "14px 20px" }}>
        Anrufen
      </a>
    </div>
  );
}
