import type { ContactLink } from "./types";

/* Source UNIQUE des liens de contact — réutilisée par le terminal
   (commande « contact »), le fichier contact.ts et profile.json. */

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "nadjide.omar@outlook.fr",
    href: "mailto:nadjide.omar@outlook.fr",
  },
  {
    label: "GitHub",
    value: "github.com/Nadjide",
    href: "https://github.com/Nadjide",
  },
  {
    label: "LinkedIn",
    value: "in/nadjide-omar",
    href: "https://www.linkedin.com/in/nadjide-omar-b55a01212/",
  },
  {
    label: "Téléphone",
    value: "06 34 78 67 13",
    href: "tel:+33634786713",
  },
];

export const findLink = (label: string) =>
  contactLinks.find((l) => l.label.toLowerCase() === label.toLowerCase());
