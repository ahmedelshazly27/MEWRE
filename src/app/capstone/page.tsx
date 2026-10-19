import Link from "next/link";
import { getModule } from "@/lib/content";
import { listRuns } from "@/server/repo";
import { SimulationPlayer } from "@/components/SimulationPlayer";
import { EmptyState, PageHeader } from "@/components/ui";

export const metadata = { title: "Capstone" };

export default function CapstonePage() {
  const m = getModule("m15");
  const sim = m?.simulation;
  const runs = sim ? listRuns("sim", sim.id, 5) : [];
  return (
    <div>
      <PageHeader
        title="Capstone: 1 GW PV + BESS for MEWRE"
        subtitle="Run a simulated utility-scale project from tender to COD. Your decisions move cost, schedule, quality, safety and stakeholder trust. The best score feeds 15% of your readiness score."
      >
        {m && !m.draft && (
          <Link href="/learn/m15" className="text-sm text-accent">
            Capstone lessons →
          </Link>
        )}
      </PageHeader>
      {runs.length > 0 && (
        <div className="mb-4 text-sm text-muted">
          Previous runs: {runs.map((r) => `${Math.round((r.score ?? 0) * 100)}%`).join(" · ")}
        </div>
      )}
      {sim ? <SimulationPlayer sim={sim} /> : <EmptyState title="The capstone simulation is being built">Finish the core modules first — it draws on all of them.</EmptyState>}
    </div>
  );
}
