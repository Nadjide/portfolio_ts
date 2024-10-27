"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Projects", value: "12k+" },
          { label: "Happy Clients", value: "56k+" },
          { label: "Experience", value: "11k+" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-800 p-6 rounded-lg text-center"
          >
            <h2 className="text-3xl font-bold text-purple-500">{stat.value}</h2>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg mb-8"
      >
        <div className="flex items-center space-x-4">
          <Image
            src="/profile.jpg"
            width={80}
            height={80}
            className="rounded-full"
            alt="Profile Picture"
          />
          <div>
            <h1 className="text-xl font-semibold">Nadjide Omar</h1>
            <p className="text-sm text-purple-400">Software Engineer</p>
          </div>
        </div>
      </motion.div>

      {/* Section des projets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg"
      >
        <h3 className="text-lg font-semibold mb-4">My Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Project Management App", "E-Learning Platform", "Global News Aggregator", "Scientific Research Database", "Cybersecurity Dashboard"].map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-4 rounded-lg cursor-pointer"
            >
              {project}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}