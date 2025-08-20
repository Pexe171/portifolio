import React from "react";
import { User } from "lucide-react";
import useFadeIn from "../hooks/useFadeIn";

function Sobre() {
  const ref = useFadeIn();
  return (
    <section id="sobre" ref={ref} className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <User /> Sobre Mim
      </h1>
    </section>
  );
}

export default Sobre;
