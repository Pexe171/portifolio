import Link from 'next/link';
import FadeIn from '@/components/(ui)/FadeIn';
import TypewriterText from '@/components/(ui)/TypewriterText';
import { frasesHero, metricasHero } from '@/lib/homeContent';

export default function Hero() {
  return (
    <FadeIn>
      <section
        id="inicio"
        className="relative isolate overflow-hidden rounded-[36px] border border-midnight-stroke/60 bg-gradient-to-br from-midnight-surface/95 via-midnight-surface/70 to-midnight-bg px-xl py-3xl shadow-2xl shadow-black/40"
      >
        <div className="aurora pointer-events-none absolute inset-x-0 -top-32 h-64 opacity-70" />
        <div className="pointer-events-none absolute -left-20 top-40 h-56 w-56 rounded-full bg-midnight-accent/20 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl animate-float-slower" />

        <div className="relative grid gap-2xl lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-lg">
            <div className="inline-flex items-center gap-sm rounded-full border border-midnight-stroke/70 bg-midnight-bg/40 px-md py-xs text-xs uppercase tracking-[0.35em] text-midnight-muted">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              Disponível para projetos estratégicos
            </div>

            <div className="space-y-sm">
              <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">
                Olá, eu sou <span className="font-semibold text-midnight-text">David Henrique</span>
              </p>
              <h1 className="font-display text-4xl font-bold leading-tight text-midnight-text md:text-6xl">
                Portfólio full stack com padrão sênior de frontend e foco em negócio.
              </h1>
              <p className="text-lg font-medium text-midnight-accent md:text-2xl">
                <TypewriterText frases={frasesHero} className="after:bg-midnight-accent" />
              </p>
            </div>

            <p className="max-w-2xl text-lg text-midnight-muted">
              Esta versão foi repensada para ser completa: experiência visual avançada, animações intencionais, clareza arquitetural
              e documentação de deploy pronta para produção na AWS.
            </p>

            <div className="flex flex-wrap gap-md">
              <Link
                href="/#projetos"
                className="group relative inline-flex items-center gap-sm rounded-full bg-midnight-accent px-lg py-sm text-sm font-semibold text-midnight-bg shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-midnight-accent-strong"
              >
                Explorar estudos de caso
                <span className="text-lg transition group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/#contato"
                className="inline-flex items-center gap-sm rounded-full border border-midnight-stroke/80 bg-midnight-bg/40 px-lg py-sm text-sm font-semibold text-midnight-text transition hover:border-midnight-accent hover:text-midnight-accent"
              >
                Vamos conversar
              </Link>
            </div>
          </div>

          <div className="space-y-md">
            <div className="rounded-3xl border border-midnight-stroke/70 bg-midnight-bg/50 p-lg backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-midnight-muted">Blueprint de entrega</p>
              <ul className="mt-md space-y-sm text-sm text-midnight-muted">
                <li className="rounded-2xl border border-midnight-stroke/60 bg-midnight-surface/70 p-md">
                  <span className="font-semibold text-midnight-text">01.</span> Descoberta do problema e mapeamento de arquitetura.
                </li>
                <li className="rounded-2xl border border-midnight-stroke/60 bg-midnight-surface/70 p-md">
                  <span className="font-semibold text-midnight-text">02.</span> Desenvolvimento full stack com componentização limpa.
                </li>
                <li className="rounded-2xl border border-midnight-stroke/60 bg-midnight-surface/70 p-md">
                  <span className="font-semibold text-midnight-text">03.</span> Observabilidade, documentação e deploy contínuo em nuvem.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-sm sm:grid-cols-3">
              {metricasHero.map((metrica) => (
                <div key={metrica.rotulo} className="rounded-2xl border border-midnight-stroke/70 bg-midnight-surface/60 p-md text-center">
                  <p className="text-2xl font-semibold text-midnight-text">{metrica.valor}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-midnight-muted">{metrica.rotulo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
