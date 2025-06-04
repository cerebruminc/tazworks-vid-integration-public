locals {
  domain_prefix = split(".", var.cloudflare_domain)[0]
}
