import { expect, test } from "@playwright/test";

/**
 * L'écran de chargement ne doit se jouer qu'à la première arrivée dans la
 * session, pas à chaque navigation.
 *
 * Toute la navigation interne se fait en `<a>` natifs et non en `next/link` :
 * chaque clic recharge donc la page entière, ce qui rejouait l'écran. Une clé
 * `sessionStorage` et un script inline synchrone le neutralisent ensuite.
 */
test.describe("écran de chargement", () => {
  test("ne se joue qu'une fois par session", async ({ page }) => {
    const hydrationErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" && /hydrat/i.test(message.text())) {
        hydrationErrors.push(message.text());
      }
    });

    await page.goto("/");
    const overlay = page.locator("[data-site-loader]");
    await expect(overlay).toBeVisible({ timeout: 2000 });
    await expect(overlay).toBeHidden({ timeout: 5000 });

    // Rechargements complets : l'écran ne doit plus apparaître.
    for (const path of ["/prix-site-vitrine", "/site-internet/restaurant"]) {
      await page.goto(path);
      await expect(page.locator("[data-site-loader]")).toBeHidden();
      await expect(page.locator("h1")).toBeVisible();
    }

    // Le scroll doit être rendu au document.
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");

    // L'attribut posé avant l'hydratation ne doit pas provoquer d'écart.
    expect(hydrationErrors).toHaveLength(0);
  });

  test("revient dans une nouvelle session", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("[data-site-loader]")).toBeVisible({
      timeout: 2000,
    });
    await context.close();
  });
});
