/* Profil : source UNIQUE du pitch, réutilisée par la vue simplifiée (vitrine)
   ET par le terminal (commande « about »).
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
  availability: "CDI · disponible le 01/10/2026",
  languages: ["Français : natif", "Anglais : C1"],
  tagline:
    "5 ans en entreprise sur 6 applications métier en production : je les conçois, je les sécurise et j'automatise leur livraison.",
  about: [
    "Développeur Full Stack à forte culture DevOps, j'accompagne une application sur tout son cycle de vie : architecture, développement, tests, conteneurisation Docker, CI/CD GitHub Actions et déploiement sur serveurs Linux (Nginx) et Windows.",
    "Depuis 2021, au sein d'une équipe technique de 3 personnes, j'ai conçu et je maintiens 6 applications métier en production. La plus récente, une plateforme de pilotage qualité, a ramené le temps d'une évaluation de 30 à 5 minutes (-83 %) pour plus de 60 utilisateurs ; toutes reposent sur le service d'authentification centralisée (SSO) que j'ai développé.",
    "J'aime le code lisible et relu (revue de code sur tous les projets), les solutions qui tiennent en conditions réelles, et l'IA auto-hébergée (Mistral, Ollama) pour garder la donnée privée.",
  ],
  highlights: [
    {
      icon: "lucide:rocket",
      title: "Cycle complet",
      text: "De l'architecture à la production : Docker, GitHub Actions, Linux, Nginx.",
    },
    {
      icon: "lucide:brain-circuit",
      title: "IA locale",
      text: "LLM auto-hébergé (Mistral) en production : aucune donnée ne quitte l'infrastructure.",
    },
    {
      icon: "lucide:shield-check",
      title: "Sécurité",
      text: "SSO et contrôle d'accès pour 6 applications, audit des dépendances bloquant en CI.",
    },
    {
      icon: "lucide:settings-2",
      title: "Automatisation",
      text: "Pipeline de données Python : une préparation de 20-60 min ramenée à 5 min.",
    },
  ] as ProfileHighlight[],
};
