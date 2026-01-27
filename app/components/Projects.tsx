"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { projectsData } from "../projectsData";

const Projects = () => {
    const router = useRouter();
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    const handleProjectClick = (projectTitle: string) => {
        const slug = projectTitle
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .trim()
            .toLowerCase()
            .replace(/ /g, "-");
        router.push(`/${slug}`);
    };

    return (
        <section className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/20 transition-colors duration-300">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white transition-colors duration-300"
            >
                Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Phares</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {projectsData.map((project, index) => (
                    <motion.div
                        key={project.title}
                        layoutId={`project-${project.title}`} // For future detailed view transitions
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg shadow-blue-500/5 dark:shadow-black/30 hover:shadow-blue-500/20 dark:hover:shadow-blue-900/20 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                        onClick={() => handleProjectClick(project.title)}
                        onMouseEnter={() => setHoveredProject(project.title)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        {/* Project Header/Preview Area */}
                        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center group-hover:from-blue-100 group-hover:to-cyan-100 dark:group-hover:from-blue-800/30 dark:group-hover:to-cyan-800/30 transition-all duration-300">
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

                            <div className="mt-4 flex items-center text-sm font-medium text-blue-500 dark:text-blue-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                Voir détails
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>

                        {/* Glowing Border Effect on Hover */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 dark:group-hover:border-blue-500/30 rounded-2xl transition-colors duration-300 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
