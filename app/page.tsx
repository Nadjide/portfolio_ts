"use client";

import React from "react";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-gray-100 min-h-screen selection:bg-blue-900 selection:text-blue-200">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none opacity-[0.4]" />

      <div className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
        <Skills />

        <Footer />
      </div>
    </main>
  );
}
