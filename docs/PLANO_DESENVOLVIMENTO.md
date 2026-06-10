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

- `server/package.json` usa `express@3.x` e `socket.io@0.9.x`, que devem ser modernizados em fase própria.
- `game/index.html` carrega `/socket.io/socket.io.js`, então o modo de rede depende do servidor Node.
- O frontend é JavaScript legado sem bundler; testes futuros devem considerar esse formato.
