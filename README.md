# 🌲 Code Forest Portfolio — Blueprint Vivo

Bem-vinda(o) à floresta de código onde cada decisão nasce primeiro em forma de narrativa. Este README funciona como mapa, bússola e diário de bordo para o projeto **Code Forest Portfolio**, um espaço educativo que usa metáforas naturais para tornar a jornada de aprendizagem em tecnologia mais imersiva e acolhedora.

## 🌳 Visão detalhada do projeto
- **Metáfora dos biomas**: o portfólio é dividido em biomas (Clareira de Boas-Vindas, Trilhas de Projetos, Laboratório dos Desafios, Torre de Sabedoria), cada um simbolizando um estágio de aprendizado e apresentando interações únicas.
- **Personagens-guia**:
  - 🦊 **Raposa** — guardiã do frontend. Ensina sobre animações, storytelling visual e boas práticas de UI/UX.
  - 🐻 **Urso** — guardião do backend. Explica integrações, segurança e orquestração de dados.
  - 🦉 **Coruja** — mentora pedagógica. Traduz conceitos complexos em dicas práticas e reflexões.
- **Objetivo educacional**: transformar o portfólio em um hub interativo que ilustra competências técnicas e promove aprendizado contínuo, tanto para quem desenvolve quanto para quem visita.

## 🎯 Objetivos norteadores
1. Oferecer uma experiência narrativa e lúdica sem perder o rigor técnico.
2. Documentar decisões arquiteturais de forma transparente e atualizada.
3. Garantir que cada entrega sirva como material didático e inspiração para novas pessoas desenvolvedoras.

## 🛠️ Requisitos funcionais
1. **Frontend animado com Framer Motion**: transições fluidas entre biomas, componentes com microinterações e narrativa guiada pela Raposa.
2. **Integração dinâmica com GitHub**: Urso apresenta projetos e contribuições em tempo real, consumindo a API do GitHub via backend.
3. **Guias animados**: Coruja disponibiliza dicas contextuais e minitutorias interativos (tooltips, modais, trilhas de aprendizado).
4. **Linha do tempo interativa**: mostrar evolução do desenvolvedor com marcos animados e filtros por bioma.
5. **Modo de exploração e modo de estudo**: alternância entre visitas rápidas e jornadas guiadas com checkpoints educativos.

## 🧭 Requisitos não funcionais
- **Experiência imersiva**: atmosfera sonora leve, narrativa coerente e feedback visual consistente com o tema da floresta.
- **Acessibilidade**: contraste adequado, navegação por teclado, descrições alternativas para elementos visuais e suporte a leitores de tela.
- **Performance**: carregamento inicial otimizado (code splitting no Vite), uso de lazy loading para assets pesados e cache inteligente das respostas do backend.
- **Manutenibilidade**: código modular com componentes reutilizáveis, documentação inline e testes cobrindo casos críticos.

## 🧱 Arquitetura pretendida
- **Frontend**: React + Vite para velocidade de desenvolvimento, Framer Motion para animações, Context API/Redux Toolkit para estado narrativo (bioma ativo, guia selecionado), consumo de APIs via hooks personalizados.
- **Backend**: Node.js com Express, Axios para integrações externas (GitHub, possíveis serviços educacionais) e camada preparada para chamadas ao OpenAI API quando necessário.
- **Camada de conteúdo**: arquivos markdown ou CMS headless leve para armazenar textos dos guias (Raposa, Urso, Coruja), permitindo atualização sem deploy completo.

## 🚀 Estrutura implementada

A primeira versão de código já dá vida ao blueprint e serve como base evolutiva. A organização geral está assim:

```
code-forest-portfolio/
├── backend/           # API Express que conversa com o GitHub
│   ├── controllers/   # Regras de orquestração de dados
│   ├── routes/        # Rotas públicas da floresta
│   ├── services/      # Integrações externas (GitHub, IA, etc.)
│   └── server.js      # Configuração do servidor e middlewares
└── frontend/          # Interface React/Vite com narrativa animada
    ├── src/components # Biomas, guias e cartões de projetos
    ├── src/hooks      # Hooks reutilizáveis (ex.: integração GitHub)
    ├── src/styles     # Estilos globais e atmosfera da floresta
    └── vite.config.js # Ajustes de build e proxy local
```

### Backend
- Endpoint principal: `GET /api/github/repos/:username`
- Resposta contém metadados essenciais (`nome`, `descrição`, `linguagem`, `estrelas`, `url`) prontos para serem exibidos nos cartões animados.
- Suporte opcional a `GITHUB_TOKEN` via variáveis de ambiente para aumentar a taxa de requisições e habilitar futuras expansões.

### Frontend
- SPA criada com Vite + React, animada por Framer Motion.
- Componentes `AnimalGuide`, `ForestScene` e `CodeCard` traduzem a metáfora da floresta.
- Hook `useGithubRepos` encapsula a comunicação com o backend, garantindo estados claros (`loading`, `success`, `error`).

## 🧪 Como executar localmente

> Pré-requisitos: Node.js 18+ instalado.

1. **Instale as dependências**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Configure variáveis de ambiente (opcional)**
   - Crie um arquivo `backend/.env` com `GITHUB_TOKEN="seu-token"` se quiser evitar limites da API pública.
   - Defina `CLIENT_ORIGIN` caso o frontend rode em origem diferente durante o desenvolvimento.

3. **Execute o backend**
   ```bash
   cd backend
   npm run dev
   ```

4. **Execute o frontend**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Acesse a aplicação**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4000/api/github/repos/seu-usuario

Com ambos os serviços ativos, os cartões dos projetos serão atualizados em tempo real conforme você interage com a floresta.

### 🐳 Orquestração com Docker (execução simultânea)

Se preferir que frontend e backend brotem juntos em um único comando, utilize o `docker-compose` incluído no repositório.

1. **Monte o arquivo de variáveis (opcional, mas recomendado)**
   - Copie `backend/.env.example` para `backend/.env` e preencha `GITHUB_TOKEN="seu-token"` se quiser ampliar os limites da API do GitHub.
   - Ajuste `CLIENT_ORIGIN` caso vá acessar o frontend por outra origem além de `http://localhost:5173`.

2. **Construa e levante a floresta inteira**
   ```bash
   docker-compose up --build
   ```

3. **Acesse os portais mágicos**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4000/api/github/repos/seu-usuario

As imagens Node ficam responsáveis por instalar dependências e habilitar recarregamento automático (nodemon no backend e Vite no frontend). Os volumes garantem que alterações locais reflitam dentro dos containers sem fricção.

### Fluxos de dados entre módulos
1. **Exploração de bioma**: Usuário interage com o frontend → estado global atualiza bioma ativo → componentes animados carregam conteúdo local → dados adicionais solicitados ao backend conforme necessário.
2. **Consulta de projetos GitHub**: Frontend chama endpoint `/api/github/repos/:username` → backend usa Axios para consultar GitHub → dados são enriquecidos com metadados educativos → resposta retorna ao frontend para exibição guiada pelo Urso.
3. **Guides inteligentes**: Usuário aciona a Coruja → frontend chama `/api/guides` → backend agrega conteúdo do CMS e, opcionalmente, aciona OpenAI para gerar insights personalizados → frontend apresenta dicas animadas com acessibilidade.
4. **Coleta de feedback** (futuro): formulário no frontend → backend armazena em serviço externo ou banco de dados leve → analytics alimenta decisões pedagógicas.

```
[Usuário] → (React/Vite/Framer Motion) → [API interna] → (Express/Axios) → [GitHub + OpenAI + CMS]
                                   ↘ logs/telemetria ↙
```

## 📦 Backlog inicial
| ID | História | Bioma | Prioridade | Personagem | Status |
|----|----------|-------|------------|------------|--------|
| BF-01 | Como visitante, quero ser recepcionado na Clareira de Boas-Vindas com animações suaves para entender a proposta do portfólio. | Clareira | Alta | Raposa | Planejado |
| BF-02 | Como visitante, desejo ver meus projetos destacados com contexto narrativo fornecido pelo Urso. | Trilhas | Alta | Urso | Planejado |
| BF-03 | Como aprendiz, quero acessar minilições da Coruja dentro da Torre de Sabedoria para aprofundar conhecimentos. | Torre | Média | Coruja | Planejado |
| BF-04 | Como visitante, quero alternar entre modo exploração e estudo para personalizar minha experiência. | Todos | Alta | Raposa/Coruja | Planejado |
| BF-05 | Como mantenedora, desejo registrar feedback de visitantes para evoluir o conteúdo educativo. | Laboratório | Média | Urso/Coruja | Em discovery |

## ✅ Critérios de aceitação
- **BF-01**: animações iniciam em menos de 200ms; textos e botões com contraste AA; narração da Raposa disponível em texto e áudio.
- **BF-02**: lista de projetos atualiza a cada 24h; cards mostram métricas do GitHub e insight educativo; fallback amigável quando API falhar.
- **BF-03**: mínimo de três lições curtas com links externos; suporte a leitores de tela; possibilidade de marcar lições como concluídas.
- **BF-04**: toggle acessível por teclado; estados salvos em localStorage; mudança de modo atualiza orientação dos guias.
- **BF-05**: formulário com validação em tempo real; dados enviados com feedback visual; registros armazenados com carimbo de data/hora.

---

> Este blueprint é vivo. Atualize-o sempre que a floresta ganhar um novo caminho, personagem ou ensinamento.
