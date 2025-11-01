import Image from 'next/image';
import ScrollReveal from '@/components/(ui)/ScrollReveal';

export default function About() {
  return (
    <section id="sobre" className="space-y-2xl py-section">
      <ScrollReveal className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Sobre mim</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Histórias, processos e valores</h2>
      </ScrollReveal>

      <div className="grid gap-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-lg text-lg text-midnight-muted">
          <ScrollReveal delay={0.1}>
            <p>
              Sou movido por criar produtos digitais que sejam inclusivos e que respeitem o tempo das pessoas. Pesquiso, desenho
              e programo experiências que combinam storytelling, dados e tecnologia para entregar resultados palpáveis.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p>
              Nos últimos anos liderei squads multidisciplinares, facilitei descobertas com usuários reais e construí design
              systems que escalam com segurança. A cada projeto aprendo algo novo sobre como equilibrar ambição e empatia.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <ul className="grid gap-sm text-base">
              <li className="flex items-start gap-sm rounded-2xl border border-midnight-stroke/60 bg-midnight-surface/60 p-md">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-midnight-accent" aria-hidden />
                <span>
                  Acredito em processos colaborativos, com rituais leves e foco no aprendizado contínuo.
                </span>
              </li>
              <li className="flex items-start gap-sm rounded-2xl border border-midnight-stroke/60 bg-midnight-surface/60 p-md">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-midnight-accent" aria-hidden />
                <span>Busco acessibilidade desde o primeiro rascunho para garantir experiências realmente inclusivas.</span>
              </li>
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2} className="mx-auto w-full max-w-md">
          <div className="relative overflow-hidden rounded-3xl border border-midnight-stroke bg-midnight-surface shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-midnight-accent/20 via-transparent to-midnight-accent/30" />
            <Image
              src="/images/foto-perfil.svg"
              alt="Retrato ilustrado do desenvolvedor sorrindo"
              width={600}
              height={600}
              className="relative block w-full"
              priority
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
