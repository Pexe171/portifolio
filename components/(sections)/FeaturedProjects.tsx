import Link from 'next/link';
import FadeIn from '@/components/(ui)/FadeIn';
import ProjectCard from '@/components/(ui)/ProjectCard';
import { listarProjetosParaHome } from '@/lib/projetos';

export default async function FeaturedProjects() {
  const projetos = await listarProjetosParaHome();

  return (
    <FadeIn delay={0.08}>
      <section id="projetos" className="space-y-8 py-24">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="eyebrow">Cases selecionados</p>
            <h2 className="section-heading">Quatro projetos que explicam meu recorte técnico melhor que qualquer bio.</h2>
            <p className="section-copy">
              A curadoria abaixo foi montada para mostrar profundidade de arquitetura, leitura de produto e domínio de sistemas
              com integração, operação e regras reais.
            </p>
          </div>
          <Link href="/projetos" className="button-secondary w-fit">
            Abrir arquivo completo
          </Link>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          {projetos.map((projeto) => (
            <ProjectCard key={projeto.slug} projeto={projeto} />
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
