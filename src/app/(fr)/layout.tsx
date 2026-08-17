import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { HTML_LANG } from "@/content/locales";
import { uiContent } from "@/content/ui";
import { fontVariables } from "@/lib/fonts";
import { websiteLd } from "@/lib/jsonld";
import { languageAlternates } from "@/lib/routes";
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_SIZE,
  professionalServiceLd,
  SITE_URL,
} from "@/lib/seo";
import "../globals.css";

/**
 * Root layout français. Le site a deux root layouts (route groups `(fr)` et
 * `(en)`) : c'est ce qui permet un `<html lang>` correct par langue sans
 * middleware ni rendu dynamique. Voir aussi `src/app/(en)/layout.tsx`.
 *
 * Le groupe `(fr)` est transparent dans l'URL : les pages restent servies sur
 * `/`, `/prix-site-vitrine`, `/site-internet/...`.
 */

const LOCALE = "fr" as const;

// Le title garde l'ancrage « Caen » (règle d'or géographique, SEO.md §2) et
// annonce les trois piliers. Longueurs calées sur SEO.md §3 : title 60 car,
// description 154 car, donc affichées en entier dans les résultats.
const TITLE_DEFAULT =
  "Développeur web freelance à Caen, sites et produits digitaux";
const DESCRIPTION =
  "Sites vitrines dès 490 €, sites créatifs sur mesure et produits digitaux. Développeur indépendant à Caen, en direct sans intermédiaire, partout en France.";
const OG_DESCRIPTION =
  "Sites vitrines dès 490 €, sites créatifs et produits digitaux. Développeur indépendant à Caen, projets partout en France.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Yan-dev",
  },
  description: DESCRIPTION,
  authors: [{ name: "Yan", url: SITE_URL }],
  creator: "Yan",
  publisher: "Yan-dev",
  alternates: {
    canonical: "/",
    languages: languageAlternates("home"),
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Yan-dev",
    title: "Yan-dev : sites web créatifs et produits digitaux",
    description: OG_DESCRIPTION,
    images: [
      { url: OG_IMAGE.fr, ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT.fr },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yan-dev : sites web créatifs et produits digitaux",
    description: OG_DESCRIPTION,
    images: [OG_IMAGE.fr],
  },
  // Indexation ouverte depuis la mise en ligne sur yan-dev.fr (Phase 3.3).
  robots: { index: true, follow: true },
  // Les fichiers src/app/icon.svg et src/app/apple-icon.png sont detectes
  // automatiquement par Next.js (App Router), pas besoin de declarer
  // explicitement les icons ici.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F9F7",
};

export default function FrRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ui = uiContent(LOCALE);

  return (
    <html
      lang={HTML_LANG[LOCALE]}
      className={`${fontVariables} h-full antialiased`}
      // `data-loader-seen` est posé par le script inline ci-dessous, avant
      // l'hydratation. Sans ceci, React considère l'attribut comme un écart
      // avec le HTML serveur et le retire : le CSS de masquage cesse alors de
      // s'appliquer et l'écran de chargement réapparaît à chaque navigation.
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col"
        // Les extensions de navigateur (ColorZilla, ComposeAI, etc.) injectent
        // des attributs sur <body> avant que React n'hydrate, ce qui declenche
        // une erreur d'hydratation. suppressHydrationWarning ne touche que ce
        // niveau et ignore ces attributs externes. Sans effet sur le rendu.
        suppressHydrationWarning
      >
        {/* Synchrone et avant l'écran de chargement : si la session l'a
            déjà vu, l'attribut est posé avant le premier paint et le CSS le
            masque, ce qui évite tout clignotement à chaque navigation. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('yd:loader-seen')==='1'){document.documentElement.setAttribute('data-loader-seen','')}}catch(e){}",
          }}
        />
        <SiteLoader locale={LOCALE} />
        {/* Sans JS, Motion ne joue jamais l'entrée du Hero et son état
            initial resterait appliqué : le H1 serait invisible. */}
        <noscript>
          <style>{`#hero * { transform: none !important; opacity: 1 !important; }`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-ink-50 focus:outline-2 focus:outline-offset-2 focus:outline-mint-700"
        >
          {ui.skipToContent}
        </a>
        <Navbar locale={LOCALE} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={LOCALE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceLd(LOCALE)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteLd(LOCALE)),
          }}
        />
      </body>
    </html>
  );
}
