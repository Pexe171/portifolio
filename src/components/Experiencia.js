import React from "react";
import { Briefcase } from "lucide-react";
import useFadeIn from "../hooks/useFadeIn";

function Experiencia() {
  const ref = useFadeIn();
  return (
    <section id="experiencia" ref={ref} className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <Briefcase /> Experiência/Formação
      </h1>
    </section>
  );
}

export default Experiencia;
