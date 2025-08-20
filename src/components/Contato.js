import React, { useRef } from "react";
import { Mail } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";

function Contato() {
  const ref = useFadeIn();
  const btnRef = useRef(null);

  const handleFocus = (e) => {
    anime({ targets: e.target, scale: 1.05, duration: 200 });
  };

  const handleBlur = (e) => {
    anime({ targets: e.target, scale: 1, duration: 200 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    anime({
      targets: btnRef.current,
      scale: [1, 0.9, 1],
      duration: 600,
      easing: "easeOutElastic(1, .5)",
    });
  };

  return (
    <section
      id="contato"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center gap-6"
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <Mail /> Contato
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Nome"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="p-2 rounded bg-gray-800"
        />
        <input
          type="email"
          placeholder="Email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="p-2 rounded bg-gray-800"
        />
        <textarea
          placeholder="Mensagem"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="p-2 rounded bg-gray-800 h-32"
        ></textarea>
        <button
          ref={btnRef}
          type="submit"
          className="self-center px-6 py-3 text-white rounded bg-gradient-to-r from-red-600 to-orange-500"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

export default Contato;
