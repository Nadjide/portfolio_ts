"use client";

import React from "react";
import { motion } from "framer-motion";

const formations = [
    {
        id: 1,
        title: "BTS SIO SLAM",
        subtitle: "Services Informatiques aux Organisations",
        company: "Campus Riera",
        address: "64 Av. Valéry Giscard d'Estaing, Immeuble HERMES, 06200 Nice",
        date: "2021 — 2023",
        achievements: [
            "Création d'un site Laravel de gestion d'agence immobilière.",
            "Création d'un site météo avec l'API OpenWeather.",
            "Développement d'applications web en PHP, JavaScript.",
        ],
        tech: ["PHP", "Laravel", "JavaScript", "SQL", "HTML/CSS"],
    },
    {
        id: 2,
        title: "Bachelor 3 Développement Informatique",
        subtitle: "",
        company: "Sophia Ynov Campus",
        address: "Pl. Sophie Laffitte, Immeuble AGORA, 06560 Valbonne, Sophia Antipolis",
        date: "2023 — 2024",
        achievements: [
            "Création d'un Pokedex interactif avec React et Material UI.",
            "Mise en place de CI/CD avec Docker.",
            "Création d'un site utilisant l'API Movie Database.",
            "Gestion d'une bibliothèque en Java.",
        ],
        tech: ["Docker", "Java", "React", "API REST"],
    },
    {
        id: 3,
        title: "Mastère Expert Développement Full Stack",
        subtitle: "",
        company: "Sophia Ynov Campus",
        address: "Pl. Sophie Laffitte, Immeuble AGORA, 06560 Valbonne, Sophia Antipolis",
        date: "2024 — 2026",
        achievements: [
            "Projet Exploree : Application mobile de recommandation.",
            "Projet Smart Hire : Application RH avec IA pour le recrutement.",
            "Pipeline CI/CD avec Terraform, GitHub Actions, Ansible et déploiement AWS.",
            "Architecture Logicielle et bonnes pratiques.",
        ],
        tech: ["Terraform", "Ansible", "AWS", "React Native", "GitHub Actions"],
    },
];

const experiences = [
    {
        id: 1,
        title: "Développeur Full Stack & DevOps",
        company: "Call To Action (CTA)",
        date: "2021 — 2026",
        description:
            "Conception, développement et déploiement d'applications métiers critiques en alternance. Prise en charge complète du cycle de vie logiciel, de l'architecture à la mise en production.",
        achievements: [
            "Sonar : Plateforme d'évaluation qualité commerciale avec intégration IA.",
            "Stats Live 2.0 : Refonte complète du dashboard de statistiques en temps réel.",
            "Portail CTA : Hub SSO centralisant l'accès à toutes les applications internes.",
            "Sentinel : Outil de gestion de parc matériel et logiciel.",
            "Création de mini-sites pour des campagnes de collecte de dons.",
            "Gestion de projets informatiques en méthode Agile.",
            "Développement de scripts d'intégration de données (Python, Polars).",
        ],
        tech: ["Next.js", "TypeScript", "FastAPI", "Python", "Polars", "Docker", "Tailwind CSS"],
    },
];

const Experience = () => {
    return (
        <section className="py-20 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-300" id="experience">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-3 text-center text-gray-900 dark:text-white transition-colors duration-300"
            >
                Mon{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Parcours</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center text-gray-500 dark:text-gray-400 mb-16 text-sm max-w-2xl mx-auto"
            >
                De mes premières formations à l'expertise Full Stack en entreprise.
            </motion.p>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* ── COLONNE GAUCHE : Parcours Scolaire ── */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3"
                    >
                        <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            &#127891;
                        </span>
                        Parcours Scolaire
                    </motion.h3>

                    <div className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-800/60 space-y-10">
                        {formations.map((f, i) => (
                            <motion.div
                                key={f.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="relative"
                            >
                                {/* Dot */}
                                <div className="absolute -left-[calc(1.5rem+5px)] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] border-2 border-white dark:border-[#0a0a0a]" />

                                <span className="inline-block px-2.5 py-0.5 mb-2 text-xs font-semibold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                                    {f.date}
                                </span>
                                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{f.title}</h4>
                                {f.subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-1">{f.subtitle}</p>}
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-0.5">{f.company}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{f.address}</p>

                                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1.5 mb-3">
                                    {f.achievements.map((a, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <span className="text-blue-400 mt-0.5 shrink-0">▹</span>
                                            <span>{a}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1.5">
                                    {f.tech.map((t) => (
                                        <span key={t} className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── COLONNE DROITE : Expérience Professionnelle ── */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3"
                    >
                        <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                            &#128188;
                        </span>
                        Expérience Professionnelle
                    </motion.h3>

                    <div className="relative pl-6 border-l-2 border-cyan-200 dark:border-cyan-800/60 space-y-10">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="relative"
                            >
                                {/* Dot */}
                                <div className="absolute -left-[calc(1.5rem+5px)] top-1.5 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)] border-2 border-white dark:border-[#0a0a0a]" />

                                <span className="inline-block px-2.5 py-0.5 mb-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 rounded-full">
                                    {exp.date}
                                </span>
                                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{exp.title}</h4>
                                <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-2">{exp.company}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{exp.description}</p>

                                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1.5 mb-4">
                                    {exp.achievements.map((a, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                                            <span>{a}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1.5">
                                    {exp.tech.map((t) => (
                                        <span key={t} className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
