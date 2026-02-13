# Portfólio Full Stack — David Henrique

Portfólio profissional em **Next.js 14** com foco em arquitetura limpa, experiência visual avançada e narrativa técnica orientada a resultado de negócio.

## Visão da versão atual

Esta versão foi evoluída para um padrão mais próximo de produto real:

- linguagem visual mais forte na home;
- microinterações e animações intencionais com Framer Motion;
- conteúdo organizado por trilhas de competência;
- seção de processo para demonstrar método de entrega ponta a ponta;
- documentação de deploy em AWS Amplify em nível operacional.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- MDX para estudos de caso
- API Route para formulário de contato

## Como rodar localmente

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie `.env.local` na raiz:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:3000`.

### Build de produção local

```bash
npm run build
npm run start
```

---

## Arquitetura de pastas

```text
app/                 # Rotas, layouts e páginas (App Router)
components/(core)/   # Navbar, footer, tema
components/(sections)/ # Seções da home e páginas principais
components/(ui)/     # Componentes reutilizáveis de interface/efeitos
content/projetos/    # Estudos de caso em MDX
lib/                 # Serviços, schemas, metadados e conteúdo estruturado
public/              # Assets estáticos
```

## Padrões adotados

- Componentes desacoplados por responsabilidade (`core`, `sections`, `ui`).
- Conteúdo reutilizável centralizado em `lib/homeContent.ts`.
- Estilo com tokens visuais + utilitários Tailwind.
- Animações progressivas (entrada, hover, percepção de profundidade).

---

## Deploy completo na AWS Amplify

## 1) Conectar repositório

1. Acesse AWS Console → **Amplify**.
2. Clique em **New app** → **Host web app**.
3. Conecte GitHub/GitLab/Bitbucket.
4. Selecione repositório e branch de produção.

## 2) Configuração de build

Em geral, o Amplify detecta Next.js automaticamente. Se precisar definir manualmente, use um `amplify.yml` com:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

> Observação: mantenha o modo SSR/compute recomendado pela própria Amplify para App Router.

## 3) Variáveis de ambiente no Amplify

Em **App settings → Environment variables**:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`
- `NEXT_PUBLIC_SITE_URL` (URL pública da aplicação)

## 4) Publicar

1. Clique em **Save and deploy**.
2. Aguarde o pipeline finalizar.
3. Valide as rotas:
   - `/`
   - `/projetos`
   - `/projetos/[slug]`
   - envio do formulário de contato

## 5) Domínio customizado

1. Abra **Domain management**.
2. Adicione domínio e subdomínios.
3. Siga os apontamentos DNS sugeridos.
4. Aguarde SSL automático.

## 6) Estratégia recomendada de branches

- `main` → produção
- `develop` → homologação
- branches de feature → revisão e merge

## 7) Checklist pós-deploy

- metadados e Open Graph corretos;
- formulário de contato funcional;
- tempo de carregamento da home aceitável;
- sem erros de runtime no console do Amplify.

---

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Licença

Uso pessoal e profissional do autor.
