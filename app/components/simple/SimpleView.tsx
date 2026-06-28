"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Icon } from "@iconify/react";
import { profile } from "../../profileData";
import { skillGroups, experiences, formations } from "../../portfolioContent";
import { projectsData, type ProjectData } from "../../projectsData";
import { contactLinks } from "../../contactData";

/* ─────────────────────────── données d'affichage ─────────────────────────── */

const TECH = [
  { icon: "logos:nextjs-icon", label: "Next.js" },
  { icon: "logos:react", label: "React" },
  { icon: "logos:typescript-icon", label: "TypeScript" },
  { icon: "logos:tailwindcss-icon", label: "Tailwind" },
  { icon: "logos:nodejs-icon", label: "Node.js" },
  { icon: "logos:fastapi-icon", label: "FastAPI" },
  { icon: "logos:python", label: "Python" },
  { icon: "logos:docker-icon", label: "Docker" },
  { icon: "logos:github-actions", label: "GitHub Actions" },
  { icon: "logos:terraform-icon", label: "Terraform" },
  { icon: "logos:ansible", label: "Ansible" },
  { icon: "logos:aws", label: "AWS" },
  { icon: "logos:nginx", label: "Nginx" },
  { icon: "logos:postgresql", label: "PostgreSQL" },
  { icon: "logos:mongodb-icon", label: "MongoDB" },
  { icon: "logos:redis", label: "Redis" },
  { icon: "logos:prisma", label: "Prisma" },
  { icon: "logos:framer", label: "Framer Motion" },
];

const CATEGORY_ICON: Record<string, string> = {
  "Frontend Modern & UI": "lucide:layout-panel-top",
  "Backend & API": "lucide:server",
  "Data Science & IA": "lucide:brain-circuit",
  "DevOps & Cloud": "lucide:cloud-cog",
  "Base de Données": "lucide:database",
  "Mobile & Cross-Platform": "lucide:smartphone",
};

function contactIcon(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("mail") || l.includes("email")) return "lucide:mail";
  if (l.includes("git")) return "lucide:github";
  if (l.includes("linkedin")) return "lucide:linkedin";
  if (l.includes("tél") || l.includes("tel") || l.includes("phone")) return "lucide:phone";
  return "lucide:link";
}

/* Logos de marque pour chaque techno (vue compétences). */
const SKILL_ICON: Record<string, string> = {
  "Next.js": "logos:nextjs-icon",
  "React.js": "logos:react",
  "React Native": "logos:react",
  TypeScript: "logos:typescript-icon",
  "Tailwind CSS": "logos:tailwindcss-icon",
  "Framer Motion": "logos:framer",
  "Material UI": "logos:material-ui",
  "Node.js": "logos:nodejs-icon",
  FastAPI: "logos:fastapi-icon",
  Python: "logos:python",
  Prisma: "logos:prisma",
  Express: "logos:express",
  "REST/GraphQL": "logos:graphql",
  Polars: "simple-icons:polars",
  Pandas: "logos:pandas-icon",
  DuckDB: "simple-icons:duckdb",
  "Ollama (Local LLM)": "simple-icons:ollama",
  "Mistral AI": "logos:mistral-ai-icon",
  PowerBI: "logos:microsoft-power-bi",
  Docker: "logos:docker-icon",
  Terraform: "logos:terraform-icon",
  Ansible: "logos:ansible",
  "GitHub Actions": "logos:github-actions",
  AWS: "logos:aws",
  Nginx: "logos:nginx",
  PostgreSQL: "logos:postgresql",
  MySQL: "logos:mysql",
  MariaDB: "logos:mariadb-icon",
  MongoDB: "logos:mongodb-icon",
  SQLite: "logos:sqlite",
  Redis: "logos:redis",
  Expo: "logos:expo-icon",
  Android: "logos:android-icon",
  iOS: "simple-icons:apple",
  PWA: "logos:pwa",
};

/* Logo d'entreprise / école (déposer les fichiers dans /public/images/). */
function companyLogo(company: string): string | null {
  const c = company.toLowerCase();
  if (c.includes("call to action") || c.includes("cta")) return "/images/cta-logo.png";
  if (c.includes("ynov")) return "/images/ynov.jpg";
  return null;
}

function initials(name: string): string {
  return name
    .replace(/[()]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/* Pastille logo entreprise — fond blanc (les logos noirs/sombres restent lisibles),
   repli sur les initiales si le fichier image est absent. */
function CompanyLogo({ company, size = 44 }: { company: string; size?: number }) {
  const src = companyLogo(company);
  const [err, setErr] = useState(false);

  if (!src || err) {
    return (
      <span
        style={{ height: size, width: size }}
        className="grid shrink-0 place-items-center rounded-xl bg-sky-500/10 text-sm font-bold text-sky-300 ring-1 ring-sky-400/20"
      >
        {initials(company)}
      </span>
    );
  }
  return (
    <span
      style={{ height: size, width: size }}
      className="grid shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-white/10"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={company}
        onError={() => setErr(true)}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

/* ───────────────────────── helpers d'animation / UI ───────────────────────── */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Carte « spotlight » : un halo suit le curseur (façon 21st.dev / skiper-ui). */
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos(null)}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: pos
            ? `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(56,189,248,0.14), transparent 65%)`
            : undefined,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function Marquee() {
  const row = (
    <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
      {TECH.map((t) => (
        <span key={t.label} className="flex items-center gap-2.5 text-stone-300">
          <Icon icon={t.icon} className="text-2xl" />
          <span className="text-sm font-medium">{t.label}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee-mask flex w-full overflow-hidden">
      {row}
      <div aria-hidden>{row}</div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-sky-300">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-stone-400">{subtitle}</p> : null}
    </Reveal>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 ${className}`}
    >
      {children}
    </section>
  );
}

/* ─────────────────────────── carte projet ─────────────────────────── */

function ProjectCard({ project, onOpen }: { project: ProjectData; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos(null)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] text-left transition-colors hover:border-sky-400/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: pos
            ? `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(56,189,248,0.12), transparent 65%)`
            : undefined,
        }}
      />
      <div className="relative aspect-video w-full overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.18),transparent_60%)]">
        {project.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageSrc}
            alt={project.title}
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
              project.imageSrc.endsWith(".png") ? "object-contain p-8" : "object-cover"
            }`}
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <span className="font-mono text-4xl font-black text-sky-300/40">
              {project.title.slice(0, 2)}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c111b] via-transparent to-transparent opacity-60" />
        {project.videoSrc ? (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-sky-200 backdrop-blur">
            <Icon icon="lucide:play" className="text-[12px]" /> démo
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-sky-300">
            {project.title}
          </h3>
          <span className="shrink-0 text-xs text-stone-500">{project.year}</span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-wide text-sky-400/70">{project.context}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-400">
          {project.description[0]}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[11px] text-stone-300"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-400">
          En savoir plus
          <Icon
            icon="lucide:arrow-right"
            className="text-[15px] transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────── modale projet ─────────────────────────── */

function ProjectModal({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState(440);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // Restaure la valeur précédente (« auto » en vue recruteur) à la fermeture,
    // sinon le scroll de la page reste bloqué.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const calc = () => setMaxH(Math.min(Math.round(window.innerHeight * 0.5), 520));
    calc();
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", calc);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Header vidéo « collapsible » : une seule transition CSS (fluide, sans recalcul
  // à chaque frame) déclenchée au franchissement d'un seuil de scroll, avec hystérésis.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = el.scrollTop;
      setCollapsed((c) => (c ? y > 24 : y > 72));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-0 backdrop-blur-sm sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden bg-[#0c111b] shadow-2xl sm:max-h-[88vh] sm:rounded-2xl sm:border sm:border-white/10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
        >
          <Icon icon="lucide:x" className="text-[18px]" />
        </button>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          <div
            style={{ height: collapsed ? 160 : maxH }}
            className="sticky top-0 z-10 flex w-full items-center justify-center overflow-hidden border-b border-white/10 bg-black transition-[height] duration-300 ease-out"
          >
            {project.videoSrc ? (
              <video
                src={project.videoSrc}
                poster={project.imageSrc}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-auto max-w-full object-contain"
              />
            ) : project.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageSrc}
                alt={project.title}
                className="h-full w-auto max-w-full object-contain"
              />
            ) : (
              <span className="text-sky-300/40">Aperçu indisponible</span>
            )}
          </div>
          <div className="space-y-5 p-6 sm:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400/70">
              {project.context} · {project.year}
            </p>
            <h3 className="mt-1 text-2xl font-black text-white">{project.title}</h3>
            {project.role ? <p className="mt-2 text-sm text-stone-400">{project.role}</p> : null}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-sky-500/25 bg-sky-500/5 px-2.5 py-1 text-[11px] text-sky-200"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="space-y-3">
            {project.description.map((para, i) => (
              <p key={i} className="text-[15px] leading-7 text-stone-300">
                {para}
              </p>
            ))}
          </div>
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  <Icon icon="lucide:github" className="text-[16px]" /> Code source
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
                >
                  <Icon icon="lucide:external-link" className="text-[16px]" /> Voir en ligne
                </a>
              ) : null}
            </div>
          )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── vue principale ─────────────────────────── */

const NAV = [
  ["about", "À propos"],
  ["skills", "Compétences"],
  ["experience", "Expériences"],
  ["projects", "Projets"],
  ["education", "Formation"],
  ["contact", "Contact"],
];

export default function SimpleView({ onSwitchView }: { onSwitchView: () => void }) {
  const [openProject, setOpenProject] = useState<ProjectData | null>(null);
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-[100dvh] bg-[#070b12] text-stone-200">
      {/* barre de progression de scroll */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400"
      />

      {/* nav flottante (glass) */}
      <header className="sticky top-0 z-50 px-4 pt-4">
        <div className="mx-auto flex max-w-4xl items-center gap-2 rounded-full border border-white/10 bg-black/40 p-1.5 pl-4 shadow-lg shadow-black/20 backdrop-blur-xl">
          <span className="font-bold text-white">Nadjide Omar</span>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-3 py-1.5 text-sm text-stone-400 transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={onSwitchView}
            className="ml-auto flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-stone-300 transition hover:border-sky-400/50 hover:text-white md:ml-0"
          >
            <Icon icon="lucide:code-xml" className="text-[15px] text-sky-400" /> Vue dev
          </button>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        {/* aurora + grille */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_55%_at_50%_25%,#000,transparent)]" />
          <div className="animate-aurora absolute -left-32 -top-20 h-[36rem] w-[36rem] rounded-full bg-sky-500/20 blur-[110px]" />
          <div
            className="animate-aurora absolute -right-24 top-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-[110px]"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="animate-aurora absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/10 blur-[110px]"
            style={{ animationDelay: "-12s" }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              <span className="animate-sheen bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
            <p className="mt-4 bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-xl font-semibold text-transparent sm:text-3xl">
              {profile.title}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">{profile.tagline}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={profile.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 font-medium text-white shadow-lg shadow-sky-500/25 transition hover:shadow-sky-500/40"
              >
                <Icon icon="lucide:download" className="text-[18px]" /> Télécharger mon CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white/10"
              >
                <Icon icon="lucide:mail" className="text-[18px]" /> Me contacter
              </a>
            </div>

            {/* stats */}
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { v: "FR · EN", l: "langues (C1)" },
                {
                  v: (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon icon="lucide:map-pin" className="text-xl text-sky-400" />
                      Nice
                    </span>
                  ),
                  l: profile.location,
                },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-black text-white">{s.v}</p>
                  <p className="text-xs uppercase tracking-wide text-stone-500">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* marquee techno */}
      <div className="border-y border-white/5 bg-white/[0.015] py-7">
        <Marquee />
      </div>

      {/* à propos — bento */}
      <Section id="about">
        <SectionHeader eyebrow="À propos" title="Qui suis-je" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <SpotlightCard className="p-7 lg:col-span-2 lg:row-span-2">
            <div className="flex h-full flex-col">
              <div className="space-y-4">
                {profile.about.map((p, i) => (
                  <p key={i} className="text-[15px] leading-7 text-stone-300">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-auto pt-6 font-mono text-sm text-sky-300/80">— {profile.name}</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="flex flex-col justify-center p-6">
            <p className="bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-4xl font-black text-transparent">
              ~10×
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              de gain de temps sur des process métiers critiques que j&apos;ai automatisés.
            </p>
          </SpotlightCard>

          {profile.highlights.map((h) => (
            <SpotlightCard key={h.title} className="p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-400/20">
                <Icon icon={h.icon} className="text-xl text-sky-300" />
              </span>
              <p className="mt-3 font-semibold text-white">{h.title}</p>
              <p className="mt-1 text-sm leading-6 text-stone-400">{h.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </Section>

      {/* compétences */}
      <Section id="skills">
        <SectionHeader
          eyebrow="Stack"
          title="Compétences"
          subtitle="Les technologies que j'utilise au quotidien, du front à l'infrastructure."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.category} delay={(i % 3) * 0.06}>
              <SpotlightCard className="h-full">
                <div className={`h-1 w-full bg-gradient-to-r ${g.gradient}`} />
                <div className="p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                      <Icon
                        icon={CATEGORY_ICON[g.category] ?? "lucide:code"}
                        className="text-lg text-sky-300"
                      />
                    </span>
                    <p className="font-semibold text-white">{g.category}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] py-1 pl-1 pr-2.5 text-xs text-stone-200"
                      >
                        <span className="inline-flex h-5 items-center justify-center overflow-hidden rounded bg-white px-1">
                          <Icon
                            icon={SKILL_ICON[it] ?? "lucide:code"}
                            className="h-[14px] w-auto text-stone-800"
                          />
                        </span>
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* expériences */}
      <Section id="experience">
        <SectionHeader eyebrow="Parcours" title="Expériences" subtitle="Mon parcours professionnel." />
        <div className="relative mt-10 pl-6">
          <div className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-sky-400/60 via-white/10 to-transparent" />
          <div className="space-y-6">
            {experiences.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.06}>
                <span className="absolute -left-[6px] mt-2 h-3 w-3 rounded-full bg-sky-400 ring-4 ring-sky-400/15" />
                <SpotlightCard className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <CompanyLogo company={e.company} />
                      <div>
                        <h3 className="text-xl font-bold text-white">{e.title}</h3>
                        <p className="mt-0.5 text-sm text-stone-400">{e.company}</p>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-stone-500">
                          <Icon icon="lucide:map-pin" className="text-[13px] text-sky-400/70" />
                          {e.location}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 font-mono text-xs text-sky-300">
                      {e.date}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-7 text-stone-300">{e.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {e.achievements.map((a, k) => (
                      <li key={k} className="flex gap-2 text-sm leading-6 text-stone-300">
                        <Icon
                          icon="lucide:circle-check"
                          className="mt-0.5 shrink-0 text-sky-400"
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {e.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[11px] text-stone-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* projets */}
      <Section id="projects">
        <SectionHeader
          eyebrow="Réalisations"
          title="Projets"
          subtitle="Quelques réalisations — clique pour les détails."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <ProjectCard project={p} onOpen={() => setOpenProject(p)} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* formation */}
      <Section id="education">
        <SectionHeader eyebrow="Cursus" title="Formation" />
        <div className="relative mt-10 space-y-6 pl-6">
          <div className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-sky-400/50 via-white/10 to-transparent" />
          {[...formations].reverse().map((f, i) => (
            <Reveal key={f.id} delay={i * 0.06}>
              <span className="absolute -left-[6px] mt-1.5 h-3 w-3 rounded-full bg-sky-400 ring-4 ring-sky-400/15" />
              <SpotlightCard className="p-5">
                <div className="flex gap-3">
                  <CompanyLogo company={f.company} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-bold text-white">{f.title}</p>
                      <span className="font-mono text-sm text-stone-500">{f.date}</span>
                    </div>
                    {f.subtitle ? (
                      <p className="mt-0.5 text-sm text-sky-300/80">{f.subtitle}</p>
                    ) : null}
                    <p className="mt-1 text-sm text-stone-400">{f.company}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-stone-500">
                      <Icon icon="lucide:map-pin" className="text-[13px] text-sky-400/70" />
                      {f.location}
                    </p>
                    {f.tech.length ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {f.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[11px] text-stone-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* contact */}
      <Section id="contact">
        <SectionHeader
          eyebrow="Contact"
          title="Travaillons ensemble"
          subtitle="Discutons de votre projet ou d'une opportunité."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
            {contactLinks.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.05}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 transition hover:border-sky-400/40 hover:bg-white/[0.05]"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-400/20">
                    <Icon icon={contactIcon(c.label)} className="text-lg text-sky-300" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wide text-stone-500">
                      {c.label}
                    </span>
                    <span className="block truncate font-medium text-white">{c.value}</span>
                  </span>
                  <Icon
                    icon="lucide:arrow-up-right"
                    className="ml-auto shrink-0 text-stone-600 transition group-hover:text-sky-400"
                  />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-sky-400/20 bg-gradient-to-br from-sky-500/15 to-indigo-500/10 p-6">
              <p className="text-lg font-bold text-white">Mon CV en PDF</p>
              <p className="mt-1 text-sm text-stone-300">Tout mon parcours en un document.</p>
              <a
                href={profile.cvPath}
                download
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-[#070b12] transition hover:bg-stone-200"
              >
                <Icon icon="lucide:download" className="text-[18px]" /> Télécharger
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} {profile.name}
      </footer>

      <AnimatePresence>
        {openProject ? (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
