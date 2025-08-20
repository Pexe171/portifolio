import React, { useState } from "react";
import { motion } from "framer-motion";
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
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-gray-100 shadow z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <button
          className="md:hidden"
          onClick={() => setAberto(!aberto)}
          aria-label="Alternar menu"
        >
          {aberto ? <X /> : <Menu />}
        </button>
        <ul
          className={`${aberto ? "flex" : "hidden"} flex-col md:flex md:flex-row gap-4 md:justify-center md:items-center`}
        >
          {secoes.map((secao) => (
            <motion.li
              key={secao.id}
              whileHover={{ scale: 1.1 }}
              onClick={() => setAberto(false)}
            >
              <a
                href={`#${secao.id}`}
                className="hover:text-red-500 transition-colors"
              >
                {secao.rotulo}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
