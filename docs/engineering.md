# Contexto da modernização

Repositório: `ApiBooks`. Revisão em 28/10/2026. O objetivo é tornar o clone reproduzível e o comportamento compreensível em uma entrevista técnica, preservando o contexto histórico de exercício/protótipo.

## Decisões e validação

- Cliente Prisma compartilhado, evitando um pool por entidade.
- Senhas armazenadas com BCrypt e removidas das respostas; JWT identifica o usuário e não carrega a senha.
- Cadastro/login públicos; demais operações de usuário exigem identidade e restringem acesso ao próprio cadastro. A listagem global de usuários foi desabilitada.
- Conexão MongoDB configurada pelo ambiente; Compose inicializa um replica set local, necessário às operações transacionais do Prisma.
- Build TypeScript e testes Vitest executáveis sem serviços cloud.


Consulte os scripts reais em `package.json` (ou nos módulos do monorepo). Build, teste unitário e teste com serviços externos são evidências diferentes. A CI não valida credenciais de terceiros nem garante comportamento em produção. O README informa dependências externas e funcionalidades ainda não implementadas.

## Segurança de configurações antigas

Configurações locais e segredos foram retirados da versão atual quando presentes. Isso não remove conteúdo de commits antigos. Se algum segredo histórico ainda estiver ativo, revogue-o no provedor e gere outro; não reutilize credenciais publicadas. A revisão preserva o histórico Git e não faz force push.
