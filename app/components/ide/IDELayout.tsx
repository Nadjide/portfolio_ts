"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { allFiles, findFile, type FileNode } from "../../ide/fileSystem";
import { scripts } from "./scripts";
import Terminal, { type TerminalHandle } from "../terminal/Terminal";
import ActivityBar, { type ActivityView } from "./ActivityBar";
import Sidebar from "./Sidebar";
import EditorArea from "./EditorArea";
import StatusBar from "./StatusBar";
import CommandPalette, { type PaletteItem } from "./CommandPalette";

const ACTIVITY_W = 48;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const LS = {
  tabs: "ide_tabs",
  active: "ide_active",
  sidebar: "ide_sidebar_w",
  panel: "ide_panel_h",
};

const LANG_LABEL: Record<FileNode["lang"], string> = {
  typescript: "TypeScript",
  json: "JSON",
  yaml: "YAML",
  markdown: "Markdown",
};

export default function IDELayout({ onSwitchView }: { onSwitchView: () => void }) {
  const [tabs, setTabs] = useState<FileNode[]>([]);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActivityView>("explorer");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [palette, setPalette] = useState<null | "files" | "scripts">(null);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [panelHeight, setPanelHeight] = useState(280);
  const [hydrated, setHydrated] = useState(false);

  const terminalRef = useRef<TerminalHandle>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  const active = tabs.find((t) => t.path === activePath) ?? null;

  /* ── ouverture de fichiers ── */
  const openFile = useCallback((f: FileNode) => {
    setTabs((prev) => (prev.some((t) => t.path === f.path) ? prev : [...prev, f]));
    setActivePath(f.path);
    setDrawerOpen(false);
  }, []);

  const openPath = useCallback(
    (path: string) => {
      const f = findFile(path);
      if (f) openFile(f);
    },
    [openFile]
  );

  const closeTab = useCallback((path: string) => {
    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.path === path);
      const next = prev.filter((t) => t.path !== path);
      setActivePath((cur) => {
        if (cur !== path) return cur;
        if (next.length === 0) return null;
        return next[Math.min(idx, next.length - 1)].path;
      });
      return next;
    });
  }, []);

  const runScript = useCallback((cmd: string) => {
    terminalRef.current?.run(cmd);
  }, []);

  const runDemo = useCallback((projectKey: string) => {
    terminalRef.current?.run(`open ${projectKey}`);
    setDrawerOpen(false);
  }, []);

  /* Sélection d'une vue dans l'activity bar (Explorer / Recherche / Run & Debug).
     Sur mobile : ouvre le tiroir, ou le referme si on reclique la vue active. */
  const selectView = useCallback(
    (view: ActivityView) => {
      setDrawerOpen((open) => (view === activeView ? !open : true));
      setActiveView(view);
    },
    [activeView]
  );

  /* ── restauration (URL ?file= puis localStorage) au montage ── */
  useEffect(() => {
    /* La restauration se fait APRÈS le montage (et non via useState initial) pour
       éviter tout mismatch d'hydratation SSR/CSR — d'où les setState ici. */
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const params = new URLSearchParams(window.location.search);
      const urlFile = params.get("file");
      const savedPaths: string[] = JSON.parse(localStorage.getItem(LS.tabs) || "[]");
      const restored = savedPaths
        .map((p) => findFile(p))
        .filter((f): f is FileNode => Boolean(f));

      const initialActive = urlFile || localStorage.getItem(LS.active) || null;
      if (urlFile && !restored.some((f) => f.path === urlFile)) {
        const f = findFile(urlFile);
        if (f) restored.push(f);
      }
      if (restored.length) setTabs(restored);
      if (initialActive && restored.some((f) => f.path === initialActive)) {
        setActivePath(initialActive);
      } else if (restored.length) {
        setActivePath(restored[0].path);
      }

      const sw = Number(localStorage.getItem(LS.sidebar));
      if (sw) setSidebarWidth(clamp(sw, 180, 520));
      const ph = Number(localStorage.getItem(LS.panel));
      if (ph) setPanelHeight(clamp(ph, 120, 800));
    } catch {
      /* ignore */
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /* ── persistance + deep-link ── */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS.tabs, JSON.stringify(tabs.map((t) => t.path)));
      if (activePath) localStorage.setItem(LS.active, activePath);
      else localStorage.removeItem(LS.active);

      const url = new URL(window.location.href);
      if (activePath) url.searchParams.set("file", activePath);
      else url.searchParams.delete("file");
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* ignore */
    }
  }, [tabs, activePath, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS.sidebar, String(sidebarWidth));
      localStorage.setItem(LS.panel, String(panelHeight));
    } catch {
      /* ignore */
    }
  }, [sidebarWidth, panelHeight, hydrated]);

  /* ── raccourcis clavier (command palette) ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && (e.code === "KeyP" || e.key.toLowerCase() === "p")) {
        e.preventDefault();
        setPalette(e.shiftKey ? "scripts" : "files");
      } else if (e.key === "Escape") {
        setPalette(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ── drag-resize générique ── */
  const startDrag = (onMove: (e: PointerEvent) => void, cursor: string) =>
    (e: React.PointerEvent) => {
      e.preventDefault();
      document.body.style.cursor = cursor;
      document.body.style.userSelect = "none";
      const move = (ev: PointerEvent) => onMove(ev);
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };

  const dragSidebar = startDrag(
    (ev) => setSidebarWidth(clamp(ev.clientX - ACTIVITY_W, 180, 520)),
    "col-resize"
  );
  // Lit la géométrie de la colonne au pointerdown (pas pendant le rendu).
  const dragPanel = (e: React.PointerEvent) => {
    const rect = columnRef.current?.getBoundingClientRect();
    if (!rect) return;
    startDrag(
      (ev) => setPanelHeight(clamp(rect.bottom - ev.clientY, 120, rect.height - 140)),
      "row-resize"
    )(e);
  };

  /* ── items palette ── */
  const paletteItems: PaletteItem[] =
    palette === "scripts"
      ? scripts.map((s) => ({ id: s.command, label: s.label, hint: s.description }))
      : allFiles().map((f) => ({ id: f.path, label: f.path, hint: LANG_LABEL[f.lang] }));

  const onPaletteSelect = (id: string) => {
    if (palette === "scripts") runScript(id);
    else openPath(id);
    setPalette(null);
  };

  return (
    <div className="relative flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#0d1117] text-[#cccccc]">
      {/* Bascule toujours visible — pensée pour les recruteurs qui ne connaissent pas l'IDE. */}
      <button
        type="button"
        onClick={onSwitchView}
        title="Passer à la vue recruteur (sans jargon technique)"
        className="absolute right-3 top-2.5 z-[60] flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0b0e14]/95 px-3 py-1.5 text-xs font-medium text-[#cccccc] shadow-lg shadow-black/40 backdrop-blur transition hover:border-[#007acc] hover:text-white"
      >
        <Icon icon="lucide:briefcase" className="text-[15px]" aria-hidden /> Vue recruteur
      </button>

      <div className="relative flex min-h-0 flex-1">
        <ActivityBar activeView={activeView} onSelectView={selectView} />

        {/* Sidebar statique ≥ md (redimensionnable) */}
        <div
          className="hidden shrink-0 md:block"
          style={{ width: sidebarWidth }}
        >
          <Sidebar
            view={activeView}
            activePath={activePath}
            onOpenFile={openFile}
            onRunScript={runScript}
            onRunDemo={runDemo}
          />
        </div>
        <div
          onPointerDown={dragSidebar}
          className="hidden w-1 shrink-0 cursor-col-resize bg-[#1c222b] hover:bg-[#007acc] md:block"
        />

        {/* Drawer mobile < md */}
        {drawerOpen ? (
          <div className="absolute inset-0 z-40 flex md:hidden">
            <div className="w-64 max-w-[80%] border-r border-[#1c222b]">
              <Sidebar
                view={activeView}
                activePath={activePath}
                onOpenFile={openFile}
                onRunScript={(cmd) => {
                  runScript(cmd);
                  setDrawerOpen(false);
                }}
                onRunDemo={runDemo}
              />
            </div>
            <button
              type="button"
              aria-label="Fermer le menu"
              className="flex-1 bg-black/50"
              onClick={() => setDrawerOpen(false)}
            />
          </div>
        ) : null}

        {/* Colonne droite : éditeur + panneau terminal */}
        <div ref={columnRef} className="flex min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1">
            <EditorArea
              tabs={tabs}
              activePath={activePath}
              onSelectTab={setActivePath}
              onCloseTab={closeTab}
              onRunDemo={runDemo}
            />
          </div>

          {/* poignée de redimensionnement du panneau */}
          <div
            onPointerDown={dragPanel}
            className="h-1 shrink-0 cursor-row-resize bg-[#1c222b] hover:bg-[#007acc]"
          />

          {/* Panneau bas : TERMINAL */}
          <div
            className="flex shrink-0 flex-col"
            style={{ height: panelHeight }}
          >
            <div className="flex h-8 shrink-0 items-center gap-4 border-b border-[#1c222b] bg-[#0d1117] px-3 text-[11px] uppercase tracking-wide">
              <span className="border-b border-[#cccccc] py-1.5 text-[#cccccc]">Terminal</span>
              <span className="py-1.5 text-[#6e7681]">Problèmes</span>
              <span className="py-1.5 text-[#6e7681]">Sortie</span>
              <button
                type="button"
                aria-label="Vider le terminal"
                title="Vider le terminal"
                onClick={() => terminalRef.current?.clear()}
                className="ml-auto rounded p-1 text-[#cbcbcb] hover:bg-white/10 hover:text-white"
              >
                <Icon icon="lucide:trash-2" className="text-[14px]" />
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <Terminal ref={terminalRef} onOpenPath={openPath} />
            </div>
          </div>
        </div>
      </div>

      <StatusBar active={active} onSwitchView={onSwitchView} />

      {palette ? (
        <CommandPalette
          title={palette === "scripts" ? "Exécuter un script" : "Ouvrir un fichier"}
          placeholder={
            palette === "scripts"
              ? "Choisis un script à lancer dans le terminal…"
              : "Cherche un fichier à ouvrir…"
          }
          items={paletteItems}
          onSelect={onPaletteSelect}
          onClose={() => setPalette(null)}
        />
      ) : null}
    </div>
  );
}
