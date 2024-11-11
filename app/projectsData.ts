export interface ProjectData {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    videoSrc?: string;
}

export const projectsData: ProjectData[] = [
    {
        id: "1",
        title: "Application STATS LIVE",
        description: "Application de visualisation en temps réel pour les performances de vente.",
        imageSrc: "/images/stats_live.png",
        videoSrc: "/videos/stats_live_demo.mp4",
    },
    {
        id: "2",
        title: "Sites multi-associations",
        description: "Développement de sites pour plusieurs associations en interne.",
        imageSrc: "/images/multi_association.png",
    },
    {
        id: "3",
        title: "Integrateur de donnees automatise",     
        description: "Outil d'intégration de données automatisé pour la synchronisation des bases de données.",
        imageSrc: "/images/data_integrator.png",
    },
    {
        id: "4",
        title: "STATS LIVE 2.0",
        description: "Version améliorée de l'application STATS LIVE avec de nouvelles fonctionnalités et optimisations.",
        imageSrc: "/images/stats_live_2.png",
        videoSrc: "/videos/stats_live_2_demo.mp4",
    },
    {
        id: "5",
        title: "CRM interne",
        description: "Développement d'un CRM interne pour la gestion des clients et des leads.",
        imageSrc: "/images/crm_interne.png",
    },
    {
        id: "6",
        title: "Templates d'emails en HTML",
        description: "Création de templates d'emails en HTML pour des communications internes.",
        imageSrc: "/images/email_templates.png",
    },
    {
        id: "7",
        title: "Exploree",
        description: "Application de découverte de nouveaux lieux et d'activités basée sur les préférences des utilisateurs.",
        imageSrc: "/images/exploree.png",
        videoSrc: "/videos/exploree_demo.mp4",
    },
    {
        id: "8",
        title: "Smart Hire",
        description: "Plateforme de recrutement intelligente facilitant la mise en relation entre recruteurs et candidats.",
        imageSrc: "/images/smart_hire.png",
    },
    {
        id: "9",
        title: "Pokedex",
        description: "Application pour explorer et découvrir des informations sur les Pokémon.",
        imageSrc: "/images/pokedex.png",
    },
    {
        id: "10",
        title: "Movie App",
        description: "Application permettant de rechercher et de découvrir des films avec des informations détaillées.",
        imageSrc: "/images/movie_app.png",
    }
];