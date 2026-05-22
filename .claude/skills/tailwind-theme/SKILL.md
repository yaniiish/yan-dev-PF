---
name: tailwind-theme
description: |
  Use this skill any time you write or modify TailwindCSS classes, CSS variables, or styles
  for the yan-dev site. Enforces the design system: no hex colors in components, mandatory
  use of mint-* / ink-* tokens, correct class order, allowed radius / shadow / spacing scales,
  and the Motion easing/duration tokens. Always read DESIGN_SYSTEM.md first.
---

# Skill: tailwind-theme

## When to use
Every time the assistant writes Tailwind classes, edits `globals.css`, or makes a visual decision (color, spacing, font, radius, shadow, animation timing) for the yan-dev project.

## Always read first
- `DESIGN_SYSTEM.md` — full token reference.

## Hard rules

### Colors
- **Never** write a hex value (`#abc`, `#abcdef`) inside a component.
- Use only these token classes:
  - **Mint:** `bg-mint-50`, `bg-mint-100`, `bg-mint-500`, `bg-mint-700`, `bg-mint-900` (and `text-*`, `border-*`, `decoration-*`, `outline-*`)
  - **Ink:** `bg-ink-50`, `bg-ink-100`, `bg-ink-300`, `bg-ink-500`, `bg-ink-700`, `bg-ink-950`
  - **Semantic aliases:** `bg-background`, `bg-card`, `text-foreground`, `text-muted`, `border-border`, `bg-primary`, `bg-primary-hover`, `bg-accent-soft`
- For dynamic colors (e.g. props), use CSS variables: `style={{ color: "var(--color-mint-500)" }}` — NEVER pass a hex.

### Typography
- Body / UI: `font-sans` (Inter — already loaded globally).
- Titles `h1`, `h2`: `font-serif` (Instrument Serif).
- Mono labels / numbers: `font-mono` (JetBrains Mono).
- Always combine with `font-medium` or `font-semibold`, `tracking-tight`, `leading-[1.05]` for display titles.

### Spacing
- Vertical section padding: `py-24 md:py-32 lg:py-40` (or `min-h-[90svh]` for Hero only).
- Horizontal container: `mx-auto max-w-7xl px-6 md:px-10 lg:px-16`.
- Card padding: `p-6 md:p-8` (`p-8 md:p-10` only for pricing/hero cards).
- Grid gaps: `gap-4` mobile, `gap-6 lg:gap-8` desktop.

### Radius
- `rounded-md` → inputs, small buttons
- `rounded-xl` → CTA buttons, chips
- `rounded-2xl` → cards, panels
- `rounded-3xl` → hero card, pricing cards, big surfaces

### Shadows
- Default: **none** or `shadow-sm`.
- Allowed escalation: `shadow-md` on hover for cards.
- Hero presentation card only: `shadow-lg shadow-ink-950/5`.
- Forbidden: glow, neon, multi-layer shadows.

### Borders
- Standard: `border border-ink-300/60`.
- Active / selected: `border-mint-500` (or `border-mint-500/40` for soft).

### Class order convention
Within `className`, group in this order, space-separated:
1. Layout: `block`, `flex`, `grid`, `relative`, `absolute`, position values
2. Box: `w-*`, `h-*`, `min-*`, `max-*`
3. Spacing: `p-*`, `m-*`, `gap-*`
4. Typography: `font-*`, `text-*`, `tracking-*`, `leading-*`, `whitespace-*`
5. Colors: `bg-*`, `text-*`, `border-*`, `decoration-*`
6. Effects: `shadow-*`, `opacity-*`, `backdrop-blur-*`
7. Transitions: `transition-*`, `duration-*`, `ease-*`
8. States: `hover:*`, `focus:*`, `focus-visible:*`, `active:*`, `disabled:*`
9. Responsive: `sm:*`, `md:*`, `lg:*`, `xl:*` (placed right after the base utility they override is acceptable too — be consistent within a file)

### Accessibility-related styling
- Always pair `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700` on interactive elements.
- Never `outline-none` without a `focus-visible:` replacement.
- Contrast: text on `bg-mint-500` is `text-ink-950` (not white). Confirmed AA.

### Responsive-related styling (mandatory)
- **Mobile first**: write base classes for mobile, override upward with `md:`/`lg:`/`xl:`. Never the reverse.
- **Touch targets ≥ 44px** on mobile for any interactive element. Practical rules:
  - Button sizes: `lg` (`h-13` / `52px`) for hero CTAs, `md` (`h-11` / `44px`) minimum elsewhere on mobile.
  - Icon-only buttons: wrap in `inline-flex size-11 items-center justify-center` even if the icon is `size-5`.
  - Nav links in mobile menu: `py-4` minimum.
  - Form inputs: `py-3 min-h-12` minimum.
- **Section padding scales**: `py-20 md:py-28 lg:py-36` or the documented `py-24 md:py-32 lg:py-40`. Never less than `py-16` on mobile, never more than `py-44` on desktop.
- **Container always**: `mx-auto max-w-7xl px-6 md:px-10 lg:px-16`. Never less than `px-6` on mobile.
- **Anti-overflow**: any section using an absolute-positioned background pattern (`FallingPattern`, `BGPattern`) MUST have the section wrapper in `relative overflow-hidden`.
- **Min-width on flex/grid children**: when a flex/grid child contains text or chips, add `min-w-0` to prevent overflow.
- **Hero min height**: `min-h-[90svh]` (svh, not vh, for mobile address bar correctness).

### Motion / animations
Import from `@/lib/motion.ts`:
```ts
import { easings, durations } from "@/lib/motion";
```
Use:
- `easings.out` for entries
- `durations.base` (0.5s) for entries, `durations.fast` (0.2s) for hovers
Never invent new easings inline.

## Forbidden
- Hex / rgb / hsl literals inside `.tsx` (allowed only in `globals.css` `@theme` block)
- `style={{ color: "#xxx" }}` with a hex (use the CSS variable instead)
- Custom radius outside the scale
- Glass / neumorphism stacks
- Heavy gradients (purple → pink → orange)
- `!important`
- Inline transitions on `width`/`height`/`margin` (use `transform`)

## Self-check before returning styled code
- [ ] No hex values in component file
- [ ] All colors use `mint-*`, `ink-*`, or semantic alias
- [ ] Spacing follows the standard scale
- [ ] Radius from allowed set only
- [ ] Shadow either absent or in the allowed set
- [ ] Focus ring present on every interactive element
- [ ] No new lib, no `!important`
