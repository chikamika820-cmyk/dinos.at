// Shared motion vocabulary — keeps every animation in the site speaking
// the same rhythm instead of one-off durations/eases per component.
// Values mirror the transitions-dev token table (Quick/Fast/Slow/Very slow).
import type { Variants, Transition, TargetAndTransition } from "framer-motion";

export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  stagger: 0.04,
  micro: 0.08,
  quick: 0.15,
  fast: 0.25,
  medium: 0.35,
  slow: 0.4,
  vslow: 0.5,
};

export const smooth = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_SMOOTH,
});

// Generic up-fade used for most content blocks.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: smooth(DUR.vslow + 0.4) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: smooth(DUR.slow + 0.5) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: smooth(DUR.vslow + 0.3) },
};

// Container that staggers its children's fadeUp/word reveals.
export const staggerContainer = (gap = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren },
  },
});

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: smooth(DUR.vslow + 0.3) },
};

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;

// Variant-level transitions take priority over component-level transition
// props in framer-motion, so standalone delays (outside a stagger container)
// have to be merged into the variant itself rather than passed alongside it.
export function withDelay(variants: Variants, delay: number): Variants {
  const show = variants.show as TargetAndTransition;
  return {
    ...variants,
    show: {
      ...show,
      transition: { ...(show.transition as Transition), delay },
    },
  };
}
