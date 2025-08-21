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
      const cards = document.querySelectorAll(".projeto-card");
      anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(150),
        duration: 1000,
        easing: "easeOutExpo",
      });
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          anime({
            targets: card,
            scale: 1.05,
            rotateZ: 3,
            duration: 300,
            easing: "easeOutSine",
          });
        });
        card.addEventListener("mouseleave", () => {
          anime({
            targets: card,
            scale: 1,
            rotateZ: 0,
            duration: 300,
            easing: "easeOutSine",
          });
        });
      });
    }
  }, []);

  return (
    <section id="projetos" ref={ref} className="py-20 flex flex-col items-center justify-center gap-8 border-b-4 border-red-700">
      <h1 className="text-4xl font-extrabold flex items-center gap-2 text-red-600">
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
                className="projeto-card bg-black border-2 border-red-700 p-4 rounded shadow"
              >
                <h2 className="text-xl mb-2 text-red-600">{proj.nome}</h2>
                <p className="mb-4 text-sm">{proj.sobre}</p>
                <a
                  href={proj.link}
                  className="inline-flex items-center gap-2 px-4 py-2 font-bold text-black rounded bg-red-700 border-2 border-red-700 hover:bg-white hover:text-red-700"
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
