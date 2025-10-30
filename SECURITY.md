# Política de Segurança do Safari do Código

Este documento define práticas mínimas para proteger o ecossistema do portfólio, cobrindo gestão de segredos, cabeçalhos de segurança e controles preventivos. Todas as pessoas contribuidoras devem seguir estas orientações em qualquer ambiente (desenvolvimento, homologação e produção).

## 1. Gestão de segredos
- **Nunca** versionar credenciais reais; utilize arquivos `.env` locais baseados em `.env.example`.
- Rotacione senhas e tokens ao menos a cada 90 dias ou sempre que houver suspeita de vazamento.
- Restrinja privilégios: use contas de serviço dedicadas, com permissões mínimas necessárias.
- Armazene segredos de produção em cofres (por exemplo, AWS Secrets Manager, Vault ou GCP Secret Manager). O acesso deve ser auditável.
- Remova variáveis obsoletas para evitar acumular credenciais sem uso.

## 2. Transmissão segura
- Todas as comunicações externas devem ocorrer via **HTTPS**.
- Ative **HSTS** com `max-age` mínimo de 6 meses (`max-age=15552000; includeSubDomains; preload`).
- Habilite **TLS 1.2** ou superior em todos os serviços expostos.

## 3. Cabeçalhos e política de conteúdo
- Configure **Content-Security-Policy (CSP)** restringindo scripts e assets a domínios confiáveis. Exemplo básico:
  ```http
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.safaridocodigo.com;
  ```
- Utilize **X-Content-Type-Options: nosniff** e **X-Frame-Options: DENY** para mitigar ataques de clickjacking e MIME sniffing.
- Ative **Referrer-Policy: strict-origin-when-cross-origin** para proteger dados sensíveis em requisições.

## 4. Rate limiting e mitigação de abuso
- Aplique limites por IP e/ou por token em rotas críticas (login, reset de senha, APIs públicas).
- Bloqueie temporariamente fontes que excederem os limites e registre tentativas suspeitas.
- Utilize CAPTCHA, MFA ou verificações adicionais em fluxos sensíveis.

## 5. Monitoramento e resposta
- Centralize logs de segurança e audite eventos relevantes (acesso administrativo, falhas de autenticação, criação de tokens).
- Estabeleça canais para reporte responsável de vulnerabilidades (security@safaridocodigo.com).
- Tenha plano de resposta a incidentes, com responsáveis, contatos e etapas de comunicação externa.

## 6. Dependências e build
- Atualize dependências periodicamente e monitore vulnerabilidades (ex.: `pnpm audit`).
- Assine artefatos e valide checksums quando disponível.
- Implemente CI/CD com validação de segurança (linters, scanners de dependências, testes).

Manter este documento atualizado garante que a segurança evolua junto com o projeto. Sugestões e melhorias são sempre bem-vindas via issues ou PRs dedicados.
