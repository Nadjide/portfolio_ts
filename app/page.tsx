"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg mb-8"
      >
        <div className="flex items-center space-x-6">
          <Image
            src="/profile.jpg"
            width={100}
            height={100}
            alt="Photo de profil"
            className="rounded-full border-2 border-purple-400"
          />
          <div>
            <h1 className="text-2xl font-semibold">Nadjide Omar</h1>
            <p className="text-sm text-purple-400">Étudiant Expert Développement WEB</p>
            <p className="text-sm">Âge : 21 ans</p>
            <p className="text-sm">École : Sophia Ynov Campus, Valbonne</p>
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
        <h3 className="text-lg font-semibold mb-4">Mes Projets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Stats Live"].map((project, index) => (
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