"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type ShowcaseItem = {
  id: string;
  title: string;
  /** Ligne mono mint au-dessus du titre : catégorie du site ou nature du produit. */
  kicker: string;
  /** Ligne discrète sous le titre : secteur du client ou description du produit. */
  meta: string;
  /** Absent quand il n'y a rien à visiter, par exemple un produit en chantier. */
  href?: string;
  /** Pastille d'état, réservée aux produits. */
  badge?: { label: string; live: boolean };
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type WorkShowcaseProps = {
  items: readonly ShowcaseItem[];
  /** Grille des vignettes, adaptée au nombre d'éléments et à la largeur de la colonne. */
  thumbsClassName: string;
  /** Nommé dans le libellé du lien, pour distinguer les deux vitrines au lecteur d'écran. */
  itemNoun: string;
  sizes: string;
};

/**
 * Un élément en grand, une bande de vignettes pour changer.
 * Pas de carrousel qui défile : tout tient à l'écran et l'utilisateur choisit
 * directement au lieu de faire défiler à l'aveugle.
 */
export function WorkShowcase({
  items,
  thumbsClassName,
  itemNoun,
  sizes,
}: WorkShowcaseProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const reduce = useReducedMotion();
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-ink-300/60 bg-card shadow-md shadow-ink-950/5">
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60">
          <AnimatePresence mode="wait" initial={false}>
            {/* Fondu au changement : accuse reception du clic sur une vignette,
                sans faire glisser la mise en page. */}
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easings.out }}
              className="absolute inset-0"
            >
              <Image
                src={active.image.src}
                alt={active.image.alt}
                width={active.image.width}
                height={active.image.height}
                sizes={sizes}
                className="size-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
                {active.kicker}
              </p>
              {active.badge ? <StatusBadge badge={active.badge} /> : null}
            </div>
            <h4 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink-950">
              {active.title}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">
              {active.meta}
            </p>
          </div>

          {active.href ? (
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
                Voir {active.title}, nouvelle fenêtre
              </span>
            </a>
          ) : null}
        </div>
      </div>

      <ul className={cn("mt-4 grid gap-2 sm:gap-3", thumbsClassName)}>
        {items.map((item) => {
          const isActive = item.id === active.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActiveId(item.id)}
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
                    src={item.image.src}
                    alt=""
                    width={item.image.width}
                    height={item.image.height}
                    sizes="160px"
                    aria-hidden="true"
                    className={cn(
                      "size-full object-cover transition-opacity duration-200",
                      isActive
                        ? "opacity-100"
                        : "opacity-60 group-hover/thumb:opacity-100",
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
                  <span className="sr-only">Voir {itemNoun} </span>
                  {item.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Le point ne décore pas : il distingue un produit en ligne d'un chantier. */
function StatusBadge({ badge }: { badge: NonNullable<ShowcaseItem["badge"]> }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap text-xs text-ink-500">
      <span
        className={cn(
          "size-2 rounded-full",
          badge.live ? "bg-mint-500" : "bg-ink-300",
        )}
        aria-hidden="true"
      />
      {badge.label}
    </span>
  );
}
