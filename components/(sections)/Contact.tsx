'use client';

import { contatoSchema, type ContatoSchema } from '@/lib/schemas/contact';
import { profileLinks } from '@/lib/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const collaborationSignals = [
  'Arquitetura de produto',
  'Integrações e automação',
  'Refino de interface operacional'
];

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
    <section id="contato" className="space-y-8 py-24">
      <header className="space-y-4">
        <p className="eyebrow">Contato</p>
        <h2 className="section-heading">Se você precisa de produto mais sólido, podemos conversar.</h2>
        <p className="section-copy">
          Estou interessado em projetos onde arquitetura, integração e experiência operacional realmente importam. Se esse é o
          contexto, a conversa faz sentido.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={enviarFormulario} className="section-shell space-y-6 p-6 md:p-8" noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-midnight-muted">
              <span>Nome</span>
              <input
                type="text"
                {...register('nome')}
                aria-invalid={errors.nome ? 'true' : 'false'}
                aria-describedby={errors.nome ? 'erro-nome' : undefined}
                className={`w-full rounded-2xl border px-4 py-3 text-base text-midnight-text transition ${
                  errors.nome
                    ? 'border-rose-500 bg-rose-500/5'
                    : 'border-white/10 bg-white/[0.03] focus:border-midnight-accent/40'
                }`}
                placeholder="Seu nome"
              />
              {errors.nome && (
                <span id="erro-nome" className="text-xs font-normal text-rose-400">
                  {errors.nome.message}
                </span>
              )}
            </label>

            <label className="space-y-2 text-sm font-medium text-midnight-muted">
              <span>E-mail</span>
              <input
                type="email"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'erro-email' : undefined}
                className={`w-full rounded-2xl border px-4 py-3 text-base text-midnight-text transition ${
                  errors.email
                    ? 'border-rose-500 bg-rose-500/5'
                    : 'border-white/10 bg-white/[0.03] focus:border-midnight-accent/40'
                }`}
                placeholder="voce@empresa.com"
              />
              {errors.email && (
                <span id="erro-email" className="text-xs font-normal text-rose-400">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-midnight-muted">
            <span>Contexto</span>
            <textarea
              {...register('mensagem')}
              aria-invalid={errors.mensagem ? 'true' : 'false'}
              aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined}
              rows={6}
              className={`w-full rounded-2xl border px-4 py-3 text-base text-midnight-text transition ${
                errors.mensagem
                  ? 'border-rose-500 bg-rose-500/5'
                  : 'border-white/10 bg-white/[0.03] focus:border-midnight-accent/40'
              }`}
              placeholder="Explique o produto, o fluxo crítico e o que você precisa resolver."
            />
            {errors.mensagem && (
              <span id="erro-mensagem" className="text-xs font-normal text-rose-400">
                {errors.mensagem.message}
              </span>
            )}
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={isSubmitting} className="button-primary disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>
            <span className="text-sm text-midnight-muted">Resposta inicial em até 48h.</span>
          </div>

          {mensagem && (
            <p className={`text-sm ${status === 'sucesso' ? 'text-emerald-400' : 'text-rose-400'}`} role="status" aria-live="polite">
              {mensagem}
            </p>
          )}
        </form>

        <aside className="section-shell space-y-6 p-6 md:p-8">
          <div className="space-y-4">
            <p className="eyebrow">Fit ideal</p>
            <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-midnight-text">
              Projetos onde a interface precisa conversar com a operação.
            </h3>
            <p className="text-base leading-8 text-midnight-muted">
              Meu melhor contexto é quando produto, backend e integração precisam funcionar em conjunto: CRM, atendimento,
              automação, ingestão de contexto, dashboards operacionais ou sistemas com múltiplos atores.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {collaborationSignals.map((signal) => (
              <span key={signal} className="pill">
                {signal}
              </span>
            ))}
          </div>

          <div className="grid gap-3">
            {profileLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="glass-card flex items-center justify-between px-5 py-4 text-sm text-midnight-text hover:border-midnight-accent/30"
              >
                <span>{link.label}</span>
                <span className="text-midnight-accent">abrir ↗</span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
