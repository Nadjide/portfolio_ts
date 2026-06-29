"use client";

import React from "react";
import { Icon } from "@iconify/react";
import type { FileNode } from "../../ide/fileSystem";

const LANG_LABEL: Record<FileNode["lang"], string> = {
  typescript: "TypeScript",
  json: "JSON",
  yaml: "YAML",
  markdown: "Markdown",
};

export default function StatusBar({
  active,
  onSwitchView,
}: {
  active: FileNode | null;
  onSwitchView?: () => void;
}) {
  return (
    <div className="flex h-6 shrink-0 items-center justify-between bg-[#007acc] px-2 font-mono text-[11px] text-white">
      <div className="flex items-center gap-3">
        {onSwitchView ? (
          <button
            type="button"
            onClick={onSwitchView}
            title="Basculer vers la vue recruteur (sans jargon technique)"
            className="flex items-center gap-1 rounded bg-white/15 px-2 py-[1px] font-sans font-medium text-white transition hover:bg-white/25"
          >
            <Icon icon="lucide:briefcase" className="text-[13px]" /> Vue recruteur
          </button>
        ) : null}
        <span className="flex items-center gap-1">
          <Icon icon="lucide:git-branch" className="text-[13px]" />
          master
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5">
            <Icon icon="lucide:check" className="text-[13px]" /> 0
          </span>
          <span className="flex items-center gap-0.5">
            <Icon icon="lucide:triangle-alert" className="text-[13px]" /> 0
          </span>
        </span>
        <span className="hidden items-center gap-1 text-white/80 sm:inline-flex">
          <Icon icon="lucide:command" className="text-[11px]" />/Ctrl+P : fichiers · Maj+P : scripts
        </span>
      </div>
      <div className="flex items-center gap-3">
        {active ? <span>{LANG_LABEL[active.lang]}</span> : <span>Welcome</span>}
        <span>UTF-8</span>
        <span>Nadjide Omar</span>
      </div>
    </div>
  );
}
