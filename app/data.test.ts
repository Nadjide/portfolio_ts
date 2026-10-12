import { describe, expect, it } from "vitest";
import { projectsData } from "./projectsData";
import { experiences, formations, skillGroups } from "./portfolioContent";
import { contactLinks } from "./contactData";
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
    /authcta/i,
    /int[ée]grateur\s+cta/i,
    /t[ée]l[ée]conseill/i,
    /t[ée]l[ée]acteur/i,
    /centre\s+d['’]appels?/i,
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

/* ──────────────────────────────────────────────────────────────────────────
   Cohérence avec le CV (dépôt _cv, faits/profil.toml) : le portfolio ne doit
   jamais affirmer ce que le CV ne peut pas défendre en entretien.
   ────────────────────────────────────────────────────────────────────────── */

describe("cohérence avec le CV", () => {
  const corpus = JSON.stringify({ projectsData, experiences, formations, skillGroups, profile });

  it("aucune affirmation fausse ou non vérifiée", () => {
    for (const regex of [/aws\s+certified/i, /\bmaster\s*2\b/i, /spring\s*boot/i, /openshift/i]) {
      expect(corpus).not.toMatch(regex);
    }
  });

  it("aucune compétence non vérifiée dans la stack", () => {
    const items = skillGroups.flatMap((g) => g.items).join(" | ");
    for (const regex of [/ansible/i, /redis/i, /graphql/i, /power\s*bi/i, /prisma/i, /\bios\b/i, /android/i, /\bpwa\b/i]) {
      expect(items).not.toMatch(regex);
    }
  });

  it("Kubernetes et Terraform uniquement dans « Sur projets »", () => {
    for (const g of skillGroups.filter((g) => g.category !== "Sur projets")) {
      expect(g.items.join(" ")).not.toMatch(/kubernetes|terraform/i);
    }
  });

  it("dates au format MM/AAAA – MM/AAAA", () => {
    for (const e of [...experiences, ...formations]) {
      expect(e.date).toMatch(/^\d{2}\/\d{4} – \d{2}\/\d{4}$/);
    }
  });
});
