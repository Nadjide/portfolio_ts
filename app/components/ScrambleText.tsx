"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string; // Correctly allow className as prop
  duration?: number;
  delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdeghjklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = "", 
  duration = 2,
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frameId: number;
    let startTime: number;
    
    // Initial obscure state
    setDisplayText(text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (index < Math.floor(text.length * progress)) {
                return char;
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    const timeoutId = setTimeout(() => {
      setIsScrambling(true);
      frameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [text, duration, delay]);

  return (
    <motion.span 
        ref={elementRef}
        className={`inline-block font-mono ${className}`} // Merge classNames
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay }}
    >
      {displayText}
    </motion.span>
  );
};

export default ScrambleText;