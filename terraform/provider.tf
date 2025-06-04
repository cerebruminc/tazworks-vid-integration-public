terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }

  required_version = "1.7.0"
}


provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
