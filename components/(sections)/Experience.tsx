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
    <section id="experiencias" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Experiências</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Uma jornada guiada por colaboração</h2>
      </header>

      <Timeline eventos={experiencias} />
    </section>
  );
}
