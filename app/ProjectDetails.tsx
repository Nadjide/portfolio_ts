"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectDetailsProps {
    title: string;
    description: string;
    imageSrc: string;
    videoSrc?: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ title, description, imageSrc, videoSrc }) => {
    const [isVideoAvailable] = useState(!!videoSrc);

    return (
        <div className="bg-gray-100 text-gray-900 p-6 rounded-lg shadow-md flex space-x-8">
            {/* Section Image ou Vidéo */}
            <div className="w-1/2">
                {isVideoAvailable ? (
                    <video controls width="100%" className="rounded-lg shadow-md">
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
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
                    <p className="text-gray-700 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;