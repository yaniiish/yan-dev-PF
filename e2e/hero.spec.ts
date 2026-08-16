import { test, expect, type Page, type Locator } from "@playwright/test";

/**
 * Garde-fous de mise en page du hero. Ces trois defauts sont ceux qui sont
 * apparus pendant la refonte : bords droits desalignes, label du role qui
 * passe sur plusieurs lignes, et libelle de CTA qui se casse sur deux lignes.
 *
 * La suite tourne sur les deux langues : les lignes du H1 sont en nowrap et
 * les libelles de CTA sont contraints, donc une traduction plus longue casse
 * exactement ces trois defauts. Le francais seul ne le verrait pas.
 */

const LOCALES = [
  { name: "fr", path: "/" },
  { name: "en", path: "/en" },
];

const VIEWPORTS = [
  { name: "desktop-large", width: 1440, height: 900 },
  { name: "desktop", width: 1280, height: 720 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

/** Hauteur de la navbar : h-16 sous md, h-20 a partir de md. */
const NAVBAR_HEIGHT = (width: number) => (width >= 768 ? 80 : 64);

/** Nombre de lignes reellement rendues, mesure sur les rects d'un Range. */
async function countRenderedLines(locator: Locator): Promise<number> {
  return locator.evaluate((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const tops = new Set(
      Array.from(range.getClientRects())
        .filter((rect) => rect.width > 0 && rect.height > 0)
        .map((rect) => Math.round(rect.top)),
    );
    return tops.size;
  });
}

async function gotoHero(page: Page, path: string) {
  await page.goto(path, { waitUntil: "load" });
  // Attend la sortie de l'ecran de chargement plutot qu'un delai arbitraire.
  await expect(page.locator("html")).toHaveAttribute("data-site-loaded", "", {
    timeout: 10_000,
  });
  await page.waitForTimeout(1200);
}

for (const locale of LOCALES) {
  for (const viewport of VIEWPORTS) {
    test.describe(`hero ${locale.name} @ ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({
        viewport: { width: viewport.width, height: viewport.height },
      });

      test("le libelle du role tient sur une seule ligne", async ({ page }) => {
        await gotoHero(page, locale.path);
        const role = page.locator("#hero p.font-mono").first();
        expect(await countRenderedLines(role)).toBe(1);
      });

      test("aucune ligne du titre ne deborde de sa colonne", async ({
        page,
      }) => {
        await gotoHero(page, locale.path);
        // La taille du titre est en cqw et chaque ligne est en nowrap : si le
        // coefficient est trop grand, le texte sort de la colonne au lieu de se
        // replier. On verifie la marge restante sur chaque ligne.
        const margins = await page.locator("#hero h1").evaluate((el) =>
          Array.from(el.querySelectorAll("span.whitespace-nowrap")).map(
            (span) => {
              const mask = span.closest("span.block") ?? span.parentElement!;
              return mask.clientWidth - span.getBoundingClientRect().width;
            },
          ),
        );
        expect(margins).toHaveLength(2);
        for (const margin of margins) {
          expect(margin).toBeGreaterThan(0);
        }
      });

      test("les libelles de CTA ne se cassent pas", async ({ page }) => {
        await gotoHero(page, locale.path);
        for (const href of ["#travail", "#contact"]) {
          const cta = page.locator(`#hero a[href='${href}']`).first();
          expect(await countRenderedLines(cta)).toBe(1);
        }
      });

      test("la section couvre au moins la hauteur d'ecran moins la navbar", async ({
        page,
      }) => {
        await gotoHero(page, locale.path);
        const height = await page
          .locator("#hero")
          .evaluate((el) => el.getBoundingClientRect().height);
        expect(height).toBeGreaterThanOrEqual(
          viewport.height - NAVBAR_HEIGHT(viewport.width) - 1,
        );
      });

      test("le lead et le paragraphe partagent le meme bord droit", async ({
        page,
      }) => {
        await gotoHero(page, locale.path);
        const measure = page.locator("#hero [data-hero-measure]");
        const [lead, intro] = await Promise.all([
          measure.locator("> p").nth(0).boundingBox(),
          measure.locator("> p").nth(1).boundingBox(),
        ]);
        expect(lead).not.toBeNull();
        expect(intro).not.toBeNull();
        const leadRight = lead!.x + lead!.width;
        const introRight = intro!.x + intro!.width;
        expect(Math.abs(leadRight - introRight)).toBeLessThanOrEqual(1);
      });
    });
  }
}
