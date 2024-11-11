export interface ProjectData {
    id: string;
    title: string;
    description: string[];
    imageSrc: string;
    videoSrc?: string;
    technologies: string[];
}

export const projectsData: ProjectData[] = [
    {
        id: "1",
        title: "Application STATS LIVE",
        description: [
            "Application Stats Live est un projet d'entreprise ambitieux que j'ai entièrement conçu et développé de manière autonome, depuis la création de l'interface utilisateur jusqu'à l'intégration d'une base de données déjà existante. Destinée à une entreprise de télémarketing, cette application est un outil essentiel pour optimiser la gestion des employés, ainsi que pour offrir une visibilité complète sur les performances individuelles et d'équipe.",
            "L'application dispose d'un module de gestion des employés avec suivi des vacations, ainsi que d'un système de connexion pour enregistrer en temps réel la présence et l’activité des collaborateurs. En particulier, Stats Live permet de visualiser les statistiques de performance des télévendeurs de manière granulaire : par équipe, par individu, ainsi qu’une vue d’ensemble pour des analyses globales. Elle présente des indicateurs de performance, des objectifs, et des résultats qui sont essentiels pour piloter les équipes et améliorer les stratégies opérationnelles.",
            "Les superviseurs bénéficient d'une vue complète des statistiques, leur permettant d’analyser les résultats et de réajuster les équipes pour maximiser l'efficacité. Quant aux télévendeurs, ils ont accès à une interface dédiée où ils peuvent consulter leurs propres performances, ce qui favorise l’auto-évaluation et l’engagement.",
            "Grâce à cette application, Stats Live devient un atout majeur pour l’entreprise, en offrant des insights qui permettent de mieux comprendre les performances, de fixer des objectifs précis et de créer un environnement de travail compétitif et motivant. C'est à ce jour le plus gros projet que j'ai mené à bien en entreprise, un projet qui incarne mon engagement envers la qualité et l'efficacité, tout en contribuant à une meilleure gestion des ressources humaines et à l’amélioration continue des performances.",
        ],
        imageSrc: "/images/stats_live.png",
        videoSrc: "/videos/stats_live_demo.mp4",
        technologies: ["HTML", "CSS", "JavaScript", "FLASK", "MySQL"],
    },
    {
        id: "2",
        title: "Sites multi-associations",
        description: "Développement de sites pour plusieurs associations en interne.",
        imageSrc: "/images/multi_association.png",
        videoSrc: "/videos/multi_association_demo.mp4",
        technologies: ["HTML", "CSS"],
    },
    {
        id: "3",
        title: "Integrateur de donnees automatise",
        description: "Outil d'intégration de données automatisé pour la synchronisation des bases de données.",
        imageSrc: "/images/data_integrator.png",
        videoSrc: "/videos/data_integrator_demo.mp4",
        technologies: ["Python", "Polars", "MySQL", "DuckDB"],
    },
    {
        id: "4",
        title: "STATS LIVE 2.0",
        description: "Version améliorée de l'application STATS LIVE avec de nouvelles fonctionnalités et optimisations.",
        imageSrc: "/images/stats_live_2.png",
        videoSrc: "/videos/stats_live_2_demo.mp4",
        technologies: ["Next.js", "TMaterial UI", "TypeScript", "MySQL"],
    },
    {
        id: "5",
        title: "CRM interne",
        description: "Développement d'un CRM interne pour la gestion des clients et des leads.",
        imageSrc: "/images/crm_interne.png",
        videoSrc: "/videos/crm_interne_demo.mp4",
        technologies: ["React", "FastAPI", "Node.js", "MongoDB"],
    },
    {
        id: "6",
        title: "Templates d'emails en HTML",
        description: "Création de templates d'emails en HTML pour des communications internes.",
        imageSrc: "/images/email_templates.png",
        videoSrc: "/videos/email_templates_demo.mp4",
        technologies: ["HTML", "CSS"],
    },
    {
        id: "7",
        title: "Exploree",
        description: "Application de découverte de nouveaux lieux et d'activités basée sur les préférences des utilisateurs.",
        imageSrc: "/images/exploree.png",
        videoSrc: "/videos/exploree_demo.mp4",
        technologies: ["React Native", "Firebase", "JavaScript"],
    },
    {
        id: "8",
        title: "Smart Hire",
        description: "Plateforme de recrutement intelligente facilitant la mise en relation entre recruteurs et candidats.",
        imageSrc: "/images/smart_hire.png",
        videoSrc: "/videos/smart_hire_demo.mp4",
        technologies: ["React Native", "Firebase", "JavaScript"],

    },
    {
        id: "9",
        title: "Pokedex",
        description: "Application pour explorer et découvrir des informations sur les Pokémon.",
        imageSrc: "/images/pokedex.png",
        videoSrc: "/videos/pokedex_demo.mp4",
        technologies: ["React", "Material UI", "PokeAPI"],
    },
    {
        id: "10",
        title: "Movie App",
        description: "Application permettant de rechercher et de découvrir des films avec des informations détaillées.",
        imageSrc: "/images/movie_app.png",
        videoSrc: "/videos/movie_app_demo.mp4",
        technologies: ["React", "Material UI", "The TMDB API"],
    }
];