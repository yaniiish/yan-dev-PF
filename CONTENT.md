# CONTENT.md — yan-dev

> **Source unique de vérité pour tous les textes affichés.** Claude Code ne doit jamais inventer ou paraphraser un wording sans validation. Si un texte manque, demander.
> Les sections marquées `[À VALIDER]` doivent être confirmées avec Yan avant de partir en code.

---

## 1. Métadonnées globales

> Source de vérité en code : `src/app/(fr)/layout.tsx` et `src/app/(en)/layout.tsx`.

- **Nom commercial :** Yan-dev
- **Title FR par défaut (60 car.) :** `Développeur web freelance à Caen, sites et produits digitaux`
- **Description FR (154 car.) :**
  > *"Sites vitrines dès 490 €, sites créatifs sur mesure et produits digitaux. Développeur indépendant à Caen, en direct sans intermédiaire, partout en France."*
- **Title EN par défaut (59 car.) :** `Freelance web developer in France: web and digital products`
- **Description EN (149 car.) :**
  > *"Business websites from €490, bespoke creative sites and digital products. Independent developer based in Caen, France, working with clients anywhere."*
- **Titre OG et Twitter FR :** `Yan-dev : sites web créatifs et produits digitaux` (EN : `Yan-dev: creative websites and digital products`)

> **Arbitrage retenu (2026-08-17) : « équilibré ».** Le métier et la ville ouvrent le title (ancrage local, `SEO.md` §2), les trois piliers suivent. L'ancienne version vendait un « studio web » de sites vitrines avec un vocabulaire « site premium » disparu de l'offre, pendant que le H1 portait déjà le nouveau positionnement : le snippet Google ne correspondait plus au site.
>
> **Règles de longueur (`SEO.md` §3) :** title 50 à 60 caractères, description 140 à 160, **template `| Yan-dev` compris**. Ce suffixe coûte 10 caractères : les pages dont le titre porte déjà une requête longue (fiches métier, index métiers, page prix) le neutralisent via `titleAbsolute: true` dans `buildMetadata`, plutôt que de sacrifier l'argument de clic « dès 490 € ». Toutes les pages ont été ramenées dans ces bornes, mesurées sur le HTML rendu.
>
> **Pas de `<meta name="keywords">`** : les deux blocs ont été supprimés des layouts (sans effet, signal de spam).

### Image OpenGraph

Figée en PNG 1200x630 : `public/og-image.png` (FR) et `public/og-image-en.png` (EN), déclarées via `OG_IMAGE` dans `src/lib/seo.ts` et utilisées par défaut par `buildMetadata`.

- **Kicker :** `01 / Développeur indépendant` (EN : `01 / Independent developer`)
- **Titre :** `Sites web créatifs &` puis `produits digitaux.` souligné (EN : `Creative websites &` puis `digital products.`)
- **Lead :** `Du site vitrine au produit digital sur mesure. Basé à Caen, projets partout en France.`
- **Bas de carte :** `Disponible actuellement` et `Site vitrine dès 490 €`

> Les routes `opengraph-image.tsx` ont été supprimées : elles servaient l'image sous un chemin haché, donc instable, ce qui laissait `ProfessionalService.image` en 404 et privait de vignette les 10 pages n'utilisant pas la convention de fichier. La procédure de regénération est documentée dans l'entête de `src/lib/og.tsx`. **Toute modification de la copy OG impose de regénérer les deux PNG**, sinon l'image et le texte divergent.

---

## 2. Navbar

- **Logo / mark :** texte `Yan-dev` (pas de logo image).
  - Style : `font-serif` ou `font-sans font-semibold tracking-tight`. À tester en code.
- **Liens :**
  - Accueil → `#hero`
  - Mon travail → `#travail`
  - Comment ça marche → `#processus`
  - Tarifs → `#tarifs`
  - Contact → `#contact`
  > Passée de 6 à 4 liens avec la suppression de Pourquoi et Services, puis à 5 avec l'ajout de Comment ça marche.
  > Le libellé reprend le titre de la section, il n'est pas raccourci en « Processus » : la navbar desktop ne s'affiche qu'à partir de `lg`, donc la place ne manque plus. Mesuré à 1024px, 61px de marge de chaque côté.
- **CTA Navbar (à droite) :** bouton primaire `Discuter de mon projet` → `#contact`.

---

## 3. Section HERO

> **Note** : pas de `SectionLabel` numéroté en haut du Hero (décision Phase 1.4a — pas pertinent en première section). Les autres sections gardent leur SectionLabel.

### Phrase d'accroche (H1) — VALIDÉE Phase 4 (repositionnement)

> Creative Developer, Website Creator & Product Builder

**Traitement typo (verrouillé) :**
- Police : `font-serif` (Instrument Serif), `font-medium`, `tracking-tight`, `leading-[1.05]`, couleur `text-ink-950`.
- **Deux lignes explicites** : `Creative Developer,` puis `Website Creator & Product Builder`. Découpage choisi pour équilibrer : la ligne la plus longue fait 33 caractères au lieu de 35 avec le découpage inverse, ce qui laisse monter l'échelle.
- Échelle en **`text-[8.5cqw]`**, pas en `clamp` de `vw` : la colonne gauche porte `@container`, donc le titre garde toujours la même proportion de sa colonne quel que soit le format. Le coefficient est calé sur la ligne la plus longue, marge de sécurité comprise. Chaque ligne est en `whitespace-nowrap`, donc un coefficient trop grand ferait déborder au lieu de replier : un test e2e vérifie la marge restante sur chaque ligne à 5 formats.
- Donne 56px en desktop et 29px à 390px.

> Une version en **une seule ligne** a été essayée puis écartée : à 52 caractères elle tombait à 19px sur mobile, soit la taille du lead, et le titre ne se lisait plus comme un titre.
- **La partie "Product Builder" est soulignée en mint.**
- **Pas d'italique** nulle part dans le H1.
- Grille 2 colonnes `lg:grid-cols-12` : colonne gauche 7/12 (H1, lead, paragraphe, CTA), colonne droite 5/12 (card), `lg:items-center` pour que la card soit centrée sur tout le bloc texte. Le split ne s'active qu'à partir de `lg` : en dessous, le H1 sur deux lignes ne tient pas dans 7 colonnes et tout passe en pile.

### Sous-titre (lead)
> Sites web créatifs, sites vitrines plus simples et produits digitaux.

Le lead et le paragraphe d'introduction partagent un **wrapper `max-w-[40rem]`** : en `max-w-*ch` leurs deux tailles de police donnaient deux bords droits différents (28px d'écart), ce qui lisait comme un décalage accidentel. Rythme vertical du bloc gauche : 40px entre le H1 et le lead, 16px entre le lead et le paragraphe (ils forment un groupe), 40px avant les CTA.

### Paragraphe d'introduction

Placé **dans le hero, entre le lead et les CTA**. Hiérarchie en trois niveaux : lead en `text-ink-700` à l'échelle lead, paragraphe en `text-ink-500` à l'échelle body, puis les CTA.

> Du site vitrine simple à l'expérience web plus créative, jusqu'au produit digital complet. Je conçois chaque projet selon ses besoins, ses ambitions et son budget, sans jamais sacrifier la qualité.

### CTAs

- **Primaire :** `Voir mes projets` → `#travail`
- **Secondaire :** `Discuter d'un projet` → `#contact`

> À aligner : la Navbar et le Footer affichent encore `Discuter de mon projet`. Deux libellés pour la même intention.

### Card de présentation (à droite du hero)

- **Ligne d'en-tête :** avatar + nom à gauche, indicateur de disponibilité à droite (`justify-between`). La disponibilité était en bas de card ; remontée ici parce que « Yan » seul à côté de l'avatar laissait la moitié de la ligne vide.
- **Avatar :** image fournie (`/public/avatar/avatar-yan.JPG`), **rond** (`rounded-full`), ~56px.
- **Nom :** `Yan` (font-serif, ~xl)
- **Rôle :** `CREATIVE DEVELOPER · PRODUCT BUILDER` en mono mint uppercase, **sur sa propre ligne pleine largeur**. Coincé à côté de l'avatar il passait sur 2 à 3 lignes selon le viewport. Taille et tracking réduits sous `sm` pour tenir sur une ligne à 390px.
- **Citation entre guillemets français `«&nbsp;»`, font-serif :**
  > J'aime transformer une idée en quelque chose de concret, qu'il s'agisse d'un simple site vitrine ou d'un produit digital complet.
- **Sous-tagline (sous la citation, séparée par une fine bordure, plus discrète) :**
  > Je travaille en direct, sans intermédiaire.
- **Indicateur de disponibilité (ligne d'en-tête, à droite) :** point mint pulsant (`animate-ping`) + texte `Disponible actuellement`.
- **Plus de chips Next.js / SEO local / Réponse sous 24h** (trop technique pour la cible).
- **Comportement :** la card arrive inclinée à `-8deg` puis se pose à `-3deg`, et se redresse au hover (`whileHover rotate: 0`, 500ms ease-out). La rotation est pilotée par Motion, pas par une classe CSS, pour ne pas entrer en conflit avec l'animation d'entrée.

### Animations d'entrée du hero

Déclenchées par la sortie de l'écran de chargement (hook `useSiteLoaded`), pas au scroll : en `whileInView` elles se jouaient derrière l'overlay et personne ne les voyait.

Séquence, stagger 0.09s : les deux lignes du H1 montent derrière un masque (`overflow-hidden`, translation Y 110% → 0), puis le lead, puis les CTA, puis la card. `useReducedMotion` dégrade tout en simple fondu.

### Background hero
- `<BGPattern variant="grid" mask="fade-edges" />` avec fill en `color-mix(in oklch, var(--color-ink-300) 50%, transparent)` pour rester subtil sous le texte. Validé Phase 1.2 contre FallingPattern.
- Section en `relative flex items-center overflow-hidden`, hauteur `min-h-[calc(100svh-4rem)]` puis `md:min-h-[calc(100svh-5rem)]` : plein écran moins la navbar (`h-16` puis `md:h-20`), contenu centré verticalement.
- **Padding bas plus grand que le padding haut** (`md:pt-16 md:pb-24`, `lg:pt-20 lg:pb-28`) : avec `items-center`, ça remonte le bloc au-dessus du centre géométrique, là où l'œil attend le centre optique.
- **La card garde sa hauteur naturelle.** Un essai d'étirement sur la hauteur de la colonne (`lg:self-stretch`) a été écarté : il creusait de grands vides au-dessus et en dessous de la citation. C'est la taille de la citation (`lg:text-2xl`) qui lui donne sa présence, sans espace mort à l'intérieur.
- `svh` et non `dvh` : le `dvh` se recalcule quand la barre d'adresse mobile se rétracte, ce qui fait sauter la mise en page pendant le scroll.
- `min-h` et non `h` : sur petit écran le contenu dépasse la hauteur d'écran, la section grandit au lieu de tronquer.

---

## 4. Section MON TRAVAIL

> Remplace les anciennes sections POURQUOI, SERVICES et EXEMPLES, supprimées lors du repositionnement.

### Identifiant
`#travail` (l'ancienne ancre `#exemples` a été renommée ; CTA du hero, navbar et page prix mis à jour).

### Titre (H2)
> Ce que je construis.

Le verbe « construis » fait écho au positionnement Product Builder du hero. Les deux colonnes s'expliquent seules, le titre n'a pas à annoncer la dualité.

### Intro (lead)
> Sites web créatifs, sites vitrines et produits digitaux pensés pour répondre à des objectifs concrets.

### Structure

Deux colonnes séparées par un filet vertical à partir de `lg` (7/12 à gauche, 5/12 à droite). En dessous de `lg` elles s'empilent et le filet devient horizontal.

### Colonne gauche — Sites web

- Un projet affiché en grand (visuel 16/9, catégorie en mono mint, titre en serif, secteur, lien externe en pastille ronde), plus une bande de six vignettes pour changer de projet. Pas de carrousel qui défile : avec six projets tout tient à l'écran et l'utilisateur choisit directement.
- Bouton `Des exemples par métier` sous la colonne, vers `/site-internet`.

**Trois catégories, affichées dans la fiche de chaque site :**

| Catégorie | Sites |
|-----------|-------|
| `Site créatif` | BeerBee |
| `Site vitrine créatif` | Madman Tattoo, Atelier Lumé |
| `Site vitrine` | L'océan, Lumio-coffee, Le Cerf Doré |

Les anciens libellés `Projet 01`, `Projet 02`… ont disparu : numéroter des tuiles que l'utilisateur peut compter n'apporte rien, et la catégorie porte une vraie information.

### Colonne droite — Produits

| Produit | Nature | État | Lien |
|---------|--------|------|------|
| **CleanAI** | `iOS App` | En ligne | [cleanaiapp.com](https://cleanaiapp.com) |
| **BetaWall** | `SaaS B2B` | En construction | pas de lien |

- CleanAI : « Nettoie les images et vidéos générées par IA avant publication sur TikTok ou Instagram. Traitement natif iOS, directement sur l'appareil. » Visuel `public/products/cleanai.jpg`, capture du site.
- BetaWall : « Un SaaS B2B pensé pour les salles d'escalade. En cours de construction. » Visuel `public/products/betawall.png` : lockup logo + wordmark extrait de la planche fournie par Yan (`betawall logo.png` à la racine, non commitée), détouré et composé sur un canvas 16/9 blanc pour tenir le même gabarit que la card CleanAI.
- Le point coloré à côté de l'état n'est pas décoratif : il distingue un produit en ligne d'un chantier.
- **Même présentation que la colonne gauche** : un produit en grand plus une bande de vignettes. La nature du produit prend la place de la catégorie du site, la description celle du secteur.

### Fond

Fond `bg-card` comme l'ancienne section Exemples. L'inspiration fournie par Yan est sombre, mais la page garde un thème unique : une section sombre au milieu casserait le rythme.

---

## 5. Section COMMENT ÇA MARCHE

### Identifiant
`#processus`. Placée entre « Mon travail » et « Tarifs » : elle explique le déroulé juste avant qu'on parle prix.

### Label
> / Comment ça marche

### Titre (H2)
> Un process de travail simple et transparent.

> Point final ajouté pour rester cohérent avec les autres H2 de la page (`Ce que je construis.`). Le reste du wording est celui fourni par Yan, au mot près.

### Les quatre étapes

Chaque étape a un numéro en mono mint, un titre en serif, une phrase d'accroche en gras et un corps de texte.

**01 · On échange**
> **Vous me présentez votre projet, vos besoins et vos contraintes.**
> On échange sur vos objectifs, vos envies, votre budget et le niveau d'ambition du projet.

**02 · Je vous propose une direction**
> **Je vous montre ce que je peux imaginer pour votre projet.**
> Selon le besoin, je prépare une première direction, une petite maquette ou un aperçu visuel pour que vous puissiez vous projeter avant d'aller plus loin.

**03 · On valide et je construis**
> **La direction vous convient ? On lance réellement le projet.**
> On valide le périmètre et le tarif, vous versez un acompte de **30 %**, puis je développe une version plus complète en intégrant vos retours au fil de l'avancement.

**04 · Validation et mise en ligne**
> **Tout est prêt et validé.**
> Une fois les derniers ajustements terminés, le solde est réglé et je m'occupe de la mise en ligne du projet.

Le `30 %` est le seul fragment mis en avant dans un corps de texte. Il est stocké dans un champ `emphasis` à part plutôt qu'en balisage dans la chaîne, pour que le contenu reste du texte.

Le numéro et le titre sont deux éléments distincts, sans tiret entre les deux : le tiret cadratin de la copie d'origine (`01 — On échange`) est proscrit.

### Fond

`BGPattern variant="dots" mask="fade-y"`. La section précédente est en aplat blanc, celle-ci relance le rythme sans répéter le grid du hero. Respecte la règle d'alternance de `DESIGN_SYSTEM.md` §6.1 : jamais deux fonds décoratifs sur deux sections consécutives.

---

## 6. Section TARIFS

### Identifiant
`05 — Tarifs`

### Titre (H2)
> Une offre adaptée à chaque projet.

### Intro (lead)
> Du site vitrine simple au produit digital plus ambitieux, chaque projet est pensé selon ses besoins, son niveau de personnalisation et son budget.

> **Modèle tarifaire en vigueur depuis la refonte.** Il remplace les trois formules Essentiel 690 € / Pack Sérénité 490 € + 30 €/mois / Projet premium. Le 30 €/mois n'est plus une formule mais une **option** de la carte Site vitrine : toute prose qui le présente comme obligatoire est fausse.

### Carte tarif 1 — Site vitrine

- **Nom de l'offre :** `Site vitrine`
- **Prix principal :** `À partir de 490 €`
- **Infobulle (i) accolée au prix :** `Le tarif peut évoluer selon : le nombre de pages, le niveau de personnalisation, les contenus à intégrer et les fonctionnalités spécifiques.`
- **Accroche :** `Pour les artisans, indépendants et petites entreprises qui veulent un site clair, professionnel et efficace.`
- **Liste inclus :**
  - Design moderne adapté à votre activité
  - Responsive mobile, tablette et desktop
  - SEO de base
  - Formulaire de contact
  - Aide à la mise en ligne avec la configuration de votre nom de domaine et de votre hébergement
- **Encart vert pâle dans la carte :**
  - Titre `Option Sérénité`, prix `30 €/mois` **en deux champs séparés**, jamais collés par un tiret cadratin (règle CONTENT).
  - Intro `Vous ne voulez rien gérer ? Je m'occupe de tout pour vous :`
  - Hébergement / Nom de domaine / Maintenance technique / Sauvegardes / Modifications mineures illimitées sous 48h *(infobulle (i) : « Les modifications mineures : texte, photo, horaires, prix, un plat au menu, etc. L'ajout de page, la refonte du design ou une nouvelle fonctionnalité font l'objet d'un devis à part. »)* / Support direct
  - Clôture `Résiliable à tout moment.`
- **Note de bas de carte :** `Vous n'êtes jamais prisonnier : à tout moment, je vous transfère le nom de domaine et vous cède le code du site. Le site est à vous.` (fin en gras). Décision Yan : dans la carte, pas en note sous les trois cartes.
- **CTA :** `Créer mon site` → `#contact`

### Carte tarif 2 — Site créatif

- **Nom de l'offre :** `Site créatif`
- **Prix principal :** `Sur devis`
- **Accroche :** `Pour les marques et projets qui veulent aller plus loin visuellement, sans sacrifier la lisibilité.`
- **Liste inclus :**
  - Tout ce qui est dans l'offre Site vitrine
  - Direction artistique plus poussée
  - Animations et interactions utiles
  - Expérience plus immersive
  - Intégrations spécifiques
  - Accompagnement créatif
- **CTA :** `Imaginer mon projet` → `#contact`

### Carte tarif 3 — Produit digital

- **Nom de l'offre :** `Produit digital`
- **Prix principal :** `Sur devis`
- **Accroche :** `Pour transformer une idée en produit concret.`
- **Liste inclus :**
  - Conception produit
  - MVP
  - SaaS
  - Application web
  - Application mobile
  - Dashboard / back-office
  - Intégrations IA / automatisations
- **CTA :** `Construire mon produit` → `#contact`

### Intitulé des listes
> `Inclus :` au-dessus des listes **Site vitrine et Site créatif uniquement**.
> **Pas d'intitulé sur Produit digital** : la liste y énumère les types de projets sur lesquels Yan peut travailler, pas ce qui est compris dans une prestation. Décision Yan, ne pas le remettre.

### Lien de maillage
> `Le prix d'un site vitrine en détail →` sous la **carte Site vitrine**, vers `/prix-site-vitrine`.

---

## 7. Section CONTACT

### Identifiant
`06 — Contact`

### Titre (H2)
> Une idée, une question ? Écrivez-moi.

### Intro (lead)
> Je réponds sous 24h (jours ouvrés). Pas de bot, pas d'agence intermédiaire — c'est moi qui lis et qui réponds.

### Champs du formulaire

| Label | Name | Type | Requis | Notes |
|-------|------|------|--------|-------|
| Email | `email` | email | oui | validation Zod |
| Téléphone | `phone` | tel | non | format libre |
| Votre activité | `activity` | text | oui | placeholder *"Boulangerie, cabinet, restaurant…"* |
| Votre message | `message` | textarea | oui | min 10 caractères, placeholder *"Décrivez en quelques lignes ce que vous avez en tête."* |
| (honeypot caché) | `website` | text | — | doit rester vide |

### Bouton submit
`Envoyer ma demande`

### États
- **Loading :** bouton désactivé, texte `Envoi…`
- **Succès :** remplace le formulaire par un bloc `Message reçu — je vous réponds très vite.`
- **Erreur :** message rouge sous le bouton `Une erreur est survenue, réessayez ou écrivez-moi directement à <email>.`

### Alternative contact direct
Sous le formulaire :
> Vous préférez le mail ? **contact@yan-dev.fr**

> Note dev : tant que le domaine n'est pas acheté, garder cet email en placeholder dans le code (centralisé dans `content/site.ts` via une constante `CONTACT_EMAIL`). Le formulaire peut être codé et tester l'UX mais l'envoi réel ne fonctionnera pas tant que Resend (ou SMTP) n'est pas configuré avec un domaine vérifié — c'est OK, on accepte un "faux succès" en local le temps du dev. Voir `ROADMAP.md` §1.5 pour la stratégie de bascule.
>
> **Téléphone : non affiché au MVP.** Pas de champ téléphone visible en footer ni en alternative contact. (Reste optionnel dans le formulaire pour le prospect qui veut le donner.)

---

## 8. Footer (bannière de fin)

- **Colonne gauche :** `Yan-dev` (mark) + petite phrase `Creative developer & product builder, basé à Caen : projets partout en France et à l'international.`
- **Colonne milieu :** liens internes (mêmes que navbar).
- **Colonne droite :** contact rapide (email uniquement au MVP — pas de téléphone). Réseaux si on en ajoute (LinkedIn ? à décider, hors MVP).
- **Bas du footer :**
  - `© 2026 Yan-dev — Tous droits réservés.`
  - Liens : `Mentions légales` (page à créer plus tard, MVP : `#` ou ancre placeholder)

---

## 9. Microcopy divers

- **404 :** `Cette page n'existe pas ou n'existe plus.` + CTA `Retour à l'accueil`.
- **Submit form, erreur réseau :** `Connexion impossible. Réessayez dans un instant.`
- **Submit form, champ requis :** `Ce champ est requis.`
- **Email invalide :** `Cet email ne semble pas valide.`

---

## 10. Items à valider absolument avant prod

- [x] Nom de domaine : `yan-dev.fr`, en ligne, indexation ouverte.
- [ ] Page mentions légales (texte et SIRET fournis par Yan). Requise légalement, et signal de confiance pour Google comme pour les LLM.
- [x] Décision téléphone : **pas de numéro affiché**. Décision confirmée lors du chantier SEO. Idem pour l'adresse postale complète : le NAP s'arrête à Caen 14000 plus l'email.
- [ ] Title et description globaux à réaligner sur le nouveau positionnement (cf. §1).

---

## 11. Page `/prix-site-vitrine` (V2 SEO, page d'intention)

> Page dédiée ciblant les requêtes `prix site vitrine` / `site vitrine pas cher` / `tarif site internet`. Source unique du contenu : `src/content/pricing.ts`. Réutilise les tarifs validés de la section Tarifs (cartes, footnote). Décision Yan (2026-06) : **pas de délai de livraison annoncé**.
>
> **Règle tarifaire, valable partout sur le site :** 490 € est un **point de départ** et non un prix ferme (le tarif évolue selon le nombre de pages, la personnalisation et les fonctionnalités), et l'option Sérénité à 30 €/mois est **facultative**. Ne jamais écrire « 490 € puis 30 €/mois » : cette formulation présente l'abonnement comme obligatoire et le prix comme fixe. Le JSON-LD suit la même règle (`minPrice`, cf. `SEO.md` §5).

- **Meta title :** `Prix d'un site vitrine : combien ça coûte ? Dès 490 €`
- **Meta description :** `Le prix d'un site vitrine professionnel : à partir de 490 €, avec une option de suivi à 30 €/mois. Tarifs clairs, sans devis à rallonge ni frais cachés. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Prix d'un site vitrine`
- **H1 :** `Combien coûte un site vitrine ?`
- **Chapô :** `Chez Yan-dev, un site vitrine démarre à 490 €. Le tarif évolue ensuite selon le nombre de pages, le niveau de personnalisation et les fonctionnalités, et il vous est annoncé avant de commencer. Si vous ne voulez rien gérer, l'option Sérénité prend tout en charge pour 30 €/mois, résiliable à tout moment.`

### Bloc « Le détail des tarifs »
Réutilise les trois cartes validées (`Site vitrine` dès 490 € avec option Sérénité 30 €/mois ; `Site créatif` sur devis ; `Produit digital` sur devis) et la footnote.

### Bloc « Pourquoi ce prix »
- **Titre :** `Un site à 490 €, ce n'est pas un site au rabais.`
- **Corps :** `Le prix vient du format (un site clair, sur mesure, sans intermédiaire ni surcouche inutile). Vous avez un code moderne, un site rapide, responsive et référencé localement.`

### Bloc FAQ (alimente le schema FAQPage)
1. **Combien coûte un site vitrine ?** → `Un site vitrine démarre à 490 € chez Yan-dev. Le tarif évolue selon le nombre de pages, le niveau de personnalisation, les contenus à intégrer et les fonctionnalités spécifiques. Il vous est annoncé d'avance, sans surprise.`
2. **Qu'est-ce qui est compris dans le prix ?** → `Un design moderne adapté à votre activité, un site responsive (mobile, tablette, ordinateur), le référencement de base, un formulaire de contact, et l'aide à la mise en ligne avec la configuration de votre nom de domaine et de votre hébergement.`
3. **À quoi sert l'option Sérénité à 30 €/mois ?** → `Elle est là si vous ne voulez rien gérer : hébergement, nom de domaine, maintenance technique, sauvegardes, modifications mineures illimitées sous 48h et support direct. Elle est facultative et résiliable à tout moment.`
4. **Y a-t-il un engagement ?** → `Non. La création du site est un paiement unique, et l'option Sérénité est résiliable à tout moment. Dans tous les cas le site vous appartient : je peux vous transférer le nom de domaine et vous céder le code quand vous le souhaitez.`
5. **Un site pas cher est-il vraiment professionnel ?** → `Oui. Le tarif bas vient du format (un site vitrine clair, sur mesure, en direct sans agence), pas d'un travail bâclé : code moderne, performances et référencement local soignés.`
6. **Et pour un projet plus ambitieux ?** → `Deux offres sur devis prennent le relais : le site créatif, pour aller plus loin visuellement avec une direction artistique poussée et des animations ; et le produit digital, pour une application web ou mobile, un SaaS ou un MVP. On en discute et je vous fais une proposition adaptée.`

### Bloc CTA
- **Titre :** `Un projet de site en tête ?`
- **Texte :** `Dites-moi votre activité en deux lignes, je vous réponds avec une estimation claire.`
- **Boutons :** `Discuter de mon projet` (→ `/#contact`) + `Voir des exemples` (→ `/#exemples`)

### Accès depuis la home (maillage interne)
- **Section Tarifs (#tarifs)** : lien contextuel sous la footnote, `Le prix d'un site vitrine en détail →` (→ `/prix-site-vitrine`).
- **Footer** : colonne `Ressources` avec le lien `Prix d'un site vitrine` (→ `/prix-site-vitrine`).
- **Navbar** : inchangée, `Tarifs` reste l'ancre `#tarifs` (expérience one-page préservée).

---

## 12. Pages métier `/site-internet/[metier]` (V2 SEO, longue traîne)

> Pages data-driven (source unique : `src/content/metiers.ts`), une entrée = une page. Cible : `site internet [métier]`. Template partagé : en-tête, enjeux, exemple en ligne, rappel tarif, FAQ, liens connexes, CTA. Schema `Service` + `FAQPage` + `BreadcrumbList`. Libellés de structure communs dans `METIER_LABELS` (`Pourquoi`, `Exemple`, `Tarif`, `FAQ`, `À voir aussi`, etc.). Priorité : coffee shop, puis restaurant.
>
> **7 métiers en ligne** (FR uniquement, cf. `SEO.md` §7) : coffee shop, restaurant, boulangerie, architecte d'intérieur, bistrot et brasserie, tatoueur, brasserie artisanale.
>
> **Duplication traitée le 2026-08-17 (constat P1-6 de l'audit).** La réponse à la question prix et la question « Je ne suis pas à Caen, c'est possible ? » étaient identiques mot pour mot sur les 7 fiches, soit la moitié de chaque FAQ. Les 14 textes ont été différenciés :
> - **Réponse prix** : les faits ne changent pas (dès 490 €, tarif variable, option Sérénité facultative à 30 €/mois) mais chaque fiche explique ce qui fait varier le prix **pour ce métier** (l'ampleur de la galerie pour un tatoueur, le nombre de projets pour un architecte, la taille de la gamme pour une brasserie).
> - **Question sur la distance** : formulation et réponse propres à chaque métier, en conservant l'information utile (travail à distance, référencement sur la ville du client).
>
> Il reste environ 97 mots communs aux 7 fiches, mais ce sont désormais des **libellés de navigation** (fil d'ariane, bloc « À voir aussi », CTA, rappel tarif, baseline du footer), pas du contenu rédactionnel. C'est incompressible et légitime.
>
> **Toute nouvelle fiche doit apporter des questions et des réponses réellement spécifiques au métier.** Ne jamais recopier le bloc FAQ d'une fiche existante en changeant seulement le nom du métier.

### Coffee shop (`/site-internet/coffee-shop`)
Cible aussi `site internet café`. Devanture (vignette de la grille index) : Lumio `https://lumio-coffee.vercel.app/` (visuel `/projects/lumio.png`). Section exemple de l'article : carrousel de deux exemples, Lumio puis GreenCP `https://greencp-test.vercel.app/` (visuel `/projects/coffee.png`).

- **Meta title :** `Création de site internet pour coffee shop, dès 490 €`
- **Meta description :** `Un site web moderne pour votre coffee shop ou votre café : carte, horaires, ambiance et visibilité sur Google. Dès 490 €, livré rapidement. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Site internet pour coffee shop`
- **H1 :** `Un site internet pour votre coffee shop`
- **Chapô :** `Votre coffee shop mérite mieux qu'une simple page Instagram. Un site clair qui met en avant votre carte, votre ambiance et vos horaires, et qui vous rend visible sur Google quand on cherche un café dans le coin. Dès 490 €.`
- **Enjeux (Pourquoi un site pour votre coffee shop) :**
  - `Sortir sur Google` : `Quand on cherche un café ou un coffee shop dans votre ville, un site bien référencé vous fait apparaître, avec votre adresse et vos horaires.`
  - `Donner envie avant la visite` : `Photos de vos boissons, de la salle, de l'ambiance : on donne envie de pousser la porte.`
  - `Des infos toujours à jour` : `Horaires, adresse, carte, événements : tout au même endroit, modifiable en un message.`
  - `Ne plus dépendre d'Instagram seul` : `Les réseaux complètent un site, mais vous ne maîtrisez ni l'algorithme ni le référencement. Un site, c'est chez vous.`
- **FAQ :**
  1. **Combien coûte un site pour un coffee shop ?** → `À partir de 490 €, selon le nombre de pages, le niveau de personnalisation et les fonctionnalités. Une option de suivi à 30 €/mois prend en charge le nom de domaine, l'hébergement et les mises à jour, si vous préférez ne rien gérer. Le détail est sur la page des tarifs.`
  2. **J'ai déjà un Instagram, ai-je vraiment besoin d'un site ?** → `Instagram complète bien un site mais ne le remplace pas : vous n'apparaissez pas sur Google et vous dépendez de l'algorithme. Un site vous rend trouvable et reste à vous.`
  3. **Puis-je afficher ma carte et mes horaires ?** → `Oui : carte, horaires, adresse, galerie photo et liens vers vos réseaux, tout est prévu.`
  4. **Je ne suis pas à Caen, c'est possible ?** → `Oui. Je travaille à distance partout en France, le site se livre sans déplacement.`
- **CTA :** titre `Envie d'un site pour votre coffee shop ?`, texte `Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.`, boutons `Discuter de mon projet` (→ `/#contact`) + `Voir les tarifs` (→ `/prix-site-vitrine`).

### Restaurant (`/site-internet/restaurant`)
Exemple en ligne : `https://site-pf-2.vercel.app/` (visuel `/projects/restaurant.png`). Point clé demandé par Yan : préciser que le **changement de carte est compris dans les 30 €/mois**.

- **Meta title :** `Création de site internet pour restaurant, dès 490 €`
- **Meta description :** `Un site web moderne pour votre restaurant : carte, horaires, réservation et visibilité sur Google. Changement de carte compris dans l'abonnement. Dès 490 €. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Site internet pour restaurant`
- **H1 :** `Un site internet pour votre restaurant`
- **Chapô :** `Vos clients regardent votre carte et vos horaires en ligne avant de réserver. Un site clair et moderne les rassure, met l'eau à la bouche et vous rend visible sur Google quand on cherche où manger dans le coin. Dès 490 €.`
- **Enjeux (Pourquoi un site pour votre restaurant) :**
  - `Être trouvé sur Google` : `Quand on cherche un restaurant dans votre ville, un site bien référencé vous fait apparaître, avec votre adresse, vos horaires et votre carte.`
  - `Donner envie de réserver` : `Photos de vos plats, de la salle, de l'ambiance : on donne envie de venir avant même de pousser la porte.`
  - `Une carte qui évolue facilement` : `Vous changez de menu chaque saison ? Avec l'option Sérénité à 30 €/mois, la mise à jour de la carte est comprise : il suffit de me l'envoyer.`
  - `Réservation et contact simplifiés` : `Numéro de téléphone cliquable, formulaire, lien vers votre outil de réservation : on met en avant ce qui aide à remplir la salle.`
- **FAQ :**
  1. **Combien coûte un site pour un restaurant ?** → `À partir de 490 €, selon le nombre de pages, le niveau de personnalisation et les fonctionnalités. Une option de suivi à 30 €/mois prend en charge le nom de domaine, l'hébergement et les mises à jour, si vous préférez ne rien gérer. Le détail est sur la page des tarifs.`
  2. **Puis-je changer ma carte régulièrement ?** → `Oui. Si vous prenez l'option Sérénité à 30 €/mois, la mise à jour de votre carte est comprise : vous m'envoyez les changements et je les mets en ligne.`
  3. **Peut-on ajouter la réservation en ligne ?** → `Oui : lien vers votre outil de réservation, numéro de téléphone cliquable ou formulaire de contact, selon ce que vous préférez.`
  4. **Je ne suis pas à Caen, c'est possible ?** → `Oui. Je travaille à distance partout en France, le site se livre sans déplacement.`
- **CTA :** titre `Envie d'un site pour votre restaurant ?`, texte `Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.`, boutons `Discuter de mon projet` (→ `/#contact`) + `Voir les tarifs` (→ `/prix-site-vitrine`).

### Boulangerie (`/site-internet/boulangerie`)
Exemple en ligne : `https://site-pf-1.vercel.app/` (visuel `/projects/boulangerie.png`).

- **Meta title :** `Création de site internet pour boulangerie, dès 490 €`
- **Meta description :** `Un site web moderne pour votre boulangerie : produits, horaires, commandes et visibilité sur Google. Dès 490 €, livré rapidement. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Sites internet par métier › Site internet pour boulangerie`
- **H1 :** `Un site internet pour votre boulangerie`
- **Chapô :** `Vos clients cherchent vos horaires, vos produits et savoir si vous prenez les commandes avant de passer. Un site clair les renseigne et vous rend visible sur Google quand on cherche une boulangerie dans le coin. Dès 490 €.`
- **Enjeux :** Sortir sur Google ; Mettre vos produits en valeur ; Annoncer horaires et fermetures ; Faciliter les commandes (numéro de téléphone cliquable ou formulaire).
- **FAQ :** prix ; produits et horaires ; commandes (gâteaux, pain) ; à distance.
- **CTA :** `Envie d'un site pour votre boulangerie ?`

### Architecte d'intérieur (`/site-internet/architecte-interieur`)
Cible aussi `site internet décorateur d'intérieur`. Angle : pour ce métier du design, un site clean et soigné est vraiment important (le site prouve l'œil du pro). Exemple en ligne : Atelier Lumé `https://atelier-lume-kappa.vercel.app/` (visuel `/projects/atelier-lume.png`).

- **Meta title :** `Création de site internet pour architecte d'intérieur, dès 490 €`
- **Meta description :** `Un site web soigné pour architecte ou décorateur d'intérieur : portfolio de vos réalisations, identité forte et visibilité sur Google. Dès 490 €. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Sites internet par métier › Site internet pour architecte d'intérieur`
- **H1 :** `Un site internet pour votre activité d'architecte d'intérieur`
- **Chapô :** `Pour un architecte d'intérieur, le site n'est pas un détail : c'est la première preuve de votre sens du design. Un site clair, épuré et soigné met en valeur vos réalisations, inspire confiance et vous rend visible sur Google quand on cherche un architecte ou un décorateur d'intérieur. Dès 490 €.`
- **Enjeux (Pourquoi un site soigné est essentiel pour un architecte d'intérieur) :**
  - `Votre site prouve votre œil` : `Pour un métier du design, un site daté ou brouillon décrédibilise. Un site épuré et bien composé montre tout de suite votre niveau d'exigence.`
  - `Mettre vos réalisations en valeur` : `Un portfolio soigné, de belles photos avant/après, des projets bien présentés : on donne envie de vous confier un intérieur.`
  - `Sortir sur Google` : `Quand on cherche un architecte ou un décorateur d'intérieur dans votre région, un site bien référencé vous fait apparaître avec votre univers et vos coordonnées.`
  - `Inspirer confiance avant le premier rendez-vous` : `Présentation de votre démarche, de votre parcours et de vos honoraires : un site clair rassure des clients qui s'apprêtent à investir dans leur lieu de vie.`
- **FAQ :**
  1. **Combien coûte un site pour un architecte d'intérieur ?** → `À partir de 490 €, selon le nombre de pages, le niveau de personnalisation et les fonctionnalités. Une option de suivi à 30 €/mois prend en charge le nom de domaine, l'hébergement et les mises à jour, si vous préférez ne rien gérer. Le détail est sur la page des tarifs.`
  2. **Pourquoi un site soigné est-il si important pour ce métier ?** → `Parce que votre site est une vitrine de votre travail : un visiteur juge votre sens du design en quelques secondes. Un site épuré et bien construit inspire confiance et reflète la qualité de vos projets.`
  3. **Peut-on présenter mon portfolio et mes réalisations ?** → `Oui : galeries de projets, photos avant/après, descriptions de chantiers et témoignages clients, tout est prévu pour valoriser votre travail.`
  4. **Je ne suis pas à Caen, c'est possible ?** → `Oui. Je travaille à distance partout en France, le site se livre sans déplacement.`
- **CTA :** titre `Envie d'un site à la hauteur de vos projets ?`, texte `Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.`, boutons `Discuter de mon projet` (→ `/#contact`) + `Voir les tarifs` (→ `/prix-site-vitrine`).

### Bistrot et brasserie (`/site-internet/bistrot-brasserie`)
Cible `site internet bistrot` et `brasserie`. Angle de différenciation vs restaurant : convivialité, ardoise du jour / plat du jour, esprit de quartier. Exemple en ligne : Le Cerf Doré `https://cerf-dore.vercel.app/` (visuel `/projects/cerf-dore.png`).

- **Meta title :** `Création de site internet pour bistrot ou brasserie, dès 490 €`
- **Meta description :** `Un site web convivial pour votre bistrot ou brasserie : ardoise du jour, formules, horaires et visibilité sur Google. Dès 490 €. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Sites internet par métier › Site internet pour bistrot ou brasserie`
- **H1 :** `Un site internet pour votre bistrot ou brasserie`
- **Chapô :** `Un bon bistrot se vit autant qu'il se mange. Un site clair et chaleureux met en avant votre ardoise du jour, vos formules et votre ambiance, et vous rend visible sur Google quand on cherche un bistrot ou une brasserie dans le coin. Dès 490 €.`
- **Enjeux (Pourquoi un site pour votre bistrot ou brasserie) :**
  - `Sortir sur Google` : `Quand on cherche un bistrot ou une brasserie près de soi, un site bien référencé vous fait apparaître, avec votre adresse, vos horaires et votre carte.`
  - `Faire passer l'ambiance` : `Photos de la salle, du comptoir, de l'assiette : on retrouve en ligne l'esprit convivial qui fait revenir vos habitués.`
  - `Une ardoise qui change facilement` : `Plat du jour, formule de midi, suggestions : avec l'option Sérénité à 30 €/mois, la mise à jour de votre carte est comprise, il suffit de me l'envoyer.`
  - `Réservation et contact simplifiés` : `Numéro de téléphone cliquable, formulaire, lien vers votre outil de réservation : on met en avant ce qui aide à remplir la salle.`
- **FAQ :**
  1. **Combien coûte un site pour un bistrot ou une brasserie ?** → `À partir de 490 €, selon le nombre de pages, le niveau de personnalisation et les fonctionnalités. Une option de suivi à 30 €/mois prend en charge le nom de domaine, l'hébergement et les mises à jour, si vous préférez ne rien gérer. Le détail est sur la page des tarifs.`
  2. **Puis-je changer mon ardoise et mes formules régulièrement ?** → `Oui. Si vous prenez l'option Sérénité à 30 €/mois, la mise à jour de votre carte et de votre plat du jour est comprise : vous m'envoyez les changements et je les mets en ligne.`
  3. **Peut-on ajouter la réservation en ligne ?** → `Oui : lien vers votre outil de réservation, numéro de téléphone cliquable ou formulaire de contact, selon ce que vous préférez.`
  4. **Je ne suis pas à Caen, c'est possible ?** → `Oui. Je travaille à distance partout en France, le site se livre sans déplacement.`
- **CTA :** titre `Envie d'un site pour votre bistrot ?`, texte `Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.`, boutons `Discuter de mon projet` (→ `/#contact`) + `Voir les tarifs` (→ `/prix-site-vitrine`).

### Tatoueur (`/site-internet/tatoueur`)
Angle : le site prolonge l'univers graphique du studio, on juge le style avant de confier sa peau. Exemple en ligne : Madman Tattoo `https://madman-tattoo.vercel.app/` (visuel `/projects/madman-tattoo.jpg`).

- **Meta title :** `Création de site internet pour tatoueur, dès 490 €`
- **Meta description :** `Un site web à l'image de votre studio de tatouage : galerie de vos réalisations, univers, prise de rendez-vous et visibilité sur Google. Dès 490 €. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Sites internet par métier › Site internet pour tatoueur`
- **H1 :** `Un site internet pour votre activité de tatoueur`
- **Chapô :** `Pour un tatoueur, le site est le prolongement de votre univers : c'est là qu'on juge votre style avant de vous confier sa peau. Un site à votre image met en valeur votre galerie, affirme votre identité et vous rend visible sur Google quand on cherche un tatoueur dans le coin. Dès 490 €.`
- **Enjeux (Pourquoi un site à votre image pour votre studio de tatouage) :**
  - `Un site qui porte votre univers` : `Votre style fait votre signature. Un site graphique et soigné plonge le visiteur dans votre univers avant même qu'il pousse la porte du studio.`
  - `Mettre votre galerie en valeur` : `Réalisations, flashs disponibles, projets sur mesure : de belles photos bien présentées donnent envie de prendre rendez-vous avec vous plutôt qu'avec un autre.`
  - `Être trouvé sur Google` : `Quand on cherche un tatoueur dans votre ville ou un style précis, un site bien référencé vous fait apparaître, avec votre univers, vos coordonnées et votre galerie.`
  - `Faciliter la prise de rendez-vous` : `Formulaire de demande de projet, lien vers votre agenda, numéro cliquable ou renvoi vers Instagram : on met en avant ce qui déclenche le premier contact.`
- **FAQ :** prix (réponse commune) ; galerie et flashs ; Instagram ne remplace pas un site ; à distance (réponse commune).
- **CTA :** titre `Envie d'un site à l'image de votre studio ?`, texte `Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.`

### Brasserie artisanale (`/site-internet/brasserie-artisanale`)
Angle de différenciation vs bistrot et brasserie : ici on parle de production (gamme de bières, savoir-faire de brassage, points de vente), pas de restauration. Exemple en ligne : BeerBee `https://brasserie-beerbee.vercel.app/` (visuel `/projects/brasserie-beerbee.jpg`).

- **Meta title :** `Création de site internet pour brasserie artisanale, dès 490 €`
- **Meta description :** `Un site web moderne pour votre brasserie artisanale : gamme de bières, savoir-faire, points de vente et visibilité sur Google. Dès 490 €. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Sites internet par métier › Site internet pour brasserie artisanale`
- **H1 :** `Un site internet pour votre brasserie artisanale`
- **Chapô :** `Votre bière se boit d'abord avec les yeux. Un site clair et soigné présente votre gamme, raconte votre savoir-faire et indique où vous trouver, tout en vous rendant visible sur Google quand on cherche une bière artisanale ou une brasserie dans la région. Dès 490 €.`
- **Enjeux (Pourquoi un site pour votre brasserie artisanale) :**
  - `Être trouvé sur Google` : `Quand on cherche une bière artisanale ou une brasserie près de chez soi, un site bien référencé vous fait apparaître, avec votre gamme, vos points de vente et vos coordonnées.`
  - `Présenter votre gamme de bières` : `Blonde, ambrée, IPA, brassins de saison : chaque bière a sa fiche, son style, ses arômes et son degré. On donne envie de goûter avant même d'ouvrir la bouteille.`
  - `Raconter votre savoir-faire` : `Votre histoire, vos ingrédients, votre méthode de brassage et votre ancrage local : c'est ce qui distingue une bière artisanale d'une bière industrielle, et ce qui crée l'attachement.`
  - `Indiquer où vous déguster et acheter` : `Points de vente, bars partenaires, marchés, visites et dégustations à la brasserie : on met en avant tout ce qui aide vos clients à trouver vos bières.`
- **FAQ :** prix (réponse commune) ; présenter toute la gamme ; points de vente et visites ; à distance (réponse commune).
- **CTA :** titre `Envie d'un site pour votre brasserie ?`, texte `Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.`

---

## 13. Page index métiers `/site-internet` (landing « tous métiers »)

> Landing SEO large (cible `site internet commerçant / artisan`) + hub des pages métier. La page ne faisait qu'environ 130 mots pour un titre à intention commerciale forte : c'était le principal risque de contenu mince du site. Portée à environ 520 mots le 2026-08-17. Ne pas y ajouter de contenu géographique (pas de pages ni de listes de villes, cf. `SEO.md` §10). Source : `METIERS_PAGE` dans `src/content/metiers.ts`. Le fil d'ariane des pages métier passe à 3 niveaux (`Accueil › Sites internet par métier › métier`).

- **Meta title :** `Création de site internet pour commerçants et artisans, dès 490 €`
- **Meta description :** `Un site vitrine moderne pour votre commerce, quel que soit votre métier : visibilité sur Google, infos à jour, dès 490 €. Exemples par métier. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Sites internet par métier`
- **H1 :** `Un site internet pour votre métier`
- **Chapô :** `Coffee shop, restaurant, boulangerie ou toute autre activité : je conçois des sites vitrines clairs et modernes, adaptés à votre métier, qui vous rendent visible sur Google. Dès 490 €.`
- **Bloc « Le principe » (ajouté le 2026-08-17, constat P1-6) :** H2 `Ce que contient un site vitrine de commerçant`, chapô, puis 4 cartes (H3) : `Vos informations pratiques`, `Ce que vous proposez`, `Des photos de votre univers`, `Un moyen simple de vous joindre`. Contenu commun à tous les métiers, sans doublon avec les fiches.
- **Bloc « Ce qui change d'un métier à l'autre » :** H2 + 2 paragraphes expliquant où se déplace l'accent selon l'activité (carte et réservation pour un restaurant, portfolio pour un architecte, gamme et points de vente pour une brasserie), et introduisant la grille.
- **Grille :** une carte par métier (visuel + nom en **H3**), lien vers chaque page métier.
- **Bloc « tous métiers » (clôture, point clé demandé par Yan) :** titre `Votre métier n'est pas dans la liste ?`, texte `Ce ne sont que des exemples. Je conçois un site pour n'importe quelle activité : artisan, indépendant, profession libérale, association... Le principe reste le même, adapté à vos besoins.`, boutons `Parler de mon projet` (→ `/#contact`) + `Voir les tarifs` (→ `/prix-site-vitrine`).
- **Footer :** la colonne `Ressources` liste désormais `Prix d'un site vitrine` + un seul lien `Tous les métiers` (→ `/site-internet`), au lieu de lister chaque métier.

---

## 14. Page `/mentions-legales`

> Page FR uniquement, sans équivalent anglais (cf. `SEO.md` §7). Source unique du contenu : `src/content/legal.ts`. Créée suite au constat P2-3 de l'audit SEO. Laissée **indexable** à dessein : elle identifie l'entité, ce qui est un signal de confiance pour Google comme pour les moteurs de réponse (`SEO.md` §3). Présente au sitemap avec `priority: 0.2` et `changeFrequency: yearly`.
>
> **[LIMITE ASSUMÉE] Identité de l'éditeur.** La LCEN impose d'identifier l'éditeur par son nom de personne physique et par l'adresse de son siège. Yan a décidé le 2026-08-17 de ne publier **ni son nom, ni sa rue**, après avoir été informé que la page resterait de ce fait incomplète au regard de cette obligation, et que son nom est de toute façon associé publiquement au SIRET au répertoire SIRENE. Ce n'est pas un oubli : ne pas ajouter de nom ni d'adresse sans son accord explicite.

- **Meta title :** `Mentions légales`
- **Meta description :** `Mentions légales du site yan-dev.fr : éditeur, hébergeur, propriété intellectuelle et traitement des données personnelles.`
- **Fil d'ariane :** `Accueil › Mentions légales`
- **H1 :** `Mentions légales`
- **Chapô :** `Informations légales relatives au site yan-dev.fr et à son éditeur.`

### Éditeur du site
Dénomination `Yan-dev` · Forme juridique `Entreprise individuelle` · SIRET `103 986 790 00014` · Siège `Caen (14000), France` · Contact `contact@yan-dev.fr` · TVA `TVA non applicable, article 293 B du Code général des impôts`.
Corps : `Les prix indiqués sur ce site sont donc nets de taxe.`

### Directeur de la publication
`La direction de la publication est assurée par le représentant légal de Yan-dev, joignable à l'adresse contact@yan-dev.fr.`

### Hébergeur
Société `Vercel Inc.` · Adresse `440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis` · Site `vercel.com`.
Relevé le 2026-08-17 depuis la politique de confidentialité de Vercel. À revérifier si Vercel change d'entité.

### Propriété intellectuelle
Deux paragraphes : propriété des contenus du site, et statut des sites présentés à titre d'exemple (ils restent la propriété de leurs auteurs).

### Données personnelles
Trois paragraphes : ce que collecte le formulaire de contact (email, activité, message, téléphone facultatif), l'usage exclusif de réponse à la demande sans revente ni publicité, et les droits RGPD exerçables à `contact@yan-dev.fr`.

### Cookies et mesure d'audience
`Ce site n'utilise aucun cookie de mesure d'audience, aucun traceur publicitaire et aucun outil d'analyse tiers. Aucun bandeau de consentement n'est donc nécessaire.`
Cette affirmation n'est vraie que tant qu'aucun analytics n'est ajouté (`CLAUDE.md` §5). Si un outil de mesure arrive un jour, cette section doit être reprise **avant** la mise en ligne.

### Maillage
Lien dans la barre basse du footer, affiché dans **les deux langues** (l'identité de l'éditeur doit rester joignable depuis toute page), avec `lang="fr"` sur le lien et le libellé `Legal notice (French)` côté anglais.

---

## 15. Pages piliers `/site-web-creatif` et `/produit-digital`

> Pages FR uniquement, sans équivalent anglais (`SEO.md` §7). Source unique du contenu : `src/content/piliers.ts`. Structure partagée : `src/components/pages/PilierPage.tsx`, calquée sur la page prix.
>
> **Pourquoi elles existent (constat P2-10 de l'audit).** Le site annonce trois piliers, mais seul le pilier vitrine avait une page d'atterrissage (`/prix-site-vitrine`) et un réseau de pages d'intention (`/site-internet/*`). Les requêtes de l'étage 2 côté créatif et produit (`SEO.md` §2) n'avaient aucune page vers laquelle pointer.
>
> **Ne jamais opposer le créatif au vitrine sur le sur-mesure.** Les trois offres sont conçues et développées sur mesure : aucun site, même à 490 €, ne part d'un modèle. Écrire que le vitrine serait « adapté d'un modèle » ou bâti sur une « structure éprouvée » dévalorise l'offre d'entrée et est factuellement faux. Le seul critère de distinction est **l'ambition visuelle** : temps de direction artistique, animations, parcours.
>
> **Règles de véracité appliquées :** aucun tarif chiffré (les deux offres sont sur devis, donc le `Service` JSON-LD ne porte **pas** d'`offers`), aucun délai annoncé, aucune statistique, aucun témoignage. Les projets qui illustrent ces pages ne sont jamais présentés comme des commandes client.

### Structure commune

H1, chapô, puis : bloc de 4 points en H3, bloc de mise en perspective en 2 ou 3 paragraphes, exemples, FAQ de 5 questions, CTA. JSON-LD `BreadcrumbList` + `Service` + `FAQPage`.

### `/site-web-creatif`

- **Meta title (57 car.) :** `Site web créatif sur mesure, par un développeur freelance`
- **Meta description (152 car.) :** `Un site avec une vraie direction artistique : animations, interactions et univers sur mesure, sans sacrifier la lisibilité. Sur devis. Freelance à Caen.`
- **H1 :** `Un site web créatif, pensé comme une expérience`
- **Les 4 points :** direction artistique poussée, animations et interactions utiles, expérience immersive, intégrations spécifiques. Repris des features de la carte `Site créatif` (§6).
- **Bloc de perspective :** `Site vitrine ou site créatif ?`, qui assume de dire qu'un site vitrine suffit dans beaucoup de cas.
- **Exemples :** BeerBee, Madman Tattoo, Atelier Lumé, liés vers leur version en ligne.
- **FAQ :** prix sur devis, différence avec le site vitrine à 490 €, impact des animations sur la vitesse, référencement d'un site créatif, autonomie de modification.

### `/produit-digital`

- **Meta title (57 car.) :** `Développement de produit digital : MVP, SaaS, application`
- **Meta description (145 car.) :** `De l'idée au produit en ligne : MVP, SaaS, application web ou mobile, dashboard et intégrations IA. Conçu et développé en direct, sur devis.`
- **H1 :** `Transformer une idée en produit digital`
- **Les 4 points :** conception produit et MVP, SaaS et application web, application mobile, dashboard et automatisations. Repris de la carte `Produit digital` (§6).
- **Bloc de perspective :** `Comment se passe un projet produit` (cadrage, première version réduite, avancement par étapes).
- **Exemples :** CleanAI et BetaWall. BetaWall étant en construction, sa carte n'a **pas** de lien : on ne fabrique pas une destination inexistante.
- **FAQ :** coût après cadrage, contact au stade de l'idée, évolution du périmètre, propriété du produit, travail à distance.

### Maillage

- **Section Tarifs de la home :** un lien contextuel sous chaque carte, en miroir de celui du pilier vitrine. `Ce que comprend un site créatif` et `Comment se passe un projet produit`. Affichés **en français seulement**, les pages n'existant pas en anglais.
- **Footer :** les deux pages rejoignent la colonne `Ressources`, elle aussi conditionnée à `locale === "fr"`.
- **Sitemap :** ajoutées avec `priority: 0.8`, ce qui porte le sitemap à 15 URLs.

