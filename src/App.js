import React from "react";
import { Home as HomeIcon } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience/Education" },
  { id: "contact", label: "Contact" },
];

function App() {
  return (
    <div className="font-sans">
      <nav className="fixed top-0 left-0 w-full bg-gray-800 text-gray-100 shadow z-10">
        <ul className="flex gap-4 p-4 justify-center">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-white">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <main className="pt-16">
        {sections.map((s) => (
          <section
            id={s.id}
            key={s.id}
            className="min-h-screen flex items-center justify-center"
          >
            {s.id === "home" ? (
              <h1 className="flex items-center text-4xl font-bold">
                <HomeIcon className="w-8 h-8 mr-2" />
                {s.label}
              </h1>
            ) : (
              <h1 className="text-4xl font-bold">{s.label}</h1>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
