import { OG_COPY, OG_SIZE, renderOgImage } from "@/lib/og";

// Génère dynamiquement l'image OG à l'URL `/opengraph-image`.
// Next.js l'injecte automatiquement dans les meta og:image et twitter:image.
// Le rendu est partagé avec la variante anglaise (cf. lib/og.tsx).

export const runtime = "edge";
export const alt = OG_COPY.fr.alt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return renderOgImage("fr");
}
