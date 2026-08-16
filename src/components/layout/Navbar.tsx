"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/content/locales";
import { siteContent, SITE_NAME } from "@/content/site";
import { uiContent } from "@/content/ui";
import { anchorHref, homePath } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { durations, easings } from "@/lib/motion";
import { LocaleSwitcher } from "./LocaleSwitcher";

const SCROLL_THRESHOLD = 30;
/**
 * Ligne de lecture, en fraction de la hauteur d'écran : la section active est
 * celle qui la traverse. C'est elle qui décide, pas l'observer.
 */
const ACTIVE_LINE = 0.425;
// rootMargin "haut négatif / bas négatif" → l'observer ne se déclenche que
// quand une section entre ou sort de la bande qui entoure `ACTIVE_LINE`,
// c'est-à-dire exactement quand la réponse peut changer.
const SECTION_OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0,
};

export function Navbar({ locale }: { locale: Locale }) {
  const { navLinks } = siteContent(locale);
  const ui = uiContent(locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const home = homePath(locale);
  const isHome = pathname === home;

  // Hors de la home, les ancres (#travail…) doivent pointer vers la home
  // **de la locale courante**, sinon elles ne mènent nulle part sur une page
  // interne, ou renvoient un visiteur anglais sur la home française.
  const resolveHref = (hash: string) => anchorHref(hash, locale, isHome);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // La section active est déduite de la géométrie, pas de l'ordre des
    // entrées de l'observer. Lire `entries` revenait à garder la dernière du
    // tableau, dont l'ordre n'est pas garanti : dès que deux sections
    // traversaient la bande dans le même lot, la gagnante était arbitraire.
    const pick = () => {
      const line = window.innerHeight * ACTIVE_LINE;
      const current = sections.find((section) => {
        const box = section.getBoundingClientRect();
        return box.top <= line && box.bottom > line;
      });
      if (current) setActiveId(current.id);
    };

    const observer = new IntersectionObserver(pick, SECTION_OBSERVER_OPTIONS);

    for (const section of sections) {
      observer.observe(section);
    }
    // Une arrivée directe sur une ancre (/#processus depuis une page interne)
    // ne produit aucun franchissement, donc aucun appel de l'observer.
    pick();
    return () => observer.disconnect();
  }, [navLinks]);

  // Verrouille le scroll du body quand le menu mobile est ouvert.
  useEffect(() => {
    if (!isMenuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMenuOpen]);

  // Ferme le menu quand on dépasse le breakpoint mobile (évite un menu
  // resté "ouvert" mais caché par le CSS si on resize la fenêtre).
  useEffect(() => {
    // Doit suivre le seuil du menu compact (`lg:hidden`), sinon un passage de
    // 800 à 900px fermerait un menu qui reste pourtant la seule navigation.
    const mql = window.matchMedia("(min-width: 1024px)");
    const handle = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-colors duration-200",
          isScrolled
            ? "border-ink-300/50 bg-ink-50/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:h-20 md:px-10 lg:px-16">
          <a
            href={isHome ? "#hero" : home}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap font-sans text-base font-semibold tracking-tight text-ink-950"
          >
            <Image
              src="/logo.svg"
              alt=""
              width={28}
              height={28}
              className="size-7"
              aria-hidden="true"
            />
            {SITE_NAME}
          </a>

          <nav
            aria-label={ui.nav.mainLabel}
            className="hidden lg:block"
          >
            {/* `whitespace-nowrap` sur les liens, le logo et le CTA : avec
                cinq liens, tout ce petit monde se cassait sur deux lignes des
                que la place manquait, au lieu de signaler le debordement. */}
            <ul className="flex items-center gap-6 text-sm text-ink-700">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={resolveHref(link.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "whitespace-nowrap rounded-md px-1 py-1 transition-colors hover:text-ink-950",
                        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint-700",
                        isActive &&
                          "text-mint-700 underline decoration-2 underline-offset-8",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LocaleSwitcher locale={locale} />
            <Button
              href={resolveHref("#contact")}
              size="sm"
              className="whitespace-nowrap"
            >
              {ui.ctaContact}
            </Button>
          </div>

          {/* Sous lg, le selecteur de langue reste dans la barre et non dans le
              menu : changer de langue ne doit pas demander d'ouvrir le menu. */}
          <div className="flex items-center gap-1 lg:hidden">
            <LocaleSwitcher locale={locale} />
            <button
              type="button"
              aria-label={ui.nav.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-md text-ink-950 transition-colors hover:bg-ink-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.fast, ease: easings.out }}
            className="fixed inset-0 z-50 bg-ink-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={ui.nav.menuDialogLabel}
          >
            <motion.div
              initial={reduceMotion ? false : { y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: easings.out }}
              className="flex h-full flex-col px-6 pb-8 pt-3"
            >
              <div className="flex h-16 items-center justify-between">
                <span className="flex items-center gap-2 font-sans text-base font-semibold tracking-tight text-ink-950">
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="size-7"
                    aria-hidden="true"
                  />
                  {SITE_NAME}
                </span>
                <button
                  type="button"
                  aria-label={ui.nav.closeMenu}
                  onClick={closeMenu}
                  className="inline-flex size-11 items-center justify-center rounded-md text-ink-950 transition-colors hover:bg-ink-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label={ui.nav.mainLabel}
                className="mt-6 flex-1"
              >
                <ul className="flex flex-col">
                  {navLinks.map((link) => {
                    const isActive = activeId === link.id;
                    return (
                      <li key={link.id}>
                        <a
                          href={resolveHref(link.href)}
                          onClick={closeMenu}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "block py-4 font-serif text-2xl text-ink-950 transition-colors hover:text-mint-700",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700",
                            isActive &&
                              "text-mint-700 underline decoration-2 underline-offset-8",
                          )}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <Button
                href={resolveHref("#contact")}
                size="lg"
                className="w-full"
                onClick={closeMenu}
              >
                {ui.ctaContact}
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
