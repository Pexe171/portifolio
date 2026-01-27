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

# Contador de visitantes (DynamoDB)
VISITOR_TABLE_NAME=
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SESSION_TOKEN=
```

> O `AWS_SESSION_TOKEN` é obrigatório apenas quando você usa credenciais temporárias.

## Contador de visitantes (IPs únicos)

O contador registra apenas IPs únicos (com hash) e mantém um total agregado. A tabela no DynamoDB precisa ter a seguinte estrutura:

- **Partition key (pk)**: `String`
- Itens de IP: `pk = ip#<hash>`
- Item de contador: `pk = counter`
  - `total` (Number)
  - `atualizadoEm` (String, ISO)

A API está disponível em:

- `POST /api/visitors` → registra o IP do visitante e retorna o total
- `GET /api/visitors` → retorna o total sem registrar novo IP

## Deploy no AWS Amplify

1. Defina as variáveis de ambiente no painel do Amplify.
2. Garanta que o papel (IAM role) do build tenha permissão para usar o DynamoDB.
3. A tabela indicada em `VISITOR_TABLE_NAME` precisa existir antes do build.

## Licença

Uso pessoal.
