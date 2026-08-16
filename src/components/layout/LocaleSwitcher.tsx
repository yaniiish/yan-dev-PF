"use client";

import { usePathname } from "next/navigation";
import {
  LOCALE_LABEL,
  LOCALE_NAME,
  LOCALES,
  HREFLANG,
  type Locale,
} from "@/content/locales";
import { uiContent } from "@/content/ui";
import { counterpartPath } from "@/lib/routes";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
  /** Ferme le menu mobile quand le sélecteur y est rendu. */
  onNavigate?: () => void;
};

/**
 * Sélecteur de langue FR / EN.
 *
 * Des liens et non un bouton : chaque langue est une URL réelle, donc elle
 * doit être partageable, ouvrable dans un onglet et suivie par les crawlers.
 * Les deux root layouts (`(fr)` et `(en)`) imposent un rechargement complet à
 * la bascule, ce qui est le comportement attendu pour un changement de langue.
 *
 * Sur une page sans équivalent dans l'autre langue (fiches métier, index
 * métiers), `counterpartPath` renvoie vers la home de la langue cible plutôt
 * que vers une 404.
 */
export function LocaleSwitcher({ locale, onNavigate }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const { nav } = uiContent(locale);

  return (
    <div
      className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest"
      role="group"
      aria-label={nav.localeSwitcherLabel}
    >
      {LOCALES.map((item, index) => {
        const isActive = item === locale;
        return (
          <span key={item} className="flex items-center gap-1">
            {index > 0 ? (
              <span className="text-ink-300" aria-hidden="true">
                /
              </span>
            ) : null}
            <a
              href={isActive ? pathname : counterpartPath(pathname, item)}
              hrefLang={HREFLANG[item]}
              lang={item}
              aria-current={isActive ? "true" : undefined}
              aria-label={LOCALE_NAME[item]}
              onClick={onNavigate}
              className={cn(
                "rounded-md px-1 py-1 transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint-700",
                isActive
                  ? "text-mint-700"
                  : "text-ink-500 hover:text-ink-950",
              )}
            >
              {LOCALE_LABEL[item]}
            </a>
          </span>
        );
      })}
    </div>
  );
}
