"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { projectsData, type ProjectData } from "../../projectsData";
import { skillGroups, experiences, formations } from "../../portfolioContent";
import { contactLinks } from "../../contactData";
import { findFile, allFiles } from "../../ide/fileSystem";
import { useIsCoarsePointer } from "../../hooks/useIsCoarsePointer";
import ProjectWindow from "./ProjectWindow";
import CIPipeline from "../ide/CIPipeline";

/** API impérative exposée au layout IDE (panneau Scripts, boutons "Run demo"…). */
export interface TerminalHandle {
  run: (cmd: string) => void;
  clear: () => void;
}

export interface TerminalProps {
  /** Ouvre un fichier dans l'éditeur central (commandes « cat » / « code »). */
  onOpenPath?: (path: string) => void;
}

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
  "cat",
  "code",
  "skills",
  "stack",
  "experience",
  "education",
  "parcours",
  "contact",
  "ci",
  "cv",
  "neofetch",
  "social",
  "clear",
  "history",
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
  const lc = name.toLowerCase();
  const partial = rest.join(" ").toLowerCase();
  if (["open", "cd"].includes(lc)) {
    if (!partial) return "";
    const p = projectsData.find((pr) => projectKey(pr.title).startsWith(partial));
    if (p) return `${name} ${projectKey(p.title)}`;
  }
  if (["cat", "code"].includes(lc)) {
    if (!partial) return "";
    const f = allFiles().find(
      (file) =>
        file.path.toLowerCase().startsWith(partial) ||
        file.name.toLowerCase().startsWith(partial)
    );
    if (f) return `${name} ${f.path}`;
  }
  return "";
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
      <p className="mt-1 flex items-center gap-1.5 text-cyan-300">
        Wake up, Nadjide... <Icon icon="lucide:rabbit" className="text-[15px]" /> follow the white rabbit.
      </p>
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
      className="ml-2 inline-flex items-center gap-1 rounded border border-sky-500/30 bg-sky-500/5 px-1.5 py-0.5 text-[11px] text-sky-200 transition hover:bg-sky-500/15"
    >
      {copied ? (
        <>
          <Icon icon="lucide:check" className="text-[12px]" /> copié
        </>
      ) : (
        <>
          <Icon icon="lucide:copy" className="text-[12px]" /> copier
        </>
      )}
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

const Terminal = forwardRef<TerminalHandle, TerminalProps>(function Terminal(
  { onOpenPath },
  ref
) {
  const isCoarse = useIsCoarsePointer();
  const [mounted, setMounted] = useState(false);
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
          ["open <projet>", "lancer la démo"],
          ["cat <fichier>", "ouvrir un fichier"],
          ["skills", "stack technique"],
          ["experience", "expériences pro"],
          ["education", "formation"],
          ["contact", "me joindre"],
          ["ci", "pipeline CI/CD"],
          ["cv", "obtenir mon CV (sur demande)"],
          ["neofetch", "infos système"],
          ["history", "commandes tapées"],
          ["clear", "vider l'écran"],
        ].map(([c, desc]) => (
          <div key={c} className="flex items-center gap-2">
            <Cmd
              run={
                c.startsWith("open")
                  ? "projects"
                  : c.startsWith("cat")
                  ? "code skills.json"
                  : c
              }
            >
              {c}
            </Cmd>
            <span className="hidden text-xs text-stone-500 sm:inline">{desc}</span>
          </div>
        ))}
      </div>
      <p className="pt-1 text-xs text-stone-600">
        Astuce : <span className="text-stone-400">Tab</span> ou{" "}
        <span className="text-stone-400">→</span> accepte la suggestion grisée,{" "}
        <span className="text-stone-400">↑ / ↓</span> rappelle l'historique. Quelques
        commandes cachées traînent aussi.{" "}
        <Icon icon="lucide:eye" className="inline-block align-text-bottom text-[14px]" />
      </p>
    </div>
  );

  const aboutOutput = () => (
    <div className="space-y-3">
      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-5 text-sky-300/90">{`Nadjide Omar — Ingénieur DevOps / Développeur Full Stack`}</pre>
      <div className="grid gap-1 font-mono text-[13px] sm:grid-cols-2">
        {[
          ["lucide:map-pin", "Localisation", "Nice (06)"],
          ["lucide:graduation-cap", "Formation", "Mastère Expert Dév. Logiciel (Bac+5)"],
          ["lucide:briefcase", "Expérience", "Alternance CTA · 2021 → 2026"],
          ["lucide:globe", "Langues", "Français natif · Anglais C1"],
        ].map(([icon, k, v]) => (
          <p key={k} className="flex items-center gap-1.5">
            <Icon icon={icon} className="shrink-0 text-sky-400 text-[14px]" />
            <span className="text-sky-400">{k}: </span>
            <span className="text-stone-300">{v}</span>
          </p>
        ))}
      </div>
      <p className="max-w-2xl leading-6 text-stone-300">
        Développeur Full Stack avec une forte culture DevOps : je conçois, teste,
        déploie et maintiens des applications internes en production. J'ai bâti un
        écosystème d'outils métiers automatisant des processus critiques, avec un
        gain de productivité majeur à la clé.
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
            <p className="font-mono text-xs text-stone-500">{e.location} · {e.date}</p>
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
      <p className="text-stone-500">
        → <Cmd run="education">education</Cmd> pour la formation.
      </p>
    </div>
  );

  const educationOutput = () => (
    <div className="space-y-1">
      <p className="font-mono text-xs uppercase tracking-wider text-sky-400"># Formation</p>
      <div className="mt-2 space-y-3">
        {[...formations].reverse().map((f) => (
          <div key={f.id} className="border-l border-sky-500/30 pl-4">
            <p className="font-bold text-white">{f.title}</p>
            <p className="font-mono text-xs text-stone-500">
              {f.company} · {f.location} · {f.date}
            </p>
            {f.tech.length ? (
              <div className="mt-1 flex flex-wrap gap-1">
                {f.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-stone-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );

  const contactOutput = () => {
    return (
      <div className="space-y-1.5 font-mono text-[13px]">
        <p className="text-stone-400">Liens — cliquables :</p>
        {contactLinks.map(({ label, value, href }) => (
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
            sur demande →
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
      case "cat":
      case "code": {
        if (!arg) {
          pushLine(<p className="text-yellow-400">usage: cat &lt;fichier&gt; — ex. « cat projects/stajio.ts » ou « cat skills.json ».</p>);
          break;
        }
        const file = findFile(arg);
        if (file && onOpenPath) {
          pushLine(
            <p className="font-mono text-sky-300">
              → ouverture de <span className="text-cyan-300">{file.path}</span> dans l&apos;éditeur…
            </p>
          );
          onOpenPath(file.path);
        } else if (file) {
          pushLine(<p className="font-mono text-stone-300">{file.path}</p>);
        } else {
          pushLine(
            <p className="text-yellow-400">
              fichier introuvable : « {arg} ». Explore la sidebar à gauche.
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
        pushLine(experienceOutput());
        break;
      case "education":
      case "formation":
      case "parcours":
      case "studies":
        pushLine(educationOutput());
        break;
      case "ci":
      case "pipeline":
        pushLine(<CIPipeline />);
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
        pushLine(
          <div className="font-mono text-sky-200/90 space-y-1">
            <p>Mon CV n'est pas en téléchargement direct.</p>
            <p>
              Écris-moi et je te l'envoie :{" "}
              <a
                href="mailto:nadjide.omar@outlook.fr?subject=Demande%20de%20CV%20%E2%80%94%20Nadjide%20Omar"
                className="text-sky-300 underline"
              >
                email
              </a>
              {" · "}
              <a
                href="https://www.linkedin.com/in/nadjide-omar-b55a01212/"
                target="_blank"
                rel="noreferrer"
                className="text-sky-300 underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
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
          <p className="flex items-center gap-1.5 font-mono text-red-400">
            visitor n'est pas dans le fichier sudoers. Cet incident sera signalé.
            <Icon icon="lucide:siren" className="text-[15px]" />
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
            <p className="mt-1 flex items-center gap-1.5 font-mono text-cyan-300">
              <Icon icon="lucide:coffee" className="text-[15px]" /> brewing... café prêt. Bon code !
            </p>
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

  /* ── API impérative pour le layout IDE (Scripts, "Run demo") ── */
  useImperativeHandle(
    ref,
    () => ({
      run: (cmd: string) => executeRef.current(cmd),
      clear: () => setLines([]),
    }),
    []
  );

  /* ───────────── démarrage propre : prompt + sortie « help » direct ───────────── */

  useEffect(() => {
    pushLine(
      <div className="flex items-baseline gap-1">
        <Prompt small />
        <span className="font-mono text-stone-200">help</span>
      </div>
    );
    pushLine(helpOutput());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ───────────────────────── effects: focus & scroll ───────────────────────── */

  useEffect(() => {
    if (!openProject) inputRef.current?.focus();
  }, [lines, openProject]);

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
    <div className="flex h-full flex-col bg-[#0d1117] text-[#cccccc]">
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

      <AnimatePresence>
        {openProject ? (
          <ProjectWindow
            project={openProject}
            isMobile={isMobile}
            onClose={() => setOpenProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
});

export default Terminal;
