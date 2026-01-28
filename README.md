# Portfólio — David Henrique

Portfólio pessoal com foco em engenharia de software, projetos em produção e experiências em back-end.

## Destaques

- Experiência moderna com Next.js 14 e React 18.
- Interface responsiva construída com Tailwind CSS.
- API Routes para contato via e-mail.
- Integração pronta para envio de e-mails via Resend.

## Stack

- Next.js 14
- React 18
- Tailwind CSS
- API Routes (Node.js runtime)

## Como executar localmente

```bash
npm install
npm run dev
```

Acesse em `http://localhost:3000`.

## Variáveis de ambiente

Crie um arquivo `.env.local` com os valores abaixo:

```bash
# Contato
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=
```

## Estrutura do projeto

```text
app/           # Rotas e páginas (Next.js App Router)
components/    # Componentes reutilizáveis de UI
content/       # Conteúdo estático e dados do portfólio
lib/           # Serviços e utilitários (APIs, validações, etc.)
public/        # Assets públicos
```

## Licença

Uso pessoal.
