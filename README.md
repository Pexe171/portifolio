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
   pnpm lint         # eslint com regras compartilhadas e integração com Prettier
   pnpm typecheck    # verificação de tipos com TypeScript estrito
   pnpm format       # validação de formatação com Prettier
   pnpm format:fix   # aplica a formatação automaticamente
   pnpm test   # suíte de testes automatizados
   ```

> Cada aplicação/pacote pode sobrescrever ou complementar esses scripts com tarefas específicas.

## Como contribuir

1. Abra uma issue descrevendo a ideia ou problema.
2. Crie um branch seguindo o padrão `tipo/nome-breve` (ex.: `feature/landing-page`).
3. Faça commits pequenos e objetivos, sempre em português e seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/).
4. Garanta que `pnpm lint` e `pnpm test` passem antes de abrir o PR.
5. Descreva no PR o que foi feito, o motivo e como testar.

### Automação de qualidade local

- **Husky + lint-staged**: os ganchos de `pre-commit` executam ESLint (com correções automáticas) e Prettier nos arquivos alterados.
- **Pre-push**: roda `pnpm lint` e `pnpm typecheck` para evitar que quebras cheguem ao repositório remoto.
- **Commitlint**: mensagens de commit fora do padrão convencional falham automaticamente.

> Dica: após clonar o repositório, rode `pnpm install` (ou `pnpm prepare`) para garantir que os ganchos do Husky estejam ativos.

## Base de qualidade configurada

- **TypeScript** centralizado em `tsconfig.base.json` com `strict` ativo, `baseUrl` definido e aliases prontos (`@ui/*`, `@anim/*`, `@utils/*`).
- **ESLint** e **Prettier** já preparados para projetos em TypeScript, com regras de importação e integração com o formatter.
- **EditorConfig** garantindo consistência de indentação, fim de linha e codificação.
- Scripts `pnpm lint`, `pnpm typecheck` e `pnpm format` prontos para rodar em pipelines de CI/CD.

## Próximos passos sugeridos

- Inicializar o primeiro app em `apps/` e conectar com os pacotes compartilhados.
- Expandir os pacotes em `packages/` aproveitando os aliases configurados.
- Automatizar pipelines de CI/CD para garantir qualidade contínua.

Boas criações! 🧭
