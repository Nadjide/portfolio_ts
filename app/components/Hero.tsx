"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import CodeWindow from "./CodeWindow";
import { Email, LinkedIn, GitHub } from "@mui/icons-material";

const Hero = () => {
    // Spotlight Logic
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            const { left, top } = containerRef.current.getBoundingClientRect();
            const x = clientX - left;
            const y = clientY - top;
            containerRef.current.style.setProperty("--x", `${x}px`);
            containerRef.current.style.setProperty("--y", `${y}px`);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen relative overflow-hidden group">
            {/* ── Spotlight Effect ── */}
            <div className="absolute inset-0 pointer-events-none spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

            {/* ── Background Layers ── */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                {/* Giant watermark name */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter whitespace-nowrap leading-none block">
                        NADJIDE
                    </span>
                </div>
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[160px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-cyan-500/[0.05] rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col px-6 lg:px-16">
                {/* ── Top Bar ── */}
                <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between py-8"
                >
                    <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        <span className="text-green-400 text-xs font-mono tracking-wider">DISPONIBLE</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <a href="https://github.com/Nadjide" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 text-gray-500 hover:text-white transition-colors duration-300">
                            <GitHub fontSize="small" />
                        </a>
                        <a href="https://www.linkedin.com/in/nadjide-omar-b55a01212/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 text-gray-500 hover:text-white transition-colors duration-300">
                            <LinkedIn fontSize="small" />
                        </a>
                        <a href="mailto:nadjide.omar@outlook.fr" aria-label="Email" className="p-2.5 text-gray-500 hover:text-white transition-colors duration-300">
                            <Email fontSize="small" />
                        </a>
                    </div>
                </motion.header>

                {/* ── Main Content ── */}
                <div className="flex-1 flex items-center py-12">
                    <div className="w-full max-w-7xl mx-auto">
                        
                        {/* Name Block - Full Width Impact */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="mb-16"
                        >
                            <p className="text-gray-600 text-sm font-mono tracking-[0.3em] uppercase mb-6">
                                &lt;hello world /&gt;
                            </p>
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter py-2">
                                Nadjide
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-gradient-x pr-2">
                                    {" "}Omar
                                </span>
                                <span className="text-blue-500">.</span>
                            </h1>
                        </motion.div>

                        {/* Two Column Content */}
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                            {/* Left: Info Block */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="lg:max-w-sm shrink-0 space-y-8"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-cyan-500" />
                                    <span className="text-gray-400 text-sm font-medium tracking-wide">Développeur Full Stack</span>
                                </div>
                                
                                <p className="text-gray-500 text-base leading-relaxed">
                                    Je conçois des applications robustes, esthétiques et évolutives avec des technologies modernes. Passionné par l&apos;expérience utilisateur et l&apos;architecture logicielle.
                                </p>

                                <div className="flex items-center gap-3 pt-2">
                                    <a 
                                        href="/CV/CV_NADJIDE_OMAR.pdf" 
                                        download="CV_Nadjide_Omar.pdf"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        Télécharger CV
                                    </a>
                                    <a 
                                        href="mailto:nadjide.omar@outlook.fr"
                                        className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300 text-sm"
                                    >
                                        Me contacter
                                    </a>
                                </div>
                            </motion.div>

                            {/* Right: Terminal - Floating Animation */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: 0.4,
                                    y: {
                                        repeat: Infinity,
                                        duration: 6,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="flex-1 w-full relative"
                            >
                                {/* Decorative frame corners */}
                                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg pointer-events-none" />
                                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg pointer-events-none" />
                                {/* Ambient glow */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl blur-xl pointer-events-none" />
                                <CodeWindow />
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom: Scroll Indicator ── */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="py-8 flex justify-center"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] text-gray-600 tracking-[0.3em] uppercase font-mono">Scroll</span>
                        <motion.div 
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="w-0.5 h-8 bg-gradient-to-b from-gray-500 to-transparent rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
