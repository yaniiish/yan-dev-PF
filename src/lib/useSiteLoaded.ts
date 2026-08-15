"use client";

import { useSyncExternalStore } from "react";

/** Émis par SiteLoader au moment où l'écran de chargement commence à sortir. */
export const SITE_LOADED_EVENT = "yd:site-loaded";
/** Posé sur <html> pour les composants montés après l'événement. */
export const SITE_LOADED_ATTRIBUTE = "data-site-loaded";

function subscribe(onChange: () => void) {
  window.addEventListener(SITE_LOADED_EVENT, onChange);
  return () => window.removeEventListener(SITE_LOADED_EVENT, onChange);
}

function getSnapshot() {
  return document.documentElement.hasAttribute(SITE_LOADED_ATTRIBUTE);
}

function getServerSnapshot() {
  return false;
}

/**
 * Indique si l'écran de chargement a fini son travail.
 * Sert à déclencher les entrées du Hero au bon moment : sans ça, elles jouent
 * derrière l'overlay et l'utilisateur ne les voit jamais.
 */
export function useSiteLoaded() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
