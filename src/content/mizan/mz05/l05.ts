import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz05-l05",
  title: "The product opportunity: vendor white space, integration and warranty risk, and piloting a control function safely",
  summary:
    "What tracker vendors publicly offer (wind, hail, snow, diffuse, robot integration) and what they do not (dust-storm stow, soiling-aware night stow), why the gap exists and how fast it could close, the product ladder from stow analytics to a supervisory function, the warranty, O&M, insurance and lender risks of touching someone else's tracker, and how to design a paired-block pilot with enough statistical power to prove an effect.",
  minutes: 80,
  objectives: [
    "You can summarise the public feature sets of the main tracker vendors in the Gulf and state the white space with its evidence level.",
    "You can lay out a product ladder for a control function and say what each rung needs from the vendor and the owner.",
    "You can list the warranty, contractual, insurance and lender risks of a third-party control function and the mitigation for each.",
    "You can size a paired-block trial (pairs times cycles) for a target effect and variability.",
    "You can write a pilot proposal for a control function that a vendor and an IPP could sign.",
  ],
  concepts: [
    {
      id: "mz05.vendor-white-space",
      name: "Tracker vendor white space",
      description:
        "Public vendor material covers wind, hail, snow and diffuse modes and robot compatibility, but no major vendor advertises a dust-storm stow or soiling-optimised night stow (research brief, public material only, unverified against manuals). A vendor could close it with a firmware release, so defensibility must come from evidence and soiling data, not the stow logic itself.",
      competency: "mz-control",
      related: ["mz05.dust-storm-stow", "mz05.night-stow"],
    },
    {
      id: "mz05.warranty-risk",
      name: "Warranty and contractual risk of third-party control",
      description:
        "Tracker structural and drive warranties assume operation per the vendor's manual; O&M availability guarantees, insurance and lender covenants assume a known control regime. A third-party function needs written vendor non-objection, owner and O&M agreement, and insurer and lender notification where applicable.",
      competency: "mz-control",
      related: ["mz05.integration-levels", "m09.availability-guarantee"],
    },
    {
      id: "mz05.control-pilot-ladder",
      name: "Control pilot ladder",
      description:
        "Shadow mode (compute but do not act), advisory on test blocks, supervisory requests on test blocks with vendor approval, then expansion. Each rung has entry criteria, stop rules and a written result before the next.",
      competency: "mz-control",
      related: ["mz05.integration-levels", "fc04.success-criteria"],
    },
    {
      id: "mz05.paired-block-design",
      name: "Paired-block trial design",
      description:
        "Matched test and control blocks compared over the same periods, so weather and dust events cancel. Sample size for a paired difference: n = ((z_alpha/2 + z_beta) sigma_d / delta)^2, counted in independent pair-periods (for soiling, usually pair-cleaning-cycles).",
      competency: "mz-control",
      related: ["mz05.control-pilot-ladder", "mz05.night-stow"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What vendors offer, what they do not, and what that means for Mizan",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`This is the lesson where engineering turns into a company decision. A control function could make Mizan more than an analytics vendor: a product that changes how Gulf tracker plants operate. It could also put Mizan between a tracker vendor and its warranty, which is a fast way to be shut out of the market. You need a clear view of the gap, how long it may last, what you can sell at each level of integration, and a pilot design that a vendor, an IPP and KISR could all sign.`,
        },
        {
          kind: "md",
          md: md`### Public vendor features (research brief, section 3.3)

| Vendor | Public features | Gulf relevance | Dust or soiling stow found? |
|---|---|---|---|
| Nextracker (renamed Nextpower) | NX Navigator control system; Hail Pro (stows up to 4 times faster, works through grid outages); wind and hail stows to about 60 to 75°, forecast-triggered | Global leader | No |
| Array Technologies | SmarTrack: backtracking, Diffuse, Snow, Hail Alert Response (third-party weather data); DuraTrack Hail XP stows to 77° without batteries (May 2025) | Global | No soiling or cleaning mode found |
| GameChange Solar | Genius Tracker with SmartStow (wind) and HailStow (VDE verified); markets desert durability and integration with robotic cleaners | Large Saudi footprint | No dust stow found |
| Arctech | SkyLine II; over 14 GW of Middle East awards, 2.3 GW Saudi supply (July 2025), 2.1 GW UAE, Manah I (Oman) with a 22 m/s wind stow speed | Dominant in the Middle East | No sandstorm mode found |
| Ideematec | Al Kharsaah (Qatar); 190 m tracker length tied to robotic cleaning | Qatar | Not reported |

**The white space.** No major vendor publicly markets a dedicated dust-storm stow or a soiling-optimised night stow. The physics (lesson 3) and the architecture precedent (forecast-triggered hail stow with external weather data) both exist.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "How solid is the white space?",
          md: md`The finding rests on public material summarised at search-snippet level in November 2026. Vendor manuals, especially Arctech's and GameChange's, may contain unpublicised dust, sand or cleaning-position modes; the research brief lists this as an open check. Confirm with each vendor before saying "nobody does this" to anyone outside the company.`,
        },
        {
          kind: "md",
          md: md`### Why the gap exists, and why it may not last

**Why it exists.** Vendors build for their largest loss events: hail and wind in the US have cost owners heavily, and that is where the product investment went. Dust and soiling losses are chronic, not catastrophic, and are owned by the O&M contractor's cleaning budget rather than the tracker warranty. The evidence for soiling stow is recent and not isolated (lesson 3). And proving a soiling effect needs soiling measurement and analytics, which are not a tracker vendor's core skill.

**Why it may not last.** Once the effect is proven, a vendor can ship a "dust mode" in a firmware release. Arctech and GameChange dominate the Gulf and have every reason to. So the stow logic alone is not a moat. What can be:
- **Site-specific evidence and the method** to measure the effect, ideally co-published with KISR (the validation module covers this).
- **Coupling to soiling analytics and cleaning optimisation**: the decision of when to stow, when to clean and when to let robots run is one optimisation, and it needs the soiling estimate Mizan is building.
- **Vendor neutrality**: owners with several tracker brands want one policy across the fleet.
- **A partner route**: the best outcome may be to sell the function through, or license it to, a vendor rather than compete with it.

### The product ladder

| Rung | Product | Integration level (lesson 4) | Needs from vendor | Evidence it creates |
|---|---|---|---|---|
| 1 | Stow and tracking analytics: energy lost per stow event, release delays, stuck rows, angle errors, sensor faults | 0, read-only | Data access only | Quantified losses; credibility with the O&M contractor |
| 2 | Advisory dust and night stow, tied to the soiling estimate and cleaning schedule | 1, advisory | Confirmation of permitted angles | Operator acceptance; first effect data |
| 3 | Supervisory dust and night stow on test blocks | 2, supervisory request | Interface and written non-objection | Measured effect from a paired trial |
| 4 | Fleet function or vendor partnership | 2 or vendor-embedded | Commercial agreement | Recurring revenue |

Rung 1 is sellable now, needs nobody's permission beyond data access, and builds exactly the dataset rung 3 needs.

### Risks of touching someone else's tracker

| Risk | Mechanism | Mitigation |
|---|---|---|
| Structural and drive warranty | Warranties assume operation per the vendor manual; non-approved commands may void them | Written vendor non-objection for the specific function, angles and cycle budget; only vendor-approved positions |
| O&M guarantees | Availability and performance guarantees (Track 0, m09-l06) assume a known control regime; a stow that costs energy may be disputed | Agree how optimiser-requested stows are treated in availability and PR calculations before the pilot |
| Liability | Damage or lost energy blamed on Mizan's request | Monotone-safety design (lesson 4), logs with mode source, a liability cap and clear allocation in the pilot contract |
| Insurance | The plant's property insurer may want to know of changed operating procedures | Owner notifies the insurer; keep the stow logic within vendor rules |
| Lenders | Financed plants need the lenders' technical adviser to accept changes affecting availability or asset integrity | Involve the adviser early with the safety case |
| Cybersecurity | Write access into OT | IEC 62443 zoning, DMZ, least privilege (lesson 4) |

Typical tracker warranties are commonly quoted at around 10 years for structure and around 5 years for drives and electronics, but terms vary by contract and the conditions matter more than the durations; read the actual warranty and O&M agreement for each plant.

### How big must the pilot be?

A paired-block trial compares test and control blocks over the same periods, so weather and dust events cancel in the difference. For the mean paired difference to detect an effect $\delta$ with significance $\alpha$ (two-sided) and power $1-\beta$:`,
        },
        { kind: "equation", formula: "mz05-paired-sample-size" },
        {
          kind: "md",
          md: md`For $\alpha = 0.05$ and 80% power, $z_{\alpha/2} + z_\beta = 1.96 + 0.84 = 2.80$. The trap is **independence**: soiling accumulates, so daily or weekly readings within one cleaning cycle are strongly correlated. The honest unit is usually one block pair over one cleaning cycle. Then trial length is set by the number of matched block pairs times the number of cycles.`,
        },
        {
          kind: "flow",
          title: "Pilot ladder for a control function",
          steps: [
            { label: "Rung 1 analytics", detail: "Read-only stow and tracking analytics; baseline of losses" },
            { label: "Shadow mode", detail: "Optimiser computes dust and night stow decisions without acting; compare with what happened" },
            { label: "Advisory on test blocks", detail: "Operator executes recommendations on matched test blocks; control blocks unchanged" },
            { label: "Supervisory on test blocks", detail: "Level 2 requests with vendor non-objection, expiry and heartbeat; paired measurement" },
            { label: "Readout and decision", detail: "Effect with confidence interval, energy and cycle cost, incidents; joint review with owner, vendor and KISR" },
          ],
          caption: "Each step has written entry criteria and stop rules. Never skip from analytics straight to supervisory control.",
        },
        { kind: "sources", refs: ["mz05-r12", "mz05-r13", "mz05-r14", "mz05-r15", "mz05-r16", "mz05-r20", "mz05-r23"] },
      ],
    },
    {
      layer: "applied",
      title: "Sizing the trial and the value",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many pair-cycles to detect a modest night-stow effect",
          given: md`Illustrative. Outcome: soiling loss at the end of each 30-day cleaning cycle, test block minus control block, in percentage points. You want to detect a 10% reduction in soiling rate, which at 0.4%/day over 30 days is $0.1 \times 12 = 1.2$ points at end of cycle. From historical data on matched blocks, the standard deviation of the paired difference is $\sigma_d = 1.5$ points. $\alpha = 0.05$, power 80%. Four matched block pairs are available.`,
          steps: [
            { md: md`**Sample size.** $n = (2.80 \times 1.5 / 1.2)^2 = 3.5^2 = 12.25$, so 13 pair-cycles.` },
            { md: md`**Trial length.** With 4 pairs, $13/4 = 3.25$, so 4 cleaning cycles, about 4 months.` },
            { md: md`**Sanity check.** If the true effect were the 30% assumed in lesson 3 (3.6 points), $n = (2.8 \times 1.5/3.6)^2 = 1.4$: two cycles would show it. Sizing for 10% protects against a smaller real effect and still finishes inside one season.` },
            { md: md`**Season.** Dust and dew vary by season; a 4-month trial in one season answers one season. Say so in the readout, and plan a second season before claiming an annual number.` },
          ],
          result: md`Four matched block pairs over four cleaning cycles detect a 10% rate reduction with 80% power, if $\sigma_d$ is 1.5 points. The binding constraints are the number of good block pairs and the cleaning cycle, not the software.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The same trial with noisier blocks",
          given: md`Historical data show the paired difference is noisier than hoped: $\sigma_d = 2.0$ points. Same target effect (1.2 points), $\alpha = 0.05$, power 80%, four block pairs, 30-day cycles.`,
          steps: [
            {
              md: md`**Sample size.** $n = (2.80 \times 2.0/1.2)^2 = 4.667^2 = 21.8$, so 22 pair-cycles.`,
              hidden: true,
              check: { prompt: "Required pair-cycles (unrounded)", answer: 21.8, tolerance: { abs: 0.2 } },
            },
            {
              md: md`**Cycles with four pairs.** $22/4 = 5.5$, so 6 cleaning cycles, about 6 months.`,
              hidden: true,
              check: { prompt: "Cleaning cycles needed", answer: 6, tolerance: { abs: 0 } },
            },
            {
              md: md`**Options.** Add block pairs (better matching reduces $\sigma_d$ too), accept a larger detectable effect, or use paired reference cells on rows to measure soiling directly with less noise than block energy.`,
            },
          ],
          result: md`Noise in the measurement directly lengthens the trial. Investing in better soiling measurement on test and control rows is often cheaper than months of extra trial.`,
        },
        {
          kind: "question",
          question: {
            id: "mz05-l05-p1",
            type: "numeric",
            prompt: md`If a night-stow function is proven to be worth USD 73,900 per year per 100 MWac to an owner, and Mizan prices at 20% of verified value, what is the annual fee per 100 MWac (USD)?`,
            answer: 14780,
            tolerance: { abs: 20 },
            unit: "USD/yr",
            explanation: md`$0.20 \times 73{,}900 = $ USD 14,780 per year per 100 MWac. Value-share pricing only works once the value is measured, which is another reason the paired trial comes first.`,
            concepts: ["mz05.vendor-white-space"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the control pilot",
      blocks: [
        {
          kind: "xref",
          to: "fc04-l06",
          note: "Founder Core covers pilot commercials: paid pilots, buyer-agreed success criteria and conversion clauses. Apply them here with the control-specific additions below.",
        },
        {
          kind: "xref",
          to: "fc08-l07",
          note: "Pilot contracts, data rights and liability caps are in Founder Core. A control pilot adds the vendor's non-objection and the treatment of optimiser stows in O&M guarantees.",
        },
        {
          kind: "md",
          md: md`**Where this fits in Mizan's sequence.** The live thread is a soiling analytics pilot targeted at Shagaya Phase I with KISR researchers as methodology partner; it is in preparation, not signed. The research brief does not record Shagaya Phase I's mounting (fixed or tracker), so check it before proposing any tracker function there. The natural order is soiling analytics first (it produces the soiling estimate every stow decision needs), then rung 1 stow analytics on a tracker plant, then a control trial. Large new Gulf plants mostly use trackers with robots, which is where a control function will eventually be sold.

**Who must sign what.**
- **Owner or IPP**: pilot agreement, success criteria, test and control blocks, data rights.
- **Tracker vendor**: written non-objection naming the function, permitted angles, cycle budget, interface and confirmation that the warranty is unaffected.
- **O&M contractor**: procedure change and how optimiser stows count in availability and PR.
- **Insurer and lenders' technical adviser**: notified by the owner, with the safety case.
- **KISR or another research partner**: measurement protocol and analysis plan, written before data collection.

**What a safety case for the function contains.** The command priority, the only-more-conservative rule, expiry and heartbeat behaviour, the FAT and SAT results, the stop rules and the incident log (lesson 4).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Approaching the vendor as a competitor ("your tracker lacks a dust mode") instead of as a partner bringing evidence they lack.
- Agreeing success criteria in energy terms at block level, where weather noise swamps the effect, instead of measured soiling ratio on paired rows.
- No agreement on how optimiser stows count in the availability guarantee; the O&M contractor quietly refuses to execute recommendations.
- Announcing results from one season, or from one dust event, as an annual effect.
- Skipping the shadow-mode step, so the first time the logic is tested is on real trackers.`,
        },
        {
          kind: "checklist",
          title: "Pilot readiness for a control function",
          items: [
            "Vendor non-objection letter naming function, angles, cycle budget and interface",
            "Matched test and control blocks with historical data to estimate the paired variability",
            "Sample size computed and trial length agreed in pair-cycles, with the season stated",
            "Measurement protocol and analysis plan agreed with the research partner before data collection",
            "Treatment of optimiser stows in O&M availability and PR agreed in writing",
            "Stop rules, incident reporting and liability allocation in the pilot contract",
          ],
        },
        {
          kind: "ask",
          title: "Ask before proposing the pilot",
          items: [
            "Vendor: would you support a jointly measured dust and night-stow trial on your platform, and under what conditions?",
            "Vendor: do you have any unpublished dust, sand or cleaning-position modes we should build on rather than duplicate?",
            "Owner: which blocks are comparable in orientation, cleaning schedule and history?",
            "O&M contractor: how would an operator-executed advisory stow be treated under your availability guarantee?",
            "Research partner: what effect size would be worth publishing, and what measurement would you trust?",
          ],
        },
        { kind: "scenario", scenario: "mz05-s3" },
        {
          kind: "question",
          question: {
            id: "mz05-l05-p2",
            type: "short",
            prompt: md`Write a one-page pilot proposal for a "dust and night stow" control function addressed jointly to an IPP and its tracker vendor at a Gulf tracker plant. Use illustrative numbers clearly labelled. It must be something both could sign.`,
            rubric: [
              "Frames the vendor as a partner and keeps all vendor safety logic in charge (only-more-conservative requests, expiry, heartbeat)",
              "Uses a staged ladder (analytics baseline, shadow mode, advisory or supervisory on test blocks) with entry criteria and stop rules",
              "Defines a paired-block design with a sample size in pair-cycles and the season covered",
              "States success criteria in measured soiling terms with a confidence interval, plus energy, cycle and incident guardrails",
              "Covers warranty non-objection, O&M availability treatment, liability, data rights and insurer or lender notification",
              "Labels all expected benefits as hypotheses and illustrative numbers as such",
            ],
            modelAnswer: md`**Purpose.** Measure, on this plant, whether a dust-event and night stow policy reduces soiling, at no cost to structural safety. **Partners.** IPP (owner), tracker vendor (platform and safety logic), O&M contractor (operations), Mizan (analytics and optimiser), research partner (protocol review). **Stages.** (1) Weeks 1 to 4: read-only baseline of stow events, energy lost and soiling on all blocks. (2) Weeks 5 to 8: shadow mode; Mizan logs what it would have requested. Entry to stage 3 requires zero logic errors in review. (3) Weeks 9 to 26: four matched test blocks receive night and dust positions through the vendor's interface (or operator-executed advisory if no interface), four control blocks unchanged. **Safety.** Vendor wind, hail and fail-safe logic override at all times; Mizan may only request vendor-approved positions; every request expires within 6 h and never past sunrise for night positions; heartbeat loss drops all requests. Stop rules: any vendor alarm attributable to the trial, any row failing to reach position, any robot cleaning missed. **Design.** Outcome: end-of-cycle soiling loss difference (test minus control) measured with paired reference cells. Illustrative sizing: $\sigma_d = 1.5$ points, target 1.2 points, 80% power: 13 pair-cycles, so four 30-day cycles with four pairs. Covers one season; a second season is needed for an annual figure. **Success criteria.** Primary: mean soiling reduction with 95% confidence interval excluding zero. Guardrails: energy lost to optimiser stows below 0.1% of test-block energy; extra cycles within the vendor's stated budget; zero safety incidents. **Commercials and contract.** Paid pilot credited against a first-year licence; vendor non-objection letter confirming warranty unaffected for the stated angles and cycles; optimiser stows counted as available time in the O&M guarantee; liability capped at the pilot fee except for gross negligence; plant data owned by the IPP, Mizan licensed to use it for the service and, with consent, aggregated research. Owner notifies insurer and lenders' technical adviser. **Hypothesis, not a promise.** Published studies (Figgis 2019, Khan 2024) suggest a benefit; this pilot measures whether it exists here and how large it is.`,
            explanation: md`A signable control pilot keeps the vendor's safety logic in charge, climbs a staged ladder, is statistically sized, measures soiling directly and settles warranty, guarantee, liability and data terms up front.`,
            concepts: ["mz05.control-pilot-ladder", "mz05.paired-block-design", "mz05.warranty-risk"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a potential investor why the absence of a dust-storm stow among tracker vendors is an opportunity for Mizan, and why it is not by itself a moat.",
          keyPoints: [
            "Public vendor material covers wind, hail, snow and diffuse modes but not dust or soiling stow (to be confirmed against manuals)",
            "The physics and the forecast-triggered architecture both exist, so it is buildable",
            "A vendor could ship a dust mode in a firmware update once the effect is proven",
            "Mizan's defensibility is the measured, site-specific evidence and the link to soiling analytics and cleaning decisions",
            "Partnering with or licensing to a vendor may be the best route",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz05-l05-q1",
      type: "mcq",
      prompt: md`Which statement about tracker vendors matches the research brief?`,
      options: [
        "Arctech markets a sandstorm mode for its Middle East projects",
        "No major vendor publicly markets a dust-storm stow, a finding based on public material only",
        "Array Technologies offers a soiling-optimised night stow",
        "GameChange does not mention robotic cleaners",
      ],
      answer: 1,
      explanation: md`The brief found wind, hail, snow and diffuse modes and robot integration (GameChange), but no dust-storm or soiling stow, and flags that conclusion as unverified against vendor manuals.`,
      concepts: ["mz05.vendor-white-space"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz05-l05-q2",
      type: "order",
      prompt: md`Order the rungs of a safe control pilot.`,
      items: [
        "Read-only stow and tracking analytics baseline",
        "Shadow mode: compute decisions without acting",
        "Advisory or supervisory on matched test blocks",
        "Readout with confidence interval and joint decision",
      ],
      explanation: md`Each rung creates the evidence and trust for the next. Skipping shadow mode means the logic is first tested on real trackers.`,
      concepts: ["mz05.control-pilot-ladder"],
      difficulty: 1,
    },
    {
      id: "mz05-l05-q3",
      type: "numeric",
      prompt: md`A paired trial needs to detect 1.0 point of soiling difference with $\sigma_d = 1.2$ points, $\alpha = 0.05$ two-sided and 80% power. How many pair-cycles are needed (round up)?`,
      answer: 12,
      tolerance: { abs: 0 },
      explanation: md`$n = (2.80 \times 1.2/1.0)^2 = 3.36^2 = 11.3$, so 12 pair-cycles.`,
      concepts: ["mz05.paired-block-design"],
      difficulty: 2,
    },
    {
      id: "mz05-l05-q4",
      type: "multi",
      prompt: md`Which should be in place before Mizan's requests move any tracker on a financed plant?`,
      options: [
        "Written vendor non-objection naming the function, angles and cycle budget",
        "Agreement on how optimiser stows count in the O&M availability guarantee",
        "Notification of the insurer and the lenders' technical adviser by the owner",
        "A press release announcing the dust-stow product",
        "A liability allocation in the pilot contract",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`A press release before results is a credibility risk, not a prerequisite. The other four cover warranty, guarantees, insurance and finance, and liability.`,
      concepts: ["mz05.warranty-risk"],
      difficulty: 2,
    },
    {
      id: "mz05-l05-q5",
      type: "mcq",
      prompt: md`Why is the stow logic alone not a durable moat?`,
      options: [
        "It is patented by the vendors",
        "A tracker vendor could add a dust mode in a firmware update once the effect is proven",
        "Stow logic cannot be implemented in software",
        "Owners do not care about soiling",
      ],
      answer: 1,
      explanation: md`The logic is simple once the evidence exists. Defensibility comes from measured site evidence, soiling analytics and cleaning integration, vendor neutrality, or a partnership.`,
      concepts: ["mz05.vendor-white-space"],
      difficulty: 1,
    },
    {
      id: "mz05-l05-q6",
      type: "decision",
      prompt: md`An O&M contractor agrees to an advisory dust-stow trial but has not agreed how operator-executed stows count in its availability guarantee. The trial is due to start next week. What do you do?`,
      options: [
        { text: "Start anyway and sort it out later", score: 0.1, feedback: "The contractor will quietly decline recommendations that hurt its guarantee, and your data will be biased or empty." },
        { text: "Delay start until the owner and contractor agree in writing that requested stows count as available time (or are excluded from the calculation)", score: 1, feedback: "Right: the incentive problem is the most likely cause of a failed trial and is cheap to fix before it starts." },
        { text: "Offer to pay the contractor for any lost availability out of Mizan's pocket", score: 0.4, feedback: "It can work but creates an open-ended liability and does not fix the contract." },
      ],
      explanation: md`Guarantees drive operator behaviour. Align them before the trial, or the trial measures the contractor's incentives instead of the stow effect.`,
      concepts: ["mz05.warranty-risk", "mz05.control-pilot-ladder"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz05-l05-f1", front: "The vendor white space", back: "No major tracker vendor publicly markets dust-storm stow or soiling night stow (public material, unverified against manuals).", concepts: ["mz05.vendor-white-space"] },
    { id: "mz05-l05-f2", front: "Mizan's defensibility in control", back: "Measured site evidence, coupling to soiling analytics and cleaning decisions, vendor neutrality, or a vendor partnership. Not the stow logic alone.", concepts: ["mz05.vendor-white-space"] },
    { id: "mz05-l05-f3", front: "Product ladder", back: "Stow analytics (read-only), advisory stow, supervisory stow on test blocks, fleet function or vendor partnership.", concepts: ["mz05.control-pilot-ladder"] },
    { id: "mz05-l05-f4", front: "Paired sample size", back: md`$n = ((z_{\alpha/2} + z_\beta)\sigma_d/\delta)^2$; with 2.80 for 5% and 80% power. Count independent pair-cycles.`, concepts: ["mz05.paired-block-design"] },
    { id: "mz05-l05-f5", front: "Four sign-offs for a control pilot", back: "Vendor non-objection, owner pilot agreement, O&M treatment of optimiser stows, insurer and lender notification.", concepts: ["mz05.warranty-risk"] },
    { id: "mz05-l05-f6", front: "Shadow mode", back: "The optimiser computes decisions and logs them without acting; compared with what happened before any control is handed over.", concepts: ["mz05.control-pilot-ladder"] },
  ],
  scenarios: [
    {
      id: "mz05-s3",
      title: "The vendor says: we could build that ourselves",
      dayInLife: true,
      context: md`Illustrative. You and Omar Abu Harb meet the regional technical manager of a tracker vendor with a large Gulf fleet, introduced by an IPP that is interested in a dust and night-stow trial. Ten minutes in, the manager says: "Interesting. But if dust stow works, we will add it to our firmware. Why would we let a startup send commands to our trackers?"`,
      start: "a",
      concepts: ["mz05.vendor-white-space", "mz05.warranty-risk", "mz05.integration-levels"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "Argue that your algorithm is far better than anything the vendor could build.", next: "b", score: 2, feedback: "You have no evidence yet, and you have turned a potential partner into a competitor." },
            { text: "Agree that the stow logic is simple, and say what is hard: measuring the soiling effect at a site, and coupling stow to soiling estimates and cleaning schedules. Propose a jointly measured trial where their safety logic stays in charge and they keep the evidence for their own product.", next: "c", score: 9, feedback: "Honest about the moat, gives them a reason to cooperate, and keeps safety on their side." },
            { text: "Say the IPP has already decided, so they have to allow it.", next: "b", score: 1, feedback: "The vendor controls the warranty; pressure via the owner usually ends with a no." },
          ],
        },
        b: {
          md: md`The manager closes politely: "Send us something in writing." The IPP contact looks uncomfortable.`,
          choices: [
            { text: "Follow up with a short note that reframes the trial as joint evidence, read-only first, with their logic in charge, and offer to start at advisory level without any interface.", next: "c", score: 6, feedback: "Recoverable: you lowered the ask to something they can say yes to." },
            { text: "Drop the vendor and propose advisory-only to the IPP.", score: 4, feedback: "Advisory is possible without the vendor, but rung 3 will need them; burning the relationship now costs you later." },
          ],
        },
        c: {
          md: md`The manager is interested but asks: "What exactly would you need from us, and what do we get?"`,
          choices: [
            { text: "Ask for: confirmation of permitted night and dust angles and the cycle budget, read access to row status, and later a request interface with expiry. Offer: joint data and analysis, co-authorship of results with the research partner, and first right to license the function for their fleet.", score: 10, feedback: "A concrete, bounded ask with a real return. This is what a partnership-led route looks like." },
            { text: "Ask for full write access to the controllers so you can iterate quickly.", score: 0, feedback: "Level 4 access will never be granted and signals you do not understand their risk." },
            { text: "Say you will figure out the details after the trial.", score: 3, feedback: "Vague asks get vague answers; the vendor needs to know the scope to approve it." },
          ],
        },
      },
    },
  ],
};

export default lesson;
