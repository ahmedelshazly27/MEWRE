"use client";

import { useEffect } from "react";

export const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID || "dev";
const AUTO_KEY = "mewre-offline-version";

export type OfflineProgress = { type: "progress" | "done" | "error"; done?: number; total?: number; message?: string; version?: string; at?: number };

/** Ask the service worker to download every page and asset. */
export async function downloadForOffline(onProgress?: (p: OfflineProgress) => void): Promise<void> {
  if (!("serviceWorker" in navigator)) throw new Error("This browser does not support offline mode.");
  const reg = await navigator.serviceWorker.ready;
  const sw = reg.active;
  if (!sw) throw new Error("Service worker not active yet — reload and try again.");
  await new Promise<void>((resolve, reject) => {
    const ch = new MessageChannel();
    ch.port1.onmessage = (e: MessageEvent<OfflineProgress>) => {
      onProgress?.(e.data);
      if (e.data.type === "done") {
        try {
          localStorage.setItem(AUTO_KEY, JSON.stringify({ version: BUILD_ID, at: Date.now() }));
        } catch {}
        resolve();
      }
      if (e.data.type === "error") reject(new Error(e.data.message));
    };
    sw.postMessage({ type: "precache-all" }, [ch.port2]);
  });
}

export function offlineStatus(): { version: string; at: number } | null {
  try {
    return JSON.parse(localStorage.getItem(AUTO_KEY) || "null");
  } catch {
    return null;
  }
}

/** Registers the service worker (production only) and refreshes the offline copy after each deploy. */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register(`/sw.js?v=${BUILD_ID}`, { scope: "/", updateViaCache: "none" })
      .then(async () => {
        await navigator.serviceWorker.ready;
        const st = offlineStatus();
        // First install, or a new deploy: refresh the offline copy in the background when online.
        if (navigator.onLine && st?.version !== BUILD_ID) {
          const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as Window).requestIdleCallback(cb) : setTimeout(cb, 3000));
          idle(() => void downloadForOffline().catch(() => undefined));
        }
      })
      .catch(() => undefined);
  }, []);
  return null;
}
