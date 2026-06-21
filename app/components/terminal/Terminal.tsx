"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectsData, type ProjectData } from "../../projectsData";
import { skillGroups, experiences, formations } from "../../portfolioContent";
import { useIsCoarsePointer } from "../../hooks/useIsCoarsePointer";
import ProjectWindow from "./ProjectWindow";

/* ─────────────────────────── helpers & data ─────────────────────────── */

const projectKey = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const COMMANDS = [
  "help",
  "about",
  "whoami",
  "projects",
  "ls",
  "open",
  "skills",
  "stack",
  "experience",
  "parcours",
  "contact",
  "cv",
  "neofetch",
  "social",
  "clear",
  "history",
  "neofetch",
  "matrix",
  "coffee",
  "sudo",
  "date",
] as const;

type Line = { id: number; node: React.ReactNode };

/* ── inline autocomplete: returns the fully-completed command for an input ── */
function getCompletion(value: string): string {
  if (!value) return "";
  const parts = value.split(/\s+/);
  if (parts.length === 1) {
    const m = COMMANDS.find((c) => c.startsWith(value.toLowerCase()) && c !== value.toLowerCase());
    return m ?? "";
  }
  const [name, ...rest] = parts;
  if (["open", "cat", "cd"].includes(name.toLowerCase())) {
    const partial = rest.join(" ").toLowerCase();
    if (!partial) return "";
    const p = projectsData.find((pr) => projectKey(pr.title).startsWith(partial));
    if (p) return `${name} ${projectKey(p.title)}`;
  }
  return "";
}

/* ── typewriter effect ── */
function Typewriter({
  text,
  speed = 24,
  onDone,
  className,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
}) {
  const [n, setN] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (n >= text.length) {
      doneRef.current?.();
      return;
    }
    const t = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);
  return <span className={className}>{text.slice(0, n)}</span>;
}

/* ── easter eggs ── */
function MatrixBlock() {
  const chars = "アカサタナハマヤラワ0123456789";
  const rows = Array.from({ length: 5 }, () =>
    Array.from({ length: 46 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  );
  return (
    <div className="font-mono text-[11px] leading-4 text-sky-400/80">
      {rows.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.55] }}
          transition={{ duration: 1.2, delay: i * 0.1 }}
        >
          {r}
        </motion.div>
      ))}
      <p className="mt-1 text-cyan-300">Wake up, Nadjide... 🐇 follow the white rabbit.</p>
    </div>
  );
}

const COFFEE_ART = String.raw`
        (  )   (   )  )
         ) (   )  (  (
         ( )  (    ) )
         _____________
        <_____________> ___
        |             |/ _ \
        |               | | |
        |               |_| |
     ___|             |\___/
    /    \___________/    \
    \_____________________/`;

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="ml-2 rounded border border-sky-500/30 bg-sky-500/5 px-1.5 py-0.5 text-[11px] text-sky-200 transition hover:bg-sky-500/15"
    >
      {copied ? "copié ✓" : "copier"}
    </button>
  );
}

/* ─────────────────────────── inline UI atoms ─────────────────────────── */

function Prompt({ small }: { small?: boolean }) {
  return (
    <span className="select-none whitespace-nowrap font-mono">
      <span className="text-sky-400">visitor</span>
      <span className="text-stone-500">@</span>
      <span className="text-sky-300">nadjide</span>
      <span className="text-stone-500">:</span>
      <span className="text-cyan-300">~</span>
      <span className="text-stone-500">{small ? " $" : "$"} </span>
    </span>
  );
}

/* ─────────────────────────── main component ─────────────────────────── */

export default function Terminal() {
  const isCoarse = useIsCoarsePointer();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"boot" | "ready">("boot");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number>(-1);
  const [openProject, setOpenProject] = useState<ProjectData | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const executeRef = useRef<(cmd: string) => void>(() => {});

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("term_history");
      if (saved) setCmdHistory(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("term_history", JSON.stringify(cmdHistory.slice(-50)));
    } catch {
      /* ignore */
    }
  }, [cmdHistory]);

  const isMobile = mounted && isCoarse;

  const pushLine = useCallback((node: React.ReactNode) => {
    setLines((prev) => [...prev, { id: idRef.current++, node }]);
  }, []);

  const run = useCallback((cmd: string) => executeRef.current(cmd), []);

  /* ── clickable command chip ── */
  const Cmd = useCallback(
    ({ children, run: cmd }: { children: React.ReactNode; run: string }) => (
      <button
        type="button"
        onClick={() => run(cmd)}
        className="rounded border border-sky-500/30 bg-sky-500/5 px-2 py-0.5 text-left font-mono text-[13px] text-sky-200 transition hover:border-sky-400/60 hover:bg-sky-500/15 hover:text-sky-100"
      >
        {children}
      </button>
    ),
    [run]
  );

  /* ───────────────────── content builders (outputs) ───────────────────── */

  const helpOutput = () => (
    <div className="space-y-2">
      <p className="text-stone-400">Commandes disponibles — clique ou tape :</p>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {[
          ["help", "cette aide"],
          ["about", "qui suis-je"],
          ["projects", "liste des projets"],
          ["open <projet>", "ouvrir un projet"],
          ["skills", "stack technique"],
          ["experience", "parcours & formation"],
          ["contact", "me joindre"],
          ["cv", "télécharger le CV"],
          ["neofetch", "infos système"],
          ["history", "commandes tapées"],
          ["clear", "vider l'écran"],
        ].map(([c, desc]) => (
          <div key={c} className="flex items-center gap-2">
            <Cmd run={c.split(" ")[0] === "open" ? "projects" : c}>{c}</Cmd>
            <span className="hidden text-xs text-stone-500 sm:inline">{desc}</span>
          </div>
        ))}
      </div>
      <p className="pt-1 text-xs text-stone-600">
        Astuce : <span className="text-stone-400">Tab</span> ou{" "}
        <span className="text-stone-400">→</span> accepte la suggestion grisée,{" "}
        <span className="text-stone-400">↑ / ↓</span> rappelle l'historique. Quelques
        commandes cachées traînent aussi. 👀
      </p>
    </div>
  );

  const aboutOutput = () => (
    <div className="space-y-3">
      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-5 text-sky-300/90">{`Nadjide Omar — Ingénieur DevOps / Développeur Full Stack`}</pre>
      <div className="grid gap-1 font-mono text-[13px] sm:grid-cols-2">
        {[
          ["📍 Localisation", "Nice (06)"],
          ["🎓 Formation", "Mastère Expert Dév. Logiciel (Bac+5)"],
          ["💼 Expérience", "Alternance CTA · 2021 → 2026"],
          ["🌐 Langues", "Français natif · Anglais C1"],
        ].map(([k, v]) => (
          <p key={k}>
            <span className="text-sky-400">{k}: </span>
            <span className="text-stone-300">{v}</span>
          </p>
        ))}
      </div>
      <p className="max-w-2xl leading-6 text-stone-300">
        Développeur Full Stack avec une forte culture DevOps : je conçois, teste,
        déploie et maintiens des applications internes en production. J'ai bâti un
        écosystème d'outils métiers automatisant des process critiques — dont un
        intégrateur divisant par deux le temps de montage des campagnes.
      </p>
      <p className="text-stone-500">
        → <Cmd run="projects">projects</Cmd> pour voir le travail, ou{" "}
        <Cmd run="contact">contact</Cmd> pour me joindre.
      </p>
    </div>
  );

  const projectsOutput = () => (
    <div className="space-y-2">
      <p className="text-stone-400">
        {projectsData.length} projets — <span className="text-sky-300">open &lt;nom&gt;</span> ou clique :
      </p>
      <div className="space-y-1.5 font-mono text-[13px]">
        {projectsData.map((p) => (
          <div key={p.id} className="flex items-baseline gap-3">
            <button
              type="button"
              onClick={() => run(`open ${projectKey(p.title)}`)}
              className="group flex min-w-0 items-baseline gap-2 text-left"
            >
              <span className="text-sky-500/60">drwxr-xr-x</span>
              <span className="font-bold text-cyan-300 underline-offset-4 group-hover:underline">
                {projectKey(p.title)}/
              </span>
            </button>
            <span className="truncate text-stone-500">
              {p.year ?? "—"} · {p.context ?? "projet"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const skillsOutput = () => (
    <div className="space-y-3">
      <p className="text-stone-400">Stack technique :</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {skillGroups.map((g) => (
          <div key={g.category} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="font-mono text-xs uppercase tracking-wider text-sky-400">
              {g.category}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="rounded border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[11px] text-stone-300"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const experienceOutput = () => (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-sky-400">
          # Expérience
        </p>
        {experiences.map((e) => (
          <div key={e.id} className="mt-2 border-l border-sky-500/30 pl-4">
            <p className="font-bold text-white">
              {e.title} <span className="text-stone-500">@ {e.company}</span>
            </p>
            <p className="font-mono text-xs text-stone-500">{e.date}</p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-400">{e.description}</p>
            <ul className="mt-2 space-y-0.5">
              {e.achievements.slice(0, 4).map((a, i) => (
                <li key={i} className="text-sm text-stone-300">
                  <span className="text-sky-500">▸ </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-sky-400"># Formation</p>
        <div className="mt-2 space-y-2">
          {formations.map((f) => (
            <div key={f.id} className="border-l border-sky-500/30 pl-4">
              <p className="font-bold text-white">{f.title}</p>
              <p className="font-mono text-xs text-stone-500">
                {f.company} · {f.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const contactOutput = () => {
    const links: [string, string, string][] = [
      ["Email", "nadjide.omar@outlook.fr", "mailto:nadjide.omar@outlook.fr"],
      ["GitHub", "github.com/Nadjide", "https://github.com/Nadjide"],
      ["LinkedIn", "in/nadjide-omar", "https://www.linkedin.com/in/nadjide-omar-b55a01212/"],
      ["Téléphone", "06 34 78 67 13", "tel:+33634786713"],
    ];
    return (
      <div className="space-y-1.5 font-mono text-[13px]">
        <p className="text-stone-400">Liens — cliquables :</p>
        {links.map(([label, value, href]) => (
          <p key={label}>
            <span className="inline-block w-24 text-sky-400">{label}</span>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-sky-300 underline-offset-2 hover:underline"
            >
              {value}
            </a>
            {label === "Email" ? <CopyEmail email={value} /> : null}
          </p>
        ))}
        <p className="pt-1">
          <span className="inline-block w-24 text-sky-400">CV</span>
          <button
            type="button"
            onClick={() => run("cv")}
            className="text-cyan-300 underline-offset-2 hover:underline"
          >
            télécharger →
          </button>
        </p>
      </div>
    );
  };

  const neofetchOutput = () => (
    <div className="flex flex-col gap-4 font-mono text-[12px] sm:flex-row sm:gap-6">
      <pre className="text-sky-400">{String.raw`
   _   _  ___
  | \ | |/ _ \   nadjide@portfolio
  |  \| | | | |  ----------------
  | |\  | |_| |  OS: PortfolioOS x86_64
  |_| \_|\___/   Shell: nadjide-sh 2.0
                 Stack: Next.js · TS · Docker
`}</pre>
      <div className="space-y-0.5 text-stone-300">
        <p><span className="text-sky-400">role</span>: DevOps / Full Stack</p>
        <p><span className="text-sky-400">projects</span>: {projectsData.length}</p>
        <p><span className="text-sky-400">uptime</span>: dev depuis 2021</p>
        <p><span className="text-sky-400">location</span>: Nice, FR</p>
        <p><span className="text-sky-400">langs</span>: FR · EN (C1)</p>
        <div className="mt-2 flex gap-1">
          {["#7dd3fc", "#38bdf8", "#22d3ee", "#60a5fa", "#0ea5e9"].map((c) => (
            <span key={c} className="h-3 w-3 rounded-sm" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );

  /* ───────────────────────── command executor ───────────────────────── */

  const execute = (raw: string) => {
    const cmd = raw.trim();
    // echo the typed command
    pushLine(
      <div className="flex items-baseline gap-1">
        <Prompt small />
        <span className="font-mono text-stone-200">{cmd}</span>
      </div>
    );

    if (cmd) {
      setCmdHistory((prev) => [...prev, cmd]);
    }
    setHistIndex(-1);

    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase().trim();

    switch ((name || "").toLowerCase()) {
      case "":
        break;
      case "help":
      case "?":
      case "man":
        pushLine(helpOutput());
        break;
      case "about":
      case "whoami":
        pushLine(aboutOutput());
        break;
      case "projects":
      case "ls":
      case "ll":
        pushLine(projectsOutput());
        break;
      case "open":
      case "cat":
      case "cd": {
        if (!arg) {
          pushLine(<p className="text-yellow-400">usage: open &lt;projet&gt; — ex. « open stajio ». Tape « projects ».</p>);
          break;
        }
        const found =
          projectsData.find((p) => projectKey(p.title) === arg) ||
          projectsData.find((p) => projectKey(p.title).startsWith(arg)) ||
          projectsData.find((p) => p.title.toLowerCase().includes(arg));
        if (found) {
          pushLine(
            <p className="font-mono text-sky-300">
              → launching <span className="text-cyan-300">{found.title}</span>...
            </p>
          );
          setOpenProject(found);
        } else {
          pushLine(
            <p className="text-yellow-400">
              projet introuvable : « {arg} ». Tape <Cmd run="projects">projects</Cmd>.
            </p>
          );
        }
        break;
      }
      case "skills":
      case "stack":
        pushLine(skillsOutput());
        break;
      case "experience":
      case "xp":
      case "parcours":
        pushLine(experienceOutput());
        break;
      case "contact":
      case "links":
        pushLine(contactOutput());
        break;
      case "neofetch":
        pushLine(neofetchOutput());
        break;
      case "social":
        pushLine(contactOutput());
        break;
      case "cv":
      case "resume": {
        const a = document.createElement("a");
        a.href = "/CV/CV_Nadjide_Omar_DevOps_2026.pdf";
        a.download = "CV_Nadjide_Omar_DevOps_2026.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        pushLine(
          <p className="font-mono text-sky-300">
            ↓ téléchargement du CV...{" "}
            <a href="/CV/CV_Nadjide_Omar_DevOps_2026.pdf" target="_blank" rel="noreferrer" className="text-sky-300 underline">
              ouvrir
            </a>
          </p>
        );
        break;
      }
      case "date":
        pushLine(<p className="font-mono text-stone-300">{new Date().toString()}</p>);
        break;
      case "echo":
        pushLine(<p className="font-mono text-stone-300">{rest.join(" ")}</p>);
        break;
      case "sudo":
        pushLine(
          <p className="font-mono text-red-400">
            visitor n'est pas dans le fichier sudoers. Cet incident sera signalé. 🚓
          </p>
        );
        break;
      case "history":
        pushLine(
          cmdHistory.length ? (
            <div className="font-mono text-[13px]">
              {cmdHistory.slice(-30).map((h, i) => (
                <div key={i} className="flex items-baseline gap-3">
                  <span className="w-6 shrink-0 text-right text-stone-600">{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => run(h)}
                    className="text-sky-300 underline-offset-2 hover:underline"
                  >
                    {h}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-500">historique vide.</p>
          )
        );
        break;
      case "matrix":
        pushLine(<MatrixBlock />);
        break;
      case "coffee":
      case "brew":
        pushLine(
          <div>
            <pre className="font-mono text-[11px] leading-3 text-sky-300">{COFFEE_ART}</pre>
            <p className="mt-1 font-mono text-cyan-300">☕ brewing... café prêt. Bon code !</p>
          </div>
        );
        break;
      case "clear":
      case "cls":
        setLines([]);
        return;
      default:
        pushLine(
          <p className="text-yellow-400">
            commande introuvable : <span className="font-mono">{name}</span>. Tape{" "}
            <Cmd run="help">help</Cmd>.
          </p>
        );
    }
  };

  executeRef.current = execute;

  /* ───────────────────────── boot sequence ───────────────────────── */

  useEffect(() => {
    const boot = [
      "booting portfolio-os v2.0 ...",
      "[ OK ] mounting /projects",
      "[ OK ] loading modules: next.js · typescript · docker",
      "[ OK ] starting nadjide-sh",
      "ready.",
    ];
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const step = () => {
      if (i < boot.length) {
        const txt = boot[i];
        pushLine(
          <p className="font-mono text-[13px] text-sky-400/80">
            {txt.startsWith("[ OK ]") ? (
              <>
                <span className="text-sky-400">[ OK ]</span>
                {txt.slice(6)}
              </>
            ) : (
              txt
            )}
          </p>
        );
        i++;
        timers.push(setTimeout(step, 230 + Math.random() * 160));
      } else {
        timers.push(
          setTimeout(() => {
            pushLine(<WelcomeBanner Cmd={Cmd} />);
            setPhase("ready");
          }, 260)
        );
      }
    };
    timers.push(setTimeout(step, 320));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ───────────────────────── effects: focus & scroll ───────────────────────── */

  useEffect(() => {
    if (phase === "ready" && !openProject) inputRef.current?.focus();
  }, [phase, lines, openProject]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  /* ───────────────────────── input handlers ───────────────────────── */

  const submit = () => {
    execute(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const c = getCompletion(input);
      if (c) setInput(c.split(/\s+/).length === 1 ? c + " " : c);
    } else if (e.key === "ArrowRight") {
      const el = e.currentTarget;
      if (el.selectionStart === input.length && el.selectionEnd === input.length) {
        const c = getCompletion(input);
        if (c) {
          e.preventDefault();
          setInput(c.split(/\s+/).length === 1 ? c + " " : c);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const next = histIndex < 0 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex < 0) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  const quickCmds = ["help", "projects", "about", "skills", "experience", "contact", "cv"];

  const completion = getCompletion(input);
  const ghost = completion && completion.startsWith(input) ? completion.slice(input.length) : "";

  /* ───────────────────────── render ───────────────────────── */

  return (
    <main className="crt-screen relative flex min-h-screen flex-col bg-[#06090f] p-0 text-stone-100 sm:p-4 md:p-8">
      <div className="pointer-events-none fixed inset-0 z-[40] crt-scanlines opacity-40" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.10),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden border-sky-500/25 bg-[#0a0e15]/90 backdrop-blur-sm sm:rounded-xl sm:border">
        {/* window chrome */}
        <div className="flex shrink-0 items-center gap-2 border-b border-sky-500/20 bg-[#0c1119] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-sky-500/70" />
          <span className="ml-3 truncate font-mono text-xs text-sky-300/70">
            visitor@nadjide: ~ — bash — 80×24
          </span>
          <span className="ml-auto hidden font-mono text-[11px] text-stone-600 sm:inline">
            nadjide omar · portfolio
          </span>
        </div>

        {/* terminal body */}
        <div
          ref={scrollRef}
          onClick={() => !isMobile && inputRef.current?.focus()}
          className="terminal-scroll flex-1 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-6 sm:text-sm"
        >
          <div className="space-y-2" role="log" aria-live="polite" aria-atomic="false">
            {lines.map((l) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12 }}
              >
                {l.node}
              </motion.div>
            ))}
          </div>

          {/* live input line */}
          {phase === "ready" ? (
            <div className="mt-2 flex items-baseline gap-1">
              <Prompt small />
              <div className="relative flex-1">
                {/* ghost autocomplete layer */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre font-mono text-stone-100"
                >
                  <span className="text-transparent">{input}</span>
                  <span className="text-stone-600">{ghost}</span>
                </div>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal input"
                  className="relative w-full border-none bg-transparent p-0 font-mono text-stone-100 caret-cyan-300 outline-none placeholder:text-stone-600"
                  placeholder={ghost ? "" : "tape « help » puis Entrée…"}
                />
              </div>
            </div>
          ) : (
            <div className="mt-2 flex items-center gap-1">
              <Prompt small />
              <span className="inline-block h-4 w-2 animate-pulse bg-sky-400" />
            </div>
          )}
        </div>

        {/* mobile quick commands */}
        {isMobile ? (
          <div className="shrink-0 border-t border-sky-500/20 bg-[#0c1119] px-3 py-2">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickCmds.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => run(c)}
                  className="shrink-0 rounded-full border border-sky-500/30 bg-sky-500/5 px-3 py-1.5 font-mono text-xs text-sky-200 active:bg-sky-500/20"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {openProject ? (
          <ProjectWindow
            project={openProject}
            isMobile={isMobile}
            onClose={() => setOpenProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}

/* ─────────────────────────── welcome banner ─────────────────────────── */

function WelcomeBanner({
  Cmd,
}: {
  Cmd: (props: { children: React.ReactNode; run: string }) => React.JSX.Element;
}) {
  const [done, setDone] = useState(false);
  return (
    <div className="space-y-3 py-1">
      <pre className="overflow-x-auto font-mono text-[10px] leading-[1.15] text-sky-400 sm:text-xs">{String.raw`
 _   _    _    ___    _ ___ ___  ___    ___  __  __    _    ___
| \ | |  /_\  |   \  | |_ _|   \| __|  / _ \|  \/  |  /_\  | _ \
|  \| | / _ \ | |) |_| || || |) | _|  | (_) | |\/| | / _ \ |   /
|_| \_|/_/ \_\|___/\___/___|___/|___|  \___/|_|  |_|/_/ \_\|_|_\
`}</pre>
      <p className="text-stone-300">
        <Typewriter
          text="Bienvenue sur mon portfolio interactif. "
          onDone={() => setDone(true)}
        />
        {done ? (
          <span className="text-sky-300">Ingénieur DevOps &amp; Full Stack.</span>
        ) : (
          <span className="inline-block h-3.5 w-2 animate-pulse bg-sky-400 align-middle" />
        )}
      </p>
      {done ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-stone-500"
        >
          Tape <Cmd run="help">help</Cmd> pour commencer, ou{" "}
          <Cmd run="projects">projects</Cmd> pour voir mes projets directement.
        </motion.p>
      ) : null}
    </div>
  );
}
