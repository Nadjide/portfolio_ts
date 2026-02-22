"use client";

import React from "react";
import { motion } from "framer-motion";
import CodeWindow from "./CodeWindow";
import { Email, LinkedIn, GitHub } from "@mui/icons-material";

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-12 md:py-0 overflow-hidden relative bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* Abstract Background Elements - Gemini Style */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-[120px] transition-colors duration-300" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-200/40 dark:bg-cyan-900/20 rounded-full blur-[120px] transition-colors duration-300" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">

                {/* Left Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 text-center md:text-left"
                >
                    <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800 shadow-sm transition-colors duration-300">
                        <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            HELLO WORLD
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300">
                        Je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-x">Nadjide</span>, <br />
                        Développeur Full Stack
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto md:mx-0 leading-relaxed transition-colors duration-300">
                        Je conçois des applications robustes, esthétiques et évolutives avec des technologies modernes.
                        Passionné par l'expérience utilisateur et l'architecture logicielle.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                        <a href="https://github.com/Nadjide" target="_blank" rel="noopener noreferrer" aria-label="Profil GitHub de Nadjide Omar" className="p-3 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700 shadow-md">
                            <GitHub fontSize="small" />
                        </a>
                        <a href="https://www.linkedin.com/in/nadjide-omar-b55a01212/" target="_blank" rel="noopener noreferrer" aria-label="Profil LinkedIn de Nadjide Omar" className="p-3 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700 shadow-md">
                            <LinkedIn fontSize="small" />
                        </a>
                        <a href="mailto:nadjide.omar@outlook.fr" aria-label="Envoyer un email à Nadjide Omar" className="p-3 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700 shadow-md">
                            <Email fontSize="small" />
                        </a>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-8"
                    >
                        <a 
                            href="/CV/CV_NADJIDE_OMAR.pdf" 
                            download="CV_Nadjide_Omar.pdf"
                            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-[1.02]"
                        >
                            Télécharger CV
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Visual Content (Code Window) */}
                <div className="flex justify-center md:justify-end relative">
                    {/* Decorative blob behind code window */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-cyan-300/20 dark:from-blue-600/10 dark:to-cyan-500/10 rounded-full filter blur-3xl transform scale-90 translate-y-4 -z-10 transition-colors duration-300"></div>
                    <CodeWindow />
                </div>
            </div>
        </section>
    );
};

export default Hero;
