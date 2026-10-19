import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { LearnerStore, type Remote } from "@/lib/store/store";
import { _resetConnection } from "@/lib/store/idb";
import type { Doc, LearnEvent } from "@/lib/store/derive";

/** In-memory stand-in for Supabase: an append-only table with a sequence, plus docs. */
class FakeRemote implements Remote {
  rows: (LearnEvent & { seq: number })[] = [];
  docs = new Map<string, Doc>();
  constructor(private uid: string | null = "user-1") {}
  userId() {
    return this.uid;
  }
  async pushEvents(events: LearnEvent[]) {
    for (const e of events) if (!this.rows.some((r) => r.id === e.id)) this.rows.push({ ...e, seq: this.rows.length + 1 });
  }
  async pullEvents(after: number) {
    const page = this.rows.filter((r) => r.seq > after).slice(0, 2);
    return { events: page.map(({ seq: _s, ...e }) => e), lastSeq: page.length ? page[page.length - 1].seq : after, more: page.length === 2 };
  }
  async pullDocs() {
    return [...this.docs.values()];
  }
  async pushDocs(docs: Doc[]) {
    for (const d of docs) this.docs.set(d.key, d);
  }
}

function deleteDb() {
  _resetConnection();
  return new Promise<void>((resolve) => {
    const r = indexedDB.deleteDatabase("mewre-academy");
    r.onsuccess = r.onerror = r.onblocked = () => resolve();
  });
}

async function freshStore(dbName: string) {
  // each "device" starts from an empty IndexedDB
  await deleteDb();
  const s = new LearnerStore();
  await s.load();
  return Object.assign(s, { dbName });
}

describe("LearnerStore", () => {
  beforeEach(() => deleteDb());

  it("persists events and docs in IndexedDB", async () => {
    const a = new LearnerStore();
    await a.emit("lesson-complete", { lesson: "m01-l01" });
    await a.setDoc("note:m01-l01", { body: "hello" });
    _resetConnection();
    const b = new LearnerStore();
    await b.load();
    expect(b.derived().lessons.get("m01-l01")?.status).toBe("completed");
    expect(b.doc<{ body: string }>("note:m01-l01")?.body).toBe("hello");
    expect(b.status.pending).toBe(2);
  });

  it("syncs two devices through the remote", async () => {
    const remote = new FakeRemote();
    const phone = await freshStore("phone");
    await phone.emit("lesson-complete", { lesson: "m01-l01" });
    await phone.emit("attempt", { q: "q1", source: "quiz", score: 0, correct: false, concepts: [] });
    await phone.emit("review", { card: "c1", rating: 3 });
    await phone.setDoc("note:m01-l01", { body: "from phone" }, 100);
    phone.setRemote(remote);
    await phone.syncNow();
    expect(remote.rows).toHaveLength(3);
    expect(phone.status.pending).toBe(0);

    const laptop = await freshStore("laptop");
    await laptop.emit("lesson-complete", { lesson: "m08-l01" });
    await laptop.setDoc("note:m01-l01", { body: "older laptop note" }, 50);
    laptop.setRemote(remote);
    await laptop.syncNow();
    const d = laptop.derived();
    expect([...d.lessons.keys()].sort()).toEqual(["m01-l01", "m08-l01"]);
    expect(d.errors.has("q1")).toBe(true);
    expect(d.cards.get("c1")?.reps).toBe(1);
    expect(laptop.doc<{ body: string }>("note:m01-l01")?.body).toBe("from phone"); // newer wins
    expect(remote.rows).toHaveLength(4);

    // syncing again is idempotent
    await laptop.syncNow();
    expect(remote.rows).toHaveLength(4);
    expect(laptop.allEvents()).toHaveLength(4);
  });

  it("stays usable without a remote or while signed out", async () => {
    const s = await freshStore("x");
    s.setRemote(new FakeRemote(null));
    await s.emit("lesson-start", { lesson: "a" });
    await s.syncNow();
    expect(s.status.state).toBe("signed-out");
    expect(s.status.pending).toBe(1);
  });

  it("import merges by id without duplicates", async () => {
    const s = await freshStore("y");
    const e = await s.emit("lesson-start", { lesson: "a" });
    const r = await s.importData({ events: [e, { id: "new", type: "lesson-complete", at: 5, payload: { lesson: "a" } }], docs: [{ key: "settings", value: { weeks: 4 }, updatedAt: Date.now() + 1000 }] });
    expect(r).toEqual({ events: 1, docs: 1 });
    expect(s.settings().weeks).toBe(4);
  });
});
