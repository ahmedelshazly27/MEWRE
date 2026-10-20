"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { langFromPath, lp, t, type Lang } from "./i18n";

export const LANG_KEY = "mewre-lang";

export function useLang(): Lang {
  return langFromPath(usePathname());
}

/** Translator + link prefixer bound to the current page language. */
export function useT() {
  const lang = useLang();
  const tr = useCallback((key: string, vars?: Record<string, string | number>) => t(lang, key, vars), [lang]);
  const href = useCallback((path: string) => lp(lang, path), [lang]);
  return { lang, t: tr, href };
}

export function storedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "ar" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}
