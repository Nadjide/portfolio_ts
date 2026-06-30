/* Panneau "SCRIPTS" — façon NPM SCRIPTS de VS Code.
   Chaque entrée : un libellé affiché, la commande réellement lancée dans le
   terminal au clic, et une courte description. */

export interface ScriptDef {
  /** Nom affiché dans le panneau (clé du package.json). */
  label: string;
  /** Commande exécutée dans le terminal existant. */
  command: string;
  /** Description courte (tooltip / ligne secondaire). */
  description: string;
}

export const scripts: ScriptDef[] = [
  { label: "about", command: "about", description: "Affiche le profil" },
  { label: "skills", command: "skills", description: "Affiche la stack technique" },
  { label: "experience", command: "experience", description: "Liste les expériences pro" },
  { label: "projects", command: "projects", description: "Liste les projets" },
  { label: "education", command: "education", description: "Affiche la formation" },
  { label: "contact", command: "contact", description: "Affiche les liens cliquables" },
  { label: "ci", command: "ci", description: "Lance la pipeline CI/CD" },
  { label: "request:cv", command: "cv", description: "Mon CV — sur demande (email / LinkedIn)" },
  { label: "clear", command: "clear", description: "Vide le terminal" },
];
