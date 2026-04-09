import ScrollReveal from '@/components/(ui)/ScrollReveal';
import { operationPrinciples } from '@/lib/profile';

const positionCards = [
  {
    title: 'Produto antes de ornamento',
    description:
      'Eu projeto a experiência a partir do fluxo operacional: quem usa, o que precisa ver primeiro e qual decisão precisa tomar.'
  },
  {
    title: 'Arquitetura como parte do UX',
    description:
      'Fila, realtime, permissões, integrações e persistência não ficam escondidos. Eles moldam a qualidade do produto final.'
  },
  {
    title: 'Entrega orientada a leitura técnica',
    description:
      'Documentação, nomes, contratos e organização do código precisam comunicar tão bem quanto a interface comunica para o usuário.'
  }
];

export default function About() {
  return (
    <section className="space-y-8 py-24">
      <ScrollReveal className="space-y-4">
        <p className="eyebrow">Posicionamento</p>
        <h2 className="section-heading">Eu penso como alguém que precisa sustentar produto, não só lançar tela.</h2>
        <p className="section-copy">
          Minha leitura de engenharia parte do negócio e chega na interface. Isso me leva naturalmente para produtos como CRM,
          plataformas operacionais, atendimento omnichannel, automação e sistemas com regras densas.
        </p>
      </ScrollReveal>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <ScrollReveal delay={0.08} className="section-shell p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {positionCards.map((card) => (
              <article key={card.title} className="glass-card p-5">
                <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-midnight-text">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-midnight-muted">{card.description}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.14} className="section-shell p-6 md:p-8">
          <p className="eyebrow">Princípios de trabalho</p>
          <div className="mt-6 grid gap-4">
            {operationPrinciples.map((principle) => (
              <div key={principle} className="glass-card px-5 py-4 text-sm leading-7 text-midnight-muted">
                {principle}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
