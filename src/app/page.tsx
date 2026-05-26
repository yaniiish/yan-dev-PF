import { Contact } from "@/components/sections/Contact";
import { Examples } from "@/components/sections/Examples";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Why } from "@/components/sections/Why";

export default function Home() {
  return (
    <>
      <Hero />
      <Why />
      <Services />
      <Examples />
      <Pricing />
      <Contact />
    </>
  );
}
