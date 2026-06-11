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

## Imagem de Produção

Build da imagem de produção do servidor Node:

```bash
docker build -f Dockerfile.prod -t gces-projeto-individual:prod .
```

Execução da imagem de produção:

```bash
docker run --rm -p 55555:55555 gces-projeto-individual:prod
```

Build da imagem Nginx para arquivos estáticos:

```bash
docker build -f Dockerfile.nginx -t gces-projeto-individual-static:prod .
```

Execução da imagem Nginx:

```bash
docker run --rm -p 8080:80 gces-projeto-individual-static:prod
```

## Kubernetes

Aplicar os manifests:

```bash
kubectl apply -k k8s
```

Remover os recursos:

```bash
kubectl delete -k k8s
```

Os manifests esperam imagens publicadas no GHCR. A publicação das imagens será configurada no pipeline em etapa própria.

## Publicação de Imagens

O workflow `.github/workflows/docker-publish.yml` publica as imagens de produção no GHCR quando houver push para `main` ou execução manual.

Imagens publicadas:

```text
ghcr.io/matheussbrant/gces-projeto-individual-api
ghcr.io/matheussbrant/gces-projeto-individual-web
```

Tags publicadas:

```text
latest
sha-<commit>
```

## Deploy Continuo

O workflow `.github/workflows/deploy.yml` aplica os manifests Kubernetes depois que o workflow de publicacao de imagens termina com sucesso na branch `main`.

Para habilitar o deploy no GitHub Actions, configure o secret `KUBE_CONFIG_B64` com o kubeconfig do cluster codificado em base64:

```bash
base64 -w 0 ~/.kube/config
```

O deploy automatico usa as imagens `sha-<commit>` publicadas no GHCR. O workflow tambem pode ser executado manualmente informando outra tag, como `latest`.

## Ingress com TLS

Os manifests Kubernetes incluem um `Ingress` para `gces-projeto-individual.local` com TLS gerenciado pelo cert-manager.

Pre-requisitos no cluster:

- NGINX Ingress Controller.
- cert-manager.

O emissor atual usa certificado self-signed para manter o ambiente reproduzivel. Para publicacao real, ajuste o host em `k8s/ingress.yaml` e troque o emissor em `k8s/cert-manager.yaml` por um emissor ACME.

## Restricao de Portas

Em Kubernetes, os servicos da aplicacao usam `ClusterIP` e o acesso externo fica concentrado no Ingress.

As politicas de rede em `k8s/network-policy.yaml` liberam somente:

- Ingress Controller para frontend na porta `80`.
- Frontend para backend na porta `55555`.
- Backend para Postgres na porta `5432`.

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

Gerar relatório de cobertura:

```bash
npm run coverage
```

O relatório LCOV é gerado em `coverage/lcov.info`.

Rodar auditoria de dependências:

```bash
npm run audit
```

O workflow `.github/workflows/ci.yml` executa instalação das dependências, auditoria npm, build, lint, testes unitários, testes de fuzzing e cobertura em pushes e pull requests para `main`.

O workflow `.github/workflows/codeql.yml` executa análise estática de segurança com CodeQL em pushes, pull requests e semanalmente.

Detalhes das verificações de segurança estão em `docs/SEGURANCA.md`.

A análise de qualidade e cobertura do SonarCloud usa `sonar-project.properties` e requer o secret `SONAR_TOKEN` configurado no GitHub.

## Observações para os próximos commits

- As dependências do servidor foram modernizadas para versões atuais de Express, Socket.IO e pg.
- A persistência em Postgres registra eventos de criação, entrada e encerramento de partidas.
- A imagem de produção do servidor usa build multi-stage com base Alpine.
- A imagem Nginx de produção serve os arquivos estáticos do frontend.
- Os manifests Kubernetes ficam em `k8s/`.
- Os commits das fases devem ser atômicos e espaçados no tempo.
