import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { carregarProjeto, listarSlugsDeProjetos } from '@/lib/projetos';
import { siteMetadata } from '@/lib/siteMetadata';

interface ProjetoPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProjetoPageProps): Promise<Metadata> {
  const { slug } = params;
  const projeto = await carregarProjeto(slug);

  if (!projeto?.dados?.titulo) {
    return {
      title: 'Projeto não encontrado | Meu Portfólio',
      description: 'O estudo de caso solicitado não está disponível ou foi removido.',
      alternates: {
        canonical: `${siteMetadata.url}/projetos/${slug}`
      },
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const descricao = projeto.dados.resumo ?? 'Estudo de caso detalhado com aprendizados e resultados.';
  const imagemCompartilhamento = projeto.dados.imagem ?? siteMetadata.ogImage;
  const urlAbsoluta = `${siteMetadata.url}/projetos/${slug}`;
  const openGraphImages = imagemCompartilhamento
    ? [
        {
          url: imagemCompartilhamento,
          width: 1200,
          height: 630,
          alt: `Imagem de destaque do projeto ${projeto.dados.titulo}`
        }
      ]
    : undefined;
  const twitterImages = imagemCompartilhamento ? [imagemCompartilhamento] : undefined;

  return {
    title: `${projeto.dados.titulo} | Meu Portfólio`,
    description: descricao,
    alternates: {
      canonical: urlAbsoluta
    },
    openGraph: {
      type: 'article',
      locale: siteMetadata.locale,
      url: urlAbsoluta,
      siteName: siteMetadata.name,
      title: `${projeto.dados.titulo} | Meu Portfólio`,
      description: descricao,
      ...(openGraphImages ? { images: openGraphImages } : {}),
      authors: [siteMetadata.author]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${projeto.dados.titulo} | Meu Portfólio`,
      description: descricao,
      ...(twitterImages ? { images: twitterImages } : {})
    }
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
    <article className="space-y-2xl">
      <header className="rounded-3xl border border-midnight-stroke/60 bg-midnight-surface/40 p-2xl shadow-2xl shadow-black/30">
        <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Estudo de Caso</p>
        <h1 className="mt-sm font-display text-4xl font-semibold text-midnight-text md:text-5xl">{projeto?.dados?.titulo}</h1>
        {projeto?.dados?.resumo && <p className="mt-sm text-lg text-midnight-muted">{projeto.dados.resumo}</p>}
      </header>
      <div className="prose prose-invert max-w-none text-midnight-text prose-headings:font-display prose-a:text-midnight-accent">
        <div className="prose-p:text-justify">{projeto?.conteudo}</div>
      </div>
    </article>
  );
}
