"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Terminal from "./Terminal";

/* ──────────────────────────────────────────────────────────────────────────
   Vue développeur : UN terminal, plein écran, magnifique.
   Fenêtre façon macOS (le bouton rouge « ferme » vers la vue simplifiée),
   barre de statut façon tmux, fond grille + aurora.
   ────────────────────────────────────────────────────────────────────────── */

export default function TerminalView({ onSwitchView }: { onSwitchView: () => void }) {
  return (
    <div className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#05080f] p-2.5 sm:p-6">
      {/* fond : grille + aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(75%_65%_at_50%_40%,#000,transparent)]" />
        <div className="animate-aurora absolute -left-40 top-[-12%] h-[34rem] w-[34rem] rounded-full bg-sky-500/15 blur-[120px]" />
        <div
          className="animate-aurora absolute -right-32 bottom-[-18%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/15 blur-[120px]"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      {/* bouton bascule (haut droite) */}
      <button
        type="button"
        onClick={onSwitchView}
        className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3.5 py-2 font-mono text-xs text-stone-300 shadow-lg shadow-black/30 backdrop-blur-xl transition hover:border-sky-400/50 hover:text-white sm:right-5 sm:top-5"
      >
        <Icon icon="lucide:panels-top-left" className="text-[15px] text-sky-400" />
        Vue simplifiée
      </button>

      {/* fenêtre terminal */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex h-full max-h-[46rem] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0f17]/95 shadow-[0_0_90px_rgba(56,189,248,0.10),0_28px_70px_rgba(0,0,0,0.65)] backdrop-blur"
      >
        {/* barre de titre */}
        <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
          <button
            type="button"
            onClick={onSwitchView}
            aria-label="Fermer — vue simplifiée"
            title="Fermer → vue simplifiée"
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-red-500/80 transition hover:bg-red-400"
          >
            <span className="text-[8px] font-black leading-none text-red-900/0 group-hover:text-red-900">
              ×
            </span>
          </button>
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 hidden truncate font-mono text-xs text-stone-500 sm:block">
            visitor@nadjide: ~
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-stone-600">
            <Icon icon="lucide:square-terminal" className="text-[13px] text-sky-500/70" />
            nadjide-sh
          </span>
        </div>

        {/* le terminal */}
        <div className="min-h-0 flex-1">
          <Terminal />
        </div>

        {/* barre de statut façon tmux */}
        <StatusLine />
      </motion.div>

      {/* hint sous la fenêtre (desktop) */}
      <p className="z-10 mt-3 hidden font-mono text-[11px] text-stone-600 md:block">
        tip : <span className="text-stone-400">Tab</span> complète ·{" "}
        <span className="text-stone-400">↑</span> rappelle l'historique · essaie{" "}
        <span className="text-sky-400/80">docker ps</span>,{" "}
        <span className="text-sky-400/80">git log</span> ou{" "}
        <span className="text-sky-400/80">deploy</span>
      </p>
    </div>
  );
}

/* Barre du bas : session à gauche, contexte + horloge à droite. */
function StatusLine() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 15_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.06] bg-[#0b1220] px-3 py-1.5 font-mono text-[11px]">
      <div className="flex min-w-0 items-center gap-2">
        <span className="rounded-sm bg-sky-500/20 px-1.5 py-0.5 font-semibold text-sky-300">
          [portfolio]
        </span>
        <span className="truncate text-stone-500">0:nadjide-sh*</span>
      </div>
      <div className="flex items-center gap-3 text-stone-500">
        <span className="hidden items-center gap-1 sm:flex">
          <Icon icon="lucide:git-branch" className="text-[12px] text-sky-500/80" />
          master
        </span>
        <span className="hidden items-center gap-1 md:flex">
          <Icon icon="lucide:map-pin" className="text-[12px] text-sky-500/80" />
          Nice, FR
        </span>
        <span className="flex items-center gap-1 text-stone-400">
          <Icon icon="lucide:clock" className="text-[12px] text-sky-500/80" />
          {now}
        </span>
      </div>
    </div>
  );
}
