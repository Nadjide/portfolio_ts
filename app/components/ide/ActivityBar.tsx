"use client";

import React from "react";
import { Icon } from "@iconify/react";

/* Barre d'activité verticale (façon VS Code). */

export type ActivityView = "explorer" | "search" | "run";

function Item({
  active,
  label,
  icon,
  onClick,
}: {
  active?: boolean;
  label: string;
  icon: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`relative flex h-12 w-12 items-center justify-center transition ${
        active ? "text-white" : "text-[#6e7681] hover:text-white"
      }`}
    >
      {active ? (
        <span className="absolute left-0 top-0 h-full w-0.5 bg-sky-400" />
      ) : null}
      <Icon icon={icon} className="text-[23px]" />
    </button>
  );
}

export default function ActivityBar({
  activeView,
  onSelectView,
}: {
  activeView: ActivityView;
  onSelectView: (view: ActivityView) => void;
}) {
  return (
    <div className="flex h-full w-12 flex-col items-center justify-between bg-[#07090e] py-1">
      <div className="flex flex-col items-center">
        <Item
          active={activeView === "explorer"}
          label="Explorer"
          icon="lucide:files"
          onClick={() => onSelectView("explorer")}
        />
        <Item
          active={activeView === "search"}
          label="Recherche"
          icon="lucide:search"
          onClick={() => onSelectView("search")}
        />
        <Item
          active={activeView === "run"}
          label="Run & Debug"
          icon="lucide:bug-play"
          onClick={() => onSelectView("run")}
        />
      </div>
      <div className="flex flex-col items-center">
        <Item label="Paramètres" icon="lucide:settings" />
      </div>
    </div>
  );
}
