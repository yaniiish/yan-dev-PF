// Page de test isolée pour les composants backgrounds (Phase 1.2).
// À supprimer une fois les backgrounds intégrés dans les sections réelles.

import { BGPattern } from "@/components/backgrounds/BGPattern";
import { FallingPattern } from "@/components/backgrounds/FallingPattern";

export default function TestBackgroundsPage() {
  return (
    <>
      {/* 1 — FallingPattern mint, vitesse rapide pour voir l'effet pluie */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <FallingPattern duration={30} blurIntensity="1em" density={1.5} />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              FallingPattern — mint, rapide (duration 30s)
            </p>
            <p className="mt-1 text-sm text-ink-700">
              couleur : var(--color-primary) — blur 1em — densité 1.5
            </p>
          </div>
        </div>
      </section>

      {/* 2 — FallingPattern mint, vitesse par défaut (150s) — ressenti final, subtil */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <FallingPattern />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              FallingPattern — défauts (duration 150s)
            </p>
            <p className="mt-1 text-sm text-ink-700">
              C&apos;est ce qu&apos;on verra sur le Hero : volontairement très subtil.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — FallingPattern variante sobre (ink-300) */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <FallingPattern duration={30} color="var(--color-ink-300)" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              FallingPattern — variante sobre (ink-300)
            </p>
            <p className="mt-1 text-sm text-ink-700">
              à comparer avec la version mint pour le choix final du Hero.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — BGPattern grid + fade-edges sur fond blanc */}
      <section className="relative h-screen overflow-hidden bg-card">
        <BGPattern variant="grid" mask="fade-edges" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              BGPattern variant=grid mask=fade-edges
            </p>
            <p className="mt-1 text-sm text-ink-700">
              fill : var(--color-ink-300) — size 24px
            </p>
          </div>
        </div>
      </section>

      {/* 5 — BGPattern dots fade-edges */}
      <section className="relative h-screen overflow-hidden bg-ink-50">
        <BGPattern variant="dots" mask="fade-edges" size={20} />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              BGPattern variant=dots
            </p>
            <p className="mt-1 text-sm text-ink-700">
              fill : var(--color-ink-300) — size 20px
            </p>
          </div>
        </div>
      </section>

      {/* 6 — BGPattern diagonal-stripes (pour avoir une 3e option en tête) */}
      <section className="relative h-screen overflow-hidden bg-card">
        <BGPattern variant="diagonal-stripes" mask="fade-edges" size={32} />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              BGPattern variant=diagonal-stripes
            </p>
            <p className="mt-1 text-sm text-ink-700">
              fill : var(--color-ink-300) — size 32px
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
