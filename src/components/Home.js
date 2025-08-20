import React, { useEffect, useRef } from "react";
import { Home as HomeIcon } from "lucide-react";
import { animate } from "../utils/animate";
import useFadeIn from "../hooks/useFadeIn";

function Home() {
  const ref = useFadeIn();
  const textRef = useRef(null);
  const shape1 = useRef(null);
  const shape2 = useRef(null);

  useEffect(() => {
    const texto = "Bem-vindo ao meu portfólio";
    animate({
      targets: { value: 0 },
      value: [0, texto.length],
      duration: 2000,
      round: true,
      update: (v) => {
        if (textRef.current)
          textRef.current.textContent = texto.slice(0, v);
      },
    });
    animate({ targets: shape1.current, translateY: [-20, 20], duration: 4000, easing: "easeOutElastic" });
    animate({ targets: shape2.current, translateY: [20, -20], duration: 4000, easing: "easeOutElastic" });
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2 text-red-500">
          <HomeIcon />
          <span ref={textRef}></span>
        </h1>
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
