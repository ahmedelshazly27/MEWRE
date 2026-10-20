import Link from "next/link";
import { getModule } from "@/lib/content";
import { fwd, lp, t, type Lang } from "@/lib/i18n";
import { RunHistory } from "@/components/progress";
import { SimulationPlayer } from "@/components/SimulationPlayer";
import { EmptyState, PageHeader } from "@/components/ui";

export function CapstoneView({ lang }: { lang: Lang }) {
  const m = getModule("m15", lang);
  const sim = m?.simulation;
  return (
    <div>
      <PageHeader
        title={t(lang, "Capstone: 1 GW PV + BESS for MEWRE")}
        subtitle={t(lang, "Run a simulated utility-scale project from tender to COD. Your decisions move cost, schedule, quality, safety and stakeholder trust. The best score feeds 15% of your readiness score.")}
      >
        {m && !m.draft && (
          <Link href={lp(lang, "/learn/m15")} className="text-sm text-accent">
            {t(lang, "Capstone lessons")} {fwd(lang)}
          </Link>
        )}
      </PageHeader>
      {sim && <RunHistory kind="sim" refId={sim.id} />}
      {sim ? (
        <SimulationPlayer sim={sim} />
      ) : (
        <EmptyState title={t(lang, "The capstone simulation is being built")}>{t(lang, "Finish the core modules first — it draws on all of them.")}</EmptyState>
      )}
    </div>
  );
}
