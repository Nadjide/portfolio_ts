"use client";

import React, { useEffect, useState } from "react";
import IDELayout from "./ide/IDELayout";
import SimpleView from "./simple/SimpleView";

type View = "ide" | "simple";
const KEY = "portfolio_view";

export default function Portfolio() {
  const [view, setView] = useState<View>("ide");

  // Restaure le choix précédent après le montage (évite un mismatch d'hydratation).
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (v === "simple" || v === "ide") setView(v);
    } catch {
      /* ignore */
    }
  }, []);

  // L'IDE est une app plein écran (body figé) ; la vue recruteur est une page
  // classique qui doit pouvoir défiler. globals.css fige le body par défaut.
  useEffect(() => {
    document.body.style.overflow = view === "simple" ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [view]);

  const switchView = () =>
    setView((v) => {
      const next: View = v === "ide" ? "simple" : "ide";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });

  return view === "ide" ? (
    <IDELayout onSwitchView={switchView} />
  ) : (
    <SimpleView onSwitchView={switchView} />
  );
}
