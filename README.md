# 🧭 Meu Portfólio com Next.js 14

Este projeto nasce com foco em contar histórias de forma humana, usando o App Router do Next.js 14, Tailwind CSS e conteúdo em MDX. A ideia é ter uma base organizada desde o primeiro commit para evoluir com tranquilidade.

## 🚀 Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Rode o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Acesse <http://localhost:3000> e comece a criar.

## 🧱 Estrutura principal

```
meu-portfolio/
├── app/
│   ├── (main)/
│   │   ├── page.tsx
│   │   └── projetos/
│   │       └── [slug]/page.tsx
│   ├── api/contact/route.ts
│   ├── layout.tsx
│   └── providers.tsx
├── components/
│   ├── (core)/Navbar.tsx, Footer.tsx, ThemeToggle.tsx
│   ├── (sections)/Hero.tsx, FeaturedProjects.tsx, About.tsx, Skills.tsx, Experience.tsx, Contact.tsx
│   └── (ui)/ProjectCard.tsx, Timeline.tsx, TypewriterText.tsx, ScrollReveal.tsx
├── content/projetos/*.mdx
├── lib/siteMetadata.ts
├── public/images
├── public/videos
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

Cada rota de projeto consome um arquivo MDX localizado em `content/projetos`. A API de contato (`app/api/contact/route.ts`) valida os dados com Zod e envia o e-mail via [Resend](https://resend.com/), garantindo que toda mensagem do formulário chegue de forma segura e autenticada.

## 🧾 Padrão de conteúdo dos projetos

Todo arquivo em `content/projetos/*.mdx` segue o mesmo frontmatter e narrativa para garantir consistência:

```mdx
---
title: "Nome do projeto"
summary: "Resumo em uma frase do resultado entregue."
tags:
  - Tecnologia 1
  - Tecnologia 2
cover: "https://link-da-imagem.jpg"
video: "https://link-do-video"
---
```

Logo após o frontmatter, estruturamos o estudo de caso com três blocos: **O Problema**, **A Solução** e **O Impacto**. Essa narrativa ajuda a contextualizar a necessidade, detalhar a arquitetura construída e deixar claros os resultados alcançados.

## 🔍 SEO, Open Graph e compartilhamento

- Centralizamos as principais informações de SEO em `lib/siteMetadata.ts`. Ajuste título, descrição, URL pública e redes sociais conforme o domínio oficial.
- O arquivo `app/layout.tsx` utiliza esses dados para preencher metatags globais (Open Graph, Twitter Cards, ícones e robots), garantindo cards consistentes ao compartilhar qualquer página.
- Cada rota em `app/(main)` pode definir metadados específicos. A home (`app/(main)/page.tsx`) e os projetos (`app/(main)/projetos/[slug]/page.tsx`) já possuem título, descrição e imagem pensados para LinkedIn e WhatsApp.
- Caso queira uma imagem padrão para os compartilhamentos, adicione o arquivo desejado em `public/` e informe o caminho em `lib/siteMetadata.ts` na propriedade `ogImage`.

## 🧩 Componentes estruturais

- **Navbar fixa** com links para todas as seções, realce do item ativo conforme a âncora e suporte ao tema escuro/claro.
- **Footer** com links diretos para LinkedIn e GitHub, pensados para abrir em nova aba com acessibilidade.
- **ThemeToggle** controlando a classe `dark` no `<html>` via `next-themes`, mantendo transições suaves.
- **Providers** globais configurados em `app/providers.tsx`, encapsulando o `ThemeProvider` em todas as páginas.

## 🎨 Identidade visual Midnight Neon

- **Paleta personalizada** configurada no `tailwind.config.ts`, com tokens semânticos (`midnight.bg`, `midnight.surface`, `midnight.accent` e variações) que seguem o tema "Midnight Neon".
- **Tipografia otimizada** com carregamento via `next/font`: Inter para textos e Fira Code para elementos monoespaçados, exposta por meio de variáveis CSS.
- **Escala de espaçamento modular** baseada em múltiplos de 4px (`xs` a `section`), garantindo ritmo consistente em margens, paddings e larguras máximas (`max-w-layout`).

## ✉️ Configurando o formulário de contato

1. Crie uma conta na [Resend](https://resend.com/) e gere uma API Key.
2. Cadastre um domínio/remetente autorizado (ex.: `Portfolio <contato@seudominio.com>`).
3. Adicione um arquivo `.env.local` na raiz do projeto com as variáveis abaixo:

   ```env
   RESEND_API_KEY="sua-chave-aqui"
   RESEND_FROM_EMAIL="Portfolio <contato@seudominio.com>"
   RESEND_TO_EMAIL="voce@seudestino.com"
   ```

4. Reinicie o servidor (`npm run dev`) para carregar as variáveis.

Pronto! Sempre que alguém preencher o formulário, o backend valida os dados com Zod e dispara um e-mail usando o Resend. As respostas chegam diretamente na caixa de entrada definida em `RESEND_TO_EMAIL`.

## ✨ Próximos passos

- Criar animações personalizadas para cada seção usando Framer Motion.
- Alimentar a pasta `public/` com imagens e vídeos reais dos projetos.
- Publicar na Vercel e acompanhar métricas de uso.

Sinta-se livre para adaptar o que for necessário. O projeto já está pronto para receber novos componentes, temas e conteúdos. 💡
