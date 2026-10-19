"use client";

import { useEffect, useState } from "react";
import type { ContentIndex } from "./content-index";

let cache: ContentIndex | null = null;
let inflight: Promise<ContentIndex> | null = null;

export function loadContent(): Promise<ContentIndex> {
  if (cache) return Promise.resolve(cache);
  if (!inflight)
    inflight = fetch("/data/content.json")
      .then((r) => {
        if (!r.ok) throw new Error(`content.json ${r.status}`);
        return r.json() as Promise<ContentIndex>;
      })
      .then((c) => (cache = c))
      .finally(() => (inflight = null));
  return inflight;
}

/** The curriculum index (served from the offline cache when there is no network). */
export function useContent(): ContentIndex | null {
  const [c, setC] = useState<ContentIndex | null>(cache);
  useEffect(() => {
    if (!cache) loadContent().then(setC).catch(() => setC(null));
  }, []);
  return c;
}
