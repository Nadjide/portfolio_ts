"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { projectsData } from "../../projectsData";
import { projectKeyOf } from "../../ide/fileSystem";

/* Panneau « Run & Debug » : chaque projet est une « configuration de lancement »
   dont le ▶ lance la démo (commande « open <projet> ») dans le terminal. */

export default function RunPanel({ onRunDemo }: { onRunDemo: (key: string) => void }) {
  return (
    <div className="py-1">
      <p className="px-3 pb-1 text-[11px] leading-4 text-[#7a8290]">
        Configurations de lancement — clique pour lancer la démo dans le terminal.
      </p>
      {projectsData.map((p) => {
        const key = projectKeyOf(p.title);
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onRunDemo(key)}
            title={`open ${key}`}
            className="group flex w-full items-center gap-2 py-[3px] pl-3 pr-2 text-left text-[13px] text-[#cccccc] hover:bg-white/[0.06]"
          >
            <Icon
              icon="lucide:circle-play"
              className="shrink-0 text-[15px] text-green-500 group-hover:text-green-400"
            />
            <span className="truncate">{p.title}</span>
            {p.year ? (
              <span className="ml-auto shrink-0 font-mono text-[11px] text-[#5b6472]">
                {p.year}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
