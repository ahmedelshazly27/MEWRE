import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule, isTranslated } from "@/lib/content";
import { back, lp, t, type Lang } from "@/lib/i18n";
import { Markdown } from "@/components/Markdown";
import { FormulaCard } from "@/components/lesson/FormulaCard";
import { PrintButton } from "@/app/print/[moduleId]/PrintButton";
import { UntranslatedNote } from "./UntranslatedNote";

export function PrintView({ moduleId, lang }: { moduleId: string; lang: Lang }) {
  const m = getModule(moduleId, lang);
  if (!m || m.draft) notFound();
  return (
    <div className="mx-auto max-w-4xl">
      <div className="no-print mb-4 flex items-center justify-between">
        <Link href={lp(lang, `/learn/${m.id}`)} className="text-sm text-muted hover:text-text">
          {back(lang)} {t(lang, "Back to module")}
        </Link>
        <PrintButton />
      </div>
      {lang === "ar" && !isTranslated(m.id) && <UntranslatedNote />}
      <h1 className="text-2xl font-semibold">{t(lang, "{title} — cheat sheet", { title: `M${m.number} · ${m.title}` })}</h1>
      {lang === "en" && (
        <div className="mb-4 text-muted" dir="rtl">
          {m.titleAr}
        </div>
      )}
      <Markdown className="prose-lesson cheat-sheet mt-4 text-[0.95rem]">{m.cheatSheet}</Markdown>
      {m.formulas.length > 0 && (
        <>
          <h2 className="mt-8 text-xl font-semibold">{t(lang, "Formulas")}</h2>
          <div className="grid gap-x-4 sm:grid-cols-2">
            {m.formulas.map((f) => (
              <FormulaCard key={f.id} formula={f} compact lang={lang} />
            ))}
          </div>
        </>
      )}
      {m.glossary.length > 0 && (
        <>
          <h2 className="mt-8 text-xl font-semibold">{t(lang, "Key terms")}</h2>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {m.glossary.map((g) => (
                <tr key={g.id} className="border-b border-border align-top">
                  <td className="py-1 pe-3 font-medium" dir="ltr">
                    {g.en}
                  </td>
                  <td className="py-1 pe-3 text-end" dir="rtl">
                    {g.ar}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
