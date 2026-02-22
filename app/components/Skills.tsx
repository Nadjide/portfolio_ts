"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
    {
        category: "Frontend Modern & UI",
        items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Material UI"],
        gradient: "from-blue-400 to-indigo-600"
    },
    {
        category: "Backend & API",
        items: ["Node.js", "FastAPI", "Python", "Prisma", "Express", "REST/GraphQL"],
        gradient: "from-emerald-400 to-green-600"
    },
    {
        category: "Data Science & IA",
        items: ["Polars", "Pandas", "DuckDB", "Ollama (Local LLM)", "Mistral AI", "PowerBI"],
        gradient: "from-purple-400 to-pink-600"
    },
    {
        category: "DevOps & Cloud",
        items: ["Docker", "Terraform", "Ansible", "GitHub Actions", "AWS", "Nginx"],
        gradient: "from-orange-400 to-red-600"
    },
    {
        category: "Base de Données",
        items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "SQLite", "Redis"],
        gradient: "from-cyan-400 to-blue-600"
    },
    {
        category: "Mobile & Cross-Platform",
        items: ["React Native", "Expo", "Android", "iOS", "PWA"],
        gradient: "from-yellow-400 to-amber-600"
    },
];

const Skills = () => {
    return (
        <section id="skills" className="py-32 px-6 relative overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24 space-y-4"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                        Arsenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Technologique</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Une expertise complète, du <strong className="text-gray-800 dark:text-gray-200 font-bold">développement web</strong> à l'<strong>intelligence artificielle</strong>.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {skills.map((group, index) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group relative p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            {/* Card Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                    {group.category}
                                </h3>
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${group.gradient} opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500`} />
                            </div>

                            {/* Skills Tag Cloud */}
                            <div className="flex flex-wrap gap-2.5">
                                {group.items.map((tech) => (
                                    <span 
                                        key={tech}
                                        className="px-3.5 py-1.5 text-sm font-medium rounded-lg 
                                        bg-white dark:bg-white/5 
                                        text-gray-600 dark:text-gray-300 
                                        border border-gray-200 dark:border-white/10 shadow-sm
                                        group-hover:border-transparent
                                        group-hover:bg-gradient-to-r
                                        transition-all duration-300
                                        cursor-default
                                        hover:!bg-gray-100 dark:hover:!bg-white/10"
                                        style={{
                                            // Dynamic style for hover effect managed via CSS variables in future or inline here
                                        }}
                                    >
                                        <span className="relative z-10">{tech}</span>
                                    </span>
                                ))}
                            </div>

                            {/* Decorative Corner */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${group.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-tr-3xl`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
