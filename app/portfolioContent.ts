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
  location?: string;
  date: string;
  achievements: string[];
  tech: string[];
}

/** Un sous-projet mené au sein d'un poste (nom fonctionnel + réalisations + stack). */
export interface ExperienceProject {
  name: string;
  bullets: string[];
  tech: string[];
}

export interface ExperienceEntry {
  id: number;
  /** Slug stable (ex. "cta-devops"). */
  slug: string;
  title: string;
  company: string;
  /** Ville / localisation (ex. "Nice (06)"). */
  location: string;
  date: string;
  description: string;
  /** Sous-projets du poste : montre l'évolution des responsabilités. */
  projects: ExperienceProject[];
}

/* Compétences alignées sur le CV (dépôt _cv, faits/profil.toml) :
   les 5 premiers groupes = pratiqué en entreprise ; « Sur projets » = Mastère et projets personnels.
   Ne rien ajouter ici qui ne figure pas dans les faits vérifiés. */
export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn UI", "Material UI", "Framer Motion"],
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    category: "Backend & API",
    items: ["Node.js", "Python", "FastAPI", "Flask", "Java", "Spring Boot", "API REST", "SSO / RBAC"],
    gradient: "from-emerald-400 to-green-600",
  },
  {
    category: "Données & IA",
    items: ["MySQL", "MariaDB", "SQL Server", "MongoDB", "DuckDB", "Polars", "Pandas", "Mistral (LLM auto-hébergé)", "Ollama"],
    gradient: "from-purple-400 to-pink-600",
  },
  {
    category: "DevOps & Sécurité",
    items: ["Docker", "GitHub Actions", "CI/CD", "Linux", "Nginx", "Bash", "SSH", "Windows Server", "Audit des dépendances"],
    gradient: "from-orange-400 to-red-600",
  },
  {
    category: "Qualité & Méthodes",
    items: ["Vitest (plateforme qualité)", "Revue de code", "Méthode agile"],
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    category: "Sur projets",
    items: ["Kubernetes (K8s)", "Kustomize", "Terraform", "Playwright", "Jest", "ESLint", "Express", "SQLite", "PostgreSQL", "Supabase", "Socket.IO", "React Native", "Angular"],
    gradient: "from-yellow-400 to-amber-600",
  },
];

export const formations: Formation[] = [
  {
    id: 1,
    title: "BTS SIO option SLAM",
    subtitle: "Bac+2",
    company: "Campus Riera",
    location: "Nice (06)",
    date: "09/2021 – 09/2023",
    achievements: [],
    tech: [],
  },
  {
    id: 2,
    title: "Bachelor Développement Informatique",
    subtitle: "Bac+3",
    company: "Sophia Ynov Campus",
    date: "09/2023 – 09/2024",
    achievements: [],
    tech: [],
  },
  {
    id: 3,
    title: "Expert en développement logiciel",
    subtitle: "Bac+5 · titre RNCP niveau 7 (RNCP39583)",
    company: "Sophia Ynov Campus",
    date: "09/2024 – 09/2026",
    achievements: [
      "Pratique académique d'Angular.",
    ],
    tech: ["Angular"],
  },
];

/* Trois postes successifs chez CTA : la progression Technicien → Full Stack →
   Full Stack & DevOps est volontairement lisible. Les projets sont décrits par
   leur fonction (aucun nom interne, ni détail révélant le métier de l'entreprise),
   mais avec les mêmes chiffres que le CV. */
export const experiences: ExperienceEntry[] = [
  {
    id: 1,
    slug: "cta-technicien",
    title: "Technicien & Développeur Full Stack",
    company: "Call To Action (CTA)",
    location: "Nice (06)",
    date: "09/2021 – 09/2023",
    description:
      "Développement d'un pipeline d'intégration de données en Python.",
    projects: [
      {
        name: "Pipeline d'intégration de données",
        bullets: [
          "Pipeline ETL Python : import, normalisation, contrôle qualité, dédoublonnage et export des données.",
          "Préparation des données ramenée de 20–60 min à 5 min.",
        ],
        tech: ["Python", "DuckDB", "Polars", "SQL Server", "MySQL"],
      },
    ],
  },
  {
    id: 2,
    slug: "cta-fullstack",
    title: "Développeur Full Stack",
    company: "Call To Action (CTA)",
    location: "Nice (06)",
    date: "09/2023 – 09/2024",
    description:
      "Refonte d'un tableau de bord décisionnel temps réel.",
    projects: [
      {
        name: "Tableau de bord décisionnel temps réel",
        bullets: [
          "Refonte de la plateforme de suivi d'activité utilisée par 60 collaborateurs, soit la quasi-totalité de l'entreprise.",
          "Temps de chargement réduit de 30 %.",
        ],
        tech: ["Next.js", "React", "TypeScript", "Shadcn UI", "MySQL", "SQL Server"],
      },
    ],
  },
  {
    id: 3,
    slug: "cta-devops",
    title: "Développeur Full Stack & DevOps",
    company: "Call To Action (CTA)",
    location: "Nice (06)",
    date: "09/2024 – 09/2026",
    description:
      "Développement Full Stack et pratiques DevOps au sein d'une équipe technique de 3 personnes, dans un environnement de 6 applications en production.",
    projects: [
      {
        name: "Plateforme de pilotage qualité",
        bullets: [
          "Développement d'une plateforme de pilotage qualité en production : temps d'une évaluation ramené de 30 à 5 min (-83 %), plus de 60 utilisateurs.",
          "Développement de l'API d'analyse IA automatisée avec FastAPI, Ollama, Mistral auto-hébergé et MongoDB.",
          "Sur cette plateforme : tests Vitest et audit des dépendances bloquant en CI ; 5 vulnérabilités de criticité élevée détectées en août 2026, corrigées en production en septembre 2026.",
        ],
        tech: ["Next.js", "React", "TypeScript", "FastAPI", "MySQL", "MariaDB", "MongoDB", "Ollama", "Mistral", "Vitest"],
      },
      {
        name: "Authentification centralisée & portail",
        bullets: [
          "Authentification unique (SSO) et contrôle d'accès par rôles (RBAC) utilisés par les 6 applications web de l'entreprise.",
          "Portail web centralisant l'accès aux applications internes, avec SSO et accès par rôles.",
        ],
        tech: ["Next.js", "TypeScript", "Shadcn UI", "Framer Motion", "FastAPI", "SSO", "RBAC"],
      },
      {
        name: "Industrialisation & exploitation",
        bullets: [
          "CI/CD GitHub Actions sur les 3 applications critiques : plateforme qualité, tableau de bord et portail interne.",
          "Conteneurisation avec Docker.",
          "Déploiement sur serveurs Linux (Nginx, SSH, scripts Bash) et Windows, revue de code sur tous les projets, méthode agile.",
        ],
        tech: ["GitHub Actions", "Docker", "Linux", "Nginx", "Bash", "Windows Server"],
      },
      {
        name: "Application de gestion du matériel",
        bullets: [
          "Développement de toute l'application de A à Z : backend Java 21 / Spring Boot 4 et base MariaDB.",
          "Interface React et TypeScript avec Shadcn UI et Tailwind CSS ; Docker et GitHub Actions.",
        ],
        tech: ["Java 21", "Spring Boot 4", "MariaDB", "React", "TypeScript", "Shadcn UI", "Tailwind CSS", "Docker", "GitHub Actions"],
      },
    ],
  },
];
