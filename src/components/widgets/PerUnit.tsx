"use client";

import { useState } from "react";
import { baseImpedance, baseCurrent, changeBase, faultMva } from "@/lib/calc/power";
import { Card, NumField, Stat, Stats, Hint, fmt, type WidgetProps } from "./ui";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 space-y-2 rounded-lg border border-border p-3">
      <h4 className="text-sm font-semibold">{title}</h4>
      {children}
    </div>
  );
}

export default function PerUnit(_: WidgetProps) {
  const [mva, setMva] = useState(100);
  const [kv, setKv] = useState(132);
  const [ohms, setOhms] = useState(10);
  const zb = baseImpedance(kv, mva);
  const ib = baseCurrent(mva, kv);

  // change of base: transformer 12.5 % on 180 MVA → system base
  const [zOld, setZOld] = useState(12.5);
  const [mvaOld, setMvaOld] = useState(180);
  const [kvOld, setKvOld] = useState(132);
  const zNew = changeBase(zOld / 100, mvaOld, kvOld, mva, kv);

  return (
    <Card title="Per-unit converter" subtitle="Choose a system base (MVA, kV); everything else follows">
      <div className="grid min-w-0 gap-3 sm:grid-cols-3">
        <Section title="1 · System base">
          <NumField label="Base power" value={mva} onChange={(v) => setMva(Math.max(0.001, v))} unit="MVA" />
          <NumField label="Base voltage (L-L)" value={kv} onChange={(v) => setKv(Math.max(0.001, v))} unit="kV" />
          <Stats cols={2}>
            <Stat label="Z base = kV²/MVA" value={fmt(zb, 4)} unit="Ω" tone="accent" />
            <Stat label="I base = MVA/(√3·kV)" value={fmt(ib, 4)} unit="A" tone="accent" />
          </Stats>
        </Section>
        <Section title="2 · Ohms ↔ per unit">
          <NumField label="Impedance" value={ohms} onChange={setOhms} unit="Ω" />
          <NumField label="Per unit" value={Number((ohms / zb).toPrecision(5))} onChange={(v) => setOhms(v * zb)} unit="pu" />
          <Stats cols={2}>
            <Stat label="Z (pu)" value={fmt(ohms / zb, 4)} unit="pu" />
            <Stat label="Z (%)" value={fmt((100 * ohms) / zb, 4)} unit="%" />
          </Stats>
        </Section>
        <Section title="3 · Change of base">
          <NumField label="Nameplate Z" value={zOld} onChange={setZOld} unit="%" />
          <NumField label="on rating" value={mvaOld} onChange={(v) => setMvaOld(Math.max(0.001, v))} unit="MVA" />
          <NumField label="at voltage" value={kvOld} onChange={(v) => setKvOld(Math.max(0.001, v))} unit="kV" />
          <Stats cols={2}>
            <Stat label="Z on system base" value={fmt(zNew * 100, 4)} unit="%" tone="accent" />
            <Stat label="Fault level behind Z" value={fmt(faultMva(mva, zNew), 3)} unit="MVA" note="infinite bus behind" />
          </Stats>
        </Section>
      </div>
      <Hint>
        What to notice: Z_new = Z_old·(MVA_new/MVA_old)·(kV_old/kV_new)². A 12.5 % transformer on its own 180 MVA rating is only ~6.9 % on a
        100 MVA base. Per-unit values stay similar across voltage levels, which is why grid studies and nameplates use them — always check
        which base a number is quoted on.
      </Hint>
    </Card>
  );
}
