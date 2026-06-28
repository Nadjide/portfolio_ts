import { projectsData, type ProjectData } from "../projectsData";
import { skillGroups, formations, experiences, type ExperienceEntry } from "../portfolioContent";
import { contactLinks, findLink } from "../contactData";
import { profile } from "../profileData";

/* ──────────────────────────────────────────────────────────────────────────
   Système de fichiers du "CV" — UNE seule source de vérité éditable.
   Les contenus sont, quand c'est pertinent, *générés* depuis projectsData /
   portfolioContent pour éviter toute divergence avec le reste du portfolio.
   ────────────────────────────────────────────────────────────────────────── */

export type FileLang = "json" | "typescript" | "markdown" | "yaml";
export type IconKey = "json" | "ts" | "md" | "yml" | "github";

export interface FileNode {
  type: "file";
  name: string;
  path: string;
  lang: FileLang;
  icon: IconKey;
  content: string;
  /** Si présent : le fichier représente un projet → bouton "▶ Run demo" (open <key>). */
  projectKey?: string;
}

interface FolderNode {
  type: "folder";
  name: string;
  path: string;
  children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;

/* ─────────────────────────── helpers de slug ─────────────────────────── */

export const projectKeyOf = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ───────────────────── sérialiseurs (données → texte) ───────────────────── */

const j = (v: unknown) => JSON.stringify(v, null, 2);

/** Génère le contenu .ts d'un fichier projet à partir de projectsData. */
function projectToTs(p: ProjectData): string {
  const lines: string[] = [];
  lines.push(`import type { Project } from "@/types";`);
  lines.push("");
  lines.push(`export const ${projectKeyOf(p.title).replace(/-/g, "_")}: Project = {`);
  lines.push(`  title: ${j(p.title)},`);
  if (p.year) lines.push(`  year: ${j(p.year)},`);
  if (p.context) lines.push(`  context: ${j(p.context)},`);
  if (p.role) lines.push(`  role: ${j(p.role)},`);
  lines.push(`  stack: [${p.technologies.map((t) => j(t)).join(", ")}],`);
  if (p.githubUrl) lines.push(`  github: ${j(p.githubUrl)},`);
  if (p.liveUrl) lines.push(`  live: ${j(p.liveUrl)},`);
  lines.push(`  summary: [`);
  for (const para of p.description) lines.push(`    ${j(para)},`);
  lines.push(`  ],`);
  lines.push(`};`);
  lines.push("");
  lines.push(`// ▶ Astuce : tape « open ${projectKeyOf(p.title)} » dans le terminal`);
  lines.push(`//   (ou clique « Run demo ») pour lancer la démo du projet.`);
  return lines.join("\n");
}

/** slug "call-to-action" → "callToAction" (nom de la const exportée). */
const camel = (s: string) => s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

/** Génère le contenu .ts d'un fichier expérience à partir de portfolioContent. */
function experienceToTs(e: ExperienceEntry): string {
  const lines: string[] = [];
  lines.push(`import type { Experience } from "@/types";`);
  lines.push("");
  lines.push(`export const ${camel(e.slug)}: Experience = {`);
  lines.push(`  poste: ${j(e.title)},`);
  lines.push(`  entreprise: ${j(e.company)},`);
  lines.push(`  lieu: ${j(e.location)},`);
  lines.push(`  periode: ${j(e.date)},`);
  lines.push(`  stack: [${e.tech.map((t) => j(t)).join(", ")}],`);
  lines.push(`  resume: ${j(e.description)},`);
  lines.push(`  missions: [`);
  for (const a of e.achievements) lines.push(`    ${j(a)},`);
  lines.push(`  ],`);
  lines.push(`};`);
  return lines.join("\n");
}

/** contact.ts — généré depuis la source unique contactData. */
function contactToTs(): string {
  const lines: string[] = [];
  lines.push(`import type { ContactLink } from "@/types";`);
  lines.push("");
  lines.push(`export const contact: ContactLink[] = [`);
  for (const c of contactLinks) {
    lines.push(`  { label: ${j(c.label)}, value: ${j(c.value)}, href: ${j(c.href)} },`);
  }
  lines.push(`];`);
  lines.push("");
  lines.push(`// 💡 Tape « contact » dans le terminal pour des liens cliquables,`);
  lines.push(`//    ou « cv » pour télécharger mon CV en PDF.`);
  return lines.join("\n");
}

/** skills.json — stack groupée par catégorie. */
function skillsToJson(): string {
  const obj: Record<string, string[]> = {};
  for (const g of skillGroups) obj[g.category] = g.items;
  return j(obj);
}

/** education.md — dérivé des formations. */
function educationToMd(): string {
  const out: string[] = ["# 🎓 Formation", ""];
  for (const f of [...formations].reverse()) {
    out.push(`## ${f.title}`);
    if (f.subtitle) out.push(`*${f.subtitle}*`);
    out.push("");
    out.push(`- **Établissement** : ${f.company}`);
    out.push(`- **Lieu** : ${f.location}`);
    out.push(`- **Période** : ${f.date}`);
    if (f.tech.length) out.push(`- **Stack** : ${f.tech.join(", ")}`);
    out.push("");
    if (f.achievements.length) {
      out.push("### Réalisations");
      for (const a of f.achievements) out.push(`- ${a}`);
      out.push("");
    }
  }
  return out.join("\n");
}

/* ─────────────────────────── contenus rédigés ─────────────────────────── */

const PROFILE_JSON = j({
  nom: profile.name,
  titre: profile.title,
  localisation: profile.location,
  langues: profile.languages,
  liens: {
    github: findLink("GitHub")?.value,
    linkedin: findLink("LinkedIn")?.value,
  },
});

const ABOUT_README = [
  `# 👋 ${profile.name} — ${profile.title}`,
  "",
  ...profile.about.map((p) => `${p}\n`),
  "## Ce qui me caractérise",
  "",
  ...profile.highlights.map((h) => `- ${h.emoji} **${h.title}** : ${h.text}`),
  "",
  `> 📍 ${profile.location} · 🗣️ ${profile.languages.join(" · ")}`,
  "",
  "```bash",
  "# Explore le reste depuis la sidebar, ou tape « help » dans le terminal.",
  "```",
  "",
].join("\n");

const CI_YML = `name: CI/CD

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  quality:
    name: Lint · Test · Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test --if-present

      - name: Build
        run: npm run build

  deploy:
    name: Deploy
    needs: quality
    if: github.ref == 'refs/heads/master'
    runs-on: ubuntu-latest
    steps:
      - name: Build & push image
        run: |
          docker build -t portfolio:latest .
          echo "Pushing image to registry..."

      - name: Deploy to production
        run: echo "🚀 Deployed successfully"
`;

const PACKAGE_JSON = j({
  name: "nadjide-omar-portfolio",
  version: "1.0.0",
  description: "Portfolio interactif façon IDE — Ingénieur DevOps & Full Stack",
  author: "Nadjide Omar <nadjide.omar@outlook.fr>",
  scripts: {
    about: "Affiche le profil",
    skills: "Affiche la stack technique",
    experience: "Liste les expériences pro",
    projects: "Liste les projets",
    education: "Affiche la formation",
    contact: "Affiche les liens (cliquables)",
    ci: "Lance la pipeline CI/CD",
    "download:cv": "Télécharge le CV (PDF)",
    clear: "Vide le terminal",
  },
  keywords: ["devops", "fullstack", "docker", "ci-cd", "nextjs", "fastapi", "python"],
  license: "MIT",
});

/* ─────────────────── projets : générés depuis projectsData ─────────────────── */

const PROJECT_FILES: FileNode[] = projectsData.map((p) => {
  const key = projectKeyOf(p.title);
  return {
    type: "file",
    name: `${key}.ts`,
    path: `projects/${key}.ts`,
    lang: "typescript",
    icon: "ts",
    content: projectToTs(p),
    projectKey: key,
  };
});

/* ─────────────── expériences : générées depuis portfolioContent ─────────────── */

const EXPERIENCE_FILES: FileNode[] = experiences.map((e) => ({
  type: "file",
  name: `${e.slug}.ts`,
  path: `experience/${e.slug}.ts`,
  lang: "typescript",
  icon: "ts",
  content: experienceToTs(e),
}));

/* ─────────────────────────────── L'ARBRE ─────────────────────────────── */

/** Aplatit l'arbre en liste de fichiers (pour recherche / palette / deep-link). */
export function allFiles(nodes: TreeNode[] = FILE_TREE): FileNode[] {
  return nodes.flatMap((n) => (n.type === "folder" ? allFiles(n.children) : [n]));
}

/** Trouve un fichier par chemin exact, sinon par nom, sinon par préfixe de chemin. */
export function findFile(query: string): FileNode | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  const files = allFiles();
  return (
    files.find((f) => f.path.toLowerCase() === q) ||
    files.find((f) => f.name.toLowerCase() === q) ||
    files.find((f) => f.path.toLowerCase().endsWith("/" + q)) ||
    files.find((f) => f.path.toLowerCase().startsWith(q)) ||
    files.find((f) => f.name.toLowerCase().startsWith(q))
  );
}

const FILE_TREE: TreeNode[] = [
  {
    type: "folder",
    name: ".github",
    path: ".github",
    children: [
      {
        type: "folder",
        name: "workflows",
        path: ".github/workflows",
        children: [
          {
            type: "file",
            name: "ci.yml",
            path: ".github/workflows/ci.yml",
            lang: "yaml",
            icon: "github",
            content: CI_YML,
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "about",
    path: "about",
    children: [
      {
        type: "file",
        name: "profile.json",
        path: "about/profile.json",
        lang: "json",
        icon: "json",
        content: PROFILE_JSON,
      },
      {
        type: "file",
        name: "README.md",
        path: "about/README.md",
        lang: "markdown",
        icon: "md",
        content: ABOUT_README,
      },
    ],
  },
  {
    type: "folder",
    name: "experience",
    path: "experience",
    children: EXPERIENCE_FILES,
  },
  {
    type: "folder",
    name: "projects",
    path: "projects",
    children: PROJECT_FILES,
  },
  {
    type: "file",
    name: "skills.json",
    path: "skills.json",
    lang: "json",
    icon: "json",
    content: skillsToJson(),
  },
  {
    type: "file",
    name: "education.md",
    path: "education.md",
    lang: "markdown",
    icon: "md",
    content: educationToMd(),
  },
  {
    type: "file",
    name: "contact.ts",
    path: "contact.ts",
    lang: "typescript",
    icon: "ts",
    content: contactToTs(),
  },
  {
    type: "file",
    name: "package.json",
    path: "package.json",
    lang: "json",
    icon: "json",
    content: PACKAGE_JSON,
  },
];

export const fileTree: TreeNode[] = FILE_TREE;
