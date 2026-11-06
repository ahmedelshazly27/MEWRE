import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw06-l04",
  title: "The firmware lifecycle: versions, variants, calibration, flashing and release",
  summary:
    "How firmware goes from a commit to a device on a rig or in the field: version control and build identity, build variants, configuration versus calibration parameters, flashing over debug probes and bootloaders, secure boot and over-the-air updates, and release notes. Then the mechanism behind the most expensive sentence in hardware testing: \"it is only a small firmware change\".",
  minutes: 70,
  objectives: [
    "List the elements that together identify what actually ran on a device under test (source, toolchain, variant, calibration, hardware)",
    "Explain the difference between configuration, calibration and code, and why calibration changes need their own version control",
    "Describe how firmware is flashed (debug probe, bootloader, UDS over CAN, OTA) and what A/B partitions, image signing and rollback protection do",
    "Compute the size of a build-variant matrix and the rig-hours of a full versus a targeted regression",
    "Explain, with mechanisms, why a small firmware change can touch many tests, and compute a change-impact score",
  ],
  concepts: [
    { id: "aw06.build-identity", name: "Build identity", description: "The full description of what ran on a device: source commit, toolchain and flags, build variant, calibration dataset, bootloader version and hardware revision. Two binaries from the same commit can differ; a test result is only reusable if its build identity is known.", competency: "aw-physical-ai", related: ["aw06.calibration", "aw06.bench-logging"] },
    { id: "aw06.calibration", name: "Configuration and calibration parameters", description: "Values that change behaviour without changing code: configuration selects features and variants (often at build time); calibration tunes gains, offsets, limits and maps, usually stored in a separate flash region and edited through XCP and an A2L description.", competency: "aw-physical-ai", related: ["aw06.build-identity", "aw06.fixed-step-control"] },
    { id: "aw06.bootloader-ota", name: "Bootloaders, flashing and OTA", description: "A bootloader is a small resident program that verifies and installs application images; secure boot checks a signature before running code, A/B partitions allow fallback, rollback protection blocks old vulnerable images, and OTA delivers updates remotely under a managed process.", competency: "aw-physical-ai", related: ["aw06.build-identity"] },
    { id: "aw06.change-ripple", name: "Why small firmware changes ripple", description: "A change propagates through shared timing, shared data and signals, calibration, memory layout, toolchain effects and variant multiplication, so its test impact follows dependencies, not the size of the diff.", competency: "aw-impact", related: ["aw06.build-identity", "aw06.jitter"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From commit to device",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Ripple's whole value is answering "after this firmware, model or rig change, which tests must run again, and why?". To sell that and to shape the product, you need a precise picture of what a firmware change actually is: not a line of code, but a new combination of source, toolchain, variant, calibration and hardware. This lesson gives you that picture and the arithmetic of why full regressions are so expensive.`,
        },
        {
          kind: "md",
          md: md`### Version control and build identity

Firmware source lives in **git** (sometimes Perforce or SVN in older organisations). Releases are **tagged**; many teams follow **semantic versioning** (MAJOR.MINOR.PATCH: breaking change, compatible feature, fix). But a version string alone does not identify what ran. A complete **build identity** has:

| Element | Example | Why it matters for test results |
|---|---|---|
| Source commit | git hash a1b2c3d | the code |
| Toolchain and flags | compiler version, optimisation level, linker script | same source can give different timing and memory layout |
| Build variant | hardware revision C, motor type B, market config EU | different code paths compiled in |
| Calibration dataset | gains, offsets, limits, maps; its own ID and version | same binary, different behaviour |
| Bootloader version | separate image, updated rarely | controls startup, update and recovery behaviour |
| Hardware revision | PCB rev, MCU silicon rev, sensor part | offsets, timing and errata |
| Dependencies | RTOS, vendor SDK, generated code from models | changes arrive without anyone editing your files |

Good practice: the build embeds its commit hash and variant in the binary, exposes them over the bus (a version message or a diagnostic read), and the CI system archives the exact **ELF** (with debug symbols), **HEX/BIN** image, **map file**, signal databases (DBC, A2L) and a software bill of materials. **Reproducible builds** (the same inputs give the bit-identical output) make it possible to prove what was tested.

### Build variants

One codebase usually produces many images through compile-time switches and configuration: hardware revisions, motor or cell types, power ratings, customer or market configurations, debug versus release. The number of distinct builds is the product of the options:`,
        },
        { kind: "equation", formula: "aw06-variant-matrix" },
        {
          kind: "md",
          md: md`Three hardware revisions, two motor types and two market configurations give 12 builds. If a full regression is 40 rig-hours per build, a "full retest" is 480 rig-hours: on a single dyno running 20 hours a day, more than three weeks.

### Configuration versus calibration

- **Code**: the algorithms.
- **Configuration**: which features and variants are active, often fixed at build time or at end-of-line programming.
- **Calibration**: numbers that tune behaviour: PI gains, current-sensor offsets and gains, encoder angle offset, temperature derating curves, fault thresholds, battery cell models. In automotive practice they live in a separate flash area described by an **A2L** file and are edited live over **XCP** with tools such as Vector CANape or ETAS INCA, then saved as datasets (HEX, DCM, CDF files).

Calibration is where a lot of real behaviour change happens with the least ceremony: a test engineer tweaks a derating threshold on the bench at 2 a.m. If the dataset is not versioned and recorded with every run, two runs of the "same firmware" are not comparable.

### Flashing and bootloaders

- **Debug probe** (JTAG or SWD, with a SEGGER J-Link, Lauterbach, ST-LINK or similar): writes flash directly. Common on the bench, rare in the field.
- **Bootloader**: a small program at the start of flash that runs first, checks whether a valid application exists, and can receive a new image over CAN, UART, USB or Ethernet. In automotive ECUs, reprogramming uses **UDS** (ISO 14229) diagnostic services (RequestDownload, TransferData, RequestTransferExit) over **ISO-TP** on CAN.
- **Secure boot**: the bootloader verifies a cryptographic signature on the image before running it. **Rollback protection** refuses older images with known vulnerabilities (a monotonic counter in hardware).
- **A/B (dual-bank) partitions**: the new image is written to the inactive bank, verified, then activated; if it fails to boot, the device falls back to the old bank.
- **Over-the-air (OTA)** updates deliver images remotely, often as **delta** updates, with staged rollouts. In road vehicles, UN Regulation No. 155 (cyber security management) and No. 156 (software update management) require the manufacturer to run a managed update process, including knowing which software version is on which vehicle; in the EU they apply to all new vehicles registered from July 2024. The EU Cyber Resilience Act adds security-update obligations for many products with digital elements over the coming years.

Flashing time is itself a test-operations cost. Over classic CAN with ISO-TP, effective throughput is a small fraction of the bit rate because each 8-byte frame carries at most 7 bytes of data in a multi-frame transfer and the receiver paces the sender with flow control.

### Release notes

A useful release note for a test team lists: the build identity; each change with its ticket or requirement link; affected components and signals (including any DBC or A2L change); changed calibration defaults; known issues; compatibility (bootloader, hardware revisions, rig software); and the tests the developers already ran. Most release notes contain the first two items only.`,
        },
        {
          kind: "md",
          md: md`### Why a "small firmware change" touches many tests

The diff size measures effort for the developer, not risk for the product. Changes propagate through:

1. **Shared timing**: anything that changes execution time in a high-priority path shifts every lower-priority task (lessons 1 and 2).
2. **Shared data and signals**: a variable or bus signal consumed by many functions (a current measurement feeds the current loop, overcurrent protection, thermal model and telemetry).
3. **Calibration coupling**: a code change that changes the meaning or scaling of a parameter invalidates every dataset that sets it.
4. **Memory layout and toolchain**: code moving between memories, a new compiler version, a changed optimisation flag.
5. **Interfaces**: a changed message definition breaks every consumer, including the rig's own pass/fail scripts.
6. **Variants**: a change in shared code reaches every build in the matrix.

If each dependency path $i$ from a change to a test carries a probability $w_i$ that the change alters that test's outcome, and paths act independently, the probability the test is affected is:`,
        },
        { kind: "equation", formula: "aw06-impact-score" },
        {
          kind: "md",
          md: md`This is the scoring the change-impact widget below uses: pick changed artifacts (firmware, model or rig), see which tests cross a selection threshold, and compare rig-hours saved with the expected regressions you would miss.`,
        },
        {
          kind: "widget",
          widget: "change-impact",
          caption: "Change impact: tests are scored 1 minus the product of (1 minus w) over the dependency paths from the changed artifacts. Raise the threshold to save rig-hours; watch the expected regressions caught fall.",
        },
        { kind: "xref", to: "m08-l06", note: "Change control, interface management and document control on large projects: the same discipline applied to firmware releases and signal databases." },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a retest after a firmware release",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Full regression versus a targeted retest for release 2.3.1",
          given: md`Illustrative drive-unit programme. 12 builds: hardware revisions A, B, C x 2 motor types x 2 market configurations. Per build, the regression has five test families: current control and torque accuracy 8 h, thermal derating 10 h, CAN interface and diagnostics 4 h, fault handling 6 h, endurance 12 h: **40 rig-hours per build**. Release 2.3.1 contains two changes: (1) a new current-sensor offset calibration routine, used only on hardware revision C (new sensor); (2) a rescaling of the phase-current CAN signal, in shared code (all builds). The bench's thermal-derating pass/fail script reads that CAN signal.`,
          steps: [
            { md: md`**Full regression:** $12\times40 = 480$ rig-hours.` },
            { md: md`**Revision C builds** ($2\times2 = 4$): the offset routine feeds the measured current into the current loop, overcurrent protection and the thermal model. Rerun current control (8), thermal derating (10), CAN interface (4), fault handling (6): **28 h each**, $4\times28 = 112$ h. Endurance is judged low impact for this change and skipped.` },
            { md: md`**Revision A and B builds** (8): only the CAN rescaling applies. Rerun CAN interface (4) and thermal derating (10, because its pass criterion reads the rescaled signal): **14 h each**, $8\times14 = 112$ h.` },
            { md: md`**Targeted total:** $112 + 112 = 224$ rig-hours, saving $480 - 224 = 256$ rig-hours (53%).` },
            { md: md`**Impact score check** for fault handling on revision C, which is reached by two paths: the offset routine ($w = 0.7$, overcurrent thresholds compare against offset-corrected current) and the CAN rescaling ($w = 0.3$, fault reports carry the signal): $I = 1 - (1-0.7)(1-0.3) = 1 - 0.21 = 0.79$.` },
          ],
          result: md`A two-item release touches four of five test families on a third of the builds and two families on the rest. The targeted plan needs 224 rig-hours instead of 480, but only because someone traced the dependency paths, including one through the rig's own script. Done by hand, that tracing is exactly the expert judgement that is slow, inconsistent and lost when people leave; it is what Ripple is meant to make systematic and explainable.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Impact score with two paths",
          given: md`A test is reached by two dependency paths from a firmware change, with $w_1 = 0.5$ and $w_2 = 0.4$. The selection threshold is 0.6.`,
          steps: [
            { md: md`$I = 1 - (1 - 0.5)(1 - 0.4) = 1 - 0.5\times0.6$.` },
            { md: md`$I = 0.70$.`, hidden: true, check: { prompt: "Impact score", answer: 0.7, tolerance: { abs: 0.005 } } },
            { md: md`$0.70 \ge 0.6$, so the test is selected. With only the first path it would score 0.5 and be skipped: multiple weak paths add up.` },
          ],
          result: md`The combination rule means a test touched by several medium-strength paths can outrank one touched by a single strong path. Independence is an assumption; correlated paths overstate the score.`,
        },
        {
          kind: "question",
          question: {
            id: "aw06-l04-p1",
            type: "numeric",
            prompt: md`A BMS programme has 4 hardware revisions, 3 cell suppliers and debug plus release builds, and every combination is built. How many distinct builds exist?`,
            answer: 24,
            tolerance: { abs: 0 },
            unit: "builds",
            explanation: md`$N = 4\times3\times2 = 24$. If each needs a 30-hour cycler regression, a full retest is 720 rig-hours. Most teams validate release builds only on the rig and use debug builds for development, which halves the matrix, but only if test records say which one ran.`,
            concepts: ["aw06.build-identity", "aw06.change-ripple"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Release discipline in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns what

- **Firmware team**: source, CI builds, release tags, release notes.
- **Calibration engineers** (in automotive, often a separate team): datasets per variant, their versions and approvals.
- **Test and validation team**: decides what to rerun, flashes rigs, records results.
- **Configuration management / release manager** (in larger organisations): the matrix of which build and calibration is approved for which hardware.

### Tools

Git hosting (GitHub, GitLab, Bitbucket), CI (Jenkins, GitLab CI, GitHub Actions) building every variant, artifact repositories (Artifactory, Nexus), requirements and test management (Jama, Polarion, DOORS, Xray, TestRail), calibration tools (CANape, INCA), flashing tools (vendor flashers, UDS flash tools, J-Link). Each holds a piece of the build identity; few organisations join them up at the bench.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How build identity gets lost on the bench",
          md: md`- **Engineering builds flashed by hand** from a developer laptop, with no tag; the test record says "latest".
- **Calibration tweaked live** over XCP during a run and not saved as a versioned dataset.
- **Bootloader not recorded**: two rigs behave differently at startup because one has an old bootloader.
- **Release note says "minor fixes"**: no list of affected signals or calibration defaults.
- **Rig software changed in the same week** as firmware: two changes, one set of failures, no attribution.
- **Variant mix-up**: a revision B image flashed onto a revision C board; it runs, with wrong offsets.`,
        },
        { kind: "scenario", scenario: "aw06-s2" },
        {
          kind: "checklist",
          title: "Minimum build record Lockstep should capture with every run",
          items: [
            "Firmware commit hash and version tag, read from the device, not typed",
            "Build variant and debug or release flag",
            "Toolchain version (from the CI build record)",
            "Calibration dataset ID and checksum, and any live changes made during the run",
            "Bootloader version",
            "Hardware revision and serial number of the device under test",
            "Signal database versions (DBC, A2L) used to decode the run",
            "Rig software and fixture versions",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw06-l04-p2",
            type: "short",
            prompt: md`Write the **firmware release record template** Afterwave will ask design partners to provide (or Lockstep will capture automatically) for every firmware drop to a test bench, so that Ripple can compute test impact. List the fields, say for each whether Lockstep can read it from the device or CI or must get it from the release note, and explain in one sentence each why Ripple needs the three most important fields.`,
            rubric: [
              "Includes full build identity: commit, version, variant, toolchain, bootloader, hardware compatibility",
              "Includes calibration dataset identity and changed defaults as a separate artifact",
              "Includes changed interfaces (bus signals, DBC or A2L changes) and changed components or modules",
              "States the source of each field (device readout, CI artifact, release note) and prefers automatic capture over manual entry",
              "Explains why Ripple needs the key fields with a mechanism (dependency paths, interface consumers, variant scope)",
              "Is short enough for a firmware team to actually fill in",
            ],
            modelAnswer: md`**Firmware release record (per drop to a bench)**

| Field | Source |
|---|---|
| Version tag and commit hash | device readout (version frame) and CI |
| Build variant(s) and debug/release | device readout and CI |
| Toolchain and flags | CI build record |
| Bootloader version | device readout |
| Compatible hardware revisions | release note |
| Calibration dataset ID, checksum and changed defaults | calibration tool export; checksum read from device |
| Changed modules or files (diff summary) | CI (git diff between tags) |
| Changed interfaces: added, removed or rescaled signals; DBC/A2L versions | CI artifacts plus release note |
| Changed timing: ISR or task load deltas from the timing table | release note (from firmware team's measurement) |
| Tests already run by developers (unit, SIL, HIL) and results | CI test reports |
| Known issues | release note |

**Why Ripple needs the top three:**
1. **Changed modules and timing deltas**: they are the start points of the dependency paths; timing changes are wide-impact and must not be scored from the diff alone.
2. **Changed interfaces**: every consumer of a changed signal, including rig scripts, is in the impact set even if its code did not change.
3. **Variant and hardware scope**: impact is computed per build in the matrix; a change used only on one revision should not trigger retests on the others.`,
            explanation: md`The template is a product decision as much as a form: anything Lockstep can read automatically is reliable; anything typed by hand will drift. A strong answer says which is which.`,
            concepts: ["aw06.build-identity", "aw06.calibration", "aw06.change-ripple"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "fc02-l08", note: "Working with technical cofounders who own the build: decision rights apply directly to who approves a firmware release for the rig." },
        {
          kind: "feynman",
          prompt: "Explain to a hardware test director why 'it is a one-line firmware change' does not tell her how much to retest, and what information would.",
          keyPoints: [
            "Diff size measures developer effort, not product risk",
            "Changes propagate through timing, shared signals, calibration, memory layout, toolchain and variants",
            "Build identity includes commit, toolchain, variant, calibration, bootloader and hardware revision",
            "Impact per test combines dependency paths: 1 minus the product of (1 minus w)",
            "What decides the retest: which modules, signals, calibration and timing changed, and which builds use them",
          ],
        },
        { kind: "sources", refs: ["aw06-r12", "aw06-r13", "aw06-r15", "aw06-r16", "aw06-r23"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw06-l04-q1",
      type: "multi",
      prompt: "Which of these belong to the build identity needed to compare two test runs? (Select all that apply.)",
      options: [
        "Firmware commit hash",
        "Calibration dataset ID",
        "Compiler version and optimisation flags",
        "Name of the developer who wrote the change",
        "Hardware revision of the device under test",
        "Bootloader version",
      ],
      answer: [0, 1, 2, 4, 5],
      explanation: md`Source, toolchain, calibration, bootloader and hardware all change behaviour. Who wrote the code does not.`,
      concepts: ["aw06.build-identity"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw06-l04-q2",
      type: "numeric",
      prompt: md`A test is reached from a change by three paths with $w = 0.2$, $0.3$ and $0.4$. What is its impact score (independent paths)?`,
      answer: 0.664,
      tolerance: { abs: 0.002 },
      explanation: md`$1 - 0.8\times0.7\times0.6 = 1 - 0.336 = 0.664$.`,
      concepts: ["aw06.change-ripple"],
      difficulty: 2,
    },
    {
      id: "aw06-l04-q3",
      type: "mcq",
      prompt: "What do A/B (dual-bank) partitions give a device that receives firmware updates?",
      options: [
        "Twice the flash for application code",
        "The ability to write and verify a new image while the old one stays bootable, and fall back if the new one fails",
        "Encryption of the image in transit",
        "Faster flashing over CAN",
      ],
      answer: 1,
      explanation: md`The inactive bank receives the update; activation happens only after verification, and a failed boot returns to the previous bank. Signing and secure boot are separate mechanisms.`,
      concepts: ["aw06.bootloader-ota"],
      difficulty: 1,
    },
    {
      id: "aw06-l04-q4",
      type: "mcq",
      prompt: "A test engineer changes a thermal derating threshold over XCP during a run and does not save it as a dataset. What is the main consequence for bench memory?",
      options: [
        "None, because the firmware binary is unchanged",
        "The run's results cannot be reproduced or compared, because its calibration differs from the recorded one",
        "The firmware will refuse to start next time",
        "The DBC file becomes invalid",
      ],
      answer: 1,
      explanation: md`Calibration changes behaviour without changing code. Unrecorded live changes make two runs of the "same firmware" incomparable.`,
      concepts: ["aw06.calibration", "aw06.build-identity"],
      difficulty: 1,
    },
    {
      id: "aw06-l04-q5",
      type: "numeric",
      prompt: md`A full regression is 36 rig-hours per build across 10 builds. A targeted plan reruns 12 hours on 3 builds and 4 hours on the other 7. What fraction of rig-hours does it save (%)?`,
      answer: 82.2,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`Full $= 360$ h. Targeted $= 3\times12 + 7\times4 = 36 + 28 = 64$ h. Saving $= 296/360 = 82.2\%$. Only worth it if the dependency tracing behind the plan is right.`,
      concepts: ["aw06.change-ripple"],
      difficulty: 1,
    },
    {
      id: "aw06-l04-q6",
      type: "order",
      prompt: "Order a secure update on a device with a bootloader and A/B partitions.",
      items: [
        "Receive the signed image into the inactive bank",
        "Verify the signature and the version against rollback protection",
        "Mark the new bank as pending and reboot",
        "Bootloader starts the new image and the application confirms a healthy start",
        "Commit the new bank as active (or fall back to the old bank on failure)",
      ],
      explanation: md`Write, verify, try, confirm, commit. Skipping the confirmation step is how fleets get bricked.`,
      concepts: ["aw06.bootloader-ota"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw06-l04-f1", front: "Build identity: the six elements", back: "Source commit, toolchain and flags, variant, calibration dataset, bootloader, hardware revision.", concepts: ["aw06.build-identity"] },
    { id: "aw06-l04-f2", front: "Configuration vs calibration", back: "Configuration selects features and variants (often build time); calibration tunes numbers (gains, offsets, limits) in a separate flash area, via XCP and A2L.", concepts: ["aw06.calibration"] },
    { id: "aw06-l04-f3", front: "Variant matrix size", back: md`$N = \prod n_k$: 3 revisions x 2 motors x 2 markets = 12 builds.`, concepts: ["aw06.change-ripple"] },
    { id: "aw06-l04-f4", front: "Impact score", back: md`$I = 1 - \prod(1 - w_i)$ over dependency paths; several weak paths add up.`, concepts: ["aw06.change-ripple"] },
    { id: "aw06-l04-f5", front: "UDS", back: "ISO 14229 diagnostic protocol; reprogramming via RequestDownload, TransferData, RequestTransferExit over ISO-TP on CAN.", concepts: ["aw06.bootloader-ota"] },
    { id: "aw06-l04-f6", front: "UN R155 and R156", back: "Vehicle cyber security management and software update management regulations; apply to all new vehicles registered in the EU from July 2024.", concepts: ["aw06.bootloader-ota"] },
    { id: "aw06-l04-f7", front: "Six ways a small change ripples", back: "Shared timing, shared signals, calibration coupling, memory layout and toolchain, interfaces, variants.", concepts: ["aw06.change-ripple"] },
  ],
  scenarios: [
    {
      id: "aw06-s2",
      title: "\"It is a one-line change, just run the smoke test\"",
      dayInLife: true,
      context: md`Illustrative. Afterwave is three weeks into a paid pilot with a (hypothetical) e-axle team. Friday 16:00: the firmware lead posts in the shared channel: "2.3.2 is a one-line fix to the overcurrent filter constant. Run the 30-minute smoke test tonight and we ship to the vehicle fleet on Monday." Ripple flags 14 tests across 6 builds.`,
      start: "a",
      concepts: ["aw06.change-ripple", "aw06.calibration", "aw06.build-identity"],
      nodes: {
        a: {
          md: md`The test lead asks you, as the vendor, what you think. How do you respond?`,
          choices: [
            { text: "Say Ripple's output is only advisory and let them decide.", score: 3, feedback: "True but unhelpful. A tool that never takes a position does not earn trust; show the reasoning.", next: "b" },
            { text: "Share Ripple's explanation: the filter constant feeds overcurrent protection, fault-reaction timing and two derating tests through the protection path; show the 14 tests, their scores and the dependency paths, and propose an overnight plan that fits the rig time available.", score: 9, feedback: "Makes the mechanism visible and gives the team a concrete plan they can accept or edit. Explainability is the product.", next: "b" },
            { text: "Insist on a full regression before the fleet release.", score: 4, feedback: "Overrides the customer's judgement with a blunt instrument; it will be ignored and erodes Ripple's credibility.", next: "b" },
          ],
        },
        b: {
          md: md`The firmware lead replies: "The constant is in calibration, not code. Calibration changes never need a full test." The diff confirms it moved from code into the calibration area in this release, and the default value changed.`,
          choices: [
            { text: "Point out that both the location and the default changed: every dataset that does not set the new parameter now gets the new default, so all six builds are affected; recommend the 14 tests overnight plus a check that each build's dataset sets the parameter explicitly.", score: 10, feedback: "Calibration coupling is one of the ripple mechanisms. A parameter that moves from code to calibration changes behaviour wherever datasets do not set it." },
            { text: "Accept the explanation and run only the smoke test.", score: 1, feedback: "Calibration changes behaviour without changing code; the overcurrent path is safety-relevant." },
            { text: "Escalate to their VP of engineering.", score: 3, feedback: "Premature. Make the technical case clearly first; escalation as a vendor in week three damages the relationship." },
          ],
        },
      },
    },
  ],
};

export default lesson;
