import type { MetadataRoute } from "next";
import { HREFLANG } from "@/content/locales";
import { METIERS, METIERS_PAGE, metierPath } from "@/content/metiers";
import { ROUTES, type RouteKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Alternates d'une page bilingue, au format attendu par le sitemap
 * (URLs absolues, une clé par hreflang). Les pages FR-only n'en déclarent pas.
 */
function alternatesFor(key: RouteKey) {
  return {
    languages: {
      [HREFLANG.fr]: absolute(ROUTES[key].fr),
      [HREFLANG.en]: absolute(ROUTES[key].en),
      "x-default": absolute(ROUTES[key].fr),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absolute(ROUTES.home.fr),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: alternatesFor("home"),
    },
    {
      url: absolute(ROUTES.home.en),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: alternatesFor("home"),
    },
    {
      url: absolute(ROUTES.pricing.fr),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternatesFor("pricing"),
    },
    {
      url: absolute(ROUTES.pricing.en),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternatesFor("pricing"),
    },
    // Pages FR uniquement : SEO local, pas de contrepartie anglaise, donc
    // aucun alternate à déclarer.
    {
      url: absolute(METIERS_PAGE.path),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...METIERS.map((metier) => ({
      url: absolute(metierPath(metier.slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // À ajouter quand créée : /mentions-legales...
  ];
}
