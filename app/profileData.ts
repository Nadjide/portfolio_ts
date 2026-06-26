/* Profil — source UNIQUE du pitch, réutilisée par la vue simplifiée (vitrine)
   ET par les fichiers about/profile.json & about/README.md de l'IDE. */

export interface ProfileHighlight {
  /** Emoji conservé pour le README markdown simulé de l'IDE (texte brut). */
  emoji: string;
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
    "Développeur Full Stack avec une forte culture DevOps : je prends en charge le cycle de vie complet d'une application, de l'architecture à la mise en production.",
    "J'ai bâti un écosystème d'outils métiers automatisant des process critiques — dont un intégrateur de campagnes qui a divisé par ~10 le temps de montage.",
  ],
  highlights: [
    {
      emoji: "🚀",
      icon: "lucide:rocket",
      title: "Cycle complet",
      text: "De l'architecture à la mise en production (CI/CD, Docker).",
    },
    {
      emoji: "🧠",
      icon: "lucide:brain-circuit",
      title: "IA locale",
      text: "LLM auto-hébergés (Ollama / Mistral) pour des solutions privées.",
    },
    {
      emoji: "⚙️",
      icon: "lucide:settings-2",
      title: "Automatisation",
      text: "Python & data-engineering, avec des gains de temps mesurables.",
    },
    {
      emoji: "📦",
      icon: "lucide:package",
      title: "Pragmatique",
      text: "Du code lisible, modulaire, et qui tourne en conditions réelles.",
    },
  ] as ProfileHighlight[],
};
