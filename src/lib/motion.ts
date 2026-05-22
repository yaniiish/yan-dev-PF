/**
 * Tokens d'animation partagés (cf. DESIGN_SYSTEM.md §7.2).
 * À utiliser dans tous les composants Motion pour rester cohérent.
 */

export const easings = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const durations = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
};
