import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Sobre from "./components/Sobre";
import Projetos from "./components/Projetos";
import Habilidades from "./components/Habilidades";
import Experiencia from "./components/Experiencia";
import Contato from "./components/Contato";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  return (
    <div className="font-sans relative bg-gray-900 text-gray-100">
      <ParticleBackground />
      <Navbar />
      <main className="pt-16 space-y-12">
        <Home />
        <Sobre />
        <Projetos />
        <Habilidades />
        <Experiencia />
        <Contato />
      </main>
    </div>
  );
}

export default App;
