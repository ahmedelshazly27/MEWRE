"use client";

import { useEffect, useState } from "react";
import type { ContentIndex } from "./content-index";
import type { Lang } from "./i18n";
import { useLang } from "./useLang";

const URL: Record<Lang, string> = { en: "/data/content.json", ar: "/data/content-ar.json" };
const cache: Partial<Record<Lang, ContentIndex>> = {};
const inflight: Partial<Record<Lang, Promise<ContentIndex>>> = {};

export function loadContent(lang: Lang = "en"): Promise<ContentIndex> {
  const hit = cache[lang];
  if (hit) return Promise.resolve(hit);
  if (!inflight[lang])
    inflight[lang] = fetch(URL[lang])
      .then((r) => {
        if (!r.ok) throw new Error(`${URL[lang]} ${r.status}`);
        return r.json() as Promise<ContentIndex>;
      })
      .then((c) => (cache[lang] = c))
      .finally(() => delete inflight[lang]);
  return inflight[lang]!;
}

/** The curriculum index in the page's language (served from the offline cache when there is no network). */
export function useContent(): ContentIndex | null {
  const lang = useLang();
  const [c, setC] = useState<{ lang: Lang; data: ContentIndex } | null>(cache[lang] ? { lang, data: cache[lang]! } : null);
  useEffect(() => {
    if (cache[lang]) setC({ lang, data: cache[lang]! });
    else
      loadContent(lang)
        .then((data) => setC({ lang, data }))
        .catch(() => setC(null));
  }, [lang]);
  return c && c.lang === lang ? c.data : null;
}
