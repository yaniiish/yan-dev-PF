/**
 * Signal de fin de l'écran de chargement.
 *
 * L'attribut est posé sur <html> et l'événement émis quand l'écran sort. Le
 * Hero s'en servait pour déclencher ses entrées ; celles-ci sont désormais en
 * CSS et n'attendent plus rien (cf. globals.css, section « Entrée du Hero »).
 * Le signal reste émis : il documente l'état de la page et sert aux tests e2e.
 */

export const SITE_LOADED_EVENT = "yd:site-loaded";
export const SITE_LOADED_ATTRIBUTE = "data-site-loaded";
