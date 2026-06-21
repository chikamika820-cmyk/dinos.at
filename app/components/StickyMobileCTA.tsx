"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_SMOOTH, DUR } from "@/app/lib/motion";

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
    <motion.div
      className="flex lg:hidden"
      initial={false}
      animate={{ y: show ? 0 : "100%" }}
      transition={{ duration: DUR.slow, ease: EASE_SMOOTH }}
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90,
        padding: "12px 16px",
        background: "rgba(10,8,7,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border)",
        gap: 10,
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
    </motion.div>
  );
}
