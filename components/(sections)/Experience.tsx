import Timeline, { type EventoTimeline } from '@/components/(ui)/Timeline';

const experiencias: EventoTimeline[] = [
  {
    ano: 'Junho de 2025',
    titulo: 'Início da vida acadêmica',
    descricao:
      'Entrei na Universidade Federal do Amazonas (UFAM) em junho de 2025 para cursar Engenharia de Software, dando início à minha jornada universitária.'
  }
];

export default function Experience() {
  return (
    <section id="experiencias" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Experiências</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text md:text-4xl">Uma jornada guiada por colaboração</h2>
        <p className="max-w-2xl text-midnight-muted">
          Acompanhe os marcos que consolidaram minha trajetória acadêmica e minha visão sobre construir produtos de qualidade.
        </p>
      </header>

      <Timeline eventos={experiencias} />
    </section>
  );
}
