import Link from 'next/link';
import TypewriterText from '@/components/(ui)/TypewriterText';

const FRASES_TYPEWRITER = [
  'Interfaces que respeitam o tempo das pessoas.',
  'Código com propósito e narrativa.',
  'Produtos digitais que equilibram dados e empatia.'
];

export default function Hero() {
  return (
    <section id="inicio" className="flex flex-col gap-lg py-section">
      <div className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Olá, eu sou</p>
        <h1 className="font-display text-4xl font-bold leading-tight text-midnight-text md:text-6xl">
          Desenvolvedor front-end focado em experiências memoráveis
        </h1>
        <p className="text-xl font-medium text-midnight-accent md:text-2xl">
          <TypewriterText frases={FRASES_TYPEWRITER} className="after:bg-midnight-accent" />
        </p>
      </div>

      <p className="max-w-2xl text-lg text-midnight-muted">
        Conecto estratégia, design e engenharia para criar jornadas que acolhem pessoas reais. Cada projeto que compartilho
        aqui é fruto de pesquisa, experimentação e muito cuidado com detalhes, acessibilidade e performance.
      </p>

      <div className="flex flex-wrap gap-md">
        <Link
          href="#projetos"
          className="rounded-full bg-midnight-accent px-lg py-sm text-sm font-semibold text-midnight-bg shadow transition hover:bg-midnight-accent-strong"
        >
          Ver projetos em destaque
        </Link>
        <Link
          href="#contato"
          className="rounded-full border border-midnight-stroke px-lg py-sm text-sm font-semibold text-midnight-text transition hover:border-midnight-accent hover:text-midnight-accent"
        >
          Falar comigo
        </Link>
      </div>
    </section>
  );
}
