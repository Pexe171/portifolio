import type { Metadata } from 'next';
import ProjectCard from '@/components/(ui)/ProjectCard';
import { listarTodosProjetos } from '@/lib/projetos';
import { siteMetadata } from '@/lib/siteMetadata';

const openGraphImages = siteMetadata.ogImage
  ? [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Miniatura dos projetos desenvolvidos por David Henrique'
      }
    ]
  : undefined;

const twitterImages = siteMetadata.ogImage ? [siteMetadata.ogImage] : undefined;

export const metadata: Metadata = {
  title: 'Arquivo de projetos | David Henrique Miranda da Silva',
  description:
    'Coleção completa dos meus estudos de caso em desenvolvimento web e back-end, com detalhes sobre arquitetura, testes e resultados gerados.',
  alternates: {
    canonical: `${siteMetadata.url}/projetos`
  },
  openGraph: {
    title: 'Arquivo de projetos | David Henrique Miranda da Silva',
    description:
      'Reúna-se com todos os estudos de caso que desenvolvi, com foco em arquitetura bem estruturada, integrações e segurança.',
    url: `${siteMetadata.url}/projetos`,
    siteName: siteMetadata.name,
    ...(openGraphImages ? { images: openGraphImages } : {})
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arquivo de projetos | David Henrique Miranda da Silva',
    description:
      'Veja cada projeto detalhado, as tecnologias usadas e como resolvi problemas reais com software.',
    ...(twitterImages ? { images: twitterImages } : {})
  }
};

export default async function ProjetosPage() {
  const projetos = await listarTodosProjetos();
  const total = projetos.length;

  return (
    <section className="space-y-2xl py-section">
      <header className="space-y-md">
        <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Arquivo</p>
        <h1 className="font-display text-4xl font-semibold text-midnight-text md:text-5xl">
          Todos os meus projetos em um só lugar
        </h1>
        <p className="max-w-2xl text-midnight-muted">
          Aqui você encontra desde os cases em destaque até experimentos e estudos que consolidaram minhas habilidades em
          arquitetura, automação e experiências web.
        </p>
        <div className="flex flex-wrap items-center gap-md text-xs uppercase tracking-[0.35em] text-midnight-muted">
          <span className="rounded-full border border-midnight-stroke/70 bg-midnight-bg/40 px-md py-xs">
            {total} projetos disponíveis
          </span>
          <span className="rounded-full border border-midnight-stroke/70 bg-midnight-bg/40 px-md py-xs">
            Atualizações frequentes
          </span>
          <span className="rounded-full border border-midnight-stroke/70 bg-midnight-bg/40 px-md py-xs">
            Casos completos + experimentos
          </span>
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
          Ainda estou organizando meus estudos de caso. Volte em breve para ver as histórias completas de cada solução.
        </div>
      )}
    </section>
  );
}
