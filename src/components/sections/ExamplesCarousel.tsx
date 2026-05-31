"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BGPattern } from "@/components/backgrounds/BGPattern";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Project = {
  id: string;
  label: string;
  title: string;
  description: string;
  /** Lien externe vers le site (slides image uniquement). */
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

      <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
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
  return (
    <div
      className="flex w-full shrink-0 flex-col bg-card"
      role="tabpanel"
      aria-roledescription="slide"
      aria-label={`${project.title} (${index + 1} sur ${total})`}
      aria-hidden={!isCurrent}
    >
      {project.image ? (
        <ImageMedia image={project.image} />
      ) : (
        <PlaceholderMedia />
      )}
      <Caption project={project} />
    </div>
  );
}

function ImageMedia({
  image,
}: {
  image: NonNullable<Project["image"]>;
}) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
        priority={false}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}

function PlaceholderMedia() {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60 bg-gradient-to-br from-mint-50 via-ink-50 to-ink-100">
      <BGPattern
        variant="grid"
        mask="fade-edges"
        fill="color-mix(in oklch, var(--color-ink-300) 55%, transparent)"
      />
    </div>
  );
}

function Caption({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2 p-5 sm:p-6 md:p-7">
      <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
        {project.label}
      </p>
      <h3 className="font-serif text-xl font-medium leading-tight text-ink-950 sm:text-2xl md:text-[1.75rem]">
        {project.title}
      </h3>
      {project.description ? (
        <p className="text-sm text-ink-500 sm:text-base">
          {project.description}
        </p>
      ) : null}
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-2 inline-flex w-fit items-center gap-2 text-sm font-medium text-mint-700",
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
