import { HREFLANG, type Locale } from "@/content/locales";

/**
 * Table des routes bilingues. Source unique pour la navigation, le sélecteur
 * de langue, les hreflang et le sitemap.
 *
 * Le français reste à la racine (`/`, `/prix-site-vitrine`) : les URLs déjà
 * indexées ne bougent pas. L'anglais vit sous `/en` avec des slugs traduits.
 */
export const ROUTES = {
  home: { fr: "/", en: "/en" },
  pricing: { fr: "/prix-site-vitrine", en: "/en/pricing" },
} as const;

export type RouteKey = keyof typeof ROUTES;

/**
 * Routes qui n'existent qu'en français : elles ciblent le SEO local (Caen,
 * métiers) et n'ont pas d'équivalent anglais. Elles ne déclarent donc aucun
 * hreflang, et le sélecteur de langue y renvoie vers la home.
 */
export const FR_ONLY_ROUTES = {
  metiers: "/site-internet",
} as const;

export function route(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

export function homePath(locale: Locale): string {
  return ROUTES.home[locale];
}

/**
 * Href d'une ancre de section (#travail, #contact...).
 * Hors de la home, l'ancre seule ne mène nulle part : elle doit être préfixée
 * par la home **de la locale courante**, sinon un visiteur anglais atterrit
 * sur la page française.
 */
export function anchorHref(
  hash: string,
  locale: Locale,
  isHome: boolean,
): string {
  if (isHome) return hash;
  return locale === "fr" ? `/${hash}` : `${ROUTES.home.en}${hash}`;
}

/**
 * `alternates.languages` d'une page bilingue : chaque langue plus le
 * `x-default` qui pointe sur le français, langue par défaut du site.
 */
export function languageAlternates(key: RouteKey): Record<string, string> {
  return {
    [HREFLANG.fr]: ROUTES[key].fr,
    [HREFLANG.en]: ROUTES[key].en,
    "x-default": ROUTES[key].fr,
  };
}

/**
 * Équivalent de `pathname` dans l'autre langue, pour le sélecteur.
 * Repli sur la home quand la page n'existe pas dans la langue cible
 * (fiches métier, index métiers).
 */
export function counterpartPath(pathname: string, target: Locale): string {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    const paths = ROUTES[key];
    if (paths.fr === normalized || paths.en === normalized) {
      return paths[target];
    }
  }

  return homePath(target);
}
