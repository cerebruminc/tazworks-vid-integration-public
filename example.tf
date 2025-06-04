variable "cloudflare_domain" {}
variable "cloudflare_zone_id" {}
variable "cloudflare_account_id" {}
variable "instascreen_url" {}
variable "tazworks_platform_url" {}
variable "create_vid_forwarder_record" {}
variable "create_instascreen_record" {}
variable "cloudflare_api_token" {}

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

module "tazworks_vid_integration" {
  source = "github.com/cerebruminc/tazworks-vid-integration-public//terraform"

  create_vid_forwarder_record = false
  create_instascreen_record   = false
  cloudflare_api_token = var.cloudflare_api_token
  cloudflare_domain  = var.cloudflare_domain
  cloudflare_zone_id = var.cloudflare_zone_id
  cloudflare_account_id = var.cloudflare_account_id
  instascreen_url       = var.instascreen_url
  tazworks_platform_url = var.tazworks_platform_url
  
}
