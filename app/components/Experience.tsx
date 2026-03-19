"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formations, experiences } from "../portfolioContent";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate each timeline entry: date → title → description → skills (staggered)
            gsap.utils.toArray<HTMLElement>(".timeline-entry").forEach((entry) => {
                const badge = entry.querySelector(".tl-badge");
                const heading = entry.querySelector(".tl-heading");
                const meta = entry.querySelector(".tl-meta");
                const body = entry.querySelector(".tl-body");
                const tags = entry.querySelectorAll(".tl-tag");
                const dot = entry.querySelector(".tl-dot");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: entry,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    },
                });

                // Dot pulse in
                if (dot) tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" });
                // Date badge
                if (badge) tl.fromTo(badge, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, "-=0.1");
                // Title + company
                if (heading) tl.fromTo(heading, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.05");
                // Meta / description
                if (meta) tl.fromTo(meta, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.05");
                // Body (achievements list)
                if (body) tl.fromTo(body, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.05");
                // Tech tags stagger
                if (tags.length) tl.fromTo(tags, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.05, ease: "back.out(1.5)" }, "-=0.1");
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-300" id="experience">
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
                        {formations.map((f) => (
                            <div
                                key={f.id}
                                className="timeline-entry relative"
                            >
                                {/* Dot */}
                                <div className="tl-dot absolute -left-[calc(1.5rem+5px)] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] border-2 border-white dark:border-[#0a0a0a]" />

                                <span className="tl-badge inline-block px-2.5 py-0.5 mb-2 text-xs font-semibold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                                    {f.date}
                                </span>
                                <div className="tl-heading">
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{f.title}</h4>
                                    {f.subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-1">{f.subtitle}</p>}
                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-0.5">{f.company}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{f.address}</p>
                                </div>

                                <ul className="tl-body text-sm text-gray-500 dark:text-gray-400 space-y-1.5 mb-3 mt-3">
                                    {f.achievements.map((a, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <span className="text-blue-400 mt-0.5 shrink-0">▹</span>
                                            <span>{a}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1.5">
                                    {f.tech.map((t) => (
                                        <span key={t} className="tl-tag text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
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
                        {experiences.map((exp) => (
                            <div
                                key={exp.id}
                                className="timeline-entry relative"
                            >
                                {/* Dot */}
                                <div className="tl-dot absolute -left-[calc(1.5rem+5px)] top-1.5 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)] border-2 border-white dark:border-[#0a0a0a]" />

                                <span className="tl-badge inline-block px-2.5 py-0.5 mb-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 rounded-full">
                                    {exp.date}
                                </span>
                                <div className="tl-heading">
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{exp.title}</h4>
                                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{exp.company}</p>
                                </div>
                                <p className="tl-meta text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-2 mb-3">{exp.description}</p>

                                <ul className="tl-body text-sm text-gray-500 dark:text-gray-400 space-y-1.5 mb-4">
                                    {exp.achievements.map((a, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                                            <span>{a}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1.5">
                                    {exp.tech.map((t) => (
                                        <span key={t} className="tl-tag text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
