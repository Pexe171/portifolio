import fs from 'node:fs/promises';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactNode } from 'react';

export interface ProjetoFrontmatter {
  title: string;
  summary?: string;
  tags?: string[];
  cover?: string;
  video?: string;
  order?: number;
  featured?: boolean;
}

export interface ProjetoParaCard {
  slug: string;
  titulo: string;
  descricao: string;
  imagem: string;
  video?: string;
  tags: string[];
  ordem?: number;
  destaque: boolean;
}

export interface ProjetoCompleto {
  slug: string;
  conteudo: ReactNode;
  dados: {
    titulo: string;
    resumo?: string;
    tags: string[];
    imagem?: string;
    video?: string;
  };
}

const pastaProjetos = path.join(process.cwd(), 'content', 'projetos');

async function lerArquivo(slug: string) {
  const arquivo = path.join(pastaProjetos, `${slug}.mdx`);
  return fs.readFile(arquivo, 'utf-8');
}

export async function listarSlugsDeProjetos() {
  try {
    const arquivos = await fs.readdir(pastaProjetos);
    return arquivos
      .filter((arquivo) => arquivo.endsWith('.mdx'))
      .map((arquivo) => arquivo.replace(/\.mdx$/, ''));
  } catch (erro) {
    console.error('Não foi possível listar os projetos disponíveis:', erro);
    return [];
  }
}

async function extrairFrontmatter(slug: string) {
  const conteudo = await lerArquivo(slug);
  const { frontmatter } = await compileMDX<ProjetoFrontmatter>({
    source: conteudo,
    options: { parseFrontmatter: true }
  });

  return frontmatter;
}

async function montarProjetoParaCard(slug: string): Promise<ProjetoParaCard | null> {
  try {
    const frontmatter = await extrairFrontmatter(slug);
    if (!frontmatter?.title) {
      console.warn(`Projeto "${slug}" ignorado por faltar título no frontmatter.`);
      return null;
    }

    return {
      slug,
      titulo: frontmatter.title,
      descricao: frontmatter.summary ?? 'Estudo de caso completo disponível no detalhe.',
      imagem: frontmatter.cover ?? '/images/projeto-placeholder.svg',
      video: frontmatter.video,
      tags: frontmatter.tags ?? [],
      ordem: typeof frontmatter.order === 'number' ? frontmatter.order : undefined,
      destaque: Boolean(frontmatter.featured)
    } satisfies ProjetoParaCard;
  } catch (erro) {
    console.error(`Falha ao processar o projeto "${slug}":`, erro);
    return null;
  }
}

function ordenarProjetos(a: ProjetoParaCard, b: ProjetoParaCard) {
  const ordemA = a.ordem ?? Number.POSITIVE_INFINITY;
  const ordemB = b.ordem ?? Number.POSITIVE_INFINITY;

  if (ordemA !== ordemB) {
    return ordemA - ordemB;
  }

  return a.titulo.localeCompare(b.titulo, 'pt-BR');
}

export async function listarTodosProjetos(): Promise<ProjetoParaCard[]> {
  const slugs = await listarSlugsDeProjetos();
  const projetos = await Promise.all(slugs.map(montarProjetoParaCard));

  return projetos.filter((projeto): projeto is ProjetoParaCard => projeto !== null).sort(ordenarProjetos);
}

export async function listarProjetosParaHome(): Promise<ProjetoParaCard[]> {
  const projetos = await listarTodosProjetos();
  return projetos.filter((projeto) => projeto.destaque).slice(0, 3);
}

export async function carregarProjeto(slug: string): Promise<ProjetoCompleto | null> {
  try {
    const conteudo = await lerArquivo(slug);
    const { content, frontmatter } = await compileMDX<ProjetoFrontmatter>({
      source: conteudo,
      options: { parseFrontmatter: true }
    });

    if (!frontmatter?.title) {
      return null;
    }

    return {
      slug,
      conteudo: content,
      dados: {
        titulo: frontmatter.title,
        resumo: frontmatter.summary,
        tags: frontmatter.tags ?? [],
        imagem: frontmatter.cover,
        video: frontmatter.video
      }
    } satisfies ProjetoCompleto;
  } catch (erro) {
    console.error(`Erro ao carregar o projeto "${slug}":`, erro);
    return null;
  }
}
