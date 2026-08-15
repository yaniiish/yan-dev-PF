"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BGPattern } from "@/components/backgrounds/BGPattern";
import { easings } from "@/lib/motion";

/**
 * Durée plancher : évite un flash de 80ms quand la page est déjà en cache.
 * Doit rester alignée sur `--loader-intro` (globals.css) pour que le tracé du
 * logo et la barre finissent au moment exact où l'écran sort.
 */
const MIN_DURATION_MS = 1000;
/** Filet de sécurité : on ne bloque jamais l'écran plus longtemps que ça. */
const MAX_DURATION_MS = 2200;
const REDUCED_DURATION_MS = 300;

/** Cadre du logo (public/logo.svg) redessiné en path pour animer le tracé. */
const FRAME_PATH =
  "M 29 9 H 71 A 20 20 0 0 1 91 29 V 71 A 20 20 0 0 1 71 91 H 29 A 20 20 0 0 1 9 71 V 29 A 20 20 0 0 1 29 9 Z";
const DOTS_X = [25, 36, 47];

export function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const minDuration = reduceMotion ? REDUCED_DURATION_MS : MIN_DURATION_MS;
    const startedAt = performance.now();
    let holdTimer: number | undefined;

    const finish = () => {
      const elapsed = performance.now() - startedAt;
      holdTimer = window.setTimeout(
        () => setIsVisible(false),
        Math.max(0, minDuration - elapsed),
      );
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const capTimer = window.setTimeout(
      () => setIsVisible(false),
      MAX_DURATION_MS,
    );

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(holdTimer);
      window.clearTimeout(capTimer);
    };
  }, [reduceMotion]);

  // Verrouille le scroll tant que l'écran de chargement couvre la page.
  useEffect(() => {
    if (!isVisible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isVisible]);

  return (
    <>
      {/* Sans JS, aucun effet ne retire l'overlay : on le neutralise en CSS. */}
      <noscript>
        <style>{"[data-site-loader]{display:none!important}"}</style>
      </noscript>

      <AnimatePresence>
        {isVisible ? (
          <motion.div
            data-site-loader
            role="status"
            aria-live="polite"
            initial={false}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.15 } }
                : {
                    opacity: 0,
                    y: -12,
                    transition: { duration: 0.45, ease: easings.out },
                  }
            }
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-ink-50"
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

            <span className="sr-only">Chargement du site</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
