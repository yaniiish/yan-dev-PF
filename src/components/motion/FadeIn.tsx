"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { durations, easings } from "@/lib/motion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** Translation Y initiale en pixels (défaut 16). */
  y?: number;
  /** Translation X initiale en pixels (défaut 0). Positif = glisse depuis la droite. */
  x?: number;
  /** Délai en secondes avant le démarrage. */
  delay?: number;
  /** Durée custom en secondes (sinon `durations.base`). */
  duration?: number;
  /**
   * Si `true`, le composant n'a pas son propre déclencheur viewport :
   * il hérite des variants du parent (utile à l'intérieur d'un Stagger).
   */
  inside?: boolean;
};

export function FadeIn({
  children,
  className,
  y = 16,
  x = 0,
  delay = 0,
  duration,
  inside = false,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: reduce ? 0 : x,
      y: reduce ? 0 : y,
    },
    show: { opacity: 1, x: 0, y: 0 },
  };
  const transition = {
    duration: duration ?? durations.base,
    ease: easings.out,
    delay,
  };

  if (inside) {
    return (
      <motion.div
        className={className}
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
