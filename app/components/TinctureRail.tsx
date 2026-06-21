"use client";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A quiet scroll-progress thread — fills like rising tincture as the page
 * scrolls. Deliberately wordless: no chapter list, no labels, no buttons.
 * A hotel concierge doesn't hand you a sitemap; the gauge is ambient,
 * not a navigation device.
 */
export default function TinctureRail() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const fill = useSpring(scrollYProgress, reduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 60, damping: 22, mass: 0.5 });

  return (
    <>
      {/* Desktop: ambient vertical thread */}
      <div
        className="hidden lg:block"
        style={{ position: "fixed", left: 36, top: "50%", transform: "translateY(-50%)", height: "min(34vh, 320px)", zIndex: 60, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div style={{ position: "relative", width: 1, height: "100%", background: "var(--border)" }}>
          <motion.div
            style={{
              position: "absolute", bottom: 0, left: -1, width: 3, height: "100%",
              background: "linear-gradient(to top, var(--gold) 0%, var(--copper-light) 85%, transparent 100%)",
              scaleY: fill, transformOrigin: "bottom",
              boxShadow: "0 0 12px rgba(196,151,58,0.45)",
            }}
          />
        </div>
      </div>

      {/* Mobile: hairline progress bar under the navbar */}
      <div className="lg:hidden" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 99, background: "rgba(255,255,255,0.04)" }} aria-hidden="true">
        <motion.div
          style={{ height: "100%", background: "linear-gradient(90deg, var(--gold), var(--copper-light))", scaleX: fill, transformOrigin: "left" }}
        />
      </div>
    </>
  );
}
