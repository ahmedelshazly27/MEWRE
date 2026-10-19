/**
 * Generates the downloadable practice spreadsheets for Module 10 (Financial Management)
 * into public/downloads/. Every result cell is a live Excel formula; input cells are shaded.
 *
 * Run: npx tsx scripts/build-spreadsheets.ts
 *
 * Models (all numbers illustrative, base case = the 1,100 MW PV IPP used in m10 lessons):
 *   lcoe-model.xlsx             LCOE from NPV(costs)=NPV(energy x LCOE), CRF check, sensitivities
 *   project-finance-model.xlsx  CFADS, sculpted debt (DSCR vs gearing), DSCR/LLCR/PLCR, IRRs
 *   evm-tracker.xlsx            Monthly PV/EV/AC with CV/SV/CPI/SPI/EAC/TCPI
 *   tariff-bid-evaluation.xlsx  Levelized tariff comparison with escalation, ranking, aggressive-bid flag
 *   cashflow-forecast.xlsx      S-curve or milestone payments, advance recovery, retention, FY budget
 */
import ExcelJS from "exceljs";
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "downloads");

// ------------------------------------------------------------------ styling helpers

const INPUT_FILL: ExcelJS.Fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF2CC" } };
const HEAD_FILL: ExcelJS.Fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F3864" } };
const RESULT_FILL: ExcelJS.Fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE2EFDA" } };
const SUB_FILL: ExcelJS.Fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9E1F2" } };
const THIN: Partial<ExcelJS.Borders> = {
  top: { style: "thin", color: { argb: "FFBFBFBF" } },
  bottom: { style: "thin", color: { argb: "FFBFBFBF" } },
  left: { style: "thin", color: { argb: "FFBFBFBF" } },
  right: { style: "thin", color: { argb: "FFBFBFBF" } },
};

function newBook(title: string): ExcelJS.Workbook {
  const wb = new ExcelJS.Workbook();
  wb.creator = "MEWRE PM Learning Platform (Module 10)";
  wb.title = title;
  wb.created = new Date("2026-10-19T00:00:00Z");
  // Excel and LibreOffice recalculate every formula when the file is opened.
  wb.calcProperties.fullCalcOnLoad = true;
  return wb;
}

function title(ws: ExcelJS.Worksheet, text: string, sub?: string) {
  ws.getCell("A1").value = text;
  ws.getCell("A1").font = { bold: true, size: 14, color: { argb: "FF1F3864" } };
  if (sub) {
    ws.getCell("A2").value = sub;
    ws.getCell("A2").font = { italic: true, color: { argb: "FF595959" } };
  }
}

function header(ws: ExcelJS.Worksheet, row: number, labels: string[], startCol = 1) {
  labels.forEach((l, i) => {
    const c = ws.getRow(row).getCell(startCol + i);
    c.value = l;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = HEAD_FILL;
    c.alignment = { wrapText: true, vertical: "middle", horizontal: "center" };
    c.border = THIN;
  });
  ws.getRow(row).height = 32;
}

function styleInput(c: ExcelJS.Cell) {
  c.fill = INPUT_FILL;
  c.font = { color: { argb: "FF0000CC" }, bold: true };
  c.border = THIN;
}

function styleResult(c: ExcelJS.Cell) {
  c.fill = RESULT_FILL;
  c.font = { bold: true };
  c.border = THIN;
}

type InputDef = { key: string; label: string; value: number | string | Date; unit: string; fmt?: string; note?: string };

/**
 * Writes an input block (label | value | unit | note) starting at `startRow` and returns
 * a map key -> absolute reference such as Inputs!$B$5.
 */
function inputBlock(ws: ExcelJS.Worksheet, startRow: number, defs: InputDef[]): Record<string, string> {
  const refs: Record<string, string> = {};
  header(ws, startRow, ["Input", "Value", "Unit", "Note / typical range"]);
  defs.forEach((d, i) => {
    const r = startRow + 1 + i;
    ws.getCell(`A${r}`).value = d.label;
    const v = ws.getCell(`B${r}`);
    v.value = d.value;
    if (d.fmt) v.numFmt = d.fmt;
    styleInput(v);
    ws.getCell(`C${r}`).value = d.unit;
    ws.getCell(`D${r}`).value = d.note ?? "";
    ws.getCell(`D${r}`).font = { color: { argb: "FF595959" } };
    refs[d.key] = `'${ws.name}'!$B$${r}`;
  });
  return refs;
}

type CalcDef = { key: string; label: string; formula: string; unit: string; fmt?: string; note?: string };

function calcBlock(ws: ExcelJS.Worksheet, startRow: number, heading: string, defs: CalcDef[], refs: Record<string, string>) {
  header(ws, startRow, [heading, "Value", "Unit", "How it is calculated"]);
  defs.forEach((d, i) => {
    const r = startRow + 1 + i;
    ws.getCell(`A${r}`).value = d.label;
    const v = ws.getCell(`B${r}`);
    v.value = { formula: d.formula };
    if (d.fmt) v.numFmt = d.fmt;
    styleResult(v);
    ws.getCell(`C${r}`).value = d.unit;
    ws.getCell(`D${r}`).value = d.note ?? "";
    ws.getCell(`D${r}`).font = { color: { argb: "FF595959" } };
    refs[d.key] = `'${ws.name}'!$B$${r}`;
  });
}

function readme(wb: ExcelJS.Workbook, heading: string, paragraphs: string[]) {
  const ws = wb.addWorksheet("README", { properties: { tabColor: { argb: "FF1F3864" } } });
  ws.getColumn(1).width = 120;
  ws.getCell("A1").value = heading;
  ws.getCell("A1").font = { bold: true, size: 16, color: { argb: "FF1F3864" } };
  const legend: [string, ExcelJS.Fill][] = [
    ["Yellow cells with blue bold text = INPUTS you may change.", INPUT_FILL],
    ["Green cells = key RESULTS (formulas — do not overwrite).", RESULT_FILL],
  ];
  legend.forEach(([t, f], i) => {
    const c = ws.getCell(`A${3 + i}`);
    c.value = t;
    c.fill = f;
  });
  paragraphs.forEach((p, i) => {
    const c = ws.getCell(`A${6 + i}`);
    c.value = p;
    c.alignment = { wrapText: true, vertical: "top" };
    if (/^[A-Z][A-Z &/-]+:?$/.test(p) || p.startsWith("##")) {
      c.value = p.replace(/^##\s*/, "");
      c.font = { bold: true, color: { argb: "FF1F3864" } };
    }
  });
  return ws;
}

const NOTE_COMMON = [
  "## DISCLAIMER",
  "All numbers are ILLUSTRATIVE teaching values for a generic 1,100 MW PV IPP in Kuwait-like conditions. They are NOT the tariff, capex or terms of any real Shagaya / KAPP project (the Zone 1 tariff has not been published). Replace them with project data before using the model for any decision.",
  "Currency convention: USD for IPP economics, KWD for ministry budgets; assumed 1 KWD = 3.25 USD (change in Inputs where shown).",
];

// ------------------------------------------------------------------ 1. LCOE model

async function lcoeModel() {
  const wb = newBook("LCOE model — utility PV");
  readme(wb, "LCOE model — utility-scale PV (Module 10, Lesson 2)", [
    "## WHAT THIS MODEL DOES",
    "Computes the levelized cost of electricity (LCOE) from first principles: the constant price per kWh whose present value of revenue equals the present value of all costs, NPV(costs) = NPV(energy x LCOE). It therefore solves LCOE = sum[(Capex_t + Opex_t)/(1+r)^t] / sum[E_t/(1+r)^t].",
    "Sheets: Inputs (all assumptions, shaded) -> Calc (annual rows, years 0-40, life switch) -> Results (LCOE in USD/MWh, US cents/kWh and fils/kWh, plus the capital-recovery-factor shortcut) -> Sensitivity (LCOE vs WACC table and a tornado table).",
    "Energy discounting: energy is discounted at the same rate as money. This is not a statement that energy 'earns interest' — it is algebra: moving LCOE (a constant) outside the revenue sum leaves sum[E_t/(1+r)^t].",
    "Timing convention: capex at end of year 0 (= COD, interest during construction already in capex), operating cash flows at the end of years 1..life.",
    "## EXERCISES (see Lesson m10-l07)",
    "1. Base case: confirm LCOE = 1.764 US cents/kWh at 6.2% WACC. Compare with the CRF shortcut (1.634) and explain the gap (degradation and opex escalation).",
    "2. Change WACC to 6.45% and confirm LCOE = 1.800 US cents/kWh — the bid tariff in the project-finance model. Why does LCOE at the project IRR equal a flat tariff?",
    "3. Find the capex (USD m) that brings LCOE to 1.50 US cents/kWh at 6.2% (use Goal Seek on Results LCOE by changing Inputs capex).",
    "4. Fill in the tornado: which variable dominates — capex, yield, WACC or opex? Rank them and explain to a non-financial director in two sentences.",
    "5. Fixed-tilt alternative: specific yield 1,850 kWh/kWp and capex USD 520 m. Is the tracker worth it at 6.2%?",
    ...NOTE_COMMON,
  ]);

  const inp = wb.addWorksheet("Inputs");
  inp.getColumn(1).width = 44; inp.getColumn(2).width = 14; inp.getColumn(3).width = 16; inp.getColumn(4).width = 60;
  title(inp, "Inputs — LCOE model", "Change only the yellow cells.");
  const R = inputBlock(inp, 4, [
    { key: "mwac", label: "Plant AC capacity", value: 1100, unit: "MWac", fmt: "#,##0" },
    { key: "mwp", label: "Plant DC capacity", value: 1430, unit: "MWp", fmt: "#,##0", note: "DC/AC 1.2–1.35 typical for trackers in the Gulf" },
    { key: "sy", label: "Specific yield, year 1 (P50)", value: 2100, unit: "kWh/kWp/yr", fmt: "#,##0", note: "Single-axis bifacial, Kuwait-like: ~1,950–2,250; fixed tilt ~1,750–1,900" },
    { key: "deg", label: "Annual degradation (from year 2)", value: 0.004, unit: "%/yr", fmt: "0.00%", note: "0.3–0.5 %/yr n-type; check module warranty" },
    { key: "capex", label: "Total capex at COD (incl. IDC, dev, grid)", value: 560, unit: "USD m", fmt: "#,##0.0", note: "See Lesson 3 breakdown" },
    { key: "opex", label: "Opex, year 1 (O&M, cleaning, insurance, SPV)", value: 7.5, unit: "USD m/yr", fmt: "#,##0.00", note: "USD 5–9/kWac/yr in Gulf benchmarks" },
    { key: "esc", label: "Opex escalation", value: 0.02, unit: "%/yr", fmt: "0.00%" },
    { key: "wacc", label: "Discount rate (nominal WACC)", value: 0.062, unit: "%/yr", fmt: "0.00%", note: "Must match the cash-flow basis: nominal with nominal, real with real" },
    { key: "life", label: "Economic life / PPA term", value: 30, unit: "years", fmt: "0", note: "Max 40 in this sheet" },
    { key: "fx", label: "Exchange rate", value: 3.25, unit: "USD per KWD", fmt: "0.000" },
  ]);
  calcBlock(inp, 17, "Derived", [
    { key: "dcac", label: "DC/AC ratio", formula: `${R.mwp}/${R.mwac}`, unit: "–", fmt: "0.00" },
    { key: "e1", label: "Energy year 1", formula: `${R.mwp}*${R.sy}/1000`, unit: "GWh", fmt: "#,##0.0", note: "MWp x kWh/kWp / 1000" },
    { key: "cf", label: "Capacity factor (AC basis)", formula: `(${R.mwp}*${R.sy}/1000)/(${R.mwac}*8.76)`, unit: "%", fmt: "0.0%", note: "E / (P_AC x 8,760 h)" },
    { key: "cwp", label: "Capex per Wp (DC)", formula: `${R.capex}/${R.mwp}`, unit: "USD/Wp", fmt: "0.000" },
    { key: "ckw", label: "Capex per kWac", formula: `${R.capex}*1000/${R.mwac}`, unit: "USD/kWac", fmt: "#,##0" },
  ], R);

  const calc = wb.addWorksheet("Calc");
  title(calc, "Annual calculation (do not edit)", "Rows: year 0 (capex) to year 40; the life switch zeroes years beyond the economic life.");
  header(calc, 4, ["Year", "Operating flag", "Energy (GWh)", "Opex (USD m)", "Capex (USD m)", "Discount factor", "PV energy (GWh)", "PV cost (USD m)"]);
  [8, 10, 13, 13, 13, 13, 15, 15].forEach((w, i) => (calc.getColumn(i + 1).width = w));
  const first = 5, last = 45;
  for (let y = 0; y <= 40; y++) {
    const r = first + y;
    calc.getCell(`A${r}`).value = y;
    calc.getCell(`B${r}`).value = { formula: `IF(AND(A${r}>=1,A${r}<=${R.life}),1,0)` };
    calc.getCell(`C${r}`).value = { formula: `B${r}*${R.e1}*(1-${R.deg})^(A${r}-1)` };
    calc.getCell(`D${r}`).value = { formula: `B${r}*${R.opex}*(1+${R.esc})^(A${r}-1)` };
    calc.getCell(`E${r}`).value = { formula: `IF(A${r}=0,${R.capex},0)` };
    calc.getCell(`F${r}`).value = { formula: `1/(1+${R.wacc})^A${r}` };
    calc.getCell(`G${r}`).value = { formula: `C${r}*F${r}` };
    calc.getCell(`H${r}`).value = { formula: `(D${r}+E${r})*F${r}` };
    ["C", "D", "E", "G", "H"].forEach((c) => (calc.getCell(`${c}${r}`).numFmt = "#,##0.00"));
    calc.getCell(`F${r}`).numFmt = "0.0000";
  }
  calc.getCell(`A${last + 1}`).value = "Total";
  calc.getCell(`A${last + 1}`).font = { bold: true };
  ["C", "D", "E", "G", "H"].forEach((c) => {
    const cell = calc.getCell(`${c}${last + 1}`);
    cell.value = { formula: `SUM(${c}${first}:${c}${last})` };
    cell.numFmt = "#,##0.0";
    styleResult(cell);
  });
  calc.views = [{ state: "frozen", ySplit: 4 }];

  const res = wb.addWorksheet("Results");
  res.getColumn(1).width = 44; res.getColumn(2).width = 14; res.getColumn(3).width = 16; res.getColumn(4).width = 70;
  title(res, "Results — LCOE", "LCOE = PV(costs) / PV(energy)");
  const range = (c: string) => `Calc!$${c}$${first}:$${c}$${last}`;
  calcBlock(res, 4, "Result", [
    { key: "pvc", label: "PV of costs (capex + opex)", formula: `Calc!H${last + 1}`, unit: "USD m", fmt: "#,##0.0" },
    { key: "pve", label: "PV of energy ('discounted GWh')", formula: `Calc!G${last + 1}`, unit: "GWh", fmt: "#,##0.0" },
    { key: "lcoe_kwh", label: "LCOE", formula: `B5/B6`, unit: "USD/kWh", fmt: "0.00000", note: "USD m / GWh = USD/kWh" },
    { key: "lcoe_mwh", label: "LCOE", formula: `B7*1000`, unit: "USD/MWh", fmt: "0.00" },
    { key: "lcoe_c", label: "LCOE", formula: `B7*100`, unit: "US cents/kWh", fmt: "0.000" },
    { key: "lcoe_f", label: "LCOE", formula: `B7/${R.fx}*1000`, unit: "fils/kWh", fmt: "0.00", note: "1 KWD = 1,000 fils" },
  ], R);
  calcBlock(res, 12, "CRF shortcut (no degradation, flat opex)", [
    { key: "crf", label: "Capital recovery factor", formula: `${R.wacc}*(1+${R.wacc})^${R.life}/((1+${R.wacc})^${R.life}-1)`, unit: "1/yr", fmt: "0.00000", note: "CRF = r(1+r)^n / ((1+r)^n - 1)" },
    { key: "acc", label: "Annualised capital charge", formula: `${R.capex}*B13`, unit: "USD m/yr", fmt: "#,##0.00" },
    { key: "lcoe_crf", label: "Simple LCOE = (Capex x CRF + Opex1)/E1", formula: `(B14+${R.opex})/${R.e1}*100`, unit: "US cents/kWh", fmt: "0.000", note: "Understates true LCOE when output degrades and opex escalates" },
    { key: "lev_e", label: "Levelized (annuity-equivalent) energy", formula: `B6*B13`, unit: "GWh/yr", fmt: "#,##0.0" },
    { key: "lev_o", label: "Levelized opex", formula: `(B5-${R.capex})*B13`, unit: "USD m/yr", fmt: "#,##0.00" },
    { key: "lcoe_chk", label: "Exact LCOE via levelized terms (check)", formula: `(B14+B17)/B16*100`, unit: "US cents/kWh", fmt: "0.000", note: "Must equal B9" },
  ], R);

  const sen = wb.addWorksheet("Sensitivity");
  sen.getColumn(1).width = 34; for (let c = 2; c <= 7; c++) sen.getColumn(c).width = 16;
  title(sen, "Sensitivity — LCOE vs WACC and tornado", "Each cell recomputes the full discounted sum with SUMPRODUCT (no data tables needed).");
  header(sen, 4, ["WACC", "LCOE (US cents/kWh)"]);
  const years = range("A"), flag = range("B"), opexR = range("D");
  const lcoeExpr = (capexF: string, yieldF: string, opexF: string, r: string, d: string) =>
    `(${R.capex}*${capexF}+${opexF}*SUMPRODUCT(${opexR},1/(1+${r})^${years}))/(${yieldF}*SUMPRODUCT(${flag}*${R.e1}*(1-${d})^(${years}-1),1/(1+${r})^${years}))*100`;
  const waccs = [0.04, 0.05, 0.055, 0.06, 0.062, 0.065, 0.07, 0.08, 0.09, 0.1];
  waccs.forEach((w, i) => {
    const r = 5 + i;
    const a = sen.getCell(`A${r}`); a.value = w; a.numFmt = "0.00%"; styleInput(a);
    const b = sen.getCell(`B${r}`); b.value = { formula: lcoeExpr("1", "1", "1", `A${r}`, R.deg) }; b.numFmt = "0.000"; styleResult(b);
  });
  const t0 = 17;
  sen.getCell(`A${t0 - 1}`).value = "Tornado (one variable at a time; others at base)";
  sen.getCell(`A${t0 - 1}`).font = { bold: true };
  header(sen, t0, ["Variable", "Low case", "High case", "LCOE at low", "LCOE at high", "Swing (abs)"]);
  type T = { name: string; lo: number; hi: number; fmt: string; f: (x: string) => string };
  const tor: T[] = [
    { name: "Capex (multiplier)", lo: 0.9, hi: 1.1, fmt: "0.00", f: (x) => lcoeExpr(x, "1", "1", R.wacc, R.deg) },
    { name: "Specific yield (multiplier)", lo: 1.1, hi: 0.9, fmt: "0.00", f: (x) => lcoeExpr("1", x, "1", R.wacc, R.deg) },
    { name: "WACC (absolute)", lo: 0.052, hi: 0.072, fmt: "0.00%", f: (x) => lcoeExpr("1", "1", "1", x, R.deg) },
    { name: "Opex (multiplier)", lo: 0.8, hi: 1.2, fmt: "0.00", f: (x) => lcoeExpr("1", "1", x, R.wacc, R.deg) },
    { name: "Degradation (absolute)", lo: 0.0025, hi: 0.007, fmt: "0.00%", f: (x) => lcoeExpr("1", "1", "1", R.wacc, x) },
  ];
  tor.forEach((t, i) => {
    const r = t0 + 1 + i;
    sen.getCell(`A${r}`).value = t.name;
    const lo = sen.getCell(`B${r}`); lo.value = t.lo; lo.numFmt = t.fmt; styleInput(lo);
    const hi = sen.getCell(`C${r}`); hi.value = t.hi; hi.numFmt = t.fmt; styleInput(hi);
    const dl = sen.getCell(`D${r}`); dl.value = { formula: t.f(`B${r}`) }; dl.numFmt = "0.000";
    const dh = sen.getCell(`E${r}`); dh.value = { formula: t.f(`C${r}`) }; dh.numFmt = "0.000";
    const sw = sen.getCell(`F${r}`); sw.value = { formula: `ABS(E${r}-D${r})` }; sw.numFmt = "0.000"; styleResult(sw);
  });
  sen.getCell(`A${t0 + 7}`).value = "Exercise: sort the rows by Swing (largest first) and draw the tornado as a bar chart (Insert > Bar chart, low and high LCOE minus base).";
  await wb.xlsx.writeFile(path.join(OUT, "lcoe-model.xlsx"));
}

// ------------------------------------------------------------------ 2. Project finance model

async function projectFinanceModel() {
  const wb = newBook("Project finance model — PV IPP");
  readme(wb, "Project finance model — 1,100 MW PV IPP (Module 10, Lesson 4)", [
    "## WHAT THIS MODEL DOES",
    "A simplified annual lenders'-style model of a solar IPP special purpose vehicle (SPV) selling all output to MEWRE under a 30-year PPA. It builds CFADS (cash flow available for debt service), sizes senior debt by DSCR sculpting subject to a gearing cap, and reports DSCR, LLCR, PLCR, project IRR, equity IRR, NPVs and payback.",
    "Sheets: Inputs -> CashFlow (years 0..40) -> Summary.",
    "Debt sizing logic: target debt service in each loan year = CFADS / target DSCR. The sculpted debt capacity is the present value of that target debt service at the debt interest rate. Debt = MIN(sculpted capacity, max gearing x capex). If the gearing cap binds, actual debt service is scaled down proportionally, so the achieved DSCR is above target.",
    "Simplifications (state them when you present results): no corporate tax, no working capital, no construction-period monthly model (capex incl. IDC is a single year-0 amount), no DSRA cash trapping (the DSRA target is shown for information), no lock-up/cash sweep, P50 energy only. A real lenders' model is monthly/semi-annual and audited by a model auditor.",
    "## EXERCISES (see Lesson m10-l07)",
    "1. Base case at 1.80 US cents/kWh: confirm debt USD 448.0 m (gearing cap binding), min DSCR 1.287x, project IRR 6.45%, equity IRR 8.97%.",
    "2. Raise max gearing to 90%. Which constraint binds now? What happens to equity IRR and why?",
    "3. Set tariff to 1.44 US cents/kWh (an 'aggressive' bid 20% below 1.80). Record equity IRR. What capex would the bidder need for a 9% equity IRR (Goal Seek)?",
    "4. Run a P90 case: reduce specific yield by 7% but keep the debt sized on P50 (copy the debt amount as a value into a new input). What is the minimum DSCR? Would a 1.10x lock-up covenant trip?",
    "5. Add a 0.5%/yr tariff indexation (Inputs). Record equity IRR (about 11.2%) and minimum DSCR (about 1.36x). Why does indexation raise both while the gearing cap still binds? What would the offtaker pay for it in levelized terms (use tariff-bid-evaluation.xlsx)?",
    ...NOTE_COMMON,
  ]);
  const inp = wb.addWorksheet("Inputs");
  inp.getColumn(1).width = 44; inp.getColumn(2).width = 14; inp.getColumn(3).width = 16; inp.getColumn(4).width = 62;
  title(inp, "Inputs — project finance model", "Illustrative base case; change only yellow cells.");
  const R = inputBlock(inp, 4, [
    { key: "mwac", label: "Plant AC capacity", value: 1100, unit: "MWac", fmt: "#,##0" },
    { key: "mwp", label: "Plant DC capacity", value: 1430, unit: "MWp", fmt: "#,##0" },
    { key: "sy", label: "Specific yield, year 1 (P50)", value: 2100, unit: "kWh/kWp/yr", fmt: "#,##0" },
    { key: "deg", label: "Degradation (from year 2)", value: 0.004, unit: "%/yr", fmt: "0.00%" },
    { key: "tariff", label: "PPA tariff, year 1", value: 1.8, unit: "US cents/kWh", fmt: "0.000", note: "Illustrative — NOT a real Kuwait tariff" },
    { key: "tesc", label: "Tariff indexation", value: 0, unit: "%/yr", fmt: "0.00%", note: "Gulf solar PPAs are often flat in USD terms" },
    { key: "capex", label: "Total capex at COD (incl. IDC, fees, DSRA excl.)", value: 560, unit: "USD m", fmt: "#,##0.0" },
    { key: "opex", label: "Opex, year 1", value: 7.5, unit: "USD m/yr", fmt: "#,##0.00" },
    { key: "oesc", label: "Opex escalation", value: 0.02, unit: "%/yr", fmt: "0.00%" },
    { key: "life", label: "PPA term / model life", value: 30, unit: "years", fmt: "0", note: "Kuwait solar IPPs: 30-year PPA (pv magazine, 2025-06-16)" },
    { key: "rd", label: "All-in senior debt interest rate", value: 0.055, unit: "%/yr", fmt: "0.00%", note: "Base rate + swap + margin" },
    { key: "tenor", label: "Debt tenor after COD", value: 25, unit: "years", fmt: "0", note: "Must leave a tail: tenor < PPA term" },
    { key: "dscr", label: "Target (sizing) DSCR on P50", value: 1.25, unit: "x", fmt: "0.00", note: "Contracted solar with strong offtaker: ~1.20–1.35x" },
    { key: "gmax", label: "Maximum gearing (debt / capex)", value: 0.8, unit: "%", fmt: "0.0%", note: "Typical 70–85% for Gulf solar IPPs" },
    { key: "ke", label: "Cost of equity (sponsor hurdle)", value: 0.09, unit: "%/yr", fmt: "0.00%" },
    { key: "wacc", label: "Discount rate for project NPV (WACC)", value: 0.062, unit: "%/yr", fmt: "0.00%", note: "= 20% x 9% + 80% x 5.5% (no tax)" },
    { key: "dsra", label: "DSRA requirement", value: 6, unit: "months of DS", fmt: "0" },
  ]);
  calcBlock(inp, 24, "Derived", [
    { key: "e1", label: "Energy year 1", formula: `${R.mwp}*${R.sy}/1000`, unit: "GWh", fmt: "#,##0.0" },
    { key: "cf", label: "Capacity factor (AC)", formula: `(${R.mwp}*${R.sy}/1000)/(${R.mwac}*8.76)`, unit: "%", fmt: "0.0%" },
  ], R);

  const cf = wb.addWorksheet("CashFlow");
  title(cf, "Annual cash flow (USD m) — formulas only", "Year 0 = COD (capex spent, debt drawn, equity injected).");
  const heads = ["Year", "Op flag", "Loan flag", "Energy (GWh)", "Tariff (USc/kWh)", "Revenue", "Opex", "CFADS", "Target DS (CFADS/DSCR)", "Debt DF", "PV target DS", "Opening debt", "Interest", "Debt service", "Principal", "Closing debt", "DSCR (x)", "DSRA target", "Project CF", "Equity CF", "Cum. project CF", "Payback helper"];
  header(cf, 4, heads);
  heads.forEach((_, i) => (cf.getColumn(i + 1).width = i === 0 ? 7 : 12));
  const f0 = 5, fN = 45; // years 0..40
  // Summary rows are fixed below (debt in B6, scale factor in B8); CashFlow references them.
  const SUMROW: Record<string, number> = { debt: 6, scale: 8 };
  const S = (k: string) => `Summary!$B$${SUMROW[k]}`;
  for (let y = 0; y <= 40; y++) {
    const r = f0 + y;
    const prev = r - 1;
    const set = (c: string, f: string, fmt = "#,##0.00") => {
      const cell = cf.getCell(`${c}${r}`);
      cell.value = { formula: f };
      cell.numFmt = fmt;
    };
    cf.getCell(`A${r}`).value = y;
    set("B", `IF(AND(A${r}>=1,A${r}<=${R.life}),1,0)`, "0");
    set("C", `IF(AND(A${r}>=1,A${r}<=${R.tenor}),1,0)`, "0");
    set("D", `B${r}*${R.e1}*(1-${R.deg})^(A${r}-1)`, "#,##0.0");
    set("E", `B${r}*${R.tariff}*(1+${R.tesc})^(A${r}-1)`, "0.0000");
    set("F", `D${r}*E${r}/100`);
    set("G", `B${r}*${R.opex}*(1+${R.oesc})^(A${r}-1)`);
    set("H", `F${r}-G${r}`);
    set("I", `C${r}*H${r}/${R.dscr}`);
    set("J", `1/(1+${R.rd})^A${r}`, "0.0000");
    set("K", `I${r}*J${r}`);
    set("L", y === 0 ? "0" : y === 1 ? `${S("debt")}` : `P${prev}`);
    set("M", `C${r}*L${r}*${R.rd}`);
    set("N", `I${r}*${S("scale")}`);
    set("O", `N${r}-M${r}`);
    set("P", y === 0 ? `${S("debt")}` : `L${r}-O${r}`);
    set("Q", `IF(N${r}>0,H${r}/N${r},"")`, "0.000");
    set("R", y === 40 ? "0" : `N${r + 1}*${R.dsra}/12`);
    set("S", y === 0 ? `-${R.capex}` : `H${r}`);
    set("T", y === 0 ? `-(${R.capex}-${S("debt")})` : `H${r}-N${r}`);
    set("U", y === 0 ? `S${r}` : `U${prev}+S${r}`);
    set("V", y === 0 ? `0` : `IF(AND(U${prev}<0,U${r}>=0),A${prev}-U${prev}/S${r},0)`, "0.00");
  }
  cf.views = [{ state: "frozen", ySplit: 4, xSplit: 1 }];
  const tot = fN + 1;
  cf.getCell(`A${tot}`).value = "Total";
  ["D", "F", "G", "H", "M", "N", "O", "T"].forEach((c) => {
    const cell = cf.getCell(`${c}${tot}`);
    cell.value = { formula: `SUM(${c}${f0 + 1}:${c}${fN})` };
    cell.numFmt = "#,##0.0";
    styleResult(cell);
  });

  const sm = wb.addWorksheet("Summary");
  sm.getColumn(1).width = 48; sm.getColumn(2).width = 14; sm.getColumn(3).width = 14; sm.getColumn(4).width = 70;
  title(sm, "Summary — debt sizing, cover ratios and returns");
  const rg = (c: string, a = f0, b = fN) => `CashFlow!$${c}$${a}:$${c}$${b}`;
  const refs: Record<string, string> = {};
  calcBlock(sm, 4, "Debt sizing", [
    { key: "sculpt", label: "Sculpted debt capacity = PV(CFADS/DSCR) at debt rate", formula: `SUM(${rg("K")})`, unit: "USD m", fmt: "#,##0.0" },
    { key: "debt", label: "Senior debt = MIN(sculpted, gearing cap)", formula: `MIN(B5,${R.gmax}*${R.capex})`, unit: "USD m", fmt: "#,##0.0" },
    { key: "gcap", label: "Gearing-cap debt = max gearing x capex", formula: `${R.gmax}*${R.capex}`, unit: "USD m", fmt: "#,##0.0" },
    { key: "scale", label: "Debt-service scale factor = debt / sculpted", formula: `B6/B5`, unit: "–", fmt: "0.0000" },
    { key: "bind", label: "Binding constraint", formula: `IF(B5<=B7,"DSCR (sculpting)","Gearing cap")`, unit: "", fmt: "@" },
    { key: "gear", label: "Achieved gearing", formula: `B6/${R.capex}`, unit: "%", fmt: "0.0%" },
    { key: "eq", label: "Equity at COD", formula: `${R.capex}-B6`, unit: "USD m", fmt: "#,##0.0" },
    { key: "chk", label: "Check: debt repaid (sum of principal - debt)", formula: `SUM(${rg("O")})-B6`, unit: "USD m", fmt: "0.000", note: "Must be 0.000" },
  ], refs);
  calcBlock(sm, 14, "Cover ratios", [
    { key: "mind", label: "Minimum DSCR", formula: `MIN(${rg("Q")})`, unit: "x", fmt: "0.000" },
    { key: "avgd", label: "Average DSCR", formula: `AVERAGE(${rg("Q")})`, unit: "x", fmt: "0.000" },
    { key: "llcr", label: "LLCR at COD = PV(CFADS over loan life)/debt", formula: `SUMPRODUCT(${rg("H")}*${rg("C")},${rg("J")})/B6`, unit: "x", fmt: "0.000" },
    { key: "plcr", label: "PLCR at COD = PV(CFADS over project life)/debt", formula: `SUMPRODUCT(${rg("H")}*${rg("B")},${rg("J")})/B6`, unit: "x", fmt: "0.000" },
    { key: "dsra0", label: "DSRA target at COD (funded by equity/LC)", formula: `CashFlow!R${f0}`, unit: "USD m", fmt: "#,##0.0" },
  ], refs);
  calcBlock(sm, 21, "Returns", [
    { key: "pirr", label: "Project IRR (unlevered, pre-tax)", formula: `IRR(${rg("S")})`, unit: "%", fmt: "0.00%" },
    { key: "eirr", label: "Equity IRR", formula: `IRR(${rg("T")})`, unit: "%", fmt: "0.00%" },
    { key: "pnpv", label: "Project NPV at WACC", formula: `CashFlow!S${f0}+NPV(${R.wacc},CashFlow!S${f0 + 1}:S${fN})`, unit: "USD m", fmt: "#,##0.0" },
    { key: "enpv", label: "Equity NPV at cost of equity", formula: `CashFlow!T${f0}+NPV(${R.ke},CashFlow!T${f0 + 1}:T${fN})`, unit: "USD m", fmt: "#,##0.0" },
    { key: "pb", label: "Simple payback (project)", formula: `SUM(${rg("V")})`, unit: "years", fmt: "0.00" },
    { key: "rev1", label: "Revenue year 1", formula: `CashFlow!F${f0 + 1}`, unit: "USD m", fmt: "#,##0.00" },
    { key: "cfads1", label: "CFADS year 1", formula: `CashFlow!H${f0 + 1}`, unit: "USD m", fmt: "#,##0.00" },
  ], refs);
  await wb.xlsx.writeFile(path.join(OUT, "project-finance-model.xlsx"));
}

// ------------------------------------------------------------------ 3. EVM tracker

async function evmTracker() {
  const wb = newBook("EVM tracker");
  readme(wb, "Earned value tracker — monthly (Module 10, Lesson 6; Module 8 EVM)", [
    "## WHAT THIS MODEL DOES",
    "Tracks a contract or programme budget monthly with earned value management: PV (planned value), EV (earned value) and AC (actual cost) cumulative, and computes CV, SV, CPI, SPI, three EAC methods, ETC, VAC and TCPI. Example: a KWD 45.0 m grid-connection EPC package, 24 months, status at month 12.",
    "Sheets: Inputs (BAC, status month) -> Monthly (enter planned % and cumulative EV and AC each month) -> Status (dashboard at the status month) -> Guidance.",
    "Owner-side caution: on a lump-sum FIDIC contract MEWRE's cost is the Contract Price plus variations and claims, not the contractor's internal cost. Use AC = amounts certified (or accrued) for the Employer's view, and keep a separate forecast of variations and claims (see cashflow-forecast.xlsx, Contingency sheet).",
    "## EXERCISES",
    "1. Read the Status sheet at month 12: CPI 0.934, SPI 0.880. Which EAC method would you report to the Undersecretary, and why?",
    "2. Change the status month to 9. How have CPI and SPI trended? Is the trend or the point value more informative?",
    "3. Enter your own EV and AC for months 13–15 assuming the contractor recovers (CPI 0.95, SPI 0.95). Recompute TCPI.",
    "4. Plot PV, EV and AC (Insert > Line chart on Monthly columns C, E, F) and annotate CV and SV at the status date.",
    ...NOTE_COMMON,
  ]);
  const inp = wb.addWorksheet("Inputs");
  inp.getColumn(1).width = 40; inp.getColumn(2).width = 14; inp.getColumn(3).width = 14; inp.getColumn(4).width = 60;
  title(inp, "Inputs — EVM tracker");
  const R = inputBlock(inp, 4, [
    { key: "bac", label: "Budget at completion (BAC)", value: 45.0, unit: "KWD m", fmt: "#,##0.000" },
    { key: "status", label: "Status month", value: 12, unit: "month no.", fmt: "0", note: "1–24" },
    { key: "dur", label: "Planned duration", value: 24, unit: "months", fmt: "0" },
  ]);
  const mo = wb.addWorksheet("Monthly");
  title(mo, "Monthly EVM table", "Enter planned cumulative %, EV cumulative and AC cumulative (yellow). Leave EV/AC blank for future months.");
  const h = ["Month", "Planned cum. %", "PV cum. (KWD m)", "EV cum. % complete", "EV cum. (KWD m)", "AC cum. (KWD m)", "CV = EV-AC", "SV = EV-PV", "CPI = EV/AC", "SPI = EV/PV", "EAC1 = BAC/CPI", "EAC2 = AC+(BAC-EV)", "EAC3 = AC+(BAC-EV)/(CPI*SPI)", "ETC = EAC1-AC", "VAC = BAC-EAC1", "TCPI = (BAC-EV)/(BAC-AC)"];
  header(mo, 4, h);
  h.forEach((_, i) => (mo.getColumn(i + 1).width = i === 0 ? 8 : 13));
  const T = 24;
  for (let m = 1; m <= T; m++) {
    const r = 4 + m;
    const pct = (1 - Math.cos((Math.PI * m) / T)) / 2;
    mo.getCell(`A${r}`).value = m;
    const p = mo.getCell(`B${r}`); p.value = Math.round(pct * 10000) / 10000; p.numFmt = "0.00%"; styleInput(p);
    mo.getCell(`C${r}`).value = { formula: `B${r}*${R.bac}` };
    if (m <= 12) {
      // Sample data: EV drifts to 88% of PV and CPI to 0.934 by month 12 (exact: EV 19.800, AC 21.200).
      const pv = 45 * pct;
      const ev = m === 12 ? 19.8 : Math.round(pv * (1 - 0.12 * (m / 12)) * 1000) / 1000;
      const cpi = 1 - (1 - 19.8 / 21.2) * (m / 12);
      const ac = m === 12 ? 21.2 : Math.round((ev / cpi) * 1000) / 1000;
      const e = mo.getCell(`E${r}`); e.value = ev; styleInput(e);
      const a = mo.getCell(`F${r}`); a.value = ac; styleInput(a);
    } else {
      styleInput(mo.getCell(`E${r}`));
      styleInput(mo.getCell(`F${r}`));
    }
    const g = (c: string, f: string, fmt = "#,##0.000") => {
      const cell = mo.getCell(`${c}${r}`);
      cell.value = { formula: f };
      cell.numFmt = fmt;
    };
    g("D", `IF(E${r}="","",E${r}/${R.bac})`, "0.0%");
    g("G", `IF(E${r}="","",E${r}-F${r})`);
    g("H", `IF(E${r}="","",E${r}-C${r})`);
    g("I", `IF(E${r}="","",E${r}/F${r})`, "0.000");
    g("J", `IF(E${r}="","",E${r}/C${r})`, "0.000");
    g("K", `IF(E${r}="","",${R.bac}/I${r})`);
    g("L", `IF(E${r}="","",F${r}+${R.bac}-E${r})`);
    g("M", `IF(E${r}="","",F${r}+(${R.bac}-E${r})/(I${r}*J${r}))`);
    g("N", `IF(E${r}="","",K${r}-F${r})`);
    g("O", `IF(E${r}="","",${R.bac}-K${r})`);
    g("P", `IF(E${r}="","",(${R.bac}-E${r})/(${R.bac}-F${r}))`, "0.000");
    for (const c of ["C"]) mo.getCell(`${c}${r}`).numFmt = "#,##0.000";
  }
  mo.views = [{ state: "frozen", ySplit: 4, xSplit: 1 }];

  const st = wb.addWorksheet("Status");
  st.getColumn(1).width = 40; st.getColumn(2).width = 14; st.getColumn(3).width = 12; st.getColumn(4).width = 70;
  title(st, "Status at the selected month");
  const idx = (col: string) => `INDEX(Monthly!$${col}$5:$${col}$28,${R.status})`;
  calcBlock(st, 4, "Indicator", [
    { key: "pv", label: "PV (planned value, cumulative)", formula: idx("C"), unit: "KWD m", fmt: "#,##0.000" },
    { key: "ev", label: "EV (earned value, cumulative)", formula: idx("E"), unit: "KWD m", fmt: "#,##0.000" },
    { key: "ac", label: "AC (actual cost, cumulative)", formula: idx("F"), unit: "KWD m", fmt: "#,##0.000" },
    { key: "cv", label: "Cost variance CV", formula: idx("G"), unit: "KWD m", fmt: "#,##0.000", note: "Negative = over cost for the work done" },
    { key: "sv", label: "Schedule variance SV", formula: idx("H"), unit: "KWD m", fmt: "#,##0.000", note: "Negative = behind plan (in money terms)" },
    { key: "cpi", label: "CPI", formula: idx("I"), unit: "–", fmt: "0.000", note: "<0.95 sustained = escalate" },
    { key: "spi", label: "SPI", formula: idx("J"), unit: "–", fmt: "0.000", note: "SPI tends to 1.0 at the end even if late — use time-based SPI(t) or the CPM schedule as well" },
    { key: "eac1", label: "EAC1 = BAC/CPI (typical)", formula: idx("K"), unit: "KWD m", fmt: "#,##0.000" },
    { key: "eac2", label: "EAC2 = AC + (BAC-EV) (atypical, one-off)", formula: idx("L"), unit: "KWD m", fmt: "#,##0.000" },
    { key: "eac3", label: "EAC3 = AC + (BAC-EV)/(CPI x SPI) (schedule pressure)", formula: idx("M"), unit: "KWD m", fmt: "#,##0.000" },
    { key: "tcpi", label: "TCPI (to complete within BAC)", formula: idx("P"), unit: "–", fmt: "0.000", note: ">1.10 is rarely achieved in practice" },
    { key: "verdict", label: "Flag", formula: `IF(AND(B10<0.95,B11<0.95),"RED: cost and schedule",IF(OR(B10<0.95,B11<0.95),"AMBER","GREEN"))`, unit: "", fmt: "@" },
  ], R);

  const gd = wb.addWorksheet("Guidance");
  gd.getColumn(1).width = 120;
  [
    "GUIDANCE — reading EVM on a ministry project",
    "1. PV comes from the baseline programme (resource-loaded P6 schedule or the payment S-curve). Freeze it at contract award; re-baseline only through formal change control.",
    "2. EV must be measured, not estimated: use measured quantities x BoQ rates (remeasured contracts) or the agreed milestone/progress-weighting system (lump sum). Weighting rules belong in the contract's progress measurement procedure.",
    "3. AC for the Employer = certified IPC value (plus owner's costs if tracking a programme). For a contractor, AC = its own cost; never mix the two bases in one CPI.",
    "4. CPI < 0.95 or SPI < 0.95 for two consecutive months: ask for a recovery plan and update the cash-flow forecast and the budget request.",
    "5. EAC choice: BAC/CPI when the cause is systemic (productivity, rates); AC + (BAC-EV) when the overrun was a one-off (e.g. a single repaired foundation); CPI x SPI when the client is forcing acceleration.",
    "6. Report EAC with a range (best / most likely / worst) and connect it to contingency remaining. A single number invites false confidence.",
  ].forEach((t, i) => {
    const c = gd.getCell(`A${1 + i}`);
    c.value = t;
    c.alignment = { wrapText: true };
    if (i === 0) c.font = { bold: true, size: 13 };
  });
  await wb.xlsx.writeFile(path.join(OUT, "evm-tracker.xlsx"));
}

// ------------------------------------------------------------------ 4. Tariff bid evaluation

async function tariffEval() {
  const wb = newBook("Tariff bid evaluation");
  readme(wb, "Tariff bid evaluation — levelized tariff comparison (Module 10, Lesson 5)", [
    "## WHAT THIS MODEL DOES",
    "Compares IPP tariff bids that have different shapes (flat, indexed, front-loaded) on one basis: the levelized tariff LT = sum(T_t x E_t x DF_t) / sum(E_t x DF_t), i.e. the flat tariff that would cost the offtaker the same present value for the same energy. It also shows the present value of payments, ranking at three discount rates, a combined financial/technical score and an 'aggressive bid' flag (deviation from the median levelized tariff).",
    "Sheets: Inputs (evaluation parameters) -> Bids (each bidder's tariff structure, yellow) -> Calc (annual tariffs and discount factors) -> Results.",
    "Evaluation basis is set by the RFP: discount rate, energy profile and whether escalation indices are converted at an assumed rate must be published to bidders BEFORE bids are opened. Changing them afterwards is a procurement-integrity issue.",
    "The 70/30 financial/technical weighting here is ILLUSTRATIVE only. Many Gulf IPP tenders use pass/fail technical compliance followed by lowest levelized tariff; check the actual RFP evaluation criteria.",
    "## EXERCISES",
    "1. At a 7% evaluation rate the ranking is C, A, D, B. Change the main rate to 4% and to 10%. Which pair swaps, and why does front-loading (bid D) win at low rates?",
    "2. Bid C is 20% below the median: list five questions you would put in a clarification letter before any recommendation.",
    "3. Change Bid B's escalation to 1.0%/yr. What base tariff would make B equal to A at 7%?",
    "4. Weighting: change the technical weight to 0 (pure price). Does the winner change?",
    ...NOTE_COMMON,
  ]);
  const inp = wb.addWorksheet("Inputs");
  inp.getColumn(1).width = 44; inp.getColumn(2).width = 14; inp.getColumn(3).width = 14; inp.getColumn(4).width = 60;
  title(inp, "Inputs — evaluation parameters");
  const R = inputBlock(inp, 4, [
    { key: "d", label: "Evaluation discount rate (main)", value: 0.07, unit: "%/yr", fmt: "0.00%", note: "Published in the RFP" },
    { key: "d2", label: "Alternative rate 1 (sensitivity)", value: 0.04, unit: "%/yr", fmt: "0.00%" },
    { key: "d3", label: "Alternative rate 2 (sensitivity)", value: 0.1, unit: "%/yr", fmt: "0.00%" },
    { key: "e1", label: "Contract energy year 1 (P50, same for all bids)", value: 3003, unit: "GWh", fmt: "#,##0" },
    { key: "deg", label: "Energy degradation profile", value: 0.004, unit: "%/yr", fmt: "0.00%" },
    { key: "term", label: "PPA term", value: 30, unit: "years", fmt: "0" },
    { key: "wf", label: "Financial weight", value: 0.7, unit: "%", fmt: "0%", note: "Illustrative" },
    { key: "wt", label: "Technical weight", value: 0.3, unit: "%", fmt: "0%" },
    { key: "agg", label: "Aggressive-bid threshold (below median)", value: -0.15, unit: "%", fmt: "0%", note: "Triggers abnormally-low-bid clarification" },
  ]);
  const bids = wb.addWorksheet("Bids");
  title(bids, "Bids — tariff structures (yellow = from bid forms)");
  header(bids, 4, ["Bidder", "Tariff yr 1 (USc/kWh)", "Indexation (%/yr)", "Step after year", "Tariff after step (USc/kWh)", "Technical score (0–100)"]);
  [14, 16, 14, 14, 18, 16].forEach((w, i) => (bids.getColumn(i + 1).width = w));
  const B = [
    ["Bid A (flat)", 1.8, 0, 30, 1.8, 82],
    ["Bid B (indexed)", 1.62, 0.015, 30, 1.62, 85],
    ["Bid C (aggressive)", 1.44, 0, 30, 1.44, 74],
    ["Bid D (front-loaded)", 1.95, 0, 10, 1.65, 88],
  ] as const;
  B.forEach((b, i) => {
    const r = 5 + i;
    bids.getCell(`A${r}`).value = b[0];
    ([1, 2, 3, 4, 5] as const).forEach((k) => {
      const c = bids.getRow(r).getCell(k + 1);
      c.value = b[k];
      c.numFmt = k === 2 ? "0.00%" : k === 3 || k === 5 ? "0" : "0.000";
      styleInput(c);
    });
  });
  const calc = wb.addWorksheet("Calc");
  title(calc, "Annual tariffs, energy and discount factors (formulas)");
  header(calc, 4, ["Year", "Flag", "Energy (GWh)", "DF main", "DF alt1", "DF alt2", "Tariff A", "Tariff B", "Tariff C", "Tariff D"]);
  for (let c = 1; c <= 10; c++) calc.getColumn(c).width = 12;
  const c0 = 5, cN = 44; // years 1..40
  for (let y = 1; y <= 40; y++) {
    const r = c0 + y - 1;
    calc.getCell(`A${r}`).value = y;
    calc.getCell(`B${r}`).value = { formula: `IF(A${r}<=${R.term},1,0)` };
    calc.getCell(`C${r}`).value = { formula: `B${r}*${R.e1}*(1-${R.deg})^(A${r}-1)` };
    calc.getCell(`D${r}`).value = { formula: `1/(1+${R.d})^A${r}` };
    calc.getCell(`E${r}`).value = { formula: `1/(1+${R.d2})^A${r}` };
    calc.getCell(`F${r}`).value = { formula: `1/(1+${R.d3})^A${r}` };
    ["G", "H", "I", "J"].forEach((col, i) => {
      const br = 5 + i;
      calc.getCell(`${col}${r}`).value = {
        formula: `B${r}*IF(A${r}<=Bids!$D$${br},Bids!$B$${br},Bids!$E$${br})*(1+Bids!$C$${br})^(A${r}-1)`,
      };
      calc.getCell(`${col}${r}`).numFmt = "0.0000";
    });
    calc.getCell(`C${r}`).numFmt = "#,##0.0";
    ["D", "E", "F"].forEach((col) => (calc.getCell(`${col}${r}`).numFmt = "0.0000"));
  }
  const res = wb.addWorksheet("Results");
  title(res, "Results — levelized tariff, ranking and flags");
  header(res, 4, ["Bidder", "Levelized tariff @ main (USc/kWh)", "PV of payments @ main (USD m)", "Rank (1 = cheapest)", "Deviation from median", "Aggressive-bid flag", "Financial score", "Technical score", "Combined score", "Combined rank", "LT @ alt1", "Rank @ alt1", "LT @ alt2", "Rank @ alt2", "Nominal undiscounted avg tariff"]);
  for (let c = 1; c <= 15; c++) res.getColumn(c).width = c === 1 ? 20 : 14;
  const rr = (c: string) => `Calc!$${c}$${c0}:$${c}$${cN}`;
  const E = rr("C");
  ["G", "H", "I", "J"].forEach((tc, i) => {
    const r = 5 + i;
    const set = (col: string, f: string, fmt: string, result = false) => {
      const cell = res.getCell(`${col}${r}`);
      cell.value = { formula: f };
      cell.numFmt = fmt;
      if (result) styleResult(cell);
    };
    set("A", `Bids!A${5 + i}`, "@");
    set("B", `SUMPRODUCT(${rr(tc)},${E},${rr("D")})/SUMPRODUCT(${E},${rr("D")})`, "0.0000", true);
    set("C", `SUMPRODUCT(${rr(tc)},${E},${rr("D")})/100`, "#,##0.0");
    set("D", `RANK(B${r},$B$5:$B$8,1)`, "0", true);
    set("E", `B${r}/MEDIAN($B$5:$B$8)-1`, "0.0%");
    set("F", `IF(E${r}<=${R.agg},"CLARIFY: abnormally low?","ok")`, "@");
    set("G", `MIN($B$5:$B$8)/B${r}*100`, "0.0");
    set("H", `Bids!F${5 + i}`, "0.0");
    set("I", `${R.wf}*G${r}+${R.wt}*H${r}`, "0.0", true);
    set("J", `RANK(I${r},$I$5:$I$8,0)`, "0");
    set("K", `SUMPRODUCT(${rr(tc)},${E},${rr("E")})/SUMPRODUCT(${E},${rr("E")})`, "0.0000");
    set("L", `RANK(K${r},$K$5:$K$8,1)`, "0");
    set("M", `SUMPRODUCT(${rr(tc)},${E},${rr("F")})/SUMPRODUCT(${E},${rr("F")})`, "0.0000");
    set("N", `RANK(M${r},$M$5:$M$8,1)`, "0");
    set("O", `SUM(${rr(tc)})/${R.term}`, "0.0000");
  });
  res.getCell("A11").value = "PV of contract energy @ main rate (GWh, discounted)";
  res.getCell("C11").value = { formula: `SUMPRODUCT(${E},${rr("D")})` };
  res.getCell("C11").numFmt = "#,##0.0";
  res.getCell("A12").value = "Note: the levelized tariff of a flat bid equals its flat tariff at any discount rate; shaped bids move with the rate. Always publish the evaluation rate in the RFP.";
  await wb.xlsx.writeFile(path.join(OUT, "tariff-bid-evaluation.xlsx"));
}

// ------------------------------------------------------------------ 5. Cash-flow forecast

async function cashflowForecast() {
  const wb = newBook("Construction cash-flow forecast");
  readme(wb, "Construction cash-flow forecast — advance, retention, S-curve, fiscal years (Module 10, Lesson 6)", [
    "## WHAT THIS MODEL DOES",
    "Turns a construction contract into a monthly payment forecast for the Employer (MEWRE) and a fiscal-year budget request. Gross work value comes either from an S-curve (cosine profile) or from a milestone payment schedule. From each interim payment certificate it deducts advance-payment recovery and retention, adds the advance at signature and the two retention releases, and sums net payments by fiscal year.",
    "Default payment terms follow FIDIC 2017 conventions (advance recovered by amortisation starting when certified work exceeds 10% of the Accepted Contract Amount, at 25% of each IPC; retention at a percentage of each IPC up to a limit; half released at Taking-Over, half at the end of the Defects Notification Period). Your contract's Particular Conditions / Contract Data override these.",
    "Fiscal year: Kuwait's state budget year is assumed to start in April (FY = 1 April to 31 March). This is widely reported but is NOT sourced in the course research brief — confirm with the Ministry of Finance budget circular. Change 'FY start month' if needed.",
    "Sheets: Inputs -> Milestones (optional schedule) -> Monthly (months 0..48) -> FY Budget -> Contingency (commitment vs budget, contingency drawdown log).",
    "## EXERCISES",
    "1. Base case (KWD 45.0 m, 24 months from June 2026, S-curve): confirm FY2026/27 net payments KWD 14.282 m, FY2027/28 KWD 26.755 m.",
    "2. The contractor asks to raise the advance from 10% to 20%. What changes in FY2026/27 cash need and in MEWRE's exposure? What security must be increased?",
    "3. Switch basis to milestones (Inputs basis = 2). Compare the FY split with the S-curve. Which is more realistic for a substation and OHL package?",
    "4. A 3-month delay shifts the S-curve (set start date to Sep 2026). How much budget lapses from FY2026/27 and must be re-requested?",
    "5. Contingency sheet: add a variation of KWD 0.8 m. What is the remaining contingency, and how would you explain the movement to the Audit Bureau?",
    ...NOTE_COMMON,
  ]);
  const inp = wb.addWorksheet("Inputs");
  inp.getColumn(1).width = 46; inp.getColumn(2).width = 14; inp.getColumn(3).width = 14; inp.getColumn(4).width = 64;
  title(inp, "Inputs — contract payment terms");
  const R = inputBlock(inp, 4, [
    { key: "cv", label: "Accepted Contract Amount", value: 45.0, unit: "KWD m", fmt: "#,##0.000" },
    { key: "start", label: "Month 0 (signature / advance date)", value: new Date(Date.UTC(2026, 5, 1)), unit: "date", fmt: "mmm yyyy" },
    { key: "T", label: "Time for completion", value: 24, unit: "months", fmt: "0", note: "Taking-Over assumed at month T" },
    { key: "adv", label: "Advance payment", value: 0.1, unit: "% of contract", fmt: "0.0%", note: "Paid against an advance payment guarantee" },
    { key: "thr", label: "Recovery starts when certified work exceeds", value: 0.1, unit: "% of contract", fmt: "0.0%", note: "FIDIC 2017 default 10%" },
    { key: "am", label: "Amortisation rate", value: 0.25, unit: "% of each IPC", fmt: "0.0%", note: "FIDIC 2017 default 25%" },
    { key: "ret", label: "Retention rate", value: 0.1, unit: "% of each IPC", fmt: "0.0%" },
    { key: "lim", label: "Retention limit", value: 0.05, unit: "% of contract", fmt: "0.0%" },
    { key: "dnp", label: "Defects Notification Period", value: 12, unit: "months", fmt: "0", note: "Max 24 in this sheet" },
    { key: "basis", label: "Gross value basis (1 = S-curve, 2 = milestones)", value: 1, unit: "switch", fmt: "0" },
    { key: "fy", label: "Fiscal year start month", value: 4, unit: "month (1–12)", fmt: "0", note: "Assumed April — verify" },
  ]);
  const ms = wb.addWorksheet("Milestones");
  title(ms, "Milestone payment schedule (used when basis = 2)", "Percentages must total 100%.");
  header(ms, 4, ["#", "Milestone", "% of contract", "Month achieved", "Value (KWD m)"]);
  [5, 52, 14, 14, 14].forEach((w, i) => (ms.getColumn(i + 1).width = w));
  const M: [string, number, number][] = [
    ["Approved route survey, design basis and SLD", 0.05, 3],
    ["Approved detailed design (towers, foundations, GIS layout)", 0.05, 6],
    ["Tower steel and conductor delivered to site (50%)", 0.1, 9],
    ["Foundations 50% complete", 0.1, 10],
    ["GIS and transformers factory acceptance tests passed", 0.1, 12],
    ["Tower steel and conductor delivered (100%)", 0.1, 13],
    ["Towers erected 100%", 0.1, 16],
    ["GIS and transformers delivered and installed", 0.15, 18],
    ["Stringing complete", 0.1, 20],
    ["Pre-commissioning and protection tests complete", 0.05, 22],
    ["Energization and Taking-Over", 0.1, 24],
  ];
  M.forEach((m, i) => {
    const r = 5 + i;
    ms.getCell(`A${r}`).value = i + 1;
    ms.getCell(`B${r}`).value = m[0];
    const p = ms.getCell(`C${r}`); p.value = m[1]; p.numFmt = "0.0%"; styleInput(p);
    const mo = ms.getCell(`D${r}`); mo.value = m[2]; styleInput(mo);
    ms.getCell(`E${r}`).value = { formula: `C${r}*${R.cv}` };
    ms.getCell(`E${r}`).numFmt = "#,##0.000";
  });
  const mEnd = 4 + M.length;
  ms.getCell(`B${mEnd + 1}`).value = "Total (must be 100%)";
  const tc = ms.getCell(`C${mEnd + 1}`); tc.value = { formula: `SUM(C5:C${mEnd})` }; tc.numFmt = "0.0%"; styleResult(tc);
  const tv = ms.getCell(`E${mEnd + 1}`); tv.value = { formula: `SUM(E5:E${mEnd})` }; tv.numFmt = "#,##0.000"; styleResult(tv);

  const mo = wb.addWorksheet("Monthly");
  title(mo, "Monthly payment forecast (KWD m) — formulas", "Net payment = gross IPC + advance - advance recovery - retention + retention release.");
  const heads = ["Month", "Date", "Fiscal year", "S-curve cum. %", "Gross (S-curve)", "Gross (milestones)", "Gross IPC used", "Cum. gross", "Advance paid", "Advance recovery", "Retention held", "Retention release", "Net payment", "Cum. net"];
  header(mo, 4, heads);
  heads.forEach((_, i) => (mo.getColumn(i + 1).width = i === 2 ? 11 : 12));
  const r0 = 5, rN = 53; // months 0..48
  for (let m = 0; m <= 48; m++) {
    const r = r0 + m;
    const g = (c: string, f: string, fmt = "#,##0.000") => {
      const cell = mo.getCell(`${c}${r}`);
      cell.value = { formula: f };
      cell.numFmt = fmt;
    };
    mo.getCell(`A${r}`).value = m;
    g("B", `EDATE(${R.start},A${r})`, "mmm yyyy");
    g("C", `IF(MONTH(B${r})>=${R.fy},YEAR(B${r})&"/"&RIGHT(YEAR(B${r})+1,2),(YEAR(B${r})-1)&"/"&RIGHT(YEAR(B${r}),2))`, "@");
    g("D", `IF(A${r}>=${R.T},1,(1-COS(PI()*A${r}/${R.T}))/2)`, "0.0%");
    g("E", m === 0 ? "0" : `${R.cv}*(D${r}-D${r - 1})`);
    g("F", `SUMIF(Milestones!$D$5:$D$${mEnd},A${r},Milestones!$E$5:$E$${mEnd})`);
    g("G", `IF(${R.basis}=1,E${r},F${r})`);
    g("H", m === 0 ? `G${r}` : `H${r - 1}+G${r}`);
    g("I", `IF(A${r}=0,${R.adv}*${R.cv},0)`);
    const prevRec = m === 0 ? "0" : `SUM(J$${r0}:J${r - 1})`;
    g("J", `MAX(0,IF(A${r}=${R.T},${R.adv}*${R.cv}-${prevRec},IF(H${r}>${R.thr}*${R.cv},MIN(${R.am}*G${r},${R.adv}*${R.cv}-${prevRec}),0)))`);
    const prevRet = m === 0 ? "0" : `SUM(K$${r0}:K${r - 1})`;
    g("K", `MAX(0,MIN(${R.ret}*G${r},${R.lim}*${R.cv}-${prevRet}))`);
    g("L", `IF(A${r}=${R.T},SUM(K$${r0}:K$${rN})/2,0)+IF(A${r}=${R.T}+${R.dnp},SUM(K$${r0}:K$${rN})/2,0)`);
    g("M", `G${r}+I${r}-J${r}-K${r}+L${r}`);
    g("N", m === 0 ? `M${r}` : `N${r - 1}+M${r}`);
  }
  mo.views = [{ state: "frozen", ySplit: 4, xSplit: 1 }];
  const tot = rN + 1;
  mo.getCell(`A${tot}`).value = "Total";
  ["G", "I", "J", "K", "L", "M"].forEach((c) => {
    const cell = mo.getCell(`${c}${tot}`);
    cell.value = { formula: `SUM(${c}${r0}:${c}${rN})` };
    cell.numFmt = "#,##0.000";
    styleResult(cell);
  });

  const fy = wb.addWorksheet("FY Budget");
  title(fy, "Fiscal-year budget request (KWD m)", "SUMIF of the monthly forecast by fiscal-year label.");
  header(fy, 4, ["Fiscal year", "Gross work certified", "Advance paid", "Advance recovered", "Retention held", "Retention released", "Net cash payment (budget need)", "Cumulative net"]);
  for (let c = 1; c <= 8; c++) fy.getColumn(c).width = c === 1 ? 14 : 16;
  const mr = (c: string) => `Monthly!$${c}$${r0}:$${c}$${rN}`;
  for (let k = 0; k < 5; k++) {
    const r = 5 + k;
    const y0 = `(YEAR(${R.start})-IF(MONTH(${R.start})<${R.fy},1,0)+${k})`;
    const lab = fy.getCell(`A${r}`);
    lab.value = { formula: `${y0}&"/"&RIGHT(${y0}+1,2)` };
    const cols: [string, string][] = [["B", "G"], ["C", "I"], ["D", "J"], ["E", "K"], ["F", "L"], ["G", "M"]];
    for (const [dst, src] of cols) {
      const cell = fy.getCell(`${dst}${r}`);
      cell.value = { formula: `SUMIF(${mr("C")},$A${r},${mr(src)})` };
      cell.numFmt = "#,##0.000";
      if (dst === "G") styleResult(cell);
    }
    const cum = fy.getCell(`H${r}`);
    cum.value = { formula: k === 0 ? `G${r}` : `H${r - 1}+G${r}` };
    cum.numFmt = "#,##0.000";
  }
  fy.getCell("A11").value = "Check: total net = contract amount";
  const ck = fy.getCell("G11"); ck.value = { formula: `SUM(G5:G9)-${R.cv}` }; ck.numFmt = "0.000"; styleResult(ck);

  const ct = wb.addWorksheet("Contingency");
  title(ct, "Budget, commitment and contingency drawdown (KWD m)", "Commitment = contract value + approved variations; expenditure = cash paid.");
  ct.getColumn(1).width = 50; for (let c = 2; c <= 6; c++) ct.getColumn(c).width = 16;
  const C = inputBlock(ct, 4, [
    { key: "cont", label: "Project contingency in approved budget", value: 4.5, unit: "KWD m", fmt: "#,##0.000", note: "10% of contract; sized from the risk register (P80)" },
    { key: "own", label: "Owner's costs (consultant supervision, permits, MEWRE staff)", value: 2.0, unit: "KWD m", fmt: "#,##0.000" },
  ]);
  header(ct, 9, ["Change / risk item", "Status", "Value", "Probability", "Expected value", "Draws contingency?"]);
  const items: [string, string, number, number][] = [
    ["VO-01 Additional tower foundation design for sabkha soil", "Approved", 0.95, 1],
    ["VO-02 Extra 400 kV bay protection panel requested by MEWRE Transmission", "Approved", 0.65, 1],
    ["Claim-01 Late site access (land handover by Employer)", "Pending", 1.6, 0.5],
    ["Claim-02 Change in customs procedure (contractor claim)", "Pending", 0.8, 0.5],
    ["Risk R-07 Outage window slippage on existing Al-Wafra substation", "Risk (P80 allowance)", 2.0, 0.4],
  ];
  items.forEach((it, i) => {
    const r = 10 + i;
    ct.getCell(`A${r}`).value = it[0];
    const s = ct.getCell(`B${r}`); s.value = it[1]; styleInput(s);
    const v = ct.getCell(`C${r}`); v.value = it[2]; v.numFmt = "#,##0.000"; styleInput(v);
    const p = ct.getCell(`D${r}`); p.value = it[3]; p.numFmt = "0%"; styleInput(p);
    ct.getCell(`E${r}`).value = { formula: `C${r}*D${r}` };
    ct.getCell(`E${r}`).numFmt = "#,##0.000";
    ct.getCell(`F${r}`).value = { formula: `IF(B${r}="Approved","Drawn","Forecast")` };
  });
  for (let r = 15; r <= 17; r++) {
    ct.getCell(`A${r}`).value = "(add item)";
    styleInput(ct.getCell(`B${r}`)); styleInput(ct.getCell(`C${r}`)); styleInput(ct.getCell(`D${r}`));
    ct.getCell(`E${r}`).value = { formula: `IF(C${r}="",0,C${r}*D${r})` };
    ct.getCell(`F${r}`).value = { formula: `IF(B${r}="Approved","Drawn",IF(B${r}="","","Forecast"))` };
  }
  const refs: Record<string, string> = {};
  calcBlock(ct, 19, "Budget position", [
    { key: "budget", label: "Approved budget = contract + contingency + owner's costs", formula: `${R.cv}+${C.cont}+${C.own}`, unit: "KWD m", fmt: "#,##0.000" },
    { key: "drawn", label: "Contingency drawn (approved variations)", formula: `SUMIF(B10:B17,"Approved",C10:C17)`, unit: "KWD m", fmt: "#,##0.000" },
    { key: "commit", label: "Commitment = contract + approved variations", formula: `${R.cv}+B21`, unit: "KWD m", fmt: "#,##0.000" },
    { key: "remain", label: "Contingency remaining", formula: `${C.cont}-B21`, unit: "KWD m", fmt: "#,##0.000" },
    { key: "fcast", label: "Expected value of pending claims and risks", formula: `SUMPRODUCT((B10:B17<>"Approved")*(B10:B17<>"")*E10:E17)`, unit: "KWD m", fmt: "#,##0.000" },
    { key: "gap", label: "Contingency surplus (+) / shortfall (-)", formula: `B23-B24`, unit: "KWD m", fmt: "#,##0.000", note: "Negative = prepare a budget-increase justification" },
    { key: "eac", label: "Forecast final cost (EAC) of the package", formula: `B22+B24+${C.own}`, unit: "KWD m", fmt: "#,##0.000" },
  ], refs);
  await wb.xlsx.writeFile(path.join(OUT, "cashflow-forecast.xlsx"));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  await lcoeModel();
  await projectFinanceModel();
  await evmTracker();
  await tariffEval();
  await cashflowForecast();
  for (const f of fs.readdirSync(OUT).filter((f) => f.endsWith(".xlsx")).sort()) {
    console.log(`✓ public/downloads/${f} (${fs.statSync(path.join(OUT, f)).size.toLocaleString()} bytes)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
