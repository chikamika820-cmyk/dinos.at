# CLAUDE.md — Dino's Apothecary Bar

Diese Datei bündelt die Arbeits- und Designregeln für dieses Repository.
Die bestehenden technischen Projektregeln liegen weiterhin in `AGENTS.md` und
werden hier importiert (nicht überschrieben):

@AGENTS.md

---

## Karpathy Coding Guidelines

Quelle: <https://github.com/multica-ai/andrej-karpathy-skills> (`CLAUDE.md`).

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## Projektspezifische Regeln

Design- und Arbeitsstandards für die Website der **Dino's Apothecary Bar** (Premium-Cocktailbar, Wien, 1. Bezirk). Diese Regeln haben Vorrang vor generischen Defaults.

- **Kein generischer AI-Look.** Keine Stock-/Bootstrap-/„Standard-Landingpage"-Ästhetik. Jede Sektion muss bewusst gestaltet wirken — eigenständig, redaktionell, hochwertig.
- **Premium-Cocktailbar in Wien als Designstandard.** Maßstab ist Awwwards-Niveau: luxuriöser Dark Mode, aged-brass-Gold sparsam eingesetzt, true-midnight-Palette, viel Weißraum, atmosphärisch statt überladen.
- **Hochwertige Typografie.** Display in Cormorant Garamond (light/italic), UI/Eyebrows in DM Sans mit weitem Uppercase-Tracking, Preise in IBM Plex Mono. Klare Hierarchie, sorgfältige Laufweiten, kein Schrift-Wildwuchs.
- **Elegante Animationen.** Cinematische, dezente Framer-Motion-Bewegungen (Reveal, Parallax, Stagger, magnetische Buttons). 60fps, tasteful, niemals verspielt; `prefers-reduced-motion` respektieren.
- **Minimalistische Änderungen.** Chirurgisch arbeiten (siehe Surgical Changes): nur anfassen, was die Aufgabe verlangt; bestehenden Stil und bestehende Tokens (CSS-Variablen in `globals.css`) weiterverwenden.
- **Keine unnötigen Libraries.** Bestehenden Stack bevorzugen (Next.js, Tailwind v4, Framer Motion, lucide-react). Neue Abhängigkeiten nur, wenn unvermeidbar — vorher begründen.
- **Immer bestehende Komponenten bevorzugen.** Vorhandene Komponenten/Patterns wiederverwenden oder erweitern, statt parallele Varianten zu erstellen.
- **Vor jeder größeren Änderung kurz erklären, was geändert wird.** Bei nicht-trivialen Änderungen zuerst einen knappen Plan/Hinweis geben (was, warum, betroffene Dateien), dann umsetzen.
