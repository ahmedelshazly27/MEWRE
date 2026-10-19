"use client";

import { useEffect, useState } from "react";
import { useLearner, useSession } from "@/lib/store/react";
import { getStore } from "@/lib/store/store";
import { supabase } from "@/lib/store/supabase";
import { resetProgress } from "@/lib/store/actions";
import type { Settings } from "@/lib/store/derive";
import { BUILD_ID, downloadForOffline, offlineStatus, type OfflineProgress } from "@/components/ServiceWorker";
import { btn, Pill, ProgressBar } from "@/components/ui";

const field = "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm";

function Account() {
  const session = useSession();
  const store = useLearner();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const st = store?.status;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const sb = supabase().auth;
    const { error, data } =
      mode === "signin" ? await sb.signInWithPassword({ email, password }) : await sb.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/settings" } });
    setBusy(false);
    if (error) return setMsg(error.message);
    if (mode === "signup" && !data.session) setMsg("Check your email to confirm the account, then sign in here.");
    setPassword("");
  }

  if (session) {
    return (
      <div className="space-y-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            Signed in as <strong>{session.user.email}</strong>
          </span>
          <Pill tone={st?.state === "error" ? "danger" : st?.state === "syncing" ? "info" : "ok"}>{st?.state === "idle" ? "Synced" : st?.state}</Pill>
        </div>
        <div className="text-muted">
          {st?.lastSyncAt ? `Last sync ${new Date(st.lastSyncAt).toLocaleString()}` : "Not synced yet"}
          {st?.pending ? ` · ${st.pending} local changes waiting` : ""}
          {st?.message ? ` · ${st.message}` : ""}
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={btn.primary} onClick={() => void getStore().syncNow()}>
            Sync now
          </button>
          <button
            className={btn.ghost}
            onClick={async () => {
              await getStore().syncNow();
              await supabase().auth.signOut();
            }}
          >
            Sign out (keep data on this device)
          </button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="space-y-3 text-sm">
      <p className="text-muted">
        Sign in to sync progress between your phone and laptop. Without an account everything still works and stays on this device. Your progress so far is uploaded when you first sign in.
      </p>
      <div className="flex gap-1 rounded-lg bg-surface-2 p-1">
        {(["signin", "signup"] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)} className={`flex-1 rounded-md px-3 py-1.5 ${mode === m ? "bg-surface font-medium shadow-sm" : "text-muted"}`}>
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>
      <input className={field} type="email" autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        className={field}
        type="password"
        autoComplete={mode === "signin" ? "current-password" : "new-password"}
        placeholder="Password (min 8 characters)"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={btn.primary} disabled={busy}>
        {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
      </button>
      {msg && <div className="text-sm text-warn">{msg}</div>}
    </form>
  );
}

function Offline() {
  const [p, setP] = useState<OfflineProgress | null>(null);
  const [status, setStatus] = useState<{ version: string; at: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    setStatus(offlineStatus());
    setSupported("serviceWorker" in navigator);
  }, []);
  const running = p?.type === "progress";
  const upToDate = status?.version === BUILD_ID;
  return (
    <div className="space-y-3 text-sm">
      <p className="text-muted">
        Every lesson, quiz, flashcard, widget and spreadsheet is stored on this device so you can study with no connection. Progress made offline syncs automatically when you are back online. The AI tutor
        needs a connection.
      </p>
      <div>
        {status ? (
          <Pill tone={upToDate ? "ok" : "warn"}>{upToDate ? `Available offline · ${new Date(status.at).toLocaleDateString()}` : "Offline copy is from an older version"}</Pill>
        ) : (
          <Pill tone="warn">Not downloaded yet</Pill>
        )}
      </div>
      {running && p?.total ? (
        <div>
          <ProgressBar value={(p.done ?? 0) / p.total} />
          <div className="mt-1 text-xs text-muted">
            {p.done}/{p.total} files
          </div>
        </div>
      ) : null}
      <button
        className={btn.primary}
        disabled={running || !supported}
        onClick={async () => {
          setErr(null);
          setP({ type: "progress", done: 0, total: 1 });
          try {
            await downloadForOffline(setP);
            setStatus(offlineStatus());
          } catch (e) {
            setErr((e as Error).message);
            setP(null);
          }
        }}
      >
        {running ? "Downloading…" : status ? "Refresh offline copy" : "Download for offline"}
      </button>
      {!supported && <div className="text-warn">This browser does not support offline mode.</div>}
      {err && <div className="text-danger">{err}</div>}
      <p className="text-xs text-muted">
        On iPhone: open the site in Safari → Share → Add to Home Screen. On Android: Chrome menu → Install app. Open it once while online so it can finish downloading.
      </p>
    </div>
  );
}

function Plan() {
  const store = useLearner();
  const [s, setS] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (store && !s) setS(store.settings());
  }, [store, s]);
  if (!s) return null;
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => {
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
            await getStore().saveSettings(s);
            setSaved(true);
          }}
        >
          Save settings
        </button>
        {saved && <span className="text-sm text-ok">Saved</span>}
      </div>
    </div>
  );
}

function DataTools() {
  const store = useLearner();
  const [aiOn, setAiOn] = useState<boolean | null>(null);
  useEffect(() => {
    fetch("/api/tutor")
      .then((r) => r.json())
      .then((r) => setAiOn(!!r.available))
      .catch(() => setAiOn(null));
  }, []);
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const exportFile = () => {
    const blob = new Blob([JSON.stringify(getStore().exportData(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `mewre-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <>
      <section className="rounded-xl border border-border bg-surface p-5 text-sm">
        <h2 className="mb-2 font-semibold">Data</h2>
        <ul className="space-y-1 text-muted">
          <li>
            AI tutor: {aiOn === null ? "unknown (offline)" : aiOn ? <span className="text-ok">enabled</span> : <span className="text-warn">off — set ANTHROPIC_API_KEY on the server</span>}
          </li>
          <li>{store ? `${store.allEvents().length} learning events stored on this device` : "Loading…"}</li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className={btn.ghost} onClick={exportFile}>
            Export progress (JSON)
          </button>
          <label className={`${btn.ghost} cursor-pointer`}>
            Import progress
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                try {
                  const r = await getStore().importData(JSON.parse(await f.text()));
                  setMsg(`Imported ${r.events} events and ${r.docs} notes/settings.`);
                } catch (err) {
                  setMsg(`Import failed: ${(err as Error).message}`);
                }
              }}
            />
          </label>
        </div>
        {msg && <div className="mt-2 text-sm text-muted">{msg}</div>}
      </section>
      <section className="rounded-xl border border-danger/40 bg-surface p-5 text-sm">
        <h2 className="mb-2 font-semibold text-danger">Reset all progress</h2>
        <p className="text-muted">Clears attempts, mastery, flashcard schedules and history on every synced device (notes are kept). Export first. Type RESET to confirm.</p>
        <div className="mt-2 flex gap-2">
          <input className="w-32 rounded-lg border border-border bg-bg px-2 py-1.5" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <button
            className={btn.ghost}
            disabled={confirm !== "RESET"}
            onClick={async () => {
              await resetProgress();
              setConfirm("");
              setMsg("Progress reset.");
            }}
          >
            Reset
          </button>
        </div>
      </section>
    </>
  );
}

export function SettingsForm() {
  return (
    <div className="space-y-6">
      <section id="account" className="scroll-mt-20 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 font-semibold">Account & sync</h2>
        <Account />
      </section>
      <section id="offline" className="scroll-mt-20 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 font-semibold">Offline</h2>
        <Offline />
      </section>
      <Plan />
      <DataTools />
    </div>
  );
}
