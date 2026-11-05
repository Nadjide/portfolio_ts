"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { profile } from "../../profileData";
import { skillGroups, experiences, formations } from "../../portfolioContent";
import { projectsData, type ProjectData } from "../../projectsData";
import { contactLinks, findLink } from "../../contactData";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import "./showcase.css";

export const projectSlug = (title: string) =>
  title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const EMAIL = findLink("Email")!;
const REQUEST_CV = EMAIL.href + "?subject=" + encodeURIComponent("Demande de CV · Nadjide Omar") + "&body=" + encodeURIComponent("Bonjour Nadjide,\n\nJe souhaiterais recevoir votre CV.\n\n");
const NAV = [["projects", "Projets"], ["about", "Approche"], ["experience", "Parcours"], ["contact", "Contact"]] as const;

function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={"sv-arrow " + className}>
    <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
  </svg>;
}

function SectionTitle({ number, label, title, children }: { number: string; label: string; title: ReactNode; children?: ReactNode }) {
  return <div className="sv-section-heading" data-reveal>
    <div><p className="sv-eyebrow"><span>{number}</span> / {label}</p><h2>{title}</h2></div>
    {children && <div className="sv-section-intro">{children}</div>}
  </div>;
}

function OrganizationLogo({ company }: { company: string }) {
  const src = company.includes("Call To Action") ? "/images/cta-logo.png"
    : company.includes("Ynov") ? "/images/ynov.jpg" : null;
  return <span className={"sv-organization-logo" + (src ? "" : " sv-organization-initials")} aria-hidden="true">
    {src ? <Image src={src} alt="" width={64} height={64} />
      : company.split(" ").slice(0, 2).map(word => word[0]).join("")}
  </span>;
}

const LAYERS = [
  { name: "Interface", detail: "Des interfaces claires, des composants réutilisables et une expérience responsive.", stack: "Next.js · React · TypeScript", label: "01", position: "interface" },
  { name: "API", detail: "Des API structurées, une authentification centralisée et des accès maîtrisés.", stack: "Java · Spring Boot · FastAPI · SSO / RBAC", label: "02", position: "api" },
  { name: "Données & IA", detail: "Des données utiles et des modèles auto-hébergés pour garder la maîtrise de l'infrastructure.", stack: "MySQL · MongoDB · Mistral", label: "03", position: "data" },
  { name: "Livraison", detail: "Docker et CI/CD GitHub Actions sur 3 applications critiques en entreprise. Vitest sur la plateforme qualité.", stack: "Docker · GitHub Actions · Linux", label: "04", position: "delivery" },
];

function Architecture() {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerX, { stiffness: 110, damping: 22 });
  const tiltY = useSpring(pointerY, { stiffness: 110, damping: 22 });
  const layer = LAYERS[selected];
  return <div className="sv-system">
    <div className="sv-system-top"><span className="sv-eyebrow">DU PRODUIT À L’INFRA</span><span className="sv-system-mark" aria-hidden="true">N/O · 01</span></div>
    <div className={"sv-system-scene sv-layer-" + selected}
      onPointerMove={event => {
        if (reducedMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -9);
        pointerY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 9);
      }}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <motion.svg viewBox="0 0 480 320" className="sv-system-art" fill="none" aria-hidden="true"
        style={{ rotateX: reducedMotion ? 0 : tiltX, rotateY: reducedMotion ? 0 : tiltY, transformPerspective: 800 }}>
        <defs>
          <pattern id="sv-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#596272" opacity=".4" /></pattern>
          <linearGradient id="sv-layer-fill" x1="240" y1="50" x2="240" y2="260" gradientUnits="userSpaceOnUse"><stop stopColor="#25354a" /><stop offset="1" stopColor="#111a25" /></linearGradient>
          <linearGradient id="sv-line" x1="120" y1="70" x2="360" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#b9ddff" /><stop offset="1" stopColor="#40658b" /></linearGradient>
        </defs>
        <rect width="480" height="320" fill="url(#sv-dots)" />
        <ellipse cx="240" cy="254" rx="110" ry="24" fill="#70b6ff" opacity=".035" />
        <g className="sv-system-connections" stroke="#475767" strokeDasharray="3 5"><path d="M102 86h34l54 34M378 86h-34l-54 34M105 250h30l57-45M375 250h-30l-57-45" /><path d="M240 34v30m0 192v35" /></g>
        <motion.g animate={{ y: reducedMotion ? 0 : [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <g className="sv-stack-bottom"><path d="m240 139 107 58-107 59-107-59z" fill="#111922" stroke="#38516a" /><path d="m133 197 107 59 107-59v14l-107 59-107-59z" fill="#0d131b" stroke="#38516a" /><path d="m158 197 82 45 82-45" stroke="#6497ca" strokeOpacity=".5" /><circle cx="240" cy="256" r="2" fill="#acd4ff" /></g>
        <g className="sv-stack-middle"><path d="m240 97 107 58-107 59-107-59z" fill="url(#sv-layer-fill)" stroke="url(#sv-line)" /><path d="m133 155 107 59 107-59v14l-107 59-107-59z" fill="#131e2b" stroke="#537da7" /><path d="m169 155 71 39 71-39" stroke="#83baee" strokeOpacity=".4" /></g>
        <g className="sv-stack-top"><path d="m240 56 107 58-107 59-107-59z" fill="url(#sv-layer-fill)" stroke="url(#sv-line)" /><path d="m133 114 107 59 107-59v14l-107 59-107-59z" fill="#1a2b3d" stroke="#709dca" /><path d="m221 102-17 10 17 10m38-20 17 10-17 10m-14-25-10 30" stroke="#d1e7ff" strokeWidth="2" strokeLinecap="round" /><path d="m156 114 84 46 84-46" stroke="#b7dcff" strokeOpacity=".2" /></g>
        </motion.g>
        <g fill="#a9d6ff"><circle cx="136" cy="86" r="2" /><circle cx="344" cy="86" r="2" /><circle cx="135" cy="250" r="2" /><circle cx="345" cy="250" r="2" /></g>
      </motion.svg>
      {LAYERS.map((item, index) => <button type="button" key={item.name} className={"sv-node sv-node-" + item.position} aria-pressed={selected === index} aria-controls="architecture-detail" onClick={() => setSelected(index)}><span>{item.label}</span>{item.name}<i aria-hidden="true" /></button>)}
      <span className="sv-scene-caption">4 couches. Une vision d’ensemble.</span>
    </div>
    <div className="sv-system-detail" id="architecture-detail" aria-live="polite" aria-atomic="true"><div><span className="sv-eyebrow">{layer.label} / {layer.name}</span><span className="sv-detail-index" aria-hidden="true">0{selected + 1}/04</span></div><p>{layer.detail}</p><span className="sv-mono">{layer.stack}</span></div>
    <p className="sv-system-hint"><span aria-hidden="true">↖</span> Choisissez une couche pour explorer.</p>
  </div>;
}

function PipelinePreview() {
  return <div className="sv-pipeline-preview" aria-label="Illustration de la chaîne de livraison du projet">
    <div className="sv-code-top"><span><i /><i /><i /></span><span>delivery.workflow</span><span>YAML</span></div>
    <div className="sv-code-body"><p><span>on:</span> [push, pull_request]</p><p><span>jobs:</span></p><p className="sv-code-indent">build-and-test:</p><p className="sv-code-indent-2"><span>runs-on:</span> ubuntu-latest</p><p className="sv-code-indent-2"><span>steps:</span></p><p className="sv-code-indent-3">− npm ci</p><p className="sv-code-indent-3">− npm test</p><p className="sv-code-indent-3">− docker build .</p></div>
    <div className="sv-pipeline-stages">{["Code", "Tests", "Docker"].map((name, i) => <span key={name}><span className="sv-stage-check" aria-hidden="true">✓</span>{name}{i < 2 && <span className="sv-stage-line" aria-hidden="true" />}</span>)}</div>
    <span className="sv-illustration-label">Chaîne de livraison · illustration</span>
  </div>;
}

function FeaturedProject({ project, index, onOpen }: { project: ProjectData; index: number; onOpen: () => void }) {
  const lead = index === 0;
  const galleryCount = project.gallery?.length ?? 0;
  const hasGallery = galleryCount > 0;
  const tech = lead
    ? project.technologies.slice(0, 6)
    : project.technologies.filter(t => !["React 19", "TypeScript", "JWT", "SQLite", "Ollama", "Docker Compose", "Express", "Vitest", "Playwright"].includes(t)).slice(0, 4);

  return <article className={lead ? "sv-featured sv-featured-lead" : "sv-featured"} data-reveal data-reveal-order={index}>
    <button type="button" className="sv-featured-button" onClick={onOpen} aria-label={"Découvrir le projet " + project.title}>
      <div className={project.imageSrc ? "sv-featured-visual sv-featured-capture" : "sv-featured-visual"}>
        {project.imageSrc ? <div className={lead ? "sv-lead-preview" : hasGallery ? "sv-gallery-preview" : "sv-browser-preview"}>
          {!lead && !hasGallery && <div className="sv-browser-bar"><span><i /><i /><i /></span><span>{project.title.toLowerCase()} / aperçu</span><span aria-hidden="true">↗</span></div>}
          {/* eslint-disable-next-line @next/next/no-img-element -- capture statique déjà compressée */}
          <img src={project.imageSrc} alt={"Capture de l'application " + project.title} loading="lazy" width="1280" height={lead ? 720 : hasGallery ? 800 : 742} />
        </div> : <PipelinePreview />}
        <span className="sv-visual-badge">{project.videoSrc ? "Voir la démo ↗" : hasGallery ? galleryCount + " vues du laboratoire ↗" : "Explorer le projet ↗"}</span>
      </div>
      <div className="sv-featured-description">
        <div className="sv-project-meta">
          <span>{String(index + 1).padStart(2, "0")} / {project.category}</span>
          <span>{lead ? "PROJET PRINCIPAL" : project.year}</span>
        </div>
        <div className="sv-project-title"><h3>{project.title}</h3><span className="sv-project-open"><Arrow diagonal /></span></div>
        <p>{project.summary ?? project.description[0]}</p>
        <div className="sv-tech-line">{tech.join(" / ")}</div>
      </div>
    </button>
  </article>;
}

function ProjectGallery({ images }: { images: NonNullable<ProjectData["gallery"]> }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return <div className="sv-project-gallery">
    <figure>
      <a href={current.src} target="_blank" rel="noreferrer" className="sv-gallery-full" aria-label={"Agrandir la capture " + current.label}>
        {/* eslint-disable-next-line @next/next/no-img-element -- captures locales compressées, chargées à l'ouverture */}
        <img src={current.src} alt={current.alt} width="1440" height="900" className="sv-modal-media" />
        <span className="sv-visual-badge" aria-hidden="true">Agrandir ↗</span>
      </a>
      <figcaption aria-live="polite">{current.caption}</figcaption>
    </figure>
    <div className="sv-gallery-options" role="group" aria-label="Vues du projet">
      {images.map((image, index) => <button
        key={image.src}
        type="button"
        aria-pressed={selected === index}
        onClick={() => setSelected(index)}
      ><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{image.label}</button>)}
    </div>
  </div>;
}

function ProjectModal({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return <motion.div className="sv-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.div className="sv-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-label={"Projet " + project.title} initial={{ y: 18 }} animate={{ y: 0 }} exit={{ y: 10 }} onClick={e => e.stopPropagation()}>
      <div className="sv-modal-toolbar"><span className="sv-eyebrow">ÉTUDE DE PROJET{project.year && <> / {project.year}</>}</span><button type="button" onClick={onClose} aria-label="Fermer le projet"><span>Fermer</span><span aria-hidden="true">×</span></button></div>
      <div className="sv-modal-scroll">
        {project.videoSrc ? <video src={project.videoSrc} poster={project.imageSrc} controls playsInline preload="none" aria-label={"Présentation vidéo de " + project.title} className="sv-modal-media" /> : project.gallery?.length ? <ProjectGallery key={project.id} images={project.gallery} /> : project.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- média de projet chargé uniquement à l'ouverture
          <img src={project.imageSrc} alt={project.title} className="sv-modal-media" />
        ) : null}
        <div className="sv-modal-content"><p className="sv-eyebrow">{project.context}</p><h2 id="project-title">{project.title}</h2>{project.role && <p className="sv-modal-role">{project.role}</p>}<div className="sv-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><div className="sv-modal-copy">{project.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><div className="sv-modal-links">{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="sv-button sv-button-primary">Code source <Arrow diagonal /></a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="sv-button sv-button-outline">Voir en ligne <Arrow diagonal /></a>}</div></div>
      </div>
    </motion.div>
  </motion.div>;
}

export default function SimpleView() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const readingProgress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  const [openProject, setOpenProject] = useState<ProjectData | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const root = showcaseRef.current;
    if (!root || reducedMotion || !("IntersectionObserver" in window)) return;

    // Le HTML reste visible sans JavaScript ; seuls les blocs hors écran sont animés.
    const items = root.querySelectorAll<HTMLElement>("[data-reveal], .sv-project-row, .sv-approach-item, .sv-experience, .sv-education-row, .sv-skill-group, .sv-contact h2, .sv-contact-bottom");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.revealState = "visible";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    items.forEach(item => {
      const bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) return;
      item.dataset.reveal = "";
      item.dataset.revealOrder ??= String(Array.from(item.parentElement?.children ?? []).indexOf(item) % 4);
      item.dataset.revealState = "pending";
      observer.observe(item);
    });
    const revealFocused = (event: FocusEvent) => {
      const item = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-reveal]") : null;
      if (item) {
        item.dataset.revealState = "visible";
        observer.unobserve(item);
      }
    };
    root.addEventListener("focusin", revealFocused);
    return () => {
      observer.disconnect();
      root.removeEventListener("focusin", revealFocused);
      items.forEach(item => delete item.dataset.revealState);
    };
  }, [reducedMotion]);
  const closeProject = useCallback(() => {
    setOpenProject(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState(null, "", url);
  }, []);
  const showProject = (project: ProjectData) => {
    setOpenProject(project);
    const url = new URL(window.location.href);
    url.searchParams.set("project", projectSlug(project.title));
    window.history.replaceState(null, "", url);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const slug = url.searchParams.get("project");
    // Les anciens liens restent valides et arrivent sur l'unique vitrine.
    if (url.searchParams.has("view")) {
      url.searchParams.delete("view");
      window.history.replaceState(null, "", url);
    }
    const project = projectsData.find(item => projectSlug(item.title) === slug);
    if (project) setOpenProject(project);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-15% 0px -60% 0px" });
    NAV.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  const featured = projectsData.filter(project => project.featured);
  const others = projectsData.filter(project => !project.featured);

  return <div className="showcase" ref={showcaseRef}>
    <a href="#main" className="sv-skip">Aller au contenu</a>
    <header className="sv-header"><div className="sv-nav-wrap"><a href="#main" className="sv-brand" aria-label="Nadjide Omar · accueil"><span className="sv-monogram">n<span>.</span></span><span>Nadjide Omar<span className="sv-brand-sub">Software Engineer</span></span></a><nav aria-label="Navigation principale">{NAV.map(([id, label]) => <a key={id} href={"#" + id} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav><a href={EMAIL.href} className="sv-header-contact">Parlons-en <Arrow diagonal /></a></div><motion.div className="sv-reading-progress" style={{ scaleX: reducedMotion ? scrollYProgress : readingProgress }} aria-hidden="true" /></header>

    <main id="main">
      <section className="sv-hero sv-container" aria-label="Présentation">
        <div className="sv-hero-copy"><p className="sv-eyebrow"><span className="sv-status-dot" />FULL STACK / DEVOPS / IA LOCALE</p><p className="sv-hero-name">Bonjour, je suis {profile.name}.</p><h1 aria-label={profile.name}>Du code.<br />À la <span>production.</span></h1><p className="sv-hero-description">{profile.tagline}</p><div className="sv-hero-actions"><a href="#projects" className="sv-button sv-button-primary">Explorer mes projets <Arrow /></a><a href={REQUEST_CV} className="sv-text-link">Demander mon CV <Arrow diagonal /></a></div><div className="sv-hero-location"><span className="sv-location-symbol" aria-hidden="true">⊕</span>{profile.location}<span className="sv-small-divider" />Full Stack & DevOps<span className="sv-small-divider" />FR / EN</div></div>
        <Architecture />
        <div className="sv-hero-bottom"><span className="sv-eyebrow">CONSTRUIRE. SÉCURISER. LIVRER.</span><a href="#projects" className="sv-scroll-link">La suite <span aria-hidden="true">↓</span></a></div>
      </section>

      <div className="sv-proof-strip"><dl className="sv-container"><div><dt>Parcours en entreprise</dt><dd>5<span>ans</span></dd></div><div><dt>Environnement pro</dt><dd>6<span>applications</span></dd></div><div><dt>Temps d’évaluation qualité</dt><dd>−83<span>%</span></dd></div><div className="sv-proof-note"><dt>Ma façon de travailler</dt><dd>Un œil sur le produit.<br />L’autre sur l’infrastructure.</dd></div></dl></div>

      <section id="projects" className="sv-section sv-container">
        <SectionTitle number="01" label="PROJETS CHOISIS" title={<>Du concret,<br /><span>de bout en bout.</span></>}><p>De l’inventaire et l’aménagement 3D de Sureau aux projets d’IA locale, d’automatisation et de temps réel.</p><span className="sv-mono">{String(projectsData.length).padStart(2, "0")} PROJETS</span></SectionTitle>
        <div className="sv-featured-grid">{featured.map((project, index) => <FeaturedProject key={project.id} project={project} index={index} onOpen={() => showProject(project)} />)}</div>
        <div className="sv-project-list"><div className="sv-list-header"><span>D’AUTRES TERRAINS D’EXPLORATION</span><span /></div>{others.map((project, index) => <button type="button" key={project.id} onClick={() => showProject(project)} className="sv-project-row" aria-label={"Découvrir le projet " + project.title}><span className="sv-row-index">{String(featured.length + index + 1).padStart(2, "0")}</span><span className="sv-row-main"><span className="sv-row-title">{project.title}</span><span className="sv-row-summary">{project.summary ?? project.role}</span></span><span className="sv-row-tech">{project.technologies.slice(0, 2).join(" / ")}</span><span className="sv-row-year">{project.year}</span><Arrow diagonal /></button>)}</div>
      </section>

      <section id="about" className="sv-about-section"><div className="sv-container sv-section">
        <SectionTitle number="02" label="MON APPROCHE" title={<>Le produit en tête.<br /><span>La technique au service.</span></>}><p>{profile.about[0]}</p></SectionTitle>
        <div className="sv-approach-grid">{profile.highlights.map((item, index) => <article key={item.title} className="sv-approach-item"><span className="sv-approach-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        <div className="sv-impact"><span className="sv-eyebrow">EN CONDITIONS RÉELLES</span><p>Une évaluation qualité.<br /><span className="sv-impact-before">30 minutes.</span> <span className="sv-impact-after">5 minutes.</span></p><div><span className="sv-impact-metric">−83 %</span><p>Résultat de la plateforme de pilotage qualité, utilisée par plus de 60 personnes. Une API d’analyse IA auto-hébergée complétait cette plateforme.</p></div></div>
        <details className="sv-about-details"><summary>En savoir plus sur mon profil <span aria-hidden="true">+</span></summary><div>{profile.about.slice(1).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></details>
      </div></section>

      <section id="experience" className="sv-section sv-container"><SectionTitle number="03" label="PARCOURS" title={<>Construire.<br /><span>Et prendre de la hauteur.</span></>}><p>De l’intégration de données au développement Full Stack et aux pratiques DevOps.</p><span className="sv-mono">NICE / 2021 · 2026</span></SectionTitle><div className="sv-experience-list">{[...experiences].reverse().map((experience, index) => <details key={experience.id} className="sv-experience" open={index === 0 ? true : undefined}><summary><span className="sv-experience-date">{experience.date}</span><span className="sv-experience-heading"><OrganizationLogo company={experience.company} /><span className="sv-experience-role"><span>{experience.title}</span><span>{experience.company} · {experience.location}</span></span></span><span className="sv-details-plus" aria-hidden="true">+</span></summary><div className="sv-experience-content"><p className="sv-experience-description">{experience.description}</p>{experience.projects.map(project => <div className="sv-experience-project" key={project.name}><h4>{project.name}</h4><ul>{project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><p className="sv-mono">{project.tech.join(" / ")}</p></div>)}</div></details>)}</div>
        <div id="education" className="sv-education"><h3 className="sv-eyebrow">FORMATION / DE LA PRATIQUE À L’EXPERTISE</h3>{[...formations].reverse().map(formation => <div key={formation.id} className="sv-education-row"><span className="sv-mono">{formation.date}</span><div className="sv-education-heading"><OrganizationLogo company={formation.company} /><div><h4>{formation.title}</h4><p>{formation.subtitle} · {formation.company}</p>{formation.location && <span>{formation.location}</span>}</div></div></div>)}<p className="sv-mono">{profile.certification}</p></div>
      </section>

      <section id="skills" className="sv-stack-section"><div className="sv-container sv-section"><SectionTitle number="04" label="BOÎTE À OUTILS" title={<>La bonne stack.<br /><span>Pour le bon problème.</span></>}><p>Des technologies pratiquées en entreprise. Un espace distinct pour celles explorées sur projets.</p></SectionTitle><div className="sv-skills-grid">{skillGroups.map((group, index) => <article className="sv-skill-group" key={group.category}><h3><span className="sv-mono">0{index + 1}</span>{group.category}{index === skillGroups.length - 1 && <span className="sv-project-only">PROJETS</span>}</h3><p>{group.items.join(" · ")}</p></article>)}</div></div></section>

      <section id="contact" className="sv-section sv-container sv-contact"><div className="sv-contact-top"><p className="sv-eyebrow">05 / LA SUITE, ENSEMBLE</p><span className="sv-mono">{profile.location} · {profile.languages.join(" / ")}</span></div><h2>Et si on construisait<br /><span>la suite ?</span></h2><div className="sv-contact-bottom"><div><p>{profile.availability}</p><p>Une équipe à rejoindre, un produit à faire avancer.<br />Parlons de ce que l’on peut construire ensemble.</p><a className="sv-contact-email" href={EMAIL.href}>{EMAIL.value}<Arrow diagonal /></a></div><a href={REQUEST_CV} className="sv-button sv-button-outline">Demander mon CV <Arrow diagonal /></a></div></section>
    </main>

    <footer className="sv-footer sv-container"><span>© {new Date().getFullYear()} {profile.name}<span className="sv-footer-note">Pensé comme un produit. Construit pour durer.</span></span><div>{contactLinks.filter(link => link.label !== "Email").map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<Arrow diagonal /></a>)}<a href="#main" aria-label="Retour en haut">↑</a></div></footer>
    <AnimatePresence>{openProject && <ProjectModal project={openProject} onClose={closeProject} />}</AnimatePresence>
  </div>;
}
