import { test, expect } from "@playwright/test";

test.describe("Portfolio IDE", () => {
  test("affiche le shell IDE (explorer, scripts, terminal)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Explorer", { exact: false }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "about", exact: true })).toBeVisible();
    await expect(page.getByText("Terminal", { exact: true })).toBeVisible();
  });

  test("ouvre un fichier dans un onglet de l'éditeur", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("treeitem", { name: "contact.ts" }).click();
    await expect(page.getByRole("tab", { name: /contact\.ts/ })).toBeVisible();
    // contenu généré visible dans l'éditeur
    await expect(page.getByText("ContactLink").first()).toBeVisible();
  });

  test("un script s'exécute dans le terminal", async ({ page }) => {
    await page.goto("/");
    // attendre la fin du boot du terminal
    await expect(page.getByText("ready.", { exact: false })).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "about", exact: true }).click();
    await expect(page.getByText("Localisation", { exact: false })).toBeVisible();
  });

  test("la commande ci joue la pipeline jusqu'au succès", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "ci", exact: true }).click();
    await expect(page.getByText("All checks passed")).toBeVisible({ timeout: 15000 });
  });

  test("bascule entre la vue IDE et la vue simplifiée", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Vue simplifiée/ }).click();
    await expect(page.getByRole("heading", { name: "Nadjide Omar", level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: /Vue développeur/ })).toBeVisible();
    await page.getByRole("button", { name: /Vue développeur/ }).click();
    await expect(page.getByText("Explorer", { exact: false }).first()).toBeVisible();
  });
});
