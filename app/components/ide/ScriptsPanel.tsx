"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { scripts } from "./scripts";

/* Panneau "SCRIPTS" façon NPM SCRIPTS : un ▶ par commande, lancée dans le terminal. */

export default function ScriptsPanel({ onRun }: { onRun: (cmd: string) => void }) {
  return (
    <div className="py-1">
      {scripts.map((s) => (
        <button
          key={s.label}
          type="button"
          aria-label={s.label}
          onClick={() => onRun(s.command)}
          title={s.description}
          className="group flex w-full items-center gap-2 py-[3px] pl-4 pr-2 text-left text-[13px] text-[#cccccc] hover:bg-white/[0.06]"
        >
          <Icon
            aria-hidden
            icon="lucide:play"
            className="shrink-0 text-[13px] text-[#6e7681] group-hover:text-sky-400"
          />
          <span className="truncate">{s.label}</span>
          <span className="ml-auto hidden truncate text-[11px] text-[#9d9d9d] group-hover:text-[#cccccc] sm:inline">
            {s.description}
          </span>
        </button>
      ))}
    </div>
  );
}
