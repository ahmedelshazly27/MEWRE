/**
 * Local-first learner store: an event log + docs in IndexedDB, mirrored in memory, with
 * optional two-way sync to a Remote (Supabase). Works fully offline; sync catches up later.
 */
import * as idb from "./idb";
import { defaultSettings, derive, mergeDocs, type Derived, type Doc, type EventMap, type EventType, type LearnEvent, type Settings } from "./derive";

export interface Remote {
  /** null when signed out */
  userId(): string | null;
  pushEvents(events: LearnEvent[]): Promise<void>;
  /** Events with seq > afterSeq, oldest first, in pages. */
  pullEvents(afterSeq: number): Promise<{ events: LearnEvent[]; lastSeq: number; more: boolean }>;
  pullDocs(): Promise<Doc[]>;
  pushDocs(docs: Doc[]): Promise<void>;
}

export type SyncStatus = { state: "idle" | "syncing" | "error" | "offline" | "signed-out"; lastSyncAt: number | null; message?: string; pending: number };

interface Meta {
  key: string;
  value: unknown;
}

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export class LearnerStore {
  private events: LearnEvent[] = [];
  private ids = new Set<string>();
  private docs = new Map<string, Doc>();
  private pendingEvents = new Set<string>();
  private pendingDocs = new Set<string>();
  private listeners = new Set<() => void>();
  private derivedCache: { version: number; value: Derived } | null = null;
  private loading: Promise<void> | null = null;
  private syncing: Promise<void> | null = null;
  private syncTimer: ReturnType<typeof setTimeout> | null = null;
  version = 0;
  ready = false;
  deviceId = "";
  remote: Remote | null = null;
  status: SyncStatus = { state: "signed-out", lastSyncAt: null, pending: 0 };

  load(): Promise<void> {
    if (!this.loading) {
      this.loading = (async () => {
        const [events, docs, meta] = await Promise.all([idb.getAll<LearnEvent>("events"), idb.getAll<Doc>("docs"), idb.getAll<Meta>("meta")]);
        for (const e of events) this.addLocal(e);
        for (const d of docs) this.docs.set(d.key, d);
        const m = new Map(meta.map((x) => [x.key, x.value]));
        this.deviceId = (m.get("deviceId") as string) || uuid().slice(0, 8);
        if (!m.get("deviceId")) await idb.putMany("meta", [{ key: "deviceId", value: this.deviceId }]);
        for (const id of (m.get("pendingEvents") as string[]) ?? []) this.pendingEvents.add(id);
        for (const k of (m.get("pendingDocs") as string[]) ?? []) this.pendingDocs.add(k);
        this.status = { ...this.status, lastSyncAt: (m.get("lastSyncAt") as number) ?? null, pending: this.pendingCount() };
        this.ready = true;
        this.bump();
      })();
    }
    return this.loading;
  }

  private addLocal(e: LearnEvent) {
    if (this.ids.has(e.id)) return false;
    this.ids.add(e.id);
    this.events.push(e);
    return true;
  }

  private pendingCount() {
    return this.pendingEvents.size + this.pendingDocs.size;
  }

  private bump() {
    this.version++;
    for (const l of this.listeners) l();
  }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getVersion = () => this.version;

  // ---------------------------------------------------------------- reads

  settings(): Settings {
    const d = this.docs.get("settings");
    return { ...defaultSettings(this.firstEventAt()), ...((d?.value as Partial<Settings>) ?? {}) };
  }

  private firstEventAt(): number {
    let min = Infinity;
    for (const e of this.events) if (e.at < min) min = e.at;
    return Number.isFinite(min) ? min : Date.now();
  }

  doc<T>(key: string): T | undefined {
    return this.docs.get(key)?.value as T | undefined;
  }

  docsWithPrefix(prefix: string): Doc[] {
    return [...this.docs.values()].filter((d) => d.key.startsWith(prefix));
  }

  derived(): Derived {
    if (!this.derivedCache || this.derivedCache.version !== this.version) {
      this.derivedCache = { version: this.version, value: derive(this.events, { retention: this.settings().retention }) };
    }
    return this.derivedCache.value;
  }

  allEvents(): LearnEvent[] {
    return [...this.events];
  }

  // ---------------------------------------------------------------- writes

  async emit<T extends EventType>(type: T, payload: EventMap[T], at = Date.now()): Promise<LearnEvent<T>> {
    await this.load();
    const e: LearnEvent<T> = { id: uuid(), type, at, device: this.deviceId, payload };
    this.addLocal(e);
    this.pendingEvents.add(e.id);
    this.bump();
    await idb.putMany("events", [e]);
    await this.persistPending();
    this.scheduleSync();
    return e;
  }

  async setDoc(key: string, value: unknown, at = Date.now()) {
    await this.load();
    const d: Doc = { key, value, updatedAt: at };
    this.docs.set(key, d);
    this.pendingDocs.add(key);
    this.bump();
    await idb.putMany("docs", [d]);
    await this.persistPending();
    this.scheduleSync();
  }

  async saveSettings(patch: Partial<Settings>) {
    await this.setDoc("settings", { ...this.settings(), ...patch });
  }

  private async persistPending() {
    this.status = { ...this.status, pending: this.pendingCount() };
    await idb.putMany("meta", [
      { key: "pendingEvents", value: [...this.pendingEvents] },
      { key: "pendingDocs", value: [...this.pendingDocs] },
    ]);
  }

  /** Import a JSON export (merges by event id; docs last-write-wins). */
  async importData(data: { events?: LearnEvent[]; docs?: Doc[] }) {
    await this.load();
    const fresh = (data.events ?? []).filter((e) => e && e.id && e.type && typeof e.at === "number" && this.addLocal(e));
    for (const e of fresh) this.pendingEvents.add(e.id);
    await idb.putMany("events", fresh);
    const { toApply } = mergeDocs([...this.docs.values()], data.docs ?? []);
    for (const d of toApply) {
      this.docs.set(d.key, d);
      this.pendingDocs.add(d.key);
    }
    await idb.putMany("docs", toApply);
    await this.persistPending();
    this.bump();
    this.scheduleSync();
    return { events: fresh.length, docs: toApply.length };
  }

  exportData() {
    return { app: "mewre-pm-academy", exportedAt: new Date().toISOString(), events: this.allEvents(), docs: [...this.docs.values()] };
  }

  // ---------------------------------------------------------------- sync

  setRemote(remote: Remote | null) {
    this.remote = remote;
    this.status = { ...this.status, state: remote?.userId() ? "idle" : "signed-out" };
    this.bump();
    if (remote?.userId()) this.scheduleSync(0);
  }

  scheduleSync(delay = 4000) {
    if (!this.remote?.userId()) return;
    if (this.syncTimer) clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(() => void this.syncNow(), delay);
  }

  private setStatus(s: Partial<SyncStatus>) {
    this.status = { ...this.status, ...s, pending: this.pendingCount() };
    this.bump();
  }

  syncNow(): Promise<void> {
    if (this.syncing) return this.syncing;
    this.syncing = this.doSync().finally(() => {
      this.syncing = null;
    });
    return this.syncing;
  }

  private async doSync() {
    await this.load();
    const remote = this.remote;
    const uid = remote?.userId();
    if (!remote || !uid) return this.setStatus({ state: "signed-out" });
    if (typeof navigator !== "undefined" && navigator.onLine === false) return this.setStatus({ state: "offline" });
    this.setStatus({ state: "syncing" });
    try {
      // 1. push local events not yet on the server (idempotent: server ignores duplicate ids)
      const pending = this.events.filter((e) => this.pendingEvents.has(e.id));
      for (let i = 0; i < pending.length; i += 500) {
        const batch = pending.slice(i, i + 500);
        await remote.pushEvents(batch);
        for (const e of batch) this.pendingEvents.delete(e.id);
        await this.persistPending();
      }
      // 2. pull everything newer than our last server cursor
      const seqKey = `lastSeq:${uid}`;
      let cursor = ((await idb.get<Meta>("meta", seqKey))?.value as number) ?? 0;
      const incoming: LearnEvent[] = [];
      for (;;) {
        const page = await remote.pullEvents(cursor);
        for (const e of page.events) if (this.addLocal(e)) incoming.push(e);
        cursor = page.lastSeq;
        if (!page.more) break;
      }
      await idb.putMany("events", incoming);
      await idb.putMany("meta", [{ key: seqKey, value: cursor }]);
      // 3. docs: last-write-wins
      const { toPush, toApply } = mergeDocs([...this.docs.values()], await remote.pullDocs());
      if (toPush.length) await remote.pushDocs(toPush);
      for (const d of toApply) this.docs.set(d.key, d);
      await idb.putMany("docs", toApply);
      this.pendingDocs.clear();
      await this.persistPending();
      const now = Date.now();
      await idb.putMany("meta", [{ key: "lastSyncAt", value: now }]);
      this.setStatus({ state: "idle", lastSyncAt: now, message: incoming.length ? `Pulled ${incoming.length} updates` : undefined });
    } catch (err) {
      this.setStatus({ state: "error", message: (err as Error).message });
    }
  }

  /** Wipe local data only (signing out on a shared device). */
  async clearLocal() {
    await Promise.all([idb.clear("events"), idb.clear("docs"), idb.clear("meta")]);
    this.events = [];
    this.ids.clear();
    this.docs.clear();
    this.pendingEvents.clear();
    this.pendingDocs.clear();
    await idb.putMany("meta", [{ key: "deviceId", value: this.deviceId }]);
    this.bump();
  }
}

let singleton: LearnerStore | null = null;
export function getStore(): LearnerStore {
  if (!singleton) singleton = new LearnerStore();
  return singleton;
}
