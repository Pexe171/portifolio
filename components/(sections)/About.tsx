import Image from 'next/image';
import ScrollReveal from '@/components/(ui)/ScrollReveal';

export default function About() {
  return (
    <section id="sobre" className="space-y-2xl py-section">
      <ScrollReveal className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Sobre mim</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Construindo soluções com propósito</h2>
      </ScrollReveal>

      <div className="grid gap-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-lg text-lg text-midnight-muted">
          <ScrollReveal delay={0.1}>
            <p>
              Estudante de Engenharia de Software com foco em Back-end. Possuo experiência prática na
              criação de aplicações a partir de projetos acadêmicos e pessoais, incluindo o desenvolvimento de um sistema de
              cobrança automatizado com Node.js e integração de API.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p>
              Busco minha primeira oportunidade profissional para aplicar conhecimentos, desenvolver novas habilidades e
              contribuir com soluções de software inovadoras. Tenho atenção especial à qualidade do código, testes e boas
              práticas que mantêm as entregas sustentáveis.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <ul className="grid gap-sm text-base">
              <li className="flex items-start gap-sm rounded-2xl border border-midnight-stroke/60 bg-midnight-surface/60 p-md">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-midnight-accent" aria-hidden />
                <span>Experiência com Node.js, TypeScript e integrações REST para automatizar rotinas de negócio.</span>
              </li>
              <li className="flex items-start gap-sm rounded-2xl border border-midnight-stroke/60 bg-midnight-surface/60 p-md">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-midnight-accent" aria-hidden />
                <span>Prática em organizar projetos com testes, documentação e foco na colaboração entre times.</span>
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
