"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

/* Fausse pipeline CI/CD animée pour la commande « ci » du terminal. */

const STEPS = [
  { id: "lint", label: "Lint", cmd: "eslint . --max-warnings 0" },
  { id: "test", label: "Test", cmd: "vitest run" },
  { id: "build", label: "Build", cmd: "next build" },
  { id: "deploy", label: "Deploy", cmd: "docker build && deploy" },
] as const;

export default function CIPipeline() {
  const [done, setDone] = useState(0); // nombre d'étapes terminées
  const finished = done >= STEPS.length;

  // progression des étapes
  useEffect(() => {
    if (finished) return;
    const t = setTimeout(() => setDone((d) => d + 1), 750 + Math.random() * 450);
    return () => clearTimeout(t);
  }, [done, finished]);

  return (
    <div className="space-y-1 font-mono text-[13px]">
      <p className="text-stone-400">$ ci — running pipeline…</p>
      {STEPS.map((s, i) => {
        const state = i < done ? "done" : i === done ? "run" : "pending";
        return (
          <div key={s.id} className="flex items-center gap-2">
            <span className="flex w-4 justify-center">
              {state === "done" ? (
                <Icon icon="lucide:circle-check" className="text-[14px] text-green-400" />
              ) : state === "run" ? (
                <Icon icon="lucide:loader-circle" className="animate-spin text-[14px] text-sky-400" />
              ) : (
                <Icon icon="lucide:circle" className="text-[14px] text-stone-600" />
              )}
            </span>
            <span className={state === "pending" ? "text-stone-600" : "text-stone-200"}>
              {s.label}
            </span>
            <span className="text-stone-600">— {s.cmd}</span>
          </div>
        );
      })}
      {finished ? (
        <p className="flex items-center gap-1.5 pt-1 font-semibold text-green-400">
          <Icon icon="lucide:circle-check-big" className="text-[14px]" /> All checks passed
        </p>
      ) : null}
    </div>
  );
}
