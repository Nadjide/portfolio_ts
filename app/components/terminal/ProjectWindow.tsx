"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import NextImage from "next/image";
import BuildConsole from "../BuildConsole";
import type { ProjectData } from "../../projectsData";

function ProjectMedia({ project }: { project: ProjectData }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => undefined);
  }, []);

  if (project.videoSrc) {
    return (
      <video
        ref={videoRef}
        src={project.videoSrc}
        poster={project.imageSrc}
        muted
        loop
        playsInline
        autoPlay
        controls
        className="h-full w-full bg-black object-contain"
      />
    );
  }

  if (project.imageSrc) {
    const isLogo = project.imageSrc.endsWith(".png") || project.imageSrc.endsWith(".svg");
    return (
      <div className="relative h-full w-full bg-[radial-gradient(circle_at_50%_30%,rgba(125,211,252,0.14),transparent_60%)]">
        <NextImage
          src={project.imageSrc}
          alt={project.title}
          fill
          unoptimized={project.imageSrc.endsWith(".svg")}
          className={isLogo ? "object-contain p-8" : "object-cover"}
        />
      </div>
    );
  }

  return (
    <div className="grid h-full w-full place-items-center bg-black/40 font-mono text-sm text-sky-400/60">
      [ no preview available ]
    </div>
  );
}

export default function ProjectWindow({
  project,
  isMobile,
  onClose,
}: {
  project: ProjectData;
  isMobile: boolean;
  onClose: () => void;
}) {
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-0 backdrop-blur-sm sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: isMobile ? 1 : 0.92, y: isMobile ? 24 : 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: isMobile ? 1 : 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full flex-col overflow-hidden border border-sky-500/30 bg-[#0a0e15] shadow-[0_0_24px_rgba(56,189,248,0.07)] sm:h-[88vh] sm:max-w-5xl sm:rounded-xl"
      >
        {/* Window chrome */}
        <div className="flex shrink-0 items-center gap-2 border-b border-sky-500/20 bg-[#0c1119] px-4 py-2.5">
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-red-500/80 transition hover:bg-red-400"
          >
            <span className="text-[8px] font-black leading-none text-red-900/0 group-hover:text-red-900">
              ×
            </span>
          </button>
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-sky-500/70" />
          <span className="ml-3 truncate font-mono text-xs text-sky-300/70">
            ~/projects/{project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} — {project.videoSrc ? "demo.mp4" : "preview"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded border border-sky-500/25 px-2 py-0.5 font-mono text-[11px] text-sky-300/70 transition hover:bg-sky-500/10 hover:text-sky-200"
          >
            esc
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-hidden">
          {!built ? (
            <BuildConsole projectTitle={project.title} onComplete={() => setBuilt(true)} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="terminal-scroll h-full overflow-y-auto"
            >
              {/* Media */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-sky-500/15 bg-black">
                <ProjectMedia project={project} />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,15,12,0.9),transparent_55%)]" />
                <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sky-400/80">
                    {project.context ?? "projet"} · {project.year ?? "—"}
                  </p>
                  <h2 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-5xl">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-8 p-5 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-sky-500/25 bg-sky-500/5 px-2.5 py-1 font-mono text-[11px] text-sky-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-400/60">
                      role
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-200">
                      {project.role ?? "Développement full-stack"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-400/60">
                      contexte
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-200">
                      {project.context ?? "Projet"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-400/60">
                      links
                    </p>
                    <div className="mt-2 flex flex-col gap-1.5">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-sm text-sky-300 underline-offset-2 hover:underline"
                        >
                          <Icon icon="lucide:github" className="text-[15px]" /> GitHub
                        </a>
                      ) : null}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-sm text-cyan-300 underline-offset-2 hover:underline"
                        >
                          <Icon icon="lucide:external-link" className="text-[15px]" /> Live demo
                        </a>
                      ) : null}
                      {!project.githubUrl && !project.liveUrl ? (
                        <span className="font-mono text-sm text-stone-500">privé</span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {project.description.map((para, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="select-none font-mono text-sm text-sky-500/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[15px] leading-7 text-stone-300">{para}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-lg border border-sky-500/25 py-3 font-mono text-sm text-sky-300 transition hover:bg-sky-500/10 sm:w-auto sm:px-6"
                >
                  $ exit
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
