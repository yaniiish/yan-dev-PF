import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { HTML_LANG, OG_LOCALE } from "@/content/locales";
import { uiContent } from "@/content/ui";
import { fontVariables } from "@/lib/fonts";
import { languageAlternates, ROUTES } from "@/lib/routes";
import { professionalServiceLd, SITE_URL } from "@/lib/seo";
import "../globals.css";

/**
 * Root layout anglais, jumeau de `src/app/(fr)/layout.tsx`. Deux root layouts
 * séparés permettent un `<html lang>` correct par langue sans middleware.
 *
 * Le périmètre anglais est volontairement réduit à la home et à la page prix :
 * les pages métier ciblent le SEO local français et n'ont pas d'équivalent ici.
 */

const LOCALE = "en" as const;

const TITLE_DEFAULT =
  "Yan-dev: modern websites for small businesses | Freelance in France";
const DESCRIPTION =
  "Independent web studio based in Caen, France, working with clients anywhere. Fast, modern websites for makers, shop owners and small businesses: from a simple one-pager to a fully bespoke premium site. From €490.";
const OG_DESCRIPTION =
  "Modern websites for makers, shop owners and small businesses. Based in Caen, France, working anywhere. From €490.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Yan-dev",
  },
  description: DESCRIPTION,
  keywords: [
    "freelance web developer France",
    "website for small business",
    "bespoke website designer",
    "creative developer freelance",
    "one page website freelance",
    "modern business website",
  ],
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
    title: "Yan-dev: modern websites for small businesses",
    description: OG_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yan-dev: modern websites for small businesses",
    description:
      "Clear, fast websites for shop owners and independents. Freelance developer based in Caen, France.",
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
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <SiteLoader locale={LOCALE} />
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
      </body>
    </html>
  );
}
