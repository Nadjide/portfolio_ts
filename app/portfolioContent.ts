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
    title: "Mastère Expert Développement Full Stack",
    subtitle: "",
    company: "Sophia Ynov Campus",
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
    date: "2021 — 2026",
    description:
      "Conception, développement et déploiement d'applications métiers critiques en alternance. Prise en charge complète du cycle de vie logiciel, de l'architecture à la mise en production (CI/CD, Docker, automatisation).",
    achievements: [
      "Portail CTA : Hub SSO centralisant l'accès à toutes les applications internes.",
      "Stats Live 2.0 : Refonte complète du dashboard de statistiques en temps réel.",
      "Sentinel : Outil de gestion de parc matériel et logiciel.",
      "Création de mini-sites pour des campagnes de collecte de dons.",
      "Gestion de projets informatiques en méthode Agile.",
      "Développement de scripts d'intégration de données (Python, Polars).",
    ],
    tech: ["Next.js", "TypeScript", "FastAPI", "Python", "Polars", "Docker", "Tailwind CSS"],
  },
  {
    id: 2,
    slug: "sonar",
    title: "Plateforme IA locale d'évaluation qualité (Sonar)",
    company: "Call To Action (CTA)",
    date: "2024 — 2025",
    description:
      "Sonar évalue la qualité des échanges commerciaux grâce à un LLM hébergé en local (Ollama / Mistral) — aucune donnée sensible ne quitte l'infrastructure.",
    achievements: [
      "Backend FastAPI exposant l'inférence du modèle local.",
      "Conteneurisation complète (Docker) de la stack IA + bases de données.",
      "Front Next.js : tableaux de bord et restitution des scores.",
      "Pipeline de traitement des transcriptions et calcul d'indicateurs qualité.",
    ],
    tech: ["FastAPI", "Docker", "Next.js", "MySQL", "MariaDB", "Ollama", "Mistral"],
  },
  {
    id: 3,
    slug: "integrateur-nixxis",
    title: "Intégrateur / Automatisation de campagnes Nixxis",
    company: "Call To Action (CTA)",
    date: "2022 — 2024",
    description:
      "Application Python automatisant le montage des campagnes du call center : le temps de montage est passé de 20–60 min à ~5 min, avec une fiabilité accrue.",
    achievements: [
      "Interface Tkinter pilotant tout le pipeline de montage.",
      "Lecture/transformation des fichiers Excel via DuckDB (SQL in-process).",
      "Injection des données dans SQL Server avec contrôles de cohérence.",
      "Suppression des erreurs de mapping manuelles.",
    ],
    tech: ["Python", "DuckDB", "SQL Server", "Excel", "Tkinter"],
  },
];
