"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

const COMMANDS: Record<string, () => React.ReactNode> = {
  help: () => (
    <div className="grid gap-1 text-sm" style={{ gridTemplateColumns: "110px 1fr" }}>
      {[
        ["whoami", "Qui suis-je ?"],
        ["skills", "Compétences techniques"],
        ["projects", "Tous mes projets"],
        ["stack", "Stack principale"],
        ["cv", "Télécharger le CV"],
        ["contact", "Me contacter"],
        ["clear", "Vide le terminal"],
      ].map(([cmd, desc]) => (
        <React.Fragment key={cmd}>
          <span className="text-cyan-500 dark:text-cyan-400 font-mono">{cmd}</span>
          <span className="text-gray-500 dark:text-gray-400">{desc}</span>
        </React.Fragment>
      ))}
    </div>
  ),
  whoami: () => (
    <div className="space-y-1 text-sm">
      <p><span className="text-cyan-400">nom</span>       <span className="text-green-400">"Nadjide Omar"</span></p>
      <p><span className="text-cyan-400">rôle</span>      <span className="text-green-400">"Développeur Full Stack"</span></p>
      <p><span className="text-cyan-400">formation</span> <span className="text-green-400">"Master Expert Full Stack — Ynov Campus"</span></p>
      <p><span className="text-cyan-400">dispo</span>     <span className="text-yellow-400">true</span></p>
    </div>
  ),
  skills: () => (
    <div className="space-y-2 text-sm">
      {[
        { cat: "Front-end",   items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"] },
        { cat: "Back-end",    items: ["Node.js", "Express", "FastAPI", "Flask"] },
        { cat: "Données",     items: ["Prisma", "MariaDB", "MongoDB", "SQLite", "DuckDB", "Polars"] },
        { cat: "DevOps",      items: ["Docker", "GitHub Actions", "CI/CD"] },
        { cat: "Tests",       items: ["Jest", "pytest", "Cypress"] },
      ].map(({ cat, items }) => (
        <div key={cat} className="flex flex-wrap gap-1.5 items-center">
          <span className="text-cyan-400 w-24 shrink-0">{cat}</span>
          {items.map((i) => (
            <span key={i} className="px-1.5 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{i}</span>
          ))}
        </div>
      ))}
    </div>
  ),
  stack: () => (
    <div className="text-sm space-y-1">
      <p className="text-gray-400">Stack principale actuelle :</p>
      {["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "FastAPI", "Docker"].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <span className="text-green-400">✓</span>
          <span className="text-gray-300">{s}</span>
        </div>
      ))}
    </div>
  ),
  projects: () => (
    <div className="space-y-2 text-sm">
      {[
        { name: "Sonar",          desc: "Évaluation qualité commerciale avec IA",        featured: true },
        { name: "Stats Live 2.0", desc: "Dashboard statistiques temps réel",             featured: true },
        { name: "Portail CTA",    desc: "Hub SSO d'accès aux applications internes",     featured: true },
        { name: "Sentinel",       desc: "Gestion de parc matériel & logiciel",           featured: true },
        { name: "Exploree",       desc: "App mobile de recommandation (React Native)",   featured: false },
        { name: "Smart Hire",     desc: "RH & recrutement assisté par IA",               featured: false },
        { name: "Pokedex",        desc: "Interface React + Material UI",                 featured: false },
        { name: "Collecte Dons",  desc: "Mini-sites campagnes de collecte",              featured: false },
      ].map((p) => (
        <div key={p.name} className="flex items-start gap-2">
          <span className={p.featured ? "text-yellow-400" : "text-gray-500"}>{p.featured ? "★" : "○"}</span>
          <span className="font-semibold text-blue-400 w-32 shrink-0">{p.name}</span>
          <span className="text-gray-400">{p.desc}</span>
        </div>
      ))}
    </div>
  ),
  contact: () => (
    <div className="space-y-1 text-sm">
      <p><span className="text-cyan-400">email</span>    <a href="mailto:nadjide.omar@outlook.fr" className="text-green-400 underline">nadjide.omar@outlook.fr</a></p>
      <p><span className="text-cyan-400">github</span>   <a href="https://github.com/Nadjide" target="_blank" rel="noreferrer" className="text-green-400 underline">github.com/Nadjide</a></p>
      <p><span className="text-cyan-400">linkedin</span> <a href="https://linkedin.com/in/nadjide-omar-b55a01212" target="_blank" rel="noreferrer" className="text-green-400 underline">linkedin.com/in/...</a></p>
    </div>
  ),
};

const CodeWindow = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "",
      output: (
        <div className="text-sm space-y-0.5">
          <p className="text-green-400">Portfolio v2.0 — Nadjide Omar</p>
          <p className="text-gray-500 dark:text-gray-400">Tapez <span className="text-cyan-400">help</span> pour voir les commandes disponibles.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "cv") {
      const link = document.createElement("a");
      link.href = "/CV/CV_NADJIDE_OMAR.pdf";
      link.download = "CV_Nadjide_Omar.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: <span className="text-green-400 text-sm">✓ Téléchargement lancé : CV_Nadjide_Omar.pdf</span>,
        },
      ]);
      return;
    }

    const handler = COMMANDS[trimmed];
    const output = handler
      ? handler()
      : (
        <span className="text-red-400 text-sm">
          Commande inconnue : &quot;{trimmed}&quot;. Tapez <span className="text-cyan-400">help</span>.
        </span>
      );

    setHistory((prev) => [...prev, { command: cmd, output }]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-lg rounded-xl overflow-hidden bg-white dark:bg-[#1e1e1e] shadow-2xl shadow-blue-200/50 dark:shadow-black/50 border border-gray-100 dark:border-gray-700 font-mono text-sm relative z-10 transition-colors duration-300 flex flex-col h-[360px]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="bg-gray-50 dark:bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-400 font-medium">nadjide@portfolio ~ zsh</span>
      </div>

      {/* Body */}
      <div
        ref={containerRef}
        className="p-4 flex-1 overflow-y-auto cursor-text bg-white dark:bg-[#1e1e1e] transition-colors duration-300"
      >
        {history.map((item, idx) => (
          <div key={idx} className="mb-3">
            {item.command && (
              <div className="flex items-center gap-1.5 mb-1 text-sm">
                <span className="text-green-500">➜</span>
                <span className="text-blue-500 dark:text-cyan-400">~</span>
                <span className="text-gray-800 dark:text-gray-200">{item.command}</span>
              </div>
            )}
            <div>{item.output}</div>
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-green-500">➜</span>
          <span className="text-blue-500 dark:text-cyan-400">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-gray-800 dark:text-gray-200 caret-cyan-400"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal interactif"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CodeWindow;
