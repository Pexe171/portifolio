import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";

function Sobre() {
  const ref = useFadeIn();
  const textRef = useRef(null);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/users/${process.env.REACT_APP_GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => setAvatar(data.avatar_url));
  }, []);

  useEffect(() => {
    if (!avatar) {
      anime({
        targets: "#loading-sobre",
        opacity: [0, 1],
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
        duration: 1000,
      });
    }
  }, [avatar]);

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
      className="min-h-screen flex flex-col items-center justify-center gap-8"
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <User /> Sobre Mim
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {avatar ? (
          <img
            src={avatar}
            alt={`Foto de ${process.env.REACT_APP_GITHUB_USERNAME}`}
            className="w-40 h-40 rounded-full"
          />
        ) : (
          <p id="loading-sobre" className="text-gray-400">
            Carregando em breve...
          </p>
        )}
        <p ref={textRef} className="max-w-md text-center md:text-left">
          Olá! Sou David, estudante de Engenharia de Software e desenvolvedor backend. Cursando
          Engenharia de Software na Universidade Federal do Amazonas (UFAM) desde 2023 e em
          busca da primeira oportunidade de trabalho.
        </p>
      </div>
    </section>
  );
}

export default Sobre;
