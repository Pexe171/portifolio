import Timeline from '@/components/(ui)/Timeline';
import { processSteps } from '@/lib/profile';

export default function Experience() {
  const eventos = processSteps.map((step) => ({
    ano: step.year,
    titulo: step.title,
    descricao: step.description
  }));

  return (
    <section className="space-y-8 py-24">
      <header className="space-y-4">
        <p className="eyebrow">Modo de operação</p>
        <h2 className="section-heading">Meu processo é guiado por fluxo, contratos e clareza operacional.</h2>
        <p className="section-copy">
          Mesmo quando o projeto é visualmente forte, a base continua sendo entender a operação, estruturar a arquitetura e
          só então refinar a experiência.
        </p>
      </header>

      <Timeline eventos={eventos} />
    </section>
  );
}
