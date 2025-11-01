'use client';

import { motion } from 'framer-motion';

const habilidades = [
  {
    icone: '🧩',
    descricao: 'Design Systems e documentação viva'
  },
  {
    icone: '♿',
    descricao: 'Acessibilidade web (WCAG) e testes automatizados'
  },
  {
    icone: '🤝',
    descricao: 'Integração entre produto, design e engenharia'
  },
  {
    icone: '🎙️',
    descricao: 'Storytelling e facilitação de workshops'
  },
  {
    icone: '⚛️',
    descricao: 'Next.js, React, TypeScript e Tailwind CSS'
  },
  {
    icone: '🔗',
    descricao: 'Integração com APIs, CMS e automações'
  }
];

const variantesLista = {
  oculto: {
    opacity: 0
  },
  visivel: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const varianteItem = {
  oculto: { opacity: 0, y: 16 },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
};

export default function Skills() {
  return (
    <section id="habilidades" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Competências</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Habilidades técnicas e humanas</h2>
      </header>

      <motion.ul
        className="grid gap-md md:grid-cols-2"
        variants={variantesLista}
        initial="oculto"
        whileInView="visivel"
        viewport={{ once: true, amount: 0.3 }}
      >
        {habilidades.map((habilidade) => (
          <motion.li
            key={habilidade.descricao}
            variants={varianteItem}
            className="flex items-start gap-md rounded-xl border border-midnight-stroke bg-midnight-surface p-lg text-midnight-muted shadow-sm transition hover:-translate-y-1 hover:border-midnight-accent hover:shadow-lg"
          >
            <span aria-hidden className="text-2xl">{habilidade.icone}</span>
            <span className="text-left">{habilidade.descricao}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
