export interface SkillGroup {
  category: string;
  items: string[];
  gradient: string;
}

export interface Formation {
  id: number;
  title: string;
  subtitle: string;
  company: string;
  /** Ville / localisation de l'établissement (ex. "Sophia Antipolis (06)"). */
  location: string;
  date: string;
  achievements: string[];
  tech: string[];
}

export interface ExperienceEntry {
  id: number;
  /** Slug stable utilisé comme nom de fichier dans l'explorateur (ex. "call-to-action"). */
  slug: string;
  title: string;
  company: string;
  /** Ville / localisation (ex. "Nice (06)"). */
  location: string;
  date: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Modern & UI",
    items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Material UI"],
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    category: "Backend & API",
    items: ["Node.js", "FastAPI", "Python", "Prisma", "Express", "REST/GraphQL"],
    gradient: "from-emerald-400 to-green-600",
  },
  {
    category: "Data Science & IA",
    items: ["Polars", "Pandas", "DuckDB", "Ollama (Local LLM)", "Mistral AI", "PowerBI"],
    gradient: "from-purple-400 to-pink-600",
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Terraform", "Ansible", "GitHub Actions", "AWS", "Nginx"],
    gradient: "from-orange-400 to-red-600",
  },
  {
    category: "Base de Données",
    items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "SQLite", "Redis"],
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    category: "Mobile & Cross-Platform",
    items: ["React Native", "Expo", "Android", "iOS", "PWA"],
    gradient: "from-yellow-400 to-amber-600",
  },
];

export const formations: Formation[] = [
  {
    id: 1,
    title: "BTS SIO SLAM",
    subtitle: "Services Informatiques aux Organisations",
    company: "Campus Riera",
    location: "Nice (06)",
    date: "2021 — 2023",
    achievements: [
      "Création d'un site Laravel de gestion d'agence immobilière.",
      "Création d'un site météo avec l'API OpenWeather.",
      "Développement d'applications web en PHP, JavaScript.",
    ],
    tech: ["PHP", "Laravel", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    id: 2,
    title: "Bachelor 3 Développement Informatique",
    subtitle: "",
    company: "Sophia Ynov Campus",
    location: "Sophia Antipolis (06)",
    date: "2023 — 2024",
    achievements: [
      "Création d'un Pokedex interactif avec React et Material UI.",
      "Mise en place de CI/CD avec Docker.",
      "Création d'un site utilisant l'API Movie Database.",
      "Gestion d'une bibliothèque en Java.",
    ],
    tech: ["Docker", "Java", "React", "API REST"],
  },
  {
    id: 3,
    title: "Mastère Expert Développement Logiciel",
    subtitle: "",
    company: "Sophia Ynov Campus",
    location: "Sophia Antipolis (06)",
    date: "2024 — 2026",
    achievements: [
      "Projet Exploree : Application mobile de recommandation.",
      "Projet Smart Hire : Application RH avec IA pour le recrutement.",
      "Pipeline CI/CD avec Terraform, GitHub Actions, Ansible et déploiement AWS.",
      "Architecture Logicielle et bonnes pratiques.",
    ],
    tech: ["Terraform", "Ansible", "AWS", "React Native", "GitHub Actions"],
  },
];

export const experiences: ExperienceEntry[] = [
  {
    id: 1,
    slug: "call-to-action",
    title: "Développeur Full Stack & DevOps",
    company: "Call To Action (CTA)",
    location: "Nice — Av. Simone Veil (06)",
    date: "2021 — 2026",
    description:
      "Alternance de 5 ans : conception, développement et déploiement d'applications métiers critiques, de l'architecture à la mise en production (CI/CD, Docker, automatisation). Prise en charge du cycle de vie complet de plusieurs outils internes en production.",
    achievements: [
      "Plateforme interne d'évaluation de la qualité des échanges commerciaux, propulsée par un LLM auto-hébergé (Ollama / Mistral) — backend FastAPI, conteneurisation Docker, front Next.js, aucune donnée sensible ne quittant l'infrastructure.",
      "Automatisation du montage des campagnes du centre d'appels : temps de traitement réduit de ~20–60 min à ~5 min (Python, interface Tkinter, transformation de fichiers Excel via DuckDB, injection en base SQL Server avec contrôles de cohérence).",
      "Portail SSO interne centralisant l'accès à l'ensemble des applications métiers.",
      "Refonte d'un dashboard de statistiques en temps réel.",
      "Outil interne de gestion de parc matériel et logiciel.",
      "Mini-sites de campagnes de collecte de dons, scripts d'intégration de données (Python, Polars) et gestion de projets en méthode Agile.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Polars",
      "Docker",
      "Ollama",
      "Mistral",
      "DuckDB",
      "SQL Server",
      "Tailwind CSS",
    ],
  },
];
