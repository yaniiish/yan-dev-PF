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
> Le prix annoncé est le prix payé, et je gère tout de A à Z : vous n'avez rien à faire. Si votre projet sort du cadre, on en parle et on adapte ensemble.

### Carte tarif 1 — Essentiel

- **Étiquette :** `Sans abonnement`
- **Nom de l'offre :** `Essentiel`
- **Prix principal :** `690 €`
- **Mention sous le prix :** `en une fois · nom de domaine et hébergement inclus la première année`
- **Précision (mise en avant sous le prix) :** `Après 1 an : vous reprenez la main, je vous cède tout ou bien vous passez au Pack Sérénité.`
- **Liste inclus :**
  - Site moderne et rapide sur mesure
  - Responsive mobile, tablette, desktop
  - SEO de base
  - Formulaire de contact
  - Mise en ligne rapide
- **CTA :** `Démarrer mon projet` → `#contact`

### Carte tarif 2 — Pack Sérénité (mise en avant)

- **Étiquette :** `Conseillé`
- **Nom de l'offre :** `Pack Sérénité`
- **Prix principal :** `490 €`
- **Mention sous le prix :** `à la création`
- **Récurrent :** `+ 30 €/mois`
- **Mention récurrent :** `sans engagement, résiliable à tout moment (préavis 1 mois)`
- **Liste inclus :**
  - Tout ce qui est inclus dans l'offre Essentiel
  - Nom de domaine & hébergement gérés en continu
  - Modifications mineures illimitées sous 48h *(infobulle (i) au survol/tap : « Les modifications mineures : texte, photo, horaires, prix, un plat au menu, etc. L'ajout de page, la refonte du design ou une nouvelle fonctionnalité font l'objet d'un devis à part. »)*
- **CTA :** `Choisir le suivi` → `#contact`

### Carte tarif 3 — Projet premium / sur mesure

- **Étiquette :** *(aucune)*
- **Nom de l'offre :** `Projet premium`
- **Prix principal :** `Sur devis`
- **Mention sous le prix :** `selon ambition et fonctionnalités`
- **Liste inclus :**
  - Design poussé et animations avancées
  - Réservation, mini-boutique, intégrations spécifiques
  - Projets de plus grande envergure
  - On échange, je vous fais une proposition adaptée
  - Applications
  - Agents IA
- **CTA :** `Parlons de votre projet` → `#contact`

### Note sous les tarifs
> *Vous n'êtes jamais prisonnier : à tout moment, je vous transfère le nom de domaine à votre nom et vous cède le code du site. Le site est à vous.*

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

## 12. Page `/prix-site-vitrine` (V2 SEO, page d'intention)

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

## 13. Pages métier `/site-internet/[metier]` (V2 SEO, longue traîne)

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

## 14. Page index métiers `/site-internet` (landing « tous métiers »)

> Landing SEO large (cible `site internet commerçant / artisan`) + hub des pages métier. Source : `METIERS_PAGE` dans `src/content/metiers.ts`. Le fil d'ariane des pages métier passe à 3 niveaux (`Accueil › Sites internet par métier › métier`).

- **Meta title :** `Création de site internet pour commerçants et artisans, dès 490 €`
- **Meta description :** `Un site vitrine moderne pour votre commerce, quel que soit votre métier : visibilité sur Google, infos à jour, dès 490 €. Exemples par métier. Freelance à Caen, partout en France.`
- **Fil d'ariane :** `Accueil › Sites internet par métier`
- **H1 :** `Un site internet pour votre métier`
- **Chapô :** `Coffee shop, restaurant, boulangerie ou toute autre activité : je conçois des sites vitrines clairs et modernes, adaptés à votre métier, qui vous rendent visible sur Google. Dès 490 €.`
- **Grille :** une carte par métier (visuel + nom), lien vers chaque page métier.
- **Bloc « tous métiers » (clôture, point clé demandé par Yan) :** titre `Votre métier n'est pas dans la liste ?`, texte `Ce ne sont que des exemples. Je conçois un site pour n'importe quelle activité : artisan, indépendant, profession libérale, association... Le principe reste le même, adapté à vos besoins.`, boutons `Parler de mon projet` (→ `/#contact`) + `Voir les tarifs` (→ `/prix-site-vitrine`).
- **Footer :** la colonne `Ressources` liste désormais `Prix d'un site vitrine` + un seul lien `Tous les métiers` (→ `/site-internet`), au lieu de lister chaque métier.
