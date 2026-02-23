export interface ProjectData {
    id: string;
    title: string;
    description: string[];
    imageSrc: string;
    videoSrc?: string;
    technologies: string[];
    featured?: boolean;
    year?: string;
    role?: string;
    context?: string; // "Entreprise" or "Projet École"
}

export const projectsData: ProjectData[] = [
    // ─── Projets Phares ───────────────────────────────────────────────────────
    {
        id: "11",
        title: "Sonar",
        featured: true,
        year: "2025 - 2026",
        context: "Entreprise",
        role: "Conception & Développement Full Stack",
        description: [
            "Sonar est l'un de mes projets d'entreprise les plus ambitieux, conçu pour répondre à un besoin concret et stratégique : transformer le processus d'écoute et d'évaluation des appels en un véritable outil de pilotage de la qualité pour les centres de contact.",
            "Développé pour Call To Action et ses clients caritatifs — parmi lesquels Amnesty International et les Restos du Cœur — Sonar centralise l'ensemble du cycle d'évaluation au sein d'une plateforme intelligente et intuitive. L'évaluateur dispose d'une interface tout-en-un lui permettant d'écouter un appel et de remplir dynamiquement la grille de notation en temps réel, sans rupture dans son flux de travail.",
            "L'application intègre une fonctionnalité de transcription assistée, permettant de repérer instantanément les moments clés d'un appel sans avoir à tout réécouter. Un système de détection d'anomalies génère des alertes automatiques en cas d'oubli de conformité ou de manquement aux règles de politesse, garantissant ainsi un suivi rigoureux de la qualité.",
            "Les tableaux de bord de Sonar offrent une vision claire des performances individuelles et collectives, avec un suivi \"Top & Flop\" permettant aux superviseurs d'identifier rapidement les axes d'amélioration et de valoriser les meilleurs agents. Ces insights sont conçus pour alimenter un accompagnement personnalisé et un coaching ciblé.",
            "Sur le plan de l'innovation, Sonar intègre une couche d'intelligence artificielle permettant d'analyser automatiquement les appels via des prompts dédiés, de pré-remplir les grilles d'évaluation et de générer des feedbacks immédiats — réduisant considérablement le temps d'évaluation tout en augmentant sa pertinence.",
            "Sonar s'inscrit dans un écosystème applicatif cohérent : là où Stats Live pilote la performance chiffrée, Sonar apporte la dimension qualitative indispensable à une gestion complète et équilibrée des équipes. Ensemble, ces deux applications forment un duo complémentaire au service de l'excellence opérationnelle."
        ],
        imageSrc: "/images/sonar.png",
        videoSrc: "/videos/sonar_demo.mp4",
        technologies: ["Next.js", "Tailwind CSS", "TypeScript", "FastAPI", "Python", "IA Local via Ollama et Mistral"],
    },
    {
        id: "4",
        title: "STATS LIVE 2",
        featured: true,
        year: "2025 - 2026",
        context: "Entreprise",
        role: "Refonte & Développement Full Stack",
        description: [
            "Stats Live 2.0 représente une évolution majeure de l'application originale Stats Live, avec un accent particulier mis sur la modernité, l'intuitivité et la puissance. Ce projet a été conçu pour répondre aux besoins croissants de l'entreprise tout en intégrant des technologies plus avancées et des standards de qualité de code améliorés.",
            "Grâce à l'utilisation de frameworks modernes tels que Next.js et TypeScript, l'application offre une interface utilisateur plus fluide et réactive, garantissant une expérience optimale pour les superviseurs et les télévendeurs. Le design a été entièrement repensé avec Material UI pour proposer une interface visuellement attrayante et ergonomique.",
            "Stats Live 2.0 conserve toutes les fonctionnalités essentielles de la première version tout en y ajoutant des optimisations clés. Parmi celles-ci, une meilleure gestion des données, des visualisations améliorées pour les statistiques, et une architecture backend robuste facilitant les analyses en temps réel.",
            "Les superviseurs bénéficient désormais d'outils encore plus précis pour ajuster les stratégies d'équipe, tandis que les télévendeurs disposent d'une interface simplifiée pour suivre leurs performances individuelles. Ce projet incarne une étape significative dans l'amélioration continue de l'efficacité et de la compétitivité des équipes, tout en mettant en avant des technologies de pointe pour répondre aux attentes actuelles.",
            "Stats Live 2.0 reflète mon engagement à fournir des solutions de qualité supérieure, en plaçant l'utilisateur au centre des préoccupations et en adoptant les meilleures pratiques de développement logiciel."
        ],
        imageSrc: "/images/stats_live_2.png",
        videoSrc: "/videos/stats_live_2_demo.mp4",
        technologies: ["Next.js", "Material UI", "TypeScript", "MySQL", "PrismaORM"],
    },
    {
        id: "10",
        title: "Portail CTA",
        featured: true,
        year: "2026",
        context: "Entreprise",
        role: "Architecture & Développement Full Stack",
        description: [
            "Le Portail CTA est un projet d'entreprise que j'ai conçu et développé de manière autonome pour répondre à un besoin stratégique croissant : centraliser l'accès à l'ensemble de l'écosystème applicatif de CTA au sein d'un point d'entrée unique et sécurisé.",
            "Concrètement, il s'agit d'un hub SSO (Single Sign-On) permettant aux collaborateurs de s'authentifier une seule fois pour accéder à l'ensemble des applications internes disponibles — parmi lesquelles Stats Live, Sonar, et d'autres outils métier. Cette approche élimine la multiplicité des identifiants, simplifie l'expérience utilisateur et renforce la sécurité globale du système d'information.",
            "Sur le plan frontend, le portail a été développé avec Next.js et Tailwind CSS pour garantir une interface moderne, rapide et responsive. J'ai intégré Framer Motion pour apporter des transitions et animations fluides, contribuant à une expérience utilisateur soignée et professionnelle.",
            "Le backend repose sur FastAPI (Python), assurant la gestion de l'authentification, la création et la gestion des sessions utilisateurs, ainsi que la communication sécurisée avec les différentes applications de l'écosystème.",
            "Ce projet illustre ma capacité à concevoir des architectures fullstack adaptées à des contraintes d'entreprise réelles, en alliant rigueur technique et souci du détail UX."
        ],
        imageSrc: "/images/portail_cta.png",
        videoSrc: "/videos/portail_cta_demo.mp4",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "FastAPI", "Python"],
    },
    {
        id: "12",
        title: "Sentinel",
        featured: true,
        year: "2025",
        context: "Entreprise",
        role: "Développement Full Stack",
        description: [
            "Sentinel est une application de gestion de parc matériel que j'ai conçue et développée de manière autonome pour répondre à un besoin opérationnel concret : offrir au plateau de l'entreprise un outil fiable et centralisé pour suivre l'ensemble de ses équipements — ordinateurs, casques, écrans et périphériques.",
            "Avant Sentinel, la gestion du matériel reposait sur des suivis manuels disparates, sources d'erreurs et de perte de temps. L'application permet désormais de surveiller plus de 50 équipements en temps réel, avec une gestion précise des états (en service, en stock, défectueux) et un historique complet de chaque modification, garantissant une traçabilité totale.",
            "Sur le plan technique, j'ai adopté une stack volontairement pragmatique et adaptée au besoin réel : Next.js et Tailwind CSS pour le frontend, et SQLite pour la base de données. Ce choix reflète une approche mûrement réfléchie — SQLite est léger, performant pour ce volume de données, et facilement sauvegardable sans infrastructure serveur complexe. Il n'est pas toujours nécessaire de déployer une solution lourde lorsqu'une technologie simple et efficace répond parfaitement aux exigences.",
            "Sentinel illustre parfaitement ma capacité à analyser un besoin réel, à choisir les technologies appropriées et à livrer une solution opérationnelle, bien finie et autonome — des qualités que je considère essentielles dans tout contexte professionnel."
        ],
        imageSrc: "/images/sentinel.png",
        videoSrc: "/videos/sentinel_demo.mp4",
        technologies: ["Next.js", "Tailwind CSS", "TypeScript", "SQLite"],
    },

    // ─── Autres Projets ───────────────────────────────────────────────────────
    {
        id: "1",
        title: "STATS LIVE",
        year: "2023 - 2024",
        context: "Entreprise",
        role: "Conception & Développement Full Stack",
        description: [
            "Stats Live est un projet d'entreprise ambitieux que j'ai entièrement conçu et développé de manière autonome, depuis la création de l'interface utilisateur jusqu'à l'intégration d'une base de données déjà existante. Destinée à une entreprise de télémarketing, cette application est un outil essentiel pour optimiser la gestion des employés, ainsi que pour offrir une visibilité complète sur les performances individuelles et d'équipe.",
            "L'application dispose d'un module de gestion des employés avec suivi des vacations, ainsi que d'un système de connexion pour enregistrer en temps réel la présence et l'activité des collaborateurs. En particulier, Stats Live permet de visualiser les statistiques de performance des télévendeurs de manière granulaire : par équipe, par individu, ainsi qu'une vue d'ensemble pour des analyses globales. Elle présente des indicateurs de performance, des objectifs, et des résultats qui sont essentiels pour piloter les équipes et améliorer les stratégies opérationnelles.",
            "Les superviseurs bénéficient d'une vue complète des statistiques, leur permettant d'analyser les résultats et de réajuster les équipes pour maximiser l'efficacité. Quant aux télévendeurs, ils ont accès à une interface dédiée où ils peuvent consulter leurs propres performances, ce qui favorise l'auto-évaluation et l'engagement.",
            "Grâce à cette application, Stats Live devient un atout majeur pour l'entreprise, en offrant des insights qui permettent de mieux comprendre les performances, de fixer des objectifs précis et de créer un environnement de travail compétitif et motivant. C'est à ce jour le plus gros projet que j'ai mené à bien en entreprise, un projet qui incarne mon engagement envers la qualité et l'efficacité, tout en contribuant à une meilleure gestion des ressources humaines et à l'amélioration continue des performances.",
        ],
        imageSrc: "/images/stats_live.png",
        videoSrc: "/videos/stats_live_demo.mp4",
        technologies: ["HTML", "Bootstrap", "JavaScript", "FLASK", "MySQL"],
    },
    {
        id: "2",
        title: "Sites multi associations",
        year: "2022",
        context: "Entreprise",
        role: "Développement Frontend & Scripting",
        description: [
            "Dans le cadre de l'entreprise, ce projet avait pour objectif la création de templates de mini-sites en interne pour les télévendeurs. Ces mini-sites, intégrés dans le logiciel Nixxis et créés avec E-Script de SeaSoftware, permettaient de fournir aux télévendeurs un script prédéfini à suivre lors des appels de collecte de dons.",
            "Chaque mini-site donnait aux télévendeurs une vue claire des informations des personnes appelées, facilitant ainsi leur suivi et permettant aux superviseurs de structurer les dialogues avec des scripts adaptés. Ces outils visaient à améliorer l'efficacité des appels et à standardiser les échanges avec les donateurs potentiels.",
            "Ces sites servaient également à collecter des données sur les appels, permettant aux superviseurs de suivre les performances des télévendeurs et d'ajuster les scripts en fonction des retours d'expérience. Les mini-sites étaient conçus pour être facilement modifiables et adaptables à différents types d'associations, offrant ainsi une solution flexible et évolutive pour les campagnes de collecte de dons.",
        ],
        imageSrc: "/images/multi_association.png",
        videoSrc: "/videos/multi_association_demo.mp4",
        technologies: ["HTML", "CSS", "JavaScript", "E-Script", "Nixxis"],
    },
    {
        id: "3",
        title: "Integrateur de donnees automatise",
        year: "2023",
        context: "Entreprise",
        role: "Développement Python & Automation",
        description: [
            "L'intégrateur de données automatique est un projet pour automatiser le processus d'intégration de données provenant de différentes sources clientes. L'objectif était de créer des scripts simples et efficaces pour collecter, nettoyer et intégrer des données de manière automatisée.",
            "Ces fichiers clients étaient stockés dans des formats variés (CSV, Excel, etc.) et nécessitaient un traitement manuel pour être intégrés dans une base de données. L'intégrateur de données automatique permettait de simplifier ce processus en automatisant les tâches répétitives.",
        ],
        imageSrc: "/images/data_integrator.png",
        videoSrc: "/videos/data_integrator_demo.mp4",
        technologies: ["Python", "Polars", "MySQL", "DuckDB"],
    },
    {
        id: "7",
        title: "Exploree",
        year: "2025",
        context: "Projet École",
        role: "Co-développement Mobile & Backend",
        description: [
            "Exploree est une application mobile innovante qui combine les concept de REELS pour offrir une expérience immersive et rapide, centrée sur la découverte de restaurants et d'activités. L'idée est de proposer un format de contenu sous forme de reels, permettant aux utilisateurs de visualiser rapidement des recommandations grâce à des vidéos engageantes et dynamiques.",
            "Le projet a débuté en troisième année d'école en tant que projet de groupe, réunissant une équipe de quatre développeurs, dont moi-même. Grâce à une collaboration étroite, nous avons pu poser les bases de cette application ambitieuse qui vise à transformer la façon dont les utilisateurs découvrent des lieux et des expériences. À l'heure actuelle, Exploree est devenu un projet à part entière, toujours en cours de développement, avec une vision tournée vers l'optimisation de la visibilité pour les restaurateurs et les organisateurs d'activités.",
            "Mon rôle dans l'équipe de développement a consisté à collaborer étroitement sur les fonctionnalités clés de l'application, telles que le flux de reels, les interactions utilisateur (likes, commentaires), ainsi que l'architecture backend pour la gestion des données. En utilisant des technologies modernes comme React Native, Expo, et MongoDB, nous avons pu créer une application fluide et performante, adaptée aux besoins d'un public jeune et connecté.",
            "Exploree incarne la convergence entre technologie et lifestyle, offrant une plateforme qui révolutionne la manière dont les utilisateurs trouvent et partagent des expériences locales. Ce projet reste un défi passionnant et une opportunité d'appliquer des compétences avancées dans le développement d'applications mobiles modernes."
        ],
        imageSrc: "/images/exploree.png",
        videoSrc: "/videos/exploree_demo.mp4",
        technologies: ["React Native", "MongoDB", "Expo", "JavaScript"],
    },
    {
        id: "8",
        title: "Smart Hire",
        year: "2024",
        context: "Projet École",
        role: "Développement Full Stack & IA",
        description: [
            "Smart Hire est une application innovante développée dans le cadre d'un projet scolaire, conçue pour révolutionner le processus de recrutement RH grâce à l'intelligence artificielle et à une personnalisation poussée. L'objectif principal de l'application est de faciliter la sélection des candidats en offrant des outils complets d'évaluation et d'analyse des performances.",
            "L'application propose un système de questionnaires dynamiques, générés automatiquement par l'IA ou personnalisés par les recruteurs selon leurs besoins. Les données collectées sont stockées dans une base de données robuste, permettant de sauvegarder les questions créées pour enrichir constamment le pool de données disponible. Chaque questionnaire est structuré autour de thématiques spécifiques pour garantir une évaluation précise et pertinente des compétences des candidats.",
            "Smart Hire intègre également un système avancé de comparaison des scores, permettant aux recruteurs d'évaluer les candidats sur la base de graphiques interactifs et de statistiques détaillées. Ces visualisations offrent une vue d'ensemble des performances par thématique, par candidat, et permettent de prendre des décisions éclairées grâce à des données objectives.",
            "Ce projet représente un exemple abouti d'application RH moderne, combinant une interface utilisateur intuitive et des fonctionnalités puissantes pour optimiser le processus de recrutement. Mon rôle principal a été de développer l'application avec React Native pour l'interface mobile, TypeScript pour une typage strict et FastAPI pour gérer efficacement les données et les fonctionnalités backend."
        ],
        imageSrc: "/images/smart_hire.png",
        videoSrc: "/videos/smart_hire_demo.mp4",
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
        imageSrc: "/images/pokedex.png",
        videoSrc: "/videos/pokedex_demo.mp4",
        technologies: ["React", "Material UI", "PokeAPI"],
    },
];
