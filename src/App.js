import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Sobre from "./components/Sobre";
import Projetos from "./components/Projetos";
import Habilidades from "./components/Habilidades";
import Experiencia from "./components/Experiencia";
import Contato from "./components/Contato";

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="pt-16">
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
