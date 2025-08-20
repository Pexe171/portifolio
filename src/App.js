import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Sobre from "./components/Sobre";
import Projetos from "./components/Projetos";
import Habilidades from "./components/Habilidades";
import Experiencia from "./components/Experiencia";
import Contato from "./components/Contato";
import ParticleBackground from "./components/ParticleBackground";
import Blog from "./components/Blog";

function App() {
  return (
    <div className="font-sans relative bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <ParticleBackground />
      <Navbar />
      <main className="pt-16 space-y-24">
        <Home />
        <Sobre />
        <Projetos />
        <Habilidades />
        <Experiencia />
        <Blog />
        <Contato />
      </main>
    </div>
  );
}

export default App;
