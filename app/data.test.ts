import { describe, expect, it } from "vitest";
import { projectsData } from "./projectsData";
import { experiences, formations, skillGroups } from "./portfolioContent";
import { contactLinks } from "./contactData";
import { profile } from "./profileData";

/* ──────────────────────────────────────────────────────────────────────────
   Tests d'intégrité des données du portfolio : tout ce qui s'affiche
   (vue simplifiée + terminal) vient de ces sources uniques.
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
      expect(e.location.trim()).not.toBe("");
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
    /sentinel/i,
    /stats\s*live/i,
    /portail\s*cta/i,
    /amnesty/i,
    /restos\s+du/i,
    /t[ée]l[ée]marketing/i,
    /t[ée]l[ée]vendeur/i,
    /collecte\s+de\s+dons/i,
  ];

  const corpus = JSON.stringify({
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
});
