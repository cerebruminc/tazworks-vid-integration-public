########################
# DNS Records Resources
########################
resource "cloudflare_dns_record" "vid_button" {
  zone_id = var.cloudflare_zone_id
  comment = "DNS record for vID button"
  content = var.cloudflare_domain 
  name    = var.cloudflare_domain  
  proxied = true
  settings = {
    ipv4_only = true
    ipv6_only = true
  }
  ttl = 3600
  type = "CNAME"

}

resource "cloudflare_dns_record" "" {
  zone_id = var.cloudflare_zone_id
  comment = "CNAME DNS record for a instascreen domain"
  content = "${var.instascreen_url}"
  name    = var.tazworks_platform_url
  proxied = true
  settings = {
    ipv4_only = true
    ipv6_only = true
  }
  ttl = 3600
  type = "CNAME"
}

#############################
# CloudFlare Route Resources
#############################

