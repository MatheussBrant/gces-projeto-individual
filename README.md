# gces-projeto-individual

Repositório de desenvolvimento do projeto individual de Gerência de Configuração e Evolução de Software (GCES) 2026-1.

A aplicação base é o **mk.js**, um jogo de luta com frontend em HTML5 Canvas/JavaScript e backend em Node.js/Express para o modo em rede.

## Estado atual

Este repositório está apenas configurado para iniciar a implementação do trabalho. As fases avaliadas ainda não foram desenvolvidas aqui.

Configuração inicial aplicada:

- Código-base copiado de `projetoindividual`.
- Estrutura base mantida em `game/` e `server/`.
- Arquivos de apoio adicionados: `.editorconfig`, `.gitattributes`, `.gitignore`, `.nvmrc` e `package.json` raiz.
- Scripts básicos adicionados ao servidor para execução local.
- Plano de fases registrado em `docs/PLANO_DESENVOLVIMENTO.md`.

## Requisitos mapeados

O trabalho deve ser evoluído em fases separadas:

1. Containerização de desenvolvimento.
2. Docker Compose com Postgres.
3. CI de build e lint.
4. Testes unitários.
5. Testes de fuzzing.
6. SAST e SCA.
7. SonarCloud.
8. Containerização de produção com Nginx.
9. Kubernetes e, opcionalmente, Terraform.
10. CD, HTTPS com Cert Manager e segurança de rede.

## Execução local base

Modo local sem servidor:

```bash
xdg-open game/index.html
```

Modo em rede:

```bash
npm run install:server
npm start
```

O servidor legado sobe na porta `55555`:

```text
http://localhost:55555
```

## Execução com Docker

Build da imagem de desenvolvimento:

```bash
docker build -t gces-projeto-individual:dev .
```

Execução do container com hot reload:

```bash
docker run --rm -it \
  -p 55555:55555 \
  -v "$PWD/game:/app/game" \
  -v "$PWD/server:/app/server" \
  -v /app/server/node_modules \
  gces-projeto-individual:dev
```

## Execução com Docker Compose

Subir a aplicação com Postgres:

```bash
docker compose up --build
```

A aplicação ficará disponível em:

```text
http://localhost:55555
```

O Compose cria um banco Postgres e a aplicação registra eventos simples de partidas na tabela `fight_events`.

Para encerrar e remover os containers:

```bash
docker compose down
```

Para remover também os dados persistidos no volume local:

```bash
docker compose down -v
```

## Qualidade e CI

Rodar validação de build local:

```bash
npm run build
```

Rodar lint do frontend e backend:

```bash
npm run lint
```

Rodar testes unitários:

```bash
npm run test:unit
```

Rodar testes de fuzzing:

```bash
npm run test:fuzz
```

Rodar todos os testes:

```bash
npm test
```

Rodar auditoria de dependências:

```bash
npm run audit
```

O workflow `.github/workflows/ci.yml` executa instalação das dependências, auditoria npm, build, lint, testes unitários e testes de fuzzing em pushes e pull requests para `main`.

## Observações para os próximos commits

- As dependências do servidor foram modernizadas para versões atuais de Express, Socket.IO e pg.
- A persistência em Postgres registra eventos de criação, entrada e encerramento de partidas.
- Não há testes, Sonar ou manifestos de infraestrutura neste ponto inicial.
- Os commits das fases devem ser atômicos e espaçados no tempo.
