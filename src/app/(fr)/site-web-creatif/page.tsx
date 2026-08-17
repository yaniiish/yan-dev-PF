import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { PilierPage } from "@/components/pages/PilierPage";
import { PILIER_CREATIF } from "@/content/piliers";
import { websites } from "@/content/travail";
import { buildMetadata } from "@/lib/seo";

// Page FR uniquement : pas de `routeKey`, donc aucun hreflang (SEO.md §7).
const LOCALE = "fr" as const;

/** Sites illustrant le pilier créatif, dans l'ordre d'affichage voulu. */
const EXAMPLE_IDS = ["beerbee", "madman-tattoo", "atelier-lume"] as const;

export const metadata: Metadata = buildMetadata({
  locale: LOCALE,
  title: PILIER_CREATIF.metaTitle,
  description: PILIER_CREATIF.metaDescription,
  path: PILIER_CREATIF.path,
  titleAbsolute: true,
});

export default function SiteWebCreatifPage() {
  const all = websites(LOCALE);
  const examples = EXAMPLE_IDS.map((id) =>
    all.find((site) => site.id === id),
  ).filter((site) => site !== undefined);

  return (
    <PilierPage pilier={PILIER_CREATIF}>
      <Stagger
        className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        staggerChildren={0.12}
      >
        {examples.map((site) => (
          <FadeIn key={site.id} inside y={24}>
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-300/60 bg-card shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-mint-500/40 hover:shadow-xl hover:shadow-ink-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60">
                <Image
                  src={site.image.src}
                  alt={site.image.alt}
                  width={site.image.width}
                  height={site.image.height}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="flex flex-1 items-center justify-between gap-3 p-5 md:p-6">
                <div className="min-w-0">
                  <h3 className="font-serif text-xl font-medium leading-tight text-ink-950">
                    {site.title}
                  </h3>
                  <span className="mt-1 block text-sm text-ink-500">
                    {site.sector}
                  </span>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-mint-700 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </a>
          </FadeIn>
        ))}
      </Stagger>
    </PilierPage>
  );
}
