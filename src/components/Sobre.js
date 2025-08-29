import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export default function Sobre() {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/Pexe")
      .then((res) => res.json())
      .then((data) => setAvatar(data.avatar_url));
  }, []);

  return (
    <motion.section
      id="sobre"
      className="py-20 flex flex-col items-center gap-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-primary">
        <User /> Sobre Mim
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {avatar && (
          <motion.img
            src={avatar}
            alt="Foto de Pexe"
            className="w-40 h-40 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        )}
        <motion.p
          className="max-w-md text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Olá! Sou David Henrique, estudante de Engenharia de Software e desenvolvedor
          backend. Cursando Engenharia de Software na Universidade Federal do Amazonas
          (UFAM) desde 2025 e em busca da primeira oportunidade de trabalho.
        </motion.p>
      </div>
    </motion.section>
  );
}
