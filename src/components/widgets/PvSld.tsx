"use client";

import { useState } from "react";
import { Card, InfoPanel, Hint, type WidgetProps } from "./ui";
import { Breaker, Disconnector, Transformer, CT, VT, Inverter, Module, Fuse, Wire, Bus, Label, Hot, InfoBody, type ComponentInfo } from "./sld";

const INFO: Record<string, ComponentInfo> = {
  module: {
    title: "PV module",
    role: "Converts sunlight to DC electricity. Utility plants use large-format bifacial mono-crystalline modules (TOPCon/PERC/HJT) on single-axis trackers.",
    rating: "≈ 550–620 Wp each, ~2 million modules for ~1.25 GWp DC (DC/AC ≈ 1.2–1.3); temperature coefficient ≈ −0.29 to −0.35 %/K.",
    checks: [
      "Factory audit, independent flash-test and EL sampling against the datasheet (PAN file).",
      "Warranty terms: product 12–15 y, linear power 30 y; bankable manufacturer (Tier 1 list is not a quality guarantee).",
      "Hot-climate qualification: IEC 61215/61730 plus extended damp-heat/thermal-cycling and sand/dust abrasion evidence.",
    ],
  },
  string: {
    title: "String",
    role: "Modules connected in series to build voltage up to the system DC limit; strings are paralleled at combiner or inverter.",
    rating: "≈ 26–30 modules per string at 1500 Vdc maximum; string current ≈ 13–14 A (Isc), more with bifacial gain.",
    checks: [
      "String sizing: Voc at the coldest recorded site temperature must stay below 1500 V (and inverter max input).",
      "Commissioning: polarity, insulation resistance and I-V curve tracing of every string.",
      "DC cable rated for UV and high conductor temperature; connector brand matching (no cross-mating).",
    ],
  },
  combiner: {
    title: "DC combiner box",
    role: "Parallels many strings, protects each with fuses, adds surge protection and a DC isolating switch before the inverter.",
    rating: "16–32 string inputs, gPV fuses ~20–30 A, Type II DC SPD, IP65 enclosure, ≥ 1500 Vdc. (String-inverter designs omit it.)",
    checks: [
      "Enclosure temperature derating at 50 °C ambient plus solar gain — shade/ventilation.",
      "Fuse rating vs module reverse-current rating; SPD coordination; labelling and lock-out.",
      "Torque checks and thermography during commissioning and O&M.",
    ],
  },
  inverter: {
    title: "Central inverter skid",
    role: "Converts DC to grid-synchronous AC, performs MPPT, and supplies reactive power and fault ride-through required by the grid code.",
    rating: "≈ 3–4.4 MVA per inverter at ~600–800 V AC output, 1500 Vdc input; ~250–300 units for 1 GW; output derates above ~40–50 °C.",
    checks: [
      "Derating curve at Kuwait ambient (50 °C) and altitude — rated MVA at site conditions, not at 25 °C.",
      "Grid-code compliance proven with validated simulation models (LVRT/HVRT, Q capability, frequency response).",
      "Dust filtration/cooling design, spare-parts stock and OEM service agreement.",
    ],
  },
  mvTx: {
    title: "MV step-up transformer (0.8/33 kV)",
    role: "Steps inverter output up to the medium-voltage collection level, usually integrated in the inverter skid.",
    rating: "≈ 3.5–9 MVA (single or double LV winding), oil-immersed ONAN, typically Dy11 or Dy11y11, 0.8/33 kV.",
    checks: [
      "Temperature-rise design corrected for 50 °C ambient (IEC 60076-2) — standard designs assume 40 °C.",
      "Loss evaluation (capitalised no-load and load losses) in the bid evaluation.",
      "Routine FAT witness, oil containment and fire separation in the skid layout.",
    ],
  },
  rmu: {
    title: "Ring main unit / MV switchgear",
    role: "Switches and protects each transformer and allows feeders to be looped (in/out) along the collector circuit.",
    rating: "33 kV, ~630 A, ~20–25 kA short-time rating; SF6 or SF6-free; transformer protection by relay or fuses.",
    checks: [
      "Internal arc classification (IAC) and mechanical interlocks for operator safety.",
      "Protection settings coordinated with the collector feeder breaker.",
      "SF6 handling/monitoring plan (or justify SF6-free choice).",
    ],
  },
  collector: {
    title: "33 kV collector cable",
    role: "Carries power from groups of inverter skids to the collector substation; plants use many radial feeders.",
    rating: "33 kV XLPE aluminium cables (≈ 240–800 mm²); each feeder ~20–30 MW, so ~35–50 feeders for 1 GW.",
    checks: [
      "Ampacity derating for hot, dry desert soil (high thermal resistivity) and burial depth; get site thermal-resistivity tests.",
      "Cable losses (often 1–1.5 % of energy) — optimise conductor size vs cost.",
      "Joint/termination QA, after-laying sheath and VLF/tan δ tests.",
    ],
  },
  mvBus: {
    title: "33 kV collector switchgear",
    role: "Collects all feeders on busbars with a circuit breaker per feeder; sections feed separate grid transformers.",
    rating: "Indoor 33 kV AIS/GIS, busbars ~2500–4000 A, ~25–31.5 kA; feeder overcurrent and earth-fault protection.",
    checks: [
      "Short-circuit and protection-coordination studies; earth-fault method (resistance/earthing transformer).",
      "Switchgear building HVAC sized for Kuwait summer — a failed AC unit trips the plant.",
      "Arc-flash study and safe operating procedures.",
    ],
  },
  gridTx: {
    title: "Grid (power) transformer 33/132 or 33/400 kV",
    role: "Steps collector voltage up to transmission voltage at the plant substation.",
    rating: "≈ 4–5 units of 250–350 MVA for 1 GW, ONAN/ONAF, on-load tap changer; YNd vector group common.",
    checks: [
      "Longest lead item (often 12–24 months): order early, track FAT slots and transport route.",
      "FAT incl. temperature-rise and lightning-impulse tests; ambient design 50 °C.",
      "Firewalls, oil pits, N-1 philosophy agreed with MEWRE.",
    ],
  },
  hvBreaker: {
    title: "HV circuit breaker",
    role: "Interrupts load and fault current at transmission voltage; tripped by protection relays.",
    rating: "400 kV (or 132 kV) SF6 live-tank or GIS breaker, ~3150–4000 A, ~50–63 kA.",
    checks: [
      "Compliance with the utility (MEWRE) specification and approved-vendor list.",
      "Protection and interlocking interface with the grid substation.",
      "SAT witness, timing tests and spares.",
    ],
  },
  metering: {
    title: "Revenue metering (CT/VT)",
    role: "Measures energy exported for PPA invoicing at the point of connection; main and check meters.",
    rating: "Metering-class CTs/VTs (e.g. 0.2S/0.2) with dedicated cores; meters to the offtaker's specification.",
    checks: [
      "Meter location and accuracy class per PPA and grid code; sealing and witness testing by the offtaker.",
      "Losses between meter and contract delivery point (adjustment factors).",
      "Data link to the national control centre and settlement system.",
    ],
  },
  grid: {
    title: "Grid connection",
    role: "Overhead line or cable from the plant substation to the transmission substation — the physical interface with MEWRE's network.",
    rating: "400 kV or 132 kV double-circuit OHL/cable; boundary defined in the PPA and connection agreement.",
    checks: [
      "Interface matrix: who builds, owns and energises each item; often the critical path to COD.",
      "Grid-code compliance testing and energisation programme agreed with the control centre.",
      "Deemed-energy/delay remedies if the utility's works are late.",
    ],
  },
  ppc: {
    title: "Power plant controller & SCADA",
    role: "Closed-loop controller that makes hundreds of inverters behave as one plant at the point of connection (P, Q/V, frequency response, ramp limits).",
    rating: "One PPC per connection point with redundant servers; response times per grid code (seconds).",
    checks: [
      "Control performance tests at commissioning (step responses, ramp-rate and curtailment).",
      "Cybersecurity (IEC 62443) and secure links to the national control centre.",
      "Data availability for performance-ratio guarantees.",
    ],
  },
};

const ROWS = [120, 170, 220];
const COLS = [24, 40, 56, 72];

export default function PvSld(_: WidgetProps) {
  const [sel, setSel] = useState<string | null>(null);
  const info = sel ? INFO[sel] : null;
  const hot = (id: string, x: number, y: number, w: number, h: number) => (
    <Hot id={id} x={x} y={y} w={w} h={h} selected={sel === id} onSelect={setSel} title={INFO[id].title} />
  );

  return (
    <Card title="Utility PV plant — single-line diagram" subtitle="Click a component for its role, typical rating in a 1 GW Kuwait plant and PM checks">
      <div className="grid min-w-0 gap-4">
        <div className="min-w-0">
          <div className="overflow-x-auto">
          <svg viewBox="0 0 800 270" className="h-auto w-full min-w-[640px]" role="group" aria-label="PV plant single-line diagram">
            {/* PPC */}
            <rect x={300} y={22} width={160} height={34} rx={6} fill="var(--surface-2)" stroke="var(--border)" />
            <Label x={380} y={43} muted={false}>Power plant controller / SCADA</Label>
            <Wire d="M330 56 V96 H222 V150" dashed />
            <Wire d="M460 39 H690 V158" dashed />

            {/* modules and strings */}
            {ROWS.map((y) => (
              <g key={y}>
                {COLS.map((x) => (
                  <Module key={x} x={x} y={y} />
                ))}
                <Wire d={`M78 ${y} H95 L115 ${150 + (y - 120) / 2.5}`} />
              </g>
            ))}
            <Label x={48} y={102}>PV modules</Label>
            <Label x={48} y={250}>Strings (~28 in series)</Label>

            {/* combiner */}
            <rect x={115} y={140} width={40} height={60} rx={3} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.4} />
            {[150, 170, 190].map((y) => (
              <g key={y}>
                <Wire d={`M115 ${y} H121`} />
                <Fuse x={127} y={y} rot={-90} />
                <Wire d={`M131 ${y} H143`} />
              </g>
            ))}
            <line x1={143} y1={148} x2={143} y2={192} stroke="var(--text)" strokeWidth={2.5} />
            <Wire d="M143 170 H202" />
            <Label x={135} y={215}>DC combiner</Label>
            <Label x={178} y={162}>1500 Vdc</Label>

            {/* inverter */}
            <Inverter x={222} y={170} />
            <Label x={222} y={208}>Inverter</Label>
            <Wire d="M242 170 H280" />
            <Label x={262} y={162}>800 V</Label>

            {/* MV transformer */}
            <Transformer x={308} y={170} rot={-90} />
            <Label x={308} y={205}>0.8/33 kV</Label>

            {/* RMU */}
            <rect x={348} y={150} width={50} height={40} rx={3} fill="none" stroke="var(--text)" strokeWidth={1.2} strokeDasharray="3 2" />
            <Wire d="M336 170 H361" />
            <Breaker x={375} y={170} rot={-90} />
            <Wire d="M389 170 H492" />
            <Label x={373} y={205}>RMU</Label>
            <Label x={445} y={162}>33 kV cable</Label>

            {/* other feeders */}
            {[110, 230].map((y) => (
              <g key={y}>
                <Wire d={`M425 ${y} H492`} />
                <Breaker x={506} y={y} rot={-90} />
                <Wire d={`M520 ${y} H530`} />
                <Label x={423} y={y + 3} anchor="end">other blocks</Label>
              </g>
            ))}
            <Breaker x={506} y={170} rot={-90} />
            <Wire d="M520 170 H530" />
            <Bus x1={530} y1={90} x2={530} y2={250} />
            <Label x={530} y={80}>33 kV switchgear</Label>

            {/* grid transformer & HV */}
            <Wire d="M530 170 H546" />
            <Breaker x={560} y={170} rot={-90} />
            <Wire d="M574 170 H582" />
            <Transformer x={610} y={170} rot={-90} />
            <Label x={610} y={205}>33/400 kV</Label>
            <Wire d="M638 170 H650" />
            <Breaker x={664} y={170} rot={-90} />
            <Label x={664} y={150}>400 kV CB</Label>
            <Wire d="M678 170 H698" />
            <VT x={690} y={170} />
            <CT x={708} y={170} rot={-90} />
            <Label x={700} y={228}>Metering CT/VT</Label>
            <Wire d="M718 170 H722" />
            <Disconnector x={736} y={170} rot={-90} />
            <Wire d="M750 170 H790" />
            <path d="M782 165 L790 170 L782 175" fill="none" stroke="var(--text)" strokeWidth={1.6} />
            <Label x={770} y={160}>Grid</Label>

            {/* hit boxes */}
            {hot("module", 16, 109, 16, 22)}
            {hot("string", 16, 158, 66, 24)}
            {hot("combiner", 109, 134, 52, 72)}
            {hot("inverter", 197, 145, 50, 50)}
            {hot("mvTx", 281, 150, 56, 40)}
            {hot("rmu", 345, 146, 56, 48)}
            {hot("collector", 404, 156, 84, 26)}
            {hot("mvBus", 494, 84, 46, 172)}
            {hot("gridTx", 580, 150, 60, 40)}
            {hot("hvBreaker", 648, 155, 32, 30)}
            {hot("metering", 681, 160, 40, 56)}
            {hot("grid", 722, 150, 72, 36)}
            {hot("ppc", 296, 18, 168, 42)}
          </svg>
          </div>
          <Hint>
            What to notice: power flows left to right through three voltage levels — 1500 V DC, ~800 V AC and 33 kV — before the grid
            transformer lifts it to transmission voltage. Each step is a contract interface and a commissioning hold point.
          </Hint>
        </div>
        <InfoPanel title={info?.title} empty="Select a component on the diagram (click or press Enter) to see its role, typical rating and what a PM should check.">
          {info && <InfoBody info={info} />}
        </InfoPanel>
      </div>
    </Card>
  );
}
