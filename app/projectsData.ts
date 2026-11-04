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
    category?: string;
    year?: string;
    role?: string;
    context?: string;
}

/* Preuves verifiees dans _cv/faits/profil.toml. Les manifestes Kubernetes
   attestent une pratique de projet, pas un deploiement. */
export const projectsData: ProjectData[] = [
    {
        id: "17",
        title: "Sureau",
        summary: "Un inventaire informatique partagé et un atelier 2D/3D pour aménager les espaces et retrouver chaque équipement à son poste.",
        imageSrc: "/images/sureau-atelier-3d.jpg",
        videoSrc: "/videos/optimized/sureau-presentation.mp4",
        featured: true,
        category: "FULL STACK & 3D",
        context: "Logiciel libre · Auto-hébergé",
        role: "Conception, développement full stack et livraison",
        description: [
            "Sureau relie la gestion d’un parc informatique à un atelier spatial. Les équipes organisent leurs salles et leurs étages, composent les postes de travail et localisent le matériel sur un même plan, accessible en 2D comme en 3D.",
            "L’espace est partagé entre les comptes administrateur, éditeur et lecteur. Les modifications sont enregistrées explicitement et le contrôle de version préserve les brouillons quand deux personnes travaillent sur le même espace.",
            "L’interface React et Three.js s’appuie sur une API Java/Spring Boot et PostgreSQL. Le dépôt inclut une installation Docker Compose, des procédures de sauvegarde et de restauration, des manifestes Kubernetes et une CI GitHub Actions.",
        ],
        githubUrl: "https://github.com/Nadjide/sureau",
        technologies: ["Java 21", "Spring Boot 4", "React 19", "TypeScript", "Three.js", "PostgreSQL", "Docker Compose", "Kubernetes", "Playwright", "GitHub Actions"],
    },
    {
        id: "13",
        title: "Stajio",
        summary: "Next.js, IA locale et CI GitHub Actions. Conteneurisation Docker et manifestes Kubernetes avec Kustomize.",
        imageSrc: "/images/stajio-preview.jpg",
        featured: true,
        category: "FULL STACK & IA LOCALE",
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
        category: "DEVOPS & CI/CD",
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
