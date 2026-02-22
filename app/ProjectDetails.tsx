"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "./projectsData";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import NextImage from "next/image";

interface ProjectDetailsProps extends ProjectData {
    technologies: string[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    title,
    description,
    imageSrc,
    videoSrc,
    technologies,
    year,
    role,
    context
}) => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const isVideo = !!videoSrc;

    return (
        <div ref={containerRef} className="h-screen overflow-y-auto bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300 relative scrollbar-hide">
            
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Floating Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => router.back()}
                className="fixed top-6 left-6 z-40 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all group flex items-center gap-2"
            >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">Retour</span>
            </motion.button>

            {/* Hero Section - Immersive Media */}
            <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {isVideo ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-50 dark:opacity-40"
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    ) : (
                        <NextImage
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover opacity-50 dark:opacity-40"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/60 dark:from-[#0a0a0a] dark:via-transparent dark:to-black/80" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-gray-900 dark:text-white drop-shadow-2xl">
                            {title}
                        </h1>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-3 mt-8"
                    >
                        {technologies.map((tech, i) => (
                            <span 
                                key={tech}
                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/10 text-gray-900 dark:text-gray-100 shadow-lg"
                            >
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <motion.div 
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1 h-12 rounded-full bg-gradient-to-b from-blue-500 to-transparent"
                    />
                </motion.div>
            </section>

            {/* Content Section - Case Study Layout */}
            <section className="relative z-20 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left Column - Sticky Info */}
                <div className="lg:col-span-4 relative">
                    <div className="lg:sticky lg:top-32 space-y-12">
                        
                        {/* Project Info Block */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                                <span className="w-1 h-8 rounded-full bg-blue-500"/>
                                À propos
                            </h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">Rôle</h4>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">{role || "Conception & Développement Full Stack"}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">Type</h4>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">{context || "Projet d'Entreprise"}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">Année</h4>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">{year || "2024 - 2025"}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tech Stack Block */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xl font-bold mb-6 pl-4 border-l-4 border-cyan-500 text-gray-900 dark:text-white">
                                Stack Technique
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Column - Narrative */}
                <div className="lg:col-span-8 space-y-20">
                    {description.map((paragraph, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="group pl-8 border-l border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors duration-500"
                        >
                            {/* Decorative number */}
                            <span className="block text-4xl md:text-5xl font-black text-gray-200 dark:text-white/5 mb-4 select-none group-hover:text-blue-500/20 transition-colors duration-500">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            
                            <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 relative">
                                {paragraph}
                            </p>
                        </motion.div>
                    ))}
                    
                    {/* Bottom Action */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="pt-20 border-t border-gray-100 dark:border-gray-800 flex justify-center w-full"
                    >
                        <button 
                            onClick={() => router.back()}
                            className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold overflow-hidden transition-transform duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
                        >
                            <div className="relative z-10 flex items-center gap-2 group-hover:gap-4 transition-all">
                                <span>Retour aux projets</span>
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            </div>
                        </button>
                    </motion.div>
                </div>

            </section>
        </div>
    );
};

export default ProjectDetails;
