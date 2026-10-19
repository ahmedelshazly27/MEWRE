/** Supabase-backed Remote for the learner store, plus auth helpers. Browser only. */
import { createClient, type SupabaseClient, type Session } from "@supabase/supabase-js";
import type { Doc, LearnEvent } from "./derive";
import type { Remote } from "./store";

// Publishable (anon) values are safe to ship to the browser; access is enforced by RLS.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hkokhpihodaeltfnhfio.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_BwCcLd1Tb18YbFRIGD0ZxQ_MoLdkU9r";
const PAGE = 1000;

let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient {
  if (!client) client = createClient(URL, KEY, { auth: { persistSession: true, autoRefreshToken: true, storageKey: "mewre-auth" } });
  return client;
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
