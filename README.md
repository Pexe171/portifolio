# Portfólio CMS

Criei esta aplicação completa (Spring Boot + React) para gerenciar meu portfólio profissional. Organizei uma área pública com minhas informações, projetos, habilidades e contatos, além de um painel administrativo protegido por JWT onde controlo todo o conteúdo.

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
- PostgreSQL 15 (ou Docker)

### Backend
```bash
cd backend
mvn spring-boot:run
```
Eu disponibilizo a API em `http://localhost:8080`.

Credenciais padrão do administrador (definidas via Flyway):
- **Usuário:** `admin`
- **Senha:** `admin123`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Eu acesso a aplicação web em `http://localhost:5173`.

## 🐳 Executando com Docker Compose
```bash
docker compose up --build
```
Os serviços sobem da seguinte forma:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432 (user/database/password: `portfolio`)

## 📚 Documentação da API
Disponibilizei o Swagger em `http://localhost:8080/swagger-ui/index.html`. Após fazer login, basta clicar em `Authorize` e informar `Bearer {token}` para testar os endpoints.

## 📂 Uploads de imagem
Guardo as imagens enviadas pelo painel no diretório `uploads/` (mapeado como volume Docker) e sirvo cada arquivo pela API no caminho `/uploads/{arquivo}`.
