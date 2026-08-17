import type { Metadata } from "next";
import { PricingPage } from "@/components/pages/PricingPage";
import { pricingContent } from "@/content/pricing";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const LOCALE = "en" as const;

export const metadata: Metadata = buildMetadata({
  title: pricingContent(LOCALE).page.metaTitle,
  description: pricingContent(LOCALE).page.metaDescription,
  path: route("pricing", LOCALE),
  locale: LOCALE,
  routeKey: "pricing",
  titleAbsolute: true,
});

export default function EnPricingPage() {
  return <PricingPage locale={LOCALE} />;
}
