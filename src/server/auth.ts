/** Server-side check that an AI request comes from a signed-in academy user (protects the API key). */
import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hkokhpihodaeltfnhfio.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_BwCcLd1Tb18YbFRIGD0ZxQ_MoLdkU9r";

export type AuthResult = { ok: true; email: string | undefined } | { ok: false; status: number; message: string };

export async function requireUser(req: Request): Promise<AuthResult> {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return { ok: false, status: 401, message: "Sign in (Settings → Account) to use the AI tutor." };
  const { data, error } = await createClient(URL, KEY, { auth: { persistSession: false } }).auth.getUser(token);
  if (error || !data.user) return { ok: false, status: 401, message: "Your session expired — sign in again in Settings." };
  const allow = (process.env.AI_ALLOWED_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (allow.length && !allow.includes((data.user.email || "").toLowerCase())) return { ok: false, status: 403, message: "This account is not allowed to use the AI tutor." };
  return { ok: true, email: data.user.email };
}
