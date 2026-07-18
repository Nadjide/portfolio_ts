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
  /** Sous-projets du poste — permet de montrer l'évolution des responsabilités. */
  projects: ExperienceProject[];
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

/* Trois contrats successifs chez CTA — la progression Technicien → Full Stack →
   Full Stack & DevOps est volontairement lisible. Les projets sont décrits par
   leur fonction (aucun nom interne, ni détail révélant le métier de l'entreprise). */
export const experiences: ExperienceEntry[] = [
  {
    id: 1,
    slug: "cta-technicien",
    title: "Technicien & Développeur Full Stack",
    company: "Call To Action (CTA)",
    location: "Nice — Av. Simone Veil (06)",
    date: "2021 — 2023",
    description:
      "Support technique et développement d'applications internes, montée en compétence progressive vers le développement full stack.",
    projects: [
      {
        name: "Outil d'intégration de données",
        bullets: [
          "Développement d'un pipeline ETL automatisant l'import, la transformation, le contrôle qualité et l'export de données clients.",
          "Implémentation de traitements de normalisation, de validation et de dédoublonnage, avec des scripts Python exploitant SQL, DuckDB et Polars.",
        ],
        tech: ["Python", "DuckDB", "Polars", "SQL Server", "MySQL"],
      },
      {
        name: "Application d'aide à la vente en temps réel",
        bullets: [
          "Développement d'une application web affichant des scripts de vente personnalisés en temps réel aux équipes commerciales.",
          "Gestion de contenus différenciés par campagne afin d'adapter le message à chaque contexte.",
        ],
        tech: ["HTML", "CSS", "JavaScript"],
      },
    ],
  },
  {
    id: 2,
    slug: "cta-fullstack",
    title: "Développeur Full Stack",
    company: "Call To Action (CTA)",
    location: "Nice — Av. Simone Veil (06)",
    date: "2023 — 2024",
    description:
      "Conception d'applications décisionnelles et d'outils de reporting temps réel pour les équipes opérationnelles.",
    projects: [
      {
        name: "Tableau de bord décisionnel",
        bullets: [
          "Développement d'une plateforme de suivi temps réel de l'activité, conçue pour supporter l'analyse de données à grande échelle.",
          "Création de tableaux de bord interactifs et de fonctionnalités de reporting pour les équipes opérationnelles.",
        ],
        tech: ["Next.js", "TypeScript", "Shadcn UI", "MySQL", "SQL Server"],
      },
    ],
  },
  {
    id: 3,
    slug: "cta-devops",
    title: "Développeur Full Stack & DevOps",
    company: "Call To Action (CTA)",
    location: "Nice — Av. Simone Veil (06)",
    date: "2024 — 2026",
    description:
      "Mise en place et amélioration de workflows CI/CD, conteneurisation Docker, culture DevOps appliquée au quotidien.",
    projects: [
      {
        name: "Outil de pilotage qualité",
        bullets: [
          "Développement d'un outil de supervision (grilles d'évaluation, dashboards) pour le suivi qualité et le traitement des anomalies.",
          "Intégration d'une IA locale pour l'analyse automatisée de données métier, gestion des accès via SSO et interaction avec plusieurs bases de données relationnelles.",
        ],
        tech: ["Next.js", "TypeScript", "Shadcn UI", "FastAPI", "MySQL", "MariaDB", "Mistral"],
      },
      {
        name: "Portail d'entreprise",
        bullets: [
          "Développement d'un portail web centralisant l'accès aux différentes applications métiers de l'entreprise.",
          "Mise en œuvre d'une authentification SSO et d'un contrôle d'accès sécurisé basé sur les rôles utilisateurs, avec une interface responsive moderne.",
        ],
        tech: ["Next.js", "TypeScript", "Shadcn UI", "Framer Motion", "FastAPI", "SSO"],
      },
    ],
  },
];
