import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { HTML_LANG, OG_LOCALE } from "@/content/locales";
import { uiContent } from "@/content/ui";
import { fontVariables } from "@/lib/fonts";
import { websiteLd } from "@/lib/jsonld";
import { languageAlternates, ROUTES } from "@/lib/routes";
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_SIZE,
  professionalServiceLd,
  SITE_URL,
} from "@/lib/seo";
import "../globals.css";

/**
 * Root layout anglais, jumeau de `src/app/(fr)/layout.tsx`. Deux root layouts
 * séparés permettent un `<html lang>` correct par langue sans middleware.
 *
 * Le périmètre anglais est volontairement réduit à la home et à la page prix :
 * les pages métier ciblent le SEO local français et n'ont pas d'équivalent ici.
 */

const LOCALE = "en" as const;

// Miroir du français. L'anglais reste un confort de lecture et ne cible aucun
// mot-clé (SEO.md §7) : on traduit l'intention, on n'optimise pas.
const TITLE_DEFAULT =
  "Freelance web developer in France: web and digital products";
const DESCRIPTION =
  "Business websites from €490, bespoke creative sites and digital products. Independent developer based in Caen, France, working with clients anywhere.";
const OG_DESCRIPTION =
  "Business websites from €490, creative sites and digital products. Independent developer in Caen, France, projects anywhere.";

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
    canonical: ROUTES.home.en,
    languages: languageAlternates("home"),
  },
  openGraph: {
    type: "website",
    locale: OG_LOCALE[LOCALE],
    url: new URL(ROUTES.home.en, SITE_URL).toString(),
    siteName: "Yan-dev",
    title: "Yan-dev: creative websites and digital products",
    description: OG_DESCRIPTION,
    images: [{ url: OG_IMAGE.en, ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT.en }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yan-dev: creative websites and digital products",
    description: OG_DESCRIPTION,
    images: [OG_IMAGE.en],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F9F7",
};

export default function EnRootLayout({
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
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
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
