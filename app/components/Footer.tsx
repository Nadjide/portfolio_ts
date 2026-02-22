"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 px-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* ── Left: Identity & Status ── */}
                <div className="flex flex-col items-center md:items-start gap-2 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">Nadjide Omar</span>
                        <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
                        <span className="text-sm">Développeur Full Stack</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-full border border-green-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>System Status: Online</span>
                    </div>
                </div>

                {/* ── Center: Copyright ── */}
                <div className="text-xs text-gray-400 dark:text-gray-600 font-mono tracking-wide">
                    &copy; {currentYear} • Tous droits réservés.
                </div>

                {/* ── Right: Social Links ── */}
                <div className="flex items-center gap-4">
                    <a 
                        href="https://github.com/Nadjide" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                        aria-label="GitHub"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    </a>
                    
                    <a 
                        href="https://www.linkedin.com/in/nadjide-omar-b55a01212/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                        aria-label="LinkedIn"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                    </a>
                </div>
            </div>
            
            {/* Very subtle noise texture overlay for footer specifically or rely on global texture */}
        </footer>
    );
};

export default Footer;
