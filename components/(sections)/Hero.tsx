import Link from 'next/link';
import FadeIn from '@/components/(ui)/FadeIn';
import { credibilityStats, heroSignals, profileLinks } from '@/lib/profile';

export default function Hero() {
  return (
    <FadeIn>
      <section id="inicio" className="section-shell px-6 py-10 md:px-10 md:py-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-midnight-accent/70 to-transparent" />
        <div className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-midnight-accent/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <span className="pill">Portfólio editorial técnico</span>
              <div className="space-y-4">
                <p className="eyebrow">David Henrique</p>
                <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-midnight-text md:text-6xl xl:text-7xl">
                  Eu construo produtos que conectam CRM, automação operacional e IA aplicada.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-midnight-muted md:text-xl">
                  Meu foco está em sistemas que precisam organizar operação real: atendimento, fluxo comercial, integrações,
                  decisões em tempo real e arquitetura capaz de crescer sem colapsar a experiência.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/#projetos" className="button-primary">
                Ver cases selecionados
              </Link>
              <Link href="/#contato" className="button-secondary">
                Conversar sobre um projeto
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {heroSignals.map((signal) => (
                <span key={signal} className="pill">
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {credibilityStats.map((item) => (
              <article key={item.label} className="glass-card p-5">
                <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-midnight-text">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-midnight-muted">{item.label}</p>
              </article>
            ))}

            <article className="glass-card p-5 sm:col-span-3 lg:col-span-1">
              <p className="eyebrow">Presença</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {profileLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary !px-4 !py-2 !text-xs"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
