variable "create_instascreen_record" {
  description = "Should the code create or not the instascreen dns record on cloudflare. Default to false"
  type        = bool
  default     = false
}

variable "create_vid_forwarder_record" {
  description = "Should the code create or not the vid forwarder dns record on cloudflare. Default to true"
  type        = bool
  default     = true
}

variable "cloudflare_api_token" {
  description = "API Token used to make API calls to Cloudflare API"
  type        = string
}

variable "cloudflare_domain" {
  description = "DNS domain where will be deployed the routes regarding vID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Zone ID where the resources should be deployed"
  type        = string
}

variable "cloudflare_account_id" {
  description = "Account ID where the resources should be deployed"
  type        = string
}

variable "tazworks_platform_url" {
  description = "Domain that will redirect to Tazworks"
  type        = string
}

variable "instascreen_url" {
  description = "Instascreen URL that will generate the DNS to be redirected"
  type        = string
}

