import { OG_COPY, OG_SIZE, renderOgImage } from "@/lib/og";

// Variante anglaise de l'image OG, servie à `/en/opengraph-image`.
// Même rendu que la version française, baseline traduite (cf. lib/og.tsx).

export const runtime = "edge";
export const alt = OG_COPY.en.alt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return renderOgImage("en");
}
