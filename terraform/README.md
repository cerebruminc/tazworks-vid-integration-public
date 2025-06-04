# Deploying the "Order with vID" button with Terraform

---

## What is this?

This guide helps you set up the "Order with vID" button on Cloudflare using Terraform, even if you have never used Terraform before.

---

## What you need

1. **A computer** (Windows, Mac, or Linux)
2. **An internet connection**
3. **A [Cloudflare account](https://dash.cloudflare.com/sign-up)**
4. **A Cloudflare API Token** (details below)
5. **A text editor** (like Notepad, VS Code, or Sublime Text)

---

## Step 1: Install Terraform

### Windows

1. Download Terraform from [terraform.io/downloads](https://www.terraform.io/downloads).
2. Unzip it and put `terraform.exe` somewhere easy, like `C:\Terraform`.
3. Add `C:\Terraform` to your PATH.
   *(Search "Edit environment variables" in the Start menu > Edit PATH > Add your folder path.)*
4. Open Command Prompt and run:

   ```
   terraform version
   ```

### Mac

1. Open Terminal.
2. Ensure you have [`brew`](https://brew.sh/) installed
3. Run:

   ```
   brew tap hashicorp/tap
   brew install hashicorp/tap/terraform
   ```
4. Check it works:

   ```
   terraform version
   ```

### Linux

1. Open Terminal.
2. Follow the [official install instructions](http://developer.hashicorp.com/terraform/install#linux).
3. Check it works:

   ```
   terraform version
   ```

---

## Step 2: Get a Cloudflare API Token

Terraform needs an API token to manage Cloudflare for you.

-  Log into [Cloudflare Dashboard](https://dash.cloudflare.com/).
-  If you have an Organization account:
    1. Click on your Organization's account name.
    2. Click on the little arrow at the **Manage Account** link on the sidebar.
    3. Click on **Account API Tokens**.
    4. Click on **Create Token**.
-  If you have a Personal account:
    1. Click on your profile (top right), then **My Profile**.
    2. Click on **API Tokens** > **Create Token**.

- Click **Get Started** under the **Create Custom Token** section.
- Give your token a name.
- Add the following permissions:

  | Account / Zone | Permission                   | Level |
  |----------------|------------------------------|-------|
  | Account        | Workers Scripts              | Edit  |
  | Zone           | Workers Routes               | Edit  |
  | Account        | Account Settings             | Read  |
  | Account        | Workers Tail                 | Read  |
  | Account        | Workers Builds Configuration | Edit  |
  | Account        | Workers Observability        | Edit  |
  | Zone           | DNS                          | Edit  |

- Specify the Zone Resources:

  | Include / Exclude | Option              | Zone             |
  |-------------------|---------------------|------------------|
  | Include           | Specific Zone       | \<your domain\>  |

- Click on **Continue to Summary** then **Create Token**
- Save your token somewhere safe, you’ll use it in the next steps.

---

## Step 3: Set Up Your Terraform Project

1. Create a new folder on your machine (example: `vid-button-integration`).
2. Inside that folder, create a file called `main.tf`.

---

## Step 4: Add the "Order with vID" Terraform Module and the Cloudflare Provider to `main.tf`

Paste this in `main.tf` (replace values as needed):

```hcl
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
  source = "github.com/cerebruminc/tazworks-vid-integration-public"

  cloudflare_domain = var.cloudflare_domain
  cloudflare_zone_id = var.cloudflare_zone_id
}
```

---

## Step 5: Store Your Cloudflare API Token Safely

Create a file named `terraform.tfvars` in the same folder, with this content:

```
cloudflare_api_token = "YOUR_API_TOKEN_HERE"
cloudflare_domain = "YOUR_DOMAIN_HERE"
cloudflare_zone_id = "YOUR_ZONE_ID_HERE" # you can find this by going to the Account Home in CloudFlare, clicking on the domain name, then looking at the right sidebar in the "API" section
cloudflare_account_id = "YOUR_ACCOUNT_ID_HERE" # you can find this right above the zone ID
tazworks_platform_url = "YOUR_TAZWORKS_PLATFORM_URL" # usually the same as cloudflare_domain
instascreen_url = "YOUR_INSTASCREEN_URL" # your TazWorks platform instascreen.net URL

```

For extra safety, you can set the CloudFlare API token as an environment variable before running Terraform:

**On Windows:**

```
set CLOUDFLARE_API_TOKEN=YOUR_API_TOKEN_HERE
```

**On Mac/Linux:**

```
export CLOUDFLARE_API_TOKEN=YOUR_API_TOKEN_HERE
```

And then update your provider block to:

```hcl
provider "cloudflare" {}
```

Terraform will pick up the token automatically.

---

## Step 6: Initialize and Deploy

Open a terminal or command prompt **in your project folder**.

1. Run:

   ```
   terraform init
   ```

2. Preview changes:

   ```
   terraform plan
   ```

3. Apply/deploy:

   ```
   terraform apply
   ```

   Type `yes` when prompted.

---

## Step 7: You’re Done!

Your Cloudflare resources will be created by Terraform. 🎉

---

## Troubleshooting

- **terraform: command not found**
  - Make sure Terraform is installed and in your PATH.
- **Provider authentication failed**
  - Double-check your API token.
- **Errors about missing variables**
  - Make sure you provided all required module variables.

---

## More Help

* [Official Terraform Cloudflare provider docs](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs)
