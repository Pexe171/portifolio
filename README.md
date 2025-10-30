# 🚀 Safari do Código (Portfólio)

Bem-vinda(o) ao monorepo que vai concentrar todo o ecossistema do portfólio **Safari do Código**. Aqui você encontrará a base para a
aplicação web, API e pacotes compartilhados, com foco em reutilização, consistência e facilidade de evolução.

## Objetivo do projeto
- Criar uma experiência integrada entre web, serviços e bibliotecas internas.
- Incentivar boas práticas de código, testes e documentação desde o início.
- Centralizar a gestão do conhecimento do portfólio em um único lugar.

## Estrutura do repositório
```
.
├── apps/             # Aplicações completas (web, API, etc.)
├── packages/         # Pacotes reutilizáveis (UI, animação, utils...)
├── pnpm-workspace.yaml
├── package.json
├── README.md
└── LICENSE
```

> Dica: crie pastas dentro de `apps/` e `packages/` conforme cada iniciativa nascer.

## Como rodar o projeto
1. **Pré-requisitos**
   - [Node.js 18+](https://nodejs.org/)
   - [pnpm 8+](https://pnpm.io/installation)
2. **Instalação**
   ```bash
   pnpm install
   ```
3. **Scripts disponíveis** (rodam a partir da raiz)
   ```bash
   pnpm dev    # modo desenvolvimento (delegue para a app dentro de apps/)
   pnpm build  # build de produção (pensado para rodar em CI/CD)
   pnpm lint   # checagens de lint e formatação
   pnpm test   # suíte de testes automatizados
   ```

> Cada aplicação/pacote pode sobrescrever ou complementar esses scripts com tarefas específicas.

## Como contribuir
1. Abra uma issue descrevendo a ideia ou problema.
2. Crie um branch seguindo o padrão `tipo/nome-breve` (ex.: `feature/landing-page`).
3. Faça commits pequenos e objetivos, sempre em português.
4. Garanta que `pnpm lint` e `pnpm test` passem antes de abrir o PR.
5. Descreva no PR o que foi feito, o motivo e como testar.

## Próximos passos sugeridos
- Inicializar o primeiro app em `apps/` e conectar com os pacotes compartilhados.
- Configurar ferramentas de lint, formatação e testes.
- Automatizar pipelines de CI/CD para garantir qualidade contínua.

Boas criações! 🧭
