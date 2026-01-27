'use client';

import { useEffect, useMemo, useState } from 'react';
import FadeIn from '@/components/(ui)/FadeIn';

type VisitorResponse = {
  total: number;
  atualizadoEm?: string;
};

const formatador = new Intl.NumberFormat('pt-BR');

export default function VisitorCounter() {
  const [total, setTotal] = useState<number | null>(null);
  const [atualizadoEm, setAtualizadoEm] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const status = useMemo(() => {
    if (erro) {
      return {
        titulo: 'Não foi possível carregar agora',
        descricao: erro
      };
    }

    if (total === null) {
      return {
        titulo: 'Carregando visitantes...',
        descricao: 'Sincronizando o contador em tempo real.'
      };
    }

    return {
      titulo: 'Visitantes únicos até agora',
      descricao: 'Baseado em IPs únicos, com identificação segura.'
    };
  }, [erro, total]);

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      try {
        const resposta = await fetch('/api/visitors', { method: 'POST' });

        if (!resposta.ok) {
          throw new Error('Tente novamente em alguns instantes.');
        }

        const dados = (await resposta.json()) as VisitorResponse;

        if (ativo) {
          setTotal(dados.total);
          setAtualizadoEm(dados.atualizadoEm ?? null);
        }
      } catch (error) {
        if (ativo) {
          setErro('Não conseguimos atualizar o contador agora.');
        }
      }
    };

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <FadeIn>
      <section
        id="visitantes"
        className="rounded-[28px] border border-midnight-stroke/60 bg-midnight-surface/60 px-xl py-2xl shadow-lg shadow-black/20"
      >
        <div className="flex flex-col gap-xl lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Transparência de tráfego</p>
            <h2 className="font-display text-3xl font-semibold text-midnight-text">{status.titulo}</h2>
            <p className="max-w-xl text-sm text-midnight-muted">{status.descricao}</p>
          </div>

          <div className="flex flex-col gap-md rounded-2xl border border-midnight-stroke/70 bg-midnight-bg/60 p-lg text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-midnight-muted">Total registrado</span>
            <span className="text-4xl font-semibold text-midnight-text">
              {total === null ? '—' : formatador.format(total)}
            </span>
            <span className="text-xs text-midnight-muted">
              {atualizadoEm ? `Atualizado em ${new Date(atualizadoEm).toLocaleString('pt-BR')}` : 'Atualização automática'}
            </span>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
