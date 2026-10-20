"use client";

import { useT } from "@/lib/useLang";

export function PrintButton() {
  const { t } = useT();
  return (
    <button onClick={() => window.print()} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white dark:text-black">
      {t("Print / save as PDF")}
    </button>
  );
}
