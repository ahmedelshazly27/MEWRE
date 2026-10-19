"use client";

import dynamic from "next/dynamic";
import { Component, type ComponentType, type ReactNode } from "react";
import type { WidgetId } from "@/content/widgets";

type WidgetComponent = ComponentType<{ props?: Record<string, unknown> }>;

function Loading() {
  return (
    <div className="not-prose my-6 flex h-48 w-full animate-pulse items-center justify-center rounded-xl border border-border bg-surface-2 text-sm text-muted">
      Loading interactive…
    </div>
  );
}


/** Each widget is code-split and rendered client-side only. */
const REGISTRY: Record<WidgetId, WidgetComponent> = {
  "iv-curve": dynamic(() => import("./IvCurve"), { ssr: false, loading: Loading }),
  "sun-path": dynamic(() => import("./SunPath"), { ssr: false, loading: Loading }),
  "kuwait-climate": dynamic(() => import("./KuwaitClimate"), { ssr: false, loading: Loading }),
  "power-triangle": dynamic(() => import("./PowerTriangle"), { ssr: false, loading: Loading }),
  "three-phase": dynamic(() => import("./ThreePhase"), { ssr: false, loading: Loading }),
  "load-curve": dynamic(() => import("./LoadCurve"), { ssr: false, loading: Loading }),
  "capacity-factor": dynamic(() => import("./CapacityFactor"), { ssr: false, loading: Loading }),
  "per-unit": dynamic(() => import("./PerUnit"), { ssr: false, loading: Loading }),
  "pv-sld": dynamic(() => import("./PvSld"), { ssr: false, loading: Loading }),
  "substation-sld": dynamic(() => import("./SubstationSld"), { ssr: false, loading: Loading }),
  evm: dynamic(() => import("./Evm"), { ssr: false, loading: Loading }),
  lcoe: dynamic(() => import("./Lcoe"), { ssr: false, loading: Loading }),
  "npv-irr": dynamic(() => import("./NpvIrr"), { ssr: false, loading: Loading }),
  "cpm-gantt": dynamic(() => import("./CpmGantt"), { ssr: false, loading: Loading }),
  "monte-carlo": dynamic(() => import("./MonteCarlo"), { ssr: false, loading: Loading }),
  "risk-allocation": dynamic(() => import("./RiskAllocation"), { ssr: false, loading: Loading }),
  "risk-matrix": dynamic(() => import("./RiskMatrix"), { ssr: false, loading: Loading }),
  weibull: dynamic(() => import("./Weibull"), { ssr: false, loading: Loading }),
  betz: dynamic(() => import("./Betz"), { ssr: false, loading: Loading }),
  "bess-sizing": dynamic(() => import("./BessSizing"), { ssr: false, loading: Loading }),
  soiling: dynamic(() => import("./Soiling"), { ssr: false, loading: Loading }),
  "dc-ac-ratio": dynamic(() => import("./DcAcRatio"), { ssr: false, loading: Loading }),
  droop: dynamic(() => import("./Droop"), { ssr: false, loading: Loading }),
  "loss-waterfall": dynamic(() => import("./LossWaterfall"), { ssr: false, loading: Loading }),
  "p50-p90": dynamic(() => import("./P50P90"), { ssr: false, loading: Loading }),
  "csp-vs-pvbess": dynamic(() => import("./CspVsPvBess"), { ssr: false, loading: Loading }),
  "thermal-storage": dynamic(() => import("./ThermalStorage"), { ssr: false, loading: Loading }),
  "tariff-eval": dynamic(() => import("./TariffEval"), { ssr: false, loading: Loading }),
  "concept-map": dynamic(() => import("./ConceptMap"), { ssr: false, loading: Loading }),
  "institution-map": dynamic(() => import("./InstitutionMap"), { ssr: false, loading: Loading }),
  lifecycle: dynamic(() => import("./Lifecycle"), { ssr: false, loading: Loading }),
  "cashflow-scurve": dynamic(() => import("./CashflowScurve"), { ssr: false, loading: Loading }),
  degradation: dynamic(() => import("./Degradation"), { ssr: false, loading: Loading }),
};

function ErrorBox({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="not-prose my-6 rounded-xl border border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
      {children}
    </div>
  );
}

class WidgetBoundary extends Component<{ id: string; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidUpdate(prev: { id: string }) {
    if (prev.id !== this.props.id && this.state.error) this.setState({ error: null });
  }
  render() {
    if (this.state.error) return <ErrorBox>Interactive “{this.props.id}” failed to render: {this.state.error.message}</ErrorBox>;
    return this.props.children;
  }
}

export function Widget({ id, props }: { id: WidgetId; props?: Record<string, unknown> }) {
  const C = (REGISTRY as Record<string, WidgetComponent | undefined>)[id];
  if (!C) return <ErrorBox>Unknown widget: “{String(id)}”</ErrorBox>;
  return (
    <WidgetBoundary id={id}>
      <C props={props} />
    </WidgetBoundary>
  );
}

export default Widget;
