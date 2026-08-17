"use client";

import { useEffect, useState } from "react";
import { BGPattern } from "@/components/backgrounds/BGPattern";
import type { Locale } from "@/content/locales";
import { uiContent } from "@/content/ui";
import { SITE_LOADED_ATTRIBUTE, SITE_LOADED_EVENT } from "@/lib/siteLoaded";

/**
 * Timing de l'écran, **aligné sur `globals.css`** (`--loader-hold` et
 * `--loader-out`). Le fondu de sortie est joué en CSS : il part à un instant
 * fixe de la timeline du document, comme l'entrée du Hero, donc les deux
 * mouvements se croisent toujours.
 *
 * Ces constantes ne servent qu'à retirer l'écran du DOM une fois le fondu
 * terminé, et à rendre le scroll au moment où il commence.
 */
/** Au delà, on retire l'écran quoi qu'il arrive. */
const MAX_DURATION_MS = 4000;

/**
 * Clé de session. L'écran ne se joue qu'à la **première arrivée** sur le site,
 * pas à chaque navigation.
 *
 * C'est nécessaire parce que toute la navigation interne se fait en `<a>`
 * natifs et non en `next/link` : chaque clic recharge la page entièrement, ce
 * qui rejouait l'écran à chaque fois. `sessionStorage` et non `localStorage` :
 * l'écran doit revenir à la prochaine visite, c'est un élément de marque.
 *
 * Le masquage immédiat est assuré par le script inline des root layouts, qui
 * pose LOADER_SEEN_ATTRIBUTE sur <html> avant le premier paint. Sans lui,
 * l'écran apparaîtrait un instant avant que React ne le retire.
 */
export const LOADER_SESSION_KEY = "yd:loader-seen";
export const LOADER_SEEN_ATTRIBUTE = "data-loader-seen";

/** Cadre du logo (public/logo.svg) redessiné en path pour animer le tracé. */
const FRAME_PATH =
  "M 29 9 H 71 A 20 20 0 0 1 91 29 V 71 A 20 20 0 0 1 71 91 H 29 A 20 20 0 0 1 9 71 V 29 A 20 20 0 0 1 29 9 Z";
const DOTS_X = [25, 36, 47];

function markLoaded() {
  document.documentElement.setAttribute(SITE_LOADED_ATTRIBUTE, "");
  window.dispatchEvent(new Event(SITE_LOADED_EVENT));
  try {
    sessionStorage.setItem(LOADER_SESSION_KEY, "1");
  } catch {
    // Navigation privée ou stockage refusé : l'écran se rejouera.
  }
}

export function SiteLoader({ locale }: { locale: Locale }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isReleased, setIsReleased] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(LOADER_SESSION_KEY) === "1";
    } catch {
      // Stockage indisponible : l'écran se rejouera, ce n'est pas bloquant.
    }

    // NE PAS poser LOADER_SEEN_ATTRIBUTE ici : il pilote `--hero-delay`, et
    // l'ajouter à chaud ferait sauter l'entrée du Hero à son état final. Seul
    // le script inline des layouts le pose, avant le premier paint.
    if (alreadySeen) {
      const t = window.setTimeout(() => {
        setIsReleased(true);
        setIsVisible(false);
        markLoaded();
      }, 0);
      return () => window.clearTimeout(t);
    }

    // Filet de sécurité : si l'animation CSS ne se déclenche pas (feuille de
    // style absente, moteur exotique), l'écran ne doit pas rester bloqué.
    const failsafe = window.setTimeout(() => {
      setIsReleased(true);
      setIsVisible(false);
      markLoaded();
    }, MAX_DURATION_MS);
    return () => window.clearTimeout(failsafe);
  }, []);

  // Verrouille le scroll tant que l'écran de chargement couvre la page.
  useEffect(() => {
    if (!isVisible || isReleased) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isVisible, isReleased]);

  return (
    <>
      {/* Sans JS, aucun effet ne retire l'overlay : on le neutralise en CSS. */}
      <noscript>
        <style>{"[data-site-loader]{display:none!important}"}</style>
      </noscript>

      {isVisible ? (
        <div
          data-site-loader
          role="status"
          aria-live="polite"
          // C'est l'animation CSS qui pilote, pas un minuteur : elle seule
          // connaît l'instant exact où le fondu commence et se termine. Un
          // `setTimeout` calé sur l'hydratation démontait l'écran avant la fin
          // du fondu, ce qui le faisait disparaître d'un coup.
          onAnimationStart={(e) => {
            if (e.target === e.currentTarget) {
              setIsReleased(true);
              markLoaded();
            }
          }}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget) setIsVisible(false);
          }}
            className="site-loader fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-ink-50"
          >
            <BGPattern
              variant="grid"
              mask="fade-edges"
              fill="color-mix(in oklch, var(--color-ink-300) 50%, transparent)"
            />

            <div className="relative z-10 flex flex-col items-center gap-8">
              <svg
                viewBox="0 0 100 100"
                className="size-20 text-mint-500 md:size-24"
                aria-hidden="true"
              >
                <path
                  className="loader-frame"
                  d={FRAME_PATH}
                  pathLength={1}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={6.5}
                  strokeLinecap="round"
                />

                {DOTS_X.map((cx, index) => (
                  <circle
                    key={cx}
                    className="loader-dot"
                    cx={cx}
                    cy={27}
                    r={3.1}
                    fill="currentColor"
                    // Délai calculé par index : cascade des trois points,
                    // terminée avant la fin du tracé du cadre.
                    style={{ animationDelay: `${0.4 + index * 0.08}s` }}
                  />
                ))}

                <text
                  className="loader-wordmark font-mono"
                  x={50}
                  y={65}
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize={21}
                  fontWeight={700}
                  letterSpacing={1}
                >
                  {"<YD>"}
                </text>
              </svg>

              <div className="h-px w-36 overflow-hidden bg-ink-300/60">
                <div className="loader-rail h-full w-full bg-mint-500" />
              </div>
            </div>

            <span className="sr-only">{uiContent(locale).loader}</span>
        </div>
      ) : null}
    </>
  );
}
