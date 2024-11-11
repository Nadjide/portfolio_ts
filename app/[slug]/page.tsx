"use client";

import { useParams } from "next/navigation";
import ProjectDetails from "../ProjectDetails";
import { projectsData } from "../projectsData";

export default function ProjectPage() {
    const { slug } = useParams() as { slug: string };

    // Trouver le projet correspondant en utilisant le slug
    const project = projectsData.find(
        (proj) => proj.title.toLowerCase().replace(/ /g, "-") === slug
    );

    // Si le projet n'est pas trouvé, afficher un message ou une page d'erreur
    if (!project) {
        return (
            <div className="p-6 text-center text-gray-300">
                <h2 className="text-2xl font-semibold">Projet non trouvé</h2>
                <p>Le projet que vous recherchez n'existe pas.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <ProjectDetails
                id={project.id}
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                videoSrc={project.videoSrc}
                technologies={project.technologies}
            />
        </div>
    );
}