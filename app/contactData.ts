import type { ContactLink } from "./types";

/* Source unique des liens de contact de la vitrine. */

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
];

export const findLink = (label: string) =>
  contactLinks.find((l) => l.label.toLowerCase() === label.toLowerCase());
