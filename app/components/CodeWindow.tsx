"use client";

import React from "react";
import { motion } from "framer-motion";

const CodeWindow = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-lg rounded-xl overflow-hidden bg-white dark:bg-[#1e1e1e] shadow-2xl shadow-blue-200/50 dark:shadow-black/50 border border-gray-100 dark:border-gray-700 font-mono text-sm sm:text-base relative z-10 transition-colors duration-300"
    >
      {/* Window Header */}
      <div className="bg-gray-50 dark:bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-400 font-medium">profile.ts</span>
      </div>

      {/* Code Content - Light Theme Syntax Highlighting */}
      <div className="p-6 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-[#1e1e1e] backdrop-blur-sm transition-colors duration-300">
        <div className="flex">
          <span className="w-6 text-gray-300 dark:text-gray-600 select-none text-right mr-4 text-xs pt-1">1</span>
          <p>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">developpeur</span> = {"{"}
          </p>
        </div>
        <div className="flex">
          <span className="w-6 text-gray-300 dark:text-gray-600 select-none text-right mr-4 text-xs pt-1">2</span>
          <p className="pl-4">
            nom: <span className="text-green-600 dark:text-green-400">"Nadjide Omar"</span>,
          </p>
        </div>
        <div className="flex">
          <span className="w-6 text-gray-300 dark:text-gray-600 select-none text-right mr-4 text-xs pt-1">3</span>
          <p className="pl-4">
            role: <span className="text-green-600 dark:text-green-400">"Développeur Full Stack"</span>,
          </p>
        </div>
        <div className="flex">
          <span className="w-6 text-gray-300 dark:text-gray-600 select-none text-right mr-4 text-xs pt-1">4</span>
          <p className="pl-4">
            age: <span className="text-orange-500 dark:text-orange-400">22</span>,
          </p>
        </div>
        <div className="flex">
          <span className="w-6 text-gray-300 dark:text-gray-600 select-none text-right mr-4 text-xs pt-1">5</span>
          <p className="pl-4">
            passionne: <span className="text-blue-600 dark:text-blue-400 font-semibold">true</span>,
          </p>
        </div>
        <div className="flex">
          <span className="w-6 text-gray-300 dark:text-gray-600 select-none text-right mr-4 text-xs pt-1">6</span>
          <p>{"};"}</p>
        </div>
        <div className="flex mt-2">
          <span className="w-6 text-gray-300 dark:text-gray-600 select-none text-right mr-4 text-xs pt-1">7</span>
          <p>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">console</span>.
            <span className="text-yellow-600 dark:text-yellow-400">log</span>(
            <span className="text-blue-600 dark:text-blue-400">developpeur</span>
            );
            <span className="animate-pulse inline-block w-2.5 h-4 ml-1 bg-blue-400 dark:bg-purple-400 align-middle"></span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeWindow;
