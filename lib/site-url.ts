/**
 * Base URL for redirects and webhooks. Set NEXT_PUBLIC_SITE_URL in production (e.g. Vercel env).
 * On Vercel, VERCEL_URL is set automatically if NEXT_PUBLIC_SITE_URL is omitted.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3000";
}
