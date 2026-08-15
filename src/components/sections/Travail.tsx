import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { METIERS_BASE } from "@/content/metiers";
import { PRODUCTS, WEBSITES, type Product } from "@/content/travail";
import { cn } from "@/lib/utils";
import { WebsitesShowcase } from "./WebsitesShowcase";

const H2 = "Ce que je construis.";

const LEAD =
  "Sites web créatifs, sites vitrines et produits digitaux pensés pour répondre à des objectifs concrets.";

const COLUMN_WEBSITES = "Sites web";
const COLUMN_PRODUCTS = "Produits";

export function Travail() {
  return (
    <section id="travail" className="bg-card py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Mon travail</SectionLabel>
            <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
              {H2}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-500">
              {LEAD}
            </p>
          </div>
        </FadeIn>

        {/* Deux colonnes separees par un filet vertical a partir de lg.
            En dessous, elles s'empilent et le filet devient horizontal. */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-0">
          <FadeIn y={24} className="lg:col-span-7 lg:pr-10 xl:pr-14">
            <ColumnTitle>{COLUMN_WEBSITES}</ColumnTitle>
            <div className="mt-6">
              <WebsitesShowcase websites={WEBSITES} />
            </div>
            <div className="mt-8">
              <Button href={METIERS_BASE} variant="secondary" size="md">
                Des exemples par métier
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </FadeIn>

          <FadeIn
            y={24}
            className="border-t border-ink-300/60 pt-12 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-14"
          >
            <ColumnTitle>{COLUMN_PRODUCTS}</ColumnTitle>
            <ul className="mt-6 flex flex-col gap-6">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-sm uppercase tracking-widest text-ink-950">
      {children}
      <span className="mt-2 block h-px w-12 bg-mint-500" aria-hidden="true" />
    </h3>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isLive = product.status === "live";

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-3xl border border-ink-300/60 bg-card",
        "shadow-md shadow-ink-950/5",
      )}
    >
      {product.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="size-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="font-serif text-2xl font-medium leading-tight text-ink-950">
              {product.title}
            </h4>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-mint-700">
              {product.kind}
            </p>
          </div>
          <StatusBadge isLive={isLive} label={product.statusLabel} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-500">
          {product.description}
        </p>

        {product.href ? (
          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-auto inline-flex w-fit items-center gap-2 pt-4 text-sm font-medium text-mint-700",
              "underline decoration-mint-500 decoration-2 underline-offset-4",
              "transition-colors duration-200 hover:text-mint-900 hover:decoration-mint-900",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700",
            )}
          >
            Voir le produit
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

/** Le point ne décore pas : il distingue un produit en ligne d'un chantier. */
function StatusBadge({ isLive, label }: { isLive: boolean; label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs text-ink-500">
      <span
        className={cn(
          "size-2 rounded-full",
          isLive ? "bg-mint-500" : "bg-ink-300",
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
