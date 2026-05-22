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
  - Pourquoi → `#pourquoi`
  - Services → `#services`
  - Exemples → `#exemples`
  - Tarifs → `#tarifs`
  - Contact → `#contact`
- **CTA Navbar (à droite) :** bouton primaire `Discuter de mon projet` → `#contact`.

---

## 3. Section HERO

### Identifiant section
`01 — Accueil`

### Sur-titre (badge mono)
`Studio web indépendant`

### Phrase d'accroche (H1) — VALIDÉE

> Un site web clair, moderne et rapide, pensé pour vous faire trouver.

**Traitement typo (verrouillé) :**
- Police : `font-serif` (Instrument Serif), display-1, `font-medium`, `tracking-tight`, `leading-[1.05]`, couleur `text-ink-950`.
- **La partie "pensé pour vous faire trouver" est soulignée en mint.**
- **Pas d'italique** nulle part dans le H1.
- Implémentation : wrapper la fin du H1 dans un `<span>` avec `underline decoration-mint-500 decoration-[3px] underline-offset-[6px] decoration-wavy` (à tester aussi en `decoration-solid` simple — comparer en code).
- Pas de couleur sur le texte lui-même : reste `text-ink-950`. Seul le soulignement est mint.

```tsx
<h1 className="font-serif text-[clamp(2.5rem,5vw+1rem,5.5rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
  Un site web clair, moderne et rapide,{" "}
  <span className="underline decoration-mint-500 decoration-[3px] underline-offset-[6px]">
    pensé pour vous faire trouver
  </span>
  .
</h1>
```

> Tester aussi `decoration-wavy` vs `decoration-solid` — décision finale au visuel. Ne **jamais** mettre la phrase en italique.

### Sous-titre (lead)
> Je crée des sites vitrines modernes et rapides pour artisans, commerçants et indépendants — du site classique au site plus premium. Un site qui inspire confiance et vous rend visible sur Google.

### CTAs

- **Primaire :** `Discuter de mon projet` → `#contact`
- **Secondaire :** `Voir mes tarifs` → `#tarifs`

### Card de présentation (à droite du hero)

- **Avatar :** image fournie (`/public/avatar-yan.webp`), cadre `rounded-3xl` ou cercle (à tester).
- **Nom :** `Yan`
- **Sous-titre :** `Développeur web indépendant`
- **Pitch (2 lignes max) :**
  > Passionné d'informatique depuis toujours, je serai ravi de mettre mes compétences à votre service. Vous travaillez en direct avec moi, sans intermédiaire.
- **Mini-tags / chips sous le pitch :**
  - `Next.js`
  - `SEO local`
  - `Réponse sous 24h`

### Background hero
- `FallingPattern` avec couleur `var(--color-mint-500)`, blur ~1em, opacity 50-70%.
  (à tester contre `var(--color-ink-300)` pour version plus sobre.)

---

## 4. Section POURQUOI

### Identifiant
`02 — Pourquoi`

### Titre (H2)
> Pas de site web, c'est des clients qui passent à côté.

### Intro (lead, sous H2)
> Aujourd'hui, presque tout le monde cherche un commerce, un artisan ou un service sur Google avant de pousser la porte. Sans site clair et à jour, vous êtes invisible — ou pire, vous renvoyez une image qui ne vous ressemble plus.

### Liste de points (cards ou grille de 4)

**01 — Vous restez introuvable**
> Sans site bien référencé, vous n'apparaissez pas quand un client tape *"[votre métier] près de chez moi"*. Vos concurrents, eux, oui.

**02 — Vos infos sont éclatées partout**
> Horaires sur Google, menu sur Facebook, prix sur Instagram… Un site, c'est un seul endroit clair où tout est à jour.

**03 — Vous perdez en crédibilité**
> Un site daté (ou pas de site du tout) donne une impression de "ils sont encore là ?". Un site propre rassure et donne envie d'appeler.

**04 — Vous vous fondez dans la masse**
> Un site qui vous ressemble — pas un template vu mille fois — vous démarque immédiatement de la concurrence du quartier.

---

## 5. Section SERVICES

### Identifiant
`03 — Services`

### Titre (H2)
> Ce que je mets en place pour vous.

### Intro (lead)
> Tout est inclus dans l'offre de base. Pas de surprise, pas d'options cachées.

### Cartes services (4)

**01 — Site vitrine sur mesure**
> Un site one-page moderne, responsive (mobile, tablette, ordinateur), conçu autour de votre activité. Pas de template recyclé.

**02 — Référencement local de base**
> Les bases SEO bien faites : balises, structure, vitesse, fiche Google Business optimisée, schema.org local. De quoi remonter sur les recherches du coin.

**03 — Formulaire de contact**
> Un formulaire simple qui vous envoie directement les demandes par email. Protégé contre le spam, prêt à l'emploi.

**04 — Hébergement & maintenance**
> Je gère l'hébergement, les mises à jour, et les petites modifications du quotidien. Vous n'avez rien à toucher.

---

## 6. Section EXEMPLES

### Identifiant
`04 — Exemples`

### Titre (H2)
> Deux styles, une même exigence.

### Intro (lead)
> Selon votre besoin, je peux livrer un site clair et efficace pour votre commerce, ou pousser le curseur design pour les projets plus ambitieux.

### Contenu (Phase 1 — placeholders)

Carrousel ou grille de 2 cards :

**Site classique — `Boulangerie / artisan / restaurant`**
> Sobre, lisible, rapide. Mis en ligne en 2 à 3 semaines.
> *(visuel : à intégrer plus tard)*

**Site premium — `TPE / cabinet / marque`**
> Animations soignées, identité forte, expérience travaillée.
> *(visuel : à intégrer plus tard)*

> **Note technique :** au MVP, on affiche 2 cards statiques avec un placeholder visuel (gradient mint ou mockup screenshot). Le carrousel Three.js est en **phase 2** — voir `ROADMAP.md`.

---

## 7. Section TARIFS

### Identifiant
`05 — Tarifs`

### Titre (H2)
> Des tarifs clairs, sans devis à rallonge.

### Intro (lead)
> Le prix annoncé est le prix payé. Si votre projet sort du cadre, on en parle et on adapte ensemble.

### Carte tarif 1 — Site vitrine classique

- **Étiquette :** `Le plus demandé`
- **Nom de l'offre :** `Site vitrine`
- **Prix principal :** `490 €`
- **Mention sous le prix :** `paiement unique à la livraison`
- **Récurrent :** `+ 30 €/mois`
- **Mention récurrent :** `hébergement, mises à jour et modifications mineures`
- **Liste inclus :**
  - Site one-page sur mesure
  - Responsive mobile, tablette, desktop
  - SEO local de base
  - Formulaire de contact
  - Mise en ligne sous 2 à 3 semaines
- **CTA :** `Démarrer mon projet` → `#contact`

### Carte tarif 2 — Site premium / sur mesure

- **Étiquette :** `Sur mesure`
- **Nom de l'offre :** `Site premium`
- **Prix principal :** `Sur devis`
- **Mention sous le prix :** `selon ambition et fonctionnalités`
- **Description :**
  > Animations avancées, design poussé, plusieurs pages, intégrations spécifiques (réservation, boutique simple…). On échange, je vous fais une proposition adaptée.
- **CTA :** `Parlons de votre projet` → `#contact`

### Note sous les tarifs
> *Pas de frais cachés. Pas d'engagement long terme sur la maintenance — résiliable à tout moment avec un préavis d'un mois.*

---

## 8. Section CONTACT

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

## 9. Footer (bannière de fin)

- **Colonne gauche :** `Yan-dev` (mark) + petite phrase `Studio web freelance — basé à Caen, à votre service partout en France.`
- **Colonne milieu :** liens internes (mêmes que navbar).
- **Colonne droite :** contact rapide (email uniquement au MVP — pas de téléphone). Réseaux si on en ajoute (LinkedIn ? à décider, hors MVP).
- **Bas du footer :**
  - `© 2026 Yan-dev — Tous droits réservés.`
  - Liens : `Mentions légales` (page à créer plus tard, MVP : `#` ou ancre placeholder)

---

## 10. Microcopy divers

- **404 :** `Cette page n'existe pas ou n'existe plus.` + CTA `Retour à l'accueil`.
- **Submit form, erreur réseau :** `Connexion impossible. Réessayez dans un instant.`
- **Submit form, champ requis :** `Ce champ est requis.`
- **Email invalide :** `Cet email ne semble pas valide.`

---

## 11. Items à valider absolument avant prod

- [ ] Nom de domaine
- [ ] Page mentions légales (texte fourni par Yan)
- [ ] Décision finale "afficher un téléphone ou pas" (volontairement reporté)
