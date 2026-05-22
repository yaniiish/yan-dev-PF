// Page de test isolée pour les composants backgrounds (Phase 1.2).
// À supprimer une fois les backgrounds intégrés dans les sections réelles.

import { BGPattern } from "@/components/backgrounds/BGPattern";
import { FallingPattern } from "@/components/backgrounds/FallingPattern";

export default function TestBackgroundsPage() {
  return (
    <main className="flex flex-col">
      {/* Section 1 : FallingPattern plein écran, couleur mint */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <FallingPattern blurIntensity="1em" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              FallingPattern
            </p>
            <p className="mt-1 text-sm text-ink-700">
              couleur : var(--color-primary) — blur 1em — densité 1
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 : FallingPattern variante sobre (ink-300) */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <FallingPattern
            blurIntensity="1em"
            color="var(--color-ink-300)"
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              FallingPattern — variante sobre
            </p>
            <p className="mt-1 text-sm text-ink-700">
              couleur : var(--color-ink-300)
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 : BGPattern grid + fade-edges */}
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

      {/* Section 4 : BGPattern dots */}
      <section className="relative h-screen overflow-hidden bg-ink-50">
        <BGPattern variant="dots" mask="fade-edges" size={20} />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-2xl border border-ink-300/60 bg-card/90 px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
              BGPattern variant=dots
            </p>
            <p className="mt-1 text-sm text-ink-700">
              fill : var(--color-ink-300) — size 20px — mask fade-edges
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
