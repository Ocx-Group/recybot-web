output "frontend_hosts" {
  description = "RecyBot frontend hosts managed by Terraform"
  value = [
    digitalocean_record.root.fqdn,
    digitalocean_record.www.fqdn,
  ]
}
