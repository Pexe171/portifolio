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

# MongoDB Atlas Data API (comentários + métricas)
MONGODB_DATA_API_URL=
MONGODB_DATA_API_KEY=
MONGODB_DATA_SOURCE=
MONGODB_DB=

# MongoDB URI (alternativa à Data API)
MONGODB_URI=

```

## Contador de visitantes (IPs únicos)

O contador registra apenas IPs únicos (com hash) e mantém um total agregado. A persistência é feita em um arquivo JSON (padrão: `data/visitors.json`). Em ambientes serverless, o armazenamento local pode ser efêmero e o contador pode reiniciar entre deploys ou escalas; para uso em produção com persistência garantida, substitua por um banco gerenciado.

A API está disponível em:

- `POST /api/visitors` → registra o IP do visitante e retorna o total
- `GET /api/visitors` → retorna o total sem registrar novo IP

Quando as variáveis da MongoDB Data API estão configuradas, o contador passa a ser salvo no MongoDB automaticamente.
Se você preferir usar a string de conexão (`MONGODB_URI`), é necessário instalar o pacote `mongodb` (dependência opcional)
e manter `MONGODB_DB` definido para selecionar o banco correto.

## Comentários com MongoDB

Foi adicionado um módulo de comentários simples para registrar quem passou pelo portfólio. O fluxo funciona assim:

1. O visitante informa um nome.
2. O recado é opcional — se ficar vazio, registramos “Fulano passou aqui. ❤”.
3. O registro fica público no mural de comentários.

Os comentários e contadores são armazenados no MongoDB via Data API (sem dependências nativas) ou diretamente pela URI,
caso você tenha instalado o pacote `mongodb`.

## Licença

Uso pessoal.
