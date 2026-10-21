export interface ProjectData {
    id: string;
    title: string;
    description: string[];
    /** Résumé court de la réalisation, partagé par les aperçus. */
    summary?: string;
    imageSrc?: string;
    videoSrc?: string;
    githubUrl?: string;
    liveUrl?: string;
    technologies: string[];
    featured?: boolean;
    year?: string;
    role?: string;
    context?: string;
}

/* Preuves verifiees dans _cv/faits/profil.toml. Les manifestes Kubernetes
   attestent une pratique de projet, pas un deploiement. */
export const projectsData: ProjectData[] = [
    {
        id: "13",
        title: "Stajio",
        summary: "Next.js, IA locale et CI GitHub Actions. Conteneurisation Docker et manifestes Kubernetes avec Kustomize.",
        imageSrc: "/images/stajio-preview.jpg",
        featured: true,
        context: "Projet",
        description: [
            "Stajio associe Next.js 16, React 19 et TypeScript, avec une base SQLite et Ollama pour l'IA locale.",
            "La CI GitHub Actions comprend le contrôle des types, ESLint, Vitest, le build et les tests E2E Playwright.",
            "Le projet comprend Docker et des manifestes Kubernetes organisés avec Kustomize.",
        ],
        githubUrl: "https://github.com/Nadjide/stajio",
        technologies: ["Next.js 16", "React 19", "TypeScript", "SQLite", "Ollama", "Docker", "Kubernetes", "Kustomize", "GitHub Actions", "Vitest", "Playwright"],
    },
    {
        id: "15",
        title: "DevOps Playground",
        summary: "API Node.js/Express conteneurisée : Docker Compose, GitHub Actions, tests Jest et contrôles de santé.",
        featured: true,
        context: "Projet",
        description: [
            "DevOps Playground est une API Node.js/Express conteneurisée avec Docker et Docker Compose.",
            "Le projet associe GitHub Actions, des tests Jest et des contrôles de santé.",
        ],
        githubUrl: "https://github.com/Nadjide/devops-playground",
        technologies: ["Node.js", "Express", "Docker", "Docker Compose", "GitHub Actions", "Jest"],
    },
    {
        id: "16",
        title: "Pokito",
        summary: "Backend Node.js/Socket.IO avec serveur autoritaire, Supabase et Docker.",
        context: "Projet",
        description: [
            "Le backend de Pokito repose sur Node.js et Socket.IO, avec un serveur autoritaire.",
            "La stack du projet comprend Supabase et Docker.",
        ],
        githubUrl: "https://github.com/Pokito-ynov/api-pokito",
        technologies: ["Node.js", "Socket.IO", "Supabase", "Docker"],
    },
];
