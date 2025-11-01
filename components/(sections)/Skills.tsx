const habilidades = [
  'Design Systems e documentação viva',
  'Acessibilidade web (WCAG) e testes automatizados',
  'Integração entre produto, design e engenharia',
  'Storytelling e facilitação de workshops',
  'Next.js, React, TypeScript e Tailwind CSS',
  'Integração com APIs, CMS e automações'
];

export default function Skills() {
  return (
    <section id="habilidades" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Competências</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Habilidades técnicas e humanas</h2>
      </header>

      <ul className="grid gap-md md:grid-cols-2">
        {habilidades.map((habilidade) => (
          <li
            key={habilidade}
            className="rounded-xl border border-midnight-stroke bg-midnight-surface p-lg text-midnight-muted shadow-sm transition hover:-translate-y-1 hover:border-midnight-accent hover:shadow-lg"
          >
            {habilidade}
          </li>
        ))}
      </ul>
    </section>
  );
}
