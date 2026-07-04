"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { projectsData, type ProjectData } from "../../projectsData";
import { skillGroups, experiences, formations } from "../../portfolioContent";
import { contactLinks } from "../../contactData";
import { useIsCoarsePointer } from "../../hooks/useIsCoarsePointer";
import ProjectWindow from "./ProjectWindow";
import CIPipeline from "./CIPipeline";

/* ─────────────────────────── helpers & data ─────────────────────────── */

const projectKey = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* Liste utilisée par l'autocomplétion (Tab / →). Les commandes multi-mots
   sont complétées d'un bloc : « dock » → « docker ps ». */
const COMMANDS = [
  "help",
  "about",
  "whoami",
  "projects",
  "open",
  "skills",
  "experience",
  "education",
  "contact",
  "cv",
  "ci",
  "deploy",
  "docker ps",
  "kubectl get pods",
  "git log",
  "top",
  "ping",
  "uptime",
  "ssh prod",
  "neofetch",
  "hire-me",
  "theme",
  "history",
  "clear",
  "matrix",
  "coffee",
  "sudo",
  "date",
] as const;

export type TermTheme = "cyan" | "green" | "amber";
export const TERM_THEMES: { id: TermTheme; label: string }[] = [
  { id: "cyan", label: "Cyan" },
  { id: "green", label: "Phosphore" },
  { id: "amber", label: "Ambre" },
];

type Line = { id: number; node: React.ReactNode };

/* ── autocomplétion inline : renvoie la commande complétée pour une saisie ── */
function getCompletion(value: string): string {
  const v = value.toLowerCase();
  if (!v) return "";
  const m = COMMANDS.find((c) => c.startsWith(v) && c !== v);
  if (m) return m;
  const [name, ...rest] = value.split(/\s+/);
  const partial = rest.join(" ").toLowerCase();
  if (["open", "cd"].includes(name.toLowerCase()) && partial) {
    const p = projectsData.find((pr) => projectKey(pr.title).startsWith(partial));
    if (p) return `${name} ${projectKey(p.title)}`;
  }
  return "";
}

/* Petit hash déterministe → faux SHA git stable pour un libellé donné. */
const fakeSha = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = ((h ^ s.charCodeAt(i)) * 16777619) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
};

/* ─────────────────────────── blocs « ops » ─────────────────────────── */

/** `docker ps` — l'infra (fictive mais crédible) qui fait tourner le portfolio. */
function DockerPsBlock() {
  const rows = [
    ["portfolio-web", "nadjide/portfolio:latest", "Up 5 weeks (healthy)", ":3000→3000"],
    ["api", "fastapi:py3.12", "Up 5 weeks (healthy)", ":8000→8000"],
    ["db", "postgres:16-alpine", "Up 2 months (healthy)", ":5432"],
    ["cache", "redis:7-alpine", "Up 2 months", ":6379"],
    ["llm", "ollama/mistral:7b", "Up 12 days (healthy)", ":11434"],
    ["edge", "nginx:1.27-alpine", "Up 2 months", ":80→443"],
  ];
  return (
    <div className="overflow-x-auto font-mono text-[12px] leading-5">
      <div className="grid min-w-[34rem] grid-cols-[10rem_13rem_13rem_1fr] gap-x-4 text-stone-500">
        <span>NAMES</span>
        <span>IMAGE</span>
        <span>STATUS</span>
        <span>PORTS</span>
      </div>
      {rows.map(([name, image, status, ports]) => (
        <div
          key={name}
          className="grid min-w-[34rem] grid-cols-[10rem_13rem_13rem_1fr] gap-x-4"
        >
          <span className="text-[rgb(var(--tc-c-rgb))]">{name}</span>
          <span className="text-stone-300">{image}</span>
          <span className="text-green-400">{status}</span>
          <span className="text-stone-400">{ports}</span>
        </div>
      ))}
      <p className="mt-1 text-stone-500">6 conteneurs · 0 down — tout roule.</p>
    </div>
  );
}

/** `kubectl get pods` — parce qu'un DevOps sans k8s, c'est louche. */
function KubectlBlock() {
  const rows = [
    ["web-7f9c4d5b6-x2p4q", "1/1", "Running", "0", "12d"],
    ["api-6b8f7c9d4-p9k2m", "1/1", "Running", "0", "12d"],
    ["llm-0", "1/1", "Running", "0", "5d"],
    ["grafana-59d6f8b7c-w8n3z", "1/1", "Running", "0", "34d"],
  ];
  return (
    <div className="overflow-x-auto font-mono text-[12px] leading-5">
      <div className="grid min-w-[30rem] grid-cols-[15rem_4rem_6rem_6rem_1fr] gap-x-3 text-stone-500">
        <span>NAME</span>
        <span>READY</span>
        <span>STATUS</span>
        <span>RESTARTS</span>
        <span>AGE</span>
      </div>
      {rows.map(([name, ready, status, restarts, age]) => (
        <div
          key={name}
          className="grid min-w-[30rem] grid-cols-[15rem_4rem_6rem_6rem_1fr] gap-x-3"
        >
          <span className="text-[rgb(var(--tc-c-rgb))]">{name}</span>
          <span className="text-stone-300">{ready}</span>
          <span className="text-green-400">{status}</span>
          <span className="text-stone-400">{restarts}</span>
          <span className="text-stone-400">{age}</span>
        </div>
      ))}
    </div>
  );
}

/** `git log` — le parcours raconté en commits (données réelles). */
function GitLogBlock() {
  const entries = [
    ...experiences.map((e) => ({
      scope: "xp",
      label: `${e.title} @ ${e.company}`,
      date: e.date,
    })),
    ...[...formations].reverse().map((f) => ({
      scope: "edu",
      label: `${f.title} — ${f.company}`,
      date: f.date,
    })),
  ];
  return (
    <div className="space-y-0.5 overflow-x-auto font-mono text-[12.5px] leading-5">
      {entries.map((e, i) => (
        <p key={e.label} className="whitespace-nowrap">
          <span className="text-stone-500">* </span>
          <span className="text-yellow-500">{fakeSha(e.label)}</span>
          {i === 0 ? (
            <span className="text-[rgb(var(--tc-c-rgb))]"> (HEAD → master, origin/prod)</span>
          ) : null}
          <span className="text-stone-200"> feat({e.scope}): {e.label}</span>
          <span className="text-stone-500"> · {e.date}</span>
        </p>
      ))}
      <p className="whitespace-nowrap">
        <span className="text-stone-500">* </span>
        <span className="text-yellow-500">0000000</span>
        <span className="text-stone-200"> init: premier « Hello, World! »</span>
        <span className="text-stone-500"> · le début de tout</span>
      </p>
    </div>
  );
}

/** `top` — les processus qui tournent chez moi. */
const PROCS = [
  { pid: 1, cmd: "next-server", cpu: 12.4, mem: 6.1 },
  { pid: 42, cmd: "fastapi", cpu: 8.7, mem: 3.4 },
  { pid: 128, cmd: "ollama serve", cpu: 71.2, mem: 38.9 },
  { pid: 256, cmd: "postgres", cpu: 3.1, mem: 8.8 },
  { pid: 512, cmd: "dockerd", cpu: 2.4, mem: 4.0 },
  { pid: 1024, cmd: "veille-techno", cpu: 24.8, mem: 2.2 },
  { pid: 2048, cmd: "coffee-daemon", cpu: 0.5, mem: 0.1 },
  { pid: 9001, cmd: "motivation", cpu: 99.9, mem: 1.3 },
];

function TopBlock() {
  return (
    <div className="overflow-x-auto font-mono text-[12px] leading-5">
      <p className="text-stone-400">
        top — up {new Date().getFullYear() - 2021} years · 8 tasks, 0 zombie
      </p>
      <div className="mt-1 grid min-w-[28rem] grid-cols-[3.5rem_9rem_1fr_4rem_4rem] gap-x-3 text-stone-500">
        <span>PID</span>
        <span>COMMAND</span>
        <span />
        <span className="text-right">%CPU</span>
        <span className="text-right">%MEM</span>
      </div>
      {PROCS.map((p) => (
        <div
          key={p.pid}
          className="grid min-w-[28rem] grid-cols-[3.5rem_9rem_1fr_4rem_4rem] items-center gap-x-3"
        >
          <span className="text-stone-500">{p.pid}</span>
          <span className="text-[rgb(var(--tc-c-rgb))]">{p.cmd}</span>
          <span className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <span
              className={`block h-full rounded-full ${
                p.cpu > 90 ? "bg-fuchsia-400" : p.cpu > 50 ? "bg-[rgb(var(--tc-a-rgb))]" : "bg-[rgb(var(--tc-d-rgb)/0.7)]"
              }`}
              style={{ width: `${Math.min(p.cpu, 100)}%` }}
            />
          </span>
          <span className="text-right text-stone-300">{p.cpu.toFixed(1)}</span>
          <span className="text-right text-stone-400">{p.mem.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}

/** `ping` — réponses animées, latence honteusement bonne. */
function PingBlock({ host }: { host: string }) {
  const [n, setN] = useState(0);
  const [times] = useState(() =>
    Array.from({ length: 4 }, () => (8 + Math.random() * 18).toFixed(1))
  );
  useEffect(() => {
    if (n >= 5) return;
    const t = setTimeout(() => setN((x) => x + 1), n === 0 ? 250 : 600);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div className="font-mono text-[12.5px] leading-5">
      <p className="text-stone-400">PING {host} (76.76.21.21): 56 data bytes</p>
      {times.slice(0, Math.min(n, 4)).map((t, i) => (
        <p key={i} className="text-stone-300">
          64 bytes from {host}: icmp_seq={i + 1} ttl=57 time=
          <span className="text-green-400">{t} ms</span>
        </p>
      ))}
      {n >= 5 ? (
        <p className="pt-1 text-stone-500">
          4 packets transmitted, 4 received, <span className="text-green-400">0% packet loss</span>
          {" "}— je réponds vite, aussi par email.
        </p>
      ) : null}
    </div>
  );
}

/** `deploy` — mise en prod animée, zéro downtime évidemment. */
function DeploySequence() {
  const version = `v${new Date().getFullYear()}.${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const steps = [
    { label: "build", cmd: `docker build -t nadjide/portfolio:${version} .` },
    { label: "push", cmd: "docker push registry.nadjide.dev/portfolio" },
    { label: "rollout", cmd: "kubectl rollout restart deploy/portfolio-web" },
    { label: "health", cmd: "curl -f https://prod/healthz → 200 OK" },
  ];
  const [done, setDone] = useState(0);
  const finished = done >= steps.length;
  useEffect(() => {
    if (finished) return;
    const t = setTimeout(() => setDone((d) => d + 1), 700 + Math.random() * 500);
    return () => clearTimeout(t);
  }, [done, finished]);
  return (
    <div className="space-y-1 font-mono text-[13px]">
      {steps.map((s, i) => {
        const state = i < done ? "done" : i === done ? "run" : "pending";
        return (
          <div key={s.label} className="flex items-center gap-2">
            <span className="flex w-4 justify-center">
              {state === "done" ? (
                <Icon icon="lucide:circle-check" className="text-[14px] text-green-400" />
              ) : state === "run" ? (
                <Icon icon="lucide:loader-circle" className="animate-spin text-[14px] text-[rgb(var(--tc-a-rgb))]" />
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
          <Icon icon="lucide:rocket" className="text-[14px]" />
          Déployé en production ({version}) — zero downtime. Rollback dispo : « deploy --rollback ».
        </p>
      ) : null}
    </div>
  );
}

/** `hire-me` — provisionne un entretien via un faux « terraform apply », puis CTA. */
const HIRE_MAILTO =
  "mailto:nadjide.omar@outlook.fr?subject=" +
  encodeURIComponent("On se rencontre ? — Nadjide Omar") +
  "&body=" +
  encodeURIComponent(
    "Bonjour Nadjide,\n\nVotre portfolio m'a tapé dans l'œil. Discutons d'une opportunité :\n\n"
  );

function HireSequence() {
  const steps = [
    "terraform init",
    "terraform plan -out=interview.tfplan",
    'module.candidate: Refreshing state... [id="nadjide-omar"]',
    "aws_opportunity.interview: Creating...",
    "aws_opportunity.interview: Creation complete after 2s",
  ];
  const [done, setDone] = useState(0);
  const finished = done >= steps.length;
  useEffect(() => {
    if (finished) return;
    const t = setTimeout(() => setDone((d) => d + 1), 480 + Math.random() * 320);
    return () => clearTimeout(t);
  }, [done, finished]);
  return (
    <div className="space-y-1 font-mono text-[13px]">
      <p className="text-stone-400">$ hire-me — terraform apply -auto-approve</p>
      {steps.slice(0, done).map((s) => (
        <p key={s} className="text-stone-300">
          <span className="text-green-400">+ </span>
          {s}
        </p>
      ))}
      {finished ? (
        <div className="mt-2 space-y-2">
          <p className="flex items-center gap-1.5 font-semibold text-green-400">
            <Icon icon="lucide:party-popper" className="text-[14px]" />
            Apply complete! Resources: 1 opportunity added.
          </p>
          <p className="text-stone-400">
            Outputs : <span className="text-[rgb(var(--tc-c-rgb))]">interview_url</span> = prêt quand vous l'êtes 👇
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={HIRE_MAILTO}
              className="inline-flex items-center gap-1.5 rounded border border-[rgb(var(--tc-d-rgb)/0.4)] bg-[rgb(var(--tc-d-rgb)/0.1)] px-3 py-1.5 text-sky-100 transition hover:bg-[rgb(var(--tc-d-rgb)/0.2)]"
            >
              <Icon icon="lucide:mail" className="text-[14px]" /> Ouvrir l'email
            </a>
            <a
              href="https://www.linkedin.com/in/nadjide-omar-b55a01212/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-[rgb(var(--tc-d-rgb)/0.4)] bg-[rgb(var(--tc-d-rgb)/0.1)] px-3 py-1.5 text-sky-100 transition hover:bg-[rgb(var(--tc-d-rgb)/0.2)]"
            >
              <Icon icon="lucide:linkedin" className="text-[14px]" /> LinkedIn
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ── easter eggs ── */
function MatrixBlock() {
  const chars = "アカサタナハマヤラワ0123456789";
  const rows = Array.from({ length: 5 }, () =>
    Array.from({ length: 46 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  );
  return (
    <div className="font-mono text-[11px] leading-4 text-[rgb(var(--tc-a-rgb)/0.8)]">
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
      <p className="mt-1 flex items-center gap-1.5 text-[rgb(var(--tc-c-rgb))]">
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

const CAT_ART = String.raw`
   /\_/\
  ( o.o )
   > ^ <`;

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
      className="ml-2 inline-flex items-center gap-1 rounded border border-[rgb(var(--tc-d-rgb)/0.3)] bg-[rgb(var(--tc-d-rgb)/0.05)] px-1.5 py-0.5 text-[11px] text-[rgb(var(--tc-b-rgb))] transition hover:bg-[rgb(var(--tc-d-rgb)/0.15)]"
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
      <span className="text-[rgb(var(--tc-a-rgb))]">visitor</span>
      <span className="text-stone-500">@</span>
      <span className="text-[rgb(var(--tc-b-rgb))]">nadjide</span>
      <span className="text-stone-500">:</span>
      <span className="text-[rgb(var(--tc-c-rgb))]">~</span>
      <span className="text-stone-500">{small ? " $" : "$"} </span>
    </span>
  );
}

/* ─────────────────────────── main component ─────────────────────────── */

export default function Terminal({
  theme = "cyan",
  onThemeChange,
}: {
  theme?: TermTheme;
  onThemeChange?: (t: TermTheme) => void;
} = {}) {
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
        className="rounded border border-[rgb(var(--tc-d-rgb)/0.3)] bg-[rgb(var(--tc-d-rgb)/0.05)] px-2 py-0.5 text-left font-mono text-[13px] text-[rgb(var(--tc-b-rgb))] transition hover:border-[rgb(var(--tc-a-rgb)/0.6)] hover:bg-[rgb(var(--tc-d-rgb)/0.15)] hover:text-sky-100"
      >
        {children}
      </button>
    ),
    [run]
  );

  /* ───────────────────── content builders (outputs) ───────────────────── */

  const helpOutput = () => {
    const sections: [string, [string, string][]][] = [
      [
        "profil",
        [
          ["about", "qui suis-je"],
          ["projects", "mes projets"],
          ["open <projet>", "lancer une démo"],
          ["skills", "stack technique"],
          ["experience", "expériences pro"],
          ["education", "formation"],
          ["contact", "me joindre"],
          ["cv", "CV sur demande"],
        ],
      ],
      [
        "ops",
        [
          ["ci", "pipeline CI/CD"],
          ["deploy", "mise en prod"],
          ["docker ps", "conteneurs"],
          ["kubectl get pods", "pods k8s"],
          ["git log", "parcours en commits"],
          ["top", "processus"],
          ["ping", "latence"],
          ["neofetch", "infos système"],
          ["hire-me", "on se rencontre ?"],
        ],
      ],
      [
        "système",
        [
          ["theme", "changer de couleurs"],
          ["history", "historique"],
          ["clear", "vider l'écran"],
          ["help", "cette aide"],
        ],
      ],
    ];
    return (
      <div className="space-y-3">
        {sections.map(([title, cmds]) => (
          <div key={title}>
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-stone-600">
              ── {title} ──
            </p>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {cmds.map(([c, desc]) => (
                <div key={c} className="flex items-center gap-2">
                  <Cmd run={c.startsWith("open") ? "projects" : c}>{c}</Cmd>
                  <span className="hidden text-xs text-stone-500 sm:inline">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="pt-1 text-xs text-stone-600">
          Astuce : <span className="text-stone-400">Tab</span> ou{" "}
          <span className="text-stone-400">→</span> accepte la suggestion grisée,{" "}
          <span className="text-stone-400">↑ / ↓</span> rappelle l'historique. Quelques
          commandes cachées traînent aussi.{" "}
          <Icon icon="lucide:eye" className="inline-block align-text-bottom text-[14px]" />
        </p>
      </div>
    );
  };

  const aboutOutput = () => (
    <div className="space-y-3">
      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-5 text-[rgb(var(--tc-b-rgb)/0.9)]">{`Nadjide Omar — Ingénieur DevOps / Développeur Full Stack`}</pre>
      <div className="grid gap-1 font-mono text-[13px] sm:grid-cols-2">
        {[
          ["lucide:map-pin", "Localisation", "Nice (06)"],
          ["lucide:graduation-cap", "Formation", "Mastère Expert Dév. Logiciel (Bac+5)"],
          ["lucide:briefcase", "Expérience", "Alternance CTA · 2021 → 2026"],
          ["lucide:globe", "Langues", "Français natif · Anglais C1"],
        ].map(([icon, k, v]) => (
          <p key={k} className="flex items-center gap-1.5">
            <Icon icon={icon} className="shrink-0 text-[rgb(var(--tc-a-rgb))] text-[14px]" />
            <span className="text-[rgb(var(--tc-a-rgb))]">{k}: </span>
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
        {projectsData.length} projets — <span className="text-[rgb(var(--tc-b-rgb))]">open &lt;nom&gt;</span> ou clique :
      </p>
      <div className="space-y-1.5 font-mono text-[13px]">
        {projectsData.map((p) => (
          <div key={p.id} className="flex items-baseline gap-3">
            <button
              type="button"
              onClick={() => run(`open ${projectKey(p.title)}`)}
              className="group flex min-w-0 items-baseline gap-2 text-left"
            >
              <span className="text-[rgb(var(--tc-d-rgb)/0.6)]">drwxr-xr-x</span>
              <span className="font-bold text-[rgb(var(--tc-c-rgb))] underline-offset-4 group-hover:underline">
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
            <p className="font-mono text-xs uppercase tracking-wider text-[rgb(var(--tc-a-rgb))]">
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
        <p className="font-mono text-xs uppercase tracking-wider text-[rgb(var(--tc-a-rgb))]">
          # Expérience
        </p>
        {experiences.map((e) => (
          <div key={e.id} className="mt-2 border-l border-[rgb(var(--tc-d-rgb)/0.3)] pl-4">
            <p className="font-bold text-white">
              {e.title} <span className="text-stone-500">@ {e.company}</span>
            </p>
            <p className="font-mono text-xs text-stone-500">{e.location} · {e.date}</p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-400">{e.description}</p>
            <ul className="mt-2 space-y-0.5">
              {e.achievements.slice(0, 4).map((a, i) => (
                <li key={i} className="text-sm text-stone-300">
                  <span className="text-[rgb(var(--tc-d-rgb))]">▸ </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-stone-500">
        → <Cmd run="education">education</Cmd> pour la formation, ou{" "}
        <Cmd run="git log">git log</Cmd> pour la version condensée.
      </p>
    </div>
  );

  const educationOutput = () => (
    <div className="space-y-1">
      <p className="font-mono text-xs uppercase tracking-wider text-[rgb(var(--tc-a-rgb))]"># Formation</p>
      <div className="mt-2 space-y-3">
        {[...formations].reverse().map((f) => (
          <div key={f.id} className="border-l border-[rgb(var(--tc-d-rgb)/0.3)] pl-4">
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
            <span className="inline-block w-24 text-[rgb(var(--tc-a-rgb))]">{label}</span>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-[rgb(var(--tc-b-rgb))] underline-offset-2 hover:underline"
            >
              {value}
            </a>
            {label === "Email" ? <CopyEmail email={value} /> : null}
          </p>
        ))}
        <p className="pt-1">
          <span className="inline-block w-24 text-[rgb(var(--tc-a-rgb))]">CV</span>
          <button
            type="button"
            onClick={() => run("cv")}
            className="text-[rgb(var(--tc-c-rgb))] underline-offset-2 hover:underline"
          >
            sur demande →
          </button>
        </p>
      </div>
    );
  };

  const neofetchOutput = () => (
    <div className="flex flex-col gap-4 font-mono text-[12px] sm:flex-row sm:gap-6">
      <pre className="text-[rgb(var(--tc-a-rgb))]">{String.raw`
   _   _  ___
  | \ | |/ _ \   nadjide@portfolio
  |  \| | | | |  ----------------
  | |\  | |_| |  OS: PortfolioOS x86_64
  |_| \_|\___/   Shell: nadjide-sh 2.0
                 Stack: Next.js · TS · Docker
`}</pre>
      <div className="space-y-0.5 text-stone-300">
        <p><span className="text-[rgb(var(--tc-a-rgb))]">role</span>: DevOps / Full Stack</p>
        <p><span className="text-[rgb(var(--tc-a-rgb))]">projects</span>: {projectsData.length}</p>
        <p><span className="text-[rgb(var(--tc-a-rgb))]">uptime</span>: dev depuis 2021</p>
        <p><span className="text-[rgb(var(--tc-a-rgb))]">location</span>: Nice, FR</p>
        <p><span className="text-[rgb(var(--tc-a-rgb))]">langs</span>: FR · EN (C1)</p>
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
        pushLine(aboutOutput());
        break;
      case "whoami":
        pushLine(
          <p className="font-mono text-stone-300">
            visitor — et moi c'est <span className="font-bold text-white">Nadjide</span>.{" "}
            Tape <Cmd run="about">about</Cmd> pour faire connaissance.
          </p>
        );
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
            <p className="font-mono text-[rgb(var(--tc-b-rgb))]">
              → launching <span className="text-[rgb(var(--tc-c-rgb))]">{found.title}</span>...
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
      case "deploy":
        if (arg.includes("rollback")) {
          pushLine(
            <p className="flex items-center gap-1.5 font-mono text-yellow-400">
              <Icon icon="lucide:undo-2" className="text-[14px]" />
              rollback v-1 effectué. On fait comme si de rien n'était.
            </p>
          );
        } else {
          pushLine(<DeploySequence />);
        }
        break;
      case "docker":
        if (!arg || arg.startsWith("ps")) {
          pushLine(<DockerPsBlock />);
        } else {
          pushLine(
            <p className="text-yellow-400">
              docker: ici, seule « docker ps » est câblée. L'infra réelle, on en parle en entretien.
            </p>
          );
        }
        break;
      case "kubectl":
      case "k":
        pushLine(<KubectlBlock />);
        break;
      case "git":
        if (arg.startsWith("log")) {
          pushLine(<GitLogBlock />);
        } else if (arg.startsWith("push")) {
          pushLine(
            <p className="font-mono text-stone-300">
              Everything up-to-date — tout est déjà en prod.
            </p>
          );
        } else {
          pushLine(
            <p className="text-yellow-400">
              git: essaie <Cmd run="git log">git log</Cmd> — mon parcours en commits.
            </p>
          );
        }
        break;
      case "top":
      case "htop":
        pushLine(<TopBlock />);
        break;
      case "ping":
        pushLine(<PingBlock host={arg || "nadjide.dev"} />);
        break;
      case "uptime":
        pushLine(
          <p className="font-mono text-[13px] text-stone-300">
            {new Date().toLocaleTimeString("fr-FR")} up {new Date().getFullYear() - 2021} years
            (dev depuis 2021), 1 user, load average:{" "}
            <span className="text-[rgb(var(--tc-b-rgb))]">café 0.92</span>,{" "}
            <span className="text-[rgb(var(--tc-b-rgb))]">projets 0.80</span>,{" "}
            <span className="text-[rgb(var(--tc-b-rgb))]">veille 0.61</span>
          </p>
        );
        break;
      case "ssh":
        pushLine(
          <div className="space-y-0.5 font-mono text-[13px]">
            <p className="text-stone-400">ssh visitor@prod.nadjide.dev</p>
            <p className="text-red-400">visitor@prod: Permission denied (publickey).</p>
            <p className="text-stone-500">
              → l'accès prod se mérite : recrutez-moi et on en reparle.{" "}
              <Cmd run="contact">contact</Cmd>
            </p>
          </div>
        );
        break;
      case "cat":
        pushLine(
          arg ? (
            <p className="text-yellow-400">
              cat: {arg}: No such file — ici tout passe par des commandes. Tape{" "}
              <Cmd run="help">help</Cmd>.
            </p>
          ) : (
            <div>
              <pre className="font-mono text-[12px] leading-4 text-[rgb(var(--tc-b-rgb))]">{CAT_ART}</pre>
              <p className="mt-1 font-mono text-stone-400">meow.</p>
            </div>
          )
        );
        break;
      case "pwd":
        pushLine(<p className="font-mono text-stone-300">/home/visitor/portfolio</p>);
        break;
      case "contact":
      case "links":
      case "social":
        pushLine(contactOutput());
        break;
      case "neofetch":
        pushLine(neofetchOutput());
        break;
      case "hire-me":
      case "hireme":
      case "hire":
        pushLine(<HireSequence />);
        break;
      case "theme": {
        const t = arg.trim() as TermTheme;
        const valid = TERM_THEMES.some((x) => x.id === t);
        if (valid && onThemeChange) {
          onThemeChange(t);
          pushLine(
            <p className="font-mono text-stone-300">
              thème → <span className="text-[rgb(var(--tc-b-rgb))]">{t}</span>
            </p>
          );
        } else {
          pushLine(
            <div className="space-y-1.5 font-mono text-[13px]">
              <p className="text-stone-400">
                Thème courant : <span className="text-[rgb(var(--tc-b-rgb))]">{theme}</span>. Choisis :
              </p>
              <div className="flex flex-wrap gap-2">
                {TERM_THEMES.map((x) => (
                  <Cmd key={x.id} run={`theme ${x.id}`}>
                    {x.id} · {x.label}
                  </Cmd>
                ))}
              </div>
            </div>
          );
        }
        break;
      }
      case "cv":
      case "resume": {
        pushLine(
          <div className="font-mono text-[rgb(var(--tc-b-rgb)/0.9)] space-y-1">
            <p>Mon CV n'est pas en téléchargement direct.</p>
            <p>
              Écris-moi et je te l'envoie :{" "}
              <a
                href="mailto:nadjide.omar@outlook.fr?subject=Demande%20de%20CV%20%E2%80%94%20Nadjide%20Omar"
                className="text-[rgb(var(--tc-b-rgb))] underline"
              >
                email
              </a>
              {" · "}
              <a
                href="https://www.linkedin.com/in/nadjide-omar-b55a01212/"
                target="_blank"
                rel="noreferrer"
                className="text-[rgb(var(--tc-b-rgb))] underline"
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
                    className="text-[rgb(var(--tc-b-rgb))] underline-offset-2 hover:underline"
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
            <pre className="font-mono text-[11px] leading-3 text-[rgb(var(--tc-b-rgb))]">{COFFEE_ART}</pre>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[rgb(var(--tc-c-rgb))]">
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

  const acceptCompletion = () => {
    const c = getCompletion(input);
    if (c) setInput(c === "open" ? c + " " : c);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      acceptCompletion();
    } else if (e.key === "ArrowRight") {
      const el = e.currentTarget;
      if (el.selectionStart === input.length && el.selectionEnd === input.length) {
        if (getCompletion(input)) {
          e.preventDefault();
          acceptCompletion();
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

  const quickCmds = ["help", "projects", "about", "skills", "git log", "docker ps", "hire-me", "contact"];

  const completion = getCompletion(input);
  const ghost = completion && completion.startsWith(input.toLowerCase())
    ? completion.slice(input.length)
    : "";

  /* ───────────────────────── render ───────────────────────── */

  return (
    <div className="flex h-full min-h-0 flex-col text-[#cccccc]">
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
                className="relative w-full border-none bg-transparent p-0 font-mono text-stone-100 caret-[rgb(var(--tc-c-rgb))] outline-none placeholder:text-stone-600"
                placeholder={ghost ? "" : "tape « help » puis Entrée…"}
              />
            </div>
          </div>
        </div>

        {/* mobile quick commands */}
        {isMobile ? (
          <div className="shrink-0 border-t border-[rgb(var(--tc-d-rgb)/0.2)] bg-[#0c1119] px-3 py-2">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickCmds.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => run(c)}
                  className="shrink-0 rounded-full border border-[rgb(var(--tc-d-rgb)/0.3)] bg-[rgb(var(--tc-d-rgb)/0.05)] px-3 py-1.5 font-mono text-xs text-[rgb(var(--tc-b-rgb))] active:bg-[rgb(var(--tc-d-rgb)/0.2)]"
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
}
