"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLearner, useSession } from "@/lib/store/react";

function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}

/** Small connectivity / sync indicator linking to Settings → Account. */
export function SyncDot({ compact = false }: { compact?: boolean }) {
  const store = useLearner();
  const session = useSession();
  const online = useOnline();
  const st = store?.status;
  let tone = "bg-muted";
  let label = "Saved on this device";
  if (!online) {
    tone = "bg-warn";
    label = "Offline — saving locally";
  } else if (!session) {
    tone = "bg-muted";
    label = "Not syncing — sign in";
  } else if (st?.state === "syncing") {
    tone = "bg-info animate-pulse";
    label = "Syncing…";
  } else if (st?.state === "error") {
    tone = "bg-danger";
    label = "Sync error";
  } else {
    tone = "bg-ok";
    label = st?.pending ? `${st.pending} changes to sync` : "Synced";
  }
  return (
    <Link href="/settings#account" title={label} className={`flex items-center gap-1.5 rounded-lg ${compact ? "p-2" : "px-2 py-1"} text-xs text-muted hover:bg-surface-2`}>
      <span className={`h-2 w-2 rounded-full ${tone}`} />
      {!compact && <span>{label}</span>}
    </Link>
  );
}
