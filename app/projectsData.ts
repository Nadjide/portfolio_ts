export interface ProjectData {
    id: string;
    title: string;
    description: string[];
    imageSrc: string;
    videoSrc?: string;
    githubUrl?: string;
    technologies: string[];
    featured?: boolean;
    year?: string;
    role?: string;
    context?: string;
}

export const projectsData: ProjectData[] = [
    // ─── Projets conservés ───────────────────────────────────────────────────
    {
        id: "13",
        title: "Stajio",
        featured: true,
        year: "2026",
        context: "Projet personnel / Projet de portfolio",
        role: "Conception full-stack, architecture backend, intégration IA locale et refonte technique du projet",
        description: [
            "Stajio est une application conçue pour aider les étudiants en alternance ou en stage à structurer leur expérience et à valoriser leur travail tout au long de l’année. L’idée du projet est de proposer un espace unique pour saisir son journal de bord, suivre ses deadlines importantes et générer automatiquement des contenus utiles comme un rapport de stage, une préparation à la soutenance ou des points CV.",
            "Le projet a été entièrement refondu autour de Next.js 16 avec une architecture moderne et plus maintenable. Le backend repose sur des route handlers natifs, tandis que les données sont stockées localement dans une base SQLite. L’intelligence artificielle fonctionne en local via Ollama, ce qui permet de supprimer la dépendance à des clés API cloud et de garder une logique plus simple, plus privée et plus maîtrisée.",
            "Mon travail sur Stajio m’a permis de mettre en place une architecture full-stack cohérente, de gérer l’authentification avec JWT en cookie HTTP-only, de structurer les données métier et d’intégrer une expérience utilisateur fluide avec un design responsive et une navigation claire. Le projet inclut aussi des fonctionnalités d’export PDF, de génération de contenus IA et de suivi de progression, avec une attention particulière portée à la lisibilité du code et à la modularité.",
            "Stajio reflète une approche orientée produit, avec un vrai cas d’usage concret, une stack moderne et une logique local-first qui le distingue des projets classiques."
        ],
        imageSrc: "/images/stajio.svg",
        githubUrl: "https://github.com/Nadjide/stajio",
        technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "SQLite", "Ollama", "JWT", "Framer Motion"],
    },
    {
        id: "7",
        title: "Exploree",
        featured: true,
        year: "2025",
        context: "Projet École",
        role: "Co-développement Mobile & Backend",
        description: [
            "Exploree est une application mobile innovante qui combine les concept de REELS pour offrir une expérience immersive et rapide, centrée sur la découverte de restaurants et d'activités. L'idée est de proposer un format de contenu sous forme de reels, permettant aux utilisateurs de visualiser rapidement des recommandations grâce à des vidéos engageantes et dynamiques.",
            "Le projet a débuté en troisième année d'école en tant que projet de groupe, réunissant une équipe de quatre développeurs, dont moi-même. Grâce à une collaboration étroite, nous avons pu poser les bases de cette application ambitieuse qui vise à transformer la façon dont les utilisateurs découvrent des lieux et des expériences. À l'heure actuelle, Exploree est devenu un projet à part entière, toujours en cours de développement, avec une vision tournée vers l'optimisation de la visibilité pour les restaurateurs et les organisateurs d'activités.",
            "Mon rôle dans l'équipe de développement a consisté à collaborer étroitement sur les fonctionnalités clés de l'application, telles que le flux de reels, les interactions utilisateur (likes, commentaires), ainsi que l'architecture backend pour la gestion des données. En utilisant des technologies modernes comme React Native, Expo, et MongoDB, nous avons pu créer une application fluide et performante, adaptée aux besoins d'un public jeune et connecté.",
            "Exploree incarne la convergence entre technologie et lifestyle, offrant une plateforme qui révolutionne la manière dont les utilisateurs trouvent et partagent des expériences locales. Ce projet reste un défi passionnant et une opportunité d'appliquer des compétences avancées dans le développement d'applications mobiles modernes."
        ],
        imageSrc: "/images/exploree.jpg",
        videoSrc: "/videos/optimized/exploree_demo.mp4",
        technologies: ["React Native", "MongoDB", "Expo", "JavaScript"],
    },
    {
        id: "8",
        title: "Smart Hire",
        featured: true,
        year: "2024",
        context: "Projet École",
        role: "Développement Full Stack & IA",
        description: [
            "Smart Hire est une application innovante développée dans le cadre d'un projet scolaire, conçue pour révolutionner le processus de recrutement RH grâce à l'intelligence artificielle et à une personnalisation poussée. L'objectif principal de l'application est de faciliter la sélection des candidats en offrant des outils complets d'évaluation et d'analyse des performances.",
            "L'application propose un système de questionnaires dynamiques, générés automatiquement par l'IA ou personnalisés par les recruteurs selon leurs besoins. Les données collectées sont stockées dans une base de données robuste, permettant de sauvegarder les questions créées pour enrichir constamment le pool de données disponible. Chaque questionnaire est structuré autour de thématiques spécifiques pour garantir une évaluation précise et pertinente des compétences des candidats.",
            "Smart Hire intègre également un système avancé de comparaison des scores, permettant aux recruteurs d'évaluer les candidats sur la base de graphiques interactifs et de statistiques détaillées. Ces visualisations offrent une vue d'ensemble des performances par thématique, par candidat, et permettent de prendre des décisions éclairées grâce à des données objectives.",
            "Ce projet représente un exemple abouti d'application RH moderne, combinant une interface utilisateur intuitive et des fonctionnalités puissantes pour optimiser le processus de recrutement. Mon rôle principal a été de développer l'application avec React Native pour l'interface mobile, TypeScript pour une typage strict et FastAPI pour gérer efficacement les données et les fonctionnalités backend."
        ],
        imageSrc: "/images/smart_hire.jpg",
        videoSrc: "/videos/optimized/smart_hire_demo.mp4",
        technologies: ["React Native", "TypeScript", "FASTAPI"],
    },
    {
        id: "9",
        title: "Pokedex",
        year: "2024",
        context: "Projet École",
        role: "Développement Frontend",
        description: [
            "Pokedex est un projet scolaire développé dans le cadre d'un exercice visant à créer une application ergonomique et performante en utilisant React et Material UI. L'objectif principal était de construire une application intuitive et rapide, tout en intégrant des fonctionnalités avancées pour enrichir l'expérience utilisateur.",
            "L'application permet de consulter des informations détaillées sur tous les Pokémon, en s'appuyant sur la PokeAPI. J'ai enrichi le projet en ajoutant plusieurs fonctionnalités innovantes:",
            "Internationalisation: L'application prend en charge plusieurs langues, rendant l'expérience accessible à un public international.",
            "Tri par type: Les utilisateurs peuvent facilement trier les Pokémon en fonction de leur type (eau, feu, plante, etc.), offrant une navigation simplifiée et ciblée.",
            "Recommandations intelligentes: Lorsqu'un utilisateur consulte les détails d'un Pokémon, l'application propose des recommandations de Pokémon similaires basées sur des caractéristiques partagées.",
            "Le site est disponible en ligne: https://pokedex-pi-brown.vercel.app/",
            "Ce projet a été une excellente opportunité pour approfondir mes compétences en React, en gestion d'état avec des bibliothèques modernes, et en conception d'interfaces ergonomiques avec Material UI. Il représente un bel exemple de projet d'étude où l'innovation et l'expérience utilisateur sont au cœur de la conception."
        ],
        imageSrc: "/images/pokedex.jpg",
        videoSrc: "/videos/optimized/pokedex_demo.mp4",
        technologies: ["React", "Material UI", "PokeAPI"],
    },
];
