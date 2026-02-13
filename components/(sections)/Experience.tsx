import Timeline, { type EventoTimeline } from '@/components/(ui)/Timeline';

const experiencias: EventoTimeline[] = [
  {
    ano: '2025',
    titulo: 'Graduação em Engenharia de Software (UFAM)',
    descricao:
      'Início da formação acadêmica com foco em fundamentos sólidos de arquitetura, algoritmos, engenharia de requisitos e qualidade.'
  },
  {
    ano: '2025',
    titulo: 'Projetos autorais com foco em operação real',
    descricao:
      'Construção de aplicações full stack com automações, integrações e interfaces de alta clareza para resolver gargalos de negócio.'
  },
  {
    ano: 'Próximo ciclo',
    titulo: 'Expansão para desafios profissionais',
    descricao:
      'Disponibilidade para atuar em times de produto/engenharia, contribuindo com visão ponta a ponta e execução técnica consistente.'
  }
];

export default function Experience() {
  return (
    <section id="experiencias" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Experiências</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text md:text-4xl">Trajetória em construção, com direção clara</h2>
        <p className="max-w-2xl text-midnight-muted">
          Evolução contínua em engenharia de software, combinando base acadêmica forte, prática em projetos autorais e visão de produto.
        </p>
      </header>

      <Timeline eventos={experiencias} />
    </section>
  );
}
