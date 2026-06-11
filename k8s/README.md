# Kubernetes

Manifests para executar frontend, backend e Postgres em Kubernetes.

## Aplicar

```bash
kubectl apply -k k8s
```

## Remover

```bash
kubectl delete -k k8s
```

## Imagens esperadas

- `ghcr.io/matheussbrant/gces-projeto-individual-api:latest`
- `ghcr.io/matheussbrant/gces-projeto-individual-web:latest`

As imagens serão publicadas pelo pipeline em commit próprio.

## Deploy continuo

O workflow `.github/workflows/deploy.yml` aplica estes manifests quando o workflow de publicacao de imagens termina com sucesso na branch `main`.

Para habilitar o deploy, configure o secret `KUBE_CONFIG_B64` no GitHub com o conteudo do kubeconfig codificado em base64:

```bash
base64 -w 0 ~/.kube/config
```

O deploy automatico usa as tags `sha-<commit>` publicadas no GHCR. A execucao manual do workflow permite informar outra tag, como `latest`.

## Ingress e TLS

Os manifests incluem um `Ingress` para o host `gces-projeto-individual.local` usando a classe `nginx`.

Pre-requisitos do cluster:

- NGINX Ingress Controller instalado.
- cert-manager instalado.

O certificado TLS e gerado pelo cert-manager com o `Issuer` self-signed `mkjs-selfsigned`, gravando o certificado no secret `frontend-tls`.

Para um ambiente publico, troque o host em `k8s/ingress.yaml` e substitua o `Issuer` self-signed por um emissor ACME, como Let's Encrypt.
