import type { MetadataRoute } from "next";
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
      url: `${SITE_URL}/prix-site-vitrine`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // À ajouter quand créées : pages métier /site-internet/[metier], /mentions-legales...
  ];
}
