# Portfólio CMS

Aplicação full-stack para gerenciar um portfólio profissional com uma SPA pública em React e uma API administrativa em Spring Boot protegida por JWT. O projeto permite cadastrar perfil, habilidades, projetos e arquivos, centralizando tudo em um painel privado enquanto expõe apenas o conteúdo público.

## 📚 Sumário
- [Arquitetura](#-arquitetura)
- [Principais funcionalidades](#-principais-funcionalidades)
- [URLs padrão](#-urls-padrão)
- [Como executar localmente](#-como-executar-localmente)
  - [Pré-requisitos](#pré-requisitos)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Executando com Docker Compose](#-executando-com-docker-compose)
- [Fluxo de autenticação](#-fluxo-de-autenticação)
- [Endpoints da API](#-endpoints-da-api)
- [Uploads de arquivos](#-uploads-de-arquivos)
- [Ferramentas de desenvolvimento](#-ferramentas-de-desenvolvimento)

## 🏗 Arquitetura
```
.
├── backend/        # API Spring Boot 3 + Spring Security + PostgreSQL
├── frontend/       # SPA em React + Vite + TailwindCSS
└── docker-compose.yml
```

A infraestrutura de dados utiliza PostgreSQL (com migrações Flyway) e armazenamento local de arquivos em um diretório mapeável via volume Docker.

## ✨ Principais funcionalidades
- Área pública com informações de perfil, habilidades, links sociais e projetos.
- Painel administrativo autenticado para editar perfil, publicar/ocultar projetos e enviar imagens.
- Autenticação via JWT, com filtro automático nas rotas `/api/admin/**`.
- Health check com echo para monitoramento.
- Documentação Swagger disponível para exploração interativa da API.

## 🌐 URLs padrão
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Arquivos públicos: `http://localhost:8080/uploads/{arquivo}`

## 🚀 Como executar localmente

### Pré-requisitos
- Java 17+
- Maven 3.9+
- Node.js 18+
- PostgreSQL 15 (ou Docker Compose)

### Backend
```bash
cd backend
mvn spring-boot:run
```
A API sobe em `http://localhost:8080`.

Credenciais padrão (criadas via Flyway):
- **Usuário:** `admin`
- **Senha:** `admin123`

Para encerrar, pressione `Ctrl+C`. Você também pode gerar o artefato executável com:
```bash
mvn clean package
java -jar target/portifolio-*.jar
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
A SPA fica disponível em `http://localhost:5173`.

Para builds de produção:
```bash
npm run build
npm run preview
```

## 🔧 Variáveis de ambiente

### Backend (`application.yml`)
| Variável | Padrão | Descrição |
| --- | --- | --- |
| `POSTGRES_HOST` | `localhost` | Host do banco PostgreSQL |
| `POSTGRES_PORT` | `5432` | Porta do banco |
| `POSTGRES_DB` | `portfolio` | Nome da base |
| `POSTGRES_USER` | `portfolio` | Usuário da base |
| `POSTGRES_PASSWORD` | `portfolio` | Senha da base |
| `PORT` | `8080` | Porta HTTP da API |
| `JWT_SECRET` | `change-me-super-secret-key` | Segredo para assinatura dos tokens |
| `JWT_EXPIRATION` | `3600000` | Expiração do token em ms (1h) |
| `FILE_UPLOAD_DIR` | `uploads` | Diretório onde os arquivos enviados são salvos |

### Frontend
| Variável | Descrição |
| --- | --- |
| `VITE_API_URL` | URL base da API (ex.: `http://localhost:8080`) |

## 🐳 Executando com Docker Compose
```bash
docker compose up --build
```
Serviços expostos:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432 (user/database/password: `portfolio`)

Os volumes persistem o diretório `uploads/` para manter as imagens mesmo após reiniciar os containers.

## 🔐 Fluxo de autenticação
1. Envie `POST /api/auth/login` com `{ "username": "admin", "password": "admin123" }`.
2. Copie o campo `token` retornado.
3. Em cada requisição administrativa (`/api/admin/**`), informe o cabeçalho `Authorization: Bearer {token}`.
4. No Swagger UI, clique em **Authorize** e forneça o token para testar os endpoints protegidos.

## 📡 Endpoints da API
### Saúde
| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/health` | Status da aplicação |
| `POST` | `/api/health/ping` | Retorna a mensagem enviada para verificação |

### Público
| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/public/profile` | Busca dados do perfil público |
| `GET` | `/api/public/projects` | Lista projetos visíveis |
| `GET` | `/api/public/projects/{id}` | Detalha um projeto (404 se `public_visible=false`) |

### Autenticação
| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Gera token JWT para o painel |

### Administração (requer `Bearer` token)
| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/admin/profile` | Obtém dados completos do perfil |
| `PUT` | `/api/admin/profile` | Atualiza perfil e habilidades |
| `GET` | `/api/admin/projects` | Lista todos os projetos |
| `POST` | `/api/admin/projects` | Cria um novo projeto |
| `GET` | `/api/admin/projects/{id}` | Busca projeto pelo ID |
| `PUT` | `/api/admin/projects/{id}` | Atualiza projeto existente |
| `DELETE` | `/api/admin/projects/{id}` | Remove projeto |
| `POST` | `/api/admin/files/upload` | Recebe `multipart/form-data` e retorna `{ "url": "..." }` |

## 🖼 Uploads de arquivos
- O serviço `FileStorageService` grava os arquivos no diretório configurado em `FILE_UPLOAD_DIR` (padrão `uploads/`).
- Cada upload retorna uma URL pública servida pela API em `/uploads/{arquivo}`.
- No Docker Compose, o diretório é mapeado como volume, garantindo persistência.

## 🛠 Ferramentas de desenvolvimento
- **Backend:** `mvn test` executa os testes automatizados.
- **Frontend:** `npm run lint` valida o código com ESLint.

Para contribuições, abra issues ou PRs descrevendo claramente o contexto e os passos de validação.
