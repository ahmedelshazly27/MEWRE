"use client";

import { supabase } from "@/lib/store/supabase";

/** fetch() that attaches the Supabase access token (used for the AI endpoints). */
export async function authFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const { data } = await supabase().auth.getSession();
  const headers = new Headers(init.headers);
  if (data.session) headers.set("Authorization", `Bearer ${data.session.access_token}`);
  return fetch(input, { ...init, headers });
}
