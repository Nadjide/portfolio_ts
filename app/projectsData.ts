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
        technologies: ["HTML", "Bootstrap", "JavaScript", "FLASK", "MySQL"],
    },
    {
        id: "2",
        title: "Sites multi associations",
        description: [
            "Dans le cadre de l'entreprise, ce projet avait pour objectif la création de templates de mini-sites en interne pour les télévendeurs. Ces mini-sites, intégrés dans le logiciel Nixxis et créés avec E-Script de SeaSoftware, permettaient de fournir aux télévendeurs un script prédéfini à suivre lors des appels de collecte de dons.",
            "Chaque mini-site donnait aux télévendeurs une vue claire des informations des personnes appelées, facilitant ainsi leur suivi et permettant aux superviseurs de structurer les dialogues avec des scripts adaptés. Ces outils visaient à améliorer l'efficacité des appels et à standardiser les échanges avec les donateurs potentiels.",
            "Ces sites servaient également à collecter des données sur les appels, permettant aux superviseurs de suivre les performances des télévendeurs et d'ajuster les scripts en fonction des retours d'expérience. Les mini-sites étaient conçus pour être facilement modifiables et adaptables à différents types d'associations, offrant ainsi une solution flexible et évolutive pour les campagnes de collecte de dons.",
        ],
        imageSrc: "/images/multi_association.png",
        videoSrc: "/videos/multi_association_demo.mp4",
        technologies: ["HTML", "CSS"],
    },
    {
        id: "3",
        title: "Integrateur de donnees automatise",
        description: [
            "L'intégrateur de données automatique est un projet pour automatiser le processus d'intégration de données provenant de différentes sources clientes. L'objectif était de créer des scripts simples et efficaces pour collecter, nettoyer et intégrer des données de manière automatisée.",
            "Ces fichiers clients étaient stockés dans des formats variés (CSV, Excel, etc.) et nécessitaient un traitement manuel pour être intégrés dans une base de données. L'intégrateur de données automatique permettait de simplifier ce processus en automatisant les tâches répétitives.",
        ],
        imageSrc: "/images/data_integrator.png",
        videoSrc: "/videos/data_integrator_demo.mp4",
        technologies: ["Python", "Polars", "MySQL", "DuckDB"],
    },
    {
        id: "4",
        title: "STATS LIVE 2.0",
        description: [
            
        ],
        imageSrc: "/images/stats_live_2.png",
        videoSrc: "/videos/stats_live_2_demo.mp4",
        technologies: ["Next.js", "Material UI", "TypeScript", "MySQL"],
    },
    {
        id: "7",
        title: "Exploree",
        description: [],
        imageSrc: "/images/exploree.png",
        videoSrc: "/videos/exploree_demo.mp4",
        technologies: ["React Native", "MongoDB", "Expo", "JavaScript"],
    },
    {
        id: "8",
        title: "Smart Hire",
        description: [],
        imageSrc: "/images/smart_hire.png",
        videoSrc: "/videos/smart_hire_demo.mp4",
        technologies: ["React Native", "Firebase", "JavaScript"],

    },
    {
        id: "9",
        title: "Pokedex",
        description: [],
        imageSrc: "/images/pokedex.png",
        videoSrc: "/videos/pokedex_demo.mp4",
        technologies: ["React", "Material UI", "PokeAPI"],
    },
    {
        id: "10",
        title: "Movie App",
        description: [],
        imageSrc: "/images/movie_app.png",
        videoSrc: "/videos/movie_app_demo.mp4",
        technologies: ["React", "Material UI", "The TMDB API"],
    }
];