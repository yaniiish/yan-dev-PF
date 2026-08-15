# SECTIONS.md — yan-dev

> Spec UI détaillée, section par section. Pour les **textes**, lire `CONTENT.md`. Pour les **styles**, lire `DESIGN_SYSTEM.md`. Ce fichier décrit la **mise en page, la composition et le comportement**.

---

## Règles communes à toutes les sections

- Chaque section est un `<section id="...">`, ancrée pour la navbar.
- La plupart des sections commencent par un `SectionLabel` (numéro mono mint) + un `<h2>` serif. **Exception** : le Hero n'a pas de SectionLabel (décision Phase 1.4a — pas pertinent en première section).
- Padding vertical standard : `py-24 md:py-32 lg:py-40`. Hero : `min-h-[100svh]` sur md+ (pleine hauteur de viewport).
- Container intérieur : `mx-auto max-w-7xl px-6 md:px-10 lg:px-16`.
- Animations d'entrée : wrapper `<FadeIn>` au scroll, voir `DESIGN_SYSTEM.md` §7.
- Toujours respecter `prefers-reduced-motion`.

---

## 1. NAVBAR

### Structure
- Position : `sticky top-0 z-50`.
- Hauteur : `h-16 md:h-20`.
- Background : transparent au sommet de page, devient `bg-ink-50/80 backdrop-blur-md border-b border-ink-300/50` après ~30px de scroll (détecter via `useScroll` de Motion ou IntersectionObserver).
- Layout : `flex items-center justify-between`.
- Gauche : mark `Yan-dev`.
- Centre (md+) : liens.
- Droite : CTA primaire `sm` ou `md`.

### Mobile (`< md`)
- Liens cachés, remplacés par un bouton menu (icône `Menu` de lucide).
- Au clic : sheet plein écran qui descend avec liens en colonne, gros texte (`text-2xl`), CTA en bas.
- Animer avec Motion (fade + slide), pas de lib externe.

### A11y
- Bouton menu : `aria-expanded`, `aria-controls`.
- Liens actifs : observer la section visible (IntersectionObserver) et appliquer `text-mint-700 underline decoration-2 underline-offset-8`.

---

## 2. HERO (`#hero`) — implémenté Phase 1.4a

### Layout desktop (≥ lg)
- 2 colonnes : `grid grid-cols-12 md:items-center gap-8`.
- Colonne gauche : `col-span-7` — texte.
- Colonne droite : `col-span-5` — card de présentation.

### Layout tablet (md)
- 2 colonnes : `col-span-6` / `col-span-6`.

### Layout mobile (`< md`)
- 1 colonne. Card de présentation passe **sous** le texte. Card plus compacte (avatar rond à gauche du nom dans la card).

### Section wrapper
- Section : `relative overflow-hidden py-10 md:flex md:min-h-[100svh] md:flex-col md:pb-0 md:pt-28 lg:pt-32`.
- Sur md+ : pleine hauteur de viewport, contenu top-aligné avec un `pt` qui laisse respirer la navbar (≈ navbar height + 32px).

### Colonne gauche (texte)
Empilement vertical (pas de SectionLabel — cf. règles communes) :
1. `<h1>` (Instrument Serif, display-1) — "Un site web clair, **moderne et rapide.**". La fin "moderne et rapide." est dans un `<span>` souligné `decoration-mint-500 decoration-[3px] underline-offset-[6px]`. Pas d'italique. Voir `CONTENT.md` §3 pour le snippet exact.
2. `<p>` lead — sous-titre (`max-w-[60ch]`, `clamp(1.125rem,0.5vw+1rem,1.25rem)`)
3. `<div className="flex flex-col gap-3 sm:flex-row mt-8">` avec CTA primaire (`Discuter de mon projet`) + secondaire (`Voir mes tarifs`)

### Colonne droite (card présentation)
- Composant `<PresentationCard>` (inline dans `Hero.tsx`).
- Wrapper avec rotation `-rotate-[3deg] transition-transform duration-500 ease-out hover:rotate-0` → la card est inclinée et se redresse au hover.
- Card : `rounded-3xl border border-ink-300/60 bg-card p-6 md:p-7 shadow-lg shadow-ink-950/5`.
- Contenu :
  - Top : avatar rond `size-14` à gauche (`rounded-full object-cover`) + bloc nom/rôle à droite (`Yan` en serif text-xl, `DÉVELOPPEUR · INDÉPENDANT` en mono mint uppercase text-[0.7rem] tracking-widest).
  - Citation en `<blockquote>` font-serif text-lg avec guillemets français `«&nbsp;»` (espace insécable inside).
  - Sous-tagline `Je travaille en direct, sans intermédiaire.` (text-sm ink-500).
  - Séparateur `border-t border-ink-300/60`.
  - Indicateur de disponibilité : dot mint `animate-ping` + texte `Disponible actuellement`.

### Background
- `<BGPattern variant="grid" mask="fade-edges" />` avec `fill="color-mix(in oklch, var(--color-ink-300) 50%, transparent)"` pour rester subtil sous le lead. Voir `DESIGN_SYSTEM.md` §6.1.
- Texte et card en `relative z-10`.

### Animation
- Slide-in latéral (Phase 1.4a) :
  - Colonne gauche : `<FadeIn x={-48} duration={0.7}>` autour de tout le bloc texte.
  - Colonne droite : `<FadeIn x={48} y={0} duration={0.7}>` autour du wrapper rotatif + card.
- Pas de stagger interne (volonté d'un slide-in unique smooth par colonne).

---

## 3. MON TRAVAIL (`#travail`)

> Remplace POURQUOI, SERVICES et EXEMPLES, supprimées lors du repositionnement.
> Composants : `sections/Travail.tsx` (serveur) et `sections/WorkShowcase.tsx` (client, partagé par les deux colonnes).
> Données : `content/travail.ts`.

### Layout
- En-tête centré : `SectionLabel` + H2 + lead, `max-w-2xl mx-auto text-center`.
- Grille `lg:grid-cols-12`, colonne gauche `lg:col-span-7`, colonne droite `lg:col-span-5`.
- Filet de séparation : `lg:border-l border-ink-300/60` sur la colonne droite, avec `lg:pl-10 xl:pl-14` et `lg:pr-10 xl:pr-14` à gauche. Sous `lg`, `border-t` et empilement.
- Titre de colonne : mono uppercase `tracking-widest`, souligné d'un trait mint de 48px.

### Colonne gauche
- Projet en grand : card `rounded-3xl`, visuel `aspect-[16/9]`, puis catégorie / titre / secteur et une pastille ronde de 48px vers le site externe.
- Vignettes : `grid-cols-3` puis `sm:grid-cols-6`, bordure mint sur l'active, opacité 60 % sur les autres. Le nom du site sous la vignette n'est pas tronqué, il passe sur deux lignes.
- Bouton `Des exemples par métier` en `variant="secondary"`.

### Colonne droite
- **Même vitrine que la colonne gauche** (`WorkShowcase`), avec deux vignettes au lieu de six : `grid-cols-2`.
- La nature du produit prend la place de la catégorie du site, la description celle du secteur. Le badge d'état vient à côté de la nature, sur la même ligne.
- Pas de pastille de lien quand le produit n'a pas d'URL, cas de BetaWall.

### Animation
- `FadeIn y={24}` sur chaque colonne.
- Changement de projet : fondu de 0.3s sur le visuel via `AnimatePresence mode="wait"`. Motivé par le retour au clic sur une vignette, sans décalage de mise en page. `useReducedMotion` supprime le fondu.

---

## 6. TARIFS (`#tarifs`)

### Layout
- `SectionLabel` + H2 + lead.
- Grille `grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16 max-w-5xl mx-auto`.
- 2 cards tarif.

### Card tarif
- `rounded-3xl border bg-card p-8 md:p-10 flex flex-col`.
- Si "le plus demandé" → badge en haut + `border-mint-500` plus marquée.
- Structure :
  - Badge `Le plus demandé` ou `Sur mesure` (chip mono mint en haut).
  - Nom de l'offre (H3).
  - Prix principal **en display-2 serif** + petite mention sous le prix.
  - Récurrent (`+ 30 €/mois`) en `text-h3` + mention.
  - `<hr>` mince.
  - Liste à puces — chaque item avec icône `Check` lucide en `text-mint-700`.
  - **Spacer flex-1** (pousse le CTA en bas).
  - CTA primaire pleine largeur.

### Note finale
- Sous les cards, paragraphe `text-small text-ink-500 max-w-3xl mx-auto text-center`.

### Background
- Optionnel : section plus sombre `bg-ink-950 text-ink-50`. À tester. Si fait, adapter les cards (fond `bg-ink-50/95`).
- Au MVP, partir sur **fond clair standard** pour rester safe.

---

## 7. CONTACT (`#contact`)

### Layout
- 2 colonnes desktop (`grid-cols-1 lg:grid-cols-2 gap-12`).
- Gauche : `SectionLabel` + H2 + lead + bloc "alternative contact direct" + (optionnel) un visuel.
- Droite : le formulaire dans une card `rounded-2xl border bg-card p-8`.

### Formulaire
- Tous les inputs : `rounded-md border border-ink-300 bg-card px-4 py-3 text-base focus:outline-2 focus:outline-mint-700` (le `text-base` = 16px est **obligatoire** pour empêcher le zoom automatique iOS au focus sur mobile).
- Labels au-dessus de chaque champ, `text-small font-medium text-ink-700`.
- Astérisque rouge `*` pour requis.
- Honeypot `<input type="text" name="website" tabIndex={-1} className="sr-only" autoComplete="off" />`.
- Bouton submit pleine largeur `lg` (toujours `w-full`, mobile et desktop).
- `inputMode` adapté : `inputMode="email"` sur email, `inputMode="tel"` sur téléphone (déclenche le bon clavier mobile).
- `autoComplete` : `email`, `tel`, `organization-title` (activité), `off` sur le honeypot.

### Comportement (client component)
- Validation Zod côté serveur ET côté client (mêmes schémas).
- État : `idle | loading | success | error`.
- Sur succès → animation : formulaire fade-out, message succès fade-in.
- Sur erreur de champ → ring rouge `outline-2 outline-error` + texte erreur sous le champ.

---

## 8. FOOTER

### Layout
- Background `bg-ink-950 text-ink-50`.
- Container max-w-7xl.
- Padding `py-16 md:py-20`.
- Grid `grid-cols-1 md:grid-cols-3 gap-12`.

### Sous le grid
- Séparateur `border-t border-ink-700/40 mt-12 pt-8`.
- Layout horizontal : copyright à gauche, liens légaux à droite.
- Texte en `text-small text-ink-300`.

---

## 9. Ordre de rendu dans `page.tsx`

```tsx
<>
  <Navbar />
  <main id="main">
    <Hero />
    <Why />
    <Services />
    <Examples />
    <Pricing />
    <Contact />
  </main>
  <Footer />
</>
```

---

## 10. Responsive — référence complète

> Le responsive n'est PAS une finition. Chaque section doit être pensée mobile d'abord, puis enrichie sur les tailles supérieures. Toute section livrée doit cocher la checklist en bas de cette page.

### 10.1 Mobile first

- Tailwind est mobile first par défaut : les classes sans préfixe s'appliquent à toutes les tailles ; `sm:`, `md:`, `lg:`, `xl:` les surchargent **vers le haut**.
- Toujours écrire les classes de base **pour mobile**, puis ajouter les variantes desktop.
  - ✅ `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
  - ❌ `grid grid-cols-4 sm:grid-cols-2 sm:grid-cols-1`

### 10.2 Breakpoints (Tailwind par défaut)

| Préfixe | min-width | Cible |
|---------|-----------|-------|
| (aucun) | 0 | Mobile (portrait) |
| `sm:` | 640px | Mobile (paysage) / petite tablette |
| `md:` | 768px | Tablette portrait |
| `lg:` | 1024px | Tablette paysage / petit desktop |
| `xl:` | 1280px | Desktop standard |

**Largeurs à tester systématiquement avant validation :**
- **375px** (iPhone SE / petits Android) — la pire largeur, c'est le filtre dur
- **390px** (iPhone moderne)
- **768px** (iPad portrait)
- **1024px** (iPad paysage / laptop entrée de gamme)
- **1440px** (laptop standard)
- **1920px** (desktop large)

### 10.3 Règles transversales

#### Container & padding horizontal
Toujours : `mx-auto max-w-7xl px-6 md:px-10 lg:px-16`.
- Jamais moins de `px-6` sur mobile (sinon le texte colle aux bords).
- Jamais plus de `px-16` desktop (sinon les sections ont l'air vides).

#### Padding vertical des sections
- Section standard : `py-20 md:py-28 lg:py-36`. (Pour info, j'ai allégé par rapport au `py-24 md:py-32 lg:py-40` du début — on garde la version originale, mais sur mobile **jamais en dessous de `py-20`**).
- Hero : `min-h-[90svh]` mobile (svh, pas vh — pour gérer la barre URL des navigateurs mobiles), `min-h-[88vh]` desktop.

#### Typographie fluide
- Tous les titres `h1`/`h2` utilisent `clamp()` (déjà défini dans `DESIGN_SYSTEM.md` §3.2). Pas besoin de classes responsive sur les titres principaux : le clamp gère.
- Pour le body, taille fixe `text-base` (16px) — pas de réduction sur mobile.

#### Touch targets (mobile)
- **Tous les éléments interactifs ≥ 44×44px sur mobile** (WCAG AAA et recommandation Apple/Google).
- Boutons : taille `lg` (52px) en CTA principaux, jamais en dessous de `md` (44px) sur mobile.
- Liens dans la navbar mobile : `py-4` au minimum dans le menu plein écran.
- Inputs : `min-h-12` (48px) — déjà couvert par les paddings standards des inputs.
- Icônes-boutons : zone cliquable `size-11` même si l'icône fait `size-5` à l'intérieur.

#### Espacements adaptatifs
- Gap dans une grille : `gap-4` mobile, `gap-6 lg:gap-8` desktop.
- Espace entre titre H2 et contenu d'une section : `mt-10 md:mt-12 lg:mt-16`.
- Marge entre CTA primaire et secondaire (hero) : `flex flex-col gap-3 sm:flex-row sm:gap-3` (empilés sur très petit écran).

#### Images
- Toutes via `next/image` avec `sizes` correct, exemple : `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"`.
- Avatar hero : 80×80 mobile, 120×120 md, 160×160 lg.
- **Jamais** d'image en `width/height` fixe sans `sizes` (cause des layout shifts).

#### Texte tronqué et débordements
- `min-w-0` sur les enfants de flex/grid pour éviter le débordement (notamment dans la card de présentation hero qui contient des chips).
- `overflow-hidden` sur les sections avec `FallingPattern` ou `BGPattern` en absolute pour éviter scroll horizontal accidentel.
- `break-words` sur les paragraphes contenant des liens email / URLs.

### 10.4 Comportements spécifiques par section

#### Navbar (rappel SECTIONS §1)
- **< md** : liens cachés → bouton hamburger → sheet plein écran descendant.
  - Sheet : `fixed inset-0 z-50 bg-ink-50` avec liens en colonne, `text-2xl font-serif`, `py-6` entre liens (touch target).
  - CTA primaire en bas du sheet, pleine largeur.
  - Bouton fermeture en haut à droite, `aria-label="Fermer le menu"`.
- **≥ md** : liens horizontaux + CTA à droite, comme spec actuelle.

#### Hero
- **< md** : 1 colonne. Ordre vertical : H1 → lead → CTAs (empilés en colonne) → **PresentationCard sous le texte** (avatar rond à gauche du nom, citation + sous-tagline + indicateur dispo en colonne dans la card). Pas de pleine hauteur viewport — section content-driven avec `py-10`.
- **md** : grille 6/6, card à droite, layout plus aéré. Pleine hauteur viewport (`min-h-[100svh]`), contenu top-aligné (`pt-28`).
- **lg+** : grille 7/5, card plus grande, `pt-32`.
- Le `BGPattern` grid utilise `fill="color-mix(in oklch, var(--color-ink-300) 50%, transparent)"` pour rester subtil sous le lead — pas besoin de wrapper opacity supplémentaire.

#### Pourquoi
- **< md** : `grid-cols-1 gap-4`
- **md** : `grid-cols-2 gap-6`
- **lg+** : `grid-cols-2 gap-8` (on reste en 2 colonnes même desktop : 4 cards en grille 2×2 plus lisible que 1×4)

#### Services
- **< md** : `grid-cols-1 gap-4`
- **md** : `grid-cols-2 gap-6`
- **lg+** : `grid-cols-4 gap-6` (les 4 services sur une ligne — vérifier que les textes tiennent sans coupure agressive)

#### Exemples
- **< md** : `grid-cols-1 gap-6`, cards empilées
- **md+** : `grid-cols-2 gap-8`
- Les images placeholders gardent un `aspect-[4/3]` à toutes les tailles.

#### Tarifs
- **< md** : `grid-cols-1 gap-6`, cards empilées (la "Le plus demandé" en premier)
- **md+** : `grid-cols-2 gap-8`, cards côte à côte de même hauteur (`flex flex-col`, CTA poussé en bas avec `flex-1`)

#### Contact
- **< md** : 1 colonne, texte d'intro au-dessus du formulaire, formulaire pleine largeur.
- **lg+** : `grid-cols-2 gap-12`, texte à gauche, form à droite.
- **Formulaire mobile** :
  - `input` et `textarea` en pleine largeur, `w-full`.
  - `type="email"`, `type="tel"`, `inputMode="email"` / `inputMode="tel"` pour déclencher le bon clavier mobile.
  - Bouton submit `w-full` toujours (mobile ET desktop, pour cohérence).
  - `autoComplete` correctement renseigné (`email`, `tel`, `off` pour le honeypot).

#### Footer
- **< md** : `grid-cols-1 gap-8`, colonnes empilées.
- **md+** : `grid-cols-3 gap-12` comme spec.
- Ligne du bas (copyright + liens légaux) : `flex flex-col gap-4 md:flex-row md:items-center md:justify-between`.

### 10.5 Checklist QA responsive (à valider AVANT de marquer une section "done")

Pour chaque section livrée :

- [ ] Testée visuellement à **375px** sans scroll horizontal ni élément qui dépasse
- [ ] Testée à **768px** : layout intermédiaire propre (pas juste mobile élargi ou desktop rétréci)
- [ ] Testée à **1440px** : ne paraît pas vide, container max-w respecté
- [ ] Tous les boutons / liens cliquables ≥ 44×44px sur mobile
- [ ] Aucun texte coupé par `overflow: hidden` non voulu
- [ ] Aucune image sans `sizes` correct (vérifier devtools)
- [ ] Aucun layout shift au chargement (CLS = 0 sur la section)
- [ ] Les `FallingPattern` / `BGPattern` ne créent pas de scroll horizontal (parent `overflow-hidden`)
- [ ] La navigation au clavier fonctionne (Tab traverse les éléments dans l'ordre logique)
- [ ] Sur mobile : `prefers-reduced-motion` testé (devtools → Rendering → "Emulate CSS prefers-reduced-motion") : les animations doivent disparaître ou être instantanées
