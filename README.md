# Portfólio — David Henrique

Portfólio pessoal com foco em engenharia de software, projetos em produção e experiências em back-end. O site inclui um contador de visitantes únicos (com hash de IP) e um mural de comentários para registrar interações de forma transparente e segura.

## Destaques

- Experiência moderna com Next.js 14 e React 18.
- Interface responsiva construída com Tailwind CSS.
- API Routes para métricas e comentários com persistência local ou MongoDB.
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

O contador registra apenas IPs únicos (com hash) e mantém um total agregado. A persistência padrão é feita em arquivo JSON (`data/visitors.json`). Em ambientes serverless, o armazenamento local pode ser efêmero e o contador reiniciar entre deploys ou escalas; para produção, recomenda-se persistência em banco gerenciado.

A API está disponível em:

- `POST /api/visitors` → registra o IP do visitante e retorna o total.
- `GET /api/visitors` → retorna o total sem registrar novo IP.

Quando as variáveis da MongoDB Data API estão configuradas, o contador passa a ser salvo no MongoDB automaticamente. Se preferir usar a string de conexão (`MONGODB_URI`), instale o pacote `mongodb` (dependência opcional) e mantenha `MONGODB_DB` definido para selecionar o banco correto.

## Comentários com MongoDB

O módulo de comentários registra quem passou pelo portfólio:

1. O visitante informa um nome.
2. O recado é opcional — se ficar vazio, registramos “Fulano passou aqui. ❤”.
3. O registro fica público no mural de comentários.

Os comentários e contadores são armazenados no MongoDB via Data API (sem dependências nativas) ou diretamente pela URI, caso você tenha instalado o pacote `mongodb`. A resposta da API normaliza o campo `id` para string, garantindo compatibilidade entre Data API e driver nativo.

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
