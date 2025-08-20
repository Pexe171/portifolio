import React, { useEffect, useRef } from "react";
import { BarChart2 } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";

const linguagens = [
  { nome: "JavaScript", porcentagem: 70 },
  { nome: "Python", porcentagem: 20 },
  { nome: "Outras", porcentagem: 10 },
];

const tecnologias = ["React", "Node.js", "Tailwind", "Git"];

function Habilidades() {
  const ref = useFadeIn();
  const barrasRef = useRef([]);

  useEffect(() => {
    anime({
      targets: ".tag",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 500,
    });
    anime({
      targets: barrasRef.current,
      width: (el, i) => `${linguagens[i].porcentagem}%`,
      easing: "easeOutQuad",
      duration: 1500,
      delay: anime.stagger(100),
    });
  }, []);

  return (
    <section id="habilidades" ref={ref} className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <BarChart2 /> Habilidades
      </h1>
      <div className="flex flex-wrap gap-2 justify-center w-2/3">
        {tecnologias.map((tec) => (
          <span key={tec} className="tag px-3 py-1 bg-gray-800 rounded text-sm">
            {tec}
          </span>
        ))}
      </div>
      <div className="w-2/3 space-y-4">
        {linguagens.map((lang, i) => (
          <div key={lang.nome} className="w-full">
            <div className="flex justify-between mb-1">
              <span>{lang.nome}</span>
              <span>{lang.porcentagem}%</span>
            </div>
            <div className="w-full bg-gray-700 h-4 rounded">
              <div
                ref={(el) => (barrasRef.current[i] = el)}
                className="h-4 bg-red-600 rounded"
                style={{ width: 0 }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Habilidades;
