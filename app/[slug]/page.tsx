"use client";

import { useParams } from "next/navigation";
import ProjectDetails from "../ProjectDetails";
import { projectsData } from "../projectsData";

export default function ProjectPage() {
    const { slug } = useParams() as { slug: string };

    const project = projectsData.find(
        (proj) => proj.title.toLowerCase().replace(/ /g, "-") === slug
    );

    if (!project) {
        return (
            <div className="p-6 text-center text-gray-300">
                <h2 className="text-2xl font-semibold">Projet non trouvé</h2>
                <p>Le projet que vous recherchez n'existe pas.</p>
            </div>
        );
    }

    return (
        <div className="p-0"> {/* Removed padding to allow full screen hero */}
            <ProjectDetails {...project} />
        </div>
    );
}