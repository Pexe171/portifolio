import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { carregarProjeto, listarSlugsDeProjetos } from '@/lib/projetos';

interface ProjetoPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProjetoPageProps): Promise<Metadata> {
  const { slug } = params;
  const projeto = await carregarProjeto(slug);

  if (!projeto?.dados?.titulo) {
    return {
      title: 'Projeto não encontrado | Meu Portfólio'
    };
  }

  return {
    title: `${projeto.dados.titulo} | Meu Portfólio`,
    description: projeto.dados.resumo ?? 'Estudo de caso detalhado.'
  };
}

export async function generateStaticParams() {
  const slugs = await listarSlugsDeProjetos();

  return slugs.map((slug) => ({ slug }));
}

export default async function ProjetoPage({ params }: ProjetoPageProps) {
  const { slug } = params;
  const projeto = await carregarProjeto(slug);

  if (!projeto) {
    notFound();
  }

  return (
    <article className="prose max-w-none text-midnight-text prose-headings:font-display prose-a:text-midnight-accent">
      <header className="mb-2xl space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Estudo de Caso</p>
        <h1 className="font-display text-4xl font-semibold">{projeto?.dados?.titulo}</h1>
        {projeto?.dados?.resumo && <p className="text-lg text-midnight-muted">{projeto.dados.resumo}</p>}
      </header>
      <div className="prose-p:text-justify">{projeto?.conteudo}</div>
    </article>
  );
}
