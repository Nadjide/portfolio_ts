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
        <div className="bg-gray-100 text-gray-900 p-6 rounded-lg shadow-md space-y-8 relative">
            {/* Animation de chargement */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg"
                    >
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.2 }}
                            transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
                            className="w-16 h-16 bg-purple-500 rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bouton Retour */}
            <motion.button
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                onClick={() => router.back()}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                Retour
            </motion.button>

            {/* Section Image ou Vidéo et Description */}
            <motion.div
                className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
            >
                <div className="w-full lg:w-1/2">
                    {isVideoAvailable ? (
                        <motion.video
                            autoPlay
                            loop
                            muted
                            playsInline
                            webkit-playsinline="true"
                            className="w-full rounded-lg shadow-md"
                            ref={(video) => {
                                if (video) video.playbackRate = 1.5;
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <source src={videoSrc} type="video/mp4" />
                            Votre navigateur ne supporte pas la balise vidéo.
                        </motion.video>
                    ) : (
                        <div className="relative h-72 sm:h-96 w-full">
                            <Image
                                src={imageSrc}
                                alt="Aperçu du projet"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                {/* Section Description */}
                <motion.div
                    className="w-full lg:w-1/2 flex flex-col"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 }}
                >
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">{title}</h2>
                        {description.map((paragraph, index) => (
                            <div
                                key={index}
                                dangerouslySetInnerHTML={{ __html: paragraph }}
                                className="mb-4 text-sm sm:text-base"
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Section Technologies Utilisées */}
            <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
            >
                <h3 className="text-lg font-semibold mb-6 text-center">Technologies Utilisées</h3>
                <div className="flex flex-wrap justify-center gap-6">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 + index * 0.1 }}
                        >
                            <div className="flex flex-col items-center space-y-2">
                                <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                                    <Image
                                        src={techImageMap[tech] || "/langProg/javascript.png"}
                                        alt={tech}
                                        layout="fill"
                                        objectFit="contain"
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                                    {tech}
                                </span>
                            </div>
                            {/* Effet de brillance au survol */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectDetails;