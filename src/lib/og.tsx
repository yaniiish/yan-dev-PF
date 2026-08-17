import { ImageResponse } from "next/og";
import type { Locale } from "@/content/locales";

/**
 * Rendu de l'image OpenGraph (1200x630, ratio standard des réseaux sociaux).
 *
 * ATTENTION : ce rendu n'est plus servi par une route. Les images sont figées
 * dans `public/og-image.png` (FR) et `public/og-image-en.png` (EN), déclarées
 * via `OG_IMAGE` dans `src/lib/seo.ts`. Les anciennes routes
 * `opengraph-image.tsx` servaient l'image sous un chemin haché, donc instable :
 * le JSON-LD pointait vers un 404 et 10 pages partaient sans vignette.
 *
 * Pour REGENERER les PNG après avoir modifié `OG_COPY` ci-dessous :
 *   1. recréer temporairement une route `src/app/(fr)/opengraph-image.tsx` qui
 *      exporte `runtime = "edge"`, `size = OG_SIZE` et appelle `renderOgImage`
 *   2. `npx next build && npx next start -p 3210`
 *   3. relever l'URL hachée dans le HTML de `/` puis de `/en`
 *   4. `curl -o public/og-image.png "<url>"` (idem `og-image-en.png` pour /en)
 *   5. supprimer la route temporaire, rebuilder
 *
 * Piège Satori : tout `div` à plusieurs enfants doit porter un `display`
 * explicite, sinon le rendu échoue en 500 et l'aperçu social est vide.
 */

export const OG_SIZE = { width: 1200, height: 630 };

type OgCopy = {
  /** `alt` de l'image, exporté par le fichier de route. */
  alt: string;
  kicker: string;
  headlinePre: string;
  headlineAccent: string;
  lead: string;
  availability: string;
  price: string;
};

export const OG_COPY: Record<Locale, OgCopy> = {
  fr: {
    alt: "Yan-dev : sites web créatifs et produits digitaux, freelance à Caen",
    kicker: "01 / Développeur indépendant",
    headlinePre: "Sites web créatifs &",
    headlineAccent: "produits digitaux.",
    lead: "Du site vitrine au produit digital sur mesure. Basé à Caen, projets partout en France.",
    availability: "Disponible actuellement",
    price: "Site vitrine dès 490 €",
  },
  en: {
    alt: "Yan-dev: creative websites and digital products, freelance in Caen, France",
    kicker: "01 / Independent developer",
    headlinePre: "Creative websites &",
    headlineAccent: "digital products.",
    lead: "From a simple business site to a full digital product. Based in Caen, France, working anywhere.",
    availability: "Available right now",
    price: "Websites from €490",
  },
};

export function renderOgImage(locale: Locale) {
  const copy = OG_COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px 96px",
          background:
            "linear-gradient(135deg, #F7F9F7 0%, #BFFFED 65%, #98FBCB 100%)",
          color: "#0A0F0C",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top mark */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Yan-dev
        </div>

        {/* Centered headline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#3B9D58",
              fontFamily: "monospace",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            {copy.kicker}
          </div>
          {/* Satori exige un `display` explicite sur tout div à plusieurs
              enfants. `flex` + `flexWrap` reproduit le rendu voulu : les deux
              fragments se posent sur deux lignes, comme le ferait le flux. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 88,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 960,
            }}
          >
            <span>{copy.headlinePre}&nbsp;</span>
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#5BC178",
                textDecorationThickness: 6,
                textUnderlineOffset: 12,
              }}
            >
              {copy.headlineAccent}
            </span>
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#2B332E",
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            {copy.lead}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#5C6660",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#5BC178",
              }}
            />
            <span>{copy.availability}</span>
          </div>
          <div>{copy.price}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
