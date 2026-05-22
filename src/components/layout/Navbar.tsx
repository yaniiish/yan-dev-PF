"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_NAME } from "@/content/site";
import { cn } from "@/lib/utils";
import { durations, easings } from "@/lib/motion";

const SCROLL_THRESHOLD = 30;
// rootMargin "haut négatif / bas négatif" → la section est "active" quand
// elle occupe la zone centrale du viewport, pas dès qu'elle dépasse.
const SECTION_OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    }, SECTION_OBSERVER_OPTIONS);

    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

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
    const mql = window.matchMedia("(min-width: 768px)");
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
            href="#hero"
            className="font-sans text-base font-semibold tracking-tight text-ink-950"
          >
            {SITE_NAME}
          </a>

          <nav
            aria-label="Navigation principale"
            className="hidden md:block"
          >
            <ul className="flex items-center gap-6 text-sm text-ink-700">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "rounded-md px-1 py-1 transition-colors hover:text-ink-950",
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

          <div className="hidden md:block">
            <Button href="#contact" size="sm">
              Discuter de mon projet
            </Button>
          </div>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-md text-ink-950 transition-colors hover:bg-ink-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700 md:hidden"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
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
            className="fixed inset-0 z-50 bg-ink-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <motion.div
              initial={reduceMotion ? false : { y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: easings.out }}
              className="flex h-full flex-col px-6 pb-8 pt-3"
            >
              <div className="flex h-16 items-center justify-between">
                <span className="font-sans text-base font-semibold tracking-tight text-ink-950">
                  {SITE_NAME}
                </span>
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={closeMenu}
                  className="inline-flex size-11 items-center justify-center rounded-md text-ink-950 transition-colors hover:bg-ink-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label="Navigation principale"
                className="mt-6 flex-1"
              >
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeId === link.id;
                    return (
                      <li key={link.id}>
                        <a
                          href={link.href}
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
                href="#contact"
                size="lg"
                className="w-full"
                onClick={closeMenu}
              >
                Discuter de mon projet
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
