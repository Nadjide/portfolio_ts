import { test, expect } from "@playwright/test";
import path from "node:path";
import { writeFile } from "node:fs/promises";

test("le contenu public, les détails et les métadonnées suivent les faits actuels", async ({ page, request }) => {
  await page.goto("/");
  await page.locator(".sv-about-details > summary").click();
  for (const detail of await page.locator("details.sv-experience").all()) {
    if (await detail.getAttribute("open") === null) await detail.locator("summary").click();
  }

  await expect(page.locator(".sv-about-details")).toContainText("25/09/2026");
  const latest = page.locator(".sv-experience").first();
  await expect(latest).toContainText("équipe technique de 3 personnes, dans un environnement de 6 applications");
  await expect(latest).toContainText("CI/CD GitHub Actions sur les 3 applications critiques");
  await expect(latest).toContainText("(RBAC) utilisés par les 6 applications");
  await expect(latest).toContainText("toute l'application de A à Z");
  await expect(latest).toContainText("Java 21 / Spring Boot 4");
  const quality = page.locator(".sv-skill-group").filter({ hasText: "Qualité & Méthodes" });
  await expect(quality).toContainText("Vitest (plateforme qualité)");
  await expect(quality).not.toContainText(/Playwright|Jest/);
  await expect(page.locator("#education")).toContainText("RNCP39583");
  await expect(page.locator("#education")).toContainText("AWS Cloud Practitioner (préparation en cours)");
  await expect(page.locator("footer").getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/nadjide-omar");
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/depuis 2021|je maintiens|premiers pipelines|Master 2|Pytest|JPA|Hibernate|microservices|campagnes?|téléconseill|centre d.appels?|FisherFans|Smart Hire|Exploree|Pokedex/i);
  await expect(page.locator('a[href^="tel:"], a[href$=".pdf"]')).toHaveCount(0);
  expect((await request.get("/videos/stajio_video.mp4")).status()).toBe(404);
  // Next normalise le slash final du domaine ; comparer les URL normalisées.
  expect(new URL(await page.locator('link[rel="canonical"]').getAttribute("href") as string).href).toBe("https://portfolio-ts-nine.vercel.app/");
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    await expect(page.locator(selector)).toHaveAttribute("content", /Java\/Spring Boot.*09\/2026.*3 applications critiques/);
  }
  const person = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(person.url).toBe("https://portfolio-ts-nine.vercel.app/");
  expect(person.sameAs).toContain("https://www.linkedin.com/in/nadjide-omar");
  expect(person).not.toHaveProperty("worksFor");
  const shareImageUrl = new URL(await page.locator('meta[property="og:image"]').getAttribute("content") as string);
  const shareImage = await request.get(shareImageUrl.pathname + shareImageUrl.search);
  expect(shareImage.status()).toBe(200);
  expect(shareImage.headers()["content-type"]).toContain("image/png");
  await writeFile(path.join(process.cwd(), "artifacts", "portfolio-share.png"), await shareImage.body());
});

test("un ancien lien vers un projet retiré ne réaffiche pas sa fiche", async ({ page }) => {
  await page.goto("/?project=fisherfans-api");
  await expect(page.getByRole("heading", { name: "Nadjide Omar", level: 1 })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /FisherFans/ })).toHaveCount(0);
});

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

test("Sureau ouvre la sélection et sa fiche présente la vidéo officielle", async ({ page, request }) => {
  await page.goto("/");
  const projects = page.locator("#projects");
  const cards = projects.getByRole("button", { name: /Découvrir le projet/ });
  const titles = ["Sureau", "Stajio", "DevOps Playground", "Pokito"];
  await expect(cards).toHaveCount(titles.length);
  for (const [index, title] of titles.entries()) {
    await expect(cards.nth(index)).toHaveAccessibleName("Découvrir le projet " + title);
  }
  await expect(cards.first()).toContainText("PROJET PRINCIPAL");
  await expect(cards.last()).toContainText("04");

  await page.goto("/?project=sureau");
  const dialog = page.getByRole("dialog", { name: "Projet Sureau" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Code source" })).toHaveAttribute("href", "https://github.com/Nadjide/sureau");
  const video = dialog.locator("video");
  await expect(video).toHaveAttribute("poster", "/images/sureau-atelier-3d.jpg");
  await expect(video).toHaveAttribute("src", "/videos/optimized/sureau-presentation.mp4");
  const media = await request.get("/videos/optimized/sureau-presentation.mp4", { headers: { Range: "bytes=0-4095" } });
  expect(media.status()).toBe(206);
  expect(media.headers()["content-type"]).toContain("video/mp4");
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

test("DevOps Playground reste troisième et sa galerie se parcourt au clavier", async ({ page, request }) => {
  await page.goto("/");
  const cards = page.locator("#projects").getByRole("button", { name: /Découvrir le projet/ });
  const playground = cards.nth(2);
  await expect(playground).toHaveAccessibleName("Découvrir le projet DevOps Playground");
  await expect(playground.locator("img")).toHaveAttribute("src", "/images/devops-playground-rollback.webp");
  await playground.click();
  await expect(page).toHaveURL(/project=devops-playground/);

  const dialog = page.getByRole("dialog", { name: "Projet DevOps Playground" });
  const views = dialog.getByRole("group", { name: "Vues du projet" });
  const rollback = views.getByRole("button", { name: /Rollback Docker/ });
  await expect(rollback).toHaveAttribute("aria-pressed", "true");
  await expect(dialog.locator("figcaption")).toContainText("Docker local");

  const incident = views.getByRole("button", { name: /Incident de livraison/ });
  await incident.focus();
  await page.keyboard.press("Enter");
  await expect(incident).toHaveAttribute("aria-pressed", "true");
  await expect(rollback).toHaveAttribute("aria-pressed", "false");
  await expect(dialog.locator("figure img")).toHaveAttribute("src", "/images/devops-playground-pipeline.webp");
  await expect(dialog.getByRole("link", { name: "Agrandir la capture Incident de livraison" })).toHaveAttribute("href", "/images/devops-playground-pipeline.webp");
  await expect(dialog.locator("figcaption")).toContainText("Simulation navigateur");
  await views.getByRole("button", { name: /Mission guidée/ }).click();
  await expect(dialog.locator("figure img")).toHaveAttribute("src", "/images/devops-playground-mission.webp");
  await expect(dialog.getByRole("link", { name: "Code source" })).toHaveAttribute("href", "https://github.com/Nadjide/devops-playground");

  for (const name of ["rollback", "pipeline", "mission"]) {
    const image = await request.get("/images/devops-playground-" + name + ".webp");
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/webp");
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(playground).toBeFocused();
  await playground.click();
  await expect(views.getByRole("button", { name: /Rollback Docker/ })).toHaveAttribute("aria-pressed", "true");
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
    if (viewport.label !== "tablet") {
      await page.screenshot({ path: path.join(process.cwd(), "artifacts", "portfolio-" + viewport.label + ".png"), fullPage: false });
      await page.locator(".sv-experience").first().screenshot({ path: path.join(process.cwd(), "artifacts", "portfolio-" + viewport.label + "-experience.png") });
      await page.locator("#skills").screenshot({ path: path.join(process.cwd(), "artifacts", "portfolio-" + viewport.label + "-skills.png") });
    }
    await page.getByRole("button", { name: "Découvrir le projet Pokito" }).click();
    await expect(page.getByRole("dialog", { name: "Projet Pokito" })).toBeVisible();
  });
}
