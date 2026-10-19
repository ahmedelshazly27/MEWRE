import type { ReactNode } from "react";
import type { DiagramId } from "@/content/widgets";
import { ivCurve, mpp } from "@/lib/calc/pv";
import { sCurve } from "@/lib/calc/evm";
import { Breaker, Disconnector, Transformer, CT, VT, SurgeArrester, EarthingSwitch, Bus, Wire } from "../widgets/sld";

export interface MarkerPos {
  /** Point on the drawing the marker refers to. */
  x: number;
  y: number;
  /** Label / number position. Equal to (x, y) → centred on the point, no leader. */
  lx: number;
  ly: number;
  anchor?: "start" | "middle" | "end";
}

export interface DiagramDef {
  title: string;
  /** Optional top of the viewBox (to crop empty space). */
  y0?: number;
  w: number;
  h: number;
  draw: () => ReactNode;
  markers: Record<string, MarkerPos>;
  labels: Record<string, string>;
}

const T = "var(--text)";
const line = { stroke: T, strokeWidth: 1.6, fill: "none" } as const;

function Box({ cx, cy, w = 120, h = 40, accent }: { cx: number; cy: number; w?: number; h?: number; accent?: boolean }) {
  return (
    <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={8} fill={accent ? "var(--accent-soft)" : "var(--surface-2)"} stroke={accent ? "var(--accent)" : "var(--border)"} strokeWidth={1.5} />
  );
}
function EdgeLabel({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text x={x} y={y} fontSize={10} textAnchor="middle" fill="var(--muted)" style={{ paintOrder: "stroke", stroke: "var(--surface)", strokeWidth: 3 }}>
      {children}
    </text>
  );
}
function PvModule({ x, y, w = 26, h = 18 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="var(--info-soft)" stroke={T} strokeWidth={1.2} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={T} strokeWidth={0.6} />
      <line x1={x + w / 3} y1={y} x2={x + w / 3} y2={y + h} stroke={T} strokeWidth={0.6} />
      <line x1={x + (2 * w) / 3} y1={y} x2={x + (2 * w) / 3} y2={y + h} stroke={T} strokeWidth={0.6} />
    </g>
  );
}

// ------------------------------------------------------------------ pv-plant
const pvPlant: DiagramDef = {
  title: "Utility PV plant",
  y0: 80,
  w: 680,
  h: 230,
  labels: {
    module: "PV module",
    string: "String",
    combiner: "DC combiner box",
    inverter: "Inverter",
    "mv-transformer": "MV transformer",
    rmu: "Ring main unit (RMU)",
    "collector-substation": "Collector substation",
    "hv-transformer": "HV grid transformer",
    grid: "Transmission grid",
  },
  markers: {
    module: { x: 37, y: 169, lx: 37, ly: 122 },
    string: { x: 82, y: 238, lx: 82, ly: 290 },
    combiner: { x: 185, y: 170, lx: 185, ly: 122 },
    inverter: { x: 252, y: 212, lx: 252, ly: 290 },
    "mv-transformer": { x: 320, y: 177, lx: 320, ly: 122 },
    rmu: { x: 385, y: 208, lx: 390, ly: 290 },
    "collector-substation": { x: 470, y: 130, lx: 480, ly: 100 },
    "hv-transformer": { x: 544, y: 206, lx: 540, ly: 290 },
    grid: { x: 630, y: 140, lx: 630, ly: 100 },
  },
  draw: () => (
    <g>
      {[160, 185, 210].map((y) => (
        <g key={y}>
          {[24, 54, 84, 114].map((x) => (
            <PvModule key={x} x={x} y={y} />
          ))}
          <path d={`M140 ${y + 9} L170 ${180 + (y - 160) / 2.5}`} {...line} />
        </g>
      ))}
      <path d="M24 236 H140 M24 231 V241 M140 231 V241" {...line} strokeWidth={1.2} />
      <rect x={170} y={170} width={30} height={40} rx={3} fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <path d="M200 190 H230" {...line} />
      <text x={215} y={184} fontSize={9} textAnchor="middle" fill="var(--muted)">DC</text>
      <rect x={230} y={168} width={44} height={44} rx={3} fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <path d="M230 212 L274 168 M236 178 h12 M236 183 h12 M256 202 q3 -5 6 0 t6 0" {...line} strokeWidth={1.2} />
      <path d="M274 190 H299" {...line} />
      <circle cx={312} cy={190} r={13} {...line} />
      <circle cx={328} cy={190} r={13} {...line} />
      <path d="M341 190 H370" {...line} />
      <rect x={370} y={172} width={30} height={36} rx={3} fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <rect x={379} y={184} width={12} height={12} fill="var(--surface)" stroke={T} strokeWidth={1.2} />
      <path d="M400 190 H465" {...line} />
      <text x={420} y={184} fontSize={9} textAnchor="middle" fill="var(--muted)">33 kV</text>
      <rect x={440} y={130} width={150} height={120} rx={6} fill="none" stroke="var(--muted)" strokeDasharray="5 4" />
      <path d="M440 160 H465 M440 220 H465" {...line} strokeWidth={1.2} />
      <line x1={465} y1={150} x2={465} y2={230} stroke={T} strokeWidth={5} strokeLinecap="round" />
      <path d="M465 190 H490" {...line} />
      <rect x={490} y={184} width={12} height={12} fill="var(--surface)" stroke={T} strokeWidth={1.2} />
      <path d="M502 190 H519" {...line} />
      <circle cx={535} cy={190} r={16} {...line} />
      <circle cx={553} cy={190} r={16} {...line} />
      <path d="M569 190 H600 L618 168" {...line} />
      <path d="M612 262 L630 140 L648 262 M616 236 H644 M620 206 H640 M624 178 H636 M608 160 H652 M616 236 L640 206 M644 236 L620 206 M620 206 L636 178 M640 206 L624 178" {...line} strokeWidth={1.3} />
      <line x1={600} y1={262} x2={665} y2={262} stroke="var(--border)" />
    </g>
  ),
};

// ------------------------------------------------------------------ substation
const substation: DiagramDef = {
  title: "HV substation bay",
  w: 640,
  h: 420,
  labels: {
    "line-bay": "Overhead line bay",
    busbar: "Busbar",
    "circuit-breaker": "Circuit breaker",
    disconnector: "Disconnector",
    ct: "Current transformer (CT)",
    vt: "Voltage transformer (VT)",
    "power-transformer": "Power transformer",
    "surge-arrester": "Surge arrester",
    "earthing-switch": "Earthing switch",
  },
  markers: {
    "line-bay": { x: 260, y: 32, lx: 330, ly: 30, anchor: "start" },
    "surge-arrester": { x: 195, y: 76, lx: 150, ly: 76, anchor: "end" },
    vt: { x: 326, y: 76, lx: 372, ly: 80, anchor: "start" },
    disconnector: { x: 252, y: 104, lx: 150, ly: 112, anchor: "end" },
    "earthing-switch": { x: 306, y: 146, lx: 372, ly: 146, anchor: "start" },
    ct: { x: 254, y: 160, lx: 150, ly: 164, anchor: "end" },
    "circuit-breaker": { x: 267, y: 196, lx: 372, ly: 200, anchor: "start" },
    busbar: { x: 500, y: 260, lx: 530, ly: 248, anchor: "start" },
    "power-transformer": { x: 414, y: 368, lx: 450, ly: 372, anchor: "start" },
  },
  draw: () => (
    <g>
      <Wire d="M260 14 V60" />
      <path d="M255 22 L260 14 L265 22" {...line} />
      <Wire d="M260 60 H200" />
      <SurgeArrester x={200} y={60} />
      <Wire d="M260 60 H320" />
      <VT x={320} y={60} />
      <Wire d="M260 60 V90" />
      <Disconnector x={260} y={104} />
      <Wire d="M260 118 V150" />
      <Wire d="M260 130 H300" />
      <EarthingSwitch x={300} y={130} />
      <CT x={260} y={160} />
      <Wire d="M260 170 V182" />
      <Breaker x={260} y={196} />
      <Wire d="M260 210 V216" />
      <Disconnector x={260} y={230} />
      <Wire d="M260 244 V260" />
      {/* second line bay (unlabelled) */}
      <Wire d="M470 14 V176" />
      <path d="M465 22 L470 14 L475 22" {...line} />
      <Disconnector x={470} y={190} />
      <Wire d="M470 204 V212" />
      <Breaker x={470} y={226} />
      <Wire d="M470 240 V260" />
      <Bus x1={120} y1={260} x2={520} y2={260} />
      {/* transformer bay */}
      <Wire d="M400 260 V270" />
      <Disconnector x={400} y={284} />
      <Wire d="M400 298 V302" />
      <Breaker x={400} y={316} />
      <Wire d="M400 330 V342" />
      <Transformer x={400} y={370} r={14} />
      <Wire d="M400 398 V412" />
    </g>
  ),
};

// ------------------------------------------------------------------ iv-curve
const IVX = (v: number) => 60 + (v / 55) * 440;
const IVY = (i: number) => 330 - (i / 16) * 280;
const IVP = (p: number) => 330 - (p / 900) * 280;
const ivPts = ivCurve(1000, 25, 60);
const ivM = mpp(1000, 25);
const ivCurveDef: DiagramDef = {
  title: "PV I-V curve",
  w: 560,
  h: 380,
  labels: {
    isc: "Short-circuit current (Isc)",
    voc: "Open-circuit voltage (Voc)",
    mpp: "Maximum power point (MPP)",
    imp: "Current at MPP (Imp)",
    vmp: "Voltage at MPP (Vmp)",
  },
  markers: {
    isc: { x: IVX(0), y: IVY(ivM.isc), lx: 80, ly: IVY(ivM.isc) - 18, anchor: "start" },
    voc: { x: IVX(ivM.voc), y: 330, lx: IVX(ivM.voc) + 20, ly: 362, anchor: "start" },
    mpp: { x: IVX(ivM.vmp), y: IVY(ivM.imp), lx: IVX(ivM.vmp) + 30, ly: IVY(ivM.imp) - 30, anchor: "start" },
    imp: { x: IVX(0), y: IVY(ivM.imp), lx: 120, ly: IVY(ivM.imp) + 30, anchor: "start" },
    vmp: { x: IVX(ivM.vmp), y: 330, lx: IVX(ivM.vmp) - 20, ly: 362, anchor: "end" },
  },
  draw: () => (
    <g>
      <path d="M60 30 V330 H520" {...line} />
      <path d="M55 38 L60 30 L65 38 M512 325 L520 330 L512 335" {...line} />
      <text x={520} y={350} fontSize={11} textAnchor="end" fill="var(--muted)">Voltage</text>
      <text x={66} y={26} fontSize={11} fill="var(--muted)">Current / power</text>
      <path d={ivPts.map((p, k) => `${k ? "L" : "M"}${IVX(p.v).toFixed(1)} ${IVP(p.p).toFixed(1)}`).join(" ")} fill="none" stroke="var(--chart-2)" strokeWidth={1.6} strokeDasharray="5 4" />
      <path d={ivPts.map((p, k) => `${k ? "L" : "M"}${IVX(p.v).toFixed(1)} ${IVY(p.i).toFixed(1)}`).join(" ")} fill="none" stroke="var(--chart-1)" strokeWidth={2.5} />
      <path d={`M${IVX(0)} ${IVY(ivM.imp)} H${IVX(ivM.vmp)} V330`} fill="none" stroke="var(--muted)" strokeDasharray="3 3" />
      <rect x={IVX(0)} y={IVY(ivM.imp)} width={IVX(ivM.vmp) - IVX(0)} height={330 - IVY(ivM.imp)} fill="var(--chart-1)" opacity={0.06} />
      <circle cx={IVX(ivM.vmp)} cy={IVY(ivM.imp)} r={5} fill="var(--chart-1)" />
      <circle cx={IVX(ivM.vmp)} cy={IVP(ivM.pmp)} r={4} fill="var(--chart-2)" />
    </g>
  ),
};

// ------------------------------------------------------------------ parabolic-trough
const trough: DiagramDef = {
  title: "Parabolic trough CSP plant with molten-salt storage",
  w: 680,
  h: 400,
  labels: {
    mirror: "Parabolic mirror",
    "receiver-tube": "Receiver tube",
    "htf-loop": "Heat-transfer-fluid loop",
    "hot-tank": "Hot salt tank",
    "cold-tank": "Cold salt tank",
    "heat-exchanger": "Steam generator (heat exchanger)",
    "steam-turbine": "Steam turbine",
    condenser: "Condenser",
  },
  markers: {
    mirror: { x: 175, y: 246, lx: 150, ly: 330 },
    "receiver-tube": { x: 90, y: 214, lx: 70, ly: 110 },
    "htf-loop": { x: 262, y: 150, lx: 250, ly: 125 },
    "hot-tank": { x: 357, y: 160, lx: 357, ly: 100 },
    "cold-tank": { x: 357, y: 340, lx: 357, ly: 375 },
    "heat-exchanger": { x: 450, y: 180, lx: 470, ly: 130 },
    "steam-turbine": { x: 550, y: 170, lx: 575, ly: 120 },
    condenser: { x: 550, y: 320, lx: 550, ly: 360 },
  },
  draw: () => (
    <g>
      {[90, 200].map((cx) => (
        <g key={cx}>
          {[-35, -10, 15, 38].map((dx) => (
            <path key={dx} d={`M${cx + dx} 30 L${cx + dx} ${240 - Math.abs(dx) * 0.9} L${cx} 214`} fill="none" stroke="var(--sun)" strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
          ))}
          <path d={`M${cx - 50} 200 Q${cx} 290 ${cx + 50} 200`} fill="none" stroke="var(--chart-3)" strokeWidth={4} strokeLinecap="round" />
          <circle cx={cx} cy={214} r={6} fill="var(--sun-soft)" stroke="var(--sun)" strokeWidth={2} />
          <path d={`M${cx} 250 V275 M${cx - 12} 275 H${cx + 12}`} {...line} />
        </g>
      ))}
      <path d="M90 208 V150 H357 V160" fill="none" stroke="var(--danger)" strokeWidth={2.5} />
      <path d="M200 208 V150" fill="none" stroke="var(--danger)" strokeWidth={2.5} />
      <path d="M330 310 H260 V300 H30 V214 H84 M206 214 H230 V300" fill="none" stroke="var(--chart-3)" strokeWidth={2.5} />
      <rect x={330} y={160} width={55} height={70} rx={10} fill="var(--danger-soft)" stroke={T} strokeWidth={1.4} />
      <rect x={330} y={270} width={55} height={70} rx={10} fill="var(--info-soft)" stroke={T} strokeWidth={1.4} />
      <path d="M385 180 H430" fill="none" stroke="var(--danger)" strokeWidth={2} />
      <path d="M430 250 H410 V300 H385" fill="none" stroke="var(--chart-3)" strokeWidth={2} />
      <rect x={430} y={180} width={40} height={80} rx={4} fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <path d="M438 195 l8 8 l-8 8 l8 8 l-8 8 l8 8 l-8 8" {...line} strokeWidth={1.2} />
      <path d="M470 190 H520" fill="none" stroke="var(--muted)" strokeWidth={2} />
      <path d="M520 172 L580 160 L580 240 L520 228 Z" fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <path d="M580 200 H600" {...line} />
      <circle cx={620} cy={200} r={20} fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <text x={620} y={205} fontSize={13} textAnchor="middle" fill={T}>G</text>
      <path d="M550 234 V280" fill="none" stroke="var(--muted)" strokeWidth={2} />
      <rect x={520} y={280} width={60} height={40} rx={4} fill="var(--info-soft)" stroke={T} strokeWidth={1.4} />
      <path d="M528 296 q5 -5 10 0 t10 0 t10 0 t10 0 M528 306 q5 -5 10 0 t10 0 t10 0 t10 0" {...line} strokeWidth={1} />
      <path d="M520 300 H490 V250 H470" fill="none" stroke="var(--chart-3)" strokeWidth={2} />
    </g>
  ),
};

// ------------------------------------------------------------------ wind-turbine
const windTurbine: DiagramDef = {
  title: "Horizontal-axis wind turbine",
  w: 560,
  h: 420,
  labels: {
    blade: "Blade",
    hub: "Hub",
    nacelle: "Nacelle",
    gearbox: "Gearbox",
    generator: "Generator",
    tower: "Tower",
    "yaw-system": "Yaw system",
    anemometer: "Anemometer",
  },
  markers: {
    blade: { x: 234, y: 70, lx: 180, ly: 70, anchor: "end" },
    hub: { x: 222, y: 160, lx: 170, ly: 190, anchor: "end" },
    nacelle: { x: 405, y: 176, lx: 440, ly: 186, anchor: "start" },
    gearbox: { x: 317, y: 148, lx: 290, ly: 92 },
    generator: { x: 365, y: 148, lx: 352, ly: 120, anchor: "end" },
    tower: { x: 306, y: 320, lx: 360, ly: 320, anchor: "start" },
    "yaw-system": { x: 314, y: 188, lx: 372, ly: 230, anchor: "start" },
    anemometer: { x: 400, y: 110, lx: 440, ly: 92, anchor: "start" },
  },
  draw: () => (
    <g>
      <line x1={180} y1={410} x2={440} y2={410} stroke="var(--border)" strokeWidth={2} />
      <path d="M282 410 L318 410 L309 192 L291 192 Z" fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <rect x={286} y={182} width={28} height={10} fill="var(--muted)" opacity={0.6} stroke={T} strokeWidth={1.2} />
      <rect x={240} y={140} width={170} height={42} rx={10} fill="var(--surface)" stroke={T} strokeWidth={1.6} />
      <path d="M232 160 H300" {...line} strokeWidth={3} />
      <rect x={300} y={148} width={35} height={24} rx={3} fill="var(--chart-5)" fillOpacity={0.25} stroke={T} strokeWidth={1.2} />
      <path d="M335 160 H345" {...line} strokeWidth={2.5} />
      <rect x={345} y={148} width={40} height={24} rx={3} fill="var(--chart-1)" fillOpacity={0.25} stroke={T} strokeWidth={1.2} />
      <path d="M400 140 V112 M392 112 H408" {...line} />
      <circle cx={392} cy={108} r={3.5} {...line} />
      <circle cx={408} cy={108} r={3.5} {...line} />
      <path d="M226 148 C219 100 226 46 234 18 C241 60 242 110 238 148 Z" fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <path d="M226 172 C219 220 226 274 234 302 C241 260 242 210 238 172 Z" fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <path d="M240 146 C224 146 212 152 210 160 C212 168 224 174 240 174 Z" fill="var(--surface)" stroke={T} strokeWidth={1.6} />
    </g>
  ),
};

// ------------------------------------------------------------------ bess
const bess: DiagramDef = {
  title: "Battery energy storage system",
  w: 680,
  h: 390,
  labels: {
    cell: "Battery cell",
    module: "Battery module",
    rack: "Battery rack",
    bms: "Battery management system (BMS)",
    pcs: "PCS (inverter)",
    transformer: "Step-up transformer",
    hvac: "HVAC / thermal management",
    "fire-suppression": "Fire suppression",
    ems: "Energy management system (EMS)",
  },
  markers: {
    cell: { x: 60, y: 52, lx: 60, ly: 28 },
    module: { x: 160, y: 52, lx: 160, ly: 28 },
    rack: { x: 292, y: 80, lx: 306, ly: 84, anchor: "start" },
    bms: { x: 255, y: 210, lx: 255, ly: 156 },
    "fire-suppression": { x: 310, y: 300, lx: 330, ly: 360 },
    hvac: { x: 450, y: 222, lx: 462, ly: 186, anchor: "start" },
    pcs: { x: 515, y: 290, lx: 505, ly: 330 },
    transformer: { x: 590, y: 274, lx: 610, ly: 360 },
    ems: { x: 515, y: 60, lx: 515, ly: 38 },
  },
  draw: () => (
    <g>
      <rect x={49} y={52} width={22} height={34} rx={2} fill="var(--ok-soft)" stroke={T} strokeWidth={1.4} />
      <rect x={55} y={48} width={4} height={4} fill={T} />
      <rect x={62} y={48} width={4} height={4} fill={T} />
      <path d="M80 69 H110 M104 64 L110 69 L104 74" {...line} />
      <rect x={120} y={52} width={80} height={34} rx={3} fill="var(--ok-soft)" stroke={T} strokeWidth={1.4} />
      {[1, 2, 3, 4, 5, 6, 7].map((k) => (
        <line key={k} x1={120 + k * 10} y1={52} x2={120 + k * 10} y2={86} stroke={T} strokeWidth={0.7} />
      ))}
      <path d="M210 69 H240 M234 64 L240 69 L234 74" {...line} />
      <rect x={252} y={35} width={40} height={90} rx={3} fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <rect key={k} x={256} y={40 + k * 14} width={32} height={10} fill="var(--ok-soft)" stroke={T} strokeWidth={0.8} />
      ))}
      <rect x={40} y={170} width={380} height={160} rx={4} fill="none" stroke={T} strokeWidth={2} />
      <path d="M50 186 H410" fill="none" stroke="var(--danger)" strokeWidth={1.2} strokeDasharray="2 4" />
      {[70, 110, 150, 190].map((x) => (
        <g key={x}>
          <rect x={x} y={200} width={26} height={110} rx={2} fill="var(--surface-2)" stroke={T} strokeWidth={1.2} />
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <rect key={k} x={x + 3} y={204 + k * 15} width={20} height={10} fill="var(--ok-soft)" stroke={T} strokeWidth={0.6} />
          ))}
        </g>
      ))}
      <rect x={240} y={210} width={30} height={50} rx={3} fill="var(--surface)" stroke={T} strokeWidth={1.3} />
      <path d="M246 222 h18 M246 230 h18 M246 238 h10" {...line} strokeWidth={1} />
      <circle cx={262} cy={250} r={3} fill="var(--ok)" />
      <rect x={300} y={220} width={20} height={80} rx={9} fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth={1.4} />
      <path d="M310 220 V186" fill="none" stroke="var(--danger)" strokeWidth={1.2} />
      <rect x={420} y={200} width={30} height={60} rx={3} fill="var(--info-soft)" stroke={T} strokeWidth={1.3} />
      <circle cx={435} cy={222} r={9} {...line} strokeWidth={1.1} />
      <path d="M435 213 V231 M426 222 H444" {...line} strokeWidth={0.8} />
      <path d="M420 290 H490" {...line} />
      <rect x={490} y={240} width={50} height={50} rx={3} fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <path d="M490 290 L540 240 M496 252 h12 M496 257 h12 M520 278 q3 -5 6 0 t6 0" {...line} strokeWidth={1.1} />
      <path d="M540 260 H568" {...line} />
      <circle cx={582} cy={260} r={14} {...line} />
      <circle cx={598} cy={260} r={14} {...line} />
      <path d="M612 260 H662 M654 255 L662 260 L654 265" {...line} />
      <rect x={470} y={60} width={90} height={44} rx={4} fill="var(--surface-2)" stroke={T} strokeWidth={1.4} />
      <rect x={480} y={68} width={70} height={26} rx={2} fill="var(--surface)" stroke={T} strokeWidth={1} />
      <path d="M484 88 l12 -10 l10 6 l14 -12 l12 8" fill="none" stroke="var(--accent)" strokeWidth={1.4} />
      <path d="M515 104 V240 M470 96 H440 V196 H255 V210" fill="none" stroke="var(--muted)" strokeDasharray="4 3" />
    </g>
  ),
};

// ------------------------------------------------------------------ power-triangle
const PT = { x0: 50, x1: 370, y0: 300, y1: 100 };
const ptPhi = Math.atan2(PT.y0 - PT.y1, PT.x1 - PT.x0);
const powerTriangle: DiagramDef = {
  title: "Power triangle",
  y0: 70,
  w: 540,
  h: 280,
  labels: { p: "Real power P (kW)", q: "Reactive power Q (kvar)", s: "Apparent power S (kVA)", phi: "Power-factor angle φ" },
  markers: {
    p: { x: 210, y: 300, lx: 210, ly: 334 },
    q: { x: 370, y: 200, lx: 390, ly: 204, anchor: "start" },
    s: { x: 210, y: 200, lx: 190, ly: 170, anchor: "end" },
    phi: { x: 100, y: 291, lx: 150, ly: 282, anchor: "start" },
  },
  draw: () => (
    <g>
      <defs>
        <marker id="dg-pt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text)" />
        </marker>
      </defs>
      <line x1={PT.x0} y1={PT.y0} x2={PT.x1} y2={PT.y0} stroke="var(--chart-3)" strokeWidth={3} markerEnd="url(#dg-pt-arrow)" />
      <line x1={PT.x1} y1={PT.y0} x2={PT.x1} y2={PT.y1 + 4} stroke="var(--chart-4)" strokeWidth={3} />
      <line x1={PT.x0} y1={PT.y0} x2={PT.x1} y2={PT.y1} stroke="var(--chart-2)" strokeWidth={3} markerEnd="url(#dg-pt-arrow)" />
      <path d={`M${PT.x1 - 14} ${PT.y0} V${PT.y0 - 14} H${PT.x1}`} {...line} strokeWidth={1.2} />
      <path d={`M${PT.x0 + 60} ${PT.y0} A60 60 0 0 0 ${PT.x0 + 60 * Math.cos(ptPhi)} ${PT.y0 - 60 * Math.sin(ptPhi)}`} fill="none" stroke="var(--muted)" strokeWidth={1.5} />
    </g>
  ),
};

// ------------------------------------------------------------------ fidic-parties
const fidic: DiagramDef = {
  title: "Parties under a FIDIC contract",
  w: 620,
  h: 380,
  labels: { employer: "Employer", engineer: "Engineer", contractor: "Contractor", subcontractor: "Subcontractor", dab: "Dispute board (DAAB)" },
  markers: {
    employer: { x: 125, y: 63, lx: 125, ly: 63 },
    engineer: { x: 455, y: 63, lx: 455, ly: 63 },
    contractor: { x: 125, y: 223, lx: 125, ly: 223 },
    subcontractor: { x: 125, y: 333, lx: 125, ly: 333 },
    dab: { x: 455, y: 223, lx: 455, ly: 223 },
  },
  draw: () => (
    <g>
      <path d="M125 86 V200" {...line} strokeWidth={2} />
      <EdgeLabel x={160} y={146}>Contract</EdgeLabel>
      <path d="M190 63 H390" {...line} strokeWidth={1.6} />
      <EdgeLabel x={290} y={56}>appoints (consultancy agreement)</EdgeLabel>
      <path d="M400 86 L180 200" {...line} strokeDasharray="6 4" />
      <EdgeLabel x={440} y={122}>instructs, certifies, determines</EdgeLabel>
      <path d="M125 246 V310" {...line} />
      <EdgeLabel x={170} y={282}>subcontract</EdgeLabel>
      <path d="M190 223 H390 M180 86 L400 205" {...line} strokeDasharray="2 4" />
      <EdgeLabel x={290} y={238}>tripartite DAAB agreement</EdgeLabel>
      <Box cx={125} cy={63} w={150} h={46} />
      <Box cx={455} cy={63} w={150} h={46} />
      <Box cx={125} cy={223} w={150} h={46} />
      <Box cx={125} cy={333} w={150} h={46} />
      <Box cx={455} cy={223} w={150} h={46} />
    </g>
  ),
};

// ------------------------------------------------------------------ ppp-structure
const ppp: DiagramDef = {
  title: "IPP / PPP project structure",
  w: 680,
  h: 420,
  labels: {
    offtaker: "Offtaker (MEWRE)",
    spv: "Project company (SPV)",
    lenders: "Lenders",
    sponsors: "Sponsors (developers)",
    epc: "EPC contractor",
    om: "O&M contractor",
    kapp: "KAPP (PPP authority)",
    "public-ipo": "Public shareholders (IPO)",
  },
  markers: {
    offtaker: { x: 340, y: 60, lx: 340, ly: 60 },
    spv: { x: 340, y: 210, lx: 340, ly: 210 },
    lenders: { x: 100, y: 210, lx: 100, ly: 210 },
    sponsors: { x: 580, y: 210, lx: 580, ly: 210 },
    epc: { x: 200, y: 360, lx: 200, ly: 360 },
    om: { x: 480, y: 360, lx: 480, ly: 360 },
    kapp: { x: 100, y: 60, lx: 100, ly: 60 },
    "public-ipo": { x: 580, y: 60, lx: 580, ly: 60 },
  },
  draw: () => (
    <g>
      <path d="M340 82 V188" {...line} strokeWidth={2} />
      <EdgeLabel x={372} y={140}>PPA</EdgeLabel>
      <path d="M180 60 H260" {...line} strokeDasharray="5 4" />
      <EdgeLabel x={220} y={52}>procures</EdgeLabel>
      <path d="M150 80 L270 190" {...line} strokeDasharray="5 4" />
      <EdgeLabel x={196} y={146}>tender / award</EdgeLabel>
      <path d="M180 210 H260" {...line} />
      <EdgeLabel x={220} y={202}>debt</EdgeLabel>
      <path d="M420 210 H500" {...line} />
      <EdgeLabel x={460} y={202}>equity</EdgeLabel>
      <path d="M530 80 L410 190" {...line} />
      <EdgeLabel x={490} y={146}>shares</EdgeLabel>
      <path d="M300 232 L220 338" {...line} />
      <EdgeLabel x={236} y={290}>EPC contract</EdgeLabel>
      <path d="M380 232 L460 338" {...line} />
      <EdgeLabel x={452} y={290}>O&amp;M contract</EdgeLabel>
      <Box cx={340} cy={60} w={150} h={44} />
      <Box cx={340} cy={210} w={160} h={46} accent />
      <Box cx={100} cy={210} w={150} h={44} />
      <Box cx={580} cy={210} w={160} h={44} />
      <Box cx={200} cy={360} w={150} h={44} />
      <Box cx={480} cy={360} w={150} h={44} />
      <Box cx={100} cy={60} w={150} h={44} />
      <Box cx={580} cy={60} w={160} h={44} />
    </g>
  ),
};

// ------------------------------------------------------------------ evm-scurve
const EX = (t: number) => 60 + t * 440;
const EY = (f: number) => 330 - f * 260;
const evStatus = 0.5;
const evmDef: DiagramDef = {
  title: "Earned value S-curves",
  w: 560,
  h: 380,
  labels: {
    "pv-curve": "Planned value (PV)",
    "ev-curve": "Earned value (EV)",
    "ac-curve": "Actual cost (AC)",
    "cost-variance": "Cost variance (CV = EV − AC)",
    "schedule-variance": "Schedule variance (SV = EV − PV)",
    bac: "Budget at completion (BAC)",
    "status-date": "Status (data) date",
  },
  markers: {
    "pv-curve": { x: EX(0.75), y: EY(sCurve(0.75)), lx: EX(0.75) + 30, ly: EY(sCurve(0.75)) + 30, anchor: "start" },
    "ev-curve": { x: EX(0.45), y: EY(0.8 * sCurve(0.45)), lx: EX(evStatus) + 60, ly: 296, anchor: "start" },
    "ac-curve": { x: EX(0.36), y: EY(1.1 * sCurve(0.36)), lx: EX(0.36) - 40, ly: EY(1.1 * sCurve(0.36)) - 34, anchor: "end" },
    "cost-variance": { x: EX(evStatus) + 18, y: EY(0.475), lx: EX(evStatus) + 50, ly: EY(0.475) - 50, anchor: "start" },
    "schedule-variance": { x: EX(evStatus) - 14, y: EY(0.45), lx: EX(evStatus) + 60, ly: EY(0.45) + 34, anchor: "start" },
    bac: { x: 120, y: EY(1), lx: 120, ly: EY(1) - 16 },
    "status-date": { x: EX(evStatus), y: 318, lx: EX(evStatus), ly: 360 },
  },
  draw: () => {
    const curve = (k: number, t1: number) =>
      Array.from({ length: 41 }, (_, i) => (t1 * i) / 40)
        .map((t, i) => `${i ? "L" : "M"}${EX(t).toFixed(1)} ${EY(k * sCurve(t)).toFixed(1)}`)
        .join(" ");
    return (
      <g>
        <path d="M60 30 V330 H520" {...line} />
        <text x={520} y={350} fontSize={11} textAnchor="end" fill="var(--muted)">Time</text>
        <text x={66} y={26} fontSize={11} fill="var(--muted)">Cumulative cost</text>
        <line x1={60} y1={EY(1)} x2={520} y2={EY(1)} stroke="var(--muted)" strokeDasharray="5 4" />
        <line x1={EX(evStatus)} y1={40} x2={EX(evStatus)} y2={330} stroke="var(--muted)" strokeDasharray="3 3" />
        <path d={curve(1, 1)} fill="none" stroke="var(--chart-3)" strokeWidth={2.5} />
        <path d={curve(0.8, evStatus)} fill="none" stroke="var(--chart-1)" strokeWidth={2.5} />
        <path d={curve(1.1, evStatus)} fill="none" stroke="var(--chart-4)" strokeWidth={2.5} />
        {/* CV between EV (0.4) and AC (0.55) */}
        <path d={`M${EX(evStatus) + 18} ${EY(0.4)} V${EY(0.55)}`} fill="none" stroke="var(--danger)" strokeWidth={2} />
        <path d={`M${EX(evStatus) + 13} ${EY(0.4)} h10 M${EX(evStatus) + 13} ${EY(0.55)} h10`} stroke="var(--danger)" strokeWidth={1.5} />
        {/* SV between EV (0.4) and PV (0.5) */}
        <path d={`M${EX(evStatus) - 14} ${EY(0.4)} V${EY(0.5)}`} fill="none" stroke="var(--warn)" strokeWidth={2} />
        <path d={`M${EX(evStatus) - 19} ${EY(0.4)} h10 M${EX(evStatus) - 19} ${EY(0.5)} h10`} stroke="var(--warn)" strokeWidth={1.5} />
      </g>
    );
  },
};

export const DIAGRAMS: Record<DiagramId, DiagramDef> = {
  "pv-plant": pvPlant,
  substation,
  "iv-curve": ivCurveDef,
  "parabolic-trough": trough,
  "wind-turbine": windTurbine,
  bess,
  "power-triangle": powerTriangle,
  "fidic-parties": fidic,
  "ppp-structure": ppp,
  "evm-scurve": evmDef,
};

