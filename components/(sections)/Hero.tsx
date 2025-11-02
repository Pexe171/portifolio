import Link from 'next/link';
import TypewriterText from '@/components/(ui)/TypewriterText';

const FRASES_TYPEWRITER = [
  'APIs estáveis que conectam negócios a pessoas.',
  'Automação para times financeiros mais eficientes.',
  'Back-end confiável com foco em resultados reais.'
];

export default function Hero() {
  return (
    <section id="inicio" className="flex flex-col gap-lg py-section">
      <div className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">
          Opa Meu Patrao, eu sou <span className="font-semibold text-midnight-text">David Henrique Miranda da Silva</span>
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-midnight-text md:text-6xl">
          Estudante de Engenharia de Software com foco Back-end.
        </h1>
        <p className="text-xl font-medium text-midnight-accent md:text-2xl">
          <TypewriterText frases={FRASES_TYPEWRITER} className="after:bg-midnight-accent" />
        </p>
      </div>

      <p className="max-w-2xl text-lg text-midnight-muted">
        Estudante de Engenharia de Software com foco em Back-end. Transformo ideias em produtos
        funcionais criando integrações sólidas, automatizando rotinas e cuidando da experiência de ponta a ponta.
      </p>

      <div className="flex flex-wrap gap-md">
        <Link
          href="/#projetos"
          className="rounded-full bg-midnight-accent px-lg py-sm text-sm font-semibold text-midnight-bg shadow transition hover:bg-midnight-accent-strong"
        >
          Ver projetos em destaque
        </Link>
        <Link
          href="/#contato"
          className="rounded-full border border-midnight-stroke px-lg py-sm text-sm font-semibold text-midnight-text transition hover:border-midnight-accent hover:text-midnight-accent"
        >
          Falar comigo
        </Link>
      </div>
    </section>
  );
}
