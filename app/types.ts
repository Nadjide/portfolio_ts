/* Types "CV" partagés — utilisés par les données réelles et reflétés dans les
   fichiers .ts affichés dans l'éditeur (cf. app/ide/fileSystem.ts). */

export interface Project {
  title: string;
  year?: string;
  context?: string;
  role?: string;
  stack: string[];
  github?: string;
  live?: string;
  summary: string[];
}

export interface Experience {
  poste: string;
  entreprise: string;
  periode: string;
  contrat?: string;
  stack: string[];
  resume?: string;
  missions?: string[];
  realisations?: string[];
  impact?: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}
