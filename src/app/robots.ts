import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Robots.txt.
 *
 * **Tant que le domaine n'est pas acheté**, on bloque l'indexation côté
 * `robots.ts` ET côté metadata.robots pour ne pas indexer l'URL
 * `.vercel.app` provisoire. À basculer en `allow: "/"` lors de l'étape
 * Phase 1.9 (ROADMAP).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
