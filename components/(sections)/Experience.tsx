import Timeline, { type EventoTimeline } from '@/components/(ui)/Timeline';

const experiencias: EventoTimeline[] = [
  {
    ano: '2024',
    titulo: 'Início da vida acadêmica',
    descricao:
      'Entrei na Universidade Federal do Amazonas (UFAM) para cursar Engenharia de Software, dando início à minha jornada universitária.'
  }
];

export default function Experience() {
  return (
    <section id="experiencias" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Experiências</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Uma jornada guiada por colaboração</h2>
      </header>

      <Timeline eventos={experiencias} />
    </section>
  );
}
