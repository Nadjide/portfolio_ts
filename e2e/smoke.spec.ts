import { test, expect } from "@playwright/test";
import path from "node:path";

test("ouvre l'unique vitrine, même depuis un ancien lien terminal", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("portfolio_view", "terminal"));
  await page.goto("/?view=terminal");
  await expect(page.getByRole("heading", { name: "Nadjide Omar", level: 1 })).toBeVisible();
  await expect(page.getByLabel("Terminal input")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /terminal/i })).toHaveCount(0);
  await expect(page).not.toHaveURL(/view=/);
});

test("le schéma présente chaque couche et fonctionne au clavier", async ({ page }) => {
  await page.goto("/");
  const api = page.getByRole("button", { name: "02 API", exact: true });
  await api.focus();
  await page.keyboard.press("Enter");
  await expect(api).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#architecture-detail")).toContainText("FastAPI");
  await page.getByRole("button", { name: "04 Livraison", exact: true }).click();
  await expect(api).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("#architecture-detail")).toContainText("GitHub Actions");
});

test("les projets s'ouvrent, ferment avec Échap et rendent le focus", async ({ page }) => {
  await page.goto("/");
  const project = page.getByRole("button", { name: "Découvrir le projet Stajio", exact: true });
  await project.click();
  const dialog = page.getByRole("dialog", { name: "Projet Stajio" });
  await expect(dialog).toBeVisible();
  await expect(page).toHaveURL(/project=stajio/);
  await expect(dialog.getByRole("link", { name: /Code source/ })).toHaveAttribute("href", "https://github.com/Nadjide/stajio");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(project).toBeFocused();
  await expect(page).not.toHaveURL(/project=/);
  expect(await page.evaluate(() => getComputedStyle(document.body).overflowY)).not.toBe("hidden");
});

test("conserve les liens projets existants et la fermeture explicite", async ({ page }) => {
  await page.goto("/?view=simple&project=stajio");
  const dialog = page.getByRole("dialog", { name: "Projet Stajio" });
  await expect(dialog).toBeVisible();
  await expect(page).toHaveURL(/project=stajio/);
  await expect(page).not.toHaveURL(/view=/);
  await dialog.getByRole("button", { name: "Fermer le projet" }).click();
  await expect(dialog).toHaveCount(0);
});

test("le parcours s'ouvre et les liens de contact sont exploitables", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Parcours", exact: true }).click();
  const role = page.locator("summary").filter({ hasText: "Technicien & Développeur Full Stack" });
  await role.click();
  await expect(page.getByRole("heading", { name: "Pipeline d'intégration de données" })).toBeVisible();
  await expect(page.getByRole("link", { name: "nadjide.omar@outlook.fr", exact: true })).toHaveAttribute("href", "mailto:nadjide.omar@outlook.fr");
  await expect(page.getByRole("link", { name: "Demander mon CV" }).first()).toHaveAttribute("href", /subject=Demande/);
});

test("les fiches restent utilisables avec les animations réduites", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?project=devops-playground");
  await expect(page.getByRole("dialog", { name: "Projet DevOps Playground" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("le contenu reste visible sans JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Nadjide Omar", level: 1 })).toBeVisible();
  await expect(page.locator(".sv-section-heading").first()).toHaveCSS("opacity", "1");
  await expect(page.getByText("Call To Action (CTA) · Nice (06)").first()).toBeVisible();
  await context.close();
});

for (const viewport of [{ width: 390, height: 844, label: "mobile" }, { width: 768, height: 1024, label: "tablet" }, { width: 1440, height: 1000, label: "desktop" }]) {
  test("la vitrine tient dans le viewport " + viewport.label, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Nadjide Omar", level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport);
    if (viewport.label !== "tablet") await page.screenshot({ path: path.join(process.cwd(), "artifacts", "portfolio-" + viewport.label + ".png"), fullPage: false });
    await page.getByRole("button", { name: "Découvrir le projet FisherFans API" }).click();
    await expect(page.getByRole("dialog", { name: "Projet FisherFans API" })).toBeVisible();
  });
}
