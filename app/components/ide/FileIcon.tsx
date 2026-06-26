import React from "react";
import { Icon } from "@iconify/react";
import type { IconKey } from "../../ide/fileSystem";

/* Icônes de fichiers/dossiers façon « Material Icon Theme » (multicolores). */

const FILE_MAP: Record<IconKey, string> = {
  ts: "material-icon-theme:typescript",
  json: "material-icon-theme:json",
  md: "material-icon-theme:markdown",
  yml: "material-icon-theme:yaml",
  github: "material-icon-theme:github-actions-workflow",
};

/* Material assigne une icône selon le NOM du dossier — on reproduit ça. */
const FOLDER_MAP: Record<string, string> = {
  github: "github",
  workflows: "other",
  projects: "project",
  about: "resource",
  experience: "base",
};

function folderVariant(name: string): string {
  const key = name.toLowerCase().replace(/^\./, "");
  return FOLDER_MAP[key] ?? "base";
}

export function FileIcon({ icon }: { icon: IconKey }) {
  return <Icon aria-hidden icon={FILE_MAP[icon]} className="w-4 shrink-0 text-[16px]" />;
}

export function FolderIcon({ name, open }: { name: string; open: boolean }) {
  const variant = folderVariant(name);
  return (
    <Icon
      aria-hidden
      icon={`material-icon-theme:folder-${variant}${open ? "-open" : ""}`}
      className="shrink-0 text-[16px]"
    />
  );
}
