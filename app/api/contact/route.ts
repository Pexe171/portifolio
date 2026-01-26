import { contatoSchema } from '@/lib/schemas/contact';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

const remetente = process.env.RESEND_FROM_EMAIL;
const destinatario = process.env.RESEND_TO_EMAIL ?? 'david.silva@icomp.ufam.edu.br';
const chaveResend = process.env.RESEND_API_KEY;

const resend = chaveResend ? new Resend(chaveResend) : null;

const escaparHtml = (texto: string) =>
  texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: NextRequest) {
  try {
    const corpo = await request.json();
    const dados = contatoSchema.safeParse(corpo);

    if (!dados.success) {
      const mensagens = dados.error.issues.map((issue) => issue.message).join(' ');
      return Response.json(
        {
          sucesso: false,
          mensagem: mensagens || 'Verifique as informações preenchidas e tente novamente.'
        },
        { status: 400 }
      );
    }

    if (!resend || !remetente || !destinatario) {
      console.error('Configuração de e-mail ausente. Verifique as variáveis RESEND_API_KEY, RESEND_FROM_EMAIL e RESEND_TO_EMAIL');
      return Response.json(
        {
          sucesso: false,
          mensagem: 'Ops! A caixa de entrada está passando por ajustes. Tente novamente em alguns instantes.'
        },
        { status: 500 }
      );
    }

    const { nome, email, mensagem } = dados.data;
    const nomeSeguro = escaparHtml(nome);
    const emailSeguro = escaparHtml(email);
    const mensagemSegura = escaparHtml(mensagem);

    const html = `
      <div style="font-family: 'Inter', sans-serif; color: #0f172a;">
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${nomeSeguro}</p>
        <p><strong>E-mail:</strong> ${emailSeguro}</p>
        <p style="white-space: pre-wrap;"><strong>Mensagem:</strong><br />${mensagemSegura}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: remetente,
      to: [destinatario],
      reply_to: email,
      subject: `Novo contato pelo portfólio — ${nome}`,
      html,
      text: `Nome: ${nome}\nE-mail: ${email}\nMensagem:\n${mensagem}`
    });

    if (error) {
      throw error;
    }

    return Response.json({
      sucesso: true,
      mensagem: 'Mensagem recebida com carinho! Em breve entro em contato.'
    });
  } catch (erro) {
    console.error('Erro ao processar contato:', erro);

    return Response.json(
      {
        sucesso: false,
        mensagem: 'Não consegui enviar seu recado agora, mas já estou de olho nisso. Pode tentar mais tarde?'
      },
      { status: 500 }
    );
  }
}
