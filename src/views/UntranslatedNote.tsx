import { t } from "@/lib/i18n";

/** Shown on Arabic pages whose module has no translation yet. */
export function UntranslatedNote() {
  return <div className="mb-4 rounded-lg border border-dashed border-warn/60 bg-warn-soft/40 px-3 py-2 text-sm">{t("ar", "This module is not translated yet — showing English.")}</div>;
}
