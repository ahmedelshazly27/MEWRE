"use client";

import { useState } from "react";
import { Card, InfoPanel, Hint, type WidgetProps } from "./ui";
import { Breaker, Disconnector, Transformer, CT, VT, SurgeArrester, EarthingSwitch, ArrowDown, Wire, Bus, Label, Hot, InfoBody, type ComponentInfo } from "./sld";

const INFO: Record<string, ComponentInfo> = {
  line: {
    title: "400 kV line bay",
    role: "Connects an overhead transmission line to the substation busbar with switching, measurement and protection.",
    rating: "400 kV, ~2000–4000 A; two incoming lines give N-1 security for the plant export.",
    checks: [
      "Line protection (distance 21, line differential 87L) settings agreed with MEWRE's protection engineers.",
      "Bay equipment from the utility's approved list; interface point (gantry/dead-end) clearly defined.",
      "Energisation sequence and switching programme approved by the control centre.",
    ],
  },
  sa: {
    title: "Surge arrester",
    role: "Clamps lightning and switching over-voltages to protect equipment insulation, located at line entries and transformer terminals.",
    rating: "Metal-oxide (ZnO) arrester rated for system voltage and energy class; e.g. ~336–360 kV rated voltage on a 400 kV system.",
    checks: [
      "Insulation coordination study (IEC 60071) defines arrester rating and location.",
      "Connection lead length kept short; surge counters fitted.",
      "Pollution/creepage class suitable for coastal-desert dust and humidity.",
    ],
  },
  cvt: {
    title: "Voltage transformer (CVT/VT)",
    role: "Steps transmission voltage down to ~110 V for protection, synchronising and metering; CVTs can also carry power-line-carrier signals.",
    rating: "400 kV/√3 : 110 V/√3, protection class 3P and metering class 0.2 windings.",
    checks: [
      "Accuracy class and burden for each core; metering cores sealed.",
      "Ferro-resonance risk reviewed for the switching arrangement.",
      "Secondary fuse/MCB supervision wired to the relays.",
    ],
  },
  ds: {
    title: "Disconnector (isolator)",
    role: "Provides a visible isolation gap for safe maintenance. It is operated off-load only — the breaker interrupts current first.",
    rating: "Rated current and short-time withstand matching the bay (e.g. 3150 A, 50 kA/1 s at 400 kV).",
    checks: [
      "Interlocking with the circuit breaker and earthing switch (no off-load violations).",
      "Motor operating mechanism and position indication to SCADA.",
      "Permit-to-work procedures rely on it — check padlocking facilities.",
    ],
  },
  es: {
    title: "Earthing switch",
    role: "Connects isolated conductors to earth so staff can work safely; also discharges trapped charge on lines and cables.",
    rating: "Same short-time current rating as the bay; line-side earthing switches may need induced-current switching capability.",
    checks: [
      "Interlocked so it cannot close onto a live conductor.",
      "Included in the safety rules and permit-to-work system.",
      "Earth-grid connection verified (step and touch voltage study).",
    ],
  },
  ct: {
    title: "Current transformer",
    role: "Provides scaled-down current to protection relays and meters (e.g. 2000/1 A); separate cores for protection and metering.",
    rating: "Protection cores class 5P20/PX; metering cores 0.2S; ratio chosen for maximum load and fault current.",
    checks: [
      "CT sizing calculation (knee-point voltage) for differential and distance protection.",
      "Polarity and ratio tests at commissioning; core allocation drawings.",
      "Overlapping protection zones — CT location defines what each relay protects.",
    ],
  },
  cb: {
    title: "Circuit breaker",
    role: "Makes and breaks load and fault current automatically when a protection relay trips it.",
    rating: "400 kV: ~3150–4000 A, 50–63 kA; 132 kV: ~2000–3150 A, 31.5–40 kA; 33 kV: ~1250–2500 A, 25–31.5 kA.",
    checks: [
      "Breaking capacity above the maximum fault level from the short-circuit study (with margin for grid growth).",
      "Timing, contact resistance and SF6 tests at SAT.",
      "Spare breakers/poles and OEM support in Kuwait.",
    ],
  },
  bus400: {
    title: "400 kV busbar",
    role: "Common node connecting line bays and transformer bays; arrangement (single, double, breaker-and-a-half) sets reliability.",
    rating: "~4000 A, 50–63 kA; GIS indoor or AIS outdoor depending on space, dust and the utility's standards.",
    checks: [
      "Busbar arrangement agreed with MEWRE — determines outages needed for maintenance.",
      "Busbar protection (87B) and breaker-failure protection (50BF).",
      "GIS vs AIS decision: footprint, sand/dust, cost and lead time.",
    ],
  },
  tx400: {
    title: "400/132 kV power transformer (interbus)",
    role: "Links the 400 kV transmission level with the 132 kV level.",
    rating: "≈ 300–500 MVA, ONAN/ONAF, on-load tap changer; often autotransformers with a tertiary winding.",
    checks: [
      "Factory acceptance tests incl. temperature rise at 50 °C design ambient and impulse tests.",
      "Transport study (weight > 200 t), fire walls, oil containment.",
      "Transformer differential (87T), Buchholz and winding-temperature protections wired and tested.",
    ],
  },
  bus132: {
    title: "132 kV busbar",
    role: "Intermediate transmission node; can export to the 132 kV network and feed collector transformers.",
    rating: "~2500–3150 A, ~31.5–40 kA.",
    checks: ["Protection zones and bus coupler arrangement.", "Space for future bays (plant extensions).", "Earthing and lightning-shielding design."],
  },
  feeder132: {
    title: "132 kV outgoing feeder",
    role: "Exports power to the regional 132 kV network or connects other plants.",
    rating: "132 kV cable or OHL circuit with its own breaker bay.",
    checks: ["Ownership boundary and O&M responsibility.", "Protection signalling with the remote end.", "Metering if it is a commercial boundary."],
  },
  tx132: {
    title: "132/33 kV collector transformer",
    role: "Steps the 33 kV collector system up; each unit serves a section of the PV plant.",
    rating: "≈ 125–250 MVA each, ONAN/ONAF, OLTC; earthing transformer or resistor on the 33 kV side.",
    checks: [
      "N-1 philosophy: how much generation is lost if one unit trips.",
      "Lead time and FAT slots; spares strategy (one strategic spare for many units?).",
      "Loss evaluation and noise limits.",
    ],
  },
  bus33: {
    title: "33 kV collector busbar",
    role: "Collects the PV collector feeders and reactive-compensation and auxiliary supplies.",
    rating: "~2500–4000 A, 25–31.5 kA indoor switchgear.",
    checks: ["Switchroom HVAC redundancy for 50 °C summers.", "Arc-flash and internal-arc ratings.", "Earth-fault current limitation method."],
  },
  feeders33: {
    title: "33 kV PV collector feeders",
    role: "Each feeder breaker protects one radial cable string of inverter skids.",
    rating: "~20–30 MW per feeder, 630–1250 A breakers with overcurrent/earth-fault (50/51, 50N/51N) protection.",
    checks: [
      "Protection coordination down to the RMUs.",
      "Feeder energisation sequence for commissioning — a schedule driver.",
      "Cable test certificates before energisation.",
    ],
  },
  statcom: {
    title: "Reactive compensation (STATCOM / capacitor bank)",
    role: "Supplies dynamic reactive power and voltage control at the connection point beyond what the inverters provide, e.g. at night.",
    rating: "Typically tens to a few hundred Mvar for a 1 GW plant, sized by grid studies.",
    checks: [
      "Reactive capability study against the grid code requirement at the point of connection.",
      "Harmonic and resonance study (filters).",
      "Control integration with the plant controller.",
    ],
  },
  aux: {
    title: "Auxiliary (station service) transformer",
    role: "Supplies substation and plant auxiliaries: HVAC, protection, SCADA, lighting, trackers at night stow.",
    rating: "33/0.4 kV, ~0.5–2 MVA, plus diesel generator and UPS/battery backup.",
    checks: ["Import tariff/metering for night consumption.", "Backup supply autonomy for protection (DC batteries).", "HVAC load at peak summer."],
  },
  relays: {
    title: "Protection & control (IEDs)",
    role: "Intelligent electronic devices that measure CT/VT signals and trip breakers on faults; IEC 61850 substation automation.",
    rating: "Typical functions: distance 21 / line differential 87L, transformer differential 87T, busbar 87B, overcurrent 50/51, breaker failure 50BF, synchro-check 25.",
    checks: [
      "Protection setting study approved by MEWRE before energisation.",
      "End-to-end and secondary injection testing; IEC 61850 configuration files under change control.",
      "Cybersecurity and remote access policy.",
    ],
  },
};

function LineBay({ x }: { x: number }) {
  return (
    <g>
      <Wire d={`M${x} 14 V60`} />
      <path d={`M${x - 5} 22 L${x} 14 L${x + 5} 22`} fill="none" stroke="var(--text)" strokeWidth={1.6} />
      <Wire d={`M${x} 40 H${x - 30}`} />
      <SurgeArrester x={x - 30} y={40} />
      <Wire d={`M${x} 40 H${x + 30}`} />
      <VT x={x + 30} y={40} />
      <Disconnector x={x} y={74} />
      <Wire d={`M${x} 96 H${x + 24}`} />
      <EarthingSwitch x={x + 24} y={96} />
      <Wire d={`M${x} 88 V102`} />
      <CT x={x} y={112} />
      <Wire d={`M${x} 122 V128`} />
      <Breaker x={x} y={142} />
      <Wire d={`M${x} 156 V162`} />
      <Disconnector x={x} y={176} />
      <Wire d={`M${x} 190 V204`} />
    </g>
  );
}

export default function SubstationSld(_: WidgetProps) {
  const [sel, setSel] = useState<string | null>(null);
  const info = sel ? INFO[sel] : null;
  const hot = (id: string, x: number, y: number, w: number, h: number) => (
    <Hot id={id} x={x} y={y} w={w} h={h} selected={sel === id} onSelect={setSel} title={INFO[id].title} />
  );

  return (
    <Card title="400/132/33 kV collector substation — single-line diagram" subtitle="Click equipment for role, typical rating and PM checks">
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <svg viewBox="0 0 760 660" className="h-auto w-full" role="group" aria-label="Substation single-line diagram">
            <LineBay x={150} />
            <LineBay x={390} />
            <Label x={150} y={10}>400 kV OHL 1</Label>
            <Label x={390} y={10}>400 kV OHL 2</Label>
            <Bus x1={90} y1={204} x2={520} y2={204} />
            <Label x={95} y={196} anchor="start" muted={false}>400 kV busbar</Label>

            {/* transformer bay 400/132 */}
            <Wire d="M270 204 V212" />
            <Disconnector x={270} y={226} />
            <Wire d="M270 240 V244" />
            <Breaker x={270} y={258} />
            <Wire d="M270 272 V276" />
            <CT x={270} y={286} />
            <Wire d="M270 296 V302" />
            <Transformer x={270} y={330} />
            <Label x={290} y={334} anchor="start">400/132 kV</Label>
            <Wire d="M270 358 V364" />
            <Breaker x={270} y={378} />
            <Wire d="M270 392 V410" />
            <Bus x1={180} y1={410} x2={700} y2={410} />
            <Label x={185} y={402} anchor="start" muted={false}>132 kV busbar</Label>

            {/* 132 kV feeder */}
            <Wire d="M630 410 V426" />
            <Breaker x={630} y={440} />
            <Wire d="M630 454 V486" />
            <ArrowDown x={630} y={486} />
            <Label x={630} y={502}>132 kV feeder</Label>

            {/* 132/33 */}
            <Wire d="M420 410 V426" />
            <Breaker x={420} y={440} />
            <Wire d="M420 454 V462" />
            <Transformer x={420} y={490} />
            <Label x={440} y={494} anchor="start">132/33 kV</Label>
            <Wire d="M420 518 V526" />
            <Breaker x={420} y={540} />
            <Wire d="M420 554 V572" />
            <Bus x1={120} y1={572} x2={600} y2={572} />
            <Label x={125} y={564} anchor="start" muted={false}>33 kV busbar</Label>

            {/* 33 kV feeders */}
            {[160, 210, 260, 310].map((x) => (
              <g key={x}>
                <Wire d={`M${x} 572 V584`} />
                <Breaker x={x} y={598} />
                <Wire d={`M${x} 612 V632`} />
                <ArrowDown x={x} y={632} />
              </g>
            ))}
            <Label x={235} y={650}>PV collector feeders</Label>
            {/* STATCOM */}
            <Wire d="M490 572 V584" />
            <Breaker x={490} y={598} />
            <Wire d="M490 612 V620" />
            <rect x={474} y={620} width={32} height={22} rx={3} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.4} />
            <path d="M480 631 q5 -7 10 0 t10 0" fill="none" stroke="var(--text)" strokeWidth={1.3} />
            <Label x={490} y={656}>STATCOM</Label>
            {/* aux */}
            <Wire d="M570 572 V580" />
            <Transformer x={570} y={600} r={8} scale={0.75} />
            <Label x={570} y={642}>Aux 33/0.4 kV</Label>

            {/* protection panel */}
            <rect x={570} y={40} width={170} height={120} rx={6} fill="var(--surface-2)" stroke="var(--border)" />
            <Label x={655} y={60} muted={false} size={11}>Protection &amp; control (IEDs)</Label>
            {["21 / 87L  line protection", "87B  busbar differential", "87T  transformer differential", "50/51  overcurrent", "50BF  breaker failure", "25  synchro-check"].map((t, i) => (
              <Label key={t} x={582} y={80 + i * 13} anchor="start">{t}</Label>
            ))}
            <Wire d="M570 112 H402" dashed />
            <Wire d="M570 140 H540 V286 H282" dashed />

            {/* hit boxes */}
            {hot("line", 132, 2, 36, 34)}
            {hot("line", 372, 2, 36, 34)}
            {hot("sa", 106, 36, 34, 48)}
            {hot("sa", 346, 36, 34, 48)}
            {hot("cvt", 164, 36, 32, 48)}
            {hot("cvt", 404, 36, 32, 48)}
            {hot("ds", 136, 59, 28, 30)}
            {hot("ds", 376, 59, 28, 30)}
            {hot("ds", 136, 161, 28, 30)}
            {hot("ds", 376, 161, 28, 30)}
            {hot("ds", 256, 211, 28, 30)}
            {hot("es", 166, 92, 30, 42)}
            {hot("es", 406, 92, 30, 42)}
            {hot("ct", 138, 102, 24, 20)}
            {hot("ct", 378, 102, 24, 20)}
            {hot("ct", 258, 276, 24, 20)}
            {hot("cb", 136, 128, 28, 28)}
            {hot("cb", 376, 128, 28, 28)}
            {hot("cb", 256, 244, 28, 28)}
            {hot("cb", 256, 364, 28, 28)}
            {hot("cb", 406, 426, 28, 28)}
            {hot("cb", 406, 526, 28, 28)}
            {hot("bus400", 86, 198, 438, 12)}
            {hot("tx400", 250, 302, 90, 56)}
            {hot("bus132", 176, 404, 528, 12)}
            {hot("feeder132", 610, 426, 50, 82)}
            {hot("tx132", 400, 462, 90, 56)}
            {hot("bus33", 116, 566, 488, 12)}
            {hot("feeders33", 144, 584, 182, 72)}
            {hot("statcom", 466, 584, 50, 76)}
            {hot("aux", 546, 580, 52, 66)}
            {hot("relays", 566, 36, 178, 128)}
          </svg>
          <Hint>
            What to notice: every bay repeats the same pattern — disconnector, CT, breaker, disconnector — so that any breaker can be isolated
            and earthed for maintenance. CT positions define the overlapping protection zones.
          </Hint>
        </div>
        <InfoPanel title={info?.title} empty="Select equipment on the diagram (click or press Enter) to see its role, typical rating and PM checks.">
          {info && <InfoBody info={info} />}
        </InfoPanel>
      </div>
    </Card>
  );
}
