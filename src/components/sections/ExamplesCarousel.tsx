"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BGPattern } from "@/components/backgrounds/BGPattern";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Project = {
  id: string;
  label: string;
  title: string;
  description: string;
};

type ExamplesCarouselProps = {
  projects: readonly Project[];
};

export function ExamplesCarousel({ projects }: ExamplesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = projects.length;

  const goTo = useCallback(
    (idx: number) => {
      const next = ((idx % total) + total) % total;
      setCurrentIndex(next);
    },
    [total],
  );

  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-3xl border border-ink-300/60 shadow-md shadow-ink-950/5"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Projets en exemple"
      >
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: easings.out,
          }}
        >
          {projects.map((project, idx) => (
            <Slide
              key={project.id}
              project={project}
              index={idx}
              isCurrent={idx === currentIndex}
              total={total}
            />
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        {/* Dots */}
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Naviguer entre les projets"
        >
          {projects.map((project, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-label={`Aller au ${project.title}`}
                aria-selected={isActive}
                onClick={() => goTo(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint-700",
                  isActive
                    ? "w-10 bg-mint-500"
                    : "w-2 bg-ink-300 hover:bg-ink-500",
                )}
              />
            );
          })}
        </div>

        {/* Arrows + counter */}
        <div className="flex items-center gap-4">
          <span
            className="font-mono text-xs uppercase tracking-widest text-ink-500"
            aria-live="polite"
          >
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <CarouselArrow
              direction="prev"
              onClick={() => goTo(currentIndex - 1)}
            />
            <CarouselArrow
              direction="next"
              onClick={() => goTo(currentIndex + 1)}
            />
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
  const label = direction === "prev" ? "Projet précédent" : "Projet suivant";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-ink-300/60 bg-card text-ink-700",
        "transition duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-mint-500/40 hover:text-ink-950 hover:shadow-md hover:shadow-ink-950/10",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700",
      )}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}

const SLIDE_GRADIENTS: ReadonlyArray<{
  gradient: string;
  isDark: boolean;
}> = [
  {
    gradient: "bg-gradient-to-br from-mint-50 via-ink-50 to-ink-100",
    isDark: false,
  },
  {
    gradient: "bg-gradient-to-br from-ink-950 via-ink-700 to-ink-950",
    isDark: true,
  },
  {
    gradient: "bg-gradient-to-br from-mint-100 via-mint-50 to-ink-50",
    isDark: false,
  },
];

function Slide({
  project,
  index,
  isCurrent,
  total,
}: {
  project: Project;
  index: number;
  isCurrent: boolean;
  total: number;
}) {
  const style = SLIDE_GRADIENTS[index % SLIDE_GRADIENTS.length];

  return (
    <div
      className="relative aspect-[16/9] w-full shrink-0"
      role="tabpanel"
      aria-roledescription="slide"
      aria-label={`${project.title} (${index + 1} sur ${total})`}
      aria-hidden={!isCurrent}
    >
      <div className={cn("absolute inset-0", style.gradient)} />
      <BGPattern
        variant="grid"
        mask="fade-edges"
        fill={
          style.isDark
            ? "color-mix(in oklch, var(--color-mint-500) 22%, transparent)"
            : "color-mix(in oklch, var(--color-ink-300) 55%, transparent)"
        }
      />
      {style.isDark ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_color-mix(in_oklch,var(--color-mint-500)_15%,transparent)_0%,_transparent_60%)]"
        />
      ) : null}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center">
          <p
            className={cn(
              "font-mono text-xs uppercase tracking-widest sm:text-sm",
              style.isDark ? "text-mint-100" : "text-mint-700",
            )}
          >
            {project.label}
          </p>
          <p
            className={cn(
              "mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl md:text-5xl",
              style.isDark ? "text-ink-50" : "text-ink-950",
            )}
          >
            {project.title}
          </p>
          <p
            className={cn(
              "mt-4 text-sm sm:text-base",
              style.isDark ? "text-ink-300" : "text-ink-500",
            )}
          >
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
