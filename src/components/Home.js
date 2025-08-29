import React from "react";
import { Home as HomeIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center z-10 space-y-6">
        <motion.h1
          className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-2 text-primary"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HomeIcon />
          <span>Pexe | Desenvolvedor Backend</span>
        </motion.h1>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <motion.a
            href="https://github.com/Pexe"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-primary to-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://instagram.com/David.devloli"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-primary to-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Instagram
          </motion.a>
        </div>
      </div>
      <motion.span
        className="absolute w-16 h-16 md:w-24 md:h-24 bg-primary opacity-20 left-10 top-10 rounded-3xl"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 20 }}
      />
      <motion.span
        className="absolute w-20 h-20 md:w-32 md:h-32 bg-secondary opacity-20 right-10 bottom-10 rounded-3xl"
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 20 }}
      />
    </motion.section>
  );
}
