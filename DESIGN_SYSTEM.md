# DESIGN_SYSTEM.md — yan-dev

> Source de vérité pour **toute** décision visuelle. Aucun hex, font, espacement ou radius ne doit apparaître en dur dans un composant : tout passe par les tokens ci-dessous.

---

## 1. Philosophie

- **Entre-deux** : assez chaleureux pour ne pas effrayer un boulanger qui n'a jamais commandé de site web ; assez design pour qu'un dirigeant de TPE pense "ah, ce gars sait faire mieux qu'un site Wix".
- **Lumineux par défaut** (fond clair), avec accents verts mints pour la fraîcheur et l'identité.
- **Beaucoup d'air.** Espacements généreux, lignes longues évitées.
- **Pas d'illustrations cartoon stock.** Patterns CSS, texte, photos réelles, c'est tout.
- **Animations subtiles**, jamais gratuites : elles servent à guider le regard ou à récompenser un scroll, pas à faire le show.

---

## 2. Couleurs

### 2.1 Palette source (validée)

| Token | Hex | Usage |
|-------|-----|-------|
| **mint-50** | `#BFFFED` | Surfaces très claires, hover léger, halos |
| **mint-100** | `#98FBCB` | Accents secondaires, badges, illustrations |
| **mint-500** | `#5BC178` | **Couleur principale d'accent** (CTA, liens, soulignements) |
| **mint-700** | `#3B9D58` | Hover des CTA, contrastes sur fond mint clair |
| **mint-900** | `#1F5A33` | Texte sur fond mint clair, contrast extrême |

> Les hex `#98FBCB`, `#5BC178`, `#BFFFED` sont ceux validés par Yan. Les autres tons sont dérivés cohérents (échelle Tailwind-like).

### 2.2 Neutres

| Token | Hex | Usage |
|-------|-----|-------|
| **ink-950** | `#0A0F0C` | Texte principal, titres |
| **ink-700** | `#2B332E` | Texte secondaire |
| **ink-500** | `#5C6660` | Texte tertiaire, captions |
| **ink-300** | `#B8BFBB` | Bordures, séparateurs |
| **ink-100** | `#EEF1EE` | Backgrounds alternés, surfaces card |
| **ink-50** | `#F7F9F7` | Background page (légèrement teinté) |
| **white** | `#FFFFFF` | Cards, modals |

> Note : les neutres ne sont pas du gris pur — ils ont une **pointe de vert** pour rester en harmonie avec la palette mint. Important.

### 2.3 Système (états)

| Token | Hex | Usage |
|-------|-----|-------|
| **success** | `#5BC178` | = mint-500, succès formulaire |
| **error** | `#E5484D` | Erreurs de validation, requis |
| **warning** | `#F5A524` | Rarement utilisé |

### 2.4 Variables CSS à mettre dans `globals.css`

```css
@theme {
  /* mint */
  --color-mint-50:  #BFFFED;
  --color-mint-100: #98FBCB;
  --color-mint-500: #5BC178;
  --color-mint-700: #3B9D58;
  --color-mint-900: #1F5A33;

  /* ink (neutres teintés) */
  --color-ink-50:  #F7F9F7;
  --color-ink-100: #EEF1EE;
  --color-ink-300: #B8BFBB;
  --color-ink-500: #5C6660;
  --color-ink-700: #2B332E;
  --color-ink-950: #0A0F0C;

  /* alias sémantiques */
  --color-background: var(--color-ink-50);
  --color-foreground: var(--color-ink-950);
  --color-muted:      var(--color-ink-500);
  --color-border:     var(--color-ink-300);
  --color-card:       #FFFFFF;
  --color-primary:    var(--color-mint-500);
  --color-primary-hover: var(--color-mint-700);
  --color-accent-soft: var(--color-mint-50);
}
```

### 2.5 Règles d'usage

- Texte principal : `text-ink-950` sur `bg-ink-50` ou `bg-card`.
- CTA principal : fond `bg-mint-500`, texte `text-ink-950` (PAS blanc — meilleur contraste sur ce vert).
- CTA hover : `bg-mint-700`, texte reste `text-ink-950`.
- CTA secondaire : ghost (`border border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-ink-50`).
- Liens dans le texte : `text-ink-950 underline decoration-mint-500 decoration-2 underline-offset-4 hover:decoration-mint-700`.
- **Jamais** de fond entièrement mint sur une grande surface (max ~30% de la page totale).

---

## 3. Typographie

### 3.1 Fontes

- **Sans (UI + body) :** `Inter` (variable, via `next/font/google`).
  Fallback : `system-ui, -apple-system, "Segoe UI", sans-serif`.
- **Display (titres H1, gros chiffres tarifs) :** `Instrument Serif` (variable, via `next/font/google`).
  Fallback : `Georgia, serif`.
- **Mono (badges, codes section numérotation "01", "02"...) :** `JetBrains Mono`.

> Le mix sans + serif élégant + mono pour les numéros de section donne le côté "design mais accessible".

### 3.2 Échelle (mobile → desktop, clamp)

| Token | clamp | Usage |
|-------|-------|-------|
| **display-1** | `clamp(2.5rem, 5vw + 1rem, 5.5rem)` | H1 hero |
| **display-2** | `clamp(2rem, 3.5vw + 1rem, 3.75rem)` | H2 titres de section |
| **h3** | `clamp(1.25rem, 1vw + 1rem, 1.625rem)` | Titres de carte |
| **lead** | `clamp(1.125rem, 0.5vw + 1rem, 1.25rem)` | Sous-titres hero, intros de section |
| **body** | `1rem` | Texte courant |
| **small** | `0.875rem` | Captions, mentions |
| **micro** | `0.75rem` | Badges, labels mono |

### 3.3 Règles typo

- H1 et H2 → `font-serif` (Instrument Serif), `font-medium`, `tracking-tight`, `leading-[1.05]`.
- H3, body, UI → `font-sans` (Inter).
- Numéros de section ("01 / Services") → `font-mono`, `text-mint-700`, `text-micro`, `uppercase`, `tracking-widest`.
- **Pas de tout-majuscules** sur les paragraphes. Uniquement sur badges/numéros mono.
- Largeur de ligne : `max-w-[60ch]` pour les paragraphes longs.

---

## 4. Espacements & layout

### 4.1 Container

- Container max : `max-w-7xl` (1280px), centré, padding horizontal `px-6 md:px-10 lg:px-16`.
- Section verticale : `py-24 md:py-32 lg:py-40`. Hero : `min-h-[90svh]`.

### 4.2 Échelle spacing

On utilise l'échelle Tailwind par défaut. Pas de valeurs arbitraires sauf cas justifié.

- Gap entre éléments d'une card : `gap-3` / `gap-4`.
- Gap entre cards d'une grille : `gap-6` md / `gap-8` lg.
- Espace titre → contenu d'une section : `mt-6` (sous-titre) puis `mt-12` (contenu principal).

### 4.3 Radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `rounded-md` | 8px | Inputs, boutons compacts |
| `rounded-xl` | 16px | Boutons CTA, badges |
| `rounded-2xl` | 24px | Cards, sections en surface |
| `rounded-3xl` | 32px | Card hero (présentation Yan), grandes surfaces |

### 4.4 Bordures & ombres

- Bordure standard : `border border-ink-300/60`.
- **Shadows discrets uniquement** : `shadow-sm` partout par défaut.
- Card hero (et seulement elle) : `shadow-lg shadow-ink-950/5`.
- **Pas de neumorphism, pas de glow violet.**

---

## 5. Composants de base (specs)

### 5.1 Bouton

Trois variantes : `primary`, `secondary`, `ghost`.

```tsx
// Pseudo-API attendue
<Button variant="primary" size="lg" href="#contact">
  Discuter de mon projet
</Button>
```

- Hauteurs : `sm` 36px, `md` 44px, `lg` 52px.
- Padding horizontal : `px-5` (sm), `px-6` (md), `px-8` (lg).
- Transition : `transition-colors duration-200`.
- Focus : `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700`.

### 5.2 Card

Surface blanche, `rounded-2xl`, `border border-ink-300/60`, `p-6 md:p-8`.

### 5.3 Section wrapper

```tsx
<section id="services" className="relative py-24 md:py-32 lg:py-40">
  <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
    <SectionLabel number="03">Services</SectionLabel>
    <h2 className="mt-4 font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight">
      Titre de section
    </h2>
    {/* contenu */}
  </div>
</section>
```

### 5.4 SectionLabel

Petit badge mono mint : `01 / Hero`, `02 / Pourquoi`, etc.
`<span className="font-mono text-xs uppercase tracking-widest text-mint-700">01 — Accueil</span>`

---

## 6. Backgrounds & textures

Deux composants livrés : **grid background** (fond blanc/noir, masqué en `fade-edges`) — retenu pour le Hero — et **falling pattern** (les "pluies" de points qui descendent) — conservé en réserve pour usage futur.

### 6.1 Règles d'usage (mises à jour Phase 1.2)

- **Hero** : `<BGPattern variant="grid" mask="fade-edges" />` (fill par défaut `var(--color-ink-300)`, size 24px). Validé visuellement contre FallingPattern, le grid donne un cadre plus calme et lisible. Le contenu Hero doit être en `relative z-10` au-dessus.
- **Section "Pourquoi" / "Services" / "Exemples" / "Contact"** : **pas de background décoratif par défaut.** On tranche section par section pendant le dev : si une section paraît trop nue à côté du Hero ou des Tarifs, ajouter un BGPattern subtil (`dots`, `diagonal-stripes`, etc.). **Ne pas réutiliser `grid` sur ces sections** — risque de répliquer le Hero et de brouiller le rythme.
- **Section "Tarifs"** : fond plein `bg-ink-950`, en-tête en texte clair, **cartes claires par-dessus**. Validé et en place. C'est le seul aplat sombre du site : il sert de coupure entre deux sections claires, donc le changement de sujet se lit sans filet ni séparateur. Ne pas en ajouter un deuxième ailleurs, la coupure perdrait son sens.
- **Règle d'alternance** : ne pas mettre deux backgrounds décoratifs sur deux sections consécutives.
- **Séquence en vigueur depuis le repositionnement** : Hero (`grid`, `fade-edges`) → Mon travail (aplat `bg-card`, neutre) → Comment ça marche (`dots`, `fade-y`, size 28) → Tarifs (aplat `bg-ink-950`) → Contact (neutre). Les deux fonds décoratifs sont bien séparés par un aplat, et `dots` ne répète pas le `grid` du hero.
- **Exception au « pas de glow »** (§10) : la section Comment ça marche porte un halo mint flouté le long de son fil. Ce n'est pas un néon posé sur un élément d'UI : il partage le `pathLength` du fil, donc il fait partie de l'animation qui raconte l'avancement. Opacité 0.09, largeur 34, flou 18. Un premier réglage à 0.14 / 44 / 16 tirait trop l'oeil : sur un fond aussi clair, le halo doit se deviner, pas s'annoncer. Ne pas remonter.

**`FallingPattern` : conservé en réserve.** Pas utilisé au MVP suite à la décision Phase 1.2. Le composant reste disponible dans `src/components/backgrounds/` pour un usage futur (Phase 2 ou itération design). Le retirer pour de bon nécessiterait l'aval de Yan.

### 6.2 Composants disponibles (copiés en Phase 1.2)

Les deux composants ont été copiés depuis `components-source/backgrounds/` vers `src/components/backgrounds/` lors de la Phase 1.2 :

- `src/components/backgrounds/FallingPattern.tsx`
- `src/components/backgrounds/BGPattern.tsx`

**Adaptations faites par rapport au code source initial :**
- Imports `motion/react` (Motion package, ex-Framer Motion).
- Couleurs par défaut alignées sur les tokens du design system (`var(--color-primary)`, `var(--color-background)`, `var(--color-ink-300)`).
- Typo corrigée (`geBgImage` → `getBgImage`).
- Pas de variant `dark:` (dark mode reporté Phase 2).
- **Fix Phase 1.2 sur BGPattern** : retrait du `z-[-10]` qui cachait le pattern sous le `bg-color` du parent (sans `isolate`). Ajout de `pointer-events-none`. **Important** : le fichier dans `components-source/` garde encore le bug — ne pas le copier tel quel à nouveau.

**Note d'usage pour BGPattern :** le parent doit être `relative overflow-hidden`, le contenu en `relative z-10` au-dessus du pattern.

---

## 7. Animations (Motion)

### 7.1 Principes

- **Entrées au scroll** : fade + translate Y de 8 à 16px, durée 0.5s, easing `[0.22, 1, 0.36, 1]` (out-expo soft).
- **Stagger** dans une liste : 0.06s entre items, jamais plus.
- **Hover CTA** : couleur (200ms) + très léger `scale-[1.02]` (150ms, easing `easeOut`).
- **Reduce motion** : `useReducedMotion()` partout, fallback = entrée instantanée.
- **Pas d'effet "parallax fou"** au MVP.

### 7.2 Tokens d'easing

```ts
export const easings = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const durations = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
};
```

À placer dans `lib/motion.ts`.

---

## 8. Iconographie

- **Lucide React** uniquement. Pas de mix de packs.
- Taille par défaut `size={20}` dans le body, `size={24}` dans les cards de service.
- Couleur : héritée du parent (`text-...`).

---

## 9. Images & médias

- Toujours via `next/image`.
- Format préféré : `webp`, sinon `avif`.
- Avatar Yan (image fournie `image_123650291.JPG`) : à intégrer dans la card de présentation du Hero, format **rond ou rounded-3xl**, taille ~120-160px côté.
- `alt` descriptif, jamais vide ni "image".

---

## 10. Anti-patterns (ce qu'on ne fait PAS)

- Pas de dégradés multi-couleurs façon SaaS US (purple → pink).
- Pas de glassmorphism (`backdrop-blur` partout).
- Pas de néon, pas de glow vert fluo.
- Pas de hover qui fait bouger le layout (toujours `transform`, jamais `width/height/margin`).
- Pas d'emoji décoratifs dans l'UI livrée.
- Pas de bouton avec une bordure ET un fond ET une ombre — choisis.
- **Pas d'italique sur les titres H1/H2** — ça fait "IA générée". Pour mettre l'accent : soulignement mint (`underline decoration-mint-500`), ou changement de couleur, ou changement de poids. Jamais `italic`.
- Pas de tirets cadratins `—` dans les phrases d'accroche (préférer la virgule).
