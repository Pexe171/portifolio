import React, { useEffect, useRef } from "react";
import { Folder, ExternalLink } from "lucide-react";
import { animate } from "../utils/animate";
import useFadeIn from "../hooks/useFadeIn";

const projetos = [
  { nome: "Projeto A", link: "#" },
  { nome: "Projeto B", link: "#" },
  { nome: "Projeto C", link: "#" },
];

function Projetos() {
  const ref = useFadeIn();
  const countRef = useRef(null);
  useEffect(() => {
    animate({ targets: { value: 0 }, value: [0, projetos.length], duration: 1500, round: true, update: v => { if(countRef.current) countRef.current.textContent = v; } });
    const cards = document.querySelectorAll('.projeto-card');
    animate({ targets: cards, opacity: [0,1], translateY: [50,0], duration: 1000, easing: 'easeOutElastic' });
  }, []);

  return (
    <section id="projetos" ref={ref} className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <Folder /> Projetos (<span ref={countRef}></span>)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 md:w-2/3">
        {projetos.map((proj) => (
          <div key={proj.nome} className="projeto-card bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl mb-2">{proj.nome}</h2>
            <a
              href={proj.link}
              className="inline-flex items-center gap-2 text-white px-4 py-2 rounded bg-gradient-to-r from-red-600 to-orange-500"
            >
              <ExternalLink size={16} /> Ver
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projetos;
