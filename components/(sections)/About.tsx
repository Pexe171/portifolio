import Image from 'next/image';
import ScrollReveal from '@/components/(ui)/ScrollReveal';
import { pilaresSobre } from '@/lib/homeContent';

export default function About() {
  return (
    <section id="sobre" className="space-y-2xl py-section">
      <ScrollReveal className="space-y-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Sobre mim</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text md:text-4xl">
          Engenharia de produto com visão técnica e execução completa
        </h2>
      </ScrollReveal>

      <div className="grid gap-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-lg text-lg text-midnight-muted">
          <ScrollReveal delay={0.1}>
            <p>
              Sou estudante de Engenharia de Software e construo soluções full stack com foco em resultado: performance de aplicação,
              experiência de usuário e previsibilidade de operação.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p>
              Atuo com uma abordagem de ponta a ponta, conectando descoberta, arquitetura, desenvolvimento, deploy e evolução.
              Priorizo código limpo, decisões documentadas e colaboração eficiente entre áreas.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <ul className="grid gap-sm text-base">
              {pilaresSobre.map((pilar) => (
                <li
                  key={pilar}
                  className="flex items-start gap-sm rounded-2xl border border-midnight-stroke/60 bg-midnight-surface/40 p-md backdrop-blur"
                >
                  <span className="mt-2 inline-flex h-2 w-2 rounded-full bg-midnight-accent" aria-hidden />
                  <span>{pilar}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3} className="mx-auto w-full max-w-lg">
          <div className="relative overflow-hidden rounded-3xl border border-midnight-stroke/60 bg-midnight-surface/40 shadow-2xl shadow-black/30">
            <div className="absolute inset-0 bg-gradient-to-tr from-midnight-accent/20 via-transparent to-violet-500/20" />
            <div className="absolute -right-10 top-8 h-24 w-24 rounded-full bg-midnight-accent/30 blur-2xl" />
            <Image
              src="/images/foto-perfil.svg"
              alt="Retrato ilustrado do desenvolvedor sorrindo"
              width={600}
              height={600}
              className="relative block w-full"
              priority
            />
            <div className="absolute inset-x-md bottom-md rounded-2xl border border-midnight-stroke/60 bg-midnight-bg/70 p-md backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-midnight-muted">Mindset</p>
              <p className="mt-2 text-sm text-midnight-text">
                &ldquo;Boas soluções nascem da combinação entre profundidade técnica, experiência refinada e leitura de negócio.&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
