# Portfólio CMS

Aplicação completa (Spring Boot + React) para gerenciar o portfólio pessoal de David Henrique Miranda da Silva. O sistema possui uma área pública com informações sobre o profissional, lista de projetos, habilidades e contato, além de um painel administrativo protegido por JWT para cadastro e edição de conteúdo.

## ✨ Tecnologias

### Backend
- Java 17 + Spring Boot 3 (Web, Security, Data JPA, Validation)
- Spring Security com JWT
- PostgreSQL + Flyway
- Swagger (Springdoc OpenAPI)
- Docker

### Frontend
- React.js + Vite
- React Router DOM
- TailwindCSS (dark mode)
- Axios
- React Hook Form

## 📁 Estrutura
```
.
├── backend/        # API Spring Boot
├── frontend/       # SPA React
└── docker-compose.yml
```

## 🚀 Como executar localmente

### Pré-requisitos
- Java 17+
- Maven 3.9+
- Node.js 18+
- PostgreSQL 15 (ou usar Docker)

### Backend
```bash
cd backend
mvn spring-boot:run
```
A API estará disponível em `http://localhost:8080`.

Credenciais padrão do administrador (configuradas via Flyway):
- **Usuário:** `admin`
- **Senha:** `admin123`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
A aplicação web ficará disponível em `http://localhost:5173`.

## 🐳 Executando com Docker Compose
```bash
docker compose up --build
```
Serviços expostos:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432 (user/database/password: `portfolio`)

## 📚 Documentação da API
Acesse `http://localhost:8080/swagger-ui/index.html` para visualizar e testar os endpoints. Utilize o botão `Authorize` e informe `Bearer {token}` após realizar login.

## 📂 Uploads de imagem
As imagens enviadas pelo painel administrativo são salvas no diretório `uploads/` (mapeado em volume Docker) e servidas pela API através do caminho `/uploads/{arquivo}`.
