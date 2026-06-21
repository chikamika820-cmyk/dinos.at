"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Desktop-only (pointer:fine) custom cursor. Shrinks to a small gold dot,
 * grows over clickable elements, and expands into a labeled disc over
 * anything tagged data-cursor="Ansehen" etc. Disabled entirely on touch
 * devices and when prefers-reduced-motion is set.
 */
export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    // matchMedia is client-only — flip this on after mount once we know the pointer type.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const cursorTarget = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (cursorTarget) {
        setLabel(cursorTarget.getAttribute("data-cursor"));
        setHovering(true);
      } else {
        setLabel(null);
        setHovering(!!(e.target as HTMLElement)?.closest("a, button, input, select, textarea"));
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  const size = label ? 70 : hovering ? 16 : 8;

  return (
    <motion.div style={{ position: "fixed", left: 0, top: 0, x: springX, y: springY, zIndex: 200, pointerEvents: "none" }}>
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: label ? "rgba(10,8,7,0.88)" : "var(--gold)",
          border: label ? "1px solid var(--border-mid)" : "none",
        }}
      >
        {label && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--gold)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
