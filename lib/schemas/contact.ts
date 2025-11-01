import { z } from 'zod';

export const contatoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, 'Seu nome precisa ter pelo menos 2 caracteres.')
    .max(80, 'Pode me chamar só pelo primeiro nome, por favor?'),
  email: z
    .string()
    .trim()
    .email('Digite um e-mail válido para eu poder responder.'),
  mensagem: z
    .string()
    .trim()
    .min(10, 'Compartilhe um pouco mais de contexto para eu entender como posso ajudar.')
    .max(2000, 'Prometo ler tudo com carinho, mas 2000 caracteres já são um ótimo começo!')
});

export type ContatoSchema = z.infer<typeof contatoSchema>;
