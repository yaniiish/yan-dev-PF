import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PROFESSIONAL_SERVICE_LD, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const TITLE_DEFAULT =
  "Yan-dev — Création de sites vitrines modernes | Freelance à Caen";
const DESCRIPTION =
  "Studio web freelance basé à Caen, opérant partout en France. Sites vitrines modernes et rapides pour artisans, commerçants et indépendants — du site simple au site premium sur mesure. À partir de 490 €.";
const OG_DESCRIPTION =
  "Sites vitrines modernes pour artisans, commerçants et indépendants. Basé à Caen, j'opère partout en France. SEO local inclus. À partir de 490 €.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s — Yan-dev",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Yan-dev",
    title: "Yan-dev — Sites vitrines modernes | Freelance à Caen",
    description: OG_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yan-dev — Sites vitrines modernes",
    description:
      "Sites vitrines clairs et rapides pour commerçants et indépendants. Freelance à Caen.",
  },
  // Tant que le domaine final n'est pas en place, on bloque l'indexation
  // (cf. ARCHITECTURE.md §3.7). À retirer à la bascule prod (Phase 1.9).
  robots: { index: false, follow: false },
  // Les fichiers src/app/icon.svg et src/app/apple-icon.png sont detectes
  // automatiquement par Next.js (App Router) — pas besoin de declarer
  // explicitement les icons ici.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F9F7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col"
        // Les extensions de navigateur (ColorZilla, ComposeAI, etc.) injectent
        // des attributs sur <body> avant que React n'hydrate, ce qui declenche
        // une erreur d'hydratation. suppressHydrationWarning ne touche que ce
        // niveau et ignore ces attributs externes. Sans effet sur le rendu.
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-ink-50 focus:outline-2 focus:outline-offset-2 focus:outline-mint-700"
        >
          Aller au contenu
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(PROFESSIONAL_SERVICE_LD),
          }}
        />
      </body>
    </html>
  );
}
