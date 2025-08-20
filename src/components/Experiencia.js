import React, { useEffect } from "react";
import { Briefcase } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";

function Experiencia() {
  const ref = useFadeIn();
  useEffect(() => {
    anime({
      targets: ".timeline-item",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(200),
      duration: 800,
    });
  }, []);

  return (
    <section
      id="experiencia"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center gap-8"
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <Briefcase /> Trajetória
      </h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Experiência</h2>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 h-full border-l-2 border-red-600"></div>
            <div className="timeline-item mb-6">
              <h3>Buscando primeira oportunidade</h3>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Formação</h2>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 h-full border-l-2 border-red-600"></div>
            <div className="timeline-item mb-6">
              <h3>UFAM</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiencia;
