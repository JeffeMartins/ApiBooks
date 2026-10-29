# API de livros e usuários

API REST TypeScript/Express com catálogo de livros, disponibilidade para aluguel e cadastro/login de usuários em MongoDB. Origem: exercício de backend de 2023.

[![CI](https://github.com/JeffeMartins/ApiBooks/actions/workflows/ci.yml/badge.svg)](https://github.com/JeffeMartins/ApiBooks/actions/workflows/ci.yml)

## Melhorias de engenharia

- Cliente Prisma compartilhado, evitando um pool por entidade.
- Senhas armazenadas com BCrypt e removidas das respostas; JWT identifica o usuário e não carrega a senha.
- Cadastro/login públicos; demais operações de usuário exigem identidade e restringem acesso ao próprio cadastro. A listagem global de usuários foi desabilitada.
- Conexão MongoDB configurada pelo ambiente; Compose inicializa um replica set local, necessário às operações transacionais do Prisma.
- Build TypeScript e testes Vitest executáveis sem serviços cloud.

## Executar localmente

Pré-requisitos: Node.js 24 LTS e npm; Docker Compose v2 para os serviços que usam banco.

```sh
node scripts/setup-env.mjs
docker compose up -d --build
```

A API fica em `http://localhost:3002`; health em `/health`. Rotas sob `/api`: `POST /createUser`, `POST /login`, `POST /createBook`, `GET /getAllBook`, `GET /getBookById/:id`, `GET /searchBook`, `GET /getRentedBook`, `PUT /updateBookById`, `DELETE /deleteBookById`, `POST /rentedBookById`. Operações protegidas aceitam `Authorization: Bearer TOKEN`.

Cadastro: `{"name":"Demo","email":"demo@example.com","password":"senha-local-longa"}`. Login: `{"email":"demo@example.com","password":"senha-local-longa"}`. O schema de livros está em `prisma/schema.prisma`. IDs são ObjectIds MongoDB. Registros legados com senha em texto precisam de redefinição de senha; não existe fallback que aceite texto puro.

Para desenvolver: `npm ci`, `npm run build`, `npm test`, `npm run dev`, com `DATABASE_URL` apontando para um MongoDB configurado. Prisma 6 é mantido por compatibilidade com MongoDB, que não está disponível no Prisma 7. A dependência transitiva `deepmerge-ts` da CLI está corrigida via override e foi validada com geração do cliente e build. O suporte de segurança dessa linha termina em 19/11/2026; planeje a troca do conector ou uma linha estável compatível antes disso. [Estado oficial do Prisma](https://www.prisma.io/docs/orm/release-status). Não adote Prisma 8 RC automaticamente.

## Qualidade e limites da evidência

As mudanças preservam a proposta do exercício e corrigem problemas observados no código. A CI usa Node 24 e `npm ci`, executa o build quando disponível e os testes existentes. O lockfile é versionado; dependências e pastas de build não são. Dependabot acompanha atualizações semanais. Não há promessa de cobertura total, auditoria completa de segurança ou capacidade de produção.

Não publique `.env`, cookies, tokens ou dados reais de clientes. Antes de expor a aplicação à internet, revise autenticação/autorização, TLS, limites de chamadas, logs e backups conforme o domínio. Os exemplos são para execução local. Use `docker compose down` para parar os containers; volumes persistem e `down -v` apaga seus dados.
