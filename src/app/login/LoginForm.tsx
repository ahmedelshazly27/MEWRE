"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/store/supabase";
import { btn } from "@/components/ui";

/** Email + password sign-in. There is no sign-up: the platform is private to allowlisted accounts. */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    setDenied(new URLSearchParams(location.search).get("denied") === "1");
  }, []);

  const next = () => {
    const n = new URLSearchParams(location.search).get("next");
    return n && n.startsWith("/") && !n.startsWith("//") ? n : "/";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase().auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) return setError(error.message);
    // full navigation so the gate sees the new session cookie
    location.replace(next());
  };

  const signOut = async () => {
    await supabase().auth.signOut();
    setDenied(false);
  };

  return (
    <div className="mx-auto mt-10 max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Shazly Academy</h1>
      <p className="mt-1 text-sm text-muted">Private learning platform. Sign in to continue.</p>
      {denied ? (
        <div className="mt-6 rounded-lg border border-danger/40 bg-danger-soft/40 p-3 text-sm">
          This account does not have access.{" "}
          <button className="font-medium text-accent" onClick={signOut}>
            Sign out
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent" />
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent" />
          {error && <div className="text-sm text-danger">{error}</div>}
          <button className={`${btn.primary} w-full`} disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}
