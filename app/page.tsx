"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Email, Phone, LinkedIn } from "@mui/icons-material";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from "next/navigation";
import { projectsData } from "./projectsData";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleProjectClick = (projectTitle: string) => {
    setIsLoading(projectTitle);
    const slug = projectTitle
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .toLowerCase()
      .replace(/ /g, "-");
    router.push(`/${slug}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Section de profil et de contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-6 sm:space-y-0"
      >
        {/* Section Profil */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-24 h-24">
            <Image
              src="/profile.jpg"
              alt="Photo de profil"
              width={100}
              height={100}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold">Nadjide Omar</h1>
            <p className="text-sm text-purple-400">Étudiant Expert Développement Full Stack</p>
            <p className="text-sm">Âge : 21 ans</p>
            <p className="text-sm">École : Sophia Ynov Campus, Valbonne</p>
          </div>
        </div>

        {/* Section Contact */}
        <div className="flex flex-col items-center sm:items-end space-y-2">
          <div className="flex items-center space-x-2">
            <Email style={{ color: "#c084fc" }} />
            <a href="mailto:nadjide.omar@outlook.fr" className="hover:underline text-sm">nadjide.omar@outlook.fr</a>
          </div>
          <div className="flex items-center space-x-2">
            <LinkedIn style={{ color: "#c084fc" }} />
            <a
              href="https://www.linkedin.com/in/nadjide-omar-b55a01212/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm"
            >
              Nadjide Omar
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <GitHubIcon style={{ color: "#c084fc" }} />
            <a
              href="https://github.com/Nadjide"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm"
            >
              Nadjide
            </a>
          </div>
        </div>
      </motion.div>

      {/* Section des compétences techniques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">Compétences Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Front-end */}
          <div>
            <h4 className="font-semibold mb-4 text-center text-purple-400">Front-end</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "React.js", img: "/langProg/react.png" },
                { name: "Next.js", img: "/langProg/nextjs.png" },
                { name: "React Native", img: "/langProg/reactnative.png" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-2 bg-gray-700 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image src={tech.img} width={50} height={50} alt={tech.name} className="rounded-full" />
                  <p className="text-sm">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Back-end */}
          <div>
            <h4 className="font-semibold mb-4 text-center text-purple-400">Back-end</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Node.js", img: "/langProg/node.png" },
                { name: "Express.js", img: "/langProg/express.png" },
                { name: "Flask", img: "/langProg/flask.png" },
                { name: "FastAPI", img: "/langProg/fastapi.png" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-2 bg-gray-700 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image src={tech.img} width={50} height={50} alt={tech.name} className="rounded-full" />
                  <p className="text-sm">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Traitement de données */}
          <div>
            <h4 className="font-semibold mb-4 text-center text-purple-400">Traitement de données</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Polars", img: "/langProg/polars.png" },
                { name: "DuckDB", img: "/langProg/duckdb.png" },
                { name: "PowerBI", img: "/langProg/powerbi.png" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-2 bg-gray-700 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image src={tech.img} width={50} height={50} alt={tech.name} className="rounded-full" />
                  <p className="text-sm">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bases de données */}
          <div>
            <h4 className="font-semibold mb-4 text-center text-purple-400">Bases de données</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "MySQL", img: "/langProg/mysql.png" },
                { name: "MariaDB", img: "/langProg/mariadb.png" },
                { name: "MongoDB", img: "/langProg/mongodb.png" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-2 bg-gray-700 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image src={tech.img} width={50} height={50} alt={tech.name} className="rounded-full" />
                  <p className="text-sm">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Langages */}
          <div>
            <h4 className="font-semibold mb-4 text-center text-purple-400">Langages</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Python", img: "/langProg/python.png" },
                { name: "TypeScript", img: "/langProg/typescript.png" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-2 bg-gray-700 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image src={tech.img} width={50} height={50} alt={tech.name} className="rounded-full" />
                  <p className="text-sm">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section des projets en entreprise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">Mes Projets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projectsData.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-4 rounded-lg cursor-pointer relative overflow-hidden"
              onClick={() => handleProjectClick(project.title)}
            >
              <p className="font-bold text-[#c084fc]">{project.title}</p>
              {isLoading === project.title && (
                <div className="absolute inset-0 bg-gray-700/80 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}