import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const dados = await request.json();

  if (!dados.nome || !dados.email || !dados.mensagem) {
    return Response.json(
      { sucesso: false, mensagem: 'Por favor, preencha nome, e-mail e mensagem antes de enviar.' },
      { status: 400 }
    );
  }

  // Aqui você pode integrar com serviços como Resend, Formspree ou qualquer backend personalizado.
  console.info('Mensagem recebida via formulário de contato:', dados);

  return Response.json({ sucesso: true, mensagem: 'Mensagem recebida com carinho! Em breve entrarei em contato.' });
}
