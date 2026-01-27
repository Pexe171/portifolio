# Portfólio — David Henrique

Portfólio pessoal com foco em engenharia de software, experiências em back-end e projetos. Inclui um contador de visitantes únicos baseado em IPs para dar transparência ao alcance do site.

## Stack

- Next.js 14
- React 18
- Tailwind CSS
- API Routes (Node.js runtime)

## Rodando localmente

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

# Contador de visitantes (opcional)
VISITOR_STORE_PATH=
```

> O `VISITOR_STORE_PATH` permite apontar onde o contador salva os dados. Em produção ele usa `/tmp/visitors.json` por padrão.

## Contador de visitantes (IPs únicos)

O contador registra IPs únicos (com hash) e mantém um total agregado em um arquivo JSON. O fluxo funciona assim:

- `POST /api/visitors` → registra o IP do visitante e retorna o total
- `GET /api/visitors` → retorna o total sem registrar novo IP

Por padrão:

- **Desenvolvimento**: `./.data/visitors.json`
- **Produção (Amplify)**: `/tmp/visitors.json`

> Em ambientes serverless o armazenamento em `/tmp` é persistido somente enquanto a instância está ativa.

## Deploy no AWS Amplify

1. Defina as variáveis de ambiente no painel do Amplify (apenas as de contato são obrigatórias).
2. Faça o deploy normalmente.

## Licença

Uso pessoal.
