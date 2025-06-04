###########################
# Cloudflare worker scripts
###########################
resource "cloudflare_workers_script" "proxy_forwarder" {
  script_name = "${local.domain_prefix}-proxy-forwarder"
  content     = file("${path.module}/../workers/forwarder.js")
  account_id  = var.cloudflare_account_id
}

resource "cloudflare_workers_script" "injector" {
  script_name = "${local.domain_prefix}-injector"
  content     = file("${path.module}/../workers/worker.js")
  account_id  = var.cloudflare_account_id

  observability = {
    enabled = false
    logs = {
      enabled            = true
      head_sampling_rate = 1
      invocation_logs    = true
    }
  }
}
###########################
# Cloudflare worker routes
###########################
resource "cloudflare_workers_route" "vidforwarder_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/vidforwarder"

  script = cloudflare_workers_script.proxy_forwarder.id
}

resource "cloudflare_workers_route" "orders_searches_taz_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/order/searches.taz"
  script  = cloudflare_workers_script.injector.id
}

resource "cloudflare_workers_route" "orders_new_taz_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/order/new.taz"
  script  = cloudflare_workers_script.injector.id
}

resource "cloudflare_workers_route" "libs_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/_libs/*"
}

resource "cloudflare_workers_route" "scripts_routes" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/_scripts/*"
}

resource "cloudflare_workers_route" "styles_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/_styles/*"
}

resource "cloudflare_workers_route" "ui_v1_system_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/ui/v1/system/*"
}

resource "cloudflare_workers_route" "ui_v1_domain_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/ui/v1/domain/*"
}

resource "cloudflare_workers_route" "spa_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "www.${var.cloudflare_domain}/spa/*"
}
