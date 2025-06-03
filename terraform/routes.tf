###########################
# Cloudflare worker scripts
###########################
resource "cloudflare_workers_script" "proxy_forwarder" {
  name       = "proxy-forwarder"
  content    = file("${path.module}/forwarder.js")
  account_id = var.cloudflare_account_id
}

resource "cloudflare_workers_script" "injector" {
  name       = "injector"
  content    = file("${path.module}/worker.js")
  account_id = var.cloudflare_account_id
}
###########################
# Cloudflare worker routes
###########################
resource "cloudflare_workers_route" "vidforwarder_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "${var.cloudflare_domain}/vidforwarder"

  script_name = cloudflare_workers_script.proxy_forwarder.name
}

resource "cloudflare_workers_route" "orders_searches_taz_route" {
  zone_id     = var.cloudflare_zone_id
  pattern     = "${var.cloudflare_domain}/orders/searches.taz"
  script_name = cloudflare_workers_script.injector.name
}

resource "cloudflare_workers_route" "libs_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "${var.cloudflare_domain}/_libs/*"
}

resource "cloudflare_workers_route" "scripts_routes" {
  zone_id = var.cloudflare_zone_id
  pattern = "${var.cloudflare_domain}/_scripts/*"
}

resource "cloudflare_workers_route" "styles_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "${var.cloudflare_domain}/_styles/*"
}

resource "cloudflare_workers_route" "ui_v1_system_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "${var.cloudflare_domain}/ui/v1/system/*"
}

resource "cloudflare_workers_route" "ui_v1_domain_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "${var.cloudflare_domain}/ui/v1/domain/*"
}

resource "cloudflare_workers_route" "spa_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "${var.cloudflare_domain}/spa/*"
}
