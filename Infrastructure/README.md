# RecyBot Web Infrastructure

This folder contains the Kubernetes, ArgoCD, and Terraform configuration for the RecyBot frontend.

## Components

- `k8s/recybot-web`: Deployment, Service, HPA, Ingress, and Kustomize entrypoint.
- `argocd`: AppProject and Application for GitOps deployment.
- `terraform`: DigitalOcean DNS records for `recybotia.com` and `www.recybotia.com`.

## DNS

The Terraform module points both hosts to the public Kubernetes ingress load balancer IP.

```powershell
$env:TF_VAR_do_token = "<digitalocean-token>"
terraform -chdir=Infrastructure/terraform init
terraform -chdir=Infrastructure/terraform plan -var-file=environments/prod.tfvars
terraform -chdir=Infrastructure/terraform apply -var-file=environments/prod.tfvars
```

## Deployment

The GitHub Actions workflow builds and pushes `registry.digitalocean.com/ocx-registry/recybot-web`, then applies the ArgoCD project and application. ArgoCD keeps the Kubernetes manifests synchronized from `Infrastructure/k8s/recybot-web`.
