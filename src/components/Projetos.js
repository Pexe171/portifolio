import React, { useEffect } from "react";
import { Folder, ExternalLink } from "lucide-react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { projetos } from "../data/projetos";

export default function Projetos() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    animate(count, projetos.length, { duration: 1.5, ease: "linear" });
  }, [count]);

  return (
    <motion.section
      id="projetos"
      className="py-20 flex flex-col items-center gap-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-primary">
        <Folder /> Projetos (<motion.span>{rounded}</motion.span>)
      </h1>
      {projetos.length === 0 ? (
        <p id="loading-projetos" className="text-gray-400">
          Carregando em breve...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 md:w-2/3">
          {projetos.map((proj) => (
            <motion.div
              key={proj.nome}
              className="bg-gray-800 p-4 rounded shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              <h2 className="text-xl mb-2">{proj.nome}</h2>
              <p className="mb-4 text-sm">{proj.sobre}</p>
              <motion.a
                href={proj.link}
                className="inline-flex items-center gap-2 text-white px-4 py-2 rounded bg-gradient-to-r from-primary to-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} /> Ver
              </motion.a>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

