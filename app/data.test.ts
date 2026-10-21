import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { projectsData } from "./projectsData";
import { experiences, formations, skillGroups } from "./portfolioContent";
import { contactLinks, portfolioUrl } from "./contactData";
import { profile } from "./profileData";

/* ──────────────────────────────────────────────────────────────────────────
   Tests d'intégrité des données du portfolio : tout ce qui s'affiche
   dans la vitrine vient de ces sources uniques.
   ────────────────────────────────────────────────────────────────────────── */

describe("projectsData", () => {
  it("chaque projet a un titre, une description et une stack", () => {
    for (const p of projectsData) {
      expect(p.title.trim()).not.toBe("");
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.technologies.length).toBeGreaterThan(0);
    }
  });

  it("les ids sont uniques", () => {
    const ids = projectsData.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("portfolioContent", () => {
  it("chaque expérience/formation a titre, organisme, lieu et période", () => {
    for (const e of [...experiences, ...formations]) {
      expect(e.title.trim()).not.toBe("");
      expect(e.company.trim()).not.toBe("");
      if (e.location !== undefined) expect(e.location.trim()).not.toBe("");
      expect(e.date.trim()).not.toBe("");
    }
  });

  it("chaque groupe de compétences est non vide", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const g of skillGroups) expect(g.items.length).toBeGreaterThan(0);
  });
});

describe("contactLinks", () => {
  it("chaque lien a un href exploitable (mailto/tel/https)", () => {
    for (const c of contactLinks) {
      expect(c.href).toMatch(/^(mailto:|tel:|https:\/\/)/);
    }
  });

  it("les labels sont uniques", () => {
    const labels = contactLinks.map((c) => c.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

describe("profil", () => {
  it("a un nom, un titre et au moins un paragraphe de présentation", () => {
    expect(profile.name.trim()).not.toBe("");
    expect(profile.title.trim()).not.toBe("");
    expect(profile.about.length).toBeGreaterThan(0);
  });
});

/* ──────────────────────────────────────────────────────────────────────────
   Garde-fou confidentialité : aucun nom interne, client ou détail métier
   de l'employeur ne doit apparaître dans les données publiées.
   Si ce test casse, c'est qu'une donnée sensible a été (ré)introduite.
   ────────────────────────────────────────────────────────────────────────── */

describe("confidentialité", () => {
  const BANNED = [
    /nixxis/i,
    /seasoftware/i,
    /e-script/i,
    /\bsonar\b/i,
    /stats\s*live/i,
    /portail\s*cta/i,
    /amnesty/i,
    /restos\s+du/i,
    /t[ée]l[ée]marketing/i,
    /t[ée]l[ée]vendeur/i,
    /collecte\s+de\s+dons/i,
    /authcta/i,
    /int[ée]grateur\s+cta/i,
    /t[ée]l[ée]conseill/i,
    /t[ée]l[ée]acteur/i,
    /centre\s+d['’]appels?/i,
    /[ée]coutes?/i,
    /campagnes?/i,
    /collecte.*associations?/i,
  ];

  // Inclut les textes JSX et les métadonnées, pas seulement les données importées.
  const readPublicSources = (directory: string): string =>
    readdirSync(directory, { withFileTypes: true }).map(entry => {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) return readPublicSources(filename);
      return /\.tsx?$/.test(entry.name) && !entry.name.endsWith(".test.ts")
        ? readFileSync(filename, "utf8") : "";
    }).join("\n");

  const corpus = readPublicSources(path.join(process.cwd(), "app")) + JSON.stringify({
    projectsData,
    experiences,
    formations,
    skillGroups,
    contactLinks,
    profile,
  });

  it.each(BANNED.map((r) => [r.source, r] as const))(
    "ne contient pas « %s »",
    (_name, regex) => {
      expect(corpus).not.toMatch(regex);
    }
  );

  it("ne publie ni téléphone ni lien de téléchargement de CV", () => {
    expect(corpus).not.toMatch(/tel:|(?<!\d)(?:(?:\+33|0033)[ .-]?[1-9]|0[1-9])(?:[ .-]?\d{2}){4}(?!\d)|\.pdf\b/i);
  });
});

/* ──────────────────────────────────────────────────────────────────────────
   Cohérence avec le CV (dépôt _cv, faits/profil.toml) : le portfolio ne doit
   jamais affirmer ce que le CV ne peut pas défendre en entretien.
   ────────────────────────────────────────────────────────────────────────── */

describe("cohérence avec le CV", () => {
  const corpus = JSON.stringify({ projectsData, experiences, formations, skillGroups, profile });

  it("aucune affirmation fausse ou non vérifiée", () => {
    for (const regex of [/aws\s+certified/i, /\bmaster\s*2\b/i, /openshift/i, /hibernate|\bjpa\b|microservices/i, /pytest|prometheus|grafana/i]) {
      expect(corpus).not.toMatch(regex);
    }
  });

  it("aucune compétence non vérifiée dans la stack", () => {
    const items = skillGroups.flatMap((g) => g.items).join(" | ");
    for (const regex of [/ansible/i, /redis/i, /graphql/i, /power\s*bi/i, /prisma/i, /\bios\b/i, /android/i, /\bpwa\b/i]) {
      expect(items).not.toMatch(regex);
    }
  });

  it("les pratiques de projet restent hors des compétences professionnelles", () => {
    for (const g of skillGroups.filter((g) => g.category !== "Sur projets")) {
      expect(g.items.join(" ")).not.toMatch(/kubernetes|kustomize|terraform|playwright|jest|eslint/i);
    }
    const projectSkills = skillGroups.find(g => g.category === "Sur projets")!.items.join(" ");
    expect(projectSkills).toMatch(/Playwright/);
    expect(projectSkills).toMatch(/Jest/);
    expect(skillGroups.find(g => g.category === "Qualité & Méthodes")!.items.join(" ")).toMatch(/Vitest.*plateforme qualité/);
  });

  it("décrit un emploi terminé, sans attribuer une durée à Java ni dater les premiers pipelines", () => {
    expect(profile.about.join(" ")).toContain("25/09/2026");
    expect(experiences.at(-1)!.date).toBe("09/2024 – 09/2026");
    expect(corpus).not.toMatch(/depuis 2021|je maintiens|premiers pipelines|premiers pas de l'industrialisation|\d+ ans (?:de )?(?:Java|Spring)/i);
  });

  it("distingue l'environnement, l'équipe, le périmètre CI/CD et le SSO/RBAC", () => {
    expect(profile.tagline).toMatch(/équipe technique de 3 personnes.*environnement de 6 applications/);
    const projects = experiences.at(-1)!.projects;
    const delivery = projects.find(p => p.name === "Industrialisation & exploitation")!;
    expect(delivery.bullets.join(" ")).toMatch(/CI\/CD GitHub Actions sur les 3 applications critiques/);
    expect(delivery.bullets.join(" ")).not.toMatch(/tests|Vitest|audit/);
    expect(projects.find(p => p.name === "Authentification centralisée & portail")!.bullets.join(" ")).toMatch(/SSO.*RBAC.*6 applications/);
    for (const p of projects.filter(p => p.name !== "Plateforme de pilotage qualité")) {
      expect(p.bullets.join(" ")).not.toMatch(/Vitest|audit.*bloquant/);
    }
  });

  it("rend visible l'application professionnelle Java/Spring Boot et sa contribution complète", () => {
    const app = experiences.at(-1)!.projects.find(p => p.name === "Application de gestion du matériel")!;
    expect(app.tech).toEqual(expect.arrayContaining(["Java 21", "Spring Boot 4", "MariaDB", "React", "TypeScript", "Shadcn UI", "Tailwind CSS", "Docker", "GitHub Actions"]));
    expect(app.bullets.join(" ")).toMatch(/toute l'application de A à Z/);
    expect(JSON.stringify(app)).not.toMatch(/JPA|Hibernate|tests|microservices|Sentinel/i);
    expect(skillGroups.find(g => g.category === "Backend & API")!.items).toContain("Spring Boot");
  });

  it("conserve le diplôme officiel et AWS en préparation sans ancienne date d'examen", () => {
    expect(formations.at(-1)!.title).toBe("Expert en développement logiciel");
    expect(formations.at(-1)!.subtitle).toMatch(/Bac\+5.*RNCP niveau 7.*RNCP39583/);
    expect(profile.certification).toBe("AWS Cloud Practitioner (préparation en cours)");
    expect(corpus).not.toMatch(/15\/10\/2026|2026-10-15|déploiement AWS/);
  });

  it("limite les fiches aux projets attestés et ne leur invente pas une date", () => {
    expect(projectsData.map(p => p.title).sort()).toEqual(["DevOps Playground", "Pokito", "Stajio"]);
    for (const p of projectsData) expect(p.year).toBeUndefined();
    expect(corpus).not.toMatch(/Expo|SQLModel|FisherFans|Smart Hire|Exploree|Pokedex|Laravel|OpenWeather/);
  });

  it("utilise les coordonnées canoniques", () => {
    expect(portfolioUrl).toBe("https://portfolio-ts-nine.vercel.app/");
    expect(contactLinks.find(c => c.label === "LinkedIn")!.href).toBe("https://www.linkedin.com/in/nadjide-omar");
    expect(contactLinks.find(c => c.label === "GitHub")!.href).toBe("https://github.com/Nadjide");
  });

  it("dates au format MM/AAAA – MM/AAAA", () => {
    for (const e of [...experiences, ...formations]) {
      expect(e.date).toMatch(/^\d{2}\/\d{4} – \d{2}\/\d{4}$/);
    }
  });
});
