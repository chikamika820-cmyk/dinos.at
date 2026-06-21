"use client";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * The eyebrow pattern repeated in every section — but now it carries real
 * information: the chapter numeral matches the Tincture Rail, so the page
 * reads as a sequence rather than a stack of interchangeable blocks.
 */
export default function ChapterEyebrow({
  roman, children, align = "left", delay = 0, style,
}: { roman: string; children: ReactNode; align?: "left" | "center"; delay?: number; style?: React.CSSProperties }) {
  return (
    <Reveal
      delay={delay}
      style={{ display: "flex", alignItems: "center", justifyContent: align === "center" ? "center" : "flex-start", gap: 14, ...style }}
    >
      <span className="t-label" style={{ color: "var(--gold)" }}>{roman}</span>
      <span className="gold-rule" />
      <span className="t-eyebrow">{children}</span>
    </Reveal>
  );
}
