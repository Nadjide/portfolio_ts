/* Profil — source UNIQUE du pitch, réutilisée par la vue simplifiée (vitrine)
   ET par les fichiers about/profile.json & about/README.md de l'IDE. */

export interface ProfileHighlight {
  /** Nom d'icône Iconify (ex. « lucide:rocket ») pour l'UI vitrine. */
  icon: string;
  title: string;
  text: string;
}

export const profile = {
  name: "Nadjide Omar",
  title: "Ingénieur DevOps & Développeur Full Stack",
  location: "Nice (06)",
  availability: "Alternance / CDI",
  languages: ["Français — natif", "Anglais — C1"],
  cvPath: "/CV/CV_Nadjide_Omar_DevOps_2026.pdf",
  tagline:
    "Je conçois, déploie et maintiens des applications en production — du code à l'infrastructure.",
  about: [
    "Développeur Full Stack à forte culture DevOps, j'accompagne une application sur tout son cycle de vie : de l'architecture au déploiement en production, en passant par les tests, la conteneurisation et l'automatisation (CI/CD, Docker).",
    "En alternance, j'ai conçu et maintenu en production tout un écosystème d'outils métiers internes — dont un intégrateur de campagnes qui a divisé par ~10 le temps de montage. Je cherche toujours l'impact concret et mesurable.",
    "J'aime le code lisible et modulaire, les solutions pragmatiques qui tiennent en conditions réelles, et l'IA auto-hébergée (Ollama / Mistral) pour garder la donnée privée.",
  ],
  highlights: [
    {
      icon: "lucide:rocket",
      title: "Cycle complet",
      text: "De l'architecture à la mise en production (CI/CD, Docker).",
    },
    {
      icon: "lucide:brain-circuit",
      title: "IA locale",
      text: "LLM auto-hébergés (Ollama / Mistral) pour des solutions privées.",
    },
    {
      icon: "lucide:settings-2",
      title: "Automatisation",
      text: "Python & data-engineering, avec des gains de temps mesurables.",
    },
    {
      icon: "lucide:package",
      title: "Pragmatique",
      text: "Du code lisible, modulaire, et qui tourne en conditions réelles.",
    },
  ] as ProfileHighlight[],
};
