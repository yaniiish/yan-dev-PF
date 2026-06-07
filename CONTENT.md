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

> **Note** : pas de `SectionLabel` numéroté en haut du Hero (décision Phase 1.4a — pas pertinent en première section). Les autres sections gardent leur SectionLabel.

### Phrase d'accroche (H1) — VALIDÉE Phase 1.4a

> Un site web clair, moderne et rapide.

**Traitement typo (verrouillé) :**
- Police : `font-serif` (Instrument Serif), display-1, `font-medium`, `tracking-tight`, `leading-[1.05]`, couleur `text-ink-950`.
- **La partie "moderne et rapide." est soulignée en mint** pour donner du caractère à la phrase d'accroche.
- **Pas d'italique** nulle part dans le H1.
- Implémentation : wrapper la fin du H1 dans un `<span>` avec `underline decoration-mint-500 decoration-[3px] underline-offset-[6px]` (decoration solide, pas wavy).
- Pas de couleur sur le texte lui-même : reste `text-ink-950`. Seul le soulignement est mint.

```tsx
<h1 className="font-serif text-[clamp(2.5rem,5vw+1rem,5.5rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
  Un site web clair,{" "}
  <span className="underline decoration-mint-500 decoration-[3px] underline-offset-[6px]">
    moderne et rapide.
  </span>
</h1>
```

### Sous-titre (lead)
> Je crée des sites vitrines modernes et rapides pour artisans, commerçants et indépendants — du site classique au site plus premium. Un site qui inspire confiance et vous rend visible sur Google.

### CTAs

- **Primaire :** `Discuter de mon projet` → `#contact`
- **Secondaire :** `Voir mes tarifs` → `#tarifs`

### Card de présentation (à droite du hero)

- **Avatar :** image fournie (`/public/avatar/avatar-yan.JPG`), **rond** (`rounded-full`), petite taille (~56px) à gauche du bloc nom+rôle.
- **Nom :** `Yan` (font-serif, ~xl)
- **Rôle :** `DÉVELOPPEUR · INDÉPENDANT` en mono mint uppercase tracking-widest (style cohérent avec les SectionLabel).
- **Citation entre guillemets français `«&nbsp;»`, font-serif :**
  > Passionné d'informatique depuis toujours, je serai ravi de mettre mes compétences à votre service.
- **Sous-tagline (sous la citation, plus discrète) :**
  > Je travaille en direct, sans intermédiaire.
- **Indicateur de disponibilité (en bas, séparé par une fine bordure) :** point mint pulsant (`animate-ping`) + texte `Disponible actuellement`.
- **Plus de chips Next.js / SEO local / Réponse sous 24h** (trop technique pour la cible).
- **Comportement :** la card est légèrement inclinée (`-rotate-[3deg]`) et se redresse au hover (`hover:rotate-0`, transition 500ms ease-out).

### Background hero
- `<BGPattern variant="grid" mask="fade-edges" />` avec fill en `color-mix(in oklch, var(--color-ink-300) 50%, transparent)` pour rester subtil sous le texte. Validé Phase 1.2 contre FallingPattern.
- Section en `relative overflow-hidden min-h-[100svh]` (PC), contenu en `relative z-10` top-aligné avec un `pt` qui laisse respirer la navbar.

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

---

## 12. Page `/prix-site-vitrine` (V2 SEO — page d'intention)

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
- **Corps :** `Le prix vient du format — un site clair, sur mesure, sans intermédiaire ni surcouche inutile —, pas de la qualité. Vous avez un code moderne, un site rapide, responsive et référencé localement.`

### Bloc FAQ (alimente le schema FAQPage)
1. **Combien coûte un site vitrine ?** — `Chez Yan-dev, un site vitrine sur mesure coûte 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour mineures. Le tarif est annoncé d'avance, sans surprise.`
2. **Qu'est-ce qui est compris dans le prix ?** — `Le site sur mesure, responsive (mobile, tablette, ordinateur), le référencement de base, un formulaire de contact et la mise en ligne. Le nom de domaine et l'hébergement sont inclus dans l'abonnement mensuel.`
3. **Y a-t-il un engagement ?** — `Non. L'abonnement mensuel est résiliable à tout moment, avec un préavis d'un mois.`
4. **Un site pas cher est-il vraiment professionnel ?** — `Oui. Le tarif bas vient du format — un site vitrine clair, sur mesure, en direct sans agence —, pas d'un travail bâclé : code moderne, performances et référencement local soignés.`
5. **Et pour un site plus ambitieux ?** — `C'est possible, sur devis : animations avancées, design poussé, réservation ou boutique simple. On en discute et je vous fais une proposition adaptée.`

### Bloc CTA
- **Titre :** `Un projet de site en tête ?`
- **Texte :** `Dites-moi votre activité en deux lignes, je vous réponds avec une estimation claire.`
- **Boutons :** `Discuter de mon projet` (→ `/#contact`) + `Voir des exemples` (→ `/#exemples`)
