/** Supabase project for auth and sync. Publishable values are safe in the browser; data access is enforced by RLS. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hkokhpihodaeltfnhfio.supabase.co";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_BwCcLd1Tb18YbFRIGD0ZxQ_MoLdkU9r";
/** Session cookie name, read by src/proxy.ts to gate every page. */
export const AUTH_COOKIE = "academy-auth";

/** Comma-separated allowlist of emails that may open the platform. */
export function allowedEmails(): string[] {
  return (process.env.ALLOWED_EMAILS || process.env.AI_ALLOWED_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}
