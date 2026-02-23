"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { projectsData } from "../projectsData";
import BuildConsole from "./BuildConsole";

// Optimized Video Component
const ProjectVideo = ({ src, poster }: { src: string, poster?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "100px" } // Preload a bit before bringing into view
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (shouldLoad && videoRef.current) {
            videoRef.current.play().catch(() => { /* Auto-play failed, expected in some browsers */ });
        }
    }, [shouldLoad]);

    return (
        <video
            ref={videoRef}
            poster={poster} // Show image until video loads
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            preload="none" // ⚡ CRITICAL: Do not download video data on initial page load
        >
            {shouldLoad && <source src={src} type="video/mp4" />}
        </video>
    );
};

const Projects = () => {
    const router = useRouter();
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [buildingProject, setBuildingProject] = useState<string | null>(null);

    const slugify = (title: string) =>
        title
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .trim()
            .toLowerCase()
            .replace(/ /g, "-");

    const handleProjectClick = useCallback((projectTitle: string) => {
        setBuildingProject(projectTitle);
    }, []);

    const handleBuildComplete = useCallback(
        (projectTitle: string) => {
            router.push(`/${slugify(projectTitle)}`);
        },
        [router]
    );

    const featuredProjects = projectsData.filter((p) => p.featured);
    const otherProjects = projectsData.filter((p) => !p.featured);

    return (
        <section className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/20 transition-colors duration-300">

            {/* ── Projets Phares ── */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-3 text-center text-gray-900 dark:text-white transition-colors duration-300"
            >
                Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Phares</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center text-gray-500 dark:text-gray-400 mb-12 text-sm"
            >
                Les projets les plus ambitieux, conçus et livrés en contexte professionnel
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
                {featuredProjects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        layoutId={`project-${project.title}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer
                                   shadow-xl shadow-blue-500/10 dark:shadow-black/40
                                   hover:shadow-2xl hover:shadow-blue-500/25 dark:hover:shadow-blue-900/30
                                   transition-all duration-300 transform hover:-translate-y-2
                                   border-2 border-blue-400/40 dark:border-blue-500/30
                                   hover:border-blue-500/70 dark:hover:border-blue-400/60"
                        onClick={() => handleProjectClick(project.title)}
                        onMouseEnter={() => setHoveredProject(project.title)}
                        onMouseLeave={() => setHoveredProject(null)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Voir les détails du projet phare ${project.title}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleProjectClick(project.title);
                            }
                        }}
                    >
                        {/* Docker build console overlay */}
                        <AnimatePresence>
                            {buildingProject === project.title && (
                                <BuildConsole
                                    projectTitle={project.title}
                                    onComplete={() => handleBuildComplete(project.title)}
                                />
                            )}
                        </AnimatePresence>

                        {/* Featured badge */}
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg shadow-blue-500/30">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Projet Phare
                        </div>

                        {/* Video preview — taller on featured */}
                        <div className="h-56 relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center group-hover:from-blue-100 group-hover:to-cyan-100 dark:group-hover:from-blue-800/30 dark:group-hover:to-cyan-800/30 transition-all duration-300">
                            {project.videoSrc ? (
                                <ProjectVideo 
                                    src={project.videoSrc} 
                                    poster={project.imageSrc} // Use image as lazy placeholder
                                />
                            ) : (
                                <span className="text-4xl z-10 filter drop-shadow-md">🚀</span>
                            )}
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed transition-colors duration-300">
                                {Array.isArray(project.description) ? project.description[0] : project.description}
                            </p>

                            {/* Tech tags */}
                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="text-xs px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700 shadow-sm group-hover:border-blue-400/50 dark:group-hover:border-blue-500/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center text-sm font-medium text-blue-500 dark:text-blue-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                Voir détails
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Autres Projets ── */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-3 text-center text-gray-900 dark:text-white transition-colors duration-300"
            >
                Autres <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-300 dark:to-gray-500">Réalisations</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center text-gray-500 dark:text-gray-400 mb-10 text-sm"
            >
                Projets scolaires, explorations techniques et expérimentations
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {otherProjects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        layoutId={`project-${project.title}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg shadow-blue-500/5 dark:shadow-black/30 hover:shadow-blue-500/20 dark:hover:shadow-blue-900/20 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                        onClick={() => handleProjectClick(project.title)}
                        onMouseEnter={() => setHoveredProject(project.title)}
                        onMouseLeave={() => setHoveredProject(null)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Voir les détails du projet ${project.title}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleProjectClick(project.title);
                            }
                        }}
                    >
                        {/* Docker build console overlay */}
                        <AnimatePresence>
                            {buildingProject === project.title && (
                                <BuildConsole
                                    projectTitle={project.title}
                                    onComplete={() => handleBuildComplete(project.title)}
                                />
                            )}
                        </AnimatePresence>

                        {/* Video preview */}
                        <div className="h-44 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/40 dark:to-gray-700/20 flex items-center justify-center group-hover:from-blue-50 group-hover:to-cyan-50 dark:group-hover:from-blue-900/20 dark:group-hover:to-cyan-900/20 transition-all duration-300">
                            {project.videoSrc ? (
                                <video
                                    src={project.videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            ) : (
                                <span className="text-3xl z-10 filter drop-shadow-md">🚀</span>
                            )}
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed transition-colors duration-300">
                                {Array.isArray(project.description) ? project.description[0] : project.description}
                            </p>

                            {/* Tech tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="text-xs px-3 py-1 rounded-full bg-transparent text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center text-sm font-medium text-blue-500 dark:text-blue-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                Voir détails
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>

                        {/* Hover border */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 dark:group-hover:border-blue-500/30 rounded-2xl transition-colors duration-300 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;

