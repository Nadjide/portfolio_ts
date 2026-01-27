"use client";

import React from "react";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <main className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen selection:bg-blue-200 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-200 transition-colors duration-300">
      {/* Background Grid Pattern - subtle overlay */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none opacity-[0.4] transition-colors duration-300" />

      <div className="relative z-10">
        <ThemeToggle />
        <Hero />
        <Skills />
        <Projects />

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
          <p>© {new Date().getFullYear()} Nadjide Omar. Built with Next.js & Tailwind.</p>
        </footer>
      </div>
    </main>
  );
}
