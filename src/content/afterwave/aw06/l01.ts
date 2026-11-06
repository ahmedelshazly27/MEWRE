import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw06-l01",
  title: "Microcontrollers and embedded architectures",
  summary:
    "What actually runs inside a drive unit, a battery management system or a humanoid joint: microcontrollers versus application SoCs, how memory and peripherals are laid out, how interrupts work and what they cost, and the cycle and latency arithmetic that decides whether a control loop fits in its time budget.",
  minutes: 75,
  objectives: [
    "Explain the difference between a microcontroller and an application SoC and say which one runs which job in a robot or a drive",
    "Describe the memory map (flash, SRAM, calibration area) and the peripherals a motor-control MCU relies on (PWM timers, ADC, DMA, CAN, encoder interface, watchdog)",
    "Explain interrupt latency and why critical sections and caches add timing variation",
    "Compute a cycle budget, an execution time and a CPU load from clock frequency and loop rate",
    "Ask a firmware team the questions that reveal how much timing headroom a product has",
  ],
  concepts: [
    { id: "aw06.mcu-vs-soc", name: "Microcontroller vs application SoC", description: "An MCU integrates a CPU core, flash, SRAM and real-time peripherals on one chip and runs bare-metal code or an RTOS with deterministic timing; an application SoC runs a full OS (usually Linux) on GHz cores with external DRAM, an MMU and accelerators, trading determinism for throughput.", competency: "aw-physical-ai", related: ["aw06.interrupts", "aw06.memory-peripherals"] },
    { id: "aw06.memory-peripherals", name: "Memory map and peripherals", description: "Code and constants live in on-chip flash, variables and stacks in SRAM, calibration data in a reserved flash region; timers, ADCs, DMA, communication controllers and watchdogs do the real-time work in hardware so the CPU only computes.", competency: "aw-physical-ai", related: ["aw06.mcu-vs-soc", "aw06.cycle-budget"] },
    { id: "aw06.interrupts", name: "Interrupts and interrupt latency", description: "A hardware event suspends the running code and starts an interrupt service routine; latency is the time from event to the first ISR instruction, set by core entry cycles plus any time interrupts are masked by critical sections or higher-priority ISRs.", competency: "aw-physical-ai", related: ["aw06.cycle-budget", "aw06.jitter"] },
    { id: "aw06.cycle-budget", name: "Cycle budget and CPU load", description: "The number of CPU cycles available per control period is clock frequency divided by loop rate; execution time is cycles divided by clock frequency; CPU load is the sum over tasks of execution time divided by period.", competency: "aw-physical-ai", related: ["aw06.interrupts", "aw06.rtos-scheduling"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What is inside the box",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every customer Afterwave targets (drives and motors, batteries, humanoids, autonomous machines) ships a product whose behaviour is decided by firmware running on a small chip with a hard time budget. When a firmware team says "the new build adds 3 µs to the current loop", you need to know whether that is noise or the end of the headroom, because it decides which tests Ripple should send back to the rig. Ismail and Yusuf will speak this language with customers from the first call; you need to follow it, challenge it and sell to it.`,
        },
        {
          kind: "md",
          md: md`### Two kinds of computer in one machine

A modern physical product almost always contains two classes of processor:

| | Microcontroller (MCU) | Application processor / SoC |
|---|---|---|
| Typical core | Arm Cortex-M (M4, M7, M33), Cortex-R, TI C2000, Infineon AURIX TriCore, RISC-V | Arm Cortex-A, x86, often with GPU or NPU |
| Clock | about 50 to 600 MHz | about 1 to 3 GHz, many cores |
| Memory | on-chip flash (about 0.25 to 8 MB) and SRAM (about 64 KB to 2 MB) | external DRAM (GB), eMMC or NVMe storage |
| Software | bare metal or an RTOS (FreeRTOS, Zephyr, AUTOSAR Classic) | Linux, QNX, sometimes ROS 2 on top |
| Timing | deterministic to the cycle when written carefully | best effort; latency varies with caches, OS, other processes |
| Typical job | motor current control, BMS cell monitoring, safety monitoring, sensor front ends | perception, planning, user interface, fleet connectivity, logging |
| Boot | milliseconds | seconds |

In a humanoid or an industrial robot, the **SoC** decides *where* the arm should go; one **MCU per joint** (or per drive) decides *how much current* flows in each motor phase twenty thousand times a second. In an electric vehicle drive unit, the inverter control board is an MCU (often a safety MCU with **lockstep cores**: two identical cores executing the same instructions, compared every cycle, to detect hardware faults). Note the name clash: lockstep cores have nothing to do with Afterwave's Lockstep capture app, and a customer's safety engineer may use the word in the hardware sense.

### The memory map

An MCU sees one address space. Typical regions:

- **Flash**: the program, constant tables, and usually a reserved sector for **calibration parameters** (gains, offsets, limits) so they can be changed without rebuilding code. Flash is slow to write (milliseconds per page) and wears out after roughly ten thousand to a hundred thousand erase cycles, so it is not used for fast logging.
- **SRAM**: variables, stacks, buffers. Fast, lost at power-off.
- **Tightly coupled memory (TCM)** on larger cores: SRAM next to the core with fixed one-cycle access, used for the control-loop code so its timing does not depend on a cache.
- **Peripheral registers**: memory addresses that configure and read hardware blocks.

A **linker map file** (produced by every build) shows what landed where and how full each region is. It is one of the artifacts that changes when "nothing changed" in the source, and it matters for testing because moving code between memories changes its timing.

### Peripherals do the real-time work

A motor-control MCU is mostly peripherals with a CPU attached:

- **PWM timers** generate the gate signals for the inverter switches at a fixed switching frequency (for example 10 to 20 kHz for silicon IGBTs, higher for SiC and GaN), with hardware dead time between high and low switch.
- **ADCs** sample phase currents and DC-link voltage, triggered by the PWM timer at the centre of the period where the current ripple averages out.
- **DMA** (direct memory access) moves ADC results into SRAM without CPU involvement.
- **Encoder or resolver interfaces** decode rotor position in hardware.
- **Comparators and trip inputs** shut the PWM down within nanoseconds on overcurrent, without waiting for software.
- **Communication controllers** (CAN, SPI, UART, Ethernet) frame and checksum messages in hardware.
- **Watchdog timer**: if the software stops refreshing it in time, it resets the chip. It is the last line of defence against a hung loop.

### Interrupts

An **interrupt** is a hardware signal (ADC conversion complete, CAN frame received, timer expired) that makes the CPU suspend what it is doing, save its state and jump to an **interrupt service routine (ISR)**. A nested vectored interrupt controller assigns priorities so a current-loop ISR can preempt a communication ISR.

**Interrupt latency** is the time from the event to the first instruction of the ISR. On Arm Cortex-M3/M4 the core needs 12 clock cycles for entry with zero-wait-state memory; at 200 MHz that is 60 ns. The real worst case is larger, because latency also includes any time interrupts are disabled:

- **Critical sections**: code that masks interrupts to update shared data atomically. A 300-cycle critical section adds up to 300 cycles of latency to every interrupt below its masking level.
- **Higher-priority ISRs** already running.
- **Flash wait states and cache misses**: a cache miss at the wrong moment adds tens of cycles.

The *variation* of latency is **jitter**. It is often more important than the average, because a control loop designed for a fixed sample time degrades when samples arrive early or late (lesson 2).`,
        },
        { kind: "equation", formula: "aw06-cycle-time" },
        { kind: "equation", formula: "aw06-cycle-budget" },
        { kind: "equation", formula: "aw06-cpu-utilisation" },
        {
          kind: "md",
          md: md`### Cycle and latency arithmetic

The three formulas above answer most timing questions you will hear:

- A 200 MHz MCU running a 20 kHz current loop has $N = 200\times10^6/20\times10^3 = 10{,}000$ cycles per period (50 µs).
- If the field-oriented control routine takes 4,000 cycles, its execution time is $4{,}000/200\times10^6 = 20$ µs, a CPU load of 40%.
- The loop's **sensor-to-actuator latency** is longer than the execution time: the ADC samples at the PWM centre, the ISR computes new duty cycles, and the PWM timer loads them only at the start of the next period. A common rule of thumb is a total effective delay of about **1.5 sample periods** (one period of computation and update delay plus half a period from the PWM acting as a zero-order hold). At 20 kHz that is 75 µs.

Engineers usually want **headroom**: many teams treat a total CPU load above about 70 to 80% on a hard real-time MCU as a warning sign, because the next feature, a compiler update or a worst-case path not seen in testing can push it over.`,
        },
        {
          kind: "flow",
          title: "One current-loop period inside a drive MCU",
          steps: [
            { label: "PWM centre", detail: "Timer triggers the ADC at the centre of the switching period, where current ripple averages out." },
            { label: "ADC + DMA", detail: "Phase currents and DC-link voltage converted (about 1 to 2 µs) and moved to SRAM by DMA." },
            { label: "ISR entry", detail: "Conversion-complete interrupt; 12 cycles on Cortex-M4 plus any masked time." },
            { label: "Control math", detail: "Clarke and Park transforms, PI current controllers, inverse transforms, space-vector modulation (lesson 2)." },
            { label: "Duty update", detail: "New compare values written to the PWM timer shadow registers." },
            { label: "Next period", detail: "Timer loads the new duty cycles; the inverter applies the new voltage. The output lags the measurement by about 1.5 periods." },
          ],
          caption: "Sensor-to-actuator chain for one switching period. Anything that delays a step (a longer critical section, a cache miss, more math) eats into the same fixed period.",
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Illustrative 50 µs budget of a 20 kHz current loop, before and after a logging feature",
          xKey: "build",
          xLabel: "Firmware build (illustrative)",
          yLabel: "Time per 50 µs period (µs)",
          series: [
            { key: "adc", label: "ADC and DMA" },
            { key: "isr", label: "ISR entry and exit" },
            { key: "foc", label: "FOC math" },
            { key: "faults", label: "Fault checks" },
            { key: "background", label: "Background tasks (comms, logging)" },
            { key: "idle", label: "Idle headroom" },
          ],
          data: [
            { build: "v2.3.0", adc: 2, isr: 0.2, foc: 18, faults: 3, background: 12, idle: 14.8 },
            { build: "v2.4.0 (+ high-rate logging)", adc: 2, isr: 0.2, foc: 18, faults: 3, background: 19, idle: 7.8 },
          ],
          caption: "Illustrative numbers. The control math did not change, but headroom fell from 30% to 16% of the period. Timing-sensitive tests (current ripple, torque accuracy, fault response) can now behave differently on the rig even though no control code was touched.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Timing budgets for an actuator drive",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can the drive MCU take a faster current loop?",
          given: md`Illustrative design-partner discussion, not real customer data. A joint actuator drive uses a Cortex-M4F class MCU at **180 MHz**. Current loop at **16 kHz** with an FOC routine measured at **5,400 cycles**. Speed loop at 1.6 kHz, 9,000 cycles. Communication task at 1 kHz, 18,000 cycles. The control engineer proposes raising the current loop to **20 kHz** for better torque bandwidth.`,
          steps: [
            { md: md`**Cycle budget at 16 kHz:** $N = 180\times10^6/16\times10^3 = 11{,}250$ cycles per 62.5 µs period. The FOC routine takes $5{,}400/180\times10^6 = 30$ µs, a load of $30/62.5 = 48\%$.` },
            { md: md`**Other tasks:** speed loop $9{,}000/180\times10^6 = 50$ µs every 625 µs, load 8%. Communication $18{,}000/180\times10^6 = 100$ µs every 1 ms, load 10%. **Total today: 48 + 8 + 10 = 66%.**` },
            { md: md`**At 20 kHz:** budget $= 9{,}000$ cycles per 50 µs. FOC load $= 30/50 = 60\%$. Total $= 60 + 8 + 10 = 78\%$.` },
            { md: md`**Latency gain:** effective delay of about 1.5 periods falls from $1.5\times62.5 = 93.75$ µs to $1.5\times50 = 75$ µs, a 20% cut, which is what buys the extra bandwidth.` },
            { md: md`**Risk view:** 78% is near the level where many teams stop adding features. A worst-case path (a fault handler, a burst of CAN frames) that adds 10 µs inside one period would take that period to 98%. The proposal is feasible but only with measured worst-case execution times, not averages.` },
          ],
          result: md`The faster loop fits on paper (78% load) and cuts loop delay by about 19 µs, but it removes most of the headroom. A firmware change like this must be followed by timing measurements on target and by the rig tests that depend on current-loop behaviour: torque ripple, step response, fault reaction, thermal derating. That list is exactly what Ripple should produce.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Budget for a smaller MCU",
          given: md`Illustrative: a battery-pack balancing controller runs a 25 kHz loop on a **120 MHz** MCU. The loop routine takes **3,000 cycles**.`,
          steps: [
            { md: md`Cycle budget per period: $N = 120\times10^6 / 25\times10^3$.` },
            { md: md`$N = 4{,}800$ cycles per 40 µs period.`, hidden: true, check: { prompt: "Cycles available per period", answer: 4800, unit: "cycles", tolerance: { abs: 1 } } },
            { md: md`Execution time $= 3{,}000/120\times10^6 = 25$ µs. Load of this loop alone $= 25/40$.` },
            { md: md`Load = **62.5%** of the CPU for this loop alone.`, hidden: true, check: { prompt: "CPU load of the loop (%)", answer: 62.5, unit: "%", tolerance: { abs: 0.2 } } },
          ],
          result: md`62.5% for one loop leaves little room for communication and diagnostics; the team would either optimise the routine (fixed-point math, moving code to TCM) or choose a faster part.`,
        },
        {
          kind: "question",
          question: {
            id: "aw06-l01-p1",
            type: "numeric",
            prompt: md`A Cortex-M4 at 150 MHz needs 12 cycles for interrupt entry. The longest critical section in the firmware masks interrupts for 300 cycles. What is the worst-case interrupt entry latency (µs), ignoring other ISRs and cache effects?`,
            answer: 2.08,
            tolerance: { abs: 0.02 },
            unit: "µs",
            explanation: md`Worst case: the interrupt arrives just as the critical section starts, so it waits the full 300 cycles and then needs 12 cycles of entry. $312/150\times10^6 = 2.08$ µs. The core's own 12 cycles (80 ns) are tiny; the firmware's critical sections dominate. This is why a "harmless" change that lengthens a critical section can move every interrupt's timing.`,
            concepts: ["aw06.interrupts", "aw06.cycle-budget"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How firmware teams manage timing",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Hardware engineers** choose the MCU and design the board: clock source, power supplies, current sensors, gate drivers.
- **Firmware engineers** configure peripherals, write the drivers, the control loops and the communication stacks.
- **Control engineers** design the loops (often in MATLAB/Simulink, with automatic code generation) and specify rates and gains.
- **Test and validation engineers** (Ismail's and Yusuf's former world) prove the product behaves on the rig across temperature, voltage and load.

### How timing is measured on target

- **GPIO toggle and oscilloscope or logic analyser**: set a pin high at ISR entry, low at exit; the scope shows execution time and jitter directly. Crude, universal and trusted.
- **Cycle counters**: Cortex-M3 and above have a cycle counter (DWT CYCCNT) that firmware can read at the start and end of a routine.
- **Trace tools**: SEGGER SystemView, Percepio Tracealyzer and Lauterbach TRACE32 record task and ISR timing over long runs.
- **Worst-case execution time (WCET)** analysis tools for safety-critical code (for example AbsInt aiT) compute an upper bound statically.

### Documents that matter

- The MCU **datasheet** (electrical limits), **reference manual** (peripherals) and **errata sheet**: silicon bugs and workarounds. A new silicon revision or a different package of the same MCU can change errata and therefore firmware behaviour.
- The firmware team's **timing budget**: a table of each ISR and task with period, measured average and worst-case execution time, and total load. If a team cannot show one, timing headroom is unknown.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Where timing surprises come from",
          md: md`- **Average instead of worst case**: a routine measured at 20 µs average can take 28 µs when a branch for a rare condition executes. Ask for maximum, not mean.
- **Compiler or optimisation-level change**: same source, different binary, different timing.
- **Code moved between memories**: the linker places a function in flash instead of TCM after an unrelated change; it now depends on the cache.
- **Debug versus release builds**: logging and assertions in a debug build change timing, so a bug seen on the rig disappears in the build used for the report (or the reverse).
- **Silicon or board revision**: a new MCU revision, crystal or current sensor changes ADC timing or offsets.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "What this means for Lockstep and Ripple",
          md: md`For bench memory to be trustworthy, every test record must carry what ran on the device: firmware build identifier, compiler and toolchain version, build variant, calibration dataset and hardware revision (lesson 4). Timing-related changes are a class Ripple must treat as **wide-impact**: they rarely touch one function only, so their test impact follows the timing chain (current loop, torque, thermal, fault response) rather than the source-code diff.`,
        },
        {
          kind: "ask",
          title: "Questions for a customer's firmware lead",
          items: [
            "Which processor runs the control loops, at what clock, and what are the loop rates?",
            "What is the measured worst-case CPU load of the current-loop MCU, and how was it measured?",
            "What is the longest critical section, and do you track interrupt latency per release?",
            "Is there a timing budget document, and is it updated with every release?",
            "Which build (debug or release) runs on the rig during validation tests?",
            "Which silicon and board revisions are in the field and on the bench today?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw06-l01-p2",
            type: "short",
            prompt: md`You have a discovery call next week with the test lead of a (hypothetical) humanoid actuator team. Write a one-page **embedded architecture discovery sheet** you will use on the call: 6 to 8 questions about their processors, loop rates, timing headroom and build identification, and for each question one sentence on what the answer tells you about how Lockstep must capture data and how Ripple should treat their firmware changes.`,
            rubric: [
              "Asks which processors run which jobs (SoC for planning, MCUs per joint or drive) and how they communicate",
              "Asks for loop rates and measured worst-case CPU load or timing headroom, with how it is measured",
              "Asks how the firmware build, calibration and hardware revision are identified on the bench",
              "Links each answer to a concrete implication for Lockstep capture (signals, rates, clocks, metadata) or Ripple impact (wide-impact timing changes)",
              "Uses correct terms (ISR, jitter, cycle budget, debug vs release) without inventing facts about the customer",
              "Is short and usable on a real call (one page, ordered from easy to probing)",
            ],
            modelAnswer: md`**Embedded architecture discovery sheet (humanoid actuator team, hypothetical)**

1. **Which processors run what?** (planning SoC, joint MCUs, safety MCU). Tells us how many devices Lockstep must identify per test and where firmware versions live.
2. **What are your loop rates (current, velocity, position) and where do they run?** Sets the signal rates Lockstep must log and which rig tests are timing-sensitive.
3. **What is the worst-case CPU load on the joint MCU, and how do you measure it?** Low headroom means Ripple should treat any change on that MCU as wide-impact.
4. **How is the firmware build identified on the bench: a version string, a git hash, read out over CAN or a debug probe?** Decides whether Lockstep can stamp every run automatically or needs a manual entry (a weakness to fix).
5. **Where are calibration parameters stored and versioned?** If calibration changes independently of code, Ripple must track it as its own artifact.
6. **Which build runs during validation: debug or release?** Tells us whether timing seen on the rig matches the shipped product.
7. **Which hardware and silicon revisions are on your benches?** Each revision is a variant; test results must be grouped by it.
8. **When a firmware release breaks a rig test, how do you find out which change caused it?** Opens the Ripple conversation with their own pain.`,
            explanation: md`A strong sheet moves from architecture to timing to identity and ends on the pain Afterwave solves. Each question earns its place by changing how the product would be configured or sold.`,
            concepts: ["aw06.mcu-vs-soc", "aw06.cycle-budget", "aw06.interrupts"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a non-technical investor why a robot needs both a powerful SoC and several small microcontrollers, and why the small ones are the ones whose timing must be tested on the rig.",
          keyPoints: [
            "The SoC runs perception and planning with a full OS: high throughput, variable timing",
            "MCUs run motor current loops, BMS and safety functions with deterministic timing at tens of kHz",
            "Each control period has a fixed cycle budget; CPU load and worst-case execution time decide whether it fits",
            "Interrupt latency and jitter come from critical sections, caches and other ISRs, not only from the core",
            "A firmware change that eats headroom can change physical behaviour (torque, faults) without touching control code, so the rig must check it",
          ],
        },
        { kind: "sources", refs: ["aw06-r1", "aw06-r14"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw06-l01-q1",
      type: "numeric",
      prompt: md`A 240 MHz MCU runs a 24 kHz current loop. How many CPU cycles are available per loop period?`,
      answer: 10000,
      tolerance: { abs: 1 },
      unit: "cycles",
      explanation: md`$N = f_{clk}/f_{loop} = 240\times10^6/24\times10^3 = 10{,}000$ cycles, a period of 41.7 µs.`,
      concepts: ["aw06.cycle-budget"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw06-l01-q2",
      type: "mcq",
      prompt: "Which job is most likely to run on a microcontroller rather than on an application SoC in a humanoid robot?",
      options: [
        "Camera-based object detection",
        "Whole-body motion planning",
        "The 20 kHz current loop of a knee actuator",
        "The fleet-management web interface",
      ],
      answer: 2,
      explanation: md`Hard real-time loops at tens of kHz need deterministic timing, which an MCU with an RTOS or bare-metal code provides. Perception, planning and user interfaces run on the SoC under Linux or similar.`,
      concepts: ["aw06.mcu-vs-soc"],
      difficulty: 1,
    },
    {
      id: "aw06-l01-q3",
      type: "multi",
      prompt: "Which of these increase worst-case interrupt latency on an MCU? (Select all that apply.)",
      options: [
        "A longer critical section that masks interrupts",
        "A higher-priority ISR already running",
        "A cache miss when fetching the ISR code",
        "Moving the ISR code into tightly coupled memory",
        "Raising the priority of the ISR above all others",
      ],
      answer: [0, 1, 2],
      explanation: md`Masked time, higher-priority work and memory wait states all add latency. TCM removes cache variability, and the highest priority removes preemption by others; both reduce latency.`,
      concepts: ["aw06.interrupts"],
      difficulty: 2,
    },
    {
      id: "aw06-l01-q4",
      type: "numeric",
      prompt: md`Tasks on one MCU: current loop 25 µs every 50 µs, speed loop 60 µs every 500 µs, communication 150 µs every 1 ms. What is the total CPU load (%)?`,
      answer: 77,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`$U = 25/50 + 60/500 + 150/1000 = 0.50 + 0.12 + 0.15 = 0.77$, so 77%. Near the level where many teams stop adding features without optimisation.`,
      concepts: ["aw06.cycle-budget"],
      difficulty: 1,
    },
    {
      id: "aw06-l01-q5",
      type: "mcq",
      prompt: "A current loop runs at 10 kHz with the usual centre-aligned sampling and next-period PWM update. What is the approximate effective sensor-to-actuator delay?",
      options: ["10 µs", "50 µs", "150 µs", "1 ms"],
      answer: 2,
      explanation: md`About 1.5 sample periods: one period for computation and update plus half a period for the PWM zero-order hold. $1.5\times100$ µs = 150 µs.`,
      concepts: ["aw06.cycle-budget", "aw06.interrupts"],
      difficulty: 2,
    },
    {
      id: "aw06-l01-q6",
      type: "decision",
      prompt: md`A design partner reports that a torque-ripple test passed on the debug build last week and fails on the release build today. The firmware lead says "no control code changed". What do you suggest Afterwave's pilot team check first?`,
      options: [
        { text: "Ignore it: no control code changed, so the rig must be faulty.", score: 0, feedback: "Same source does not mean same timing. Debug and release builds differ in optimisation, logging and memory layout." },
        { text: "Compare the two builds' timing (ISR execution time and jitter), linker map and build flags, and check which build and calibration each test record carries.", score: 1, feedback: "Timing and memory layout differ between builds; the test records must say which build ran. This is a classic case for capturing build identity with every run." },
        { text: "Retune the current-loop gains on the release build.", score: 0.3, feedback: "May hide the symptom, but you do not yet know the cause; you could be compensating for a timing regression." },
      ],
      explanation: md`Debug and release builds are different binaries with different timing. The first job is to know exactly what ran and to measure the timing difference.`,
      concepts: ["aw06.interrupts", "aw06.memory-peripherals"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw06-l01-f1", front: "MCU vs application SoC in one line", back: "MCU: on-chip flash and SRAM, real-time peripherals, deterministic RTOS or bare metal. SoC: GHz cores, DRAM, Linux, throughput over determinism.", concepts: ["aw06.mcu-vs-soc"] },
    { id: "aw06-l01-f2", front: "Cycle budget per control period", back: md`$N = f_{clk}/f_{loop}$; 200 MHz at 20 kHz gives 10,000 cycles.`, concepts: ["aw06.cycle-budget"] },
    { id: "aw06-l01-f3", front: "CPU load", back: md`$U = \sum C_i/T_i$: execution time over period, summed over tasks and ISRs.`, concepts: ["aw06.cycle-budget"] },
    { id: "aw06-l01-f4", front: "Interrupt latency on Cortex-M4", back: "12 cycles core entry (zero wait states) plus any time interrupts are masked (critical sections) or blocked by higher-priority ISRs.", concepts: ["aw06.interrupts"] },
    { id: "aw06-l01-f5", front: "Effective delay of a sampled current loop", back: "About 1.5 sample periods (computation and next-period update plus PWM zero-order hold).", concepts: ["aw06.cycle-budget"] },
    { id: "aw06-l01-f6", front: "Lockstep cores (hardware sense)", back: "Two identical CPU cores running the same code, compared every cycle to detect hardware faults in safety MCUs. Not the Afterwave app.", concepts: ["aw06.mcu-vs-soc"] },
    { id: "aw06-l01-f7", front: "What the watchdog does", back: "Resets the MCU if software fails to refresh it in time: the last defence against a hung loop.", concepts: ["aw06.memory-peripherals"] },
  ],
};

export default lesson;
