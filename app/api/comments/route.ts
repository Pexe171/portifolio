import type { NextRequest } from 'next/server';
import { mongoCount, mongoFind, mongoInsertOne, mongoDisponivel } from '@/lib/mongodb';

export const runtime = 'nodejs';

type ComentarioDocumento = {
  _id?: { toString: () => string } | string;
  nome: string;
  mensagem: string | null;
  criadoEm: string;
};

const normalizarTexto = (valor: string) => valor.replace(/\s+/g, ' ').trim();

const normalizarNome = (nome: string) => normalizarTexto(nome).slice(0, 40);

const normalizarMensagem = (mensagem: string) => {
  const texto = normalizarTexto(mensagem);
  return texto.length === 0 ? null : texto.slice(0, 280);
};

export async function GET(request: NextRequest) {
  if (!mongoDisponivel()) {
    return Response.json(
      {
        sucesso: false,
        mensagem: 'MongoDB não configurado.'
      },
      { status: 500 }
    );
  }

  const limitParam = Number(request.nextUrl.searchParams.get('limit') ?? '6');
  const limite = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 20) : 6;

  const respostaComentarios = await mongoFind<ComentarioDocumento>('comments', {}, { sort: { criadoEm: -1 }, limit: limite });
  const respostaTotal = await mongoCount('comments', {});

  if (!respostaComentarios || !respostaTotal) {
    return Response.json(
      {
        sucesso: false,
        mensagem: 'Não foi possível carregar os comentários.'
      },
      { status: 500 }
    );
  }

  const comentarios = respostaComentarios.documents ?? [];
  const total = respostaTotal.count ?? 0;

  return Response.json({
    sucesso: true,
    total,
    comentarios: comentarios.map((comentario) => ({
      id: typeof comentario._id === 'string' ? comentario._id : comentario._id?.toString(),
      nome: comentario.nome,
      mensagem: comentario.mensagem,
      criadoEm: comentario.criadoEm
    }))
  });
}

export async function POST(request: NextRequest) {
  if (!mongoDisponivel()) {
    return Response.json(
      {
        sucesso: false,
        mensagem: 'MongoDB não configurado.'
      },
      { status: 500 }
    );
  }

  const corpo = (await request.json()) as { nome?: string; mensagem?: string };
  const nome = normalizarNome(corpo.nome ?? '');
  const mensagem = normalizarMensagem(corpo.mensagem ?? '');

  if (nome.length < 2) {
    return Response.json(
      {
        sucesso: false,
        mensagem: 'Informe um nome com pelo menos 2 caracteres.'
      },
      { status: 400 }
    );
  }

  const comentario: ComentarioDocumento = {
    nome,
    mensagem,
    criadoEm: new Date().toISOString(),
  };

  const resultado = await mongoInsertOne('comments', comentario);
  if (!resultado?.insertedId) {
    return Response.json(
      {
        sucesso: false,
        mensagem: 'Não foi possível registrar o comentário.'
      },
      { status: 500 }
    );
  }

  const resposta = Response.json({
    sucesso: true,
    comentario: {
      id: resultado.insertedId,
      nome: comentario.nome,
      mensagem: comentario.mensagem,
      criadoEm: comentario.criadoEm
    },
    mensagem: 'Recado registrado com sucesso.'
  });

  return resposta;
}
