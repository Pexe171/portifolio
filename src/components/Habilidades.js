import React from "react";
import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { linguagens, tecnologias } from "../data/habilidades";
import CodeTyper from "./CodeTyper";

export default function Habilidades() {
  return (
    <motion.section
      id="habilidades"
      className="py-20 flex flex-col items-center gap-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-primary">
        <BarChart2 /> Habilidades
      </h1>
      <div className="flex flex-wrap gap-2 justify-center w-2/3">
        {tecnologias.map((tec) => (
          <motion.span
            key={tec}
            className="px-3 py-1 bg-gray-800 rounded text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, backgroundColor: "#4c1d95" }}
          >
            {tec}
          </motion.span>
        ))}
      </div>
      <div className="w-2/3 space-y-8">
        {linguagens.map((lang, i) => (
          <div key={lang.nome} className="w-full">
            <div className="flex justify-between mb-1">
              <span>{lang.nome}</span>
              <span>{lang.porcentagem}%</span>
            </div>
            <div className="w-full bg-gray-700 h-4 rounded">
              <motion.div
                className="h-4 rounded bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.porcentagem}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            </div>
            <div className="code-terminal mt-4">
              <div className="code-terminal-header">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="code-terminal-body">
                <CodeTyper codes={lang.snippets} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
