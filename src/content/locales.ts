/**
 * Socle i18n — voir CLAUDE.md §5.
 *
 * Le site est bilingue sur un périmètre volontairement restreint : la home et
 * la page prix existent en FR et EN, tout le reste (index métiers et fiches
 * métier) reste FR uniquement, parce que ce contenu vise le SEO local Caen et
 * n'a aucune valeur pour un lecteur anglophone.
 *
 * Pas de librairie i18n : le contenu est déjà centralisé dans `src/content/*`,
 * chaque bloc de texte devient un `Record<Locale, Shape>`. TypeScript garantit
 * alors qu'aucune traduction ne manque.
 */

export type Locale = "fr" | "en";

export const LOCALES = ["fr", "en"] as const;

export const DEFAULT_LOCALE: Locale = "fr";

/** Valeur de l'attribut `lang` sur `<html>`. */
export const HTML_LANG: Record<Locale, string> = {
  fr: "fr",
  en: "en",
};

/** Valeur de `openGraph.locale`. */
export const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

/** Clé hreflang utilisée dans `alternates.languages` et le sitemap. */
export const HREFLANG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
};

/** Libellé affiché dans le sélecteur de langue. */
export const LOCALE_LABEL: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

/** Nom de la langue dans sa propre langue, pour les `aria-label`. */
export const LOCALE_NAME: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}
