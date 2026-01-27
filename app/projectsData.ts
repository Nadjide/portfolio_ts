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
        technologies: ["HTML", "CSS", "JavaScript", "E-Script", "Nixxis"],
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
        title: "STATS LIVE 2",
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
        id: "7",
        title: "Exploree",
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
        description: [
            "Pokedex est un projet scolaire développé dans le cadre d'un exercice visant à créer une application ergonomique et performante en utilisant React et Material UI. L'objectif principal était de construire une application intuitive et rapide, tout en intégrant des fonctionnalités avancées pour enrichir l'expérience utilisateur.",
            "L'application permet de consulter des informations détaillées sur tous les Pokémon, en s'appuyant sur la PokeAPI. J'ai enrichi le projet en ajoutant plusieurs fonctionnalités innovantes :",
            "<ul class='list-disc pl-5 space-y-2'>",
            "<li><strong>Internationalisation :</strong> L'application prend en charge plusieurs langues, rendant l'expérience accessible à un public international.</li>",
            "<li><strong>Tri par type :</strong> Les utilisateurs peuvent facilement trier les Pokémon en fonction de leur type (eau, feu, plante, etc.), offrant une navigation simplifiée et ciblée.</li>",
            "<li><strong>Recommandations intelligentes :</strong> Lorsqu'un utilisateur consulte les détails d'un Pokémon, l'application propose des recommandations de Pokémon similaires basées sur des caractéristiques partagées.</li>",
            "</ul>",
            "<p>Le site est disponible en ligne :</p>",
            "<p class='font-bold text-purple-500 text-lg'><a href='https://pokedex-pi-brown.vercel.app/' target='_blank'>➡️ Consulter le Pokedex en ligne</a></p>",
            "<p>Ce projet a été une excellente opportunité pour approfondir mes compétences en React, en gestion d'état avec des bibliothèques modernes, et en conception d'interfaces ergonomiques avec Material UI. Il représente un bel exemple de projet d'étude où l'innovation et l'expérience utilisateur sont au cœur de la conception.</p>"
        ],
        imageSrc: "/images/pokedex.png",
        videoSrc: "/videos/pokedex_demo.mp4",
        technologies: ["React", "Material UI", "PokeAPI"],
    },
];