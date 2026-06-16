"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Project = {
  id: string;
  label: string;
  title: string;
  description: string;
  /** Lien externe vers le site. */
  href?: string;
  /** Screenshot du projet. Si absent, la slide affiche un visuel placeholder. */
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type ExamplesCarouselProps = {
  projects: readonly Project[];
};

/** Nombre de cards clonées de chaque côté (= nombre max de cards visibles). */
const CLONE_COUNT = 3;

function getVisibleCount(): number {
  if (typeof window === "undefined") return CLONE_COUNT;
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

export function ExamplesCarousel({ projects }: ExamplesCarouselProps) {
  const total = projects.length;
  const reduceMotion = useReducedMotion();

  // Position dans le tableau étendu (clones inclus). Démarre sur la 1re vraie slide.
  const [index, setIndex] = useState(CLONE_COUNT);
  const [animate, setAnimate] = useState(true);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  // Slides étendues : [N derniers clonés] + [vraies] + [N premiers clonés].
  const slides = useMemo(() => {
    const head = projects.slice(0, CLONE_COUNT);
    const tail = projects.slice(-CLONE_COUNT);
    return [...tail, ...projects, ...head];
  }, [projects]);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    const queries = [
      window.matchMedia("(min-width: 1024px)"),
      window.matchMedia("(min-width: 640px)"),
    ];
    queries.forEach((q) => q.addEventListener("change", update));
    return () =>
      queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  const step = 100 / visibleCount;
  const realIndex = ((index - CLONE_COUNT) % total + total) % total;

  const goTo = useCallback((next: number) => {
    setAnimate(true);
    setIndex(next);
  }, []);

  const goToReal = useCallback(
    (real: number) => goTo(CLONE_COUNT + real),
    [goTo],
  );

  // Rebascule sans animation depuis la zone de clones vers la vraie slide.
  const handleSettled = useCallback(() => {
    if (index >= CLONE_COUNT + total) {
      setAnimate(false);
      setIndex((i) => i - total);
    } else if (index < CLONE_COUNT) {
      setAnimate(false);
      setIndex((i) => i + total);
    } else if (!animate) {
      setAnimate(true);
    }
  }, [index, total, animate]);

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Projets en exemple"
      >
        <motion.div
          className="flex"
          animate={{ x: `-${index * step}%` }}
          transition={{
            duration: animate && !reduceMotion ? 0.55 : 0,
            ease: easings.out,
          }}
          onAnimationComplete={handleSettled}
        >
          {slides.map((project, idx) => {
            const isClone = idx < CLONE_COUNT || idx >= CLONE_COUNT + total;
            const isVisible =
              idx >= index && idx < index + visibleCount;
            return (
              <Slide
                key={`${project.id}-${idx}`}
                project={project}
                visible={isVisible}
                interactive={!isClone}
              />
            );
          })}
        </motion.div>
      </div>

      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Naviguer entre les projets"
        >
          {projects.map((project, idx) => {
            const isActive = idx === realIndex;
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-label={`Aller au ${project.title}`}
                aria-selected={isActive}
                onClick={() => goToReal(idx)}
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

        <div className="flex items-center gap-4">
          <span
            className="font-mono text-xs uppercase tracking-widest text-ink-500"
            aria-live="polite"
          >
            {String(realIndex + 1).padStart(2, "0")} /{" "}
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
  const label = direction === "prev" ? "Projet précédent" : "Projet suivant";

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

function Slide({
  project,
  visible,
  interactive,
}: {
  project: Project;
  visible: boolean;
  interactive: boolean;
}) {
  return (
    <div
      className="w-full shrink-0 basis-full px-2 sm:basis-1/2 sm:px-2.5 lg:basis-1/3 lg:px-3"
      role="tabpanel"
      aria-roledescription="slide"
      aria-label={project.title}
      aria-hidden={!visible || !interactive}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink-300/60 bg-card shadow-md shadow-ink-950/5">
        {project.image ? (
          <ImageMedia image={project.image} />
        ) : (
          <PlaceholderMedia />
        )}
        <Caption project={project} interactive={interactive && visible} />
      </div>
    </div>
  );
}

function ImageMedia({ image }: { image: NonNullable<Project["image"]> }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={false}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}

function PlaceholderMedia() {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60 bg-gradient-to-br from-mint-50 via-ink-50 to-ink-100" />
  );
}

function Caption({
  project,
  interactive,
}: {
  project: Project;
  interactive: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5 p-5 sm:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
        {project.label}
      </p>
      <h3 className="font-serif text-xl font-medium leading-tight text-ink-950 sm:text-2xl">
        {project.title}
      </h3>
      {project.description ? (
        <p className="text-sm text-ink-500">{project.description}</p>
      ) : null}
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={interactive ? undefined : -1}
          aria-hidden={!interactive}
          className={cn(
            "mt-auto inline-flex w-fit items-center gap-2 pt-3 text-sm font-medium text-mint-700",
            "underline decoration-mint-500 decoration-2 underline-offset-4",
            "transition-colors duration-200 hover:text-mint-900 hover:decoration-mint-900",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700",
          )}
        >
          Voir le site
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
