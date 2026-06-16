"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { MetierExample } from "@/content/metiers";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ExampleCarouselProps = {
  examples: readonly MetierExample[];
  ctaLabel: string;
};

export function ExampleCarousel({ examples, ctaLabel }: ExampleCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = examples.length;

  const goTo = (idx: number) => setIndex(((idx % total) + total) % total);

  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-3xl border border-ink-300/60 bg-card shadow-md shadow-ink-950/5"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Exemples en ligne"
      >
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: easings.out,
          }}
        >
          {examples.map((example, idx) => (
            <div
              key={example.href}
              className="w-full shrink-0"
              role="tabpanel"
              aria-roledescription="slide"
              aria-label={`Exemple ${idx + 1} sur ${total}`}
              aria-hidden={idx !== index}
            >
              <div className="relative aspect-[16/9] w-full border-b border-ink-300/60">
                <Image
                  src={example.image.src}
                  alt={example.image.alt}
                  width={example.image.width}
                  height={example.image.height}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1024px"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 p-5 sm:p-6 md:p-7">
                <p className="text-sm text-ink-500 sm:text-base">
                  {example.description}
                </p>
                <a
                  href={example.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={idx === index ? undefined : -1}
                  aria-hidden={idx !== index}
                  className="inline-flex w-fit items-center gap-2 text-sm font-medium text-mint-700 underline decoration-mint-500 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-mint-900 hover:decoration-mint-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                >
                  {ctaLabel}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Naviguer entre les exemples"
        >
          {examples.map((example, idx) => {
            const isActive = idx === index;
            return (
              <button
                key={example.href}
                type="button"
                role="tab"
                aria-label={`Aller à l'exemple ${idx + 1}`}
                aria-selected={isActive}
                onClick={() => goTo(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint-700",
                  isActive ? "w-10 bg-mint-500" : "w-2 bg-ink-300 hover:bg-ink-500",
                )}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <span
            className="font-mono text-xs uppercase tracking-widest text-ink-500"
            aria-live="polite"
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <CarouselArrow direction="prev" onClick={() => goTo(index - 1)} />
            <CarouselArrow direction="next" onClick={() => goTo(index + 1)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "Exemple précédent" : "Exemple suivant";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border border-ink-300/60 bg-card text-ink-700",
        "transition duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-mint-500/40 hover:text-ink-950 hover:shadow-md hover:shadow-ink-950/10",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700",
      )}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
