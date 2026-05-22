# ROADMAP.md — yan-dev

> Phases de développement. Claude Code se réfère à ce fichier pour savoir si une feature est dans le scope actuel ou reportée. Ne **jamais** anticiper sur une phase suivante sans validation explicite.

> **Workflow Git** : chaque étape ci-dessous = une branche Git dédiée, mergée dans `main` après validation explicite de Yan. Voir `GIT_WORKFLOW.md` §6 pour le mapping étape → nom de branche.

---

## Phase 0 — Setup (≈ 0.5j)

- [ ] `pnpm create next-app` (TypeScript, ESLint, Tailwind, App Router, alias `@/*`)
- [ ] Installer `motion`, `lucide-react`, `zod`
- [ ] Init des fontes via `next/font/google` (Inter, Instrument Serif, JetBrains Mono)
- [ ] Mettre en place `globals.css` avec `@theme` et les tokens (cf. `DESIGN_SYSTEM.md` §2.4)
- [ ] Créer arborescence (cf. `ARCHITECTURE.md` §2)
- [ ] Ajouter `content/site.ts` avec constantes (nav, email, tarifs, etc.)
- [ ] Page `page.tsx` qui rend une placeholder par section (juste le nom de la section sur fond coloré différent), pour valider visuellement la navigation et le scroll smooth.

**Sortie attendue :** page qui scroll proprement entre 6 sections vides, ancres navbar qui fonctionnent.

---

## Phase 1 — MVP (≈ 3-4j)

> Tout ce qu'il faut pour mettre en ligne et commencer à montrer le site à des prospects.

### 1.1 — Composants UI de base
- [ ] `Button` (variantes primary, secondary, ghost; tailles sm, md, lg)
- [ ] `Card`
- [ ] `SectionLabel` (numéro mono mint)
- [ ] `Input`, `Textarea` (avec gestion error state)
- [ ] `FadeIn`, `Stagger` (wrappers Motion)

### 1.2 — Backgrounds (déjà fournis, à copier)
- [ ] Installer dépendances : `pnpm add motion clsx tailwind-merge`
- [ ] Créer `src/lib/utils.ts` avec la fonction `cn()` (snippet dans `components-source/README.md`)
- [ ] Copier `components-source/backgrounds/FallingPattern.tsx` → `src/components/backgrounds/FallingPattern.tsx`
- [ ] Copier `components-source/backgrounds/BGPattern.tsx` → `src/components/backgrounds/BGPattern.tsx`
- [ ] Vérifier qu'aucune erreur TS ne sort (tokens CSS bien définis dans `globals.css`)
- [ ] Tester en isolation : page de test rapide qui affiche un `FallingPattern` plein écran + un `BGPattern variant="grid" mask="fade-edges"`

### 1.3 — Layout
- [ ] `Navbar` (avec menu mobile, état scroll, observation section active)
- [ ] `Footer`

### 1.4 — Sections (dans l'ordre)
- [ ] `Hero` avec card de présentation + FallingPattern
- [ ] `Why` avec grille 4 cards + BGPattern grid en fond
- [ ] `Services` avec grille 4 cards
- [ ] `Examples` avec 2 cards placeholders (visuel mockup à définir)
- [ ] `Pricing` avec 2 cards
- [ ] `Contact` avec formulaire fonctionnel

### 1.5 — API & formulaire (stratégie deux temps)

**Au MVP (sans domaine encore acheté) :**
- [ ] Schéma Zod dans `lib/schema.ts`
- [ ] Route `api/contact/route.ts` qui valide les données et **renvoie 200 sans envoyer de mail** (ou avec un `console.log` côté serveur pour debug). Permet de tester tout le flow UI (loading → success).
- [ ] Honeypot anti-bot en place dès maintenant
- [ ] Gestion états client : idle / loading / success / error (mocké côté API mais réel côté UI)
- [ ] `TODO` explicite en commentaire dans `route.ts` pour rebrancher Resend plus tard

**À l'achat du domaine (étape suivante, voir §1.9) :**
- [ ] Choix final Resend ou SMTP
- [ ] Configuration domaine vérifié chez le provider mail
- [ ] Variables d'env complétées (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`)
- [ ] Rebrancher l'envoi réel dans `route.ts` (retirer le `TODO`)
- [ ] Test end-to-end : envoi d'un vrai mail reçu dans la boîte
- [ ] Documenter dans `README.md` la procédure d'envoi mail

### 1.6 — SEO base
- [ ] Metadata complète dans `layout.tsx` (cf. `SEO.md` §2)
- [ ] `sitemap.ts` + `robots.ts`
- [ ] JSON-LD `ProfessionalService`
- [ ] OG image générée (1200×630)
- [ ] Favicon + apple-touch-icon

### 1.7 — Polish minimal (QA bloquante)
- [ ] **QA responsive complète** pour chaque section : passer la checklist `SECTIONS.md` §10.5 à **375px / 390px / 768px / 1024px / 1440px**. Chaque section doit cocher tous les points avant validation.
- [ ] Tester sur **device réel** (au moins un iPhone et un Android Chrome) — l'émulateur ne montre pas tout (clavier qui pousse le viewport, tap delay, scroll élastique).
- [ ] Vérifier que **aucune page** ne provoque de scroll horizontal sur mobile.
- [ ] Vérifier que la **navbar mobile** (sheet plein écran) s'ouvre/ferme correctement, que les liens scrollent à la bonne section.
- [ ] **Touch targets ≥ 44px** vérifiés sur tous les CTAs, liens nav, champs form.
- [ ] **Formulaire mobile** : claviers natifs corrects (email → clavier @, tel → clavier numérique), zoom auto désactivé sur focus input (text-base = 16px minimum sur inputs).
- [ ] Lighthouse desktop ≥ 95 perf / 100 a11y / 100 SEO / 100 best-practices
- [ ] **Lighthouse mobile** ≥ 90 perf / 100 a11y / 100 SEO (le mobile est le KPI le plus dur — c'est lui qui prime).
- [ ] Test formulaire end-to-end UI (validation, états loading/success/error, honeypot). **Envoi mail réel testé plus tard, voir §1.9.**
- [ ] Pas de console warning en prod

### 1.8 — Mise en ligne (sans domaine définitif)
- [ ] Repo Git initial
- [ ] Déploiement Vercel (URL `.vercel.app` provisoire)
- [ ] Configurer `NEXT_PUBLIC_SITE_URL` dans les env vars Vercel = URL de prod du déploiement
- [ ] Vérif manuelle live
- [ ] Test formulaire end-to-end depuis le déploiement preview

### 1.9 — Achat domaine + bascule prod (peut être fait en parallèle ou plus tard)
- [ ] Acheter le domaine (`yan-dev.fr` ou variante)
- [ ] Configurer DNS chez le registrar → Vercel
- [ ] Mettre à jour `NEXT_PUBLIC_SITE_URL` avec le vrai domaine
- [ ] Redéployer (auto)
- [ ] Soumission Search Console + sitemap
- [ ] Création Google Business Profile (adresse Caen)

**Sortie attendue :** site en ligne, formulaire fonctionnel, partageable à des prospects.

---

## Phase 2 — Polish & 3D (post-MVP, sans urgence)

### 2.1 — Carrousel Three.js section Exemples
- [ ] Installer `three`, `@react-three/fiber`, `@react-three/drei`
- [ ] Composant `<ProjectsCarousel3D>` (client only, import dynamique)
- [ ] Cards de projet en 3D avec texture screenshot
- [ ] Interaction drag / scroll horizontal
- [ ] Fallback statique si WebGL indispo ou reduced-motion

### 2.2 — Animations enrichies
- [ ] Effets scroll discrets sur titres (text reveal lettre par lettre, parcimonieux)
- [ ] Curseur custom soft (à débattre — risque de paraître gadget)
- [ ] Marquee de mots-clés ou logos (peut être utile section Pourquoi)

### 2.3 — Contenu
- [ ] Ajouter 2 vrais projets dans Examples (avec mockups réels)
- [ ] Page Mentions légales (Markdown ou MDX → page dédiée `/mentions-legales`)
- [ ] Éventuelle page FAQ ou Process

### 2.4 — Analytics
- [ ] Plausible Analytics installé (ou Umami auto-hébergé)
- [ ] Tracking événements clés : clic CTA hero, scroll section tarifs, soumission form

### 2.5 — Dark mode (optionnel)
- [ ] Toggle dans navbar
- [ ] Adapter tous les tokens (déjà préparés en variables CSS)
- [ ] Tester FallingPattern et BGPattern en dark

---

## Phase 3 — Évolutions ultérieures (idées)

À discuter — pas planifié.

- **Pages SEO par ville cible** (`/site-web-paris`, `/site-web-lyon`, `/site-web-rennes`...) — c'est LA façon de ranker localement dans d'autres villes que Caen sans diluer la home. Une page = un H1 ciblé `Création de site internet à [Ville]`, un texte adapté (3-4 paragraphes), un schema.org `ProfessionalService` avec `areaServed` sur cette ville. À envisager une fois la home et la phase 2 stabilisées.
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
| Phrase d'accroche H1 | ✅ Validée |
| Zone SEO prioritaire | ✅ Caen ancrage local + maillage France |
| Email public au MVP | ✅ Placeholder `contact@yan-dev.fr` (sera vrai à l'achat du domaine) |
| Téléphone public | ❌ Non affiché au MVP |
| Resend vs Nodemailer | Reporté — formulaire UI complet mais envoi réel branché plus tard |
| Hébergement long terme (Vercel ou autre) | À valider |
| Nom de domaine final | Reporté — dev sur `.vercel.app` en attendant |
| Dark mode au MVP | Reporté Phase 2 |
| Carrousel 3D | Reporté Phase 2 |
| Analytics | Reporté Phase 2 |
| Mentions légales | Reporté Phase 2 (placeholder au MVP) |
