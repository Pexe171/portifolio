'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';

interface FormularioContato {
  nome: string;
  email: string;
  mensagem: string;
}

const estadoInicial: FormularioContato = {
  nome: '',
  email: '',
  mensagem: ''
};

export default function Contact() {
  const [formulario, setFormulario] = useState<FormularioContato>(estadoInicial);
  const [status, setStatus] = useState<'inicial' | 'enviando' | 'sucesso' | 'erro'>('inicial');
  const [mensagem, setMensagem] = useState('');

  const atualizarCampo = (campo: keyof FormularioContato) => (evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormulario((prev) => ({ ...prev, [campo]: evento.target.value }));
  };

  const enviarFormulario = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setStatus('enviando');

    try {
      const resposta = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem ?? 'Erro ao enviar mensagem.');
      }

      setStatus('sucesso');
      setMensagem(dados.mensagem);
      setFormulario(estadoInicial);
    } catch (erro) {
      setStatus('erro');
      setMensagem(erro instanceof Error ? erro.message : 'Erro inesperado.');
    }
  };

  return (
    <section id="contato" className="space-y-8 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Contato</p>
        <h2 className="font-titulo text-3xl font-semibold">Vamos conversar sobre o próximo projeto?</h2>
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">
          Compartilhe um pouco sobre o desafio que você tem em mente. Respondo em até 24 horas, sempre com atenção humana e
          direcionada às suas necessidades.
        </p>
      </header>

      <form onSubmit={enviarFormulario} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            Nome
            <input
              type="text"
              value={formulario.nome}
              onChange={atualizarCampo('nome')}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-700 focus:border-destaque focus:outline-none focus:ring-2 focus:ring-destaque/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Como posso te chamar?"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            E-mail
            <input
              type="email"
              value={formulario.email}
              onChange={atualizarCampo('email')}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-700 focus:border-destaque focus:outline-none focus:ring-2 focus:ring-destaque/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Qual o melhor e-mail?"
              required
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Mensagem
          <textarea
            value={formulario.mensagem}
            onChange={atualizarCampo('mensagem')}
            rows={5}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-700 focus:border-destaque focus:outline-none focus:ring-2 focus:ring-destaque/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="Conte mais sobre o contexto, objetivos e prazos."
            required
          />
        </label>

        <button
          type="submit"
          disabled={status === 'enviando'}
          className="rounded-full bg-destaque px-6 py-3 text-sm font-semibold text-white shadow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'enviando' ? 'Enviando...' : 'Enviar mensagem'}
        </button>
      </form>

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
