"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./motion/Magnetic";
import { EASE_SMOOTH } from "@/app/lib/motion";

/**
 * Desktop has no persistent reservation nudge once the nav scrolls past
 * the hero CTA — mobile gets a sticky bar, desktop got nothing. This
 * mirrors that affordance with a quiet edge tab instead of a full bar.
 */
export default function DesktopReservationCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const reservationEl = document.getElementById("reservation");
      const pastReservation = reservationEl ? window.scrollY > reservationEl.offsetTop - 200 : false;
      setShow(window.scrollY > heroHeight * 0.9 && !pastReservation);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hidden lg:block" style={{ position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 90 }}>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
          >
            <Magnetic strength={0.15} max={6}>
              <button
                onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  writingMode: "vertical-rl", background: "var(--gold)", color: "var(--black)",
                  border: "none", cursor: "pointer", padding: "24px 12px",
                  fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 500,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  borderRadius: "4px 0 0 4px",
                  boxShadow: "-8px 0 32px rgba(196,151,58,0.25)",
                }}
              >
                Reservieren
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
