/* Profil : source unique du pitch et des informations de la vitrine.
   Cohérence : mêmes faits et mêmes chiffres que le CV (dépôt _cv, faits/profil.toml),
   anonymisés côté employeur (précepte P5 : aucun nom interne ni métier de l'entreprise). */

export interface ProfileHighlight {
  /** Nom d'icône Iconify (ex. « lucide:rocket ») pour l'UI vitrine. */
  icon: string;
  title: string;
  text: string;
}

export const profile = {
  name: "Nadjide Omar",
  title: "Software Engineer",
  location: "Nice (06)",
  availability: "Recherche CDI · Cannes–Monaco ou full remote France",
  certification: "AWS Cloud Practitioner (préparation en cours)",
  languages: ["Français : natif", "Anglais : C1"],
  seoDescription:
    "Nadjide Omar, Software Engineer à Nice. Java/Spring Boot, React/TypeScript, Python/FastAPI. Parcours en entreprise de 09/2021 à 09/2026 ; CI/CD sur 3 applications critiques.",
  tagline:
    "5 ans en entreprise, dans une équipe technique de 3 personnes et un environnement de 6 applications en production. Java/Spring Boot, React/TypeScript et Python/FastAPI.",
  about: [
    "Développeur Full Stack à forte culture DevOps, je travaille avec Java/Spring Boot, React/TypeScript et Python/FastAPI. Mes pratiques incluent Docker, GitHub Actions et le déploiement sur serveurs Linux (Nginx) et Windows.",
    "De septembre 2021 à septembre 2026, j'ai travaillé chez Call To Action, dans une équipe technique de 3 personnes et un environnement comprenant 6 applications en production. Mon contrat s'est terminé le 25/09/2026. La CI/CD GitHub Actions concernait 3 applications critiques ; le SSO et le contrôle d'accès par rôles étaient utilisés par 6 applications.",
    "J'ai développé de A à Z l'application professionnelle de gestion du matériel : Java 21, Spring Boot 4, MariaDB, React, TypeScript, Shadcn UI et Tailwind CSS, avec Docker et GitHub Actions.",
    "Sur la plateforme de pilotage qualité, le temps d'une évaluation a été ramené de 30 à 5 minutes (-83 %). Vitest et l'audit des dépendances bloquant en CI concernaient cette plateforme. J'ai également développé une API d'analyse IA automatisée avec FastAPI, Ollama, Mistral auto-hébergé et MongoDB.",
  ],
  highlights: [
    {
      icon: "lucide:rocket",
      title: "Cycle complet",
      text: "Docker et déploiement sur serveurs ; CI/CD GitHub Actions sur 3 applications critiques.",
    },
    {
      icon: "lucide:brain-circuit",
      title: "IA locale",
      text: "API d'analyse IA automatisée : FastAPI, Ollama, Mistral auto-hébergé et MongoDB.",
    },
    {
      icon: "lucide:shield-check",
      title: "Sécurité",
      text: "SSO/RBAC pour 6 applications ; audit des dépendances bloquant en CI sur la plateforme qualité.",
    },
    {
      icon: "lucide:settings-2",
      title: "Automatisation",
      text: "Pipeline de données Python : une préparation ramenée de 20–60 min à 5 min.",
    },
  ] as ProfileHighlight[],
};
