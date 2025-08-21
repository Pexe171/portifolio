import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";

function Sobre() {
  const ref = useFadeIn();
  const textRef = useRef(null);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/Pexe")
      .then((res) => res.json())
      .then((data) => setAvatar(data.avatar_url));
  }, []);

  useEffect(() => {
    if (textRef.current) {
      anime({
        targets: textRef.current,
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutQuad",
      });
    }
  }, [textRef]);

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-20 flex flex-col items-center justify-center gap-8 border-b-4 border-red-700"
    >
      <h1 className="text-4xl font-extrabold flex items-center gap-2 text-red-600">
        <User /> Sobre Mim
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {avatar && (
          <img src={avatar} alt="Foto de Pexe" className="w-40 h-40 rounded-full border-4 border-red-700" />
        )}
        <p ref={textRef} className="max-w-md text-center md:text-left leading-relaxed">
          Olá! Sou David Henrique, estudante de Engenharia de Software e desenvolvedor backend.
          Cursando Engenharia de Software na Universidade Federal do Amazonas (UFAM) desde 2025
          e em busca da primeira oportunidade de trabalho.
        </p>
      </div>
    </section>
  );
}

export default Sobre;
