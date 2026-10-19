import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m07-l06",
  title: "Handover, Defects Period & Close-out",
  summary:
    "Taking over (including sectional taking over of GW plants), the defects notification period, as-builts, O&M manuals, training, spare parts, warranties, retention release, the Performance Certificate and final acceptance, final account and lessons learned.",
  minutes: 65,
  objectives: [
    "You can explain what the Taking-Over Certificate transfers and what remains with the contractor",
    "You can manage the defects notification period: notification, remedy, extension and the Performance Certificate",
    "You can define and check the handover package: as-builts, O&M manuals, training, spares and warranties",
    "You can calculate retention release with deductions at taking over and final acceptance",
    "You can run close-out: final account, demobilisation, lessons learned",
  ],
  concepts: [
    {
      id: "m07.taking-over",
      name: "Taking over",
      description:
        "Contractual acceptance of the works (or a section) when tests on completion are passed and the works are substantially complete; transfers care of the works and starts the defects notification period.",
      competency: "contracts",
      related: ["m07.dnp", "m09.taking-over-defects", "m15.taking-over"],
    },
    {
      id: "m07.dnp",
      name: "Defects notification period",
      description:
        "Period after taking over during which the contractor must remedy notified defects at its cost; can be extended for defects that prevent use; ends with the Performance Certificate.",
      competency: "contracts",
      related: ["m07.final-acceptance", "m12.warranty-claim"],
    },
    {
      id: "m07.handover-package",
      name: "Handover package",
      description:
        "As-built drawings, O&M manuals, test records, training, spare parts, special tools, software and licences, and assigned OEM warranties needed to operate the plant for decades.",
      competency: "operations",
      related: ["m09.epc-om-handover", "m12.cmms"],
    },
    {
      id: "m07.retention-release",
      name: "Retention release",
      description:
        "Return of retention money withheld from interim payments: typically half at taking over and half after the defects period, subject to deductions for unremedied defects.",
      competency: "finance",
      related: ["m09.retention"],
    },
    {
      id: "m07.final-acceptance",
      name: "Final acceptance and close-out",
      description:
        "Performance Certificate, final statement and discharge, release of securities, demobilisation, and capture of lessons learned.",
      competency: "delivery",
      related: ["m15.lessons-learned"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What actually transfers at handover",
      blocks: [
        {
          kind: "md",
          md: md`### Taking over

Under FIDIC 2017 (Yellow/Silver) **Clause 10.1**, the Employer takes over the Works when they are complete (except minor outstanding work and defects that do not substantially affect safe use), the Tests on Completion are passed, and required documents (as-builts, O&M manuals) are delivered. The Engineer issues the **Taking-Over Certificate (TOC)** stating the date of completion. Effects of taking over:

| Transfers to the Employer | Stays with the Contractor |
|---|---|
| Care of the works and risk of loss (subject to exceptions) | Obligation to complete outstanding (Category B) work |
| Operation and its revenue (or the start of the PPA for an IPP at COD) | Obligation to remedy defects notified during the DNP |
| Insurance of the operating plant (owner's operational policy) | Liability for latent defects per law and contract |
| Start of the defects notification period | Performance guarantees still subject to tests after completion, where specified |
| Delay damages stop accruing | |
| First half of retention typically becomes payable | |

**Sectional taking over (Clause 10.2)** matters for GW plants: a 1 GW plant built in 4 × 250 MW sections can be taken over in sections as each passes its tests, so energy flows earlier. Each section then has its own DNP start date — so DNPs end at different times, which the PM must track section by section.

On an IPP, the PPA's **COD** is the offtaker's equivalent: MEWRE starts paying for energy, and the PPA's operating obligations (availability, performance reporting) begin. The developer's EPC handover to its O&M contractor happens inside the SPV.

### Defects notification period (DNP)

- Duration stated in the Contract Data — commonly **12–24 months** for PV/BESS (FIDIC default 365 days).
- The Employer **notifies** defects promptly; the contractor must remedy within a reasonable time at its cost (Clause 11.1–11.2).
- If a defect prevents the works (or a major item) from being used for its intended purpose, the DNP for that item is **extended** by the period of non-use, **capped at two years** beyond the original DNP (Clause 11.3).
- If the contractor fails to remedy, the Employer may do it (or have it done) at the contractor's cost, or claim a reduction (Clause 11.4).
- After the last DNP expires and defects are remedied, the Engineer issues the **Performance Certificate** (within 28 days, Clause 11.9). Only the Performance Certificate constitutes acceptance of the Works.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the DNP is the Employer's most valuable year",
          md: md`During the DNP the contractor is still mobilised (or contractually obliged), still holds retention at risk, and the performance security is still valid. Every defect found **after** the Performance Certificate becomes a warranty claim against an OEM (slow, evidence-heavy) or a latent-defect claim under law (slower). So the DNP is when the owner should run **intensive inspections** — drone IR thermography of the whole array, IV-curve sampling, EL sampling, transformer oil analysis, BESS capacity check — and notify everything found.`,
        },
        {
          kind: "md",
          md: md`### Retention

Retention is a percentage (often 5–10 %) withheld from each interim payment up to a limit (often 5 % of the contract price). It can be replaced by a **retention money guarantee**. Release under FIDIC Clause 14.9 is typically:`,
        },
        { kind: "equation", formula: "m07-retention-release" },
        {
          kind: "md",
          md: md`Separately, the **performance security** (often 10 % of contract price) remains valid until the Performance Certificate; some contracts reduce it at taking over.

### The handover package

| Item | What "good" looks like |
|---|---|
| **As-built drawings** | Every drawing updated to reflect what was built (layout, SLDs, cable routes with GPS coordinates, earthing, pile records), in native CAD plus PDF, indexed |
| **O&M manuals** | Plant-level manual (operating philosophy, normal/abnormal/emergency procedures) plus OEM manuals; maintenance schedules imported into the CMMS |
| **Test records** | FAT/SAT/commissioning reports, IV curves, thermography baseline, relay settings as left, transformer oil baseline |
| **Training** | Classroom + on-the-job for operators, maintenance technicians, SCADA engineers; competence assessment, not just attendance |
| **Spare parts & special tools** | Per agreed list (strategic/critical spares: inverter power modules, MV transformer, tracker motors/controllers, BESS modules, connectors) with storage conditions |
| **Software & licences** | SCADA, PPC, EMS source configuration, passwords handed over securely, licence terms transferable |
| **Warranties** | OEM warranties (modules, inverters, trackers, BESS) assigned to the owner, with registration, serial numbers and claim procedures |
| **Asset register** | Every asset with tag, serial number, location, warranty start/end — feeds the CMMS |

A missing piece of this package costs the owner for 25 years: an O&M team that cannot find cable routes, a SCADA system no one can modify, a module warranty that cannot be claimed because serial numbers were never registered.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Money at handover and at final acceptance",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "First-half retention release at taking over",
          given: md`EPC contract price USD 600 m. Retention 10 % of each interim payment up to a limit of 5 % of contract price — limit reached. At taking over, Category B items with an estimated completion cost of USD 1.2 m remain; the contract allows the Engineer to withhold the estimated cost of outstanding work from the first-half release.`,
          steps: [
            { md: md`Total retention held: $R = 0.05 \times 600 = 30$ m.` },
            { md: md`First half: $30/2 = 15$ m.` },
            { md: md`Withhold for outstanding work: $15 - 1.2 = 13.8$ m released at TOC.` },
            { md: md`The USD 1.2 m is released when the Category B items are verified complete; it is not a penalty.` },
          ],
          result: md`USD 13.8 m released at taking over; USD 1.2 m held against the Category B list; USD 15 m held to the Performance Certificate.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Second-half release at the Performance Certificate",
          given: md`During the DNP the contractor failed to replace 14 faulty tracker controllers within the notified time. MEWRE replaced them via its O&M contractor at a cost of USD 0.45 m (Clause 11.4: at contractor's cost). The Category B list was completed and its USD 1.2 m released earlier.`,
          steps: [
            { md: md`Second half of retention: USD 15 m.` },
            {
              md: md`Release = 15 − 0.45 = ? USD m`,
              hidden: true,
              check: { prompt: "Second-half retention released", answer: 14.55, unit: "USD m", tolerance: { abs: 0.01 } },
            },
            { md: md`The Employer must document the notification, the deadline, the contractor's failure, and the actual cost — the Audit Bureau and the contractor will both scrutinise it.` },
          ],
          result: md`USD 14.55 m released; USD 0.45 m set off against Employer's remedy costs, with a full evidence file.`,
        },
        {
          kind: "question",
          question: {
            id: "m07-l06-p1",
            type: "numeric",
            prompt: md`At the Performance Certificate stage: second-half retention USD 15 m. Deductions: Employer remedy cost USD 0.62 m, and performance LDs from the 12-month final PR test (Tests after Completion) of USD 0.90 m, which the contract allows to be set off against retention. What amount is released (USD m)?`,
            answer: 13.48,
            unit: "USD m",
            tolerance: { abs: 0.01 },
            explanation: md`$15 - 0.62 - 0.90 = 13.48$ m. Set-off is only valid where the contract permits it and the amounts are properly determined (e.g. by the Engineer under Clause 3.7 or agreed); otherwise the Employer claims them separately.`,
            concepts: ["m07.retention-release", "m07.final-acceptance"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running handover and close-out",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **EPC**: compiles handover dossier, trains staff, completes Category B, remedies defects, prepares statement at completion and final statement.
- **Engineer / OE**: verifies completeness of documents, witnesses training assessments, inspects defects, recommends certificates.
- **MEWRE operations / O&M contractor**: receives the plant, accepts spares, imports the asset register into the CMMS, starts operating procedures and reporting.
- **MEWRE finance / Audit Bureau**: final account and release of securities follow public-finance rules — budget time for approvals.

### Running the DNP well

1. Agree a **defects log** format and portal at taking over (ID, location, asset tag, photo, category, notification date, deadline, status).
2. Run a **full-plant baseline inspection** within the first 3 months: drone IR thermography, IV sampling, EL sampling, tracker alignment check, transformer DGA, BESS capacity test.
3. Re-inspect before DNP expiry (month 10–11 for a 12-month DNP; month 20–22 for 24 months) and notify everything found **before** expiry.
4. Track DNP extensions by asset/section.
5. Hold monthly defects meetings with the contractor; escalate ageing items.

### Close-out

Final statement and **discharge** (FIDIC 14.11–14.12): the contractor's final claim for payment, the Employer's final payment certificate, and the written discharge that ends claims. Release of the performance security after the Performance Certificate. Demobilisation, site restoration, closing permits. **Lessons learned**: structured workshop with EPC, OE, operations and procurement; output fed into the next tender's Employer's Requirements and the ministry's standard documents.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong at handover",
          md: md`- **TOC signed under schedule pressure** with an incomplete punch list mis-categorised as "B".
- **As-builts never delivered** in usable form; drawings show design, not what was built.
- **Training as attendance sheets**: operators cannot operate the PPC or isolate an inverter safely.
- **Warranties not registered**; serial numbers not captured; claims later rejected.
- **DNP expiry missed**: defects found in month 25 of a 24-month DNP become warranty claims.
- **SCADA passwords and configuration** held by the EPC's subcontractor, not handed over.
- **Lessons learned never written**, so the next project repeats the same errors.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait-specific handover requirements — confirm",
          md: md`Not in RESEARCH.md: requirements for training and employing Kuwaiti nationals in O&M, civil-defence (fire) approval before occupation of buildings and BESS yards, and Audit Bureau review of final settlements on large contracts. These are commonly encountered on Kuwaiti public projects; confirm the current rules (and the 2026 tenders-law amendments on local content) with MEWRE legal and procurement before relying on them.`,
        },
        {
          kind: "checklist",
          title: "PM handover / close-out checklist",
          items: [
            "Category A punch items closed and verified; Category B list priced, dated and agreed",
            "As-builts in native and PDF formats, checked against site by spot audit",
            "O&M manuals reviewed; maintenance plans loaded into the CMMS",
            "Training completed with competence assessment for each role",
            "Spare parts and special tools delivered, inspected and stored per OEM conditions",
            "OEM warranties assigned and registered; serial-number database delivered",
            "SCADA/PPC/EMS configuration, source files, passwords and licences handed over",
            "Defects log and DNP calendar per section in place; baseline inspection scheduled",
            "Securities and retention tracked with release conditions and dates",
            "Lessons-learned workshop held and report issued to procurement/standards",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC before signing taking over",
          items: [
            "Which items on the punch list could affect safety, performance or compliance — why are they not Category A?",
            "Where are the as-built cable routes with coordinates, and who verified them?",
            "Have all OEM warranties been registered in the owner's name, and where is the serial-number list?",
            "Which spares are still to be delivered, and when?",
            "Who holds the SCADA and PPC administrator credentials today?",
            "What is your plan and staffing for remedying defects during the DNP?",
          ],
        },
        { kind: "scenario", scenario: "m07-s5" },
        {
          kind: "feynman",
          prompt: "Explain to an incoming O&M manager what changes the day the Taking-Over Certificate is signed, and why the next 12–24 months matter so much.",
          keyPoints: [
            "Care, risk and operation transfer to the owner; delay damages stop",
            "Contractor still must finish Category B items and remedy notified defects",
            "DNP: inspect intensively and notify before expiry; extensions for non-use",
            "Retention and performance security give leverage until the Performance Certificate",
            "After that, defects become slower warranty or latent-defect claims",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m07-l06-q1",
      type: "mcq",
      prompt: "Under FIDIC 2017, which certificate constitutes acceptance of the Works?",
      options: ["Taking-Over Certificate", "Interim Payment Certificate", "Performance Certificate", "Mechanical completion certificate"],
      answer: 2,
      explanation: md`Clause 11.9: only the Performance Certificate is deemed to constitute acceptance of the Works. The TOC transfers care and starts the DNP but is not final acceptance.`,
      concepts: ["m07.final-acceptance", "m07.taking-over"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m07-l06-q2",
      type: "multi",
      prompt: "What happens at taking over? Select all.",
      options: [
        "Care of the works passes to the Employer",
        "Delay damages stop accruing",
        "The defects notification period starts",
        "The contractor is released from all defect obligations",
        "First half of retention typically becomes payable",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The contractor remains responsible for outstanding work and defects notified during the DNP.`,
      concepts: ["m07.taking-over"],
      difficulty: 1,
    },
    {
      id: "m07-l06-q3",
      type: "numeric",
      prompt: md`Contract price USD 420 m; retention limit 5 % reached. At taking over, Category B outstanding work is estimated at USD 0.8 m and may be withheld from the first half. How much is released at TOC (USD m)?`,
      answer: 9.7,
      unit: "USD m",
      tolerance: { abs: 0.01 },
      explanation: md`Retention $= 0.05 \times 420 = 21$ m; half $= 10.5$ m; less 0.8 m → 9.7 m released.`,
      concepts: ["m07.retention-release"],
      difficulty: 1,
    },
    {
      id: "m07-l06-q4",
      type: "mcq",
      prompt: "A main transformer failure during the DNP keeps one 250 MW section out of service for 70 days. What happens to that section's DNP under FIDIC 2017 Clause 11.3?",
      options: [
        "Nothing",
        "It is extended by the period the section could not be used (70 days), subject to the two-year cap",
        "It restarts from zero",
        "The whole plant's DNP doubles",
      ],
      answer: 1,
      explanation: md`Extension equals the period of non-use for the affected item/section, capped at two years beyond the original DNP. Track it per section.`,
      concepts: ["m07.dnp"],
      difficulty: 2,
    },
    {
      id: "m07-l06-q5",
      type: "decision",
      prompt: md`Two weeks before the 24-month DNP expires, your O&M contractor's drone thermography finds 3,200 modules with hot spots in two blocks. The EPC says "too late, warranty issue now". What do you do?`,
      options: [
        { text: "Accept and pass the issue to the module OEM under warranty", score: 0.3, feedback: "You lose the contractor's direct obligation and the retention leverage while the DNP is still running." },
        { text: "Issue a formal defects notice immediately, with the thermography report, locations and serial numbers, before DNP expiry; request remedy plan; hold retention as allowed", score: 1, feedback: "Notification within the DNP preserves the contractor's obligation. Evidence and serial numbers make it enforceable." },
        { text: "Wait until the OE confirms the findings next month", score: 0.1, feedback: "Next month the DNP has expired — notification timing is everything." },
      ],
      explanation: md`What matters is that the defect is notified before the DNP expires. Investigation and allocation can follow. This is why baseline and pre-expiry inspections are planned months ahead.`,
      concepts: ["m07.dnp"],
      difficulty: 2,
    },
    {
      id: "m07-l06-q6",
      type: "short",
      prompt: "List six components of a good handover package for a PV+BESS plant and why each matters.",
      rubric: [
        "As-built drawings (cable routes, SLDs)",
        "O&M manuals and maintenance plans in CMMS",
        "Test records and baselines",
        "Training with competence assessment",
        "Spare parts and special tools",
        "Assigned and registered OEM warranties with serial numbers",
        "SCADA/PPC configuration, software and passwords",
      ],
      modelAnswer:
        "As-builts (fault finding, future works), O&M manuals loaded into CMMS (planned maintenance), test records/baselines (to detect degradation and support claims), training with assessment (safe operation), spares and tools (availability), registered warranties with serial numbers (claims), and SCADA/PPC configuration and credentials (control of the plant).",
      explanation: md`The owner runs the plant for 25–30 years; each missing item becomes a recurring cost or a lost claim.`,
      concepts: ["m07.handover-package"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m07-l06-f1", front: "FIDIC 2017 Clause 10.1", back: "Taking Over of the Works and Sections — TOC issued when works complete and tests passed.", concepts: ["m07.taking-over"] },
    { id: "m07-l06-f2", front: "DNP extension cap (FIDIC 11.3)", back: "Max two years beyond the original DNP.", concepts: ["m07.dnp"] },
    { id: "m07-l06-f3", front: "When is the Performance Certificate issued?", back: "Within 28 days after the latest DNP expiry, once defects are remedied (Clause 11.9).", concepts: ["m07.final-acceptance"] },
    { id: "m07-l06-f4", front: "Typical retention release", back: "Half at taking over, half after the DNP (Performance Certificate), less valid deductions.", concepts: ["m07.retention-release"] },
    { id: "m07-l06-f5", front: "Sectional taking over — why for GW plants?", back: "Sections export earlier; each section's DNP starts at its own TOC date.", concepts: ["m07.taking-over"] },
    { id: "m07-l06-f6", front: "Most valuable owner action in the DNP", back: "Full-plant inspections (IR, IV, EL, DGA, BESS capacity) and notifying defects before expiry.", concepts: ["m07.dnp"] },
    { id: "m07-l06-f7", front: "Discharge (FIDIC 14.12)", back: "Contractor's written confirmation that the final statement is full settlement.", concepts: ["m07.final-acceptance"] },
    { id: "m07-l06-f8", front: "Why register OEM warranties at handover?", back: "Claims need owner registration and serial numbers; unregistered warranties are often refused.", concepts: ["m07.handover-package"] },
  ],
  scenarios: [
    {
      id: "m07-s5",
      title: "Sign the TOC today?",
      context: md`You are MEWRE's PM on a 300 MW ministry-procured PV + 100 MWh BESS EPC. The contractor requests the Taking-Over Certificate today; delay damages have been accruing for 3 weeks. The punch list has 420 items, of which the contractor classifies all as Category B.`,
      start: "a",
      concepts: ["m07.taking-over", "m07.handover-package"],
      nodes: {
        a: {
          md: md`The OE's quick review finds: BESS fire-suppression commissioning incomplete in 2 of 30 containers; SCADA missing 4 % of string data; as-built cable routes not delivered; O&M training done for half the operators.`,
          choices: [
            { text: "Sign — delay damages are hurting the contractor and the plant is producing", next: "b", score: 1, feedback: "Fire suppression is a safety item; signing transfers care of an unsafe asset to MEWRE." },
            { text: "Refuse the TOC, listing the items that are Category A (fire suppression, SCADA, as-built cable routes for safe operation, training) with reasons; offer sectional taking over of the PV blocks that are complete", next: "c", score: 10, feedback: "Specific reasons per FIDIC 10.1 and a constructive path (sectional taking over) — fair and firm." },
            { text: "Refuse without giving reasons", next: "b", score: 3, feedback: "FIDIC requires the Engineer to give reasons and specify the work required; a bare refusal invites a deemed TOC argument." },
          ],
        },
        b: {
          md: md`Two months later a BESS container alarm occurs at night; the suppression system in that container was never commissioned. Who carries the risk now?`,
          choices: [{ text: "MEWRE, as the owner after taking over", score: 1, feedback: "Exactly the risk you transferred to yourself by signing early." }],
        },
        c: {
          md: md`The contractor accepts sectional taking over for 250 MW of PV; BESS and the remaining PV section to follow within 4 weeks once the listed items close.`,
          choices: [
            { text: "Issue TOC for the PV section with its own DNP start date and record the remaining conditions", score: 10, feedback: "Energy flows, safety is protected, and the DNP calendar is tracked per section." },
          ],
        },
      },
    },
  ],
};

export default lesson;
