import type { MetadataRoute } from "next";
import { METIERS, metierPath } from "@/content/metiers";
import { PRIX_PATH } from "@/content/pricing";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${PRIX_PATH}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...METIERS.map((metier) => ({
      url: `${SITE_URL}${metierPath(metier.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // À ajouter quand créée : /mentions-legales...
  ];
}
