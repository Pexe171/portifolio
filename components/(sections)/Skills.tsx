'use client';

import { motion } from 'framer-motion';
import { trilhasSkills } from '@/lib/homeContent';

const variantesLista = {
  oculto: { opacity: 0 },
  visivel: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12
    }
  }
};

const varianteItem = {
  oculto: { opacity: 0, y: 20 },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Skills() {
  return (
    <section id="habilidades" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Competências</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text md:text-4xl">Stack completo em três frentes</h2>
        <p className="max-w-2xl text-midnight-muted">
          Organização das competências por trilhas para facilitar leitura técnica e evidenciar capacidade de entrega ponta a ponta.
        </p>
      </header>

      <motion.ul
        className="grid gap-md lg:grid-cols-3"
        variants={variantesLista}
        initial="oculto"
        whileInView="visivel"
        viewport={{ once: true, amount: 0.25 }}
      >
        {trilhasSkills.map((trilha) => (
          <motion.li
            key={trilha.titulo}
            variants={varianteItem}
            className="group relative overflow-hidden rounded-3xl border border-midnight-stroke/60 bg-gradient-to-br from-midnight-surface/80 via-midnight-surface/45 to-midnight-bg p-lg shadow-2xl shadow-black/20"
          >
            <span className="pointer-events-none absolute -right-10 top-8 h-24 w-24 rounded-full bg-midnight-accent/20 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
            <h3 className="text-xl font-semibold text-midnight-text">{trilha.titulo}</h3>
            <p className="mt-sm text-sm text-midnight-muted">{trilha.resumo}</p>

            <div className="mt-md flex flex-wrap gap-sm">
              {trilha.stacks.map((stack) => (
                <span
                  key={stack}
                  className="rounded-full border border-midnight-stroke/70 bg-midnight-bg/55 px-md py-xs text-xs uppercase tracking-[0.2em] text-midnight-muted"
                >
                  {stack}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
