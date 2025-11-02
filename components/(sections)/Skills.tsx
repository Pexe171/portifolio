'use client';

import { motion } from 'framer-motion';

const habilidades = [
  {
    icone: '⚛️',
    titulo: 'Frontend moderno',
    descricao: 'Next.js 14, React Server Components, TypeScript e Tailwind CSS em interfaces de alta performance.'
  },
  {
    icone: '🧠',
    titulo: 'Arquitetura Node.js',
    descricao: 'APIs em Express, padrões BFF/Proxy e serviços desacoplados com autenticação JWT segura.'
  },
  {
    icone: '🖥️',
    titulo: 'Aplicações desktop',
    descricao: 'Apps em Electron integrados ao WhatsApp, automações com node-cron e bancos locais SQLite.'
  },
  {
    icone: '🗄️',
    titulo: 'Persistência de dados',
    descricao: 'Modelagem em MongoDB, seeds versionadas e orquestração com Docker para ambientes completos.'
  },
  {
    icone: '🔐',
    titulo: 'Segurança e autenticação',
    descricao: 'Fluxos com cookies httpOnly, RBAC, criptografia de senhas e observabilidade integrada.'
  },
  {
    icone: '🤖',
    titulo: 'IA & integrações',
    descricao: 'Integração com OpenAI, webhooks do WhatsApp, CMS e pipelines automáticos orientados a negócio.'
  },
  {
    icone: '🧩',
    titulo: 'Design Systems vivos',
    descricao: 'shadcn/ui customizado, documentação em MDX e guidelines que conectam produto, design e engenharia.'
  },
  {
    icone: '🚀',
    titulo: 'DevOps & DX',
    descricao: 'Pipelines CI, docker-compose unificado e onboarding guiado por documentação viva.'
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
            key={habilidade.titulo}
            variants={varianteItem}
            className="flex flex-col gap-sm rounded-2xl border border-midnight-stroke/60 bg-gradient-to-br from-midnight-surface to-midnight-surface/70 p-lg text-midnight-muted shadow-lg shadow-midnight-shadow/40 transition hover:-translate-y-1.5 hover:border-midnight-accent hover:text-midnight-text"
          >
            <span aria-hidden className="text-3xl">{habilidade.icone}</span>
            <div className="space-y-xs text-left">
              <h3 className="font-semibold text-midnight-text">{habilidade.titulo}</h3>
              <p>{habilidade.descricao}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
