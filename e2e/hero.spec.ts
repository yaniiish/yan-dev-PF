import { test, expect, type Page, type Locator } from "@playwright/test";

/**
 * Garde-fous de mise en page du hero. Ces trois defauts sont ceux qui sont
 * apparus pendant la refonte : bords droits desalignes, label du role qui
 * passe sur plusieurs lignes, et libelle de CTA qui se casse sur deux lignes.
 */

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

async function gotoHero(page: Page) {
  await page.goto("/", { waitUntil: "load" });
  // Attend la sortie de l'ecran de chargement plutot qu'un delai arbitraire.
  await expect(page.locator("html")).toHaveAttribute("data-site-loaded", "", {
    timeout: 10_000,
  });
  await page.waitForTimeout(1200);
}

for (const viewport of VIEWPORTS) {
  test.describe(`hero @ ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("le libelle du role tient sur une seule ligne", async ({ page }) => {
      await gotoHero(page);
      const role = page.locator("#hero p.font-mono").first();
      expect(await countRenderedLines(role)).toBe(1);
    });

    test("les libelles de CTA ne se cassent pas", async ({ page }) => {
      await gotoHero(page);
      for (const href of ["#exemples", "#contact"]) {
        const cta = page.locator(`#hero a[href='${href}']`).first();
        expect(await countRenderedLines(cta)).toBe(1);
      }
    });

    test("la section couvre au moins la hauteur d'ecran moins la navbar", async ({
      page,
    }) => {
      await gotoHero(page);
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
      await gotoHero(page);
      const measure = page.locator("#hero .max-w-\\[38rem\\]");
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
