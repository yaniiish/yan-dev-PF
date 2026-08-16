import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Processus } from "@/components/sections/Processus";
import { Travail } from "@/components/sections/Travail";

const LOCALE = "en" as const;

export default function EnHome() {
  return (
    <>
      <Hero locale={LOCALE} />
      <Travail locale={LOCALE} />
      <Processus locale={LOCALE} />
      <Pricing locale={LOCALE} />
      <Contact locale={LOCALE} />
    </>
  );
}
