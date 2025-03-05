"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "./projectsData";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetailsProps extends ProjectData {
    technologies: string[];
}

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
        const timeout = setTimeout(() => setLoading(false), 1000); // Adjust time as needed
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
                <h3 className="text-lg font-semibold mb-4">Technologies Utilisées</h3>
                <ul className="flex flex-wrap gap-4">
                    {technologies.map((tech, index) => (
                        <motion.li
                            key={index}
                            className="bg-gray-300 px-4 py-2 rounded-md shadow-sm text-sm sm:text-base"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 + index * 0.1 }}
                        >
                            {tech}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default ProjectDetails;