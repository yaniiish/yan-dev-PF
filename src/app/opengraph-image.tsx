import { ImageResponse } from "next/og";

// Génère dynamiquement l'image OG à l'URL `/opengraph-image`.
// Next.js l'injecte automatiquement dans les meta og:image et twitter:image.
// 1200×630 = ratio standard Facebook/Twitter/LinkedIn.

export const runtime = "edge";
export const alt = "Yan-dev : studio web freelance à Caen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
            01 / Studio web indépendant
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 960,
            }}
          >
            Un site web clair,{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#5BC178",
                textDecorationThickness: 6,
                textUnderlineOffset: 12,
              }}
            >
              moderne et rapide.
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
            Sites vitrines pour artisans, commerçants et indépendants. Basé à
            Caen, partout en France.
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
            <span>Disponible actuellement</span>
          </div>
          <div>À partir de 490 €</div>
        </div>
      </div>
    ),
    size,
  );
}
