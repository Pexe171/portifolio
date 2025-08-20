import React, { useEffect, useRef } from "react";
import { Folder, ExternalLink } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";
import { projetos } from "../data/projetos";

function Projetos() {
  const ref = useFadeIn();
  const countRef = useRef(null);
  useEffect(() => {
    anime({
      targets: { val: 0 },
      val: projetos.length,
      duration: 1500,
      round: 1,
      easing: "linear",
      update: (anim) => {
        if (countRef.current) countRef.current.textContent = anim.animations[0].currentValue;
      },
    });
    if (projetos.length === 0) {
      anime({
        targets: "#loading-projetos",
        opacity: [0, 1],
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
        duration: 1000,
      });
    } else {
      anime({
        targets: ".projeto-card",
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(100),
        duration: 1000,
        easing: "easeOutElastic",
      });
    }
  }, []);

  return (
    <section id="projetos" ref={ref} className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <Folder /> Projetos (<span ref={countRef}></span>)
      </h1>
      {projetos.length === 0 ? (
        <p id="loading-projetos" className="text-gray-400">
          Carregando em breve...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 md:w-2/3">
          {projetos.map((proj) => (
            <div
              key={proj.nome}
              className="projeto-card bg-gray-800 p-4 rounded shadow transform transition hover:scale-105 hover:shadow-xl"
            >
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
      )}
    </section>
  );
}

export default Projetos;
