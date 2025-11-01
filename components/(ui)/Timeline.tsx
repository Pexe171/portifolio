export interface EventoTimeline {
  ano: string;
  titulo: string;
  descricao: string;
}

interface TimelineProps {
  eventos: EventoTimeline[];
}

export default function Timeline({ eventos }: TimelineProps) {
  return (
    <ol className="relative border-l border-midnight-stroke/60 pl-lg">
      {eventos.map((evento) => (
        <li key={evento.titulo} className="mb-2xl ml-md">
          <div className="absolute -left-[9px] mt-sm h-4 w-4 rounded-full border border-midnight-accent bg-midnight-surface" />
          <time className="text-sm font-semibold uppercase tracking-[0.3em] text-midnight-muted">
            {evento.ano}
          </time>
          <h3 className="mt-sm font-display text-2xl font-semibold text-midnight-text">{evento.titulo}</h3>
          <p className="mt-md max-w-2xl text-base text-midnight-muted">{evento.descricao}</p>
        </li>
      ))}
    </ol>
  );
}
