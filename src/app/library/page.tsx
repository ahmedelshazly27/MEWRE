import { index } from "@/lib/content";
import { getModule } from "@/lib/content";
import { PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Reference library" };

const TYPE_LABEL: Record<string, string> = {
  standard: "Standards",
  government: "Kuwaiti & government sources",
  report: "Reports (IRENA, IEA, NREL…)",
  guide: "Guides & contracts",
  academic: "Academic",
  dataset: "Datasets & tools",
  tool: "Datasets & tools",
  news: "News & industry press",
};

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const sp = await searchParams;
  const refs = [...index().references.values()];
  const groups = new Map<string, typeof refs>();
  for (const r of refs) {
    const k = TYPE_LABEL[r.type] ?? "Other";
    if (sp.type && k !== sp.type) continue;
    groups.set(k, [...(groups.get(k) ?? []), r]);
  }
  const order = Object.values(TYPE_LABEL).filter((v, i, a) => a.indexOf(v) === i);
  return (
    <div>
      <PageHeader
        title="Reference library"
        subtitle={`${refs.length} primary sources cited across the curriculum. Items marked unverified support claims that could not be fully confirmed — check them before quoting.`}
      />
      {order
        .filter((k) => groups.has(k))
        .map((k) => (
          <section key={k} className="mb-8">
            <h2 className="mb-2 text-lg font-semibold">{k}</h2>
            <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
              {groups
                .get(k)!
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((r) => (
                  <li key={r.id} className="p-3 text-sm">
                    <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline">
                      {r.title}
                    </a>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                      <span>
                        {r.publisher} · {r.date}
                      </span>
                      <Pill>M{getModule(r.moduleId)?.number}</Pill>
                      {r.unverified && <Pill tone="warn">unverified</Pill>}
                    </div>
                    {r.note && <div className="mt-1 text-xs text-muted">{r.note}</div>}
                  </li>
                ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
