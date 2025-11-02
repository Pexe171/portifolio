import Link from 'next/link';
import ProjectCard from '@/components/(ui)/ProjectCard';
import { listarProjetosParaHome } from '@/lib/projetos';

export default async function FeaturedProjects() {
  const projetos = await listarProjetosParaHome();

  return (
    <section id="projetos" className="space-y-2xl py-section">
      <header className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Projetos</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Estudos de caso que mostram minha forma de pensar</h2>
        <p className="max-w-2xl text-midnight-muted">
          Cada card abaixo é alimentado por um arquivo MDX com o estudo de caso completo. Clique para mergulhar nos detalhes de
          pesquisa, design e código.
        </p>
      </header>

      {projetos.length > 0 ? (
        <div className="grid gap-lg md:grid-cols-2">
          {projetos.map((projeto) => (
            <ProjectCard key={projeto.slug} projeto={projeto} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-midnight-stroke bg-midnight-surface/60 p-xl text-center text-midnight-muted">
          Ainda estou preparando os estudos de caso. Volte em breve para ver como transformo desafios complexos em resultados
          concretos.
        </div>
      )}

      <div className="text-center">
        <Link
          href="/projetos"
          className="font-semibold text-midnight-accent transition hover:text-midnight-accent-strong"
        >
          Ver o arquivo completo de projetos &rarr;
        </Link>
      </div>
    </section>
  );
}
