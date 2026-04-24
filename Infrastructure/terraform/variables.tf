variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "domain" {
  description = "Primary domain for the RecyBot frontend"
  type        = string
  default     = "recybotia.com"
}

variable "k8s_lb_ip" {
  description = "Public IP of the Kubernetes ingress load balancer"
  type        = string
}

variable "ttl" {
  description = "DNS TTL in seconds"
  type        = number
  default     = 300
}
