# CONTENT.md — yan-dev

> **Source unique de vérité pour tous les textes affichés.** Claude Code ne doit jamais inventer ou paraphraser un wording sans validation. Si un texte manque, demander.
> Les sections marquées `[À VALIDER]` doivent être confirmées avec Yan avant de partir en code.

---

## 1. Métadonnées globales

- **Nom commercial :** Yan-dev
- **Tagline courte (meta description / OG) :**
  > *"Studio web freelance basé à Caen, opérant partout en France. Sites vitrines modernes et rapides pour artisans, commerçants et indépendants — du site simple au site premium sur mesure."*
- **Tagline mono (badge) :** `Studio web indépendant — basé à Caen`

---

## 2. Navbar

- **Logo / mark :** texte `Yan-dev` (pas de logo image).
  - Style : `font-serif` ou `font-sans font-semibold tracking-tight`. À tester en code.
- **Liens :**
  - Accueil → `#hero`
  - Mon travail → `#travail`
  - Tarifs → `#tarifs`
  - Contact → `#contact`
  > Passée de 6 à 4 liens avec la suppression de Pourquoi et Services. Ça règle au passage la navbar qui cassait sur deux lignes à 768px.
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

### Intitulé commun
> `Inclus :` au-dessus des trois listes.

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

- **Colonne gauche :** `Yan-dev` (mark) + petite phrase `Studio web freelance — basé à Caen, à votre service partout en France.`
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

- [ ] Nom de domaine
- [ ] Page mentions légales (texte fourni par Yan)
- [ ] Décision finale "afficher un téléphone ou pas" (volontairement reporté)

---

## 11. Page `/prix-site-vitrine` (V2 SEO, page d'intention)

> Page dédiée ciblant les requêtes `prix site vitrine` / `site vitrine pas cher` / `tarif site internet`. Source unique du contenu : `src/content/pricing.ts`. Réutilise les tarifs validés de la section Tarifs (cartes, footnote). Décisions Yan (2026-06) : **pas de délai de livraison annoncé**, **pas de mention de propriété du site**.

- **Meta title :** `Prix d'un site vitrine : combien ça coûte ? Dès 490 €`
- **Meta description :** `Le prix d'un site vitrine professionnel : à partir de 490 € tout compris, livré rapidement. Tarifs clairs, sans devis à rallonge ni frais cachés. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Prix d'un site vitrine`
- **H1 :** `Combien coûte un site vitrine ?`
- **Chapô :** `Un site vitrine professionnel coûte 490 € à la création chez Yan-dev, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le prix annoncé est le prix payé : pas de devis gonflé, pas de frais cachés, pas d'engagement.`

### Bloc « Le détail des tarifs »
Réutilise les deux cartes validées (`Site vitrine` 490 € + 30 €/mois ; `Site premium` sur devis) et la footnote.

### Bloc « Pourquoi ce prix »
- **Titre :** `Un site à 490 €, ce n'est pas un site au rabais.`
- **Corps :** `Le prix vient du format (un site clair, sur mesure, sans intermédiaire ni surcouche inutile). Vous avez un code moderne, un site rapide, responsive et référencé localement.`

### Bloc FAQ (alimente le schema FAQPage)
1. **Combien coûte un site vitrine ?** → `Chez Yan-dev, un site vitrine sur mesure coûte 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour mineures. Le tarif est annoncé d'avance, sans surprise.`
2. **Qu'est-ce qui est compris dans le prix ?** → `Le site sur mesure, responsive (mobile, tablette, ordinateur), le référencement de base, un formulaire de contact et la mise en ligne. Le nom de domaine et l'hébergement sont inclus dans l'abonnement mensuel.`
3. **Y a-t-il un engagement ?** → `Non. L'abonnement mensuel est résiliable à tout moment, avec un préavis d'un mois.`
4. **Un site pas cher est-il vraiment professionnel ?** → `Oui. Le tarif bas vient du format (un site vitrine clair, sur mesure, en direct sans agence), pas d'un travail bâclé : code moderne, performances et référencement local soignés.`
5. **Et pour un site plus ambitieux ?** → `C'est possible, sur devis : animations avancées, design poussé, réservation ou boutique simple. On en discute et je vous fais une proposition adaptée.`

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
  1. **Combien coûte un site pour un coffee shop ?** → `À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.`
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
  - `Une carte qui évolue sans surcoût` : `Vous changez de menu chaque saison ? La mise à jour de la carte est comprise dans l'abonnement de 30 €/mois, il suffit de me l'envoyer.`
  - `Réservation et contact simplifiés` : `Numéro de téléphone cliquable, formulaire, lien vers votre outil de réservation : on met en avant ce qui aide à remplir la salle.`
- **FAQ :**
  1. **Combien coûte un site pour un restaurant ?** → `À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.`
  2. **Puis-je changer ma carte régulièrement ?** → `Oui. La mise à jour de votre carte est comprise dans l'abonnement de 30 €/mois : vous m'envoyez les changements et je les mets en ligne.`
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
  1. **Combien coûte un site pour un architecte d'intérieur ?** → `À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.`
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
  - `Une ardoise qui change sans surcoût` : `Plat du jour, formule de midi, suggestions : la mise à jour de votre carte est comprise dans l'abonnement de 30 €/mois, il suffit de me l'envoyer.`
  - `Réservation et contact simplifiés` : `Numéro de téléphone cliquable, formulaire, lien vers votre outil de réservation : on met en avant ce qui aide à remplir la salle.`
- **FAQ :**
  1. **Combien coûte un site pour un bistrot ou une brasserie ?** → `À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.`
  2. **Puis-je changer mon ardoise et mes formules régulièrement ?** → `Oui. La mise à jour de votre carte et de votre plat du jour est comprise dans l'abonnement de 30 €/mois : vous m'envoyez les changements et je les mets en ligne.`
  3. **Peut-on ajouter la réservation en ligne ?** → `Oui : lien vers votre outil de réservation, numéro de téléphone cliquable ou formulaire de contact, selon ce que vous préférez.`
  4. **Je ne suis pas à Caen, c'est possible ?** → `Oui. Je travaille à distance partout en France, le site se livre sans déplacement.`
- **CTA :** titre `Envie d'un site pour votre bistrot ?`, texte `Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.`, boutons `Discuter de mon projet` (→ `/#contact`) + `Voir les tarifs` (→ `/prix-site-vitrine`).

---

## 13. Page index métiers `/site-internet` (landing « tous métiers »)

> Landing SEO large (cible `site internet commerçant / artisan`) + hub des pages métier. Source : `METIERS_PAGE` dans `src/content/metiers.ts`. Le fil d'ariane des pages métier passe à 3 niveaux (`Accueil › Sites internet par métier › métier`).

- **Meta title :** `Création de site internet pour commerçants et artisans, dès 490 €`
- **Meta description :** `Un site vitrine moderne pour votre commerce, quel que soit votre métier : visibilité sur Google, infos à jour, dès 490 €. Exemples par métier. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Sites internet par métier`
- **H1 :** `Un site internet pour votre métier`
- **Chapô :** `Coffee shop, restaurant, boulangerie ou toute autre activité : je conçois des sites vitrines clairs et modernes, adaptés à votre métier, qui vous rendent visible sur Google. Dès 490 €.`
- **Grille :** une carte par métier (visuel + nom), lien vers chaque page métier.
- **Bloc « tous métiers » (clôture, point clé demandé par Yan) :** titre `Votre métier n'est pas dans la liste ?`, texte `Ce ne sont que des exemples. Je conçois un site pour n'importe quelle activité : artisan, indépendant, profession libérale, association... Le principe reste le même, adapté à vos besoins.`, boutons `Parler de mon projet` (→ `/#contact`) + `Voir les tarifs` (→ `/prix-site-vitrine`).
- **Footer :** la colonne `Ressources` liste désormais `Prix d'un site vitrine` + un seul lien `Tous les métiers` (→ `/site-internet`), au lieu de lister chaque métier.
