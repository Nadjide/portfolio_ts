"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { fileTree, type FileNode } from "../../ide/fileSystem";
import FileTree from "./FileTree";
import ScriptsPanel from "./ScriptsPanel";
import SearchPanel from "./SearchPanel";
import RunPanel from "./RunPanel";
import type { ActivityView } from "./ActivityBar";

function SectionHeader({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-1 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#9aa4b2] hover:text-white"
    >
      <Icon
        aria-hidden
        icon="lucide:chevron-right"
        className={`shrink-0 text-[14px] text-[#5b6472] transition-transform ${open ? "rotate-90" : ""}`}
      />
      {label}
    </button>
  );
}

const TITLES: Record<ActivityView, string> = {
  explorer: "Explorer",
  search: "Recherche",
  run: "Run & Debug",
};

export default function Sidebar({
  view,
  activePath,
  onOpenFile,
  onRunScript,
  onRunDemo,
}: {
  view: ActivityView;
  activePath: string | null;
  onOpenFile: (f: FileNode) => void;
  onRunScript: (cmd: string) => void;
  onRunDemo: (key: string) => void;
}) {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [scriptsOpen, setScriptsOpen] = useState(true);

  return (
    <div className="flex h-full flex-col bg-[#0b0e14] text-[#cccccc]">
      <div className="px-4 py-2 text-[11px] uppercase tracking-wide text-[#9aa4b2]">
        {TITLES[view]}
      </div>

      {view === "explorer" ? (
        <div className="flex-1 overflow-y-auto">
          <SectionHeader
            label="Portfolio"
            open={explorerOpen}
            onToggle={() => setExplorerOpen((o) => !o)}
          />
          {explorerOpen ? (
            <FileTree nodes={fileTree} activePath={activePath} onOpenFile={onOpenFile} />
          ) : null}

          <div className="mt-1 border-t border-[#1c222b]">
            <SectionHeader
              label="Scripts"
              open={scriptsOpen}
              onToggle={() => setScriptsOpen((o) => !o)}
            />
            {scriptsOpen ? <ScriptsPanel onRun={onRunScript} /> : null}
          </div>
        </div>
      ) : view === "search" ? (
        <div className="min-h-0 flex-1">
          <SearchPanel activePath={activePath} onOpenFile={onOpenFile} />
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <RunPanel onRunDemo={onRunDemo} />
        </div>
      )}
    </div>
  );
}
