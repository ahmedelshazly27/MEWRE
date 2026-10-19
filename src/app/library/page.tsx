import { index } from "@/lib/content";
import { getModule } from "@/lib/content";
import { PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Reference library" };

const DOWNLOADS = [
  { file: "lcoe-model.xlsx", title: "LCOE model", note: "Capex, opex, degradation, WACC → LCOE; exact vs CRF shortcut" },
  { file: "project-finance-model.xlsx", title: "Project finance model", note: "30-year CFADS, debt sizing, DSCR, project & equity IRR" },
  { file: "evm-tracker.xlsx", title: "EVM tracker", note: "Monthly PV/EV/AC with CPI, SPI, EAC variants and TCPI" },
  { file: "tariff-bid-evaluation.xlsx", title: "Tariff bid evaluation", note: "Levelized tariff comparison, weighting and sensitivity" },
  { file: "cashflow-forecast.xlsx", title: "Construction cash-flow forecast", note: "Milestones, advance recovery, retention, S-curve by fiscal year" },
];

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
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Practice spreadsheets (Excel, live formulas)</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {DOWNLOADS.map((d) => (
            <a key={d.file} href={`/downloads/${d.file}`} download className="rounded-xl border border-border bg-surface p-3 text-sm hover:bg-surface-2">
              <div className="font-medium">📊 {d.title}</div>
              <div className="text-xs text-muted">{d.note}</div>
            </a>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Guided exercises for each model are in Module 10, lesson 7.</p>
      </section>
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
