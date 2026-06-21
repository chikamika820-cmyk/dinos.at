"use client";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { fadeUp, viewportOnce, withDelay } from "@/app/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  variants?: Variants;
  delay?: number;
  as?: "div" | "span";
};

/**
 * Replaces the repeated IntersectionObserver + inline-style transition
 * boilerplate that was duplicated across every section. whileInView
 * fires once per element; reduced-motion is handled by the global CSS guard.
 */
export default function Reveal({ variants = fadeUp, delay = 0, as = "div", children, ...rest }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={delay ? withDelay(variants, delay) : variants}
      {...rest}
    >
      {children}
    </Component>
  );
}
