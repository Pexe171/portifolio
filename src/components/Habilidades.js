import React, { useEffect, useRef } from "react";
import { BarChart2 } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";
import { linguagens, tecnologias } from "../data/habilidades";

function Habilidades() {
  const ref = useFadeIn();
  const barrasRef = useRef([]);
  const percentRef = useRef([]);

  useEffect(() => {
    anime({
      targets: ".tag",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 500,
    });
    linguagens.forEach((lang, i) => {
      const p = { val: 0 };
      anime({
        targets: p,
        val: lang.porcentagem,
        duration: 1500,
        delay: i * 100,
        easing: "easeInOutQuad",
        update: () => {
          if (barrasRef.current[i])
            barrasRef.current[i].style.width = `${p.val}%`;
          if (percentRef.current[i])
            percentRef.current[i].textContent = `${Math.round(p.val)}%`;
        },
      });
    });
  }, []);

  return (
    <section id="habilidades" ref={ref} className="py-20 flex flex-col items-center justify-center gap-8 border-b-4 border-red-700">
      <h1 className="text-4xl font-extrabold flex items-center gap-2 text-red-600">
        <BarChart2 /> Habilidades
      </h1>
      <div className="flex flex-wrap gap-2 justify-center w-2/3">
        {tecnologias.map((tec) => (
          <span key={tec} className="tag px-3 py-1 bg-black border border-red-700 rounded text-sm">
            {tec}
          </span>
        ))}
      </div>
      <div className="w-2/3 space-y-4">
        {linguagens.map((lang, i) => (
          <div key={lang.nome} className="w-full">
            <div className="flex justify-between mb-1">
              <span>{lang.nome}</span>
              <span ref={(el) => (percentRef.current[i] = el)}>0%</span>
            </div>
            <div className="w-full bg-black border border-red-700 h-4 rounded">
              <div
                ref={(el) => (barrasRef.current[i] = el)}
                className="h-4 bg-red-700"
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
