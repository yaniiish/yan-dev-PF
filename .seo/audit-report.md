# Audit SEO forensique — yan-dev.fr

**Date de l'audit :** 16 août 2026
**Périmètre :** repo `/workspaces/yan-dev-PF` + production `https://yan-dev.fr`
**Méthode :** lecture intégrale du code source SEO + crawl live des 12 URLs (`curl`), extraction du `<head>`, du DOM servi (payload RSC exclu), du JSON-LD réel, du graphe de liens internes, et mesure des octets réellement transférés.
**Mode :** lecture seule, aucun fichier de code modifié.

> **Note d'honnêteté méthodologique.** Aucun accès à Search Console, CrUX, ni runner Lighthouse. Aucun chiffre de trafic, de position, de volume de recherche ou de Core Web Vitals n'apparaît dans ce rapport. Tout ce qui est chiffré ci-dessous a été mesuré par requête HTTP réelle ou compté dans le code. Les points non mesurables sont signalés explicitement.

---

## 0. État de référence (constaté, avant toute modification)

### 0.1 Socle technique

| Élément | Constat |
|---|---|
| Framework | Next.js `16.2.6`, App Router, React `19.2.4`, TypeScript |
| Rendu | Statique prérendu (`x-nextjs-prerender: 1`, `x-vercel-cache: HIT` sur `/`) |
| Router | App Router, deux **root layouts** via route groups `(fr)` et `(en)` |
| Middleware | Aucun |
| `next.config.ts` | **Vide**, aucun `redirects()`, `rewrites()`, ni `images` custom |
| Hébergement | Vercel (`server: Vercel`, région `lhr1`) |
| Animations | `motion` 12.40.0 |
| JS tiers | **Aucun** (ni analytics, ni tag manager, ni chat), conforme SEO.md §8 et §10 |

### 0.2 Les 12 URLs publiques, toutes en 200

| # | URL | HTTP | Mots `<main>` | Titre (car.) | Desc (car.) | hreflang |
|---|---|---|---|---|---|---|
| 1 | `/` | 200 | 691 | 64 | 202 | 3 |
| 2 | `/en` | 200 | 683 | 67 | 212 | 3 |
| 3 | `/prix-site-vitrine` | 200 | 441 | 63 | 189 | 3 |
| 4 | `/en/pricing` | 200 | 430 | 58 | 187 | 3 |
| 5 | `/site-internet` | 200 | **136** | **75** | 179 | 0 |
| 6 | `/site-internet/coffee-shop` | 200 | 355 | 63 | 176 | 0 |
| 7 | `/site-internet/restaurant` | 200 | 329 | 62 | 198 | 0 |
| 8 | `/site-internet/boulangerie` | 200 | 306 | 63 | 166 | 0 |
| 9 | `/site-internet/architecte-interieur` | 200 | 361 | **74** | 182 | 0 |
| 10 | `/site-internet/bistrot-brasserie` | 200 | 345 | **72** | 165 | 0 |
| 11 | `/site-internet/tatoueur` | 200 | 370 | 60 | 184 | 0 |
| 12 | `/site-internet/brasserie-artisanale` | 200 | 365 | **72** | 174 | 0 |

### 0.3 Ce qui a été vérifié et qui est CORRECT

- **Canonical** : présente, absolue, auto-référente sur les 12 URLs. Aucune canonical croisée, aucune vers un autre host.
- **Hreflang** : exactement 3 balises (`fr-FR`, `en`, `x-default` vers FR) sur les 4 URLs bilingues, **réciproques**, et **zéro** sur les 8 URLs FR-only. Conforme à SEO.md §7 au caractère près.
- **Trailing slash** : `/x/` vers **308** vers `/x`, cohérent sur tous les chemins testés. Aucune incohérence.
- **404 réels, pas de soft 404** : `dynamicParams = false` + `generateStaticParams` (`src/app/(fr)/site-internet/[metier]/page.tsx:33-37`), donc `/site-internet/plombier` renvoie un vrai 404 avec `noindex`. Idem `/pricing`, `/fr`, `/en/prix-site-vitrine`, `/Prix-Site-Vitrine`.
- **robots.txt** : 200, crawl ouvert, sitemap déclaré.
- **sitemap.xml** : 200, exactement les 12 URLs, `xhtml:link` absolus sur les 4 entrées bilingues uniquement. Zéro URL manquante, zéro URL fantôme.
- **Aucun `x-robots-tag`** sur aucune URL testée. `robots: index, follow` en meta sur les 12.
- **Zéro page orpheline, zéro lien interne cassé.** Chaque fiche métier reçoit 7 liens entrants, `/site-internet` en reçoit 9, `/prix-site-vitrine` 10.
- **11 liens externes, tous en 200.**
- **Un seul `<h1>` par page** sur les 12, aucun saut de niveau Hn.
- **`<html lang>`** correct par route group.
- **Images** : toutes via `next/image`, `width`/`height` déclarés, donc pas de CLS d'origine image.
- **Fontes** : `next/font` auto-hébergé, `display: swap` sur les 3 familles. Zéro `preconnect`, zéro feuille de style externe, rien à préconnecter.
- **Alt** : descriptifs sur les images de contenu, `alt=""` + `aria-hidden` sur les décoratives.
- **FR vs EN réellement distincts** : similarité `/` vs `/en` = **10,5 %**, `/prix-site-vitrine` vs `/en/pricing` = **4,6 %**. Aucun risque de duplication inter-langues.
- **Landmarks** : `<main id="main">`, `<nav aria-label>` x2, `<header>`, `<footer>`, skip link présent.
- **`yan-dev.vercel.app` n'est PAS un alias de ce projet.** Il répond 200 mais sert le site d'un tiers. Aucun risque de duplication de ce côté.

---

## P0 — Bloque l'indexation, duplique, ou fait courir un risque de migration

### P0-1 — La redirection `www` vers l'apex est en **307 (temporaire)**, pas en 301/308

**URLs concernées :** `https://www.yan-dev.fr/*` (tout le host)
**Fichiers :** aucun. Configuration de domaine Vercel, `next.config.ts` étant vide.

**Preuve constatée :**

```
$ curl -sI https://www.yan-dev.fr
HTTP/2 307
location: https://yan-dev.fr/

$ curl -sI https://www.yan-dev.fr/prix-site-vitrine
HTTP/2 307
location: https://yan-dev.fr/prix-site-vitrine

$ curl -sIL http://www.yan-dev.fr/prix-site-vitrine
HTTP/1.0 308 Permanent Redirect  vers https://www.yan-dev.fr/prix-site-vitrine
HTTP/2 307                        vers https://yan-dev.fr/prix-site-vitrine
HTTP/2 200
```

Les autres variantes sont correctes : `http://yan-dev.fr` vers **308** vers `https://yan-dev.fr/`. HSTS actif (`max-age=63072000`).

**Analyse.** Un 307 signale à Google que la ressource est *temporairement* ailleurs et que l'URL source reste la référence. C'est l'inverse du signal de consolidation recherché : deux hosts peuvent coexister dans l'index.

Deux facteurs atténuent le risque :
1. La redirection **préserve le chemin** (vérifié sur deux chemins profonds), donc aucune URL indexée ne se perd.
2. Chaque page porte une **canonical absolue auto-référente vers l'apex**, ce qui suffit dans la plupart des cas.

Le risque résiduel reste réel : la canonical est un signal, la redirection permanente est une directive. Et le chemin HTTP vers www vers apex fait **deux sauts** au lieu d'un.

**Correction recommandée.** Dashboard Vercel, projet, Settings, Domains : déclarer `yan-dev.fr` comme **Primary Domain** et laisser Vercel générer la redirection permanente (308) depuis `www.yan-dev.fr`. Ne **pas** ajouter de `redirects()` dans `next.config.ts` pour ça : la redirection plateforme s'exécute avant la fonction, elle est plus rapide et ne peut pas entrer en conflit avec le routage App Router.

**Risque du changement : très faible.** Le chemin est déjà préservé, un 308 est une stricte amélioration. Vérification après coup : `curl -sI https://www.yan-dev.fr/site-internet/restaurant` doit renvoyer 308, et un seul saut depuis HTTP.

---

## P1 — Problème SEO majeur

### P1-1 — Les réponses de FAQ sont **absentes du DOM** alors que le JSON-LD `FAQPage` les affirme

**URLs concernées :** 9 des 12, soit `/prix-site-vitrine`, `/en/pricing` et les 7 fiches métier.
**Fichier :** `src/components/seo/Faq.tsx`

**Preuve constatée.** Le composant est un accordéon client dont l'état initial est fermé :

```tsx
// src/components/seo/Faq.tsx:16
const [openIndex, setOpenIndex] = useState<number>(-1);
```

et le paragraphe de réponse n'est **monté** que si l'item est ouvert (`:69-93`). Ce n'est pas un masquage CSS : le nœud n'existe pas.

Recherche de la réponse « Oui. Je travaille à distance partout en France, le site se livre sans déplacement. » dans le HTML servi de `/site-internet/restaurant` : la chaîne apparaît **uniquement** dans le `<script type="application/ld+json">` du `FAQPage` et dans le payload RSC. Aucune occurrence dans le balisage rendu. Aucun élément `<details>` sur la page.

Conséquence mesurable : les 329 mots visibles de `/site-internet/restaurant` contiennent **zéro mot de réponse de FAQ**. Sur les 7 fiches, cela représente 120 à 160 mots par page qui n'existent pas dans le DOM.

**Analyse.** Google exige que le contenu balisé en `FAQPage` soit visible sur la page. Ici le balisage affirme des questions-réponses que ni un crawler brut, ni un crawler avec rendu JS (qui ne clique pas) ne peut trouver. C'est le cas d'école du décalage entre données structurées et contenu, que SEO.md §5 nomme « règle de véracité ».

L'impact GEO est au moins aussi lourd : le format FAQ est, d'après SEO.md §3, le plus repris par les LLM. La partie la plus citable de ces 9 pages n'existe que dans un blob JSON-LD.

**Correction recommandée.** Rendre toutes les réponses dans le DOM et ne replier que visuellement :
- **(a)** Garder le pattern `button` + `region` (l'a11y est déjà correcte, `aria-expanded`/`aria-controls` présents) et remplacer le montage conditionnel par un repli CSS : `grid-template-rows: 0fr` vers `1fr`, ou `max-height` + `overflow: hidden`.
- **(b)** `<details>/<summary>` natif. Plus simple, mais change la sémantique et contraint l'animation.

L'option (a) est la plus sûre : elle ne touche ni le JSON-LD, ni l'a11y, ni les URLs.

**Risque du changement : faible mais non nul.** Le contenu replié doit rester inaccessible au focus quand il est fermé (`inert` ou `visibility: hidden` en fin de transition), sinon on crée un piège de tabulation. Vérifier que l'animation de hauteur avec Motion ne réintroduit pas de CLS au premier rendu. Aucun impact sur les URLs.

---

### P1-2 — La metadata globale, la description JSON-LD de l'entité et l'image OG vendent encore l'ANCIEN positionnement

**URLs concernées :** les **12** (le `ProfessionalService` est injecté dans les deux root layouts).

| Fichier | Lignes | Contenu périmé |
|---|---|---|
| `src/app/(fr)/layout.tsx` | 23-28 | `TITLE_DEFAULT`, `DESCRIPTION`, `OG_DESCRIPTION` |
| `src/app/(en)/layout.tsx` | 22-27 | idem EN |
| `src/lib/seo.ts` | 33-34 | description FR du `ProfessionalService` |
| `src/lib/seo.ts` | 59-60 | description EN du `ProfessionalService` |
| `src/lib/og.tsx` | 25-31 | copy FR de l'image OpenGraph |
| `src/lib/og.tsx` | 34-40 | copy EN de l'image OpenGraph |
| `src/content/site.ts` | 44-46, 64-66 | `tagline` + `description` (code mort, voir P3-2) |

**Preuve constatée en production.** Sur `/` :

- `<title>` = `Yan-dev : création de sites vitrines modernes | Freelance à Caen`
- `<meta name="description">` = `Studio web freelance basé à Caen, opérant partout en France. Sites vitrines modernes et rapides pour artisans, commerçants et indépendants : du site simple au site premium sur mesure. À partir de 490 €.`
- `<h1>` = `Creative Developer, Website Creator & Product Builder`

Et dans le JSON-LD servi sur **les 12 URLs** :

```json
"@type": "ProfessionalService",
"description": "Studio web freelance basé à Caen. Sites vitrines modernes pour artisans, commerçants et indépendants partout en France."
```

Ce même objet contient pourtant un `makesOffer` à 4 entrées incluant `Site créatif` et `Produit digital`. **L'objet se contredit lui-même.**

L'image OpenGraph affiche en kicker `01 / Studio web indépendant` et en accroche `Sites vitrines pour artisans, commerçants et indépendants.`

**Point important, vérifié.** Le texte **visible** de `<main>` sur `/` et `/en` ne contient **aucune** de ces formulations périmées (recherche de `Studio web indépendant`, `Independent web studio`, `site premium`, `artisans, commerçants` : zéro occurrence). Le décalage est **strictement confiné au `<head>`, au JSON-LD et à l'image sociale**. La copy visible est entièrement à jour.

**Conséquences.**
1. Le snippet Google promet un studio de sites vitrines pour artisans ; le visiteur découvre un « Creative Developer & Product Builder ».
2. Pour le GEO : la description de l'entité est le premier élément qu'un LLM lit pour se forger un résumé. Il apprend aujourd'hui, depuis une source structurée faisant autorité, un positionnement à deux piliers dont un n'existe plus.
3. Le partage social affiche une carte hors sujet.

**Correction recommandée.** Réécrire les 6 emplacements dans le même commit, autour des 3 piliers. Contraintes :
- Le `<title>` par défaut garde l'ancrage `Caen` (SEO.md §2).
- Ne pas dénaturer le H1, il est validé (SEO.md §1).
- Écrire d'abord dans `CONTENT.md` / `CONTENT.en.md`, puis porter (SEO.md §9).
- La description du `ProfessionalService` doit être cohérente avec son propre `makesOffer`.

**Risque : faible techniquement, réel côté SERP.** Changer le `<title>` de la home fait fluctuer les positions le temps que Google réévalue. Coût transitoire assumé. Ne pas toucher aux `<title>` des 7 fiches métier dans le même mouvement : ils sont alignés sur des requêtes locales toujours valides.

---

### P1-3 — Le `Service` JSON-LD annonce **490 € comme prix ferme** sur 8 URLs

**URLs concernées :** `/site-internet` + les 7 fiches métier.
**Fichiers :** `src/lib/jsonld.ts:83-92`, appelé avec `price: "490"` depuis `src/app/(fr)/site-internet/page.tsx:48` et `src/app/(fr)/site-internet/[metier]/page.tsx:96`

**Preuve constatée.** JSON-LD servi sur `/site-internet/restaurant` :

```json
"offers": { "@type": "Offer", "price": "490", "priceCurrency": "EUR", "url": "…" }
```

alors que sur la **même page**, le texte visible dit « À partir de 490 €, selon le périmètre du projet. »

Et l'autre bloc JSON-LD de la même page fait, lui, la chose correcte :

```json
"priceSpecification": { "@type": "PriceSpecification", "minPrice": "490", "priceCurrency": "EUR" }
```

avec ce commentaire dans `src/lib/seo.ts:139-140` : « `minPrice` et non `price` : le tarif est un point de départ, pas un montant ferme. Annoncer 490 € comme prix fixe serait faux. »

**Analyse.** Le code énonce la règle puis la viole dans l'autre helper. En schema.org, `Offer.price` désigne le prix, pas un plancher. Assertion structurée fausse, contredite par le texte visible, ce que SEO.md §5 interdit. Pour le GEO c'est le pire cas : un LLM citera « 490 € » comme un tarif ferme.

**Correction recommandée.** Dans `src/lib/jsonld.ts`, aligner `serviceLd` sur `professionalServiceLd` : remplacer `price` par un `priceSpecification` avec `minPrice`. Un seul point de modification couvre les 8 URLs.

**Risque : faible.** Si un rich result affichait « 490 € », il deviendra « à partir de » ou disparaîtra. Comportement souhaité.

---

### P1-4 — L'option Sérénité est présentée comme **acquise** sur 2 fiches métier, y compris dans les données structurées

**URLs concernées :** `/site-internet/restaurant`, `/site-internet/bistrot-brasserie`.

| Fichier | Ligne | Texte |
|---|---|---|
| `src/content/metiers.ts` | **193** | « la mise à jour de la carte est comprise dans l'abonnement de 30 €/mois » (enjeu restaurant) |
| `src/content/metiers.ts` | **221** | « Oui. La mise à jour de votre carte est comprise dans l'abonnement de 30 €/mois » (FAQ restaurant) |
| `src/content/metiers.ts` | **395** | idem (enjeu bistrot) |
| `src/content/metiers.ts` | **423** | idem (FAQ bistrot) |
| `CONTENT.md` | 417, 421, 469, 473 | mêmes phrases |

**Contradictions internes :**
- `src/content/metiers.ts:149` et les 6 autres réponses prix : « **Une option de suivi** à 30 €/mois »
- `src/content/pricing.ts:193` : « Elle est **facultative** et résiliable à tout moment. »
- `src/lib/seo.ts:43-44` : « Suivi mensuel **facultatif** du site vitrine »
- SEO.md §1 : « L'option Sérénité est **facultative**. Ne jamais la présenter comme obligatoire. »

**Aggravation.** Les lignes 221 et 423 sont des réponses de FAQ, donc **émises verbatim dans le JSON-LD `FAQPage`**. L'affirmation trompeuse est structurée et directement citable.

Note : la meta description de `/site-internet/restaurant` dit « Changement de carte compris dans **l'option de suivi** », qui est correcte. L'incohérence est interne à la page.

**Correction recommandée.** Reformuler les 4 emplacements : « comprise dans l'option Sérénité à 30 €/mois, si vous la prenez ». Corriger `src/content/metiers.ts` **et** `CONTENT.md` dans le même commit, sinon la prochaine resynchronisation réintroduira l'erreur.

**Risque : nul techniquement.** Attention à ne pas régler l'incohérence dans le mauvais sens : la décision produit est que le 30 €/mois n'est **pas** obligatoire.

---

### P1-5 — Aucune `og:image` sur 10 des 12 URLs

**URLs concernées :** tout sauf `/` et `/en`.
**Fichier :** `src/lib/seo.ts:218-232`

**Preuve constatée.** `og:image` et `twitter:image` sont présentes sur `/` et `/en`, **absentes** de `/prix-site-vitrine`, `/en/pricing`, `/site-internet` et des 7 fiches.

**Cause.** `buildMetadata` construit toujours un objet `openGraph` explicite et n'y met `images` que si l'argument optionnel `image` est fourni. Aucune page ne l'appelle avec `image`. L'objet explicite prend le pas sur la convention de fichier `opengraph-image.tsx` du route group, qui ne comble pas le trou.

**Conséquence.** Les pages de conversion partagées sur WhatsApp, LinkedIn, Slack ou reprises dans une carte de LLM n'ont aucune vignette. Ce sont précisément les pages envoyées en prospection.

**Correction recommandée.** Dans `buildMetadata`, faire défaut sur l'image OG de la locale. **Attention**, voir P2-1 : les chemins non hachés renvoient un 404. La bonne cible est le chemin haché émis par Next, ou un asset statique dédié. À traiter avec P2-1.

**Risque : faible.**

---

### P1-6 — Contenu mince sur `/site-internet` et boilerplate lourd sur les 7 fiches métier

**Preuve constatée, `/site-internet` : 136 mots dans `<main>`**, breadcrumb et libellés de cartes compris. Structure : 1 H1, 2 H2, **0 H3**. Sur ces 136 mots, environ 60 sont des libellés de navigation. C'est un hub de liens, pas une page de contenu, alors que son `<title>` cible « Création de site internet pour commerçants et artisans, dès 490 € », une requête à intention commerciale forte.

**Preuve constatée, fiches métier : 105 mots strictement identiques sur les 7.**

| Bloc partagé mot pour mot | Mots |
|---|---|
| « Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire. » | 13 |
| « À partir de 490 €, selon le périmètre du projet. » | 10 |
| « Je ne suis pas à Caen, c'est possible ? » (Q4) | 9 |
| Les 7 libellés du bloc « À voir aussi » | 33 |
| Libellés de structure | 40 |
| **Total** | **105** |

| Fiche | Mots visibles | Part de boilerplate |
|---|---|---|
| `boulangerie` | 301 | **35 %** |
| `restaurant` | 324 | **32 %** |
| `bistrot-brasserie` | 340 | **31 %** |
| `coffee-shop` | 347 | **30 %** |
| `architecte-interieur` | 356 | **29 %** |
| `brasserie-artisanale` | 360 | **29 %** |
| `tatoueur` | 365 | **29 %** |

Similarité textuelle par paires : **40 % à 49 %**.

S'y ajoutent **deux blocs identiques** absents du DOM (P1-1) mais présents dans le JSON-LD des 7 pages : la réponse prix (~47 mots, lignes 149, 216, 283, 351, 418, 486, 554) et la réponse Q4 (~15 mots, lignes 163, 230, 297, 365, 432, 500, 568). Soit **la moitié de chaque FAQ dupliquée sur 7 URLs**.

**Analyse.** Ce n'est pas encore du contenu dupliqué au sens pénalisant : chaque fiche garde 200 à 260 mots spécifiques. Mais le ratio se dégrade, et SEO.md §9 l'interdit explicitement. Risque concret : Google sélectionne une seule fiche comme représentante du groupe, les autres passant en « explorée, actuellement non indexée ».

**Correction recommandée.**
1. **`/site-internet`** : porter à 400-600 mots utiles. Pas de villes (SEO.md §10), pas de duplication du contenu des fiches.
2. **Fiches métier** : différencier les deux blocs partagés. La réponse prix peut rester factuellement identique mais être formulée par métier. La Q4 « Je ne suis pas à Caen » gagnerait à devenir une 4e question propre au métier ; l'information « je travaille à distance » est déjà portée par `areaServed` et `/prix-site-vitrine`.
3. Corriger P1-1 en même temps rend mécaniquement visibles 120 à 160 mots par fiche.

**Risque : faible si et seulement si les URLs ne bougent pas.** Les 8 URLs `/site-internet*` sont des actifs indexés. **Ne pas** fusionner, **ne pas** rediriger, **ne pas** renommer de slug. Réécrire en place.

---

### P1-7 — Les 12 meta descriptions dépassent la cible, 4 titres dépassent la cible

SEO.md §3 fixe : titre 50-60 caractères, description 140-160.

| URL | Titre | Desc |
|---|---|---|
| `/` | 64 | **202** |
| `/en` | 67 | **212** |
| `/prix-site-vitrine` | 63 | **189** |
| `/en/pricing` | 58 (ok) | **187** |
| `/site-internet` | **75** | **179** |
| `/site-internet/restaurant` | 62 | **198** |
| `/site-internet/architecte-interieur` | **74** | **182** |
| `/site-internet/bistrot-brasserie` | **72** | **165** |
| `/site-internet/brasserie-artisanale` | **72** | **174** |
| `/site-internet/tatoueur` | 60 (ok) | **184** |
| `/site-internet/coffee-shop` | 63 | **176** |
| `/site-internet/boulangerie` | 63 | **166** |

**Aucun doublon de titre, aucun doublon de description** : les 12 sont uniques.

**Analyse.** Aucune de ces descriptions ne s'affichera en entier. Sur `/site-internet` (75 car.), la fin du titre, dont le « dès 490 € » qui est l'argument le plus cliquable, est coupée avant `| Yan-dev`.

**Correction recommandée.** Resserrer en priorisant `/` et `/en` (à traiter avec P1-2, même réécriture), puis `/site-internet`, puis les 3 titres métier longs. Mot-clé en tête, argument de clic avant le 155e caractère. Réécrire, ne pas couper mécaniquement.

**Risque : faible.** Une description n'est pas un facteur de classement, seul le CTR bouge. Le titre en est un : ne modifier que la partie excédentaire, sans toucher au segment « Création de site internet pour {métier} ».

---

## P2 — Optimisation importante

### P2-1 — `ProfessionalService.image` pointe vers une URL en 404
`src/lib/seo.ts:103` : `image: ${SITE_URL}/opengraph-image`. Mesure : `https://yan-dev.fr/opengraph-image` renvoie **404**, idem `/en/opengraph-image`. Next sert l'image sous un chemin haché. **Correction :** référencer le chemin réellement émis, ou créer un asset statique stable dans `public/`. À traiter avec P1-5. **Risque : nul.**

### P2-2 — Types JSON-LD manquants (`WebSite`, `Organization`) et graphe non lié par `@id`
Un seul nœud global, `ProfessionalService`. Aucun `WebSite`. Aucun `@id` : chaque `Service` redéclare son `provider` en inline sans référence à l'entité globale. Les moteurs voient donc **deux nœuds `ProfessionalService` distincts** décrivant la même entreprise. **Correction :** `@id` stable (`https://yan-dev.fr/#organization`), référencé depuis `Service.provider`, plus un nœud `WebSite`. **Ne pas** ajouter de `SearchAction` : il n'y a pas de recherche interne, l'affirmer serait faux. **Risque : faible.**

### P2-3 — Aucune page de mentions légales, aucun SIRET nulle part
`/mentions-legales` renvoie **404**. Grep sur `src/` : aucune occurrence de SIRET ni de forme juridique. SEO.md §3 place l'identifiabilité de l'entité parmi les conditions de citabilité GEO. C'est aussi une obligation légale. **Correction :** créer la page, l'ajouter au sitemap dans le même commit, la lier depuis le footer, référencer le SIRET dans le JSON-LD. Contrainte : pas d'adresse postale complète, pas de téléphone. **Risque : nul en SEO.**

### P2-4 — L'écran de chargement bloque la page 1 000 à 2 200 ms sur toutes les URLs
`src/components/layout/SiteLoader.tsx` : `MIN_DURATION_MS = 1000`, `MAX_DURATION_MS = 2200`, overlay opaque `fixed inset-0 z-[60]`, `body.style.overflow = "hidden"`. Monté dans **les deux** root layouts, donc actif aussi sur les fiches métier. Un `<noscript>` le neutralise sans JS, bon réflexe.

**Ce qui est affirmable :** le HTML est prérendu et complet, puis recouvert par une couche opaque au minimum une seconde, scroll bloqué.
**Ce qui ne l'est pas :** l'impact chiffré sur LCP ou INP. Pas de Lighthouse, pas de CrUX, **aucun score avancé**.

**Options à arbitrer :** (a) restreindre le loader à la home, (b) abaisser `MIN_DURATION_MS` à ~300 ms, (c) le jouer une fois par session. **C'est une décision de design, pas un correctif SEO** : le loader est un parti pris de marque. À signaler, pas à modifier unilatéralement.

### P2-5 — `<meta name="keywords">` émise sur les 12 URLs, en contradiction avec SEO.md
`src/app/(fr)/layout.tsx:37-46`, `src/app/(en)/layout.tsx:36-43`. SEO.md §3 : « Pas de `<meta name="keywords">` : sans effet, et signal de spam. » **Correction :** supprimer les deux blocs. **Risque : nul.**

### P2-6 — `priority` posé sur une image sous la ligne de flottaison sur les 7 fiches
`src/app/(fr)/site-internet/[metier]/page.tsx:174` : l'image d'exemple est en 3e section. SEO.md §8 : « `priority` uniquement sur l'image du hero. » Elle entre en concurrence avec l'élément qui détermine réellement le LCP. Cas voisin défendable : `site-internet/page.tsx:97` (`priority={index === 0}`, proche du haut). **Correction :** retirer `priority` ligne 174. **Risque : faible, à mesurer.**

### P2-7 — Sur `/site-internet`, les 7 noms de métier sont des `<span>`, la page n'a aucun H3
`src/app/(fr)/site-internet/page.tsx:103-108`. **Correction :** passer l'intitulé de carte en `<h3>`. Le H2 parent existe déjà, aucun saut de niveau créé. Gain de structure et de vocabulaire de requête sur une page qui en manque (P1-6). **Risque : nul.**

### P2-8 — Page 404 par défaut de Next : sans `lang`, en anglais, sans navigation
Aucun `not-found.tsx` dans `src/app/`. La 404 servie n'a pas d'attribut `lang`, a pour titre `404: This page could not be found.` et ne contient aucun lien interne. **Point positif :** vrai HTTP 404 avec `noindex`, aucun soft 404. **Correction :** un `not-found.tsx` par route group, avec navbar, footer et liens de reprise. **Risque : nul.**

### P2-9 — Poids JS : 341 Ko sur `/`, ~266 Ko sur les pages internes (mesuré, compressé)

| URL | Assets | JS+CSS transféré | dont CSS | HTML transféré |
|---|---|---|---|---|
| `/` | 14 | **341,2 Ko** | 9,7 Ko | 18,1 Ko |
| `/prix-site-vitrine` | 13 | **267,0 Ko** | 9,7 Ko | 13,4 Ko |
| `/site-internet` | 13 | **265,7 Ko** | 9,7 Ko | 11,4 Ko |

13 composants portent `"use client"`. Le runtime Motion, la Navbar cliente, l'accordéon FAQ et le carrousel sont embarqués sur **toutes** les pages, y compris `/site-internet` qui fait 136 mots. 266 Ko de JS pour 11 Ko de HTML est un ratio défavorable. **L'INP n'est pas mesuré, aucun chiffre avancé.** **Correction possible :** animations CSS sur les pages SEO, Motion uniquement là où l'interaction le justifie. **Risque : moyen**, touche l'identité visuelle. Pas sans mesure préalable ni arbitrage.

### P2-10 — Aucune page pour les piliers créatif et produit digital, aucune page projet
Le site affirme trois piliers mais seul le pilier vitrine a une page d'atterrissage et un réseau de pages d'intention. Les 8 projets réels (BeerBee, Madman Tattoo, Atelier Lumé, L'océan, Lumio-coffee, Le Cerf Doré, CleanAI, BetaWall) n'ont **aucune page** : dans `src/content/travail.ts` ils se réduisent à un titre, un secteur, une catégorie, un lien et une image. Le seul texte les concernant est le libellé `alt`.

C'est le plus gros écart entre positionnement affiché et surface indexable. Les requêtes de l'étage 2 côté créatif et produit n'ont aucune page cible. Et SEO.md §3 identifie les case studies factuels comme « le format que les LLM citent le plus volontiers ».

**Correction :** deux pages de pilier, puis des case studies factuels (contexte, ce qui a été construit, technologies). Contraintes fermes : pas de faux témoignage, pas de statistique inventée, pas de délai annoncé. Chaque page ajoutée au sitemap dans le même commit, atteignable par un lien contextuel. Périmètre **FR uniquement**. **Risque : faible**, créations pures.

---

## P3 — Amélioration

### P3-1 — Pas de `<address>` dans le footer
`src/components/layout/Footer.tsx:81-95` : le bloc contact est un `<ul>/<li>`. SEO.md §4 prescrit `<address>`. Vérifié en production : zéro `<address>`. **Risque : nul.**

### P3-2 — Copy périmée morte dans `src/content/site.ts`, piège pour un futur agent
`:44-46` (FR) et `:64-66` (EN) : `tagline` et `description` portent l'ancien positionnement. **Vérifié : ni l'un ni l'autre n'est rendu ni utilisé en metadata.** Les seuls consommateurs de `siteContent()` sont `Navbar.tsx:32` et `Footer.tsx:9`, pour `navLinks` et `footer`. **Risque du non-traitement :** un futur agent qui câblerait ces champs réintroduirait l'ancien positionnement en croyant utiliser la source de vérité. À corriger avec P1-2, ou à supprimer.

### P3-3 — Canonical de la home sans slash final, sitemap avec slash : aucune action
`<link rel="canonical" href="https://yan-dev.fr"/>` contre `<loc>https://yan-dev.fr/</loc>`. Ces deux formes désignent la même ressource (RFC 3986). **Consigné uniquement pour qu'un futur agent ne « corrige » pas l'un des deux et ne crée pas une divergence réelle.**

### P3-4 — Liens sortants dofollow vers 10 démos `.vercel.app`
Les 11 liens externes répondent 200. `site-pf-1.vercel.app/robots.txt` renvoie `Disallow: /` (bon), tandis que `madman-tattoo.vercel.app/robots.txt` renvoie `Allow: /`. Ces démos sont des sites de style « client » potentiellement concurrents sur des requêtes métier. Pas d'action requise ; à surveiller si une démo commençait à ranker sur une requête visée par une fiche.

---

## 3. Multilingue FR/EN, verdict

**L'implémentation est complète et cohérente sur son périmètre. Aucune incohérence trouvée.**

| Point de contrôle | Constat |
|---|---|
| Périmètre déclaré (SEO.md §7) | 4 URLs bilingues, 8 FR-only |
| Périmètre réel en production | **Identique** |
| hreflang sur les 4 bilingues | 3 balises, `fr-FR` / `en` / `x-default` vers FR |
| Réciprocité | **Vérifiée dans les deux sens** |
| hreflang sur les 8 FR-only | **Zéro**, correct |
| `<html lang>` | `fr` / `en` corrects, sans middleware |
| Français à la racine | Aucun `/fr/`. Aucune URL indexée n'a bougé |
| Sélecteur de langue | Vraies balises `<a href>` avec `hrefLang` + `lang` (`LocaleSwitcher.tsx:52-56`), crawlable |
| Redirection auto par IP / `Accept-Language` | **Aucune**, correct |
| Repli sur page sans équivalent | `counterpartPath()` (`src/lib/routes.ts:66-80`), jamais un lien mort |
| Duplication inter-langues | 4,6 % et 10,5 % de similarité, nulle |
| Sitemap | `xhtml:link` sur les 4 bilingues uniquement |
| Footer | Lien « Tous les métiers » conditionné à `locale === "fr"` (`Footer.tsx:68`), cohérent |

**Confirmation sur `routeKey` :** son absence sur `/site-internet` et `/site-internet/[metier]` est **volontaire, documentée et correcte**. Ces pages n'ayant pas de version anglaise, déclarer un alternate serait une erreur non réciproque que Google ignorerait silencieusement.

> **Avertissement pour les agents suivants :** ne pas « compléter » le hreflang en ajoutant `routeKey` aux pages métier. Cela créerait 8 déclarations non réciproques vers des URLs inexistantes, et étendrait le périmètre EN que SEO.md §7 et CLAUDE.md §5 placent hors scope.

---

## 4. Performance, mesures réelles et démentis

**Sources dans le repo** (lourdes) : `avatar-yan.JPG` 668 Ko, `lumio.png` 582 Ko, `restaurant.png` 534 Ko, `cerf-dore.png` 529 Ko, `boulangerie.png` 518 Ko. Total `public/` environ 3,9 Mo.

**Octets réellement livrés** (mesurés avec `Accept: image/avif,image/webp`) :

| Requête | Livré |
|---|---|
| `lumio.png` @ w=384 | **8 360 o** en `image/webp` |
| `lumio.png` @ w=3840 | **74 920 o** en `image/webp` |
| `avatar-yan.JPG` @ w=64 | **876 o** en `image/webp` |

L'optimiseur Vercel convertit et redimensionne à la volée. **Il n'y a pas de problème d'images en production.** Convertir les sources en WebP dans le repo n'apporterait rien au visiteur.

**Faux positif à ne pas corriger :** chaque `<img>` porte un `src` de repli en `w=3840`. C'est le comportement normal de `next/image` ; tout navigateur supportant `srcset` l'ignore. **Aucune action.**

**Autres constats :**
- Vidéos : aucune. Bibliothèque d'animation : Motion uniquement (P2-9).
- Scripts bloquants : aucun. Les 13 `<script>` sont des chunks Next en `async`. Une seule feuille de style (9,7 Ko).
- Fontes : 3 familles `next/font` auto-hébergées, `display: swap`, aucun host externe.
- CLS : risques structurels faibles. Les deux points de vigilance sont l'overlay du loader (P2-4) et l'animation de hauteur à introduire pour corriger P1-1.
- Rendu client : aucun contenu important n'est JS-only, **sauf les réponses de FAQ (P1-1)**. Vérifié positivement : les légendes du carrousel, H1, leads, enjeux et blocs CTA sont bien dans le DOM servi.

---

## 5. Les 5 actions à plus fort impact, dans l'ordre

1. **Passer la redirection `www` vers apex en 308 permanent** (P0-1), depuis les réglages de domaine Vercel. Seul point pouvant produire une indexation dupliquée, le moins coûteux à corriger, aucune ligne de code. À faire avant toute autre modification.

2. **Rendre les réponses de FAQ dans le DOM** (P1-1), par repli CSS plutôt que par montage conditionnel. Corrige une violation des consignes Google sur `FAQPage`, réaligne les données structurées sur le contenu visible, et rend lisibles 120 à 160 mots par page sur 9 des 12 URLs.

3. **Réécrire la metadata globale, la description du `ProfessionalService` et la copy de l'image OG** (P1-2), en traitant dans le même passage les longueurs (P1-7) et l'`og:image` manquante (P1-5 + P2-1). Un seul chantier de rédaction qui met fin au décalage entre ce que Google annonce et ce que le site est devenu.

4. **Corriger les deux affirmations fausses** : le prix ferme à 490 € dans `serviceLd` (P1-3, un seul point de code pour 8 URLs) et la Sérénité présentée comme acquise (P1-4, 4 lignes plus `CONTENT.md`). En GEO, une seule suffit à discréditer l'ensemble, et celles-ci sont dans le format le plus repris.

5. **Étoffer `/site-internet` et différencier le boilerplate des 7 fiches** (P1-6), sans jamais toucher aux slugs. 136 mots sur une page à intention commerciale, et 29 à 35 % de texte identique sur 7 URLs : principal risque de désindexation progressive du réseau local, seul actif SEO réellement établi du site.

---

## 6. Décompte par priorité

| Priorité | Nombre | Références |
|---|---|---|
| **P0** | **1** | P0-1 |
| **P1** | **7** | P1-1 à P1-7 |
| **P2** | **10** | P2-1 à P2-10 |
| **P3** | **4** | P3-1 à P3-4 |
| **Total** | **22** | |

**Vérifié conforme, aucune action :** statuts HTTP (12/12 en 200), canonicals, hreflang et réciprocité, trailing slash, robots.txt, sitemap, 404 réels, absence d'orphelines, absence de liens cassés, unicité des H1, absence de saut de niveau Hn, unicité des titres et descriptions, `lang`, alt, livraison des images, chargement des fontes, absence de JS tiers, distinction FR/EN.
