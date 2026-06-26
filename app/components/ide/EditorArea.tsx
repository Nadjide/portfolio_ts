"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import type { FileNode } from "../../ide/fileSystem";
import { FileIcon } from "./FileIcon";

const ViewerLoading = () => (
  <div className="p-4 font-mono text-[13px] text-[#6e7681]">Chargement…</div>
);

// Viewers lourds (Prism / react-markdown) chargés à la demande.
const CodeViewer = dynamic(() => import("./CodeViewer"), {
  loading: ViewerLoading,
  ssr: false,
});
const MarkdownView = dynamic(() => import("./MarkdownView"), {
  loading: ViewerLoading,
  ssr: false,
});

function WelcomeScreen() {
  return (
    <div className="flex h-full items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <pre className="select-none font-mono text-[10px] leading-[1.15] text-[#243042] sm:text-xs">{String.raw`
 _   _    _    ___    _ ___ ___  ___
| \ | |  /_\  |   \  | |_ _|   \| __|
|  \| | / _ \ | |) |_| || || |) | _|
|_| \_|/_/ \_\|___/\___/___|___/|___|
`}</pre>
        <p className="text-lg font-semibold text-[#cccccc]">Nadjide Omar</p>
        <p className="text-sm text-[#858585]">
          Ingénieur DevOps &amp; Développeur Full Stack
        </p>
        <p className="max-w-md text-sm leading-6 text-[#9d9d9d]">
          Ouvre un fichier dans l&apos;explorateur à gauche, lance un{" "}
          <span className="text-sky-400">script</span>, ou tape{" "}
          <span className="rounded bg-[#11151c] px-1.5 py-0.5 font-mono text-[#ce9178]">
            help
          </span>{" "}
          dans le terminal en bas.
        </p>
      </div>
    </div>
  );
}

function Tab({
  file,
  active,
  onSelect,
  onClose,
}: {
  file: FileNode;
  active: boolean;
  onSelect: () => void;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      onAuxClick={(e) => {
        if (e.button === 1) {
          e.preventDefault();
          onClose();
        }
      }}
      role="tab"
      aria-selected={active}
      className={`group flex h-9 cursor-pointer items-center gap-2 border-r border-[#0b0e14] px-3 text-[13px] ${
        active
          ? "bg-[#0d1117] text-white"
          : "bg-[#11151c] text-[#969696] hover:bg-[#11151c]/70"
      }`}
    >
      <FileIcon icon={file.icon} />
      <span className="max-w-[160px] truncate">{file.name}</span>
      <button
        type="button"
        aria-label={`Fermer ${file.name}`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`ml-1 rounded p-0.5 text-[#858585] hover:bg-white/10 hover:text-white ${
          active ? "opacity-80" : "opacity-0 group-hover:opacity-80"
        }`}
      >
        <Icon icon="lucide:x" className="text-[14px]" />
      </button>
    </div>
  );
}

export default function EditorArea({
  tabs,
  activePath,
  onSelectTab,
  onCloseTab,
  onRunDemo,
}: {
  tabs: FileNode[];
  activePath: string | null;
  onSelectTab: (path: string) => void;
  onCloseTab: (path: string) => void;
  onRunDemo: (projectKey: string) => void;
}) {
  const active = tabs.find((t) => t.path === activePath) ?? null;

  return (
    <div className="flex h-full min-w-0 flex-col bg-[#0d1117]">
      {/* tab bar */}
      {tabs.length > 0 ? (
        <div
          role="tablist"
          aria-label="Onglets ouverts"
          className="flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-[#0b0e14] bg-[#0b0e14]"
        >
          {tabs.map((t) => (
            <Tab
              key={t.path}
              file={t}
              active={t.path === activePath}
              onSelect={() => onSelectTab(t.path)}
              onClose={() => onCloseTab(t.path)}
            />
          ))}
        </div>
      ) : null}

      {/* breadcrumb / project toolbar */}
      {active ? (
        <div className="flex h-8 shrink-0 items-center gap-2 border-b border-[#1c222b] bg-[#0d1117] px-4 text-[12px] text-[#858585]">
          <span className="truncate">{active.path}</span>
          {active.projectKey ? (
            <button
              type="button"
              onClick={() => onRunDemo(active.projectKey!)}
              className="ml-auto flex items-center gap-1 rounded border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[12px] text-sky-300 hover:bg-sky-500/20"
            >
              <Icon icon="lucide:play" className="text-[12px]" />
              Run demo
            </button>
          ) : null}
        </div>
      ) : null}

      {/* content */}
      <div className="terminal-scroll min-h-0 flex-1 overflow-auto">
        {active ? (
          active.lang === "markdown" ? (
            <MarkdownView content={active.content} />
          ) : (
            <CodeViewer code={active.content} lang={active.lang} />
          )
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
}
