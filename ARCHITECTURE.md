# ARCHITECTURE.md — yan-dev

> Stack, structure de dossiers et conventions de code. Aucune dépendance n'est ajoutée sans validation explicite de Yan.

---

## 1. Stack figée

| Couche | Choix | Version | Pourquoi |
|--------|-------|---------|----------|
| Framework | **Next.js** (App Router) | latest stable | SSR + SEO + API routes pour le form |
| Langage | **TypeScript** | strict | Sécurité et autocomplete |
| UI | **React** | 19 | Imposé par Next.js récent |
| Styles | **TailwindCSS v4** | v4 | Tokens via `@theme`, moins de config |
| Animation | **Motion** (`motion`) | latest | Successeur de Framer Motion, plus léger |
| Icônes | **lucide-react** | latest | Cohérence, tree-shakable |
| 3D (phase 2) | **three** + **@react-three/fiber** + **@react-three/drei** | latest | Carrousel projets phase 2 |
| Formulaire | API route Next.js + **Resend** (ou **Nodemailer**) | — | Décision à valider |
| Validation | **Zod** | latest | Validation form côté serveur |
| Fontes | `next/font/google` (Inter, Instrument Serif, JetBrains Mono) | — | Auto-host, perf |
| Lint | **ESLint** (config Next) + **Prettier** | — | — |
| Déploiement | **Vercel** | — | Au moins en dev/preview |

> Toute autre lib (utilitaires, animations alternatives, UI kits) est **interdite** sans validation.

---

## 2. Arborescence

> **Note** : à côté du projet Next.js, le dossier `components-source/` (livré avec ces specs) contient les composants `FallingPattern` et `BGPattern` déjà adaptés, prêts à copier dans `src/components/backgrounds/`. Voir `components-source/README.md`.

```
yan-dev/
├── .claude/
│   ├── skills/
│   │   ├── nextjs-section/SKILL.md
│   │   └── tailwind-theme/SKILL.md
│   └── settings.json                  # (optionnel) hooks, permissions
├── CLAUDE.md
├── DESIGN_SYSTEM.md
├── ARCHITECTURE.md
├── CONTENT.md
├── SECTIONS.md
├── SEO.md
├── ROADMAP.md
├── README.md
├── components-source/                 # SOURCE EXTERNE — à copier vers src/, pas dans le bundle
│   ├── README.md
│   └── backgrounds/
│       ├── FallingPattern.tsx
│       └── BGPattern.tsx
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── public/
│   ├── avatar-yan.webp                # avatar fourni, à optimiser
│   ├── og-image.png                   # 1200x630
│   ├── favicon.ico
│   └── robots.txt                     # généré par Next ou statique
└── src/
    ├── app/
    │   ├── layout.tsx                 # fonts, metadata globale, html lang="fr"
    │   ├── page.tsx                   # assemble toutes les sections
    │   ├── globals.css                # @theme + reset
    │   ├── sitemap.ts                 # auto-généré
    │   ├── robots.ts                  # auto-généré
    │   └── api/
    │       └── contact/
    │           └── route.ts           # POST formulaire
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   ├── Why.tsx
    │   │   ├── Services.tsx
    │   │   ├── Examples.tsx
    │   │   ├── Pricing.tsx
    │   │   └── Contact.tsx
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── SectionLabel.tsx
    │   │   ├── Input.tsx
    │   │   └── Textarea.tsx
    │   ├── backgrounds/
    │   │   ├── FallingPattern.tsx     # COPIE depuis components-source/
    │   │   └── BGPattern.tsx          # COPIE depuis components-source/
    │   └── motion/
    │       ├── FadeIn.tsx             # wrapper réutilisable
    │       └── Stagger.tsx
    ├── lib/
    │   ├── utils.ts                   # cn(), formatters
    │   ├── motion.ts                  # easings, durations, variants
    │   ├── schema.ts                  # zod schemas (contact form)
    │   └── seo.ts                     # helpers metadata
    └── content/
        └── site.ts                    # constantes : nom, email, tarifs, navigation
```

---

## 3. Conventions

### 3.1 Nommage

- Composants : `PascalCase.tsx`, un composant par fichier.
- Hooks : `useXxx.ts` dans `lib/hooks/` (créer le dossier au besoin).
- Variables : `camelCase`. Constantes globales : `UPPER_SNAKE`.
- Fichiers d'images : `kebab-case.webp`.

### 3.2 Server vs Client

- **Server par défaut.** Une section sans state ni event handler reste server component.
- `"use client"` **uniquement** si :
  - on utilise `useState`, `useEffect`, `useRef`, des hooks tiers de Motion, etc.
  - on attache des `onClick`, `onChange`...
- Si une page server doit afficher un sous-bloc client, faire un composant séparé client importé dedans (pas tout passer en client).

### 3.3 Tailwind v4

- Tokens dans `globals.css` via `@theme` (voir `DESIGN_SYSTEM.md` §2.4).
- Pas de `tailwind.config.ts` (v4 n'en a plus besoin pour les tokens).
- Plugin `@tailwindcss/postcss` (déjà gérée par `create-next-app`).
- Pour les variantes/utilities customs (rare), `@utility` dans `globals.css`.

### 3.4 Imports

- Alias `@/*` pointant vers `src/*` (dans `tsconfig.json`).
- Ordre des imports : `react`/`next` → libs tierces → `@/components` → `@/lib` → `@/content` → styles relatifs.

### 3.5 Accessibilité

- `<html lang="fr">` dans `layout.tsx`.
- Skip-link en haut du body : "Aller au contenu" → `#main`.
- Tous les inputs ont un `<label htmlFor>`.
- Tous les boutons-icônes ont un `aria-label`.
- Focus visible toujours, pas de `outline-none` sans `focus-visible:` de remplacement.

### 3.5bis Responsive (règles globales obligatoires)

- **Viewport meta** : exporter dans `layout.tsx` :
  ```ts
  export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    // PAS de maximumScale ni de userScalable: false (anti-a11y)
    themeColor: "#F7F9F7", // = --color-background
  };
  ```
- **Mobile first** : écrire toutes les classes Tailwind pour mobile en base, puis surcharger avec `md:`, `lg:`...
- **`overflow-x-hidden` sur `<body>`** dans `globals.css` pour empêcher tout scroll horizontal accidentel (causé par un pattern background, un débordement de chip, etc.).
- **`scroll-behavior: smooth`** sur `<html>` pour les ancres navbar, avec `scroll-padding-top` égal à la hauteur de navbar (`64px` mobile, `80px` desktop) pour que les ancres ne soient pas masquées sous la navbar sticky.
- Tester chaque page rendue à **375px / 768px / 1440px** avant validation.
- Voir `SECTIONS.md` §10 pour les règles détaillées par section et la checklist QA.

### 3.6 Performance

- Images via `next/image` avec `sizes` correct.
- Pas de lib lourde côté client (vérifier le bundle avant d'ajouter quoi que ce soit).
- Three.js (phase 2) : import dynamique avec `ssr: false` + skeleton.
- `loading="lazy"` par défaut sur images en bas de page.

### 3.7 Indexation

- Tant que **pas de domaine final** : ajouter `robots: { index: false, follow: false }` dans le `metadata` de `layout.tsx` pour éviter d'indexer une URL `.vercel.app`. Le `robots.ts` peut aussi `disallow: "/"` sur cette période.
- À l'achat du domaine : retirer ces blocages, passer à `index: true, follow: true`.

---

## 4. Formulaire de contact (API route)

`src/app/api/contact/route.ts` :

- Méthode : `POST`.
- Body : `{ email, phone?, activity, message }` validé par Zod.
- Honeypot caché (champ `website`) pour bloquer les bots basiques.
- Rate limit : on commence sans, on ajoute si besoin (voir `ROADMAP.md`).
- Envoi mail : **Resend** (préférence) → `from: "Yan-dev <contact@yan-dev.fr>"`, `to: "yan@yan-dev.fr"` (à confirmer).
- Réponses :
  - 200 `{ ok: true }`
  - 400 `{ ok: false, errors: ZodIssues[] }`
  - 500 `{ ok: false, message }`

Variables d'environnement (`.env.local`, **jamais commit**) :
```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

---

## 5. Scripts npm attendus

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write ."
}
```

---

## 6. Décisions ouvertes (à trancher avec Yan)

- [ ] Resend vs Nodemailer SMTP pour le form.
- [ ] Hébergement long terme : Vercel ou OVH/VPS ? (le tarif "30€/mois maintenance" inclut l'hébergement → impacte le choix).
- [ ] **Nom de domaine final — reporté.** Pas acheté pour l'instant. Dev en local sur `localhost:3000`, preview sur l'URL `.vercel.app` auto-générée par Vercel. Utiliser `NEXT_PUBLIC_SITE_URL` dans tout le code qui référence l'URL absolue (metadata, sitemap, JSON-LD, OG). Au moment de l'achat : pointer DNS + mettre à jour la variable d'env Vercel, **rien à changer dans le code**.
- [ ] Dark mode : on prévoit les variables maintenant ou plus tard ?

---

## 7. Variables d'environnement (récap)

```
# .env.local (jamais commit, à dupliquer en .env.example)

# URL publique du site — placeholder tant que pas de domaine
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Mail — envoi du formulaire via SMTP OVH/Zimbra (choix Phase 3.3)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=contact@yan-dev.fr
SMTP_PASS=                       # mot de passe boîte, jamais commit
CONTACT_FROM_EMAIL=contact@yan-dev.fr
CONTACT_TO_EMAIL=contact@yan-dev.fr
```

> Décision Phase 3.3 : envoi via **SMTP OVH/Zimbra** (et non Resend), pour
> réutiliser le compte `contact@yan-dev.fr` déjà authentifié (SPF/DKIM/DMARC).
> Helper : `src/lib/mail.ts` (nodemailer).

En preview/prod Vercel, redéfinir `NEXT_PUBLIC_SITE_URL` avec :
- Preview : l'URL `.vercel.app` du déploiement
- Prod : le vrai domaine quand acheté

Les variables `SMTP_*` et `CONTACT_*` sont à saisir dans **Vercel → Settings
→ Environment Variables** (Production + Preview). `SMTP_PASS` ne doit jamais
être commit.
