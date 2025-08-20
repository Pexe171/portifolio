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
      const res = await fetch(
        `https://formspree.io/f/${process.env.REACT_APP_FORMSPREE_ID}`,
        {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        }
      );
      if (res.ok) {
        setStatus("Mensagem enviada!");
        form.reset();
      } else {
        setStatus("Erro no servidor, tente novamente mais tarde.");
      }
    } catch (err) {
      setStatus("Verifique sua conexão com a internet.");
    }
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
      <form
        onSubmit={handleSubmit}
        action={`https://formspree.io/f/${process.env.REACT_APP_FORMSPREE_ID}`}
        method="POST"
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          className="p-2 rounded bg-gray-800 text-gray-100"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          className="p-2 rounded bg-gray-800 text-gray-100"
        />
        <textarea
          name="message"
          placeholder="Mensagem"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          className="p-2 rounded bg-gray-800 text-gray-100 h-32"
        ></textarea>
        <motion.button
          ref={btnRef}
          type="submit"
          className="self-center px-6 py-3 text-white rounded bg-gradient-to-r from-red-600 to-orange-500"
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
