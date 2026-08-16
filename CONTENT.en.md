# CONTENT.en.md — yan-dev (version anglaise)

> **Source unique de vérité pour les textes anglais.** Miroir partiel de `CONTENT.md`.
> Périmètre volontairement réduit : **home + page prix uniquement**. Les fiches métier
> (`/site-internet/*`) et l'index métiers restent en français, ils ciblent le SEO local
> Caen et n'ont aucune valeur pour un lecteur anglophone.
>
> Principe de traduction : **adaptation, pas calque**. Les montants restent en euros
> (c'est la devise facturée). « Caen » est systématiquement suivi de « France » pour un
> lecteur étranger. Aucun tiret cadratin.
>
> Implémentation : chaque bloc ci-dessous vit dans `src/content/*.ts`, sous la clé `en`
> d'un `Record<Locale, …>`. TypeScript refuse de compiler si une traduction manque.

---

## 0. Routes

| FR | EN |
|---|---|
| `/` | `/en` |
| `/prix-site-vitrine` | `/en/pricing` |
| `/site-internet`, `/site-internet/*` | pas de version EN |

---

## 1. Métadonnées globales — `src/app/(en)/layout.tsx`

- **Title par défaut :** `Yan-dev: modern websites for small businesses | Freelance in France`
- **Template :** `%s | Yan-dev`
- **Description :** *"Independent web studio based in Caen, France, working with clients anywhere. Fast, modern websites for makers, shop owners and small businesses: from a simple one-pager to a fully bespoke premium site. From €490."*
- **OG description :** *"Modern websites for makers, shop owners and small businesses. Based in Caen, France, working anywhere. From €490."*
- **Twitter :** `Yan-dev: modern websites for small businesses` / *"Clear, fast websites for shop owners and independents. Freelance developer based in Caen, France."*
- **Keywords :** freelance web developer France, website for small business, bespoke website designer, creative developer freelance, one page website freelance, modern business website
- **Tagline :** `Independent web studio, based in Caen, France`

---

## 2. Navbar — `src/content/site.ts`

| FR | EN |
|---|---|
| Accueil | Home |
| Mon travail | My work |
| Comment ça marche | How it works |
| Tarifs | Pricing |
| Contact | Contact |

- **CTA navbar :** `Tell me about your project`
- **Sélecteur de langue :** `FR / EN`, la langue active en `mint-700`.

---

## 3. Hero — `src/content/hero.ts`

- **H1 :** inchangé, il était déjà en anglais.
  > Creative Developer, Website Creator & Product Builder
- **Lead :** *"Creative websites, simpler business sites and digital products."*
- **Intro :** *"From a straightforward business site to a more creative web experience, all the way to a complete digital product. I design every project around its needs, its ambition and its budget, without ever cutting corners on quality."*
- **CTA primaire :** `See my work`
- **CTA secondaire :** `Start a project`

### Card de présentation

- **Rôle :** `Creative Developer · Product Builder` (inchangé)
- **Citation :** *"I like turning an idea into something real, whether it is a simple business site or a full digital product."*
  - Guillemets anglais `“ ”` et non les chevrons français.
- **Tagline :** *"You work with me directly, with no middleman."*
- **Disponibilité :** `Available right now`
- **Alt de l'avatar :** *"Portrait of Yan, independent web developer in Caen, France"*

---

## 4. Mon travail — `src/content/travail.ts`

- **Label :** `My work`
- **H2 :** *"What I build."*
- **Lead :** *"Creative websites, business sites and digital products, all designed around concrete goals."*
- **Colonnes :** `Websites` / `Products`
- Le bouton « Des exemples par métier » **n'apparaît pas** en anglais : il pointe vers `/site-internet`, qui est FR uniquement.

### Secteurs et catégories

| FR | EN |
|---|---|
| Site créatif | Creative site |
| Site vitrine créatif | Creative business site |
| Site vitrine | Business site |
| Brasserie artisanale | Craft brewery |
| Tatoueur | Tattoo artist |
| Architecte d'intérieur | Interior designer |
| Bistrot | Bistro |
| En ligne / En construction | Live / In progress |

Les titres des réalisations (BeerBee, Atelier Lumé, L'océan…) ne sont pas traduits :
ce sont des noms propres.

---

## 5. Comment ça marche — `src/content/processus.ts`

- **Label :** `How it works`
- **H2 :** *"A simple, transparent way of working."*

| # | Titre | Accroche |
|---|---|---|
| 01 | We talk | *"You walk me through your project, your needs and your constraints."* |
| 02 | I propose a direction | *"I show you what I can imagine for your project."* |
| 03 | You approve and I build | *"Happy with the direction? That is when the project really starts."* |
| 04 | Sign-off and launch | *"Everything is ready and approved."* |

L'acompte reste à **30%** (`30 %` en français, `30%` en anglais : pas d'espace insécable
avant le signe pourcent en anglais).

---

## 6. Tarifs — `src/content/pricing.ts`

- **Label :** `Pricing`
- **H2 :** *"An offer that fits each project."*
- **Lead :** *"From a simple business site to a more ambitious digital product, every project is scoped around its needs, how bespoke it should be and its budget."*
- **Lien vers la page dédiée :** `What a business site costs, in detail`

### Noms des trois offres

| FR | EN |
|---|---|
| Site vitrine | Business site |
| Site créatif | Creative site |
| Produit digital | Digital product |
| Option Sérénité | Peace of mind plan |

### Prix

| FR | EN |
|---|---|
| À partir de 490 € | From €490 |
| 30 €/mois | €30/month |
| Sur devis | On quote |

### CTA des cartes

| FR | EN |
|---|---|
| Créer mon site | Build my site |
| Imaginer mon projet | Shape my project |
| Construire mon produit | Build my product |

### Réassurance (carte Site vitrine)

> *"You are never locked in: at any point I transfer the domain name to you and hand over the site's code. **The site is yours.**"*

---

## 7. Page prix — `/en/pricing`

- **Meta title :** `How much does a business website cost? From €490`
- **Meta description :** *"What a professional business website costs: from €490, with an optional €30/month care plan. Clear pricing, no endless quotes, no hidden fees. Independent developer based in Caen, France."*
- **Fil d'ariane :** `Home` › `Website pricing`
- **H1 :** *"How much does a business website cost?"*
- **Lead :** *"At Yan-dev, a business website starts at €490. The price then depends on the number of pages, how bespoke the design is and the features you need, and you know it before we start. If you would rather not manage anything, the peace of mind plan covers it all for €30/month, cancellable at any time."*
- **Section « Pourquoi ce prix » :** `Why this price` / *"A €490 site is not a cut-price site."*
- **FAQ :** 6 questions, miroir de la FAQ française (voir `src/content/pricing.ts`).
- **CTA de fin :** *"Got a website project in mind?"* / `Tell me about your project` / `See examples`

---

## 8. Contact — `src/content/contact.ts` et `src/content/ui.ts`

- **H2 :** *"Get in touch here."*
- **Lead :** *"I reply within 24 hours on business days. No bot, no agency in between: I read your message and I answer it myself."*
- **Encarts :** `Prefer email?` / `Or on Instagram`

### Formulaire

| Champ | Label | Placeholder |
|---|---|---|
| email | Email | `you@example.com` |
| phone | Phone | `+33 6 12 34 56 78` |
| activity | Your business | `Bakery, studio, restaurant…` |
| message | Your message | `Tell me in a few lines what you have in mind.` |

- **Bouton :** `Send my request` / `Sending…`
- **Succès :** `Message received` / *"I will get back to you within 24 hours on business days."*
- **Erreur :** *"Something went wrong. Try again, or email me directly at …"*

Le mail reçu par Yan reste **en français** : c'est lui qui le lit. Il porte en revanche
une ligne `Langue : anglais` pour qu'il sache dans quelle langue répondre.

---

## 9. Footer — `src/content/site.ts`

- **Baseline :** *"Independent web studio based in Caen, France, working with clients anywhere."*
- **Colonnes :** `Navigation` / `Resources` / `Contact`
- **Mentions :** `All rights reserved.`
- La colonne Ressources n'affiche que le lien prix : l'index métiers est FR uniquement.

---

## 10. Micro-copy et accessibilité — `src/content/ui.ts`

| FR | EN |
|---|---|
| Aller au contenu | Skip to content |
| Navigation principale | Main navigation |
| Ouvrir / Fermer le menu | Open / Close menu |
| Menu de navigation | Navigation menu |
| Choisir la langue | Choose language |
| Chargement du site | Loading the site |
| Fil d'ariane | Breadcrumb |
| Voir {titre}, nouvelle fenêtre | View {title}, opens in a new window |
| À propos du tarif : {offre} | About the price: {offer} |
| À propos de : {libellé} | About: {label} |

---

## 11. Image OpenGraph — `src/lib/og.tsx`

- **Kicker :** `01 / Independent web studio`
- **Titre :** *"A website that is clear, **modern and fast.**"*
- **Lead :** *"Websites for makers, shop owners and small businesses. Based in Caen, France, working anywhere."*
- **Bas de page :** `Available right now` / `From €490`
