import { notFound } from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';

interface ProjetoPageProps {
  params: { slug: string };
}

async function carregarProjeto(slug: string) {
  const arquivo = path.join(process.cwd(), 'content', 'projetos', `${slug}.mdx`);

  try {
    const conteudo = await fs.readFile(arquivo, 'utf-8');
    const { content, frontmatter } = await compileMDX<{ titulo: string; resumo: string }>({
      source: conteudo,
      options: { parseFrontmatter: true }
    });

    return { conteudo: content, dados: frontmatter };
  } catch (erro) {
    console.error(`Erro ao carregar o projeto "${slug}":`, erro);
    return null;
  }
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
  const pastaProjetos = path.join(process.cwd(), 'content', 'projetos');
  const arquivos = await fs.readdir(pastaProjetos);

  return arquivos
    .filter((arquivo) => arquivo.endsWith('.mdx'))
    .map((arquivo) => ({ slug: arquivo.replace(/\.mdx$/, '') }));
}

export default async function ProjetoPage({ params }: ProjetoPageProps) {
  const { slug } = params;
  const projeto = await carregarProjeto(slug);

  if (!projeto) {
    notFound();
  }

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="mb-10 space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Estudo de Caso</p>
        <h1 className="font-titulo text-4xl font-semibold">{projeto?.dados?.titulo}</h1>
        {projeto?.dados?.resumo && <p className="text-lg text-slate-600 dark:text-slate-300">{projeto.dados.resumo}</p>}
      </header>
      <div className="prose-headings:font-titulo prose-p:text-justify prose-a:text-destaque">
        {projeto?.conteudo}
      </div>
    </article>
  );
}
