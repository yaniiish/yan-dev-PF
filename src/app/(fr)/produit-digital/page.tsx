import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { PilierPage } from "@/components/pages/PilierPage";
import { PILIER_PRODUIT } from "@/content/piliers";
import { products } from "@/content/travail";
import { buildMetadata } from "@/lib/seo";

// Page FR uniquement : pas de `routeKey`, donc aucun hreflang (SEO.md §7).
const LOCALE = "fr" as const;

export const metadata: Metadata = buildMetadata({
  locale: LOCALE,
  title: PILIER_PRODUIT.metaTitle,
  description: PILIER_PRODUIT.metaDescription,
  path: PILIER_PRODUIT.path,
  titleAbsolute: true,
});

export default function ProduitDigitalPage() {
  const items = products(LOCALE);

  return (
    <PilierPage pilier={PILIER_PRODUIT}>
      <Stagger
        className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:gap-8"
        staggerChildren={0.12}
      >
        {items.map((product) => {
          const card = (
            <>
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  width={product.image.width}
                  height={product.image.height}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl font-medium leading-tight text-ink-950">
                      {product.title}
                    </h3>
                    <span className="mt-1 block text-sm text-ink-500">
                      {product.kind}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full border border-mint-500/40 bg-accent-soft px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest text-mint-700">
                    {product.statusLabel}
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-ink-700">
                  {product.description}
                </p>
              </div>
            </>
          );

          const shell =
            "group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-300/60 bg-card shadow-sm";

          return (
            <FadeIn key={product.id} inside y={24}>
              {/* Un produit encore en construction n'a pas de lien : on ne
                  fabrique pas une destination qui n'existe pas. */}
              {product.href ? (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${shell} transition duration-300 ease-out hover:-translate-y-1 hover:border-mint-500/40 hover:shadow-xl hover:shadow-ink-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700`}
                >
                  {card}
                  <span className="flex items-center gap-1 px-5 pb-5 font-mono text-xs uppercase tracking-widest text-mint-700 md:px-6 md:pb-6">
                    Voir le produit
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              ) : (
                <div className={shell}>{card}</div>
              )}
            </FadeIn>
          );
        })}
      </Stagger>
    </PilierPage>
  );
}
