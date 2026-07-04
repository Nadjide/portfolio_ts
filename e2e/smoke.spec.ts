import { test, expect } from "@playwright/test";

/* La notice d'accueil s'affiche à chaque visite : chaque test commence
   par choisir une vue (ou fermer la notice). */

test.describe("Notice d'accueil", () => {
  test("propose les deux vues", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Ce portfolio se découvre", { exact: false })).toBeVisible();
    // les cartes de choix (libellé + description, distinctes du bouton flottant)
    await expect(page.getByRole("button", { name: /L'essentiel de mon profil/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Vue terminal/ })).toBeVisible();
  });
});

test.describe("Vue terminal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Vue terminal/ }).click();
  });

  test("démarre sur le prompt avec l'aide affichée", async ({ page }) => {
    await expect(page.getByText("visitor").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "about", exact: true })).toBeVisible();
  });

  test("la commande about s'exécute", async ({ page }) => {
    await page.getByRole("button", { name: "about", exact: true }).click();
    await expect(page.getByText("Localisation", { exact: false })).toBeVisible();
  });

  test("docker ps liste les conteneurs", async ({ page }) => {
    const input = page.getByLabel("Terminal input");
    await input.fill("docker ps");
    await input.press("Enter");
    await expect(page.getByText("portfolio-web")).toBeVisible();
  });

  test("git log raconte le parcours en commits", async ({ page }) => {
    const input = page.getByLabel("Terminal input");
    await input.fill("git log");
    await input.press("Enter");
    await expect(page.getByText("Hello, World!", { exact: false })).toBeVisible();
  });

  test("la pipeline ci va jusqu'au succès", async ({ page }) => {
    await page.getByRole("button", { name: "ci", exact: true }).click();
    await expect(page.getByText("All checks passed")).toBeVisible({ timeout: 15000 });
  });
});

test.describe("Bascule de vues", () => {
  test("terminal → vue simplifiée → terminal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Vue terminal/ }).click();

    // vers la vue simplifiée (bouton flottant, transition ~1,2 s)
    await page.getByRole("button", { name: "Vue simplifiée", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Nadjide Omar", level: 1 })
    ).toBeVisible({ timeout: 10000 });

    // retour au terminal
    await page.getByRole("button", { name: /Terminal/ }).click();
    await expect(page.getByText("visitor").first()).toBeVisible({ timeout: 10000 });
  });
});
