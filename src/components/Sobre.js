import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";

function Sobre() {
  const ref = useFadeIn();
  const textRef = useRef(null);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/octocat")
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
      className="min-h-screen flex flex-col items-center justify-center gap-8"
    >
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <User /> Sobre Mim
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {avatar && (
          <img src={avatar} alt="Perfil" className="w-40 h-40 rounded-full" />
        )}
        <p ref={textRef} className="max-w-md text-center md:text-left">
          Olá! Sou um entusiasta de tecnologia apaixonado por desenvolvimento web.
        </p>
      </div>
    </section>
  );
}

export default Sobre;
