import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw13-l03",
  title: "Incumbents and in-house tools: build vs buy in test organisations",
  summary:
    "Why test organisations build their own tools and stay loyal to NI, Vector, dSPACE, Keysight and MathWorks, what those incumbents are adding (AI assistants, MCP servers) and what they still lack, how to put a number on the internal script, and the playbook for winning against spreadsheets and scripts without making their author your enemy.",
  minutes: 80,
  objectives: [
    "Explain the six forces that push test teams to build their own tools, and which of them Afterwave can neutralise",
    "Compute the total cost of an internal tool and a bought tool over a horizon, and the break-even year",
    "Describe what each test and measurement incumbent sells at the bench, what it added in 2025 to 2026 and where its selection capability stops",
    "Run the 'wrap, then extend' play: integrate with incumbents and scripts, make the script author a champion, win on what the script cannot do",
  ],
  concepts: [
    { id: "aw13.build-forces", name: "Forces behind build vs buy in test orgs", description: "Unique rigs, strong in-house engineers, data that cannot leave, engineer time that looks free compared with a purchase order, vendors who do not understand the rig, and fear of lock-in.", competency: "aw-business", related: ["fc03.competitive-alternatives"] },
    { id: "aw13.internal-tool-tco", name: "Internal tool total cost of ownership", description: "Build cost plus annual maintenance and key-person risk over a horizon, compared with integration plus subscription plus administration for a bought tool.", competency: "aw-business", related: ["aw13.build-forces"] },
    { id: "aw13.key-person-risk", name: "Key-person risk", description: "The expected annual loss from the single author of an internal tool leaving or moving: probability per year times the cost of rebuilding or reverse-engineering it.", competency: "aw-business", related: ["aw13.internal-tool-tco"] },
    { id: "aw13.incumbent-advantage", name: "Incumbent advantage in test and measurement", description: "Installed base, instrument drivers, file formats, procurement frameworks, training and trust built over decades; incumbents now add AI assistants on top of their own tools.", competency: "aw-business", related: ["aw13.landscape-layers"] },
    { id: "aw13.wrap-extend", name: "Wrap, then extend", description: "Enter by reading the incumbent's files and the team's scripts rather than replacing them, take over the maintenance burden, then win on capabilities the script cannot reach (cross-rig dependency model, rationale, evidence trail).", competency: "aw-business", related: ["aw13.incumbent-advantage", "aw13.internal-tool-tco"] },
    { id: "aw13.script-author", name: "Script author as champion", description: "The engineer who built the internal tool is both the biggest blocker and the best champion; give him ownership of the dependency model and credit for the result.", competency: "aw-business", related: ["aw13.wrap-extend"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why test teams build, and why incumbents stay",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Ismail and Yusuf come from organisations that built their own test tooling, and most of your prospects will have done the same. In a hardware test lab "we built our own" is not an excuse, it is often true and often good. If you cannot show the head of validation, with his numbers, what the script costs and what it cannot do, you will lose more deals to a Python folder than to Nominal. And when you meet NI, Vector or dSPACE, you need to know whether you are replacing them (almost never) or riding on them (almost always).`,
        },
        {
          kind: "md",
          md: md`### Six forces that push test organisations to build

1. **Every rig is unique.** A dyno with a custom fixture, a joint test stand with its own torque sensor: generic tools need adaptation, and the team already knows how.
2. **Strong in-house engineers.** Test-systems engineers write LabVIEW, Python and TestStand sequences daily. Building a comparison script is a week, not a project.
3. **Data cannot leave.** Security reviews for a new vendor take months; a script on a lab PC needs none.
4. **Engineer time looks free; a purchase order does not.** Salaries are already budgeted; a USD or EUR 40k subscription needs approval, a vendor onboarding, sometimes a tender.
5. **Vendors do not understand the rig.** Generic software vendors ask questions that show they have never calibrated a load cell. This is where Ismail and Yusuf's backgrounds are an asset.
6. **Fear of lock-in.** Test definitions and data formats outlive vendors; teams prefer what they can open in ten years.

Afterwave can neutralise 1, 3, 5 and 6 by design (rig-aware capture, Enclave on their servers, a team from Tesla validation, open export formats). Force 4 is economics, handled below. Force 2 is a person, handled in the field section.

### What the incumbents sell, and where they stop

| Incumbent | At the bench | 2025 to 2026 moves (as found) | Selection after a change |
|---|---|---|---|
| **NI (Emerson)** | DAQ hardware, FlexLogger, TestStand, LabVIEW, SystemLink | SystemLink broader availability (Jul 2025); Nigel AI assistant across LabVIEW+, FlexLogger, TestStand, SystemLink (announced 13 May 2026, GA later in 2026) | None found |
| **Vector** | CANoe, vTESTstudio, VectorCAST | CANoe 20 SP2 with MCP server and an AI package that generates and fixes CAPL tests (24 Aug 2026, single source) | **Code-level** change-based testing in VectorCAST |
| **dSPACE** | SCALEXIO HIL, SIL | "MCP-enabled AI engineering workflows" (5 Aug 2026, headline only) | None found |
| **Keysight** | PathWave Test Automation on OpenTAP (v9.34, 1 Jul 2026) | Linux support | None found |
| **MathWorks** | Simulink Test | Baseline, equivalence and back-to-back regression with CI | **Model-level** regression |

The pattern: incumbents are putting **assistants on top of their own tools**, so the buyer will hear "Nigel will do that". An assistant inside TestStand can help write a sequence; it does not, as advertised, hold a cross-tool model of which firmware modules, rigs and tests depend on each other. That model, and the rationale it produces, is Ripple's job, and it needs data from every vendor's tool, which is easier for a neutral party than for one incumbent.

### Incumbent advantages you will not overturn

Installed base and instrument drivers; file formats (TDMS, MDF) that half the industry reads; procurement frameworks and preferred-supplier status; training and certification; and trust from decades of not losing data. Do not compete on any of these. **Read their files, run beside their sequencers, and send your selected test list back into their test executive.**`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Single-source items",
          md: md`The CANoe AI package (24 Aug 2026) is a single source, and dSPACE's MCP announcement was seen as a headline only. NI's Nigel GA was "later in 2026" at announcement; check whether it has shipped before referring to it. HEAD acoustics and other niche incumbents were not researched.`,
        },
        { kind: "equation", formula: "aw13-tco-build" },
        { kind: "equation", formula: "aw13-key-person" },
        { kind: "equation", formula: "aw13-tco-buy" },
        { kind: "equation", formula: "aw13-break-even" },
        {
          kind: "chart",
          chart: "line",
          title: "Cumulative cost: internal script vs bought capture and analysis tool (illustrative)",
          xKey: "year",
          xLabel: "Years after start",
          yLabel: "Cumulative cost (EUR k)",
          series: [
            { key: "build", label: "Build: 60 + 28 T" },
            { key: "buy", label: "Buy: 15 + 45 T" },
          ],
          data: [
            { year: 0, build: 60, buy: 15 },
            { year: 1, build: 88, buy: 60 },
            { year: 2, build: 116, buy: 105 },
            { year: 3, build: 144, buy: 150 },
            { year: 4, build: 172, buy: 195 },
            { year: 5, build: 200, buy: 240 },
          ],
          caption: "Numbers from the worked example below. The lines cross at about 2.6 years: on cost alone the script wins in the long run. A vendor that sells only what the script already does should lose this deal.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Putting a number on the script",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Build vs buy for run comparison and capture (illustrative)",
          given: md`Illustrative lab, not a real account. A senior test-systems engineer spent half a year building scripts that align DAQ files with screen recordings and compare runs. Fully loaded cost EUR 120k per year. Maintenance (new rigs, DAQ driver updates, OS changes) estimated at 30 % of build cost per year. The engineer has, in the head of validation's estimate, a 20 % chance per year of leaving or moving; reconstructing the tool would cost EUR 50k. A bought tool: EUR 15k one-off integration and security review, EUR 40k per year subscription, EUR 5k per year administration. Horizon 3 years.`,
          steps: [
            { md: md`**Build cost:** $C_0 = 0.5 \times 120{,}000 = \text{EUR } 60{,}000$.` },
            { md: md`**Annual build run cost:** maintenance $\mu C_0 = 0.30 \times 60{,}000 = 18{,}000$; key-person risk $R = 0.20 \times 50{,}000 = 10{,}000$; total EUR 28,000 per year.` },
            { md: md`**Three-year totals:** $TCO_{build}(3) = 60{,}000 + 3 \times 28{,}000 = \text{EUR } 144{,}000$. $TCO_{buy}(3) = 15{,}000 + 3 \times (40{,}000 + 5{,}000) = \text{EUR } 150{,}000$.` },
            { md: md`**Break-even:** $T^{*} = (60{,}000 - 15{,}000)/(45{,}000 - 28{,}000) = 45{,}000/17{,}000 \approx 2.6$ years. Buying is cheaper only in the first 2.6 years.` },
            { md: md`**Add what the script cannot do.** Suppose (illustrative, to be measured in a pilot) the lab runs 24 regression-triggering releases a year at 160 rig-hours each, EUR 100 per rig-hour, and change-impact selection safely removes 30 % of those rig-hours. Value: $24 \times 160 \times 0.30 \times 100 = \text{EUR } 115{,}200$ per year. The script compares runs; it does not select tests. On a value basis the decision is no longer close. The value formula itself is taught in Founder Core fc03 (lesson 3).` },
          ],
          result: md`On cost alone the script wins after about 2.6 years, so **never sell against a script on cost**. Sell what it does not do (selection with a rationale across firmware, rig and history) and offer to take over the capture and alignment work so the engineer's time moves to higher-value testing.`,
        },
        { kind: "xref", to: "fc03-l03", note: "Value quantification: turning rig-hours released into a price, and the share of value a new vendor can capture." },
        {
          kind: "worked",
          mode: "faded",
          title: "A bigger internal tool (illustrative)",
          given: md`Illustrative. Two engineers spent half a year each (EUR 110k per year loaded) building an internal test data and comparison tool. Maintenance 25 % of build cost per year. Key-person: 15 % per year probability, EUR 80k loss. Bought alternative: EUR 20k integration, EUR 60k per year subscription, EUR 6k per year administration.`,
          steps: [
            { md: md`$C_0 = 2 \times 0.5 \times 110{,}000 = \text{EUR } 110{,}000$. Annual build run cost: $0.25 \times 110{,}000 + 0.15 \times 80{,}000 = 27{,}500 + 12{,}000 = \text{EUR } 39{,}500$.` },
            {
              md: md`$TCO_{build}(3) = 110{,}000 + 3 \times 39{,}500 = \text{EUR } 228{,}500$; $TCO_{buy}(3) = 20{,}000 + 3 \times 66{,}000 = \text{EUR } 218{,}000$.`,
              hidden: true,
              check: { prompt: "Three-year build TCO (EUR)", answer: 228500, tolerance: { rel: 0.005 }, unit: "EUR" },
            },
            {
              md: md`$T^{*} = (110{,}000 - 20{,}000)/(66{,}000 - 39{,}500) = 90{,}000/26{,}500 \approx 3.4$ years.`,
              hidden: true,
              check: { prompt: "Break-even horizon T*", answer: 3.4, tolerance: { abs: 0.05 }, unit: "yr" },
            },
          ],
          result: md`Buying is cheaper for about 3.4 years, so a three-year deal is a modest cost win. It is still a thin argument: the internal team will say the next version of their tool will be cheaper to maintain. Lead with the value the tool cannot reach.`,
        },
        {
          kind: "question",
          question: {
            id: "aw13-l03-p1",
            type: "numeric",
            prompt: md`Illustrative: an internal tool cost EUR 80k to build, maintenance is 35 % of build cost per year, and key-person risk is 25 % per year times EUR 40k. A bought tool costs EUR 10k to integrate plus EUR 50k per year all-in. What is the break-even horizon in years?`,
            answer: 5.83,
            tolerance: { abs: 0.05 },
            unit: "yr",
            explanation: md`Build run cost: $0.35 \times 80{,}000 + 0.25 \times 40{,}000 = 28{,}000 + 10{,}000 = 38{,}000$ per year. $T^{*} = (80{,}000 - 10{,}000)/(50{,}000 - 38{,}000) = 70{,}000/12{,}000 \approx 5.8$ years. Buying stays cheaper for almost six years, longer than a typical three-year contract, because the internal tool here carries heavy maintenance (35 % of build cost per year). High maintenance is the cost argument's best case; look for it in discovery.`,
            concepts: ["aw13.internal-tool-tco"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Winning against spreadsheets, scripts and incumbents",
      blocks: [
        {
          kind: "md",
          md: md`### The playbook

1. **Find the script author before the demo.** Ask who built the current tooling and invite him to the technical session. If he first hears about you from his manager, he will defend his code.
2. **Respect it out loud.** "Your alignment script does what most labs never manage." It is true, and it buys you the right to talk about what it does not do.
3. **Wrap, do not replace.** Lockstep and Ripple read the files the team already writes (TDMS from NI, MDF from Vector tools, CSV and Parquet from scripts). The selected test list goes back into TestStand, Xray or their own runner.
4. **Take the boring part off his desk.** Capture, time alignment and data housekeeping are the maintenance the engineer does not enjoy. Offer to own them.
5. **Win on what his script cannot reach.** A dependency model across firmware modules, rigs, fixtures and tests; a written rationale per selected and skipped test; an evidence trail usable in a safety review. Make him the owner of that model inside the customer.
6. **Use his numbers.** Run the TCO and value calculation with the head of validation, in his spreadsheet, with his estimates. Your inputs will be ignored; his will not.
7. **Against incumbents, integrate.** Never pitch "replace TestStand" or "replace SystemLink". Pitch "your NI and Vector tools, plus the decision about what to rerun".`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How founders lose to the script",
          md: md`- **Insulting the tool.** "That will not scale" in front of its author ends the deal.
- **Selling on cost.** As the worked example shows, the script usually wins on cost after two to four years.
- **Requiring a rip-and-replace.** Asking the team to stop using its own tools on day one creates the strongest possible opponent.
- **Ignoring the security path.** The script needs no review; you do. Start the security questionnaire in the first meeting, not after the pilot.
- **Underestimating the incumbent bundle.** If NI or Vector adds a feature to a licence the customer already pays for, your price comparison is against zero. Your differentiation must be in a job their assistant does not do.`,
        },
        {
          kind: "checklist",
          title: "Before proposing a pilot to a team with its own tools",
          items: [
            "Script or tool author identified, met and invited to the technical session",
            "List of file formats and test executives Afterwave must read from and write to",
            "TCO and value inputs collected from the head of validation in his own words",
            "Clear statement of which parts of their tooling stay untouched",
            "Security questionnaire requested and owner named",
            "Pilot success criterion defined against their current method (e.g. selection compared with a parallel full regression)",
          ],
        },
        {
          kind: "ask",
          title: "Questions that surface the true cost of the internal tool",
          items: [
            "Who maintains the scripts when a new rig or DAQ firmware arrives? How many days did the last change take?",
            "If that engineer left next month, who could change the tool?",
            "What do the scripts not do that you wish they did?",
            "What did you decide not to test last quarter because rig time ran out?",
            "Which of your NI, Vector or dSPACE tools must keep working exactly as they do today?",
          ],
        },
        { kind: "scenario", scenario: "aw13-s2" },
        {
          kind: "question",
          question: {
            id: "aw13-l03-p2",
            type: "short",
            prompt: md`**Write the build-vs-buy one-pager you would leave with a head of validation** whose team built its own capture and comparison scripts. Include: (1) the six forces and which ones apply to his team; (2) a TCO table over three years with clearly labelled illustrative inputs or placeholders he fills in, and the break-even year; (3) the capabilities his tools do not reach and the value calculation for them; (4) which of his existing tools (incumbent and in-house) stay untouched and how Afterwave connects to them; (5) a proposed pilot with a success criterion against his current method.`,
            rubric: [
              "Forces are applied to the specific team, not listed generically, and the answer acknowledges what the internal tool does well",
              "TCO uses build, maintenance, key-person risk, integration, subscription and administration, with correct arithmetic and an honest break-even",
              "The answer does not rely on cost alone; it quantifies the value of selection with a rationale using the buyer's inputs",
              "Incumbent and in-house tools are kept and integrated (read their formats, write back the test list), with no rip-and-replace",
              "Pilot has a measurable success criterion compared with the current method and no invented results",
            ],
            modelAnswer: md`**1. Forces.** Your rigs are unique (custom actuator stands), your team is strong (the alignment scripts work), and data cannot leave the lab. Afterwave runs on your servers (Enclave), reads your existing files, and exports everything in open formats.

**2. TCO (illustrative, replace with your numbers).** Build: EUR 60k initial (half a senior engineer-year); maintenance 30 % per year (EUR 18k); key-person risk 20 % per year times EUR 50k (EUR 10k). Three years: EUR 144k. Buy: EUR 15k integration, EUR 40k per year subscription, EUR 5k per year admin. Three years: EUR 150k. Break-even about 2.6 years: on cost alone the scripts are competitive.

**3. What the scripts do not reach.** Selecting which tests to rerun after a firmware, model or rig change, with a written rationale per test; a dependency model across modules, rigs and fixtures; an evidence trail for safety reviews. Value at your illustrative inputs (24 releases, 160 rig-hours, EUR 100 per rig-hour, 30 % rig-hours removed safely): EUR 115k per year, to be measured in the pilot.

**4. What stays.** NI DAQ and FlexLogger, TestStand, Xray and your comparison scripts. Lockstep reads your TDMS and script outputs; Ripple's selection is exported as a TestStand sequence list or Xray plan. Your senior engineer owns the dependency model.

**5. Pilot.** Eight weeks, two rigs, the next two firmware releases. Ripple recommends a subset with a rationale; you run the full regression in parallel. Success: zero regressions found by the full run that Ripple's selection missed, and the rig-hours the selection would have saved, measured.`,
            explanation: md`Graded against the rubric. The test is whether you can be honest that the script wins on cost and still make a stronger case on value, without asking the team to throw anything away.`,
            concepts: ["aw13.build-forces", "aw13.internal-tool-tco", "aw13.wrap-extend", "aw13.script-author"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf why Afterwave should never argue against an internal script on cost, and what it should argue instead.",
          keyPoints: [
            "Engineer time looks free, and the internal tool's annual run cost is often lower than a subscription",
            "TCO with maintenance and key-person risk still usually breaks even within two to four years",
            "The winning argument is value the script cannot reach: selection after a change with a rationale, cross-rig dependency model, evidence trail",
            "Wrap the script, take over the boring maintenance, and make its author the owner of the dependency model",
          ],
        },
        { kind: "sources", refs: ["aw13-r15", "aw13-r16", "aw13-r17", "aw13-r18", "aw13-r19", "aw13-r25", "aw13-r23"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw13-l03-q1",
      type: "multi",
      prompt: "Which forces behind building in-house can Afterwave neutralise largely by product and team design?",
      options: [
        "Data cannot leave the lab",
        "Vendors do not understand the rig",
        "Fear of lock-in",
        "Engineer time looks free compared with a purchase order",
      ],
      answer: [0, 1, 2],
      explanation: md`Enclave on customer servers, a team from Tesla drive validation, and open export formats address the first three. The budget asymmetry is economic and must be handled with TCO and value, not design.`,
      concepts: ["aw13.build-forces"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw13-l03-q2",
      type: "numeric",
      prompt: md`Illustrative: build cost EUR 40k, maintenance 30 % per year, key-person risk EUR 6k per year. What is the internal tool's three-year TCO? (EUR)`,
      answer: 94000,
      tolerance: { rel: 0.005 },
      unit: "EUR",
      explanation: md`$TCO_{build}(3) = 40{,}000 + 3 \times (0.30 \times 40{,}000 + 6{,}000) = 40{,}000 + 3 \times 18{,}000 = \text{EUR } 94{,}000$.`,
      concepts: ["aw13.internal-tool-tco"],
      difficulty: 1,
    },
    {
      id: "aw13-l03-q3",
      type: "mcq",
      prompt: "A prospect says: \"NI's Nigel assistant will do this for us.\" What is the most accurate response?",
      options: [
        "Nigel is vapourware.",
        "Nigel is an assistant across NI's own tools (LabVIEW+, FlexLogger, TestStand, SystemLink); as advertised it does not hold a cross-tool model of which firmware, rig and test changes affect which tests. Ripple uses NI data as an input.",
        "Nigel only works in the cloud.",
        "NI does not sell to robotics companies.",
      ],
      answer: 1,
      explanation: md`Describe accurately, acknowledge it helps inside NI's tools, and locate Ripple's job across tools. Never call a competitor's product vapourware or make claims you cannot source.`,
      concepts: ["aw13.incumbent-advantage"],
      difficulty: 2,
    },
    {
      id: "aw13-l03-q4",
      type: "order",
      prompt: "Order the 'wrap, then extend' play.",
      items: [
        "Meet and credit the script author",
        "Read the files the team already writes",
        "Take over capture and alignment maintenance",
        "Add selection with a rationale across firmware, rig and history",
        "Make the author the owner of the dependency model",
      ],
      explanation: md`Relationship first, integration second, relief third, new capability fourth, ownership last so the champion has a stake in the result.`,
      concepts: ["aw13.wrap-extend", "aw13.script-author"],
      difficulty: 2,
    },
    {
      id: "aw13-l03-q5",
      type: "decision",
      prompt: md`The prospect's test-systems engineer, who wrote their scripts, says in the demo: "We could build this in a month." How do you respond?`,
      options: [
        { text: "\"You probably could build the capture part; your alignment script shows that. Which part would you not want to maintain? And how would you model which tests a firmware change can affect across all nine rigs?\"", score: 1, feedback: "Concede what is true, move to maintenance burden and the part that is hard: the dependency model and rationale." },
        { text: "\"No, this took us years.\"", score: 0.2, feedback: "Defensive, and he knows how long things take better than you." },
        { text: "Ask his manager after the call to overrule him.", score: 0, feedback: "You have just made your strongest potential champion an enemy." },
        { text: "Offer a 50 % discount.", score: 0.2, feedback: "Price is not his objection; his objection is that he can do it himself." },
      ],
      explanation: md`The script author is the champion you need. Agree on what he can build, then show the part that compounds: cross-rig dependency and evidence.`,
      concepts: ["aw13.script-author"],
      difficulty: 2,
    },
    {
      id: "aw13-l03-q6",
      type: "mcq",
      prompt: "Which incumbent product computes a minimal test subset from source-code changes?",
      options: ["NI TestStand", "VectorCAST", "Keysight PathWave Test Automation", "dSPACE SCALEXIO"],
      answer: 1,
      explanation: md`VectorCAST's change-based testing works on source code via coverage. TestStand and PathWave sequence tests; SCALEXIO is HIL hardware.`,
      concepts: ["aw13.incumbent-advantage"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw13-l03-f1", front: "Six forces behind building in-house", back: "Unique rigs, strong engineers, data cannot leave, engineer time looks free, vendors do not understand the rig, lock-in fear.", concepts: ["aw13.build-forces"] },
    { id: "aw13-l03-f2", front: "Internal tool TCO", back: md`$TCO_{build}(T) = C_0 + T(\mu C_0 + R)$`, concepts: ["aw13.internal-tool-tco"] },
    { id: "aw13-l03-f3", front: "Key-person risk", back: md`$R = p_{leave} L$: probability the author leaves per year times the cost of rebuilding.`, concepts: ["aw13.key-person-risk"] },
    { id: "aw13-l03-f4", front: "Why never sell against a script on cost", back: "Its annual run cost is often below a subscription; break-even typically lands within two to four years.", concepts: ["aw13.internal-tool-tco"] },
    { id: "aw13-l03-f5", front: "Incumbents' 2026 pattern", back: "AI assistants and MCP servers on top of their own tools (NI Nigel, Vector CANoe MCP, dSPACE MCP headline).", concepts: ["aw13.incumbent-advantage"] },
    { id: "aw13-l03-f6", front: "Wrap, then extend", back: "Read their files, keep their tools, take over boring maintenance, add selection with rationale, give the author the dependency model.", concepts: ["aw13.wrap-extend"] },
  ],
  scenarios: [
    {
      id: "aw13-s2",
      title: "The engineer who built it",
      dayInLife: true,
      context: md`Illustrative. You are on a video call with the head of validation at a motor and drive supplier and his senior test-systems engineer, who wrote the lab's Python tools for aligning DAQ files and comparing runs. The head of validation asked for the meeting after a release slipped a week because the regression took too long. Ismail is on the call for technical questions.`,
      start: "a",
      concepts: ["aw13.script-author", "aw13.wrap-extend", "aw13.internal-tool-tco"],
      nodes: {
        a: {
          md: md`Ten minutes in, the engineer says: "Honestly, we have most of this already. My scripts align the DAQ data and flag differences between runs. I am not sure what we would gain."`,
          choices: [
            { text: "Ask him to show the scripts and what they flag, and what he would add if he had time.", next: "b", score: 10, feedback: "You learn the real capability and give him the floor. People defend what they have not been asked about." },
            { text: "Explain that Afterwave is AI-native and his scripts are rule-based.", next: "c", score: 2, feedback: "A category label is not an argument, and it diminishes his work in front of his manager." },
            { text: "Turn to the head of validation and talk about the slipped release.", next: "c", score: 4, feedback: "The pain is real, but going over the engineer's head makes him the opponent." },
          ],
        },
        b: {
          md: md`He shares his screen. The scripts are good: they align two files by a sync pulse and highlight channels that differ. He says: "What I do not have is a way to say which tests a firmware change can affect. We rerun about two thirds of the regression and hope."`,
          choices: [
            { text: "Say that this is exactly the gap Ripple addresses, propose that his alignment stays, and ask whether he would own the dependency model in a pilot.", next: "d", score: 10, feedback: "Wrap, then extend: his tool stays, you add the job he cannot reach, and he becomes the owner." },
            { text: "Say Lockstep would replace his alignment scripts with a better product.", next: "c", score: 3, feedback: "You have just attacked the part he is proud of, and gained nothing: alignment is not the pain." },
          ],
        },
        c: {
          md: md`The engineer goes quiet. The head of validation says: "Let us think about it internally and come back to you."`,
          choices: [
            { text: "Send a follow-up asking the engineer for a 30-minute technical session on his scripts and the regression problem.", next: "d", score: 6, feedback: "A reasonable recovery: you re-open with the person you lost, on his ground." },
            { text: "Wait for them to come back.", score: 1, feedback: "They will not. The engineer will explain why his tools are enough." },
          ],
        },
        d: {
          md: md`The head of validation asks: "What would this cost us compared with just keeping our tools?"`,
          choices: [
            { text: "Offer to build the build-vs-buy and value numbers together, with his inputs: rig-hours per regression, releases per year, cost per rig-hour, maintenance days on the scripts.", score: 10, feedback: "His numbers, his spreadsheet. You will also learn whether the deal is real." },
            { text: "Say it costs less than one engineer.", score: 4, feedback: "Probably true but it invites the 'so we keep our engineer' answer, and it is a cost argument you can lose." },
            { text: "Quote a list price immediately.", score: 3, feedback: "A price without a value frame lands as a cost line next to a free script." },
          ],
        },
      },
    },
  ],
};

export default lesson;
