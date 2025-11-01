import Timeline, { type EventoTimeline } from '@/components/(ui)/Timeline';

const experiencias: EventoTimeline[] = [
  {
    ano: '2024',
    titulo: 'Líder Front-end em Produto SaaS',
    descricao: 'Conduzi a evolução do design system, mediando conversas entre design, engenharia e negócio para escalar o produto.'
  },
  {
    ano: '2022',
    titulo: 'Product Designer & Developer',
    descricao: 'Combinei pesquisa com prototipação em alta fidelidade e entregas front-end para validar hipóteses com clientes reais.'
  },
  {
    ano: '2020',
    titulo: 'Freelancer focado em marcas humanas',
    descricao: 'Desenvolvi sites performáticos com storytelling envolvente para pequenas empresas e profissionais independentes.'
  }
];

export default function Experience() {
  return (
    <section id="experiencias" className="space-y-8 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Experiências</p>
        <h2 className="font-titulo text-3xl font-semibold">Uma jornada guiada por colaboração</h2>
      </header>

      <Timeline eventos={experiencias} />
    </section>
  );
}
