"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface BuildConsoleProps {
  projectTitle: string;
  onComplete: () => void;
}

const generateBuildLines = (title: string): string[] => [
  `$ docker build --tag portfolio/${title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")} .`,
  "Sending build context to Docker daemon...",
  "Step 1/6 : FROM node:20-alpine",
  " ---> a1b2c3d4e5f6",
  "Step 2/6 : WORKDIR /app",
  " ---> Running in 7f8g9h0i1j2k",
  "Step 3/6 : COPY package*.json ./",
  " ---> 3l4m5n6o7p8q",
  "Step 4/6 : RUN npm install",
  " ---> Running npm ci...",
  "Step 5/6 : COPY . .",
  " ---> 9r0s1t2u3v4w",
  `Step 6/6 : RUN npm run build`,
  " ---> Building " + title + "...",
  " ---> Compiled successfully.",
  `Successfully built 5x6y7z8a9b0c`,
  `Successfully tagged portfolio/${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}:latest`,
  "",
  `✓ Deploying ${title}...`,
];

const BuildConsole: React.FC<BuildConsoleProps> = ({ projectTitle, onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const lines = generateBuildLines(projectTitle);

  useEffect(() => {
    let i = 0;
    const base = 60;
    const delays = lines.map(() => base + Math.floor(Math.random() * 60));

    const addLine = () => {
      if (i < lines.length) {
        const current = i;
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, lines[current]]);
          i++;
          addLine();
        }, delays[current]);
      } else {
        // Done — navigate after a brief pause
        setTimeout(onComplete, 300);
      }
    };

    addLine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectTitle]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 z-30 rounded-2xl overflow-hidden bg-[#0d1117] border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Console header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-green-500/20 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-green-400/70 font-mono">
          Building {projectTitle}...
        </span>
      </div>

      {/* Console body */}
      <div className="flex-1 p-4 font-mono text-xs overflow-hidden flex flex-col justify-end gap-0.5">
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12 }}
            className={
              line.startsWith("✓")
                ? "text-green-400 font-semibold"
                : line.startsWith("$")
                ? "text-cyan-400"
                : line.startsWith("Step")
                ? "text-white"
                : line.startsWith("Successfully")
                ? "text-green-300"
                : "text-gray-500"
            }
          >
            {line || "\u00a0"}
          </motion.div>
        ))}
        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1.5 h-3.5 bg-green-400 ml-0.5 align-middle"
        />
      </div>
    </motion.div>
  );
};

export default BuildConsole;
