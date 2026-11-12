"use client";

import { useEffect, useState } from "react";
import { BUILD_ID, downloadForOffline, offlineStatus, type OfflineProgress, type OfflineScope, type OfflineStatus } from "@/components/ServiceWorker";
import { useT } from "@/lib/useLang";
import { btn, Pill, ProgressBar } from "@/components/ui";

/** Offline download controls: the small trial copy or everything. Used in Settings and on the trial page. */
export function OfflinePanel({ compact = false }: { compact?: boolean }) {
  const { t } = useT();
  const [p, setP] = useState<OfflineProgress | null>(null);
  const [status, setStatus] = useState<OfflineStatus | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const [online, setOnline] = useState(true);
  useEffect(() => {
    setStatus(offlineStatus());
    setSupported("serviceWorker" in navigator);
    setOnline(navigator.onLine);
  }, []);
  const running = p?.type === "progress";
  const upToDate = status?.version === BUILD_ID;

  async function start(scope: OfflineScope) {
    setErr(null);
    setP({ type: "progress", done: 0, total: 1 });
    try {
      await downloadForOffline(setP, scope);
      setStatus(offlineStatus());
      setP(null);
    } catch (e) {
      setErr((e as Error).message);
      setP(null);
    }
  }

  return (
    <div className="space-y-3 text-sm">
      {!compact && (
        <p className="text-muted">
          {t("Lessons, explainers, quizzes, flashcards and widgets are stored on this device so you can study with no connection. Progress made offline syncs automatically when you are back online. The AI tutor and AI grading need a connection.")}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {status ? (
          <Pill tone={upToDate ? "ok" : "warn"}>
            {upToDate
              ? t("Available offline ({s}) · {d}", { s: status.scope === "all" ? t("everything") : t("MEWRE and trial week"), d: new Date(status.at).toLocaleDateString() })
              : t("Offline copy is from an older version: refresh it")}
          </Pill>
        ) : (
          <Pill tone="warn">{t("Not downloaded yet")}</Pill>
        )}
      </div>
      {running && p?.total ? (
        <div>
          <ProgressBar value={(p.done ?? 0) / p.total} />
          <div className="mt-1 text-xs text-muted">
            {t("{d}/{n} files. Keep this page open until it finishes.", { d: p.done ?? 0, n: p.total })}
          </div>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button className={btn.primary} disabled={running || !supported || !online} onClick={() => void start("trial")}>
          {running ? t("Downloading…") : t("Download MEWRE and trial week (about 60 MB)")}
        </button>
        <button className={btn.ghost} disabled={running || !supported || !online} onClick={() => void start("all")}>
          {t("Download everything (about 270 MB)")}
        </button>
      </div>
      {!supported && <div className="text-warn">{t("This browser does not support offline mode.")}</div>}
      {!online && <div className="text-warn">{t("You are offline. Connect to download.")}</div>}
      {err && <div className="text-danger">{err}</div>}
      <ol className="ms-5 list-decimal space-y-0.5 text-xs text-muted">
        <li>{t("Before the flight, on Wi-Fi: sign in, then press the download button and wait for it to finish.")}</li>
        <li>{t("Phone: install the app first (iPhone: Safari → Share → Add to Home Screen; Android: Chrome menu → Install app) and download from inside it.")}</li>
        <li>{t("Test it: switch on airplane mode and open a trial explainer. If it opens, you are ready.")}</li>
      </ol>
    </div>
  );
}
