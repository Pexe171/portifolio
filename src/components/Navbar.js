import React from "react";

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
      <ul className="flex gap-4 p-4 justify-center">
        {secoes.map((secao) => (
          <li key={secao.id}>
            <a
              href={`#${secao.id}`}
              className="hover:text-red-500 transition-colors"
            >
              {secao.rotulo}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
