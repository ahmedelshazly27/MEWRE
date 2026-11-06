/** Supabase-backed Remote for the learner store, plus auth helpers. Browser only. */
import type { SupabaseClient, Session } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { AUTH_COOKIE, SUPABASE_KEY, SUPABASE_URL } from "@/lib/supabase-config";
import type { Doc, LearnEvent } from "./derive";
import type { Remote } from "./store";

const PAGE = 1000;

let client: SupabaseClient | null = null;
/**
 * Browser client. The session lives in a cookie (not localStorage) so the server-side gate in
 * src/proxy.ts can check it before serving any page or data file.
 */
export function supabase(): SupabaseClient {
  if (!client) {
    client = createBrowserClient(SUPABASE_URL, SUPABASE_KEY, {
      cookieOptions: { name: AUTH_COOKIE, sameSite: "lax", secure: location.protocol === "https:", path: "/", maxAge: 400 * 24 * 3600 },
      auth: { persistSession: true, autoRefreshToken: true },
    });
    void migrateLegacySession(client);
  }
  return client;
}

/** Moves a session stored by the previous localStorage-based client into the cookie session, once. */
async function migrateLegacySession(c: SupabaseClient) {
  try {
    const raw = localStorage.getItem("mewre-auth");
    if (!raw) return;
    localStorage.removeItem("mewre-auth");
    const s = JSON.parse(raw) as { access_token?: string; refresh_token?: string };
    const { data } = await c.auth.getSession();
    if (!data.session && s.access_token && s.refresh_token) await c.auth.setSession({ access_token: s.access_token, refresh_token: s.refresh_token });
  } catch {}
}

interface EventRow {
  seq: number;
  id: string;
  type: string;
  payload: unknown;
  at: number;
  device: string | null;
}

export class SupabaseRemote implements Remote {
  constructor(private session: Session | null) {}

  setSession(s: Session | null) {
    this.session = s;
  }

  userId() {
    return this.session?.user.id ?? null;
  }

  async pushEvents(events: LearnEvent[]) {
    const rows = events.map((e) => ({ id: e.id, type: e.type, payload: e.payload, at: e.at, device: e.device ?? null }));
    const { error } = await supabase().from("mewre_events").upsert(rows, { onConflict: "id", ignoreDuplicates: true });
    if (error) throw new Error(error.message);
  }

  async pullEvents(afterSeq: number) {
    const { data, error } = await supabase()
      .from("mewre_events")
      .select("seq,id,type,payload,at,device")
      .gt("seq", afterSeq)
      .order("seq", { ascending: true })
      .limit(PAGE);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as EventRow[];
    return {
      events: rows.map((r) => ({ id: r.id, type: r.type, payload: r.payload, at: Number(r.at), device: r.device ?? undefined }) as LearnEvent),
      lastSeq: rows.length ? Number(rows[rows.length - 1].seq) : afterSeq,
      more: rows.length === PAGE,
    };
  }

  async pullDocs(): Promise<Doc[]> {
    const { data, error } = await supabase().from("mewre_docs").select("key,value,updated_at");
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: { key: string; value: unknown; updated_at: number }) => ({ key: r.key, value: r.value, updatedAt: Number(r.updated_at) }));
  }

  async pushDocs(docs: Doc[]) {
    const rows = docs.map((d) => ({ key: d.key, value: d.value, updated_at: d.updatedAt, user_id: this.userId() }));
    const { error } = await supabase().from("mewre_docs").upsert(rows, { onConflict: "user_id,key" });
    if (error) throw new Error(error.message);
  }
}
