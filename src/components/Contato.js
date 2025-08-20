import React from "react";
import { Mail } from "lucide-react";
import useFadeIn from "../hooks/useFadeIn";

function Contato() {
  const ref = useFadeIn();
  return (
    <section id="contato" ref={ref} className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <Mail /> Contato
      </h1>
      <a
        href="mailto:email@example.com"
        className="inline-flex items-center gap-2 px-6 py-3 text-white rounded bg-gradient-to-r from-red-600 to-orange-500"
      >
        <Mail /> Enviar Email
      </a>
    </section>
  );
}

export default Contato;
