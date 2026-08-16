import { test, expect, type Page } from "@playwright/test";

/**
 * Garde-fous de la section Comment ca marche. Les deux defauts corriges ici
 * sont revenus deux fois : le fil qui repasse par-dessus les textes quand la
 * bande libre est mal mesuree, et le numero en filigrane qui chevauche les
 * lignes. Les deux se voient mal sur une capture, d'ou la mesure.
 */

const VIEWPORTS = [
  { name: "desktop-large", width: 1440, height: 900 },
  { name: "desktop", width: 1280, height: 720 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

async function gotoProcessus(page: Page) {
  await page.goto("/", { waitUntil: "load" });
  await expect(page.locator("html")).toHaveAttribute("data-site-loaded", "", {
    timeout: 10_000,
  });
  // Le tracé n'existe qu'une fois la mise en page mesurée. On compte les
  // chemins plutot que d'attendre leur visibilite : tant que le scroll n'a pas
  // commence, le fil est a `stroke-dasharray: 0 1` donc considere invisible.
  await expect(page.locator("#processus svg [data-thread]")).toHaveCount(1);
  await page.waitForTimeout(400);
}

/**
 * Rects reels des lignes de texte, pas les boites paddees des blocs : une
 * comparaison sur les boites donne des faux positifs des qu'il y a du padding.
 */
const TEXT_RECTS = `(() => {
  const rects = [];
  for (const block of document.querySelectorAll("#processus [data-step-content]")) {
    const walk = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walk.nextNode())) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      rects.push(
        ...Array.from(range.getClientRects()).filter(
          (r) => r.width > 1 && r.height > 1,
        ),
      );
    }
  }
  return rects;
})()`;

for (const viewport of VIEWPORTS) {
  test.describe(`processus @ ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("le fil reste dans la bande libre, jamais sur les textes", async ({
      page,
    }) => {
      await gotoProcessus(page);
      const hits = await page.evaluate(`(() => {
        const box = document
          .querySelector("#processus svg [data-thread]")
          .getBoundingClientRect();
        // Test horizontal seul : le fil traverse toute la hauteur, donc c'est
        // son emprise laterale qui dit s'il empiete sur une colonne de texte.
        return ${TEXT_RECTS}.filter(
          (r) => r.left < box.right - 1 && r.right > box.left + 1,
        ).length;
      })()`);
      expect(hits).toBe(0);
    });

    test("aucun numero en filigrane ne chevauche une ligne de texte", async ({
      page,
    }) => {
      await gotoProcessus(page);
      const hits = await page.evaluate(`(() => {
        const rects = ${TEXT_RECTS};
        let hits = 0;
        for (const num of document.querySelectorAll("#processus [data-step-number]")) {
          const box = num.getBoundingClientRect();
          hits += rects.filter(
            (r) =>
              r.left < box.right - 1 &&
              r.right > box.left + 1 &&
              r.top < box.bottom - 1 &&
              r.bottom > box.top + 1,
          ).length;
        }
        return hits;
      })()`);
      expect(hits).toBe(0);
    });

    test("les numeros en filigrane sont affiches a tous les formats", async ({
      page,
    }) => {
      await gotoProcessus(page);
      const numbers = page.locator("#processus [data-step-number]");
      await expect(numbers).toHaveCount(4);
      const widths = await numbers.evaluateAll((els) =>
        els.map((el) => el.getBoundingClientRect().width),
      );
      for (const width of widths) expect(width).toBeGreaterThan(20);
    });
  });
}
