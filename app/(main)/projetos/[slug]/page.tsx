import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { carregarProjeto, listarSlugsDeProjetos } from '@/lib/projetos';
import { siteMetadata } from '@/lib/siteMetadata';

interface ProjetoPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProjetoPageProps): Promise<Metadata> {
  const projeto = await carregarProjeto(params.slug);

  if (!projeto?.dados?.titulo) {
    return {
      title: 'Projeto não encontrado',
      description: 'O estudo de caso solicitado não está disponível.',
      alternates: {
        canonical: `${siteMetadata.url}/projetos/${params.slug}`
      },
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const descricao = projeto.dados.resumo;
  const imagemCompartilhamento = projeto.dados.imagem ?? siteMetadata.ogImage;
  const urlAbsoluta = `${siteMetadata.url}/projetos/${params.slug}`;
  const openGraphImages = imagemCompartilhamento
    ? [
        {
          url: imagemCompartilhamento,
          alt: `Imagem de destaque do projeto ${projeto.dados.titulo}`
        }
      ]
    : undefined;
  const twitterImages = imagemCompartilhamento ? [imagemCompartilhamento] : undefined;

  return {
    title: projeto.dados.titulo,
    description: descricao,
    alternates: {
      canonical: urlAbsoluta
    },
    openGraph: {
      type: 'article',
      locale: siteMetadata.locale,
      url: urlAbsoluta,
      siteName: siteMetadata.name,
      title: `${projeto.dados.titulo} | ${siteMetadata.name}`,
      description: descricao,
      ...(openGraphImages ? { images: openGraphImages } : {}),
      authors: [siteMetadata.author]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${projeto.dados.titulo} | ${siteMetadata.name}`,
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
  const projeto = await carregarProjeto(params.slug);

  if (!projeto) {
    notFound();
  }

  const links = [
    projeto.dados.repoUrl ? { href: projeto.dados.repoUrl, label: 'Repositório' } : null,
    projeto.dados.liveUrl ? { href: projeto.dados.liveUrl, label: 'Demo' } : null
  ].filter((item): item is { href: string; label: string } => item !== null);

  return (
    <article className="space-y-8 py-10 md:py-16">
      <header className="section-shell overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6 p-6 md:p-8">
            <p className="eyebrow">Estudo de caso</p>
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-midnight-text md:text-5xl">
                {projeto.dados.titulo}
              </h1>
              <p className="text-lg leading-8 text-midnight-muted">{projeto.dados.resumo}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {projeto.dados.year && <span className="pill">{projeto.dados.year}</span>}
              {projeto.dados.role && <span className="pill">{projeto.dados.role}</span>}
              {projeto.dados.status && <span className="pill">{projeto.dados.status}</span>}
            </div>

            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} target="_blank" rel="noreferrer" className="button-secondary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_top,_rgba(52,211,235,0.16),_transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] lg:min-h-full lg:border-l lg:border-t-0">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_38%,rgba(52,211,235,0.08))]" />
            {projeto.dados.imagem ? (
              <Image
                src={projeto.dados.imagem}
                alt={projeto.dados.titulo}
                fill
                className="object-contain object-center p-8 md:p-10"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-midnight-accent/20 via-transparent to-violet-500/20" />
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        {projeto.dados.tags.map((tag) => (
          <span key={tag} className="pill !px-3 !py-2 !tracking-[0.22em]">
            {tag}
          </span>
        ))}
      </div>

      <div className="case-study">{projeto.conteudo}</div>
    </article>
  );
}
