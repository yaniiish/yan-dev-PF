"use client";

import { Info } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Infobulle (i) accessible : s'ouvre au survol, au focus clavier et au clic/tap
 * (indispensable sur mobile où le survol n'existe pas). Se ferme sur Escape,
 * au blur et au clic extérieur.
 */
export function Tooltip({
  content,
  label = "Plus d'informations",
}: {
  content: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center rounded-full text-ink-500 transition-colors hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
      >
        <Info size={15} aria-hidden="true" />
      </button>

      <span
        id={id}
        role="tooltip"
        className={cn(
          "absolute bottom-full left-1/2 z-20 mb-2 w-64 max-w-xs -translate-x-1/2 rounded-2xl bg-ink-950 p-3 text-xs leading-relaxed text-ink-50 shadow-lg shadow-ink-950/20",
          "transition-opacity duration-150",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {content}
      </span>
    </span>
  );
}
