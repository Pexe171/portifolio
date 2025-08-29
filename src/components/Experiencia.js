import React from "react";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function Experiencia() {
  return (
    <motion.section
      id="experiencia"
      className="py-20 flex flex-col items-center gap-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-primary">
        <Briefcase /> Trajetória
      </h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Experiência</h2>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 h-full border-l-2 border-primary"></div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3>Em busca da primeira oportunidade de trabalho</h3>
            </motion.div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Formação</h2>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 h-full border-l-2 border-primary"></div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3>Engenharia de Software - UFAM (2025 - Presente)</h3>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
