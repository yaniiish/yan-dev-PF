import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Travail } from "@/components/sections/Travail";

export default function Home() {
  return (
    <>
      <Hero />
      <Travail />
      <Pricing />
      <Contact />
    </>
  );
}
