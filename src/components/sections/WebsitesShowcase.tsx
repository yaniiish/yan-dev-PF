"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Website } from "@/content/travail";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

type WebsitesShowcaseProps = {
  websites: readonly Website[];
};

/**
 * Un projet en grand, une bande de vignettes pour changer.
 * Pas de carrousel qui défile : avec six projets, tout tient à l'écran et
 * l'utilisateur choisit directement au lieu de faire défiler à l'aveugle.
 */
export function WebsitesShowcase({ websites }: WebsitesShowcaseProps) {
  const [activeId, setActiveId] = useState(websites[0]?.id);
  const reduce = useReducedMotion();
  const active = websites.find((site) => site.id === activeId) ?? websites[0];

  if (!active) return null;

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-ink-300/60 bg-card shadow-md shadow-ink-950/5">
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60">
          <AnimatePresence mode="wait" initial={false}>
            {/* Fondu au changement de projet : accuse reception du clic sur
                une vignette, sans faire glisser la mise en page. */}
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 0.3, ease: easings.out }}
              className="absolute inset-0"
            >
              <Image
                src={active.image.src}
                alt={active.image.alt}
                width={active.image.width}
                height={active.image.height}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="size-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              {active.category}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink-950">
              {active.title}
            </h3>
            <p className="mt-1 text-sm text-ink-500">{active.sector}</p>
          </div>

          <a
            href={active.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ink-300/60 text-ink-700",
              "transition duration-300 ease-out",
              "hover:-translate-y-0.5 hover:border-mint-500/40 hover:text-ink-950 hover:shadow-md hover:shadow-ink-950/10",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700",
            )}
          >
            <ArrowUpRight size={20} aria-hidden="true" />
            <span className="sr-only">
              Voir le site {active.title}, nouvelle fenêtre
            </span>
          </a>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {websites.map((site) => {
          const isActive = site.id === active.id;
          return (
            <li key={site.id}>
              <button
                type="button"
                onClick={() => setActiveId(site.id)}
                aria-pressed={isActive}
                className={cn(
                  "group/thumb block w-full text-left",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint-700",
                )}
              >
                <span
                  className={cn(
                    "relative block aspect-[16/9] overflow-hidden rounded-lg border transition-colors duration-200",
                    isActive
                      ? "border-mint-500"
                      : "border-ink-300/60 group-hover/thumb:border-mint-500/50",
                  )}
                >
                  <Image
                    src={site.image.src}
                    alt=""
                    width={site.image.width}
                    height={site.image.height}
                    sizes="120px"
                    aria-hidden="true"
                    className={cn(
                      "size-full object-cover transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-60 group-hover/thumb:opacity-100",
                    )}
                  />
                </span>
                {/* Pas de truncate : « Madman Tattoo » se faisait couper dans
                    une vignette de 95px. Le nom passe sur deux lignes. */}
                <span
                  className={cn(
                    "mt-2 block text-xs leading-tight transition-colors duration-200",
                    isActive ? "text-ink-950" : "text-ink-500",
                  )}
                >
                  {site.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
