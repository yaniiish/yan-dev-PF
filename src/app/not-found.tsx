import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { LEGAL } from "@/content/legal";
import { HTML_LANG } from "@/content/locales";
import { METIERS_PAGE } from "@/content/metiers";
import { fontVariables } from "@/lib/fonts";
import { route } from "@/lib/routes";
import "./globals.css";

/**
 * Page 404 globale, pour toute URL ne correspondant à aucune route.
 *
 * Elle rend son propre `<html>` : le site n'a pas de root layout à la racine
 * (deux root layouts via les route groups `(fr)` et `(en)`), donc Next n'a
 * aucun layout à appliquer sur une URL non matchée.
 *
 * Servie en français, langue par défaut du site. Sans ce fichier, Next servait
 * sa page par défaut : en anglais, sans attribut `lang` et sans aucun lien de
 * reprise, ce qui laissait le visiteur dans une impasse.
 */

export const metadata: Metadata = {
  title: "Page introuvable",
  // Une 404 ne doit jamais être indexée. Next renvoie bien un vrai statut 404.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <html
      lang={HTML_LANG.fr}
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <main
          id="main"
          className="flex flex-1 items-center px-6 py-24 md:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              Erreur 404
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
              Cette page n&apos;existe pas.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              Le lien est peut-être erroné, ou la page a été déplacée. Voici de
              quoi retrouver votre chemin.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/" size="lg">
                Retour à l&apos;accueil
              </Button>
              <Button href={route("pricing", "fr")} size="lg" variant="secondary">
                Voir les tarifs
              </Button>
            </div>

            <p className="mt-8 text-sm text-ink-500">
              Vous cherchiez un site pour votre activité ?{" "}
              <a
                href={METIERS_PAGE.path}
                className="text-ink-950 underline decoration-mint-500 decoration-2 underline-offset-4 transition-colors hover:text-mint-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
              >
                {METIERS_PAGE.navLabel}
              </a>{" "}
              ou consultez les{" "}
              <a
                href={LEGAL.path}
                className="text-ink-950 underline decoration-mint-500 decoration-2 underline-offset-4 transition-colors hover:text-mint-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
              >
                mentions légales
              </a>
              .
            </p>
          </div>
        </main>
        <Footer locale="fr" />
      </body>
    </html>
  );
}
