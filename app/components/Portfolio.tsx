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
  // Notice d'accueil affichée à chaque visite (pas de persistance volontairement).
  const [showWelcome, setShowWelcome] = useState(true);

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

  // Choix depuis la notice d'accueil : bascule directe (sans transition) + ferme.
  const chooseView = (v: View) => {
    setShowWelcome(false);
    if (v !== view) {
      setView(v);
      try {
        localStorage.setItem(KEY, v);
      } catch {
        /* ignore */
      }
    }
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

      <AnimatePresence>
        {showWelcome ? (
          <WelcomeModal onChoose={chooseView} onClose={() => setShowWelcome(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────── notice d'accueil (1ʳᵉ impression) ─────────────────────── */

function WelcomeModal({
  onChoose,
  onClose,
}: {
  onChoose: (v: View) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0c111b] p-6 shadow-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-stone-400 transition hover:bg-white/10 hover:text-white"
        >
          <Icon icon="lucide:x" className="text-[18px]" />
        </button>

        <div className="relative text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.png" alt="" className="mx-auto h-16 w-16 rounded-2xl" />
          <h2 className="mt-4 text-2xl font-black text-white">Bienvenue</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-400">
            Ce portfolio se découvre de deux façons. Choisissez la vôtre — vous pourrez basculer à
            tout moment.
          </p>
        </div>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onChoose("simple")}
            className="group flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-sky-400/50 hover:bg-white/[0.06]"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-400/20">
              <Icon icon="lucide:briefcase" className="text-xl text-sky-300" />
            </span>
            <span className="font-semibold text-white">Vue recruteur</span>
            <span className="text-xs leading-5 text-stone-400">
              Mon profil présenté clairement, droit au but.
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-sky-400">
              Découvrir <Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChoose("ide")}
            className="group flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-cyan-400/50 hover:bg-white/[0.06]"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-400/20">
              <Icon icon="lucide:square-terminal" className="text-xl text-cyan-300" />
            </span>
            <span className="font-semibold text-white">Vue développeur</span>
            <span className="text-xs leading-5 text-stone-400">
              Un IDE interactif avec terminal jouable (tapez <span className="font-mono text-cyan-300">help</span>).
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-cyan-400">
              Explorer <Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="relative mx-auto mt-5 block text-xs text-stone-500 transition hover:text-stone-300"
        >
          ou explorer librement
        </button>
      </motion.div>
    </motion.div>
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
