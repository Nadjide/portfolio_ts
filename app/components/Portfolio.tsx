"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import IDELayout from "./ide/IDELayout";
import SimpleView from "./simple/SimpleView";

type View = "ide" | "simple";
const KEY = "portfolio_view";

/* Durées de la transition (ms) : on bascule la vue quand l'écran est couvert. */
const SWAP_AT = 560;
const END_AT = 1180;

export default function Portfolio() {
  const [view, setView] = useState<View>("ide");
  const [pending, setPending] = useState<View | null>(null);

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

  // Séquence de transition : couvre l'écran → bascule la vue → découvre.
  useEffect(() => {
    if (!pending) return;
    const swap = setTimeout(() => {
      setView(pending);
      try {
        localStorage.setItem(KEY, pending);
      } catch {
        /* ignore */
      }
    }, SWAP_AT);
    const done = setTimeout(() => setPending(null), END_AT);
    return () => {
      clearTimeout(swap);
      clearTimeout(done);
    };
  }, [pending]);

  const switchView = () => {
    if (pending) return;
    setPending(view === "ide" ? "simple" : "ide");
  };

  return (
    <>
      {view === "ide" ? (
        <IDELayout onSwitchView={switchView} />
      ) : (
        <SimpleView onSwitchView={switchView} />
      )}

      <AnimatePresence>
        {pending ? <TransitionOverlay target={pending} /> : null}
      </AnimatePresence>
    </>
  );
}

/* ───────────────── overlay de transition entre les deux vues ───────────────── */

function TransitionOverlay({ target }: { target: View }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${
        target === "ide" ? "bg-black" : "bg-[#070b12]"
      }`}
    >
      {target === "ide" ? <BootScreen /> : <ProfileScreen />}
    </motion.div>
  );
}

/* Vers la vue dev : un écran/PC qui « s'allume » (effet CRT). */
function BootScreen() {
  const boot = [
    "> mounting /portfolio",
    "> loading modules: next · typescript · docker",
    "> starting dev environment",
  ];
  return (
    <motion.div
      initial={{ scaleY: 0.006, scaleX: 0.6, opacity: 0.4 }}
      animate={{ scaleY: [0.006, 0.006, 1], scaleX: [0.6, 1, 1], opacity: 1 }}
      transition={{ duration: 0.55, times: [0, 0.32, 1], ease: "easeOut" }}
      className="relative flex h-[58vh] w-[86vw] max-w-3xl items-center justify-center rounded-2xl border border-sky-500/30 bg-[#0d1117] shadow-[0_0_70px_rgba(56,189,248,0.15)]"
    >
      {/* scanlines CRT */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.025)_3px)]" />
      {/* flash d'allumage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.5, times: [0, 0.34, 0.6] }}
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-sky-200 shadow-[0_0_24px_rgba(125,211,252,0.9)]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.25 }}
        className="px-6 text-center"
      >
        <Icon icon="lucide:monitor" className="mx-auto text-5xl text-sky-400" />
        <div className="mt-5 space-y-1 text-left font-mono text-[12px] text-sky-300/90 sm:text-sm">
          {boot.map((l, i) => (
            <motion.p
              key={l}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.56 + i * 0.12 }}
            >
              {l}
            </motion.p>
          ))}
          <p className="pt-1 text-cyan-300">
            ready
            <span className="ml-1 inline-block h-3.5 w-2 animate-pulse bg-cyan-300 align-middle" />
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Vers la vue recruteur : transition douce (glow + scintillement). */
function ProfileScreen() {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-sky-500/15 blur-3xl" />
      <span className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 ring-1 ring-white/10">
        <Icon icon="lucide:sparkles" className="text-4xl text-sky-300" />
      </span>
      <p className="mt-5 text-lg font-semibold text-white">Bienvenue</p>
      <p className="mt-1 text-sm text-stone-400">Chargement du profil…</p>
    </motion.div>
  );
}
