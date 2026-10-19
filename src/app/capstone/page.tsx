import Link from "next/link";
import { getModule } from "@/lib/content";
import { RunHistory } from "@/components/progress";
import { SimulationPlayer } from "@/components/SimulationPlayer";
import { EmptyState, PageHeader } from "@/components/ui";

export const metadata = { title: "Capstone" };

export default function CapstonePage() {
  const m = getModule("m15");
  const sim = m?.simulation;
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
      {sim && <RunHistory kind="sim" refId={sim.id} />}
      {sim ? <SimulationPlayer sim={sim} /> : <EmptyState title="The capstone simulation is being built">Finish the core modules first — it draws on all of them.</EmptyState>}
    </div>
  );
}
