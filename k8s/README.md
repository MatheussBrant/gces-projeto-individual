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

