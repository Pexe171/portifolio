import React, { useRef, useState } from "react";
import { Mail } from "lucide-react";
import { motion, animate } from "framer-motion";

export default function Contato() {
  const btnRef = useRef(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    animate(btnRef.current, { scale: [1, 0.9, 1] }, { duration: 0.6, ease: "easeOut" });
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
    <motion.section
      id="contato"
      className="py-20 flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-primary">
        <Mail /> Contato
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <motion.input
          type="text"
          name="name"
          placeholder="Nome"
          required
          className="p-2 rounded bg-gray-800 text-gray-100"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 rounded bg-gray-800 text-gray-100"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.textarea
          name="message"
          placeholder="Mensagem"
          required
          className="p-2 rounded bg-gray-800 text-gray-100 h-32"
          whileFocus={{ scale: 1.05 }}
        ></motion.textarea>
        <motion.button
          ref={btnRef}
          type="submit"
          className="self-center px-6 py-3 text-white rounded bg-gradient-to-r from-primary to-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enviar
        </motion.button>
        {status && <p className="text-center">{status}</p>}
      </form>
    </motion.section>
  );
}
