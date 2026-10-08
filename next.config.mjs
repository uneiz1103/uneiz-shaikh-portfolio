import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

const isDevEnv = process.env.NODE_ENV === "development";

// Next.js and the theme boot script inject inline scripts without a nonce, so
// 'unsafe-inline' is required for script-src on a fully static site.
// Vercel Analytics is served from /_vercel/insights in production; only its
// development build loads from va.vercel-scripts.com.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevEnv ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDevEnv ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const canonicalHost = "uneizshaikh.dev";

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the custom domain once one is
// attached, so *.vercel.app is only redirected after the domain is live.
const redirectVercelHost =
  process.env.VERCEL_ENV === "production" &&
  process.env.VERCEL_PROJECT_PRODUCTION_URL === canonicalHost;

/** @type {import("next").NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  async redirects() {
    if (!redirectVercelHost) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<subdomain>.+)\\.vercel\\.app" }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default async function config(phase) {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isBuild = phase === PHASE_PRODUCTION_BUILD;

  if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = "1";
    const { build } = await import("velite");
    await build({ watch: isDev, clean: !isDev, strict: true });
  }

  return nextConfig;
}
