"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { getStore, type LearnerStore } from "./store";
import { SupabaseRemote, supabase } from "./supabase";

const SessionContext = createContext<Session | null>(null);

/** Loads the local store, wires Supabase auth + background sync. Mount once in the root layout. */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const store = getStore();
    void store.load();
    const remote = new SupabaseRemote(null);
    const sb = supabase();
    sb.auth.getSession().then(({ data }) => {
      remote.setSession(data.session);
      setSession(data.session);
      store.setRemote(remote);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, s) => {
      remote.setSession(s);
      setSession(s);
      store.setRemote(remote);
    });
    const kick = () => store.scheduleSync(500);
    const onVis = () => document.visibilityState === "visible" && kick();
    window.addEventListener("online", kick);
    document.addEventListener("visibilitychange", onVis);
    const interval = setInterval(kick, 120_000);
    return () => {
      sub.subscription.unsubscribe();
      window.removeEventListener("online", kick);
      document.removeEventListener("visibilitychange", onVis);
      clearInterval(interval);
    };
  }, []);
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}

/** Re-renders on every store change. Returns null until IndexedDB is loaded (SSR / first paint). */
export function useLearner(): LearnerStore | null {
  const store = getStore();
  const version = useSyncExternalStore(store.subscribe, store.getVersion, () => -1);
  return version >= 0 && store.ready ? store : null;
}
