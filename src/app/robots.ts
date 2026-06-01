import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Robots.txt.
 *
 * Indexation ouverte depuis la mise en ligne sur le domaine `yan-dev.fr`
 * (Phase 3.3). Tout le site est autorisé au crawl.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
