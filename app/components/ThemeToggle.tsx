"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LightMode, DarkMode } from "@mui/icons-material";
import { motion } from "framer-motion";

const ThemeToggle = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className="fixed top-6 right-6 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg text-gray-800 dark:text-yellow-400 transition-all duration-300"
            aria-label="Toggle Dark Mode"
        >
            {resolvedTheme === "light" ? <DarkMode /> : <LightMode />}
        </motion.button>
    );
};

export default ThemeToggle;
