# SEO.md — yan-dev

> Stratégie SEO et GEO du site yan-dev.fr, après la refonte de positionnement et le passage en bilingue FR/EN.
>
> **Règle de maintenance : ce fichier ne contient pas de code.** L'ancienne version dupliquait des blocs `metadata`, `sitemap.ts` et JSON-LD qui ont divergé du code réel jusqu'à décrire un site qui n'existait plus. La spec décrit désormais l'intention et les règles ; le code est la référence pour l'implémentation, et chaque section pointe vers le fichier qui fait foi.

---

## 1. Positionnement

Le site vend **trois piliers**, dans cet ordre de largeur d'audience :

| Pilier | Ce que c'est | Tarif affiché | Page dédiée |
|---|---|---|---|
| **Site vitrine** | Site sur mesure, responsive, SEO de base, formulaire de contact | dès 490 € | `/prix-site-vitrine` |
| **Site créatif** | Direction artistique poussée, animations, expérience immersive | sur devis | à créer |
| **Produit digital** | MVP, SaaS, app web ou mobile, dashboard, intégrations IA | sur devis | à créer |

L'option **Sérénité** (30 €/mois : hébergement, domaine, maintenance, modifications mineures) est **facultative** et rattachée au pilier vitrine. Ne jamais la présenter comme obligatoire.

Deux profils de clients, qui n'entrent pas par la même porte :

1. **Commerçants, artisans, indépendants** → entrent par le local Caen et par `/site-internet/*`. Requêtes transactionnelles, sensibles au prix.
2. **TPE/PME au besoin design, et porteurs de produit** → entrent par des requêtes nationales non géolocalisées, ou par une recommandation de LLM. Sensibles à la preuve et à la qualité d'exécution.

Le H1 de la home (`Creative Developer, Website Creator & Product Builder`, validé en Phase 4) porte le positionnement, **pas** de mot-clé transactionnel. C'est assumé : la captation par requête se joue sur les H2, les pages internes et le JSON-LD, jamais en dénaturant le H1.

---

## 2. Cibles de mots-clés (trois étages)

### Étage 1 : ancrage local Caen (priorité)

Porté par les `<title>`, le JSON-LD `areaServed`, le footer et les pages `/site-internet/*`.

- `création site internet Caen`, `site vitrine Caen`, `site vitrine Calvados`
- `développeur web freelance Caen`, `créateur site web Caen`
- `site web artisan Caen`, `site internet commerçant Caen`
- Élargissement agglo et région : Hérouville-Saint-Clair, Ifs, Mondeville, Ouistreham, Bayeux, Lisieux, `développeur web Normandie`
- Par métier : `site internet boulangerie`, `site internet restaurant`, `site internet tatoueur`, etc. (7 métiers couverts)

### Étage 2 : national, hors géo

Porté par la home, `/prix-site-vitrine` et les futures pages services.

- Vitrine : `création site vitrine pas cher`, `tarif site vitrine artisan`, `prix site vitrine`, `freelance site web one page`, `site vitrine sur mesure à distance`
- Créatif : `développeur créatif freelance`, `site web animé sur mesure`, `site web design sur mesure freelance`, `agence site créatif`
- Produit : `développeur freelance MVP`, `créer un SaaS freelance`, `développeur produit digital freelance`

### Étage 3 : GEO (visibilité dans les LLM)

Être cité par ChatGPT, Claude, Perplexity et les AI Overviews quand quelqu'un cherche un prestataire. Ce qui compte n'est pas le mot-clé mais la **citabilité** :

- Des **faits vérifiables et datés** : prix de départ, ce qui est inclus, ce qui ne l'est pas, technologies utilisées, zone couverte.
- Des **réponses directes à des questions** : le format FAQ est le plus repris. `/prix-site-vitrine` en a déjà 5, les fiches métier 4 chacune.
- Des **case studies factuels** : contexte, ce qui a été construit, techno. C'est le format que les LLM citent le plus volontiers pour justifier une recommandation.
- Un **JSON-LD véridique**, cohérent avec le texte visible. Une assertion structurée contredite par la page dégrade la confiance.
- Une **entité identifiable** : mentions légales, SIRET, nom, ville. Un prestataire anonyme n'est pas recommandé.

**Interdit absolu en GEO comme en SEO :** inventer une statistique, un témoignage, un délai, un nombre de clients ou un chiffre de performance. Une seule affirmation fausse suffit à discréditer la page, et elle est reprise telle quelle par les LLM.

### Règle d'or géographique (inchangée)

Le mot-clé local (`Caen`, `Calvados`) va dans le `<title>`, le `<h1>` quand c'est naturel, le footer et le schema.org. **Le corps du texte reste agnostique géographiquement**, pour rester pertinent sur les requêtes nationales. C'est ce qui permet d'être à la fois « le dev de Caen » et « un freelance trouvable depuis partout ».

Corollaire : pas de doorway page géographique, pas de page par ville dupliquée. Les pages par ville (`/site-web-rennes`, etc.) restent hors périmètre.

---

## 3. Métadonnées

**Fichier de référence : [`src/lib/seo.ts`](src/lib/seo.ts).** Ne pas dupliquer sa logique ailleurs.

- `SITE_URL` vaut `NEXT_PUBLIC_SITE_URL` avec un fallback sur `https://yan-dev.fr` (jamais localhost, pour qu'une variable oubliée ne fasse pas fuiter des URLs locales dans le sitemap ou les canonical).
- `buildMetadata({ title, description, path, locale, routeKey?, image? })` produit title, description, canonical, hreflang, OpenGraph et Twitter. **Toute nouvelle page l'utilise**, sans exception.
- `routeKey` n'est passée **que** si la page existe dans les deux langues. Sur une page FR-only, déclarer un alternate anglais inexistant serait une erreur.
- Le `title` passe par le template `"%s | Yan-dev"` défini dans le layout du route group.
- Les deux layouts ([`src/app/(fr)/layout.tsx`](src/app/(fr)/layout.tsx), [`src/app/(en)/layout.tsx`](src/app/(en)/layout.tsx)) portent `metadataBase`, le title par défaut, les keywords, `robots: { index: true, follow: true }` et le JSON-LD global.

Règles :
- Un `<title>` unique par page, 50 à 60 caractères visés, mot-clé en tête.
- Une `description` unique par page, 140 à 160 caractères, avec une raison de cliquer.
- **Pas de `<meta name="keywords">`** ajouté aux pages : sans effet, et signal de spam.
- L'image OpenGraph est générée dynamiquement ([`src/lib/og.tsx`](src/lib/og.tsx)), une variante par langue. Pas de PNG statique.

> Piège Satori : dans `og.tsx`, tout `div` à plusieurs enfants doit porter un `display` explicite (`flex`, `contents` ou `none`), sinon le rendu part en 500 et l'aperçu social est vide.

---

## 4. Structure sémantique HTML

- **Un seul `<h1>` par page.**
- Un `<h2>` par section, `<h3>` dans les cards. Jamais de saut de niveau (pas de h2 vers h4).
- Les H2 doivent porter du vocabulaire de requête quand c'est possible sans casser le ton. Un H2 purement brandé est une occasion manquée.
- `<main id="main">` autour du contenu, après la navbar.
- `<nav aria-label="...">` sur la navbar, `<footer>` avec `<address>` autour des coordonnées.
- Les `alt` décrivent l'image (« Portrait de Yan, développeur web indépendant à Caen »). Jamais de bourrage de mots-clés.

---

## 5. Schema.org (JSON-LD)

**Fichiers de référence : [`src/lib/seo.ts`](src/lib/seo.ts) (`professionalServiceLd`) et [`src/lib/jsonld.ts`](src/lib/jsonld.ts) (`breadcrumbLd`, `faqLd`, `itemListLd`, `serviceLd`). Injection via [`src/components/seo/JsonLd.tsx`](src/components/seo/JsonLd.tsx).**

### Global (les deux layouts)

`ProfessionalService`, avec :
- `areaServed` en cascade : Caen, 6 villes de l'agglo, Calvados, Normandie, France. Le double signal ville plus pays est délibéré : Caen établit l'ancrage local, France ouvre les requêtes nationales. Google interprète bien ce couple pour un service livrable à distance.
- `address` : Caen, Calvados, 14000, FR. **Pas de rue, pas de téléphone** (décision Yan). Le SIRET vit sur la page mentions légales.
- `makesOffer` : les 4 offres. Le site vitrine utilise `minPrice: 490` et non `price`, parce que 490 € est un point de départ ; l'annoncer comme prix ferme serait faux. L'option Sérénité utilise une `UnitPriceSpecification` mensuelle.
- `availableLanguage: ["fr", "en"]` dans les deux langues : c'est une propriété de l'entreprise, pas de la page.

### Par type de page

| Page | Types injectés |
|---|---|
| Home FR et EN | `ProfessionalService` (layout) uniquement |
| `/prix-site-vitrine`, `/en/pricing` | `BreadcrumbList` + `Service` + `FAQPage` |
| `/site-internet` | `BreadcrumbList` + `Service` + `ItemList` |
| `/site-internet/[metier]` | `BreadcrumbList` + `Service` + `FAQPage` |

### Règle de véracité

Chaque assertion structurée doit être vraie et cohérente avec le texte visible de la page. Un `FAQPage` dont les questions n'apparaissent pas à l'écran est une violation des consignes Google.

---

## 6. Sitemap et robots

**Fichiers de référence : [`src/app/sitemap.ts`](src/app/sitemap.ts), [`src/app/robots.ts`](src/app/robots.ts).**

- Le sitemap liste les 12 URLs actuelles, avec les alternates `xhtml:link` en URLs absolues sur les 4 entrées bilingues. Les pages FR-only n'en déclarent aucun.
- Crawl ouvert (`allow: "/"`), site en `index: true` sur le domaine de prod.
- **Toute nouvelle route doit être ajoutée au sitemap dans le même commit que sa création.** C'est l'oubli le plus fréquent.
- `/mentions-legales` reste à créer (le TODO est dans le fichier).

---

## 7. Bilingue FR / EN (hreflang)

### Périmètre, volontairement fermé

| Page | FR | EN |
|---|---|---|
| Home | `/` | `/en` |
| Prix | `/prix-site-vitrine` | `/en/pricing` |
| Index métiers | `/site-internet` | pas de version EN |
| Fiches métier | `/site-internet/{slug}` | pas de version EN |
| Case studies, pages services | à créer | pas de version EN |

**L'anglais est un confort de lecture, pas un canal SEO.** On ne cible aucun mot-clé anglais et on n'étend pas le périmètre EN. Les pages métier ciblent des requêtes locales françaises : les traduire produirait des pages sans volume, en doublon de maintenance, et diluerait le maillage interne. C'est un choix, pas un oubli.

Le français reste servi à la racine : aucune URL déjà indexée n'a bougé, la propriété Search Console `yan-dev.fr` suit exactement les mêmes adresses.

### Implémentation

- Deux **root layouts** via les route groups `src/app/(fr)/` et `src/app/(en)/`, ce qui donne un `<html lang>` correct par langue sans middleware ni rendu dynamique. Le groupe est transparent dans l'URL.
- [`src/lib/routes.ts`](src/lib/routes.ts) porte la table des chemins par langue et les helpers `route()`, `anchorHref()`, `languageAlternates()`, `counterpartPath()`.
- Jamais de `/fr/` dans une URL. Le français vit à la racine.

### Règles hreflang

- Trois déclarations sur chaque page bilingue : `fr-FR`, `en`, et `x-default` pointant sur le **français**.
- Les hreflang doivent être **réciproques**. Google ignore silencieusement les paires qui ne le sont pas.
- Les pages FR-only n'en déclarent aucune.
- Le sélecteur de langue doit rester **crawlable** : de vraies balises `<a href>` avec `hrefLang` et `lang`. Aucune redirection automatique par IP ou `Accept-Language`, qui empêcherait Googlebot de voir les deux versions.
- `counterpartPath()` replie sur la home quand la page n'existe pas dans l'autre langue, plutôt que de produire un lien mort.

---

## 8. Performance (Core Web Vitals)

Objectifs : **LCP ≤ 2,5 s**, **INP < 200 ms**, **CLS < 0,1**.

- `next/image` partout, `priority` uniquement sur l'image du hero.
- Fontes en `display: swap`.
- Réserver les dimensions (images, cards) pour éviter tout décalage.
- Les animations Motion respectent `prefers-reduced-motion` et ne bloquent pas le thread au scroll.
- Pas de JS tiers (analytics, chat, tag manager).
- Ne jamais consigner un chiffre de performance ici sans l'avoir mesuré.

---

## 9. Contenu

### Ce qui manque aujourd'hui (constats, à traiter)

- `/site-internet` fait environ 130 mots : c'est le principal risque de thin content du site.
- Les 7 fiches métier partagent un boilerplate, et leur FAQ Q4 (« Je ne suis pas à Caen ») est identique mot pour mot sur les 7 pages.
- Les piliers créatif et produit n'ont aucune page dédiée, et les projets (BeerBee, Madman Tattoo, Atelier Lumé, L'océan, Lumio-coffee, Le Cerf Doré, CleanAI, BetaWall) n'ont ni page ni contenu au delà d'un titre et d'un secteur.

### Règles de rédaction

- **Tout texte visible est d'abord écrit dans [`CONTENT.md`](CONTENT.md) (ou [`CONTENT.en.md`](CONTENT.en.md)) et validé par Yan**, puis porté dans `src/content/`. Jamais de wording improvisé dans le JSX.
- Interdit : produire N pages où seul le nom du métier change. Chaque page doit apporter du contenu réellement spécifique.
- Interdit : faux témoignages, fausses statistiques, faux logos clients, délais de livraison annoncés (contrainte Yan), mention de propriété du site (contrainte Yan).
- Le maillage interne est un livrable, pas un effet de bord : chaque nouvelle page doit être atteignable depuis au moins un lien contextuel.

---

## 10. Hors périmètre

Ne pas faire sans décision explicite de Yan :

- Blog ou CMS (hors scope [`CLAUDE.md`](CLAUDE.md) §5).
- Pages par ville (`/site-web-rennes`, `/site-web-paris`…).
- Une troisième langue, ou l'extension du périmètre EN.
- Analytics tiers (Plausible, GA, Umami).
- Adresse postale complète ou numéro de téléphone dans le NAP.
- Acquisition de liens : aucun PBN, aucun faux annuaire, aucun faux avis, aucun outreach de masse. Seuls les annuaires légitimes et la fiche Google Business.

---

## 11. Suivi

- **Search Console** : la propriété `yan-dev.fr` est active depuis plusieurs mois. Ne pas recommander sa création. Soumettre le sitemap après chaque ajout de routes et surveiller la couverture d'indexation.
- **Google Business Profile** : reste à créer. C'est le levier local le plus fort encore inexploité.
- Vérifier après chaque déploiement qu'aucune URL déjà indexée ne renvoie autre chose qu'un 200.

---

## 12. Checklist avant déploiement

- [ ] `<h1>` unique sur chaque page, hiérarchie Hn sans saut.
- [ ] `<title>` et `description` uniques, dans les limites de longueur.
- [ ] Canonical présent et absolu sur chaque page.
- [ ] Hreflang réciproques sur les 4 pages bilingues, aucun sur les pages FR-only.
- [ ] Toutes les routes présentes dans le sitemap, aucune 404.
- [ ] JSON-LD validé au Rich Results Test, et chaque assertion relue pour véracité.
- [ ] Aucune URL précédemment indexée cassée.
- [ ] Lighthouse desktop > 95, mobile > 90.
- [ ] Aucune donnée inventée dans le contenu publié.
