'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import FadeIn from '@/components/(ui)/FadeIn';

type Comentario = {
  id: string;
  nome: string;
  mensagem: string | null;
  criadoEm: string;
};

type ComentariosResponse = {
  total: number;
  comentarios: Comentario[];
};

const formatadorData = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'medium',
  timeStyle: 'short'
});

export default function Comments() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [statusEnvio, setStatusEnvio] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const resumo = useMemo(() => {
    if (erro) {
      return {
        titulo: 'Não foi possível carregar os comentários',
        descricao: erro
      };
    }

    if (carregando) {
      return {
        titulo: 'Carregando comentários...',
        descricao: 'Buscando os recados mais recentes.'
      };
    }

    return {
      titulo: 'Recados e assinaturas do portfólio',
      descricao: 'Deixe seu nome e um recado opcional para registrar sua passagem por aqui.'
    };
  }, [carregando, erro]);

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      try {
        const comentariosResposta = await fetch('/api/comments?limit=6');

        if (!comentariosResposta.ok) {
          throw new Error('Não foi possível carregar os comentários.');
        }

        const dadosComentarios = (await comentariosResposta.json()) as ComentariosResponse & {
          sucesso?: boolean;
        };

        if (!dadosComentarios.sucesso && typeof dadosComentarios.sucesso !== 'undefined') {
          throw new Error('Não foi possível carregar os comentários.');
        }

        if (ativo) {
          setComentarios(dadosComentarios.comentarios ?? []);
          setTotal(dadosComentarios.total ?? 0);
        }
      } catch (error) {
        if (ativo) {
          setErro('Tente novamente em alguns instantes.');
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    };

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  const enviarComentario = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusEnvio(null);

    if (nome.trim().length < 2) {
      setStatusEnvio('Informe seu nome com pelo menos 2 caracteres.');
      return;
    }

    setEnviando(true);

    try {
      const resposta = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, mensagem })
      });

      const dados = (await resposta.json()) as {
        sucesso: boolean;
        comentario?: Comentario;
        mensagem?: string;
      };

      if (!resposta.ok || !dados.sucesso || !dados.comentario) {
        throw new Error(dados.mensagem ?? 'Não foi possível enviar agora.');
      }

      setComentarios((estado) => [dados.comentario!, ...estado].slice(0, 6));
      setTotal((estado) => (estado === null ? 1 : estado + 1));
      setNome('');
      setMensagem('');
      setStatusEnvio(dados.mensagem ?? 'Comentário enviado com sucesso.');
    } catch (error) {
      setStatusEnvio('Não foi possível enviar o comentário agora.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <FadeIn>
      <section
        id="comentarios"
        className="rounded-[28px] border border-midnight-stroke/60 bg-midnight-surface/60 px-xl py-2xl shadow-lg shadow-black/20"
      >
        <div className="flex flex-col gap-xl">
          <div className="flex flex-col gap-md lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-sm">
              <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Interação aberta</p>
              <h2 className="font-display text-3xl font-semibold text-midnight-text">{resumo.titulo}</h2>
              <p className="max-w-xl text-sm text-midnight-muted">{resumo.descricao}</p>
            </div>
            <div className="rounded-2xl border border-midnight-stroke/70 bg-midnight-bg/70 px-lg py-md text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-midnight-muted">Total de comentários</p>
              <p className="text-3xl font-semibold text-midnight-text">{total === null ? '—' : total}</p>
            </div>
          </div>

          <div className="grid gap-lg lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-md">
              <div className="rounded-2xl border border-midnight-stroke/70 bg-midnight-bg/60 p-lg">
                <form className="space-y-md" onSubmit={enviarComentario}>
                  <label className="flex flex-col gap-sm text-sm text-midnight-muted">
                    Seu nome
                    <input
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      maxLength={40}
                      className="w-full rounded-xl border border-midnight-stroke/60 bg-midnight-surface/60 p-md text-sm text-midnight-text outline-none transition focus:border-brand-300"
                      placeholder="Ex: Maria Silva"
                    />
                  </label>
                  <label className="flex flex-col gap-sm text-sm text-midnight-muted">
                    Deixe seu recado (opcional)
                    <textarea
                      value={mensagem}
                      onChange={(event) => setMensagem(event.target.value)}
                      rows={4}
                      maxLength={280}
                      className="w-full resize-none rounded-xl border border-midnight-stroke/60 bg-midnight-surface/60 p-md text-sm text-midnight-text outline-none transition focus:border-brand-300"
                      placeholder="Ex: Curti muito o projeto X! 🚀"
                    />
                  </label>
                  <div className="flex flex-col gap-sm">
                    <button
                      type="submit"
                      className="rounded-full bg-brand-300 px-lg py-sm text-sm font-semibold text-midnight-bg transition hover:bg-brand-200 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={enviando}
                    >
                      {enviando ? 'Enviando...' : 'Publicar recado'}
                    </button>
                    <p className="text-xs text-midnight-muted">
                      Se você enviar sem mensagem, registramos um coração com sua assinatura.
                    </p>
                    {statusEnvio && <p className="text-xs text-midnight-text">{statusEnvio}</p>}
                  </div>
                </form>
              </div>

              <div className="rounded-2xl border border-midnight-stroke/70 bg-midnight-bg/60 p-lg text-xs text-midnight-muted">
                <p className="font-semibold text-midnight-text">Transparência</p>
                <p>
                  Armazenamos apenas seu nome e o recado público. Se você deixar vazio, registramos um coração com sua
                  assinatura.
                </p>
              </div>
            </div>

            <div className="space-y-md">
              {comentarios.length === 0 && !carregando ? (
                <div className="rounded-2xl border border-midnight-stroke/70 bg-midnight-bg/60 p-lg text-sm text-midnight-muted">
                  Nenhum comentário por aqui ainda. Seja o primeiro! ✨
                </div>
              ) : (
                comentarios.map((comentario) => (
                  <div
                    key={comentario.id}
                    className="rounded-2xl border border-midnight-stroke/70 bg-midnight-bg/60 p-lg"
                  >
                    <div className="flex items-center gap-md">
                      <div>
                        <p className="text-sm font-semibold text-midnight-text">{comentario.nome}</p>
                        <p className="text-xs text-midnight-muted">
                          {formatadorData.format(new Date(comentario.criadoEm))}
                        </p>
                      </div>
                    </div>
                    <p className="mt-md text-sm text-midnight-text">
                      {comentario.mensagem?.trim()
                        ? comentario.mensagem
                        : `${comentario.nome} passou aqui. ❤`}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
