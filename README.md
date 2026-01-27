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

# Contador de visitantes (arquivo local)
# Caminho do arquivo JSON usado para persistir o contador (opcional)
VISITOR_STORAGE_PATH=
```

## Contador de visitantes (IPs únicos)

O contador registra apenas IPs únicos (com hash) e mantém um total agregado. A persistência é feita em um arquivo JSON (padrão: `data/visitors.json`). Em ambientes serverless, o armazenamento local pode ser efêmero e o contador pode reiniciar entre deploys ou escalas; para uso em produção com persistência garantida, substitua por um banco gerenciado.

A API está disponível em:

- `POST /api/visitors` → registra o IP do visitante e retorna o total
- `GET /api/visitors` → retorna o total sem registrar novo IP

## Licença

Uso pessoal.
