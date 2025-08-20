import React, { useEffect, useRef } from "react";
import { Home as HomeIcon } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";
import { motion } from "framer-motion";

function Home() {
  const ref = useFadeIn();
  const textRef = useRef(null);

  useEffect(() => {
    const texto = "David Henrique | Desenvolvedor Backend";
    if (textRef.current) {
      textRef.current.innerHTML = texto.replace(/\S/g, "<span class='letter'>$&</span>");
    }
    anime
      .timeline({ loop: false })
      .add({
        targets: ".letter",
        opacity: [0, 1],
        translateY: [50, 0],
        rotateZ: [15, 0],
        easing: "easeOutExpo",
        duration: 750,
        delay: anime.stagger(30),
      });

    anime({
      targets: ".shape",
      rotate: "1turn",
      scale: [1, 1.2],
      borderRadius: ["20%", "50%"],
      direction: "alternate",
      easing: "easeInOutSine",
      duration: 4000,
      loop: true,
    });
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      <div className="text-center z-10 space-y-4 sm:space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-2 text-red-500">
          <HomeIcon />
          <span ref={textRef}></span>
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <motion.a
            href="https://github.com/Pexe"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-red-600 to-orange-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://instagram.com/David.devloli"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-red-600 to-orange-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Instagram
          </motion.a>
        </div>
      </div>
      <span
        className="shape absolute w-16 h-16 md:w-24 md:h-24 bg-red-600 opacity-10 md:opacity-20 left-10 top-10"
        style={{ borderRadius: "20%" }}
      ></span>
      <span
        className="shape absolute w-20 h-20 md:w-32 md:h-32 bg-red-600 opacity-10 md:opacity-20 right-10 bottom-10"
        style={{ borderRadius: "20%" }}
      ></span>
    </section>
  );
}

export default Home;
