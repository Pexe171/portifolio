import type { Metadata } from 'next';
import ProjectCard from '@/components/(ui)/ProjectCard';
import { listarTodosProjetos } from '@/lib/projetos';
import { siteMetadata } from '@/lib/siteMetadata';

const openGraphImages = siteMetadata.ogImage
  ? [
      {
        url: siteMetadata.ogImage,
        width: 617,
        height: 324,
        alt: 'Arquivo de projetos de David Henrique'
      }
    ]
  : undefined;

const twitterImages = siteMetadata.ogImage ? [siteMetadata.ogImage] : undefined;

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Arquivo com os estudos de caso que melhor representam meu trabalho em CRM, e-commerce, automação e IA aplicada.',
  alternates: {
    canonical: `${siteMetadata.url}/projetos`
  },
  openGraph: {
    title: 'Projetos | David Henrique',
    description:
      'Arquivo com os estudos de caso que melhor representam meu trabalho em CRM, e-commerce, automação e IA aplicada.',
    url: `${siteMetadata.url}/projetos`,
    siteName: siteMetadata.name,
    ...(openGraphImages ? { images: openGraphImages } : {})
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projetos | David Henrique',
    description:
      'Arquivo com os estudos de caso que melhor representam meu trabalho em CRM, e-commerce, automação e IA aplicada.',
    ...(twitterImages ? { images: twitterImages } : {})
  }
};

export default async function ProjetosPage() {
  const projetos = await listarTodosProjetos();

  return (
    <section className="space-y-8 py-10 md:py-16">
      <header className="space-y-4">
        <p className="eyebrow">Arquivo</p>
        <h1 className="section-heading">Os projetos aqui funcionam como portfólio, mas também como prova de raciocínio.</h1>
        <p className="section-copy">
          Cada case foi organizado para mostrar problema, decisão de arquitetura, leitura de produto e resultado esperado para o
          contexto em que foi construído.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {projetos.map((projeto) => (
          <ProjectCard key={projeto.slug} projeto={projeto} />
        ))}
      </div>
    </section>
  );
}
