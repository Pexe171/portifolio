import Link from 'next/link';
import TypewriterText from '@/components/(ui)/TypewriterText';

const FRASES_TYPEWRITER = [
  'APIs estáveis que conectam negócios a pessoas.',
  'Automação para times financeiros mais eficientes.',
  'Back-end confiável com foco em resultados reais.'
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden rounded-[32px] border border-midnight-stroke/60 bg-gradient-to-br from-midnight-surface/90 via-midnight-surface/60 to-midnight-bg px-xl py-3xl shadow-2xl shadow-black/30"
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-midnight-accent/30 blur-3xl animate-glow" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-float-slow" />

      <div className="relative grid gap-2xl lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-lg">
          <div className="space-y-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">
              Opa Meu Patrao, eu sou <span className="font-semibold text-midnight-text">David Henrique Miranda da Silva</span>
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-midnight-text md:text-6xl">
              Engenharia de software com foco em back-end de alta performance.
            </h1>
            <p className="text-xl font-medium text-midnight-accent md:text-2xl">
              <TypewriterText frases={FRASES_TYPEWRITER} className="after:bg-midnight-accent" />
            </p>
          </div>

          <p className="max-w-2xl text-lg text-midnight-muted">
            Transformo ideias em experiências digitais enxutas e escaláveis. Integro APIs, automatizo operações e desenho
            arquiteturas que aguentam o crescimento do produto.
          </p>

          <div className="flex flex-wrap gap-md">
            <Link
              href="/#projetos"
              className="group relative inline-flex items-center gap-sm rounded-full bg-midnight-accent px-lg py-sm text-sm font-semibold text-midnight-bg shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-midnight-accent-strong"
            >
              Ver projetos em destaque
              <span className="text-lg transition group-hover:translate-x-1">&rarr;</span>
            </Link>
            <Link
              href="/#contato"
              className="inline-flex items-center gap-sm rounded-full border border-midnight-stroke/80 bg-midnight-bg/40 px-lg py-sm text-sm font-semibold text-midnight-text transition hover:border-midnight-accent hover:text-midnight-accent"
            >
              Falar comigo
            </Link>
          </div>

          <div className="flex flex-wrap gap-sm text-xs uppercase tracking-[0.3em] text-midnight-muted">
            <span className="rounded-full border border-midnight-stroke/70 bg-midnight-surface/60 px-md py-xs">Node.js</span>
            <span className="rounded-full border border-midnight-stroke/70 bg-midnight-surface/60 px-md py-xs">APIs</span>
            <span className="rounded-full border border-midnight-stroke/70 bg-midnight-surface/60 px-md py-xs">Automação</span>
            <span className="rounded-full border border-midnight-stroke/70 bg-midnight-surface/60 px-md py-xs">UX Tech</span>
          </div>
        </div>

        <div className="grid gap-md sm:grid-cols-2">
          {[
            {
              titulo: 'Projetos reais',
              descricao: 'Cases construídos com foco em impacto e clareza de resultados.',
              destaque: '+6'
            },
            {
              titulo: 'Experiência técnica',
              descricao: 'APIs, automações e integrações para operações críticas.',
              destaque: '24/7'
            },
            {
              titulo: 'Foco em entrega',
              descricao: 'Documentação viva e colaboração para times ágeis.',
              destaque: 'Fast'
            },
            {
              titulo: 'Disponibilidade',
              descricao: 'Aberto para estágios, projetos e parcerias.',
              destaque: 'ON'
            }
          ].map((item) => (
            <div
              key={item.titulo}
              className="group rounded-3xl border border-midnight-stroke/60 bg-midnight-surface/40 p-lg backdrop-blur transition hover:border-midnight-accent/60 hover:bg-midnight-surface/70"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-midnight-muted">{item.titulo}</p>
              <p className="mt-sm text-2xl font-semibold text-midnight-text">{item.destaque}</p>
              <p className="mt-xs text-sm text-midnight-muted">{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
