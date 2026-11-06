import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw05-l01",
  title: "Dependency graphs: artifacts, components and tests as a DAG",
  summary:
    "Model a test lab as a directed graph from changeable artifacts (firmware modules, calibration tables, model versions, rig parts) through components and functions to tests and requirements; compute transitive impact by reachability, attenuate it with edge weights, combine paths with noisy-OR, and see why hub nodes and missing edges are the two ways a graph lies.",
  minutes: 75,
  objectives: [
    "Define the node and edge types of a test dependency graph and state the edge direction convention",
    "Compute the transitive impact set of a change by reachability, and explain why it is safe but imprecise",
    "Compute path weights and noisy-OR impact scores, and say when the independence assumption fails",
    "Choose a graph representation (adjacency list, matrix, closure, bipartite incidence) for a given query",
    "Name the four sources of edges (declared, static, dynamic, learned) and what each one misses",
  ],
  concepts: [
    { id: "aw05.dependency-graph", name: "Test dependency graph", description: "Directed graph whose edge u to v means a change in u can change the behaviour or verdict of v; nodes are artifacts, components, functions, tests and requirements.", competency: "aw-impact" },
    { id: "aw05.transitive-impact", name: "Transitive impact (reachability)", description: "Everything reachable from a changed node by a directed path is potentially impacted; computed by breadth-first search in O(V+E).", competency: "aw-impact", related: ["aw05.dependency-graph"] },
    { id: "aw05.impact-score", name: "Weighted impact score (noisy-OR)", description: "Path weight is the product of edge weights; a test's score is 1 minus the product of (1 minus weight) over changed dependencies.", competency: "aw-impact", related: ["aw05.transitive-impact"] },
    { id: "aw05.graph-representation", name: "Graph representations", description: "Adjacency lists for traversal, matrices and transitive closure for bulk queries, a bipartite test-by-artifact incidence matrix for selection and learning.", competency: "aw-impact", related: ["aw05.dependency-graph"] },
    { id: "aw05.edge-provenance", name: "Edge provenance", description: "Where an edge came from: declared (traceability), static (code, build, signal databases), dynamic (traces, recorded signals), learned (history); each has known blind spots.", competency: "aw-impact", related: ["aw05.dependency-graph"] },
    { id: "aw05.hub-explosion", name: "Hub explosion", description: "A node that almost everything depends on (power supply, common library, DAQ) makes unweighted reachability select almost the whole suite.", competency: "aw-impact", related: ["aw05.transitive-impact"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The graph Ripple reasons over",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Ripple's whole promise ("after a firmware, model or rig change, which tests to rerun and why") is a query on a graph. When a validation lead asks how Ripple decides, the honest answer is: we build a dependency graph from your traceability, your code, your signals and your history, and we propagate the change through it. If you can draw that graph on a whiteboard, compute a score on it and name its failure modes, you can sell Ripple to engineers, challenge Ismail and Yusuf on design choices, and write a pilot scope that does not overpromise.`,
        },
        {
          kind: "md",
          md: md`### Nodes and edges

A **dependency graph** $G = (V, E)$ for a test lab has typed nodes:

| Node type | Examples in a drive or actuator lab | Changes how |
|---|---|---|
| **Artifact** (changeable thing) | Firmware module (current loop, thermal derating), calibration table, A2L parameter set, ML model version, test script, rig encoder, load cell, fixture, DAQ configuration | Commit, release, retrain, swap, recalibration |
| **Component / function** | Torque estimator, field-weakening controller, thermal model, grasp policy, safe torque off | Through its artifacts |
| **Test** | Torque step response, speed ripple at low rpm, 2 h thermal soak, emergency stop timing, 48 h endurance | Its verdict may move |
| **Requirement** | "Torque rise time below 5 ms", "STO reaction below 10 ms" | Its verification status may become suspect |

The **edge convention** used throughout this module: $u \to v$ means **a change in $u$ can change the behaviour or verdict of $v$**. Edges point downstream, in the direction impact flows. (Build systems often draw the opposite arrow, "v depends on u"; same information, reversed edges. Fix one convention in every spec.)

### Why a DAG, and what to do with cycles

Software dependency graphs are designed to be acyclic. Physical systems are not: the current controller drives the motor, the motor heats, the thermal model derates the current controller. For impact analysis you do not need to model feedback dynamics, only "can a change here reach there". Collapse each **strongly connected component** (a set of nodes that all reach each other) into one super-node. The result, the **condensation**, is always a DAG, and reachability on it is identical. Tarjan's algorithm finds the components in $O(V+E)$.

### Transitive impact

The conservative definition of impact is reachability:`,
        },
        { kind: "equation", formula: "aw05-reachability" },
        {
          kind: "md",
          md: md`A breadth-first search from every changed node visits each node and edge at most once: $O(V+E)$. A lab with 5,000 artifacts, 2,000 functions, 1,500 tests and 60,000 edges answers in milliseconds. Speed is never the problem. **Precision** is.

**Safe but imprecise.** If every real influence is an edge, reachability never misses an affected test (it is *safe*). But it marks too much: one edge from the bench power supply to every test means a supply firmware update selects the whole suite. This is **hub explosion**, and it is why plain reachability is a floor for safety analysis, not a selection strategy.

### Weights: attenuation along a path

Give each edge a weight $w_{uv} \in [0, 1]$: how strongly a change in $u$ propagates to $v$. Where weights come from is the subject of Lessons 3 and 4 (coverage share, signal sensitivity, learned co-failure rates). Along a path the influence multiplies:`,
        },
        { kind: "equation", formula: "aw05-path-weight" },
        {
          kind: "md",
          md: md`and a test reached by several changed dependencies combines them with **noisy-OR**: the test is unaffected only if every changed dependency independently leaves it unaffected.`,
        },
        { kind: "equation", formula: "aw05-noisy-or" },
        {
          kind: "md",
          md: md`Two properties to remember. First, noisy-OR is **monotone**: adding a changed dependency never lowers a score, so a bigger change never selects fewer tests. Second, it assumes **independence**. Two paths that share their first edge (one calibration table feeding one estimator that feeds two loops) are correlated: if the shared edge does nothing, neither path does. Noisy-OR over-states impact for them, which errs on the safe side.

### Representations and which query each serves

| Representation | Size | Good for |
|---|---|---|
| **Adjacency list** (per node, its out-edges) | $O(V+E)$ | Traversal from a change (BFS/DFS), incremental updates |
| **Adjacency matrix** $A$, $A_{uv} = w_{uv}$ | $O(V^2)$ | Small graphs, linear-algebra views: $(A^k)_{uv} > 0$ means a path of length $k$ |
| **Transitive closure** $A^{*}$ (Warshall, $O(V^3)$ once) | $O(V^2)$ | Many repeated "does u reach v" queries on a stable graph |
| **Bipartite incidence** $B$ (tests by artifacts) | tests by artifacts, sparse | Selection and learning: row $t$ is the dependency profile of test $t$; a change is a vector $c$, scores come from $B$ and $c$ |

In practice Ripple-like engines keep a typed property graph (adjacency lists with node and edge attributes such as provenance, weight, timestamp) and **materialise** the bipartite test-by-artifact view for scoring and model training.`,
        },
        {
          kind: "flow",
          title: "How a change propagates",
          steps: [
            { label: "Change event", detail: "Commit, firmware build, model version, rig asset swap, calibration certificate" },
            { label: "Changed artifacts", detail: "Diff resolved to graph nodes: modules, parameters, model id, rig asset ids" },
            { label: "Components and functions", detail: "Reached via static and declared edges" },
            { label: "Tests", detail: "Scored with path weights and noisy-OR" },
            { label: "Requirements", detail: "Verification status of linked requirements becomes suspect until rerun" },
          ],
          caption: "Edges point downstream: a change in the left node can affect the right one.",
        },
        {
          kind: "widget",
          widget: "change-impact",
          caption: "Tick changed artifacts and move the threshold. Edge thickness is the weight; each test's number is its noisy-OR score. Watch the rig hours and the share of expected regressions caught.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Scoring changes by hand",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A calibration table change, three hops from the tests",
          given: md`Illustrative drive-unit graph. Changed artifact: the **phase-current sensor calibration table** (cal). Edges and weights: cal → torque estimator 0.8; torque estimator → torque control loop 0.9; torque control loop → torque step test 0.9; torque control loop → speed ripple test 0.5; torque estimator → thermal model 0.4; thermal model → derating test 0.8. The derating test also reads phase current directly to check the current limit: cal → derating test 0.5.`,
          steps: [
            { md: md`**Reachability.** BFS from cal reaches estimator, loop, thermal model, and all three tests. Unweighted, all three are selected.` },
            { md: md`**Torque step:** one path, $0.8 \times 0.9 \times 0.9 = 0.648$.` },
            { md: md`**Speed ripple:** one path, $0.8 \times 0.9 \times 0.5 = 0.36$.` },
            { md: md`**Derating:** two paths. Via the thermal model $0.8 \times 0.4 \times 0.8 = 0.256$; direct $0.5$. Noisy-OR: $1 - (1 - 0.256)(1 - 0.5) = 1 - 0.744 \times 0.5 = 0.628$.` },
            { md: md`**Threshold 0.5:** select torque step (0.648) and derating (0.628); speed ripple (0.36) is skipped. Its skip should be stated, with its score, in the rerun report (Lesson 6).` },
          ],
          result: md`Scores 0.648, 0.36 and 0.628. The derating test, two hops away on its strongest single path, ends up almost level with the torque step test because two independent routes reach it. Here the two paths share no edge, so noisy-OR is exact under its independence assumption.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "The widget's default case: a motor-control firmware change",
          given: md`In the **change-impact** widget, tick only "Motor control firmware v2.4" and set the threshold to 0.35. The eight tests take 2, 3, 6, 4, 5, 2, 48 and 1 rig hours (71 h in total). Each test's "expected regressions" value is its score times its historical failure rate.`,
          steps: [
            { md: md`**Scores** (only firmware edges are active): torque step 0.9, speed ripple 0.7, thermal soak 0.2, overload derating 0, pick-and-place 0.3, grip force 0, endurance 0.2, emergency stop 0.4.` },
            { md: md`**Selected at 0.35:** torque step, speed ripple, emergency stop: $2 + 3 + 1 = 6$ h of 71 h, so **91.5 %** of rig hours saved.` },
            { md: md`**Expected regressions** (score times failure rate): 0.27, 0.175, 0.03, 0, 0.105, 0, 0.01, 0.04; total 0.63. Selected: $0.27 + 0.175 + 0.04 = 0.485$. Recall $0.485 / 0.63 = $ **77 %**.` },
            { md: md`**Lower the threshold to 0.15:** thermal soak, pick-and-place and endurance join: 65 h, only 8.5 % saved, recall 100 %. The 48 h endurance run (score 0.2, failure rate 0.05) buys the last 1.6 % of expected regressions for 48 h of rig time.` },
          ],
          result: md`Selection is a trade between rig hours and recall, and a single threshold is a blunt tool: it either drops pick-and-place (score 0.3 but a high failure rate) or pulls in a 48 h run. Lesson 2 replaces the score threshold with a cost rule per test.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Two changes at once",
          given: md`Same widget. Now the rig encoder was also replaced: tick "Motor control firmware v2.4" and "Rig encoder replaced". Encoder edges: torque step 0.6, speed ripple 0.8. Threshold 0.35.`,
          steps: [
            { md: md`Torque step: $1 - (1 - 0.9)(1 - 0.6) = 1 - 0.1 \times 0.4$.` },
            { md: md`$= 0.96$.`, hidden: true, check: { prompt: "Torque step impact score", answer: 0.96, tolerance: { abs: 0.005 } } },
            { md: md`Speed ripple: $1 - (1 - 0.7)(1 - 0.8)$.` },
            { md: md`$= 1 - 0.3 \times 0.2 = 0.94$.`, hidden: true, check: { prompt: "Speed ripple impact score", answer: 0.94, tolerance: { abs: 0.005 } } },
            { md: md`No new test crosses 0.35, so the selection is still torque step, speed ripple and emergency stop: 6 h. Expected regressions caught: $0.96 \times 0.3 + 0.94 \times 0.25 + 0.04 = 0.288 + 0.235 + 0.04 = 0.563$. The total over all tests also grows, to $0.288 + 0.235 + 0.03 + 0.105 + 0.01 + 0.04 = 0.708$, so recall is $0.563 / 0.708 = 79.5\%$.` },
          ],
          result: md`The encoder swap raised two scores close to 1 but selected nothing new, because its edges point at tests that were already selected. A rig change that only touches already-selected tests costs no extra rig hours, but it does change how you read their results (Lesson 5).`,
        },
        {
          kind: "question",
          question: {
            id: "aw05-l01-p1",
            type: "numeric",
            prompt: md`A test is reached from two changed artifacts. Path 1 has edges 0.7 and 0.5. Path 2 has edges 0.6, 0.5 and 0.5. What is the test's noisy-OR impact score? (3 decimals)`,
            answer: 0.4475,
            tolerance: { abs: 0.002 },
            explanation: md`Path weights: $0.7 \times 0.5 = 0.35$ and $0.6 \times 0.5 \times 0.5 = 0.15$. Score $= 1 - (1 - 0.35)(1 - 0.15) = 1 - 0.65 \times 0.85 = 1 - 0.5525 =$ **0.4475** (0.448). If the two paths shared an edge the true value would be lower, because the paths would not be independent.`,
            concepts: ["aw05.impact-score"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Where the edges come from, and how graphs lie",
      blocks: [
        {
          kind: "md",
          md: md`### Four sources of edges

| Provenance | Where it comes from in a hardware lab | Strength | Blind spot |
|---|---|---|---|
| **Declared** | Traceability matrix in Jama, Polarion, DOORS or a spreadsheet; test plans; rig configuration sheets | Engineers' intent, links to requirements | Stale within weeks; only as good as the last review |
| **Static** | Firmware call graph and build system; A2L and DBC files (which parameters and CAN signals a module reads); test scripts' channel lists | Complete for code, cheap to recompute on every build | Says nothing about rig hardware, calibration effects or ML behaviour |
| **Dynamic** | Coverage traces on target; which DAQ channels and parameters a test actually read during the run (what Lockstep records) | Ground truth for what was exercised | Only for paths the tests actually took; instrumentation can disturb real-time timing |
| **Learned** | Co-change and co-failure history in bench memory (Lesson 4) | Finds implicit couplings nobody declared (ambient temperature, a shared supply) | Needs history; confuses correlation with causation; cold start |

A credible engine **merges** them and keeps provenance on every edge, because the explanation an engineer accepts depends on it: "the test reads parameter KP_IQ, which you changed" is stronger than "these two have failed together 4 times".

### What competitors and incumbents do today

The research brief (Nov 2026) found no vendor offering change-impact selection for rig, firmware and model changes as a core feature. The closest analogues are **code-level** (VectorCAST change-based testing computes the subset of unit and integration tests affected by source changes, from code coverage) and **traceability-level** (suspect links in Jama, Polarion and IBM DOORS Next flag tests when a linked requirement changes). Neither knows that a load cell was recalibrated or that a grasp model was retrained.`,
        },
        { kind: "sources", refs: ["aw05-r10", "aw05-r11", "aw05-r22"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How a dependency graph lies",
          md: md`- **Missing edges (unsafe):** implicit couplings such as a shared DC supply, ambient temperature in the test cell, ground loops on a shared DAQ chassis, fixture wear. These cause escapes, the expensive failure.
- **Hub nodes (imprecise):** one edge from "bench power supply" to every test selects everything on every supply update. Give hubs low, evidence-based weights or model them per signal.
- **Stale declared links:** a traceability matrix last reviewed before the last two firmware releases.
- **Unresolved diffs:** a change that cannot be mapped to a node (a new firmware binary with no build metadata, "rig serviced" in a logbook) silently selects nothing. Unresolvable changes must fail loudly.
- **Version skew:** the graph describes firmware 2.3 while the bench runs 2.4.`,
        },
        {
          kind: "checklist",
          title: "What to check in a pilot lab's graph before trusting any selection",
          items: [
            "Every change event in the pilot period can be resolved to at least one node; unresolvable events are listed, not dropped",
            "Every test has at least one incoming edge; a test with none can never be selected and must sit in the mandatory set",
            "Each edge carries provenance (declared, static, dynamic, learned) and a last-verified date",
            "Hub nodes are identified (out-degree above, say, 30 % of tests) and their weights justified",
            "Rig assets have ids that match the asset or calibration database, so swaps and recalibrations become change events",
            "The graph is versioned with the firmware, model and rig configuration it describes",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a test lab when scoping the graph",
          items: [
            "Where do you keep test-to-requirement links today, and when were they last reviewed?",
            "Can we get the firmware build metadata (module list, A2L/DBC) for each build that reached the bench?",
            "Which rig assets have ids and calibration records, and where does a swap get logged?",
            "Which tests are you never allowed to skip (safety functions, customer-witnessed tests)?",
            "Which past escapes do you remember, and what dependency was missing when they happened?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw05-l01-p2",
            type: "short",
            prompt: md`Write the **dependency graph specification** for a Ripple pilot at a motor and drive validation lab (illustrative: one dyno rig, about 120 tests, firmware released weekly, rig calibrated every 6 months). Define node types, edge types with direction convention, the source for each edge type, the weight you would start with, and at least eight example edges spanning firmware, calibration, rig hardware and tests.`,
            rubric: [
              "States the edge direction convention explicitly (change in u can affect v) and uses it consistently",
              "Defines typed nodes covering firmware artifacts, calibration data, rig assets, tests and requirements",
              "Names a concrete source for each edge type (traceability tool, build metadata/A2L, recorded channels, history) and its blind spot",
              "Gives initial weights with a rule (for example declared 0.5, static code coverage share, sensitivity rule) and says how they will be updated",
              "Provides at least eight plausible example edges, including at least one rig-hardware edge and one hub node with a deliberately low weight",
              "Handles mandatory tests and unresolvable changes explicitly",
            ],
            explanation: md`A usable graph spec fixes the edge direction, types every node, and records where each edge comes from, because provenance decides both its blind spot and how engineers will judge the explanation built on it.`,
            modelAnswer: md`**Convention:** $u \to v$ means a change in $u$ can change the behaviour or verdict of $v$.

**Nodes:** firmware module (from the build's module list), calibration parameter set (A2L groups), rig asset (asset id from the calibration database: encoder, torque transducer, load machine, DAQ chassis, power supply), test (TestStand sequence id), requirement (Jama id).

**Edges and sources:**
- module → module (static, call graph from the build, weight 0.7 default);
- parameter → module (static, A2L reads, 0.8);
- module → test (dynamic, on-target coverage share of the module exercised by the test, weight = share);
- rig asset → test (dynamic, channels the test reads for its verdict, weight from margin-normalised sensitivity, default 0.5 until computed);
- test → requirement (declared, Jama links, 1.0 for verification status);
- any → test (learned, co-failure lift above 2 with at least 5 co-occurrences, weight = smoothed failure probability).

**Examples:** current-loop module → torque step test 0.85 (coverage); KP_IQ parameter → current-loop module 0.9; thermal-model module → 2 h thermal soak 0.8; torque transducer → efficiency map test 0.9; torque transducer → thermal soak 0.05; encoder → speed ripple test 0.8; DC supply (hub, feeds all tests) → every test 0.05, except supply-voltage sweep 0.9; STO module → STO timing test 1.0; torque step test → requirement "rise time below 5 ms" 1.0.

**Rules:** STO, e-stop and customer-witnessed tests are mandatory regardless of score. A change event that maps to no node blocks the plan and is shown to the test lead. The graph is versioned per firmware build and rig configuration; edges older than two releases without re-verification drop to half weight.`,
            concepts: ["aw05.dependency-graph", "aw05.edge-provenance", "aw05.hub-explosion"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a drive validation lead, without jargon, how Ripple decides that a calibration change three steps away from a test still matters, and why it does not simply rerun everything connected to the change.",
          keyPoints: [
            "The lab is a map of what can affect what; impact flows along the arrows",
            "Everything reachable is possibly affected, which is safe but selects too much because of hubs like the power supply",
            "Each arrow has a strength; strength multiplies along a route and fades with distance",
            "Several independent routes into the same test add up (noisy-OR), so a test can matter even if each route is weak",
            "Missing arrows cause misses, so the map is built from several sources and kept up to date",
          ],
        },
        { kind: "xref", to: "fc02-l04", note: "The graph specification is a technical spec: write it with the PRD discipline (non-goals, acceptance criteria) from Founder Core." },
      ],
    },
  ],
  quiz: [
    {
      id: "aw05-l01-q1",
      type: "mcq",
      prompt: "In this module's convention, what does an edge from the thermal model to the 2 h thermal soak test mean?",
      options: [
        "The thermal soak test verifies the thermal model requirement",
        "A change in the thermal model can change the behaviour or verdict of the thermal soak test",
        "The thermal soak test must run before the thermal model is built",
        "The thermal model reads data produced by the thermal soak test",
      ],
      answer: 1,
      explanation: md`Edges point downstream, in the direction impact flows. Build tools often draw the reverse ("depends on"); pick one convention and state it.`,
      concepts: ["aw05.dependency-graph"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw05-l01-q2",
      type: "numeric",
      prompt: md`A test depends on two changed artifacts with weights 0.6 and 0.3. What is its noisy-OR impact score?`,
      answer: 0.72,
      tolerance: { abs: 0.005 },
      explanation: md`$1 - (1 - 0.6)(1 - 0.3) = 1 - 0.4 \times 0.7 = 1 - 0.28 = 0.72$.`,
      concepts: ["aw05.impact-score"],
      difficulty: 1,
    },
    {
      id: "aw05-l01-q3",
      type: "mcq",
      prompt: "Why is plain reachability called safe but imprecise?",
      options: [
        "It is fast but sometimes misses tests",
        "If every real influence is an edge it never misses an affected test, but hub nodes make it select most of the suite",
        "It only works on acyclic graphs",
        "It ignores requirements",
      ],
      answer: 1,
      explanation: md`Safety depends on graph completeness, not on the algorithm. Imprecision comes from hubs such as a shared supply or common library that reach almost everything.`,
      concepts: ["aw05.transitive-impact", "aw05.hub-explosion"],
      difficulty: 1,
    },
    {
      id: "aw05-l01-q4",
      type: "multi",
      prompt: "Which statements about noisy-OR scoring are true? (Select all that apply.)",
      options: [
        "Adding another changed dependency can never lower a test's score",
        "It is exact when the paths into a test are independent",
        "It under-states impact when two paths share an edge",
        "With all edge weights equal to 1 it selects the same tests as reachability (for any threshold above 0)",
      ],
      answer: [0, 1, 3],
      explanation: md`Shared edges make paths positively correlated, so noisy-OR **over**-states impact, erring toward selecting more. With weights of 1 any reached test scores 1.`,
      concepts: ["aw05.impact-score"],
      difficulty: 2,
    },
    {
      id: "aw05-l01-q5",
      type: "order",
      prompt: "Order the steps from a change event to a rerun decision.",
      items: [
        "Resolve the change event to changed artifact nodes",
        "Traverse to reachable components, functions and tests",
        "Score each reached test with path weights and noisy-OR",
        "Apply the selection rule and mandatory set",
        "Mark linked requirements as suspect until rerun",
      ],
      explanation: md`Resolution first: a change that cannot be mapped to nodes selects nothing and must be flagged. Requirements become suspect once their tests are invalidated by the change.`,
      concepts: ["aw05.transitive-impact", "aw05.dependency-graph"],
      difficulty: 1,
    },
    {
      id: "aw05-l01-q6",
      type: "mcq",
      prompt: "A lab's graph is built only from static firmware analysis. Which change will it handle worst?",
      options: [
        "A change to the current-loop gains in an A2L parameter set",
        "A refactor of the thermal derating module",
        "Replacing the dyno's torque transducer with a different model",
        "A new CAN signal read by the protection module",
      ],
      answer: 2,
      explanation: md`Static code analysis knows modules, parameters and signals but nothing about rig hardware. Rig edges need dynamic (which channels the verdict uses) or learned provenance.`,
      concepts: ["aw05.edge-provenance"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw05-l01-f1", front: "Edge convention for impact graphs", back: "u to v: a change in u can change the behaviour or verdict of v (edges point downstream).", concepts: ["aw05.dependency-graph"] },
    { id: "aw05-l01-f2", front: "Noisy-OR impact score", back: md`$s_t = 1 - \prod (1 - w_{it})$ over changed dependencies of test t.`, concepts: ["aw05.impact-score"] },
    { id: "aw05-l01-f3", front: "Path weight", back: "Product of edge weights along the path; influence fades with distance.", concepts: ["aw05.impact-score"] },
    { id: "aw05-l01-f4", front: "Cost of reachability by BFS", back: "O(V + E) per query: speed is never the problem, precision is.", concepts: ["aw05.transitive-impact"] },
    { id: "aw05-l01-f5", front: "What to do with cycles (physical feedback loops)", back: "Collapse strongly connected components into super-nodes; the condensation is a DAG with the same reachability.", concepts: ["aw05.dependency-graph"] },
    { id: "aw05-l01-f6", front: "Four edge provenances", back: "Declared (traceability), static (code, build, A2L/DBC), dynamic (traces, recorded channels), learned (history).", concepts: ["aw05.edge-provenance"] },
    { id: "aw05-l01-f7", front: "Hub explosion", back: "A node almost everything depends on (supply, DAQ, common library) makes reachability select nearly the whole suite.", concepts: ["aw05.hub-explosion"] },
  ],
};

export default lesson;
