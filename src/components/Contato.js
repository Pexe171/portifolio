import React, { useRef, useState } from "react";
import { Mail } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";
import { motion } from "framer-motion";

function Contato() {
  const ref = useFadeIn();
  const btnRef = useRef(null);
  const [status, setStatus] = useState(null);

  const handleFocus = (e) => {
    anime({ targets: e.target, scale: 1.05, duration: 200 });
  };

  const handleBlur = (e) => {
    anime({ targets: e.target, scale: 1, duration: 200 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    anime({
      targets: btnRef.current,
      scale: [1, 0.9, 1],
      duration: 600,
      easing: "easeOutElastic(1, .5)",
    });
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/seuID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("Mensagem enviada!");
        form.reset();
      } else {
        setStatus("Erro ao enviar.");
      }
    } catch (err) {
      setStatus("Erro ao enviar.");
    }
  };

  return (
    <section
      id="contato"
      ref={ref}
      className="py-20 flex flex-col items-center justify-center gap-6 border-b-4 border-red-700"
    >
      <h1 className="text-4xl font-extrabold flex items-center gap-2 text-red-600">
        <Mail /> Contato
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          className="p-2 rounded bg-black border-2 border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          className="p-2 rounded bg-black border-2 border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
        />
        <textarea
          name="message"
          placeholder="Mensagem"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          className="p-2 rounded bg-black border-2 border-red-700 text-white h-32 focus:outline-none focus:ring-2 focus:ring-red-700"
        ></textarea>
        <motion.button
          ref={btnRef}
          type="submit"
          className="self-center px-6 py-3 font-bold text-black rounded bg-red-700 border-2 border-red-700 hover:bg-white hover:text-red-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enviar
        </motion.button>
        {status && <p className="text-center">{status}</p>}
      </form>
    </section>
  );
}

export default Contato;
