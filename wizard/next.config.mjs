/** @type {import('next').NextConfig} */
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cspHeader = `
    default-src 'self' https://*.cerebrum.com https://api2.branch.io https://app.link;
    img-src * 'self' data: blob:;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    script-src 'self' ${process.env.NODE_ENV !== "production" ? "'unsafe-eval'" : ""} https://challenges.cloudflare.com;
    font-src 'self' https://fonts.gstatic.com;
    frame-src 'self' https://challenges.cloudflare.com;
    frame-ancestors *;
    connect-src 'self' https://*.cerebrum.com https://api.dev.cerebrum.com http://localhost:* http://127.0.0.1:*;
  `;

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@cerebruminc/cerebellum": resolve(__dirname, "node_modules/@cerebruminc/cerebellum/lib/esm/"),
      // Remove Cerebellum dependencies that aren't required here
      "@react-google-maps/api": "lodash/noop",
      "@rjsf/core": "lodash/noop",
      "@rjsf/utils": "lodash/noop",
      "@rjsf/validator-ajv8": "lodash/noop",
      "@storybook/addon-actions": "lodash/noop",
      "@storybook/react": "lodash/noop",
      "@testing-library/react": "lodash/noop",
      "@testing-library/user-event": "lodash/noop",
      "@types/react-places-autocomplete": "lodash/noop",
      formik: "lodash/noop",
      "react-dropzone": "lodash/noop",
      "react-google-autocomplete": "lodash/noop",
      "react-places-autocomplete": "lodash/noop",
      yup: "lodash/noop",
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy
            key: "Permissions-Policy",
            value: "camera=(), microphone=()",
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
