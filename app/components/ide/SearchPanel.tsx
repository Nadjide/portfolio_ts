"use client";

import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { allFiles, type FileNode } from "../../ide/fileSystem";
import { FileIcon } from "./FileIcon";

/* Met en évidence chaque occurrence du terme dans une ligne. */
function Highlight({ text, term }: { text: string; term: string }) {
  if (!term) return <>{text}</>;
  const lc = term.toLowerCase();
  const tl = text.toLowerCase();
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  for (;;) {
    const j = tl.indexOf(lc, i);
    if (j === -1) {
      parts.push(text.slice(i));
      break;
    }
    if (j > i) parts.push(text.slice(i, j));
    parts.push(
      <mark key={key++} className="rounded-sm bg-sky-500/30 text-sky-100">
        {text.slice(j, j + term.length)}
      </mark>
    );
    i = j + term.length;
  }
  return <>{parts}</>;
}

interface FileResult {
  file: FileNode;
  matches: { n: number; text: string }[];
  pathMatch: boolean;
}

const MAX_LINES_PER_FILE = 30;

export default function SearchPanel({
  activePath,
  onOpenFile,
}: {
  activePath: string | null;
  onOpenFile: (f: FileNode) => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo<FileResult[]>(() => {
    const q = query.trim();
    if (!q) return [];
    const lc = q.toLowerCase();
    return allFiles()
      .map((file) => {
        const matches: { n: number; text: string }[] = [];
        file.content.split("\n").forEach((text, idx) => {
          if (text.toLowerCase().includes(lc)) matches.push({ n: idx + 1, text });
        });
        return { file, matches, pathMatch: file.path.toLowerCase().includes(lc) };
      })
      .filter((r) => r.matches.length > 0 || r.pathMatch);
  }, [query]);

  const totalMatches = results.reduce((s, r) => s + r.matches.length, 0);
  const term = query.trim();

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 pb-2 pt-1">
        <div className="flex items-center gap-2 rounded border border-[#1c222b] bg-[#11151c] px-2 focus-within:border-sky-500/60">
          <Icon icon="lucide:search" className="shrink-0 text-[14px] text-[#7a8290]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            autoFocus
            placeholder="Rechercher dans les fichiers…"
            aria-label="Rechercher dans les fichiers"
            className="w-full bg-transparent py-1.5 font-mono text-[13px] text-[#cccccc] outline-none placeholder:text-[#5b6472]"
          />
          {query ? (
            <button
              type="button"
              aria-label="Effacer"
              onClick={() => setQuery("")}
              className="shrink-0 rounded p-0.5 text-[#7a8290] hover:bg-white/10 hover:text-white"
            >
              <Icon icon="lucide:x" className="text-[14px]" />
            </button>
          ) : null}
        </div>
        {term ? (
          <p className="mt-2 px-1 text-[11px] text-[#7a8290]">
            {totalMatches === 0
              ? "Aucun résultat."
              : `${totalMatches} résultat${totalMatches > 1 ? "s" : ""} dans ${results.length} fichier${results.length > 1 ? "s" : ""}`}
          </p>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {results.map(({ file, matches }) => (
          <div key={file.path} className="pb-1">
            <button
              type="button"
              onClick={() => onOpenFile(file)}
              className={`flex w-full items-center gap-1.5 px-3 py-[3px] text-left text-[13px] hover:bg-white/[0.06] ${
                activePath === file.path ? "text-white" : "text-[#cccccc]"
              }`}
            >
              <FileIcon icon={file.icon} />
              <span className="truncate">{file.name}</span>
              <span className="truncate text-[11px] text-[#5b6472]">{file.path}</span>
              {matches.length ? (
                <span className="ml-auto shrink-0 rounded-full bg-white/10 px-1.5 text-[10px] text-[#cccccc]">
                  {matches.length}
                </span>
              ) : null}
            </button>
            {matches.slice(0, MAX_LINES_PER_FILE).map((m) => (
              <button
                key={m.n}
                type="button"
                onClick={() => onOpenFile(file)}
                title={`Ouvrir ${file.path} (ligne ${m.n})`}
                className="flex w-full items-baseline gap-2 py-[1px] pl-7 pr-3 text-left font-mono text-[12px] text-[#9aa4b2] hover:bg-white/[0.04]"
              >
                <span className="w-7 shrink-0 text-right text-[#5b6472]">{m.n}</span>
                <span className="truncate">
                  <Highlight text={m.text.trim()} term={term} />
                </span>
              </button>
            ))}
            {matches.length > MAX_LINES_PER_FILE ? (
              <p className="py-0.5 pl-7 text-[11px] text-[#5b6472]">
                + {matches.length - MAX_LINES_PER_FILE} autres…
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
