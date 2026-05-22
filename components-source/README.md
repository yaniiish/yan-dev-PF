# components-source/

> Composants **prêts à recopier** dans le projet Next.js. Ce dossier n'est PAS dans le projet final — c'est juste la zone de transit pour les composants fournis par Yan, déjà adaptés au design system yan-dev.

## Où ça va dans le projet

```
yan-dev/src/components/backgrounds/FallingPattern.tsx   ← copier ici
yan-dev/src/components/backgrounds/BGPattern.tsx        ← copier ici
```

## Prérequis avant que ça fonctionne

1. **Dépendance `motion` installée** : `pnpm add motion` (le `FallingPattern` utilise `motion/react` — c'est la nouvelle API du package `motion`, ex-Framer Motion).
2. **Utilitaire `cn` créé** dans `src/lib/utils.ts` :
   ```ts
   import { type ClassValue, clsx } from 'clsx';
   import { twMerge } from 'tailwind-merge';

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```
   Et donc : `pnpm add clsx tailwind-merge`.
3. **Tokens CSS du design system présents** dans `globals.css` (`--color-primary`, `--color-background`, `--color-ink-300` — voir `DESIGN_SYSTEM.md` §2.4).

## Adaptations faites par rapport au code source fourni

### FallingPattern.tsx
- Import changé : `from 'framer-motion'` → `from 'motion/react'` (Motion package, qui remplace Framer Motion).
- Couleurs par défaut alignées sur les tokens yan-dev :
  - `color` : `var(--primary)` → `var(--color-primary)` (notre alias mint-500).
  - `backgroundColor` : `var(--background)` → `var(--color-background)` (notre alias ink-50).
- Retiré le `dark:brightness-600` sur l'overlay (pas de dark mode au MVP, on remettra en Phase 2).

### BGPattern.tsx
- `fill` par défaut : `#252525` (hex en dur) → `var(--color-ink-300)`.
- Masques : `var(--background)` → `var(--color-background)` (cohérence tokens v4).
- Typo `geBgImage` → `getBgImage` (orthographe corrigée, c'est un détail mais propre).

## Exemples d'usage prévus dans le site

### Hero
```tsx
<section id="hero" className="relative min-h-[90svh] overflow-hidden">
  <div className="absolute inset-0">
    <FallingPattern blurIntensity="1em" />
  </div>
  <div className="relative z-10 mx-auto max-w-7xl px-6 ...">
    {/* contenu hero */}
  </div>
</section>
```

### Section Pourquoi (grid en fond)
```tsx
<section id="pourquoi" className="relative py-24 ...">
  <BGPattern variant="grid" mask="fade-edges" fill="var(--color-ink-300)" />
  <div className="relative mx-auto max-w-7xl ...">
    {/* contenu */}
  </div>
</section>
```
