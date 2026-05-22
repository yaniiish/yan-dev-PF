"use client";

import { motion, useReducedMotion } from "motion/react";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Délai entre chaque enfant en secondes (défaut 0.06, max recommandé 0.1). */
  staggerChildren?: number;
  /** Délai avant le premier enfant. */
  delayChildren?: number;
};

/**
 * Wrapper qui orchestre l'animation séquentielle de ses enfants.
 * Les enfants doivent être des composants Motion avec des variants
 * `hidden` / `show` — typiquement <FadeIn inside />.
 */
export function Stagger({
  children,
  className,
  staggerChildren = 0.06,
  delayChildren = 0,
}: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? {}
            : {
                staggerChildren,
                delayChildren,
              },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
