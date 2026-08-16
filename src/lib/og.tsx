import { ImageResponse } from "next/og";
import type { Locale } from "@/content/locales";

/**
 * Rendu partagé de l'image OpenGraph (1200×630, ratio standard
 * Facebook/Twitter/LinkedIn). Les deux route groups exposent chacun un
 * `opengraph-image.tsx` mince qui appelle ce rendu avec sa baseline.
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
    alt: "Yan-dev : studio web freelance à Caen",
    kicker: "01 / Studio web indépendant",
    headlinePre: "Un site web clair,",
    headlineAccent: "moderne et rapide.",
    lead: "Sites vitrines pour artisans, commerçants et indépendants. Basé à Caen, partout en France.",
    availability: "Disponible actuellement",
    price: "À partir de 490 €",
  },
  en: {
    alt: "Yan-dev: independent web studio in Caen, France",
    kicker: "01 / Independent web studio",
    headlinePre: "A website that is clear,",
    headlineAccent: "modern and fast.",
    lead: "Websites for makers, shop owners and small businesses. Based in Caen, France, working anywhere.",
    availability: "Available right now",
    price: "From €490",
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
