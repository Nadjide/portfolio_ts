"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const skills = {
    "Front-end": [
        { name: "React.js", img: "/langProg/react.png" },
        { name: "Next.js", img: "/langProg/nextjs.png" },
        { name: "React Native", img: "/langProg/reactnative.png" },
    ],
    "Back-end": [
        { name: "Node.js", img: "/langProg/node.png" },
        { name: "Express.js", img: "/langProg/express.png" },
        { name: "Flask", img: "/langProg/flask.png" },
        { name: "FastAPI", img: "/langProg/fastapi.png" },
    ],
    "Données": [
        { name: "Polars", img: "/langProg/polars.png" },
        { name: "Pandas", img: "/langProg/pandas.png" },
        { name: "DuckDB", img: "/langProg/duckdb.png" },
        { name: "PowerBI", img: "/langProg/powerbi.png" },
    ],
    "Bases de données": [
        { name: "MySQL", img: "/langProg/mysql.png" },
        { name: "MariaDB", img: "/langProg/mariadb.png" },
        { name: "MongoDB", img: "/langProg/mongodb.png" },
    ],
    "Langages": [
        { name: "Python", img: "/langProg/python.png" },
        { name: "TypeScript", img: "/langProg/typescript.png" },
        { name: "JavaScript", img: "/langProg/javascript.png" },
    ],
    "DevOps": [
        { name: "Jest", img: "/langProg/jest.png" },
        { name: "pytest", img: "/langProg/pytest.png" },
        { name: "Cypress", img: "/langProg/cypress.png" },
        { name: "GitHub Actions", img: "/langProg/GitHub_Actions.png" },
        { name: "Docker", img: "/langProg/docker.png" },
    ],
};

const Skills = () => {
    return (
        <section className="py-20 px-6">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white transition-colors duration-300"
            >
                Arsenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Technologique</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {Object.entries(skills).map(([category, items], categoryIndex) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg shadow-blue-500/5 dark:shadow-black/20 hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 pb-2 transition-colors duration-300">
                            {category}
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {items.map((tech, index) => (
                                <div key={index} className="flex flex-col items-center group">
                                    <div className="relative w-12 h-12 mb-2 p-2 bg-blue-50 dark:bg-gray-700 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-gray-600 group-hover:shadow-md">
                                        <Image
                                            src={tech.img}
                                            alt={tech.name}
                                            width={48}
                                            height={48}
                                            className="object-contain"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 text-center font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
