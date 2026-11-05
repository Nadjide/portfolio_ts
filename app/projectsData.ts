export interface ProjectData {
    id: string;
    title: string;
    description: string[];
    /** Résumé court de la réalisation, partagé par les aperçus. */
    summary?: string;
    imageSrc?: string;
    gallery?: {
        src: string;
        alt: string;
        label: string;
        caption: string;
    }[];
    videoSrc?: string;
    videoCaption?: string;
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
        summary: "Un espace local-first pour suivre son stage, relier ses activités à des compétences et préparer un rapport révisable, avec une IA locale facultative.",
        imageSrc: "/images/stajio-dashboard.webp",
        videoSrc: "/videos/optimized/stajio-presentation.mp4",
        videoCaption: "Présentation · 2 min 40. Données fictives et réponses réelles de phi4-mini rejouées en accéléré.",
        gallery: [
            {
                src: "/images/stajio-dashboard.webp",
                alt: "Tableau de bord Stajio en thème sombre avec progression du stage, notes, échéances et compétences",
                label: "Tableau de bord",
                caption: "Vue d’ensemble du stage · Progression, notes du journal, compétences documentées et prochaines échéances.",
            },
            {
                src: "/images/stajio-journal.webp",
                alt: "Journal de bord Stajio présentant les notes d’activité et leur résumé",
                label: "Journal de bord",
                caption: "Suivi quotidien · Les notes conservent le texte d’origine. La structuration par l’IA reste une proposition que l’étudiant peut corriger.",
            },
            {
                src: "/images/stajio-rapport.webp",
                alt: "Rapport de stage Stajio avec plan, section rédigée et aperçu du document",
                label: "Rapport révisable",
                caption: "Du journal au rapport · Brief, plan, rédaction par section, versions enregistrées et validation avant export.",
            },
        ],
        featured: true,
        category: "FULL STACK & IA LOCALE",
        context: "Projet · Application local-first",
        role: "Conception produit, développement full stack et intégration de l’IA locale",
        description: [
            "Stajio accompagne les étudiants pendant leur stage ou leur alternance. Le journal de bord, les preuves de compétences et les échéances alimentent la préparation du rapport et de la soutenance.",
            "L’IA locale via Ollama est facultative. Elle propose une structuration des notes ou une rédaction que l’étudiant relit et valide. Les générations gardent leur provenance et les informations manquantes sont signalées.",
            "Le rapport se construit section par section, à partir des notes choisies et des consignes de l’école. Il dispose d’un plan modifiable, d’un aperçu, de versions restaurables et d’un export Markdown ou PDF.",
            "Next.js 16 et React 19 s’appuient sur SQLite pour conserver les données localement. Docker Compose orchestre l’application et Ollama. La CI GitHub Actions couvre les types, le lint, les tests Vitest, le build et les parcours Playwright.",
        ],
        githubUrl: "https://github.com/Nadjide/stajio",
        technologies: ["Next.js 16", "Ollama", "SQLite", "Docker", "React 19", "TypeScript", "Docker Compose", "Zod", "GitHub Actions", "Vitest", "Playwright", "Kubernetes", "Kustomize"],
    },
    {
        id: "15",
        title: "DevOps Playground",
        summary: "Un laboratoire DevOps interactif pour diagnostiquer une API, exécuter un pipeline et restaurer un service, en simulation ou avec Docker local.",
        imageSrc: "/images/devops-playground-rollback.webp",
        gallery: [
            {
                src: "/images/devops-playground-rollback.webp",
                alt: "Workbench DevOps Playground après un rollback Docker local, avec pipeline validé et réponse HTTP 200 du service",
                label: "Rollback Docker",
                caption: "Docker local · Retour à la version 1.0.0, vérification de la santé du service et preuves de réalisation de la mission.",
            },
            {
                src: "/images/devops-playground-pipeline.webp",
                alt: "Pipeline simulé montrant une release en échec à l’étape verify, les journaux et les sondes de monitoring",
                label: "Incident de livraison",
                caption: "Simulation navigateur · La version 1.1.0 passe les tests et le build, puis échoue au démarrage. Les observations permettent de diagnostiquer l’incident.",
            },
            {
                src: "/images/devops-playground-mission.webp",
                alt: "Mission Restore the API terminée dans le simulateur, avec terminal, conteneur healthy et contrôle HTTP 200",
                label: "Mission guidée",
                caption: "Simulation navigateur · Restauration d’une API arrêtée avec lecture des logs, démarrage du conteneur et contrôle de son endpoint de santé.",
            },
        ],
        featured: true,
        category: "DEVOPS & CI/CD",
        context: "Projet · Laboratoire interactif",
        role: "Conception du workbench, moteur de missions et orchestration Docker",
        description: [
            "DevOps Playground transforme une API Express en laboratoire d’exploitation. Les panneaux Docker, logs, terminal, monitoring et pipeline partagent le même état de session. Les missions sont validées par des observations techniques, comme une réponse HTTP 200 ou la version attendue du service.",
            "La démo navigateur s’appuie sur un simulateur déterministe. Le mode Docker local orchestre de vrais conteneurs via un runner isolé : tests, construction d’image, déploiement, vérification et rollback vers la dernière version saine.",
            "Les missions de stockage couvrent AWS S3 et Azure Blob. En mode local, elles utilisent les émulateurs Moto et Azurite, avec vérification des écritures et lectures par le service.",
            "L’architecture sépare le moteur métier, l’interface React, l’API de contrôle et le runner Docker. GitHub Actions vérifie les tests unitaires, les parcours Playwright et les intégrations Docker et stockage.",
        ],
        githubUrl: "https://github.com/Nadjide/devops-playground",
        technologies: ["React", "Node.js", "Docker", "GitHub Actions", "Vite", "Express", "Docker Compose", "Docker Engine API", "Moto (S3)", "Azurite (Blob)", "Vitest", "Playwright"],
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
