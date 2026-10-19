import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { FormulaCard } from "@/components/lesson/FormulaCard";
import { PrintButton } from "./PrintButton";

type Params = { params: Promise<{ moduleId: string }> };

export const metadata = { title: "Cheat sheet" };

export default async function PrintPage({ params }: Params) {
  const { moduleId } = await params;
  const m = getModule(moduleId);
  if (!m || m.draft) notFound();
  return (
    <div className="mx-auto max-w-4xl">
      <div className="no-print mb-4 flex items-center justify-between">
        <Link href={`/learn/${m.id}`} className="text-sm text-muted hover:text-text">
          ← Back to module
        </Link>
        <PrintButton />
      </div>
      <h1 className="text-2xl font-semibold">
        M{m.number} · {m.title} — cheat sheet
      </h1>
      <div className="mb-4 text-muted" dir="rtl">
        {m.titleAr}
      </div>
      <Markdown className="prose-lesson text-[0.95rem]">{m.cheatSheet}</Markdown>
      {m.formulas.length > 0 && (
        <>
          <h2 className="mt-8 text-xl font-semibold">Formulas</h2>
          <div className="grid gap-x-4 sm:grid-cols-2">
            {m.formulas.map((f) => (
              <FormulaCard key={f.id} formula={f} compact />
            ))}
          </div>
        </>
      )}
      {m.glossary.length > 0 && (
        <>
          <h2 className="mt-8 text-xl font-semibold">Key terms</h2>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {m.glossary.map((g) => (
                <tr key={g.id} className="border-b border-border align-top">
                  <td className="py-1 pr-3 font-medium">{g.en}</td>
                  <td className="py-1 pr-3 text-right" dir="rtl">
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
