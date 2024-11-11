"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LocationOn, Email, Phone, DirectionsCar, LinkedIn } from '@mui/icons-material';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Section de profil et de contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg mb-8 flex items-start justify-between"
      >
        {/* Section Profil */}
        <div className="flex items-center">
          <div className="w-24 h-24">
            <Image
              src="/profile.jpg"
              alt="Photo de profil"
              width={100}
              height={100}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="ml-6 flex flex-col justify-center">
            <h1 className="text-2xl font-semibold">Nadjide Omar</h1>
            <p className="text-sm text-purple-400">Étudiant Expert Développement Full Stack</p>
            <p className="text-sm">Âge : 21 ans</p>
            <p className="text-sm">École : Sophia Ynov Campus, Valbonne</p>
          </div>
        </div>

        {/* Section Contact */}
        <div className="flex flex-col justify-center space-y-2 text-right">
          <div className="flex items-center space-x-2 justify-end">
            <Email style={{ color: '#c084fc' }} />
            <p>nadjide.omar@outlook.fr</p>
          </div>
          <div className="flex items-center space-x-2 justify-end">
            <Phone style={{ color: '#c084fc' }} />
            <p>06 34 78 67 13</p>
          </div>
          <div className="flex items-center space-x-2 justify-end">
            <LinkedIn style={{ color: '#c084fc' }} />
            <p>Nadjide Omar</p>
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
        <h3 className="text-lg font-semibold mb-4">Mes Projets en Entreprise</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Sites multi-associations en HTML/JS",
            "Application STATS LIVE",
            "Intégrateur de données automatisé",
            "STATS LIVE 2.0",
            "CRM interne",
            "Templates d'emails en HTML"
          ].map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-4 rounded-lg cursor-pointer"
            >
              <p className="font-bold text-[#c084fc]">{project}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section des projets scolaires/personnels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">Mes Projets Scolaires/Personnels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Exploree",
            "Smart Hire",
            "Pokedex",
            "Movie App"
          ].map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-4 rounded-lg cursor-pointer"
            >
              <p className="font-bold text-[#c084fc]">{project}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}