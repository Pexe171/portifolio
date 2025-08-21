import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const secoes = [
  { id: "inicio", rotulo: "Início" },
  { id: "sobre", rotulo: "Sobre Mim" },
  { id: "projetos", rotulo: "Projetos" },
  { id: "habilidades", rotulo: "Habilidades" },
  { id: "experiencia", rotulo: "Experiência/Formação" },
  { id: "contato", rotulo: "Contato" },
];

function Navbar() {
  const [aberto, setAberto] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black z-50 text-white border-b-4 border-red-700 shadow-[0_0_10px_#ff0000]">
      <div className="max-w-5xl mx-auto flex items-center justify-end p-4">
        <button
          className="md:hidden text-red-600"
          onClick={() => setAberto(true)}
          aria-label="Abrir menu"
        >
          <Menu />
        </button>
        <ul className="hidden md:flex md:flex-row gap-4 md:justify-center md:items-center">
          {secoes.map((secao) => (
            <motion.li key={secao.id} whileHover={{ scale: 1.1 }}>
              <a
                href={`#${secao.id}`}
                className="px-3 py-1 rounded hover:bg-red-700 hover:text-black transition-colors"
              >
                {secao.rotulo}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {aberto && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAberto(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-black border-r-4 border-red-700 shadow z-50 p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              <button
                className="mb-8 text-red-600"
                onClick={() => setAberto(false)}
                aria-label="Fechar menu"
              >
                <X />
              </button>
              <ul className="flex flex-col gap-4">
                {secoes.map((secao) => (
                  <motion.li
                    key={secao.id}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setAberto(false)}
                  >
                    <a
                      href={`#${secao.id}`}
                      className="px-2 py-1 rounded hover:bg-red-700 hover:text-black transition-colors"
                    >
                      {secao.rotulo}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
