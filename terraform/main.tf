########################
# DNS Records Resources
########################
resource "cloudflare_dns_record" "vid_forwarder" {
  count   = var.create_vid_forwarder_record == true ? 1 : 0
  zone_id = var.cloudflare_zone_id
  comment = "DNS record for vID forwarder"
  content = "192.0.2.1"
  name    = "vidforwarder.${var.cloudflare_domain}"
  proxied = true
  settings = {
    ipv4_only = true
    ipv6_only = true
  }
  ttl  = 1
  type = "A"
}

resource "cloudflare_dns_record" "instascreen_record" {
  count   = var.create_instascreen_record == true ? 1 : 0
  zone_id = var.cloudflare_zone_id
  comment = "CNAME DNS record for a instascreen domain"
  content = var.instascreen_url
  name    = "www.${var.cloudflare_domain}"
  proxied = false
  settings = {
    ipv4_only = true
    ipv6_only = true
  }
  ttl  = 1
  type = "CNAME"
}

resource "cloudflare_dns_record" "instascreen_secondary_record" {
  count   = var.create_instascreen_record == true ? 1 : 0
  zone_id = var.cloudflare_zone_id
  comment = "CNAME DNS record for a instascreen domain"
  content = "example.com"
  name    = var.cloudflare_domain
  proxied = false
  ttl     = 1
  type    = "CNAME"
}
