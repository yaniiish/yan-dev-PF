# SEO.md — yan-dev

> Stratégie SEO **local** pour positionner yan-dev sur les requêtes des petits commerçants/artisans cherchant un développeur de site web, et plus largement sur "site vitrine + ville/région".

---

## 1. Cibles de mots-clés (stratégie deux étages)

### Principe
Tu es basé à **Caen** mais tu **opères partout en France** (un site vitrine se livre à distance). On ne peut pas raisonnablement "ranker" sur 100 villes en page d'accueil sans diluer. La stratégie est donc :

1. **Ancrage local fort à Caen** → la page d'accueil + le schema.org + la fiche Google Business te font sortir sur les recherches `Caen` / `Calvados`.
2. **Présence nationale via mots-clés non-géo + "à distance"** → tu sors aussi sur les recherches sans ville quand la requête évoque le besoin métier.
3. **Pages locales dédiées (Phase 2/3)** → si tu veux ranker dans d'autres villes (Lille, Paris, Rennes…), il faudra créer une **page par ville** (`/site-web-rennes`, `/site-web-paris`…). On ne le fait **pas au MVP** mais l'architecture le permet.

### Primaires (ancrage Caen — PRIORITÉ)
- `création site internet Caen`
- `site vitrine Caen`
- `site vitrine Calvados`
- `développeur web freelance Caen`
- `créateur site web Caen`
- `site web artisan Caen`
- `site internet commerçant Caen`

### Secondaires (élargissement géo agglo / Normandie)
- `site internet Hérouville-Saint-Clair`
- `site web Ifs`, `site internet Mondeville`, `Ouistreham`, `Bayeux`, `Lisieux`
- `développeur web Normandie`

### Nationales (hors géo — pour être trouvé partout en France)
- `création site vitrine pas cher`
- `freelance site web one page`
- `développeur web freelance France`
- `site vitrine sur mesure à distance`
- `créer un site internet pour son commerce`
- `tarif site vitrine artisan`
- `site web design sur mesure`

### Audience premium (sans géo, profil plus exigeant)
- `développeur web freelance site premium`
- `site web design sur mesure freelance`

> Règle d'or : on met le **mot-clé local "Caen / Calvados" dans le `<title>`, le `<h1>` (subtilement) et le schema.org**, mais on garde le reste du texte du site **agnostique géographiquement** pour ranker sur les requêtes nationales. C'est ce qui te permet d'être à la fois "le dev de Caen" et "un dev freelance trouvable depuis n'importe où en France".

---

## 2. Métadonnées globales (App Router)

Dans `src/app/layout.tsx`, exporter un objet `metadata`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    // Caen dans le title pour le SEO local fort, mais on laisse "freelance" pour la captation nationale
    default: "Yan-dev — Création de sites vitrines modernes | Freelance à Caen",
    template: "%s — Yan-dev",
  },
  description:
    "Studio web freelance basé à Caen, opérant partout en France. Sites vitrines modernes et rapides pour artisans, commerçants et indépendants — du site simple au site premium sur mesure. À partir de 490 €.",
  keywords: [
    "création site internet Caen",
    "site vitrine Caen",
    "développeur web freelance",
    "site vitrine pas cher",
    "freelance site web one page",
    "site web artisan",
    "site internet commerçant",
  ],
  authors: [{ name: "Yan", url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000" }],
  creator: "Yan",
  publisher: "Yan-dev",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    siteName: "Yan-dev",
    title: "Yan-dev — Sites vitrines modernes | Freelance à Caen",
    description:
      "Sites vitrines modernes pour artisans, commerçants et indépendants. Basé à Caen, j'opère partout en France. SEO local inclus. À partir de 490 €.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Yan-dev — studio web freelance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yan-dev — Sites vitrines modernes",
    description: "Sites vitrines clairs et rapides pour commerçants et indépendants. Freelance à Caen.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};
```

> Note : tant qu'on est sur `.vercel.app`, **forcer `robots: { index: false, follow: false }`** (voir `ARCHITECTURE.md` §3.7).

### À préparer avant prod
- [ ] OG image `1200×630` dans `/public/og-image.png` (fond clair, logo texte `Yan-dev`, tagline courte).
- [ ] Favicon (`/public/favicon.ico` + variantes 32, 192, 512).
- [ ] `apple-touch-icon` 180×180.

---

## 3. Structure sémantique HTML

- **Un seul `<h1>`** sur la page : dans le hero, avec la phrase d'accroche.
- Chaque section a un `<h2>` (titre de section).
- Cards dans une section : `<h3>`.
- Pas de skip dans la hiérarchie (jamais h2 → h4).
- `<main id="main">` autour de tout le contenu, après navbar.
- `<nav aria-label="Navigation principale">` pour la navbar.
- `<footer>` propre, avec `<address>` autour des coordonnées de contact si présentes.

---

## 4. Schema.org (JSON-LD)

À injecter dans `layout.tsx` ou directement dans `page.tsx` via `<script type="application/ld+json">`.

### LocalBusiness / ProfessionalService

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Yan-dev",
  "description": "Studio web freelance basé à Caen. Sites vitrines modernes pour artisans, commerçants et indépendants partout en France.",
  "url": "https://yan-dev.fr",
  "image": "https://yan-dev.fr/og-image.png",
  "priceRange": "€€",
  "areaServed": [
    { "@type": "City", "name": "Caen" },
    { "@type": "City", "name": "Hérouville-Saint-Clair" },
    { "@type": "City", "name": "Ifs" },
    { "@type": "City", "name": "Mondeville" },
    { "@type": "City", "name": "Ouistreham" },
    { "@type": "City", "name": "Bayeux" },
    { "@type": "City", "name": "Lisieux" },
    { "@type": "AdministrativeArea", "name": "Calvados" },
    { "@type": "AdministrativeArea", "name": "Normandie" },
    { "@type": "Country", "name": "France" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Caen",
    "addressRegion": "Calvados",
    "postalCode": "14000",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contact@yan-dev.fr",
    "availableLanguage": ["fr"],
    "areaServed": "FR"
  },
  "founder": { "@type": "Person", "name": "Yan" },
  "makesOffer": [
    {
      "@type": "Offer",
      "name": "Site vitrine",
      "price": "490",
      "priceCurrency": "EUR",
      "description": "Site one-page sur mesure, responsive, SEO local inclus."
    },
    {
      "@type": "Offer",
      "name": "Hébergement et maintenance",
      "price": "30",
      "priceCurrency": "EUR",
      "description": "Mensuel — hébergement, mises à jour et modifications mineures."
    }
  ]
}
```

> Pourquoi à la fois Caen (ville précise) **ET** France (pays) dans `areaServed` ? Caen établit l'ancrage local pour ranker en SEO local. France ouvre la porte aux requêtes nationales sans dégrader le local. Google interprète très bien ce double signal pour un service livrable à distance.
>
> [À VALIDER] : code postal exact (14000 par défaut), email final (placeholder `contact@yan-dev.fr` au MVP).

### FAQPage (optionnel, phase 2)
À ajouter si on crée une section FAQ : "Combien coûte un site vitrine ?", "En combien de temps il est en ligne ?", etc.

---

## 5. Sitemap & robots

### `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";

// IMPORTANT : remplacer SITE_URL par le vrai domaine quand acheté.
// Pendant le dev, utiliser une variable d'env pour pouvoir tester en local sans casser.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yan-dev.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    // ajouter mentions légales quand créées
  ];
}
```

### `src/app/robots.ts`

```ts
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yan-dev.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

> **Tant que le domaine n'est pas acheté :** mettre `NEXT_PUBLIC_SITE_URL=http://localhost:3000` dans `.env.local`. En preview Vercel, la variable sera l'URL `.vercel.app` automatiquement assignée.

---

## 5 bis. Bilingue FR / EN (hreflang)

### Périmètre

Le site est bilingue sur un périmètre **volontairement fermé** :

| Page | FR | EN |
|---|---|---|
| Home | `/` | `/en` |
| Prix | `/prix-site-vitrine` | `/en/pricing` |
| Index métiers | `/site-internet` | pas de version EN |
| Fiches métier | `/site-internet/{slug}` | pas de version EN |

Les pages métier ciblent des requêtes locales françaises (« site internet boulangerie
Caen »). Les traduire produirait des pages sans volume de recherche, en doublon de
maintenance, et diluerait le maillage interne. C'est un choix, pas un oubli.

Le français reste servi à la racine : **aucune URL déjà indexée n'a bougé**, la propriété
Search Console `yan-dev.fr` continue de suivre exactement les mêmes adresses.

### Implémentation

- Deux **root layouts** via les route groups `src/app/(fr)/` et `src/app/(en)/`. C'est ce
  qui permet un `<html lang>` correct par langue sans middleware ni rendu dynamique. Le
  groupe est transparent dans l'URL.
- `src/lib/routes.ts` porte la table des chemins par langue et les helpers
  `route()`, `anchorHref()`, `languageAlternates()`, `counterpartPath()`.
- `buildMetadata()` (`src/lib/seo.ts`) prend une `locale` et une `routeKey` optionnelle.
  La `routeKey` déclenche les `alternates.languages` : **on ne la passe pas** sur les
  pages FR-only, déclarer un alternate anglais inexistant serait une erreur.

### Règles hreflang

- Trois déclarations sur chaque page bilingue : `fr-FR`, `en`, et `x-default` qui pointe
  sur le **français** (langue par défaut du site).
- Les hreflang doivent être **réciproques** : si `/` déclare `/en`, `/en` doit déclarer
  `/`. Google ignore silencieusement les paires non réciproques.
- Les pages FR-only n'en déclarent aucun.
- Le sitemap porte les mêmes alternates en `xhtml:link` sur les 4 entrées bilingues.

### JSON-LD

`professionalServiceLd(locale)` traduit `description` et les 4 `makesOffer`.
`contactPoint.availableLanguage` vaut `["fr", "en"]` dans les deux langues : c'est une
propriété de l'entreprise, pas de la page.

### Image OpenGraph

Une variante par langue : `/opengraph-image` (FR) et `/en/opengraph-image` (EN), rendu
partagé dans `src/lib/og.tsx`.

> Attention Satori : tout `div` à plusieurs enfants doit porter un `display` explicite
> (`flex`, `contents` ou `none`), sinon le rendu échoue en 500 et l'aperçu social est vide.


---

## 6. Performance (Core Web Vitals)

Le SEO local moderne se joue beaucoup sur la perf. Objectifs :

- **LCP** < 2.5s — le hero doit afficher rapidement, l'avatar en `priority`.
- **CLS** < 0.1 — réserver les tailles (image avatar, cards), pas de layout shift.
- **INP** < 200ms — pas d'animations bloquantes au scroll.

### Règles
- `next/image` partout, `priority` uniquement sur l'avatar du hero.
- Fontes en `display: swap` (par défaut `next/font`).
- `FallingPattern` : composant `client`, mais wrappé dans `<Suspense>` ou import dynamique si nécessaire pour ne pas bloquer le LCP.
- Pas de JS tiers (analytics, chat) au MVP.

---

## 7. Contenu textuel et SEO

- Le **H1** doit contenir au moins un mot-clé clé : "site", "moderne" et un mot ancré activité ("artisan", "commerçant"). Cf. propositions dans `CONTENT.md`.
- Le **H2** de la section Pourquoi pourrait être reformulé pour intégrer "site internet" / "visible Google" — à voir si on garde la version actuelle ou si on l'optimise.
- Les **alt** d'images doivent décrire ("Avatar de Yan, développeur web") et pas être bourrés de mots-clés.
- Éviter le keyword stuffing. Une intégration naturelle suffit.

---

## 8. Tracking & monitoring (post-launch)

À mettre en place **après** validation MVP :
- Google Search Console : déclarer le site, soumettre le sitemap.
- Plausible Analytics ou Umami (RGPD-friendly, sans cookie banner si auto-hébergé). Pas de Google Analytics.
- Google Business Profile : créer une fiche pro Yan-dev avec adresse, zone, services, lien vers le site.

---

## 9. Checklist SEO de mise en ligne

### Au MVP (sans domaine final)
- [ ] Tous les `<h1>`, `<h2>` cohérents.
- [ ] `metadata` exporté et complet dans `layout.tsx`.
- [ ] OG image générée et placée.
- [ ] Favicon en place.
- [ ] `sitemap.ts` + `robots.ts` actifs (utilisent `NEXT_PUBLIC_SITE_URL`).
- [ ] JSON-LD `ProfessionalService` injecté (zone Caen/Calvados).
- [ ] Pas de `noindex` traînant (mais sur `.vercel.app`, **mettre `noindex` tant que le domaine final n'est pas en place** pour éviter qu'un sous-domaine random soit indexé).
- [ ] Lighthouse desktop > 95 sur les 4 axes.
- [ ] Lighthouse mobile > 90.

### À l'achat du domaine (étape suivante)
- [ ] Mettre à jour `NEXT_PUBLIC_SITE_URL` en prod Vercel.
- [ ] Retirer le `noindex` global.
- [ ] Vérifier toutes les URLs absolues (OG, canonical, sitemap).
- [ ] Search Console connectée + sitemap soumis.
- [ ] Fiche Google Business créée (adresse Caen).
