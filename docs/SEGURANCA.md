# Verificacoes de Seguranca

Este documento descreve as verificacoes de seguranca configuradas para o projeto.

## SCA: auditoria de dependencias

A verificacao de composicao de software usa `npm audit` para analisar dependencias da raiz do projeto e do servidor.

Comando completo:

```bash
npm run audit
```

Comandos separados:

```bash
npm run audit:root
npm run audit:server
```

O nivel minimo configurado e `high`. A pipeline falha quando forem encontradas vulnerabilidades de severidade alta ou critica.

## SAST: CodeQL

A analise estatica de seguranca usa CodeQL via GitHub Actions.

Workflow:

```text
.github/workflows/codeql.yml
```

Configuracao aplicada:

- linguagem: `javascript-typescript`
- build: `none`
- queries: `security-extended,security-and-quality`
- execucao: `push`, `pull_request` e agendamento semanal

O resultado da analise aparece na aba Security do GitHub, em Code scanning alerts.

## Pipeline principal

Workflow:

```text
.github/workflows/ci.yml
```

Etapas relevantes:

- instalacao das dependencias da raiz
- instalacao das dependencias do servidor
- `npm run audit:root`
- `npm run audit:server`
- build
- lint
- testes unitarios
- testes de fuzzing

## Comando local recomendado

Antes de abrir pull request ou enviar commits, execute:

```bash
npm run audit && npm run build && npm run lint && npm test
```

