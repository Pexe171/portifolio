'use client';

import { contatoSchema, type ContatoSchema } from '@/lib/schemas/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const [status, setStatus] = useState<'inicial' | 'sucesso' | 'erro'>('inicial');
  const [mensagem, setMensagem] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContatoSchema>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      nome: '',
      email: '',
      mensagem: ''
    }
  });

  const enviarFormulario = handleSubmit(async (dados) => {
    setStatus('inicial');
    setMensagem('');

    try {
      const resposta = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      const retorno = await resposta.json();

      if (!resposta.ok) {
        throw new Error(retorno.mensagem ?? 'Erro ao enviar mensagem.');
      }

      setStatus('sucesso');
      setMensagem(retorno.mensagem);
      reset();
    } catch (erro) {
      setStatus('erro');
      setMensagem(erro instanceof Error ? erro.message : 'Erro inesperado.');
    }
  });

  return (
    <section id="contato" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Contato</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text md:text-4xl">
          Vamos conversar sobre o próximo projeto?
        </h2>
        <p className="max-w-2xl text-midnight-muted">
          Compartilhe um pouco sobre o desafio que você tem em mente. Respondo em até 24 horas, sempre com atenção humana e
          direcionada às suas necessidades.
        </p>
      </header>

      <div className="grid gap-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={enviarFormulario} className="space-y-lg" noValidate>
          <div className="grid gap-lg md:grid-cols-2">
            <label className="flex flex-col gap-sm text-sm font-medium text-midnight-muted">
              Nome
              <input
                type="text"
                {...register('nome')}
                aria-invalid={errors.nome ? 'true' : 'false'}
                aria-describedby={errors.nome ? 'erro-nome' : undefined}
                className={`rounded-2xl border bg-midnight-surface/60 px-md py-sm text-base text-midnight-text shadow-lg shadow-black/20 focus:outline-none focus:ring-2 ${
                  errors.nome
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
                    : 'border-midnight-stroke focus:border-midnight-accent focus:ring-midnight-accent/30'
                }`}
                placeholder="Como posso te chamar?"
              />
              {errors.nome && (
                <span id="erro-nome" className="text-xs font-normal text-rose-400">
                  {errors.nome.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-sm text-sm font-medium text-midnight-muted">
              E-mail
              <input
                type="email"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'erro-email' : undefined}
                className={`rounded-2xl border bg-midnight-surface/60 px-md py-sm text-base text-midnight-text shadow-lg shadow-black/20 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
                    : 'border-midnight-stroke focus:border-midnight-accent focus:ring-midnight-accent/30'
                }`}
                placeholder="Qual o melhor e-mail?"
              />
              {errors.email && (
                <span id="erro-email" className="text-xs font-normal text-rose-400">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
          <label className="flex flex-col gap-sm text-sm font-medium text-midnight-muted">
            Mensagem
            <textarea
              {...register('mensagem')}
              aria-invalid={errors.mensagem ? 'true' : 'false'}
              aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined}
              rows={5}
              className={`rounded-2xl border bg-midnight-surface/60 px-md py-sm text-base text-midnight-text shadow-lg shadow-black/20 focus:outline-none focus:ring-2 ${
                errors.mensagem
                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
                  : 'border-midnight-stroke focus:border-midnight-accent focus:ring-midnight-accent/30'
              }`}
              placeholder="Conte mais sobre o contexto, objetivos e prazos."
            />
            {errors.mensagem && (
              <span id="erro-mensagem" className="text-xs font-normal text-rose-400">
                {errors.mensagem.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-sm rounded-full bg-midnight-accent px-lg py-sm text-sm font-semibold text-midnight-bg shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-midnight-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            <span className="text-lg transition group-hover:translate-x-1">&rarr;</span>
          </button>
        </form>

        <aside className="space-y-md rounded-3xl border border-midnight-stroke/60 bg-midnight-surface/40 p-lg text-midnight-muted shadow-2xl shadow-black/30">
          <p className="text-xs uppercase tracking-[0.35em] text-midnight-muted">Disponibilidade</p>
          <h3 className="text-2xl font-semibold text-midnight-text">Aberto para oportunidades</h3>
          <p>
            Se você busca alguém focado em back-end, integrações e automação, estou pronto para conversar e entender o contexto
            do seu produto.
          </p>
          <div className="space-y-sm text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-midnight-stroke/60 bg-midnight-bg/40 px-md py-sm">
              <span>Resposta média</span>
              <span className="font-semibold text-midnight-text">24h</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-midnight-stroke/60 bg-midnight-bg/40 px-md py-sm">
              <span>Formato</span>
              <span className="font-semibold text-midnight-text">Remoto</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-midnight-stroke/60 bg-midnight-bg/40 px-md py-sm">
              <span>Status</span>
              <span className="font-semibold text-emerald-400">Disponível</span>
            </div>
          </div>
        </aside>
      </div>

      {mensagem && (
        <p
          className={`text-sm ${status === 'sucesso' ? 'text-emerald-500' : 'text-rose-500'}`}
          role="status"
          aria-live="polite"
        >
          {mensagem}
        </p>
      )}
    </section>
  );
}
