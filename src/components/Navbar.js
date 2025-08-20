import React from "react";
import { motion } from "framer-motion";

const secoes = [
  { id: "inicio", rotulo: "Início" },
  { id: "sobre", rotulo: "Sobre Mim" },
  { id: "projetos", rotulo: "Projetos" },
  { id: "habilidades", rotulo: "Habilidades" },
  { id: "experiencia", rotulo: "Experiência/Formação" },
  { id: "contato", rotulo: "Contato" },
];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-gray-100 shadow z-10">
      <ul className="flex gap-4 p-4 justify-center items-center">
        {secoes.map((secao) => (
          <motion.li key={secao.id} whileHover={{ scale: 1.1 }}>
            <a
              href={`#${secao.id}`}
              className="hover:text-red-500 transition-colors"
            >
              {secao.rotulo}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
