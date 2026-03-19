"use client";

import React, { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projectsData } from "../projectsData";
import { allSkills, experiences, formations, skillGroups } from "../portfolioContent";
import { useIsCoarsePointer } from "../hooks/useIsCoarsePointer";

type PanelKey = "projects" | "skills" | "experience" | "contact";

type PanelConfig = {
  key: PanelKey;
  label: string;
  targetId: string;
  subtitle: string;
  accent: string;
};

const PANELS: PanelConfig[] = [
  {
    key: "projects",
    label: "Projets",
    targetId: "projects",
    subtitle: "Projets phares",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    key: "experience",
    label: "Expériences",
    targetId: "experience",
    subtitle: "Mon parcours",
    accent: "from-emerald-500 to-cyan-400",
  },
  {
    key: "skills",
    label: "Compétences",
    targetId: "skills",
    subtitle: "Arsenal technologique",
    accent: "from-cyan-500 to-blue-400",
  },
  {
    key: "contact",
    label: "Contact",
    targetId: "contact",
    subtitle: "Liens directs",
    accent: "from-blue-500 to-indigo-400",
  },
];

const FEATURED_PROJECTS = projectsData.filter((project) => project.featured).slice(0, 4);

const SKILL_TILE_ACCENTS = [
  "from-blue-500/30 to-cyan-500/20",
  "from-cyan-500/30 to-blue-500/20",
  "from-emerald-500/30 to-cyan-500/20",
  "from-indigo-500/30 to-blue-500/20",
  "from-purple-500/30 to-indigo-500/20",
  "from-orange-500/30 to-red-500/20",
];

function scrollToSection(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) {
    window.location.hash = targetId;
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function slugifyProjectTitle(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toLowerCase()
    .replace(/ +/g, "-");
}

function SurfaceCard({
  title,
  subtitle,
  borderClassName,
  children,
}: {
  title: string;
  subtitle?: string;
  borderClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border bg-[#071424]/70 p-3 ${borderClassName ?? "border-cyan-400/20"}`}>
      <div className="mb-2">
        <p className="text-sm font-semibold text-gray-100">{title}</p>
        {subtitle ? <p className="text-[11px] text-gray-400">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

function ContactLink({
  href,
  label,
  accent,
  external,
}: {
  href: string;
  label: string;
  accent: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`flex items-center justify-between rounded-xl border bg-[#071424]/70 px-4 py-3 text-sm text-gray-100 transition ${accent}`}
    >
      <span>{label}</span>
      <span className="text-[11px] uppercase tracking-wider">ouvrir</span>
    </a>
  );
}

function PanelBody({ activePanel }: { activePanel: PanelKey }) {
  if (activePanel === "projects") {
    return (
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Projets phares en priorité</p>
        {FEATURED_PROJECTS.map((project) => {
          return (
            <SurfaceCard
              key={project.id}
              title={project.title}
              subtitle={`${project.context ?? "Projet"} • ${project.year ?? "En cours"}`}
            >
              <div className="flex items-center justify-between text-[11px] text-cyan-300">
                <span>{project.role ?? "Développement"}</span>
                <span>{project.technologies.length} technos</span>
              </div>
              <p className="mt-2 line-clamp-2 text-[11px] text-gray-400">{project.description[0]}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={`${project.id}-${tech}`}
                    className="rounded border border-cyan-400/30 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex justify-end">
                <a
                  href={`/${slugifyProjectTitle(project.title)}`}
                  className="rounded-md border border-cyan-300/35 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200 transition hover:border-cyan-200/70 hover:bg-cyan-500/20"
                >
                  Voir le projet
                </a>
              </div>
            </SurfaceCard>
          );
        })}
      </div>
    );
  }

  if (activePanel === "skills") {
    return (
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Compétences</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {allSkills.map((skill, index) => (
            <div
              key={skill}
              className={`aspect-square rounded-lg border border-white/15 bg-gradient-to-br ${SKILL_TILE_ACCENTS[index % SKILL_TILE_ACCENTS.length]} p-2`}
            >
              <div className="flex h-full items-center justify-center text-center">
                <span className="text-[10px] font-medium leading-tight text-gray-100">{skill}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-blue-400/20 bg-[#071424]/70 px-3 py-2 text-[11px] text-gray-400">
          {skillGroups.length} catégories • {allSkills.length} compétences
        </div>
      </div>
    );
  }

  if (activePanel === "experience") {
    return (
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Descriptif du parcours</p>
        {experiences.map((experience) => (
          <SurfaceCard
            key={experience.id}
            title={experience.title}
            subtitle={`${experience.company} • ${experience.date}`}
            borderClassName="border-emerald-400/25"
          >
            <p className="text-[11px] leading-relaxed text-gray-300">{experience.description}</p>
            <ul className="mt-2 space-y-1.5 text-[11px] text-gray-400">
              {experience.achievements.slice(0, 3).map((achievement) => (
                <li key={achievement} className="flex items-start gap-2">
                  <span className="text-emerald-300">▹</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {experience.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-emerald-500/30 bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SurfaceCard>
        ))}

        <SurfaceCard
          title="Formations"
          subtitle="Synthèse académique"
          borderClassName="border-blue-400/20"
        >
          <div className="space-y-1.5 text-[11px] text-gray-400">
            {formations.map((formation) => (
              <div key={formation.id} className="flex items-center justify-between gap-2">
                <span className="line-clamp-1">{formation.title}</span>
                <span className="shrink-0 text-cyan-300">{formation.date}</span>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Communication</p>
      <ContactLink
        href="mailto:nadjide.omar@outlook.fr"
        label="Email direct"
        accent="border-cyan-400/25 hover:border-cyan-300/60"
      />
      <ContactLink
        href="https://github.com/Nadjide"
        label="GitHub"
        accent="border-violet-400/25 hover:border-violet-300/60"
        external
      />
      <ContactLink
        href="https://www.linkedin.com/in/nadjide-omar-b55a01212/"
        label="LinkedIn"
        accent="border-blue-400/25 hover:border-blue-300/60"
        external
      />
    </div>
  );
}

export default function SkillsGrid3D() {
  const shouldReduceMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  const lowMotion = shouldReduceMotion || isCoarsePointer;
  const [activePanel, setActivePanel] = useState<PanelKey>("projects");

  const currentPanel = useMemo(
    () => PANELS.find((panel) => panel.key === activePanel) ?? PANELS[0],
    [activePanel]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (lowMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      event.currentTarget.style.setProperty("--glare-x", `${x}%`);
      event.currentTarget.style.setProperty("--glare-y", `${y}%`);
    },
    [lowMotion]
  );

  const handlePointerLeave = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--glare-x", "50%");
    event.currentTarget.style.setProperty("--glare-y", "50%");
  }, []);

  const handleOpenSection = useCallback((targetId: string) => {
    scrollToSection(targetId);
  }, []);

  return (
    <div className="relative h-full w-full px-1 sm:px-3">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: lowMotion ? 0.2 : 0.55, ease: "easeOut" }}
        className="relative mx-auto h-full w-full max-w-[850px]"
      >
        <motion.div
          className="absolute inset-x-0 bottom-[56px] top-0 rounded-[1.8rem] border border-cyan-200/15 bg-gradient-to-br from-[#0b1530]/95 via-[#050e1f]/95 to-[#030814]/95 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          animate={lowMotion ? undefined : { y: [0, -3, 0] }}
          transition={
            lowMotion
              ? undefined
              : { duration: 5.8, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ "--glare-x": "50%", "--glare-y": "50%" } as React.CSSProperties}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="relative h-full overflow-hidden rounded-[1.2rem] border border-cyan-300/20 bg-[#030a18]">
            <div className="mini-screen-grid absolute inset-0 opacity-60" />
            <div className="mini-screen-scan absolute inset-0 pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--glare-x)_var(--glare-y),rgba(56,189,248,0.22),transparent_40%)]"
            />

            <div className="relative z-10 flex h-full flex-col">
              <header className="flex items-center justify-between border-b border-cyan-300/15 px-4 py-3">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.18em] text-cyan-300/80">Nadjide Omar</p>
                  <p className="text-xs text-gray-400">Portfolio interactif</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-300">
                    en ligne
                  </span>
                </div>
              </header>

              <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[190px_1fr]">
                <aside className="border-b border-cyan-300/10 p-3 md:border-b-0 md:border-r">
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                    {PANELS.map((panel) => {
                      const isActive = panel.key === activePanel;
                      return (
                        <motion.button
                          key={panel.key}
                          type="button"
                          onClick={() => setActivePanel(panel.key)}
                          whileHover={lowMotion ? undefined : { scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative overflow-hidden rounded-xl border px-3 py-2 text-left transition ${
                            isActive
                              ? "border-cyan-300/60 bg-cyan-400/10"
                              : "border-white/10 bg-white/5 hover:border-cyan-300/30"
                          }`}
                          aria-pressed={isActive}
                          aria-label={`Afficher ${panel.label}`}
                        >
                          {isActive ? (
                            <motion.span
                              layoutId="panel-active-slider"
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/18 via-blue-500/12 to-transparent"
                              transition={{ type: "spring", stiffness: 360, damping: 34, mass: 0.45 }}
                            />
                          ) : null}
                          <span className="relative z-10 block">
                            <p className="text-xs font-semibold text-gray-100">{panel.label}</p>
                            <p className="mt-0.5 text-[10px] text-gray-400">{panel.subtitle}</p>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </aside>

                <section className="flex min-h-0 flex-col p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-cyan-300/80">
                        Panneau actif
                      </p>
                      <h3 className="text-sm font-semibold text-white">{currentPanel.label}</h3>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => handleOpenSection(currentPanel.targetId)}
                      whileHover={lowMotion ? undefined : { scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className={`rounded-lg bg-gradient-to-r ${currentPanel.accent} px-3 py-2 text-xs font-semibold text-[#051126] shadow-[0_8px_30px_rgba(56,189,248,0.35)]`}
                      aria-label={`Ouvrir la section ${currentPanel.label}`}
                    >
                      Aller à la section
                    </motion.button>
                  </div>

                  <div className="min-h-0 flex-1 overflow-auto pr-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePanel}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: lowMotion ? 0.12 : 0.26 }}
                      >
                        <PanelBody activePanel={activePanel} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-[26px] left-1/2 h-9 w-[30%] -translate-x-1/2 rounded-t-2xl border border-cyan-200/15 bg-gradient-to-b from-[#0b1730] to-[#060c1c]" />
        <div className="pointer-events-none absolute bottom-[10px] left-1/2 h-4 w-[42%] -translate-x-1/2 rounded-full border border-cyan-200/10 bg-[#030812]" />
        <div className="pointer-events-none absolute inset-x-20 bottom-0 h-5 rounded-full bg-cyan-500/20 blur-xl" />
      </motion.div>
    </div>
  );
}
