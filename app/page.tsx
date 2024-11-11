"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LocationOn, Email, Phone, DirectionsCar, LinkedIn } from '@mui/icons-material';

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
            <p className="text-sm text-purple-400">Étudiant Expert Développement Full Stack</p>
            <p className="text-sm">Âge : 21 ans</p>
            <p className="text-sm">École : Sophia Ynov Campus, Valbonne</p>
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
          <div>
            <h4 className="font-semibold mb-2">Front-end</h4>
            <div className="flex space-x-4">
              {[
                { name: "React.js", img: "/langProg/react.png" },
                { name: "Next.js", img: "/langProg/nextjs.png" },
                { name: "React Native", img: "/langProg/reactnative.png" },
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <Image src={tech.img} width={40} height={40} alt={tech.name} />
                  <p className="text-xs">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Back-end</h4>
            <div className="flex space-x-4">
              {[
                { name: "Node.js", img: "/langProg/node.png" },
                { name: "Express.js", img: "/langProg/express.png" },
                { name: "Flask", img: "/langProg/flask.png" },
                { name: "FastAPI", img: "/langProg/fastapi.png" },
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <Image src={tech.img} width={40} height={40} alt={tech.name} />
                  <p className="text-xs">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Traitement de données</h4>
            <div className="flex space-x-4">
              {[
                { name: "Polars", img: "/langProg/polars.png" },
                { name: "DuckDB", img: "/langProg/duckdb.png" },
                { name: "PowerBI", img: "/langProg/powerbi.png" },
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <Image src={tech.img} width={40} height={40} alt={tech.name} />
                  <p className="text-xs">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Bases de données</h4>
            <div className="flex space-x-4">
              {[
                { name: "MySQL", img: "/langProg/mysql.png" },
                { name: "MariaDB", img: "/langProg/mariadb.png" },
                { name: "MongoDB", img: "/langProg/mongodb.png" },
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <Image src={tech.img} width={40} height={40} alt={tech.name} />
                  <p className="text-xs">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Langages</h4>
            <div className="flex space-x-4">
              {[
                { name: "Python", img: "/langProg/python.png" },
                { name: "TypeScript", img: "/langProg/typescript.png" },
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <Image src={tech.img} width={40} height={40} alt={tech.name} />
                  <p className="text-xs">{tech.name}</p>
                </div>
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
              {project}
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
              {project}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section de contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Contact</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <LocationOn style={{ color: '#c084fc' }} />
            <p>6 Rue J F Fulconis, 06000 Nice</p>
          </div>
          <div className="flex items-center space-x-2">
            <Email style={{ color: '#c084fc' }} />
            <p>nadjide.omar@outlook.fr</p>
          </div>
          <div className="flex items-center space-x-2">
            <Phone style={{ color: '#c084fc' }} />
            <p>06 34 78 67 13</p>
          </div>
          <div className="flex items-center space-x-2">
            <DirectionsCar style={{ color: '#c084fc' }} />
            <p>Permis B, véhicule</p>
          </div>
          <div className="flex items-center space-x-2">
            <LinkedIn style={{ color: '#c084fc' }} />
            <p>Nadjide Omar</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}