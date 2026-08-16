import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { HTML_LANG } from "@/content/locales";
import { uiContent } from "@/content/ui";
import { fontVariables } from "@/lib/fonts";
import { languageAlternates } from "@/lib/routes";
import { professionalServiceLd, SITE_URL } from "@/lib/seo";
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

const TITLE_DEFAULT =
  "Yan-dev : création de sites vitrines modernes | Freelance à Caen";
const DESCRIPTION =
  "Studio web freelance basé à Caen, opérant partout en France. Sites vitrines modernes et rapides pour artisans, commerçants et indépendants : du site simple au site premium sur mesure. À partir de 490 €.";
const OG_DESCRIPTION =
  "Sites vitrines modernes pour artisans, commerçants et indépendants. Basé à Caen, j'opère partout en France. SEO local inclus. À partir de 490 €.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Yan-dev",
  },
  description: DESCRIPTION,
  keywords: [
    "création site internet Caen",
    "site vitrine Caen",
    "site vitrine Calvados",
    "développeur web freelance Caen",
    "site web artisan",
    "site internet commerçant",
    "freelance site web one page",
    "site vitrine sur mesure",
  ],
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
    title: "Yan-dev : sites vitrines modernes | Freelance à Caen",
    description: OG_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yan-dev : sites vitrines modernes",
    description:
      "Sites vitrines clairs et rapides pour commerçants et indépendants. Freelance à Caen.",
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
    >
      <body
        className="flex min-h-full flex-col"
        // Les extensions de navigateur (ColorZilla, ComposeAI, etc.) injectent
        // des attributs sur <body> avant que React n'hydrate, ce qui declenche
        // une erreur d'hydratation. suppressHydrationWarning ne touche que ce
        // niveau et ignore ces attributs externes. Sans effet sur le rendu.
        suppressHydrationWarning
      >
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
