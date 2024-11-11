"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "./projectsData";

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
    const router = useRouter();

    return (
        <div className="bg-gray-100 text-gray-900 p-6 rounded-lg shadow-md space-y-8">
            {/* Bouton Retour */}
            <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                onClick={() => router.back()}
            >
                Retour
            </button>

            {/* Section Image ou Vidéo */}
            <div className="flex space-x-8">
                <div className="w-1/2">
                    {isVideoAvailable ? (
                        <video
                            autoPlay
                            loop
                            muted
                            width="100%"
                            className="rounded-lg shadow-md"
                            ref={(video) => { if (video) video.playbackRate = 1.5; }}
                        >
                            <source src={videoSrc} type="video/mp4" />
                            Votre navigateur ne supporte pas la balise vidéo.
                        </video>
                    ) : (
                        <div className="relative h-72 w-full">
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
                <div className="w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                        {description.map((paragraph, index) => (
                            <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Technologies Utilisées */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Technologies Utilisées</h3>
                <ul className="flex flex-wrap gap-4">
                    {technologies.map((tech, index) => (
                        <li key={index} className="bg-gray-300 px-4 py-2 rounded-md shadow-sm">
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectDetails;