import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

/**
 * Fonts partagées par les deux root layouts (route groups `(fr)` et `(en)`).
 * next/font dédoublonne au build : déclarer les mêmes fonts dans deux layouts
 * ne charge pas les fichiers deux fois.
 */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Classes à poser sur `<html>` : variables CSS des trois fonts. */
export const fontVariables = `${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;
