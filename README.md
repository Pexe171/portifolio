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
│   └── (ui)/ProjectCard.tsx, Timeline.tsx
├── content/projetos/*.mdx
├── public/images
├── public/videos
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

Cada rota de projeto consome um arquivo MDX localizado em `content/projetos`. A API de contato (`app/api/contact/route.ts`) está preparada para receber dados e integrar com qualquer serviço de envio de e-mails.

## 🎨 Identidade visual Midnight Neon

- **Paleta personalizada** configurada no `tailwind.config.ts`, com tokens semânticos (`midnight.bg`, `midnight.surface`, `midnight.accent` e variações) que seguem o tema "Midnight Neon".
- **Tipografia otimizada** com carregamento via `next/font`: Inter para textos e Fira Code para elementos monoespaçados, exposta por meio de variáveis CSS.
- **Escala de espaçamento modular** baseada em múltiplos de 4px (`xs` a `section`), garantindo ritmo consistente em margens, paddings e larguras máximas (`max-w-layout`).

## ✨ Próximos passos

- Integrar o formulário de contato com um serviço real (Resend, Formspree, etc.).
- Criar animações personalizadas para cada seção usando Framer Motion.
- Alimentar a pasta `public/` com imagens e vídeos reais dos projetos.
- Publicar na Vercel e acompanhar métricas de uso.

Sinta-se livre para adaptar o que for necessário. O projeto já está pronto para receber novos componentes, temas e conteúdos. 💡
