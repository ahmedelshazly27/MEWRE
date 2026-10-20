"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLearner, useSession } from "@/lib/store/react";
import { useT } from "@/lib/useLang";

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
  const { t, href } = useT();
  const store = useLearner();
  const session = useSession();
  const online = useOnline();
  const st = store?.status;
  let tone = "bg-muted";
  let label = t("Saved on this device");
  if (!online) {
    tone = "bg-warn";
    label = t("Offline — saving locally");
  } else if (!session) {
    tone = "bg-muted";
    label = t("Not syncing — sign in");
  } else if (st?.state === "syncing") {
    tone = "bg-info animate-pulse";
    label = t("Syncing…");
  } else if (st?.state === "error") {
    tone = "bg-danger";
    label = t("Sync error");
  } else {
    tone = "bg-ok";
    label = st?.pending ? t("{n} changes to sync", { n: st.pending }) : t("Synced");
  }
  return (
    <Link href={href("/settings#account")} title={label} className={`flex items-center gap-1.5 rounded-lg ${compact ? "p-2" : "px-2 py-1"} text-xs text-muted hover:bg-surface-2`}>
      <span className={`h-2 w-2 rounded-full ${tone}`} />
      {!compact && <span>{label}</span>}
    </Link>
  );
}
