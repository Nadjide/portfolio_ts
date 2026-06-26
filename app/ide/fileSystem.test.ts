import { describe, it, expect } from "vitest";
import { allFiles, findFile, projectKeyOf } from "./fileSystem";
import { projectsData } from "../projectsData";
import { experiences } from "../portfolioContent";
import { contactLinks } from "../contactData";

const files = allFiles();
const byPath = (p: string) => files.find((f) => f.path === p);

describe("projectKeyOf", () => {
  it("slugifie titres avec accents / espaces / symboles", () => {
    expect(projectKeyOf("Smart Hire")).toBe("smart-hire");
    expect(projectKeyOf("FisherFans API")).toBe("fisherfans-api");
    expect(projectKeyOf("Intégrateur Nixxis!")).toBe("integrateur-nixxis");
  });
});

describe("fileTree", () => {
  it("contient les fichiers clés", () => {
    const expected = [
      "about/profile.json",
      "about/README.md",
      ".github/workflows/ci.yml",
      "skills.json",
      "education.md",
      "contact.ts",
      "package.json",
    ];
    for (const p of expected) expect(byPath(p), p).toBeTruthy();
  });

  it("génère un fichier par projet (avec projectKey et titre)", () => {
    for (const p of projectsData) {
      const node = byPath(`projects/${projectKeyOf(p.title)}.ts`);
      expect(node, p.title).toBeTruthy();
      expect(node?.projectKey).toBe(projectKeyOf(p.title));
      expect(node?.content).toContain(p.title);
    }
  });

  it("génère un fichier par expérience", () => {
    for (const e of experiences) {
      const node = byPath(`experience/${e.slug}.ts`);
      expect(node, e.slug).toBeTruthy();
      expect(node?.content).toContain(e.company);
    }
  });
});

describe("contenus générés", () => {
  it("profile.json / skills.json / package.json sont du JSON valide", () => {
    for (const p of ["about/profile.json", "skills.json", "package.json"]) {
      expect(() => JSON.parse(byPath(p)!.content), p).not.toThrow();
    }
  });

  it("skills.json regroupe la stack par catégorie", () => {
    const obj = JSON.parse(byPath("skills.json")!.content);
    expect(Object.keys(obj).length).toBeGreaterThan(0);
  });

  it("contact.ts reflète la source unique de contact", () => {
    const content = byPath("contact.ts")!.content;
    for (const l of contactLinks) expect(content, l.label).toContain(l.href);
  });
});

describe("findFile", () => {
  it("trouve par chemin, nom et préfixe", () => {
    expect(findFile("skills.json")?.path).toBe("skills.json");
    expect(findFile("contact.ts")?.path).toBe("contact.ts");
    expect(findFile("projects/")?.path.startsWith("projects/")).toBe(true);
    expect(findFile("inexistant.xyz")).toBeUndefined();
  });
});
