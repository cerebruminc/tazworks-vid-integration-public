variable "cloudflare_api_token" {
  description = "API Token used to make API calls to Cloudflare API"
  type = string
}

variable "cloudflare_domain" {
  description = "DNS domain where will be deployed the routes regarding vID"
  type = string
}

variable "cloudflare_zone_id" {
  description = "Zone ID where the resources should be deployed"
  type = string
}

variable "domain_from_tazworks" {
  description = "Domain that will redirect to Tazworks"
  type = string
}

variable "instascreen_dns_prefix" {
  description = "Instascreen dns prefix that will generate the DNS to be redirected"
  type = string 
}

