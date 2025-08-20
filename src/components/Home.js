import React, { useEffect, useRef } from "react";
import { Home as HomeIcon } from "lucide-react";
import anime from "animejs";
import useFadeIn from "../hooks/useFadeIn";

function Home() {
  const ref = useFadeIn();
  const textRef = useRef(null);
  const shape1 = useRef(null);
  const shape2 = useRef(null);

  useEffect(() => {
    const texto = "Seu Nome - Desenvolvedor";
    const obj = { val: 0 };
    anime({
      targets: obj,
      val: texto.length,
      duration: 3000,
      round: 1,
      easing: "linear",
      update: () => {
        if (textRef.current)
          textRef.current.textContent = texto.slice(0, obj.val);
      },
    });
    anime({
      targets: shape1.current,
      translateY: [-20, 20],
      direction: "alternate",
      loop: true,
      duration: 4000,
      easing: "easeInOutSine",
    });
    anime({
      targets: shape2.current,
      translateY: [20, -20],
      direction: "alternate",
      loop: true,
      duration: 4000,
      easing: "easeInOutSine",
    });
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="text-center z-10 space-y-6">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2 text-red-500">
          <HomeIcon />
          <span ref={textRef}></span>
        </h1>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/octocat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-red-600 to-orange-500"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/octocat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-red-600 to-orange-500"
          >
            LinkedIn
          </a>
          <a
            href="#sobre"
            className="px-4 py-2 text-white rounded bg-gradient-to-r from-red-600 to-orange-500"
          >
            Saiba Mais
          </a>
        </div>
      </div>
      <span
        ref={shape1}
        className="absolute w-24 h-24 bg-red-600 opacity-20 rounded-full left-10 top-10"
      ></span>
      <span
        ref={shape2}
        className="absolute w-32 h-32 bg-red-600 opacity-20 right-10 bottom-10"
      ></span>
    </section>
  );
}

export default Home;
