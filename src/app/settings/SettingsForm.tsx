"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/api";
import { btn } from "@/components/ui";

interface S {
  weeklyHours: number;
  weeks: number;
  startDate: string;
  jobStartDate: string;
  newCardsPerDay: number;
  retention: number;
  name: string;
}

export function SettingsForm({ initial, aiOn, dbFile }: { initial: S; aiOn: boolean; dbFile: string }) {
  const router = useRouter();
  const [s, setS] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [confirm, setConfirm] = useState("");
  const field = "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm";
  const set = <K extends keyof S>(k: K, v: S[K]) => {
    setS({ ...s, [k]: v });
    setSaved(false);
  };
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 font-semibold">Study plan</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            Your name (optional)
            <input className={field} value={s.name} onChange={(e) => set("name", e.target.value)} />
          </label>
          <label className="text-sm">
            Hours per week
            <input type="number" min={1} max={60} className={field} value={s.weeklyHours} onChange={(e) => set("weeklyHours", Number(e.target.value))} />
          </label>
          <label className="text-sm">
            Weeks available
            <input type="number" min={1} max={104} className={field} value={s.weeks} onChange={(e) => set("weeks", Number(e.target.value))} />
          </label>
          <label className="text-sm">
            Plan start date
            <input type="date" className={field} value={s.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </label>
          <label className="text-sm">
            Job start date (optional)
            <input type="date" className={field} value={s.jobStartDate} onChange={(e) => set("jobStartDate", e.target.value)} />
          </label>
        </div>
      </section>
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 font-semibold">Spaced repetition</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            New cards per day
            <input type="number" min={0} max={200} className={field} value={s.newCardsPerDay} onChange={(e) => set("newCardsPerDay", Number(e.target.value))} />
          </label>
          <label className="text-sm">
            Target retention ({Math.round(s.retention * 100)}%)
            <input type="range" min={0.8} max={0.97} step={0.01} className="w-full" value={s.retention} onChange={(e) => set("retention", Number(e.target.value))} />
            <span className="text-xs text-muted">Higher = more reviews, fewer lapses. 90% is the FSRS default.</span>
          </label>
        </div>
      </section>
      <div className="flex items-center gap-3">
        <button
          className={btn.primary}
          onClick={async () => {
            await post("/api/settings", s);
            setSaved(true);
            router.refresh();
          }}
        >
          Save settings
        </button>
        {saved && <span className="text-sm text-ok">Saved</span>}
      </div>
      <section className="rounded-xl border border-border bg-surface p-5 text-sm">
        <h2 className="mb-2 font-semibold">System</h2>
        <ul className="space-y-1 text-muted">
          <li>
            AI tutor: {aiOn ? <span className="text-ok">enabled</span> : <span className="text-warn">off — set ANTHROPIC_API_KEY in .env.local</span>}
          </li>
          <li>Database file: {dbFile}</li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href="/api/export" className={btn.ghost}>
            Export my progress (JSON)
          </a>
        </div>
      </section>
      <section className="rounded-xl border border-danger/40 bg-surface p-5 text-sm">
        <h2 className="mb-2 font-semibold text-danger">Reset all progress</h2>
        <p className="text-muted">Deletes attempts, mastery, flashcard schedules, notes and history. Export first. Type RESET to confirm.</p>
        <div className="mt-2 flex gap-2">
          <input className="w-32 rounded-lg border border-border bg-bg px-2 py-1.5" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <button
            className={btn.ghost}
            disabled={confirm !== "RESET"}
            onClick={async () => {
              await post("/api/settings", { reset: "RESET" });
              setConfirm("");
              router.refresh();
            }}
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
}
