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
    items: ["Node.js", "Python", "FastAPI", "Java", "API REST", "SSO / RBAC"],
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
    items: ["Vitest", "Playwright", "Jest", "ESLint", "Revue de code", "Méthode agile"],
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    category: "Sur projets",
    items: ["Kubernetes (K8s)", "Kustomize", "Terraform", "Express", "SQLite", "PostgreSQL", "Supabase", "Socket.IO", "React Native", "Expo"],
    gradient: "from-yellow-400 to-amber-600",
  },
];

export const formations: Formation[] = [
  {
    id: 1,
    title: "BTS SIO option SLAM",
    subtitle: "Bac+2 · Services Informatiques aux Organisations",
    company: "Campus Riera",
    location: "Nice (06)",
    date: "09/2021 – 09/2023",
    achievements: [
      "Création d'un site Laravel de gestion d'agence immobilière.",
      "Création d'un site météo avec l'API OpenWeather.",
      "Développement d'applications web en PHP, JavaScript.",
    ],
    tech: ["PHP", "Laravel", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    id: 2,
    title: "Bachelor Développement Informatique",
    subtitle: "Bac+3",
    company: "Sophia Ynov Campus",
    location: "Sophia Antipolis (06)",
    date: "09/2023 – 09/2024",
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
    title: "Expert en développement logiciel",
    subtitle: "Bac+5 · titre RNCP niveau 7 (RNCP39583)",
    company: "Sophia Ynov Campus",
    location: "Sophia Antipolis (06)",
    date: "09/2024 – 09/2026",
    achievements: [
      "Stajio : image Docker, déploiement Kubernetes (K8s) via Kustomize, CI GitHub Actions avec Vitest et Playwright.",
      "Projet Exploree : application mobile de recommandation.",
      "Projet Smart Hire : application RH avec IA pour le recrutement.",
      "Infrastructure as Code : travaux pratiques Terraform et déploiement AWS.",
      "Certification AWS Cloud Practitioner en préparation.",
    ],
    tech: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "React Native"],
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
      "Support technique et diagnostic d'anomalies des applications internes, puis premiers outils d'automatisation.",
    projects: [
      {
        name: "Pipeline d'intégration de données",
        bullets: [
          "Pipeline ETL Python automatisant l'import, la normalisation, le contrôle qualité, le dédoublonnage et l'export des données clients.",
          "Préparation d'une campagne ramenée de 20-60 min à 5 min.",
        ],
        tech: ["Python", "DuckDB", "Polars", "SQL Server", "MySQL"],
      },
      {
        name: "Sites de collecte pour associations",
        bullets: [
          "Développement de sites web de collecte : formulaires, pages de campagne et intégration responsive.",
          "Contenus différenciés par campagne pour adapter chaque site à son contexte.",
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
    location: "Nice (06)",
    date: "09/2023 – 09/2024",
    description:
      "Refonte des outils décisionnels temps réel et premiers pas de l'industrialisation (Docker, GitHub Actions).",
    projects: [
      {
        name: "Tableau de bord décisionnel temps réel",
        bullets: [
          "Refonte de la plateforme de suivi d'activité utilisée par 60 collaborateurs, soit la quasi-totalité de l'entreprise.",
          "Temps de chargement réduit de 30 %, tableaux de bord interactifs et reporting pour les équipes opérationnelles.",
          "Mise en place de la conteneurisation Docker et des premiers pipelines GitHub Actions de l'équipe.",
        ],
        tech: ["Next.js", "React", "TypeScript", "Shadcn UI", "MySQL", "SQL Server", "Docker", "GitHub Actions"],
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
      "Conception, sécurisation et livraison continue de 6 applications métier en production, au sein d'une équipe technique de 3 personnes.",
    projects: [
      {
        name: "Plateforme de pilotage qualité",
        bullets: [
          "Conception et maintien d'une plateforme d'évaluation qualité en production : temps d'une évaluation ramené de 30 à 5 min (-83 %), plus de 60 utilisateurs.",
          "Développement de l'API d'analyse IA automatisée (FastAPI, Ollama, Mistral auto-hébergé, MongoDB) : aucune donnée ne quitte l'infrastructure.",
          "Audit des dépendances bloquant en CI : 5 vulnérabilités de criticité élevée détectées et corrigées en production.",
        ],
        tech: ["Next.js", "React", "TypeScript", "FastAPI", "MySQL", "MariaDB", "MongoDB", "Ollama", "Mistral", "Vitest"],
      },
      {
        name: "Authentification centralisée & portail",
        bullets: [
          "Service d'authentification unique (SSO) et de contrôle d'accès par rôles sur lequel reposent les 6 applications web de l'entreprise.",
          "Portail web centralisant l'accès aux applications métier, avec une interface responsive.",
        ],
        tech: ["Next.js", "TypeScript", "Shadcn UI", "Framer Motion", "FastAPI", "SSO", "RBAC"],
      },
      {
        name: "Industrialisation & exploitation",
        bullets: [
          "CI/CD GitHub Actions (lint, tests, images Docker) sur les 3 applications critiques.",
          "Déploiement sur serveurs Linux (Nginx, SSH, scripts Bash) et Windows, revue de code sur tous les projets, méthode agile.",
        ],
        tech: ["GitHub Actions", "Docker", "Linux", "Nginx", "Bash", "Windows Server"],
      },
      {
        name: "Application de gestion du matériel",
        bullets: ["Application bureau de gestion du matériel interne : backend Java, interface React."],
        tech: ["Java", "React"],
      },
    ],
  },
];
