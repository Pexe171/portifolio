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
    <section id="habilidades" className="space-y-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Competências</p>
        <h2 className="font-titulo text-3xl font-semibold">Habilidades técnicas e humanas</h2>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {habilidades.map((habilidade) => (
          <li
            key={habilidade}
            className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm transition hover:-translate-y-1 hover:border-destaque hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {habilidade}
          </li>
        ))}
      </ul>
    </section>
  );
}
