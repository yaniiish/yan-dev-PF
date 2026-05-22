---
name: nextjs-section
description: |
  Use this skill whenever you create or modify a section component of the yan-dev one-page site
  (Hero, Why, Services, Examples, Pricing, Contact). Ensures structural consistency:
  section wrapper, SectionLabel, h2, FadeIn animations, container widths, responsive grid,
  server vs client component decision, and reads the right spec files in order.
---

# Skill: nextjs-section

## When to use
Every time the user asks to:
- create a new section of the yan-dev site
- restructure an existing section
- "build the X section" / "code the Y section"

## What to read FIRST (in this order, before writing any code)
1. `CONTENT.md` — for the exact copy of the section
2. `SECTIONS.md` — for the UI spec of the section
3. `DESIGN_SYSTEM.md` — for any token / color / spacing not specified in `SECTIONS.md`
4. `ARCHITECTURE.md` — for the file path and naming convention

Never write text or copy that is not in `CONTENT.md`. If something is missing, ASK.

## Required structural template

Every section component MUST follow this skeleton:

```tsx
// src/components/sections/<Name>.tsx
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/FadeIn";

export function <Name>() {
  return (
    <section
      id="<anchor>"            // exact id matching navbar links (#pourquoi, #services, etc.)
      className="relative py-24 md:py-32 lg:py-40"
    >
      {/* optional background layer (FallingPattern / BGPattern) — absolute, behind content */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <SectionLabel number="0X">Nom de la section</SectionLabel>
          <h2 className="mt-4 font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
            {/* titre H2 — copie exacte depuis CONTENT.md */}
          </h2>
          <p className="mt-6 max-w-2xl text-lead text-ink-700">
            {/* lead — copie exacte depuis CONTENT.md */}
          </p>
        </FadeIn>

        <div className="mt-16">
          {/* contenu spécifique à la section */}
        </div>
      </div>
    </section>
  );
}
```

## Server vs client decision
- Default: **server component** (no `"use client"`).
- Add `"use client"` ONLY if the section needs:
  - `useState` / `useEffect` / refs
  - Motion hooks (`useScroll`, `useInView`, `useReducedMotion`)
  - Event handlers (`onClick`, `onChange`)
- If only a small sub-block needs interactivity (e.g. one card hover), extract it as a separate client component imported inside the server section.

## Animation rules
- Wrap visible-on-scroll blocks in `<FadeIn>` (custom wrapper using Motion's `whileInView`).
- For lists, use `<Stagger>` with a child delay of `0.06s`.
- Respect `useReducedMotion()` — fallback = instant render.

## Forbidden in section components
- Inline hex colors (`#5BC178`, etc.) → always use Tailwind token classes (`bg-mint-500`, `text-ink-950`)
- Hard-coded strings not present in `CONTENT.md`
- New external libraries
- Inline `<style>` blocks
- Emojis in the UI

## Self-check before returning code
- [ ] Section has the exact `id` matching navbar
- [ ] Wrapper paddings match the spec (`py-24 md:py-32 lg:py-40`)
- [ ] Container is `max-w-7xl px-6 md:px-10 lg:px-16`
- [ ] `SectionLabel` + `<h2>` present with copy from `CONTENT.md`
- [ ] No client component unless strictly needed
- [ ] No forbidden patterns above

## Responsive — mandatory checks
This is non-negotiable. A section without these is incomplete.

- [ ] **Mobile first classes**: base classes target mobile, `md:` / `lg:` surcharge for bigger screens. Never the reverse.
- [ ] **Grid columns** declared from 1 on mobile, growing on larger viewports:
  - 1-2 items per row visible on `md`, more on `lg` only if content fits comfortably.
  - Pricing/Examples: `grid-cols-1 md:grid-cols-2`
  - Why: `grid-cols-1 md:grid-cols-2` (stays 2-up even on lg)
  - Services: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- [ ] **Gap responsive**: `gap-4` mobile, `gap-6 lg:gap-8` desktop.
- [ ] **Touch targets ≥ 44px** on mobile (buttons, links, form controls, icon buttons).
- [ ] **No fixed widths in px** that could overflow at 375px (use `max-w-*` or `w-full`).
- [ ] **Background patterns** (`FallingPattern`, `BGPattern`) wrapped in a `relative overflow-hidden` parent.
- [ ] **Images** use `next/image` with `sizes` prop and explicit dimensions.
- [ ] **Mentally walked through 375px → 768px → 1440px** before returning code: at each width, does the layout still make sense?

If any layout-specific behavior is unclear (mobile order, image priority, breakpoint switch), read `SECTIONS.md` §10.4 for per-section responsive rules, then `SECTIONS.md` §10.5 for the final QA checklist.
