# Plano de Desenvolvimento

Este repositório recebeu apenas a configuração inicial para evoluir o projeto individual de GCES. As fases avaliadas devem ser implementadas em commits futuros, atômicos e espaçados no tempo.

## Estado inicial

- Código-base copiado de `projetoindividual`.
- Estrutura preservada em `game/` e `server/`.
- Runtime alvo definido como Node.js 22.
- Arquivos de configuração neutros adicionados: `.editorconfig`, `.gitattributes`, `.gitignore`, `.nvmrc` e `package.json` raiz.
- Docker Compose de desenvolvimento integrado com Postgres.
- Persistência simples de eventos de partidas na tabela `fight_events`.
- CI de build e lint configurada com GitHub Actions.
- Teste unitário inicial adicionado ao workflow para demonstrar falha antes da correção.
- Testes de fuzzing adicionados ao workflow para entradas inesperadas do servidor.
- Auditoria npm adicionada ao workflow para SCA.
- CodeQL adicionado ao GitHub Actions para SAST.
- Verificações de segurança documentadas em `docs/SEGURANCA.md`.
- Relatório de cobertura LCOV configurado em `coverage/lcov.info`.
- SonarCloud integrado ao workflow de CI usando `sonar-project.properties`.
- Dockerfile de produção multi-stage com base Alpine adicionado para o servidor Node.
- Imagem Nginx adicionada para servir arquivos estáticos do frontend em produção.
- Manifests Kubernetes adicionados para frontend, backend e Postgres.

## Fases futuras sugeridas

1. Containerização de desenvolvimento com hot reload.
2. Docker Compose com aplicação e Postgres.
3. Persistência simples no backend.
4. CI de build e lint.
5. Testes unitários, incluindo commit com teste quebrando e commit posterior corrigindo.
6. Fuzzing nas entradas do backend.
7. SAST e SCA.
8. SonarCloud com métricas e cobertura.
9. Containerização de produção com Nginx.
10. Kubernetes, CD, HTTPS e restrições de rede.

## Pontos técnicos mapeados

- `server/package.json` usa versões atuais de Express, Socket.IO e pg.
- `game/index.html` carrega `/socket.io/socket.io.js`, então o modo de rede depende do servidor Node.
- O frontend é JavaScript legado sem bundler; testes futuros devem considerar esse formato.
