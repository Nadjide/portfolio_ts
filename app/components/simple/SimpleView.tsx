"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { profile } from "../../profileData";
import { skillGroups, experiences, formations } from "../../portfolioContent";
import { projectsData, type ProjectData } from "../../projectsData";
import { contactLinks } from "../../contactData";

/* ───────────────────────── helpers d'animation ───────────────────────── */

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
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8">
      <Reveal>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 text-stone-400">{subtitle}</p> : null}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ─────────────────────────── carte projet ─────────────────────────── */

function ProjectCard({ project, onOpen }: { project: ProjectData; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-sky-400/40 hover:bg-white/[0.05]"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.18),transparent_60%)]">
        {project.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageSrc}
            alt={project.title}
            className={`h-full w-full ${
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
        {project.videoSrc ? (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-sky-200 backdrop-blur">
            <Icon icon="lucide:play" className="text-[12px]" /> démo
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-white group-hover:text-sky-300">
            {project.title}
          </h3>
          <span className="shrink-0 text-xs text-stone-500">{project.year}</span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-wide text-sky-400/70">
          {project.context}
        </p>
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
          En savoir plus <Icon icon="lucide:arrow-right" className="text-[15px]" />
        </span>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────── modale projet ─────────────────────────── */

function ProjectModal({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // Restaure la valeur précédente (« auto » en vue recruteur) à la fermeture,
    // sinon le scroll de la page reste bloqué.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl overflow-hidden bg-[#0c111b] shadow-2xl sm:rounded-2xl sm:border sm:border-white/10"
      >
        <div className="relative aspect-video w-full bg-black">
          {project.videoSrc ? (
            <video
              src={project.videoSrc}
              poster={project.imageSrc}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          ) : project.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageSrc}
              alt={project.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-sky-300/40">
              Aperçu indisponible
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
          >
            <Icon icon="lucide:x" className="text-[18px]" />
          </button>
        </div>
        <div className="space-y-5 p-6 sm:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400/70">
              {project.context} · {project.year}
            </p>
            <h3 className="mt-1 text-2xl font-black text-white">{project.title}</h3>
            {project.role ? (
              <p className="mt-2 text-sm text-stone-400">{project.role}</p>
            ) : null}
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

  return (
    <div className="min-h-[100dvh] bg-[#070b12] text-stone-200">
      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b12]/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3 sm:px-8">
          <span className="font-bold text-white">Nadjide Omar</span>
          <nav className="ml-auto hidden items-center gap-5 md:flex">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm text-stone-400 transition hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={onSwitchView}
            className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 font-mono text-xs text-stone-300 transition hover:border-sky-400/50 hover:text-white md:ml-0"
          >
            <Icon icon="lucide:code-xml" className="text-sky-400 text-[15px]" /> Vue développeur
          </button>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_80%_20%,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="relative mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-mono text-sm text-sky-400">Bonjour, je suis</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-3 bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-xl font-semibold text-transparent sm:text-3xl">
              {profile.title}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
              >
                <Icon icon="lucide:download" className="text-[18px]" /> Télécharger mon CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                <Icon icon="lucide:mail" className="text-[18px]" /> Me contacter
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <Icon icon="lucide:map-pin" className="text-sky-400 text-[15px]" /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon icon="lucide:briefcase" className="text-sky-400 text-[15px]" /> {profile.availability}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon icon="lucide:languages" className="text-sky-400 text-[15px]" /> {profile.languages.join(" · ")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* à propos */}
      <Section id="about" title="À propos">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal className="space-y-4">
            {profile.about.map((p, i) => (
              <p key={i} className="text-[15px] leading-7 text-stone-300">
                {p}
              </p>
            ))}
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <Icon icon={h.icon} className="text-2xl text-sky-400" />
                  <p className="mt-2 font-semibold text-white">{h.title}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-400">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* compétences */}
      <Section id="skills" title="Compétences" subtitle="Les technologies que j'utilise au quotidien.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.06}>
              <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div className={`h-1 w-full bg-gradient-to-r ${g.gradient}`} />
                <div className="p-4">
                  <p className="font-semibold text-white">{g.category}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-xs text-stone-300"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* expériences */}
      <Section id="experience" title="Expériences" subtitle="Mon parcours professionnel.">
        <div className="space-y-5">
          {experiences.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.06}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{e.title}</h3>
                  <span className="font-mono text-sm text-sky-400">{e.date}</span>
                </div>
                <p className="text-sm text-stone-400">{e.company}</p>
                <p className="mt-3 text-[15px] leading-7 text-stone-300">{e.description}</p>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {e.achievements.map((a, k) => (
                    <li key={k} className="flex gap-2 text-sm text-stone-300">
                      <Icon icon="lucide:chevron-right" className="mt-0.5 shrink-0 text-sky-400" />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[11px] text-stone-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* projets */}
      <Section id="projects" title="Projets" subtitle="Quelques réalisations — clique pour les détails.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <ProjectCard project={p} onOpen={() => setOpenProject(p)} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* formation */}
      <Section id="education" title="Formation">
        <div className="space-y-4 border-l border-white/10 pl-5">
          {[...formations].reverse().map((f, i) => (
            <Reveal key={f.id} delay={i * 0.06}>
              <div className="relative">
                <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-sky-400" />
                <p className="font-bold text-white">{f.title}</p>
                <p className="font-mono text-sm text-stone-400">
                  {f.company} · {f.date}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* contact */}
      <Section id="contact" title="Contact" subtitle="Discutons de votre projet ou d'une opportunité.">
        <div className="grid gap-3 sm:grid-cols-2">
          {contactLinks.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-sky-400/40 hover:bg-white/[0.05]"
              >
                <span className="text-sm text-stone-400">{c.label}</span>
                <span className="font-medium text-white">{c.value}</span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <a
            href={profile.cvPath}
            download
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
          >
            <Icon icon="lucide:download" className="text-[18px]" /> Télécharger mon CV (PDF)
          </a>
        </Reveal>
      </Section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} {profile.name} · Conçu et développé par mes soins.
      </footer>

      <AnimatePresence>
        {openProject ? (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
