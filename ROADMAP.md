# ROADMAP.md — yan-dev

> Phases de développement. Claude Code se réfère à ce fichier pour savoir si une feature est dans le scope actuel ou reportée. Ne **jamais** anticiper sur une phase suivante sans validation explicite.

> **Workflow Git** : chaque étape ci-dessous = une branche Git dédiée, mergée dans `main` après validation explicite de Yan. Voir `GIT_WORKFLOW.md` §6 pour le mapping étape → nom de branche.

> **Changement de plan (2026-05) :** la QA responsive (ex-1.7), la mise en ligne (ex-1.8) et l'achat du domaine (ex-1.9) sont **reportés après la Phase 2 de revue design/wording**. Cf. nouvelle Phase 3.

---

## Phase 0 — Setup ✅

- [x] `pnpm create next-app` (TypeScript, ESLint, Tailwind, App Router, alias `@/*`)
- [x] Installer `motion`, `lucide-react`, `zod`
- [x] Init des fontes via `next/font/google` (Inter, Instrument Serif, JetBrains Mono)
- [x] Mettre en place `globals.css` avec `@theme` et les tokens (cf. `DESIGN_SYSTEM.md` §2.4)
- [x] Créer arborescence (cf. `ARCHITECTURE.md` §2)
- [x] Ajouter `content/site.ts` avec constantes (nav, email, tarifs, etc.)
- [x] Page `page.tsx` qui rend une placeholder par section

**Sortie atteinte :** page qui scroll proprement entre 6 sections vides, ancres navbar qui fonctionnent.

---

## Phase 1 — MVP base ✅

> Toutes les sections, le formulaire et le SEO base sont en place. La mise en ligne et la QA sont reportées en Phase 3 pour laisser place à une revue design/wording (Phase 2).

### 1.1 — Composants UI de base ✅
- [x] `Button` (variantes primary, secondary, ghost; tailles sm, md, lg)
- [x] `Card`
- [x] `SectionLabel` (numéro mono mint)
- [x] `Input`, `Textarea` (avec gestion error state)
- [x] `FadeIn`, `Stagger` (wrappers Motion)

### 1.2 — Backgrounds ✅
- [x] `clsx` + `tailwind-merge` installés ; `cn()` dans `src/lib/utils.ts`
- [x] `FallingPattern` + `BGPattern` copiés dans `src/components/backgrounds/`
- [x] Fix `z-[-10]` sur BGPattern (cf. mémoire projet)
- [x] Page de test `/test-backgrounds` (à supprimer en Phase 3)

### 1.3 — Layout ✅
- [x] `Navbar` (scroll detection, active section via IntersectionObserver, menu mobile)
- [x] `Footer` (3 colonnes dark, copyright dynamique)

### 1.4 — Sections (dans l'ordre) ✅
- [x] `Hero` avec PresentationCard + BGPattern grid + slide-in latéral
- [x] `Why` avec 4 cards 2×2/4-cols + stagger + hover lift
- [x] `Services` avec 4 cards icônes lucide
- [x] `Examples` avec 2 cards et visuels placeholder gradient
- [x] `Pricing` avec 2 cards (vitrine 490 € + premium sur devis)
- [x] `Contact` avec formulaire Zod côté client

### 1.5 — API formulaire (côté serveur) ✅
- [x] Schéma Zod dans `lib/schema.ts`
- [x] Route `api/contact/route.ts` qui valide les données et renvoie 200 sans envoyer de mail (`console.log` debug)
- [x] Honeypot anti-bot en place
- [x] Gestion états client : idle / loading / success / error (fetch réel vers l'API)
- [x] `TODO Phase 3.3` explicite dans `route.ts` pour rebrancher Resend à l'achat du domaine

### 1.6 — SEO base ✅
- [x] Metadata complète dans `layout.tsx` (title keyword-rich, keywords, openGraph, twitter, alternates)
- [x] `sitemap.ts` + `robots.ts` (utilisent `NEXT_PUBLIC_SITE_URL`)
- [x] JSON-LD `ProfessionalService` (Caen + agglo + Calvados + Normandie + France)
- [x] OG image dynamique via `next/og` à `/opengraph-image`
- [ ] Favicon dédié + apple-touch-icon (default Next pour l'instant — à finaliser Phase 3)

---

## Phase 2 — Revue design + wording, section par section 🔄 (en cours)

> Tout est en place fonctionnellement mais chaque section mérite une seconde passe : design, copy, animations, équilibres visuels, micro-détails. On reprend section par section avec un œil neuf.

> **Principe** : pour chaque section, on travaille **design** + **wording** dans la même branche. Si une décision change un fichier de spec (`CONTENT.md`, `SECTIONS.md`, `DESIGN_SYSTEM.md`), on aligne la doc dans la même branche ou via un follow-up `docs/*`.

### 2.1 — Revue Hero ✅ (validée en l'état)
- [x] Hero validé tel qu'implémenté en Phase 1.4a — pas de seconde passe nécessaire (décision 2026-05).

### 2.2 — Revue Pourquoi
- [ ] Audit cards (densité, hover, anim stagger)
- [ ] Audit wording H2 + lead + 4 raisons
- [ ] Branche `feat/why-revue`

### 2.3 — Revue Services
- [ ] Audit cards icônes (choix lucide, taille cercles)
- [ ] Audit wording 4 services
- [ ] Branche `feat/services-revue`

### 2.4 — Revue Exemples
- [ ] Décider : placeholders gardés / vrais mockups / carrousel ? (le 3D reste en Phase 4)
- [ ] Audit wording badges + titres + descriptions
- [ ] Branche `feat/examples-revue`

### 2.5 — Revue Tarifs
- [ ] Audit hiérarchie visuelle (highlight, badge, prix, features)
- [ ] Audit wording tarifs + footnote
- [ ] Branche `feat/pricing-revue`

### 2.6 — Revue Contact
- [ ] Audit ergonomie formulaire (labels, placeholders, états)
- [ ] Audit wording H2 + lead + success/error
- [ ] Branche `feat/contact-revue`

**Sortie attendue :** site visuellement et textuellement prêt pour la mise en ligne. Les sections sont jolies, les copies sont calées.

---

## Phase 3 — QA, mise en ligne et domaine (anciennement 1.7 → 1.9)

> À attaquer **après** la Phase 2.

### 3.1 — QA responsive et accessibilité
- [ ] **QA responsive complète** pour chaque section : checklist `SECTIONS.md` §10.5 à **375px / 390px / 768px / 1024px / 1440px**.
- [ ] Tester sur **device réel** (iPhone + Android Chrome).
- [ ] Vérifier qu'aucune page ne provoque de scroll horizontal sur mobile.
- [ ] Navbar mobile (sheet plein écran) testée à fond.
- [ ] **Touch targets ≥ 44px** vérifiés.
- [ ] **Formulaire mobile** : claviers natifs corrects, zoom auto désactivé.
- [ ] Lighthouse desktop ≥ 95 perf / 100 a11y / 100 SEO / 100 best-practices.
- [ ] **Lighthouse mobile** ≥ 90 perf / 100 a11y / 100 SEO.
- [ ] Pas de console warning en prod.
- [ ] Finaliser favicon dédié + apple-touch-icon.
- [ ] Supprimer la route `/test-backgrounds` (temporaire).

### 3.2 — Mise en ligne sur Vercel (sans domaine définitif)
- [ ] Déploiement Vercel (URL `.vercel.app` provisoire)
- [ ] Configurer `NEXT_PUBLIC_SITE_URL` dans les env vars Vercel
- [ ] Vérif manuelle live
- [ ] Test formulaire end-to-end depuis le déploiement preview

### 3.3 — Achat domaine + bascule prod
- [ ] Acheter le domaine (`yan-dev.fr` ou variante)
- [ ] Configurer DNS chez le registrar → Vercel
- [ ] Mettre à jour `NEXT_PUBLIC_SITE_URL` avec le vrai domaine
- [ ] Choix final Resend ou SMTP
- [ ] Configuration domaine vérifié chez le provider mail
- [ ] Variables d'env complétées (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`)
- [ ] Rebrancher l'envoi réel dans `api/contact/route.ts` (retirer le `TODO Phase 3.3`)
- [ ] Test end-to-end : envoi d'un vrai mail reçu dans la boîte
- [ ] Documenter dans `README.md` la procédure d'envoi mail
- [ ] Retirer `robots: { index: false, follow: false }` et `disallow: "/"` dans `robots.ts`
- [ ] Redéployer (auto)
- [ ] Soumission Search Console + sitemap
- [ ] Création Google Business Profile (adresse Caen)

**Sortie attendue :** site en ligne sur le vrai domaine, formulaire fonctionnel avec vrai envoi de mail, indexé Google.

---

## Phase 4 — Polish & 3D (anciennement Phase 2)

> Post-MVP, sans urgence. Peut être attaqué après la mise en ligne quand le site tourne en prod.

### 4.1 — Carrousel Three.js section Exemples
- [ ] Installer `three`, `@react-three/fiber`, `@react-three/drei`
- [ ] Composant `<ProjectsCarousel3D>` (client only, import dynamique)
- [ ] Cards de projet en 3D avec texture screenshot
- [ ] Interaction drag / scroll horizontal
- [ ] Fallback statique si WebGL indispo ou reduced-motion

### 4.2 — Animations enrichies
- [ ] Effets scroll discrets sur titres (text reveal lettre par lettre, parcimonieux)
- [ ] Curseur custom soft (à débattre — risque de paraître gadget)
- [ ] Marquee de mots-clés ou logos (peut être utile section Pourquoi)

### 4.3 — Contenu supplémentaire
- [ ] Ajouter 2 vrais projets dans Examples (avec mockups réels)
- [ ] Page Mentions légales (Markdown ou MDX → page dédiée `/mentions-legales`)
- [ ] Éventuelle page FAQ ou Process

### 4.4 — Analytics
- [ ] Plausible Analytics installé (ou Umami auto-hébergé)
- [ ] Tracking événements clés : clic CTA hero, scroll section tarifs, soumission form

### 4.5 — Dark mode (optionnel)
- [ ] Toggle dans navbar
- [ ] Adapter tous les tokens (déjà préparés en variables CSS)
- [ ] Tester FallingPattern et BGPattern en dark

---

## Phase 5 — Évolutions ultérieures (anciennement Phase 3)

À discuter — pas planifié.

- **Pages SEO par ville cible** (`/site-web-paris`, `/site-web-lyon`, `/site-web-rennes`...) — LA façon de ranker localement dans d'autres villes que Caen sans diluer la home. Une page = un H1 ciblé `Création de site internet à [Ville]`, un texte adapté (3-4 paragraphes), un schema.org `ProfessionalService` avec `areaServed` sur cette ville. À envisager une fois la home et la phase 4 stabilisées.
- Blog SEO (1-2 articles/mois ciblés sur des requêtes locales)
- Page dédiée par "métier cible" (`/site-web-boulangerie`, `/site-web-restaurant`...) pour ranker sur du long tail
- Témoignages clients (à collecter après les premiers projets)
- Vidéo de présentation (15-30s) en remplacement ou complément de la card avatar
- Calculateur de tarif interactif
- Module de prise de RDV (Cal.com embed)

---

## Décisions ouvertes (synthèse)

| Sujet | Statut |
|-------|--------|
| Phrase d'accroche H1 | ✅ Validée — "Un site web clair, moderne et rapide." (Phase 1.4a) |
| Zone SEO prioritaire | ✅ Caen ancrage local + maillage France |
| Email public au MVP | ✅ Placeholder `contact@yan-dev.fr` (vrai à l'achat du domaine, Phase 3.3) |
| Téléphone public | ❌ Non affiché au MVP |
| Resend vs Nodemailer | Reporté Phase 3.3 |
| Hébergement long terme (Vercel ou autre) | À valider Phase 3.2 |
| Nom de domaine final | Reporté Phase 3.3 — dev sur `.vercel.app` en attendant |
| Dark mode au MVP | Reporté Phase 4.5 |
| Carrousel 3D | Reporté Phase 4.1 |
| Analytics | Reporté Phase 4.4 |
| Mentions légales | Reporté Phase 4.3 (placeholder `#` au MVP) |
