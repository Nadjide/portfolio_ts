"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "./projectsData";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetailsProps extends ProjectData {
    technologies: string[];
}

// Mapping des technologies vers leurs images
const techImageMap: { [key: string]: string } = {
    "HTML": "/langProg/HTML5.png",
    "Bootstrap": "/langProg/Bootstrap.png",
    "JavaScript": "/langProg/javascript.png",
    "FLASK": "/langProg/flask.png",
    "MySQL": "/langProg/mysql.png",
    "CSS": "/langProg/CSS3.png",
    "E-Script": "/langProg/javascript.png", // Utilisation de l'image JS pour E-Script
    "Nixxis": "/langProg/nixxis.png",
    "Python": "/langProg/python.png",
    "Polars": "/langProg/polars.png",
    "DuckDB": "/langProg/duckdb.png",
    "Next.js": "/langProg/nextjs.png",
    "Material UI": "/langProg/MaterialUI.png",
    "TypeScript": "/langProg/typescript.png",
    "PrismaORM": "/langProg/prisma.png",
    "React Native": "/langProg/reactnative.png",
    "MongoDB": "/langProg/mongodb.png",
    "Expo": "/langProg/expo.png",
    "FASTAPI": "/langProg/fastapi.png",
    "React": "/langProg/react.png",
    "PokeAPI": "/langProg/poke.png",
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    title,
    description,
    imageSrc,
    videoSrc,
    technologies,
}) => {
    const [isVideoAvailable] = useState(!!videoSrc);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 rounded-2xl shadow-xl shadow-blue-500/10 dark:shadow-black/30 border border-gray-100 dark:border-gray-700 space-y-12 relative max-w-6xl mx-auto transition-colors duration-300">
            {/* Animation de chargement */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 rounded-2xl transition-colors duration-300"
                    >
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.2 }}
                            transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
                            className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/30"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header with Title and Back Button */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-100 dark:border-gray-700 pb-8 transition-colors duration-300">
                <motion.button
                    className="group px-6 py-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                    onClick={() => router.back()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Retour
                </motion.button>

                <motion.h1
                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 text-center md:text-right"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {title}
                </motion.h1>
            </div>

            {/* Section Image ou Vidéo et Description */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="w-full space-y-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 dark:shadow-black/30 border border-gray-100 dark:border-gray-700 group transition-colors duration-300">
                        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                        {isVideoAvailable ? (
                            <motion.video
                                autoPlay
                                loop
                                muted
                                playsInline
                                webkit-playsinline="true"
                                className="w-full object-cover aspect-video"
                                ref={(video) => {
                                    if (video) video.playbackRate = 1.0;
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <source src={videoSrc} type="video/mp4" />
                                Votre navigateur ne supporte pas la balise vidéo.
                            </motion.video>
                        ) : (
                            <div className="relative aspect-video w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                                <Image
                                    src={imageSrc}
                                    alt="Aperçu du projet"
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Section Description */}
                <motion.div
                    className="flex flex-col justify-center space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="prose prose-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        {description.map((paragraph, index) => (
                            <div
                                key={index}
                                dangerouslySetInnerHTML={{ __html: paragraph }}
                                className="mb-6 last:mb-0"
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Section Technologies Utilisées */}
            <motion.div
                className="pt-8 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <h3 className="text-2xl font-semibold mb-8 text-center text-gray-900 dark:text-white transition-colors duration-300">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                        Technologies Utilisées
                    </span>
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-white dark:bg-gray-700 px-6 py-4 rounded-xl border border-gray-100 dark:border-gray-600 shadow-lg shadow-blue-500/5 dark:shadow-black/30 hover:shadow-blue-500/20 dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 p-2 bg-blue-50/50 dark:bg-gray-600 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-gray-500 transition-colors duration-300">
                                    <Image
                                        src={techImageMap[tech] || "/langProg/javascript.png"}
                                        alt={tech}
                                        layout="fill"
                                        objectFit="contain"
                                        className="transition-transform duration-300 group-hover:scale-110 p-1"
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {tech}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectDetails;
