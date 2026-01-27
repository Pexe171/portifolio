import Link from 'next/link';
import FadeIn from '@/components/(ui)/FadeIn';
import ProjectCard from '@/components/(ui)/ProjectCard';
import { listarProjetosParaHome } from '@/lib/projetos';

export default async function FeaturedProjects() {
  const projetos = await listarProjetosParaHome();
  const total = projetos.length;

  return (
    <FadeIn delay={0.1}>
      <section id="projetos" className="space-y-2xl py-section">
        <header className="flex flex-col gap-lg md:flex-row md:items-end md:justify-between">
          <div className="space-y-md">
            <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Projetos</p>
            <h2 className="font-display text-3xl font-semibold text-midnight-text md:text-4xl">
              Estudos de caso que mostram minha forma de pensar
            </h2>
            <p className="max-w-2xl text-midnight-muted">
              Cada card abaixo é alimentado por um arquivo MDX com o estudo de caso completo. Clique para mergulhar nos detalhes de
              pesquisa, design e código.
            </p>
            <div className="flex flex-wrap items-center gap-md text-xs uppercase tracking-[0.35em] text-midnight-muted">
              <span className="rounded-full border border-midnight-stroke/70 bg-midnight-bg/40 px-md py-xs">
                {total} estudos em destaque
              </span>
              <span className="rounded-full border border-midnight-stroke/70 bg-midnight-bg/40 px-md py-xs">
                Atualizados continuamente
              </span>
            </div>
          </div>
          <div className="flex items-center gap-sm text-xs uppercase tracking-[0.35em] text-midnight-muted">
            <span className="h-[1px] w-10 bg-midnight-stroke/70" />
            Destaques
          </div>
        </header>

        {projetos.length > 0 ? (
          <div className="grid gap-lg lg:grid-cols-2">
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
    </FadeIn>
  );
}
