"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { storeLang, useT } from "@/lib/useLang";
import { switchPath, type Lang } from "@/lib/i18n";
import { useLearner, useSession } from "@/lib/store/react";
import { getStore } from "@/lib/store/store";
import { supabase } from "@/lib/store/supabase";
import { resetProgress } from "@/lib/store/actions";
import type { Settings } from "@/lib/store/derive";
import { BUILD_ID, downloadForOffline, offlineStatus, type OfflineProgress } from "@/components/ServiceWorker";
import { btn, Pill, ProgressBar } from "@/components/ui";

const field = "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm";

function Account() {
  const { t } = useT();
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
    if (mode === "signup" && !data.session) setMsg(t("Check your email to confirm the account, then sign in here."));
    setPassword("");
  }

  if (session) {
    return (
      <div className="space-y-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            {t("Signed in as")} <strong>{session.user.email}</strong>
          </span>
          <Pill tone={st?.state === "error" ? "danger" : st?.state === "syncing" ? "info" : "ok"}>{st?.state === "idle" ? t("Synced") : st?.state ? t(st.state) : null}</Pill>
        </div>
        <div className="text-muted">
          {st?.lastSyncAt ? t("Last sync {d}", { d: new Date(st.lastSyncAt).toLocaleString() }) : t("Not synced yet")}
          {st?.pending ? t(" · {n} local changes waiting", { n: st.pending }) : ""}
          {st?.message ? ` · ${st.message}` : ""}
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={btn.primary} onClick={() => void getStore().syncNow()}>
            {t("Sync now")}
          </button>
          <button
            className={btn.ghost}
            onClick={async () => {
              await getStore().syncNow();
              await supabase().auth.signOut();
            }}
          >
            {t("Sign out (keep data on this device)")}
          </button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="space-y-3 text-sm">
      <p className="text-muted">
        {t("Sign in to sync progress between your phone and laptop. Without an account everything still works and stays on this device. Your progress so far is uploaded when you first sign in.")}
      </p>
      <div className="flex gap-1 rounded-lg bg-surface-2 p-1">
        {(["signin", "signup"] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)} className={`flex-1 rounded-md px-3 py-1.5 ${mode === m ? "bg-surface font-medium shadow-sm" : "text-muted"}`}>
            {m === "signin" ? t("Sign in") : t("Create account")}
          </button>
        ))}
      </div>
      <input className={field} type="email" autoComplete="email" placeholder={t("Email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        className={field}
        type="password"
        autoComplete={mode === "signin" ? "current-password" : "new-password"}
        placeholder={t("Password (min 8 characters)")}
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={btn.primary} disabled={busy}>
        {busy ? "…" : mode === "signin" ? t("Sign in") : t("Create account")}
      </button>
      {msg && <div className="text-sm text-warn">{msg}</div>}
    </form>
  );
}

function Offline() {
  const { t } = useT();
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
        {t("Every lesson, quiz, flashcard, widget and spreadsheet is stored on this device so you can study with no connection. Progress made offline syncs automatically when you are back online. The AI tutor needs a connection.")}
      </p>
      <div>
        {status ? (
          <Pill tone={upToDate ? "ok" : "warn"}>{upToDate ? t("Available offline · {d}", { d: new Date(status.at).toLocaleDateString() }) : t("Offline copy is from an older version")}</Pill>
        ) : (
          <Pill tone="warn">{t("Not downloaded yet")}</Pill>
        )}
      </div>
      {running && p?.total ? (
        <div>
          <ProgressBar value={(p.done ?? 0) / p.total} />
          <div className="mt-1 text-xs text-muted">
            {t("{d}/{n} files", { d: p.done ?? 0, n: p.total })}
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
        {running ? t("Downloading…") : status ? t("Refresh offline copy") : t("Download for offline")}
      </button>
      {!supported && <div className="text-warn">{t("This browser does not support offline mode.")}</div>}
      {err && <div className="text-danger">{err}</div>}
      <p className="text-xs text-muted">
        {t("On iPhone: open the site in Safari → Share → Add to Home Screen. On Android: Chrome menu → Install app. Open it once while online so it can finish downloading.")}
      </p>
    </div>
  );
}

function Plan() {
  const { t } = useT();
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
        <h2 className="mb-3 font-semibold">{t("Study plan")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            {t("Your name (optional)")}
            <input className={field} value={s.name} onChange={(e) => set("name", e.target.value)} />
          </label>
          <label className="text-sm">
            {t("Hours per week")}
            <input type="number" min={1} max={60} className={field} value={s.weeklyHours} onChange={(e) => set("weeklyHours", Number(e.target.value))} />
          </label>
          <label className="text-sm">
            {t("Weeks available")}
            <input type="number" min={1} max={104} className={field} value={s.weeks} onChange={(e) => set("weeks", Number(e.target.value))} />
          </label>
          <label className="text-sm">
            {t("Plan start date")}
            <input type="date" className={field} value={s.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </label>
          <label className="text-sm">
            {t("Job start date (optional)")}
            <input type="date" className={field} value={s.jobStartDate} onChange={(e) => set("jobStartDate", e.target.value)} />
          </label>
        </div>
      </section>
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 font-semibold">{t("Spaced repetition")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            {t("New cards per day")}
            <input type="number" min={0} max={200} className={field} value={s.newCardsPerDay} onChange={(e) => set("newCardsPerDay", Number(e.target.value))} />
          </label>
          <label className="text-sm">
            {t("Target retention ({n}%)", { n: Math.round(s.retention * 100) })}
            <input type="range" min={0.8} max={0.97} step={0.01} className="w-full" value={s.retention} onChange={(e) => set("retention", Number(e.target.value))} />
            <span className="text-xs text-muted">{t("Higher = more reviews, fewer lapses. 90% is the FSRS default.")}</span>
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
          {t("Save settings")}
        </button>
        {saved && <span className="text-sm text-ok">{t("Saved")}</span>}
      </div>
    </div>
  );
}

function DataTools() {
  const { t } = useT();
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
        <h2 className="mb-2 font-semibold">{t("Data")}</h2>
        <ul className="space-y-1 text-muted">
          <li>
            {t("AI tutor")}:{" "}
            {aiOn === null ? t("unknown (offline)") : aiOn ? <span className="text-ok">{t("enabled")}</span> : <span className="text-warn">{t("off — set ANTHROPIC_API_KEY on the server")}</span>}
          </li>
          <li>{store ? t("{n} learning events stored on this device", { n: store.allEvents().length }) : t("Loading…")}</li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className={btn.ghost} onClick={exportFile}>
            {t("Export progress (JSON)")}
          </button>
          <label className={`${btn.ghost} cursor-pointer`}>
            {t("Import progress")}
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                try {
                  const r = await getStore().importData(JSON.parse(await f.text()));
                  setMsg(t("Imported {e} events and {d} notes/settings.", { e: r.events, d: r.docs }));
                } catch (err) {
                  setMsg(t("Import failed: {m}", { m: (err as Error).message }));
                }
              }}
            />
          </label>
        </div>
        {msg && <div className="mt-2 text-sm text-muted">{msg}</div>}
      </section>
      <section className="rounded-xl border border-danger/40 bg-surface p-5 text-sm">
        <h2 className="mb-2 font-semibold text-danger">{t("Reset all progress")}</h2>
        <p className="text-muted">{t("Clears attempts, mastery, flashcard schedules and history on every synced device (notes are kept). Export first. Type RESET to confirm.")}</p>
        <div className="mt-2 flex gap-2">
          <input className="w-32 rounded-lg border border-border bg-bg px-2 py-1.5" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <button
            className={btn.ghost}
            disabled={confirm !== "RESET"}
            onClick={async () => {
              await resetProgress();
              setConfirm("");
              setMsg(t("Progress reset."));
            }}
          >
            {t("Reset")}
          </button>
        </div>
      </section>
    </>
  );
}

function LanguagePicker() {
  const { lang, t } = useT();
  const pathname = usePathname();
  const router = useRouter();
  const pick = (to: Lang) => {
    storeLang(to);
    if (to !== lang) router.push(switchPath(pathname, to));
  };
  return (
    <div className="space-y-3 text-sm">
      <div className="flex gap-1 rounded-lg bg-surface-2 p-1">
        {(["en", "ar"] as const).map((l) => (
          <button key={l} type="button" onClick={() => pick(l)} className={`flex-1 rounded-md px-3 py-1.5 ${lang === l ? "bg-surface font-medium shadow-sm" : "text-muted"}`}>
            {l === "en" ? "English" : "العربية"}
          </button>
        ))}
      </div>
      <p className="text-muted">
        {t("Arabic mode translates lessons, quizzes, flashcards and the interface, with the English term in parentheses on first use so you learn both.")}{" "}
        {t("Arabic content falls back to English where a module is not translated yet.")}
      </p>
    </div>
  );
}

export function SettingsForm() {
  const { t } = useT();
  return (
    <div className="space-y-6">
      <section id="language" className="scroll-mt-20 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 font-semibold">{t("Language")}</h2>
        <LanguagePicker />
      </section>
      <section id="account" className="scroll-mt-20 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 font-semibold">{t("Account & sync")}</h2>
        <Account />
      </section>
      <section id="offline" className="scroll-mt-20 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 font-semibold">{t("Offline")}</h2>
        <Offline />
      </section>
      <Plan />
      <DataTools />
    </div>
  );
}
