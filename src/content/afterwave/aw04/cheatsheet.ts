import { md } from "../../schema";

const cheatSheet = md`# AW04 Requirements traceability: cheat sheet

## Conventions

- **Numbers:** all Afterwave and program numbers are **illustrative**, not traction or customer data.
- **Product scope:** Lockstep (capture on one clock), Enclave (private environment), Ripple (which tests to rerun and why), bench memory (accumulated test data). Agents and own test platforms are later vision.
- **Regulatory date:** EU Machinery Regulation 2023/1230 applies from **20 January 2027**.

## Requirements basics

- **Levels:** stakeholder, system, allocated subsystem, derived software and hardware.
- **Allocation vs derivation:** assign an existing requirement vs create a new one from a design choice; both trace up.
- **Top three qualities:** singular, unambiguous, verifiable (ISO/IEC/IEEE 29148).
- **IADT:** inspection, analysis, demonstration, test; chosen when the requirement is written.
- **Verification vs validation:** meets the spec vs meets the need in real use.
- **Test uncertainty ratio:** tolerance about 4 or more times $U$, or change bench, method or limit.

| EARS pattern | Template |
|---|---|
| Ubiquitous | The [system] shall [response]. |
| Event-driven | When [trigger], the [system] shall [response]. |
| State-driven | While [state], the [system] shall [response]. |
| Unwanted behaviour | If [condition], then the [system] shall [response]. |
| Optional feature | Where [feature], the [system] shall [response]. |

## Trace matrix and V-model

- **Forward traceability:** requirement to verification; finds gaps.
- **Backward traceability:** test or code to requirement; finds orphans and gold-plating.
- **Empty matrix row:** gap. **Test with no requirement:** orphan.
- **Only passing coverage on the current baseline means verified.** A pass on an older build is stale unless argued.
- **Suspect link:** flag on a link after an item at one end changed. Fires only for items in the tool.
- **Not in the graph:** firmware commits, model retrains, rig, fixture, DAQ and calibration changes.
- **Suspect fatigue:** transitive propagation grows geometrically, then flags get bulk-cleared.

## Tools and data models

| Tool | Items | Notes |
|---|---|---|
| DOORS Classic (IBM) | Objects in modules | Link modules, DXL, baselines |
| DOORS Next (IBM ELM) | Artifacts in modules | OSLC, global configurations |
| Polarion (Siemens) | Work items, LiveDocs | Revisions, built-in test runs |
| Jama Connect | Items, relationships | Trace views, suspect links, review centre |
| Codebeamer (PTC) | Trackers | Templates for ISO 26262, ASPICE |
| Xray (Jira) | Test, Test Execution, Test Run | Coverage per version and environment |
| TestRail | Cases, runs, plans | References field to Jira |

- **ReqIF:** OMG XML exchange (DATATYPES, SPEC-TYPES, SPEC-OBJECTS, SPEC-RELATIONS, SPECIFICATIONS). Snapshot, not live.
- **Lost in ReqIF:** history, discussions, suspect state, baselines, tool extensions.
- **Integration rule:** read requirements and links; write evidence to the test side; use stable IDs and build hashes.
- **Run context:** build hash, HW revision, rig, fixture, calibration, DAQ config, model version.

## Regulated domains

- **ISO 26262 chain:** HARA (S, E, C), safety goal with ASIL, FSR, TSR, HW and SW safety requirements, verification.
- **ASIL sum rule:** S + E + C = 10 D, 9 C, 8 B, 7 A, 6 or less QM.
- **ASPICE:** bidirectional traceability and consistency base practices; common audit finding.
- **Tool confidence (ISO 26262-8):** TI1 gives TCL1; TI2 with TD1/TD2/TD3 gives TCL1/TCL2/TCL3.
- **IEC 61508-3 tool classes:** T1 no effect, T2 verification support, T3 generates executable.
- **A test-selection tool is TI2 / T2:** it can fail to detect an error by skipping a test.
- **Machinery technical file:** risk assessment, EHSRs and measures, standards, test reports and checks, software description, instructions, declaration (check Annex IV wording).
- **Annex I Part A:** ML-based safety functions need a notified body.

| SIL | PFH (per hour) | PFDavg |
|---|---|---|
| 4 | 1e-9 to 1e-8 | 1e-5 to 1e-4 |
| 3 | 1e-8 to 1e-7 | 1e-4 to 1e-3 |
| 2 | 1e-7 to 1e-6 | 1e-3 to 1e-2 |
| 1 | 1e-6 to 1e-5 | 1e-2 to 1e-1 |

## Evidence and change impact

- **Evidence chain:** requirement, test case, test run, run context, raw data, metric and verdict.
- **Usual missing link:** verdict to run context and raw data.
- **Implicit dependency:** real dependency no link records; main cause of escapes after trace-based selection.
- **Judge selection by two numbers:** rig-hours saved and escapes. Never only savings.
- **Pilot proof:** coverage truth, replay of past releases vs full regressions, reasons per recommendation.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Combined uncertainty | $u_c = \sqrt{\sum u_i^2}$, $U = k u_c$ | L1 |
| Guarded acceptance | $A_U = T_U - U$ | L1 |
| Link coverage | $C_{link} = \lvert R_v \rvert / \lvert R \rvert$ | L2 |
| Passing coverage | requirements all-pass on baseline B / all requirements | L2 |
| Orphan rate | $O = \lvert T_{orphan} \rvert / \lvert T \rvert$ | L2 |
| Suspect set | $\lvert I \rvert = f(f^d - 1)/(f - 1)$ | L2 |
| Retest cost | $C_{rt} = c_h \sum h_t$ | L2 |
| Zero-failure demo | $T \ge -\ln(1 - C)/\lambda$ | L4 |
| Stale share | $D$ = stale requirements / all | L5 |
| Impact score | $s_t = 1 - \prod (1 - w_{i,t})$ | L5 |

## Worked numbers (illustrative)

| Case | Result |
|---|---|
| Torque ripple limit 2.0 %, $U$ 0.24 % | Accept at 1.76 % or below |
| 240 req, 212 linked, 180 passing | 88.3 % link, 75.0 % passing |
| Fan-out 3, depth 3 | 39 suspect items |
| $10^{-7}$/h at 95 % | $3.0 \times 10^{7}$ h, 250 years for 20 rigs |
| Weights 0.6 and 0.2 | Impact score 0.68 |
`;

export default cheatSheet;
