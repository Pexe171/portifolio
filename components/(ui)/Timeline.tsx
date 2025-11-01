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
    <ol className="relative border-l border-slate-200 pl-6 dark:border-slate-700">
      {eventos.map((evento) => (
        <li key={evento.titulo} className="mb-10 ml-4">
          <div className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border border-destaque bg-white dark:bg-slate-900" />
          <time className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {evento.ano}
          </time>
          <h3 className="mt-2 font-titulo text-2xl font-semibold">{evento.titulo}</h3>
          <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">{evento.descricao}</p>
        </li>
      ))}
    </ol>
  );
}
