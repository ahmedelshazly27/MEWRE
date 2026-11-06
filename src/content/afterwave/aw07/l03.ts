import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw07-l03",
  title: "Perception: encoders, IMUs, cameras, lidar, sensor fusion and the Kalman filter",
  summary:
    "What each robot sensor actually measures, its resolution and error model in numbers (encoder counts, IMU bias drift, stereo depth error growing with distance squared, lidar time of flight), and how sensor fusion combines them. The Kalman filter is built from the scalar case up to the matrix update equations, with the intuition that the gain is just a ratio of trust. Ends with why timestamps matter as much as the sensors, and what a perception regression test must capture.",
  minutes: 85,
  objectives: [
    "You can state the measurement principle, resolution and dominant error of encoders, IMUs, cameras, stereo and lidar, with numbers.",
    "You can compute stereo depth error at a given range and explain why it grows with distance squared.",
    "You can explain why an accelerometer bias grows quadratically into position error and a gyro bias linearly into angle error.",
    "You can write the Kalman predict and update equations, compute a scalar update by hand and explain the gain as a ratio of uncertainties.",
    "You can specify what a perception regression test must record, including ground truth and time synchronisation.",
  ],
  concepts: [
    { id: "aw07.proprioception", name: "Proprioceptive sensors: encoders and IMU", description: "Sensors measuring the robot's own state: joint encoders (angle, resolution set by counts per revolution) and IMUs (gyros measure angular rate, accelerometers measure specific force including gravity), with bias and noise that integrate into drift.", competency: "aw-physical-ai", related: ["aw07.sensor-fusion"] },
    { id: "aw07.exteroception", name: "Exteroceptive sensors: cameras, stereo and lidar", description: "Sensors measuring the world: cameras (pinhole projection, calibration), stereo depth Z = fB/d with error growing as Z squared, lidar range from time of flight with failure modes on dark, shiny or transparent surfaces.", competency: "aw-physical-ai", related: ["aw07.sensor-fusion"] },
    { id: "aw07.sensor-fusion", name: "Sensor fusion", description: "Combining sensors with complementary errors (for example a gyro, accurate short term but drifting, with an accelerometer, noisy but drift-free for tilt) into one estimate better than either.", competency: "aw-physical-ai", related: ["aw07.kalman-filter", "aw07.proprioception", "aw07.exteroception"] },
    { id: "aw07.kalman-filter", name: "Kalman filter", description: "Recursive estimator that predicts the state and its uncertainty with a model, then corrects with a measurement weighted by the Kalman gain K = P-H^T(HP-H^T + R)^-1, the ratio of prediction uncertainty to total uncertainty.", competency: "aw-physical-ai", related: ["aw07.sensor-fusion"] },
    { id: "aw07.time-sync", name: "Sensor time synchronisation", description: "Every fused measurement needs a timestamp of when it was taken, on a common clock; a timestamp error on a moving robot becomes a spatial error equal to velocity times the time error.", competency: "aw-physical-ai", related: ["aw07.sensor-fusion"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What each sensor measures, how well, and how to fuse them",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Lockstep's founding claim is that rig signals and on-screen actions land on one clock. Perception is where that matters most: a robot fuses encoders, IMUs, cameras and lidar arriving at different rates through different paths, and a timestamp error looks exactly like a sensor error. Perception stacks are also among the most frequently changed parts of a physical AI system (new camera, new calibration, new model). When a customer's perception lead talks about "IMU-camera extrinsics", "rolling shutter" or "the filter's R matrix", you need to follow, and to say what Lockstep must capture for the result to count as evidence.`,
        },
        {
          kind: "md",
          md: md`### Proprioception: the robot's own state

**Encoders** measure joint angle. An absolute encoder with $b$ bits resolves $2^b$ positions per revolution:`,
        },
        { kind: "equation", formula: "aw07-encoder-resolution" },
        {
          kind: "md",
          md: md`A 19-bit motor encoder gives $2\pi/524{,}288 = 1.2\times10^{-5}$ rad (2.5 arcsec). Resolution is not accuracy: eccentricity, magnet misalignment and interpolation errors are typically far larger than one count, and are calibrated out. Velocity is computed by differencing: at 8 kHz one count per sample is $1.2\times10^{-5}\times8{,}000 = 0.096$ rad/s, so velocity at low speed is quantised and noisy, which is why velocity loops filter it (lesson 2: filters add delay). With a gearbox, a motor encoder does **not** see backlash or compliance; an output encoder does.

An **IMU** combines a 3-axis gyroscope (angular rate, rad/s) and a 3-axis accelerometer (specific force, m/s², which includes gravity). Integrate the gyro and you get orientation; integrate acceleration twice and you get position. The trouble is **bias**: a small constant offset integrates into a growing error:`,
        },
        { kind: "equation", formula: "aw07-imu-drift" },
        {
          kind: "md",
          md: md`A gyro bias of 0.01 °/s gives 0.6° of heading error after one minute, 6° after ten. An accelerometer bias of 1 mg (0.0098 m/s²) gives 0.5 m of position error after 10 s and 18 m after 60 s. IMUs alone are good for a fraction of a second of position and seconds to minutes of orientation; everything else needs fusion. The accelerometer's gravity reading gives drift-free **tilt** (roll and pitch) when the robot is not accelerating, but no heading.

### Exteroception: the world

**Cameras** project 3D points onto pixels. The pinhole model with focal length $f$ (in pixels) and principal point $(c_x, c_y)$:`,
        },
        { kind: "equation", formula: "aw07-pinhole" },
        {
          kind: "md",
          md: md`**Intrinsic calibration** estimates $f$, $c_x$, $c_y$ and lens distortion; **extrinsic calibration** estimates where the camera sits relative to the robot body or another sensor. Global-shutter cameras expose all pixels at once; rolling-shutter cameras expose row by row, so a moving robot sees skewed images and each row has its own timestamp.

**Stereo** recovers depth from the pixel disparity $d$ between two cameras a baseline $B$ apart. Differentiate $Z = fB/d$ and the error grows with distance squared:`,
        },
        { kind: "equation", formula: "aw07-stereo-depth" },
        {
          kind: "md",
          md: md`With $f = 700$ px, $B = 6$ cm and quarter-pixel matching accuracy: 0.6 cm error at 1 m, 2.4 cm at 2 m, 9.5 cm at 4 m. Stereo is excellent at manipulation distances and weak at range; a wider baseline helps at range and hurts at close range (the views differ too much).

**Lidar** measures range by time of flight: $r = ct/2$. One nanosecond of timing is 15 cm of range, so lidars use precise timing and averaging to reach centimetre accuracy. Failure modes: black and very dark surfaces (low return), mirrors and polished metal (specular reflection away from the sensor), glass (passes through), rain, dust and mutual interference. Depth cameras (structured light, indirect time of flight) share some of these and can be blinded by sunlight.

### Fusion and the Kalman filter

Sensors have **complementary errors**: the gyro is precise over short times and drifts; the accelerometer tilt is noisy but does not drift; wheel or leg odometry slips; cameras are slow and fail in the dark; lidar is accurate but sparse and blind to glass. Fusion combines them so each covers the others' weakness.

The simplest fusion is a **complementary filter** for tilt: trust the integrated gyro at high frequency and the accelerometer at low frequency:`,
        },
        { kind: "equation", formula: "aw07-complementary-filter" },
        {
          kind: "md",
          md: md`With $\alpha = 0.98$ at 100 Hz, the crossover time constant is about 0.49 s: gyro below half a second, accelerometer above.

The **Kalman filter** does the same thing optimally (for linear systems with Gaussian noise) and adapts the weighting as uncertainty changes. It keeps a state estimate $\hat x$ and its covariance $P$ and alternates two steps.

**Predict** with the motion model $F$, the control input $u$ and process noise $Q$:`,
        },
        { kind: "equation", formula: "aw07-kalman-predict" },
        { kind: "md", md: md`**Update** with a measurement $z = Hx + v$ whose noise covariance is $R$:` },
        { kind: "equation", formula: "aw07-kalman-update" },
        {
          kind: "md",
          md: md`**Intuition from the scalar case.** With one state measured directly ($H = 1$), the gain is $K = P^-/(P^- + R)$: the share of the total uncertainty that belongs to the prediction. If the prediction is very uncertain ($P^- \gg R$), $K \to 1$ and the filter follows the measurement. If the measurement is very noisy ($R \gg P^-$), $K \to 0$ and the filter keeps its prediction. The new estimate moves a fraction $K$ of the way from prediction to measurement, and the new variance $(1-K)P^-$ is always smaller than either input. In steady state, $Q$ (how much the world can change between steps) and $R$ (how noisy the sensor is) set a fixed gain.

Two practical facts: real robots are nonlinear, so they use the **extended** Kalman filter (linearise $F$ and $H$ at the current estimate) or the **unscented** variant, and much of perception today is a learned network rather than a filter. But the filter's logic, weight each source by its uncertainty and keep track of how certain you are, still structures state estimation in legged robots, drones and vehicles. And $Q$ and $R$ are **tuning parameters**: change them and the robot's behaviour changes, so they belong in the test record like control gains.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Scalar Kalman filter: prediction variance and gain converge to steady state",
          xKey: "step",
          xLabel: "Update step",
          yLabel: "Variance (deg²) and gain",
          series: [
            { key: "prior", label: "Prediction variance P-" },
            { key: "gain", label: "Kalman gain K" },
            { key: "post", label: "Updated variance P" },
          ],
          data: [
            { step: 1, prior: 4.1, gain: 0.672, post: 1.344 },
            { step: 2, prior: 1.444, gain: 0.419, post: 0.839 },
            { step: 3, prior: 0.939, gain: 0.319, post: 0.639 },
            { step: 4, prior: 0.739, gain: 0.27, post: 0.54 },
            { step: 5, prior: 0.64, gain: 0.242, post: 0.485 },
            { step: 6, prior: 0.585, gain: 0.226, post: 0.452 },
            { step: 7, prior: 0.552, gain: 0.216, post: 0.433 },
            { step: 8, prior: 0.533, gain: 0.21, post: 0.421 },
            { step: 9, prior: 0.521, gain: 0.207, post: 0.413 },
            { step: 10, prior: 0.513, gain: 0.204, post: 0.408 },
          ],
          caption: "Initial variance 4 deg², process noise Q = 0.1 deg² per step, measurement noise R = 2 deg². The gain starts high (trust the sensor while the estimate is poor) and settles at K = 0.2 with prediction variance 0.5 deg².",
        },
        {
          kind: "md",
          md: md`### Time is a sensor too

Fusion assumes each measurement's timestamp is when it was taken. On a moving robot a time error $\delta t$ becomes a spatial error:`,
        },
        { kind: "equation", formula: "aw07-timestamp-error" },
        {
          kind: "md",
          md: md`A head turning at 1 rad/s with a 1 ms camera-IMU time offset misplaces a point 2 m away by 2 mm; at 20 ms (a frame stamped on arrival rather than at exposure, a common bug) it is 4 cm, enough to miss a grasp. Time offsets are calibrated (tools such as Kalibr estimate camera-IMU time offset and extrinsics together) and hardware triggering or PTP (IEEE 1588) clock sync keeps them small. This is the same problem Lockstep solves on the bench between DAQ and application logs.`,
        },
        { kind: "widget", widget: "bench-sync", caption: "Two streams on different clocks: see how offset and drift misalign events, and how sync pulses recover them. The same physics applies between a robot's camera and IMU." },
      ],
    },
    {
      layer: "applied",
      title: "Numbers a perception lead will expect you to follow",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Error budget for a humanoid picking a part from a bin 2 m away",
          given: md`Illustrative head stereo camera: $f = 700$ px, $B = 0.06$ m, matching accuracy 0.25 px. IMU tilt estimate from a Kalman filter: prediction variance 4 deg², measurement (accelerometer tilt) variance 1 deg², prior estimate 10.0°, measurement 12.0°. Camera frames stamped on arrival with a constant 20 ms latency; head rotating at 0.5 rad/s during the approach.`,
          steps: [
            { md: md`**Stereo disparity at 2 m.** $d = fB/Z = 700\times0.06/2 = 21$ px.` },
            { md: md`**Stereo depth error.** $\delta Z = Z^2\delta d/(fB) = 4\times0.25/42 = 0.024$ m = **2.4 cm**.` },
            { md: md`**Kalman gain.** $K = P^-/(P^- + R) = 4/(4+1) = 0.8$.` },
            { md: md`**Updated tilt.** $\hat\theta = 10.0 + 0.8\times(12.0 - 10.0) = 11.6°$, variance $(1 - 0.8)\times4 = 0.8$ deg² (standard deviation 0.89°).` },
            { md: md`**Tilt error at the target.** 0.89° is 0.0156 rad; at 2 m that is $2\times0.0156 = 3.1$ cm of position error at one standard deviation.` },
            { md: md`**Timestamp error.** $\delta x = \omega\,r\,\delta t = 0.5\times2\times0.020 = 0.02$ m = **2 cm**, systematic (always in the direction of motion), unless the 20 ms is calibrated out.` },
            { md: md`**Budget.** Independent random errors add in quadrature: $\sqrt{2.4^2 + 3.1^2} = 3.9$ cm; the timestamp bias adds on top in one direction. Calibrating the latency removes 2 cm for free; a better tilt estimate is the next lever.` },
          ],
          result: md`About 4 cm random error plus 2 cm timing bias at 2 m, before the grasp policy even starts. The cheapest improvement is fixing the timestamp, which is a data-capture problem, not a sensor purchase. Ask what the error budget is before blaming a model.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Wider baseline and a range update",
          given: md`A torso stereo pair with $f = 900$ px and $B = 0.12$ m, matching accuracy 0.25 px, target at 3 m. Separately, a range estimate for a floor marker: prediction 0.50 m with variance 0.04 m², lidar measurement 0.56 m with variance 0.01 m².`,
          steps: [
            { md: md`Disparity $d = 900\times0.12/3 = 36$ px. Depth error $\delta Z = Z^2\delta d/(fB) = 9\times0.25/108$.` },
            { md: md`$\delta Z = 0.0208$ m = 2.1 cm.`, hidden: true, check: { prompt: "Depth error at 3 m (cm)", answer: 2.08, unit: "cm", tolerance: { abs: 0.05 } } },
            { md: md`Kalman gain $K = 0.04/(0.04 + 0.01) = 0.8$; updated range $= 0.50 + 0.8\times0.06$.` },
            { md: md`Updated range $= 0.548$ m, variance $0.2\times0.04 = 0.008$ m² (standard deviation 8.9 cm).`, hidden: true, check: { prompt: "Updated range (m)", answer: 0.548, unit: "m", tolerance: { abs: 0.002 } } },
          ],
          result: md`Doubling the baseline and raising focal length cut the error at 3 m to 2.1 cm, versus 5.4 cm for the head camera at the same range. The filter trusts the lidar four times more than its prediction because its variance is four times smaller.`,
        },
        {
          kind: "question",
          question: {
            id: "aw07-l03-p1",
            type: "numeric",
            prompt: md`An accelerometer has a bias of 2 mg (1 mg = 0.00981 m/s²). If integrated twice with no correction, what position error does it produce after 5 s, in m (3 decimals)?`,
            answer: 0.245,
            tolerance: { abs: 0.003 },
            unit: "m",
            explanation: md`$b = 2\times0.00981 = 0.0196$ m/s². $x = \tfrac12bt^2 = 0.5\times0.0196\times25 = 0.245$ m. Quadratic growth is why IMUs need position fixes from other sensors within seconds.`,
            concepts: ["aw07.proprioception"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Perception testing in practice: calibration, ground truth and regression",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

Perception and state-estimation engineers own the stack; test engineers own the regression set. Typical tools: ROS 2 for middleware and recording (rosbag files, increasingly in the MCAP container), OpenCV and Kalibr for camera and camera-IMU calibration, motion-capture systems (infrared marker tracking) or laser trackers for **ground truth**, and visualisers such as Foxglove or Rerun to inspect logs.

A perception regression test has four ingredients:
1. **A fixed scenario**: a scene, a trajectory and lighting, reproducible on the bench (turntable, rail, robot arm moving the sensor head) or replayed from a recorded log.
2. **Ground truth** from an independent, more accurate system (motion capture, a surveyed target, a calibrated fixture).
3. **Metrics** with thresholds: depth error vs range, pose error (absolute trajectory error), detection precision and recall, latency from exposure to estimate.
4. **Provenance**: sensor serials, calibration file version, firmware, filter parameters (Q, R), model weights, and timestamps on one clock.

Replaying logs is cheap and repeatable but only tests the software; bench runs with live sensors test the whole chain including exposure, timing and calibration drift.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Timestamp at arrival, not at exposure.** USB and network buffering adds variable latency; fusion then sees a constant offset plus jitter.
- **Calibration treated as permanent.** A knock, a thermal cycle or a re-mounted camera changes extrinsics; nobody reruns calibration checks after hardware rework.
- **IMU vibration aliasing.** Motor and gear vibration at hundreds of hertz aliases into the IMU's bandwidth if its internal filtering is not set correctly.
- **Lidar validated only on matte targets.** Black, shiny and glass surfaces are where it fails.
- **Ground truth not synchronised.** Motion capture on its own clock: the comparison then includes a time-offset error that looks like estimator error.`,
        },
        {
          kind: "checklist",
          title: "Ask for these before trusting a perception result",
          items: [
            "Timestamps taken at exposure or sample time, on a shared clock, with the sync method stated",
            "Calibration file version and date, and the last calibration check after hardware work",
            "Ground truth source, its accuracy and how it was synchronised",
            "Results across range, lighting and surface types, not only the easy case",
            "Filter parameters (Q, R) and model versions recorded with each run",
          ],
        },
        {
          kind: "ask",
          title: "Discovery questions for a perception lead",
          items: [
            "How do you know the camera-IMU time offset today, and when was it last checked?",
            "What is your ground truth on the bench, and is it on the same clock as the robot's logs?",
            "When you change a calibration file or a filter parameter, which tests do you rerun?",
            "How many hours of logs do you keep, and can you find the run that matches a field failure?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw07-l03-p2",
            type: "short",
            prompt: md`Write a **Lockstep capture specification for a perception regression test** on a humanoid head (stereo camera, IMU, neck joint encoders) mounted on a bench fixture that moves it along a known path. Include: signals and rates, how all streams get one clock, ground truth, the metrics and illustrative thresholds, and the provenance fields every run must store.`,
            rubric: [
              "Lists the relevant streams with plausible rates: camera frames (for example 30 to 60 Hz) with exposure timestamps, IMU (hundreds of Hz to kHz), joint encoders (kHz), fixture position and ground truth",
              "Specifies a concrete synchronisation method (hardware trigger, PTP, shared sync pulse) and how residual offset and drift are measured",
              "Names an independent ground truth (motion capture, fixture encoder, surveyed targets) and its synchronisation",
              "Defines measurable metrics with illustrative thresholds labelled as such (depth error vs range, pose error, latency)",
              "Includes provenance: sensor serials, calibration version, firmware, filter parameters, model version, environment conditions",
            ],
            modelAnswer: md`**Perception regression capture spec v0 (illustrative thresholds)**

**Streams:** stereo frames 30 Hz with exposure-midpoint timestamps; IMU 1 kHz; neck encoders 2 kHz; fixture linear encoder 1 kHz; motion capture 200 Hz on markers on the head and on three targets.

**One clock:** the fixture controller emits a hardware trigger to the cameras and a 1 Hz sync pulse recorded on the DAQ, IMU and motion-capture inputs; robot computer and DAQ on PTP. Lockstep fits offset and drift per stream from the pulses and stores the residual (accept below 0.5 ms).

**Ground truth:** motion capture for head pose; surveyed target positions at 0.5, 1, 2 and 3 m.

**Metrics:** depth error at each range (below 1 % of range up to 2 m); head orientation error versus motion capture (below 0.5° RMS); exposure-to-estimate latency (below 40 ms, 99th percentile below 60 ms); camera-IMU time offset estimated versus calibrated (difference below 1 ms).

**Provenance per run:** camera and IMU serials, calibration file hash and date, firmware versions, estimator Q and R, perception model version, lighting level, fixture path ID, operator, rig ID.`,
            explanation: md`The spec is only useful if it makes the run reproducible and comparable: one clock, independent truth, thresholds and a full provenance record so that a later change can be traced to the tests it invalidates.`,
            concepts: ["aw07.time-sync", "aw07.exteroception", "aw07.sensor-fusion"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["aw07-r19", "aw07-r20", "aw07-r34"] },
        {
          kind: "feynman",
          prompt: "Explain the Kalman gain to a non-technical cofounder using the example of combining a gyro and an accelerometer to know which way is up.",
          keyPoints: [
            "The filter keeps a best guess and a measure of how unsure it is",
            "It predicts forward using the gyro, and its uncertainty grows as it predicts",
            "When the accelerometer reading arrives, it moves the guess part of the way towards it",
            "How far it moves (the gain) is the share of total uncertainty that belongs to the prediction",
            "The combined estimate is more certain than either sensor alone, and the noise settings Q and R are tuning choices that must be recorded",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw07-l03-q1",
      type: "numeric",
      prompt: md`Stereo camera: $f = 800$ px, $B = 0.10$ m, matching accuracy 0.2 px. Depth error at 5 m, in cm (1 decimal)?`,
      answer: 6.3,
      tolerance: { abs: 0.1 },
      unit: "cm",
      explanation: md`$\delta Z = Z^2\delta d/(fB) = 25\times0.2/80 = 0.0625$ m $= 6.3$ cm. Quadruple at 10 m.`,
      concepts: ["aw07.exteroception"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw07-l03-q2",
      type: "numeric",
      prompt: md`Scalar Kalman update: prediction 2.0 with variance 0.09, measurement 2.3 with variance 0.18. What is the updated estimate (2 decimals)?`,
      answer: 2.1,
      tolerance: { abs: 0.005 },
      explanation: md`$K = 0.09/(0.09 + 0.18) = 1/3$. $\hat x = 2.0 + (1/3)(0.3) = 2.10$. Updated variance $= (2/3)\times0.09 = 0.06$, smaller than both inputs.`,
      concepts: ["aw07.kalman-filter"],
      difficulty: 2,
    },
    {
      id: "aw07-l03-q3",
      type: "mcq",
      prompt: "In a Kalman filter, what happens to the gain when the measurement noise R becomes very large compared with the prediction variance?",
      options: [
        "The gain approaches 1 and the filter follows the measurement",
        "The gain approaches 0 and the filter keeps its prediction",
        "The gain is unaffected; only Q matters",
        "The filter becomes unstable",
      ],
      answer: 1,
      explanation: md`$K = P^-/(P^- + R) \to 0$ as $R \to \infty$: a very noisy sensor barely moves the estimate.`,
      concepts: ["aw07.kalman-filter"],
      difficulty: 1,
    },
    {
      id: "aw07-l03-q4",
      type: "multi",
      prompt: "Which are known failure modes of lidar? (Select all that apply.)",
      options: [
        "Glass and transparent surfaces",
        "Mirrors and polished metal",
        "Very dark, low-reflectivity surfaces",
        "Complete darkness (no ambient light)",
        "Interference from other lidars",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Lidar is an active sensor, so it works in the dark. It fails where the return does not come back (glass, specular surfaces, very dark targets) or is confused (interference, rain, dust).`,
      concepts: ["aw07.exteroception"],
      difficulty: 1,
    },
    {
      id: "aw07-l03-q5",
      type: "numeric",
      prompt: md`A camera frame is stamped 15 ms late. The robot's arm-mounted camera moves at 0.8 m/s relative to the target. What is the resulting position error in mm?`,
      answer: 12,
      tolerance: { abs: 0.2 },
      unit: "mm",
      explanation: md`$\delta x = v\,\delta t = 0.8\times0.015 = 0.012$ m $= 12$ mm. A pure data-capture error that looks like a perception error.`,
      concepts: ["aw07.time-sync"],
      difficulty: 1,
    },
    {
      id: "aw07-l03-q6",
      type: "order",
      prompt: "Order the steps of one Kalman filter cycle.",
      items: [
        "Predict the state with the motion model",
        "Grow the covariance: P- = F P F^T + Q",
        "Compute the gain K from P-, H and R",
        "Correct the state with K times the innovation",
        "Shrink the covariance: P = (I - K H) P-",
      ],
      explanation: md`Predict state and covariance, then compute the gain, correct the state with the innovation $z - H\hat x^-$, and reduce the covariance.`,
      concepts: ["aw07.kalman-filter"],
      difficulty: 1,
    },
    {
      id: "aw07-l03-q7",
      type: "decision",
      prompt: md`A customer's grasp success dropped after a camera driver update, but their perception model is unchanged. Which first test do you suggest?`,
      options: [
        { text: "Retrain the grasp model on new data.", score: 0.1, feedback: "Expensive and assumes the model is the problem; nothing about the model changed." },
        { text: "Measure exposure-to-timestamp latency and camera-IMU time offset before and after the driver update, against a synchronised reference.", score: 1, feedback: "Right: a driver update most plausibly changed timing or buffering; measure it directly." },
        { text: "Recalibrate the camera intrinsics.", score: 0.4, feedback: "Possible if the driver changed resolution or cropping, but timing is the more likely change and cheaper to check first." },
      ],
      explanation: md`Follow the change: a driver touches capture, buffering and timestamps. Those are measurable on the bench with a synchronised reference.`,
      concepts: ["aw07.time-sync", "aw07.sensor-fusion"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw07-l03-f1", front: "Stereo depth and its error", back: md`$Z = fB/d$; $\delta Z = Z^2\delta d/(fB)$: error grows with distance squared.`, concepts: ["aw07.exteroception"] },
    { id: "aw07-l03-f2", front: "IMU bias drift", back: md`Gyro: $\delta\theta = b_g t$ (linear). Accelerometer: $\delta x = \tfrac12 b_a t^2$ (quadratic). 1 mg gives 0.5 m in 10 s.`, concepts: ["aw07.proprioception"] },
    { id: "aw07-l03-f3", front: "Kalman gain (scalar)", back: md`$K = P^-/(P^- + R)$: share of total uncertainty that belongs to the prediction.`, concepts: ["aw07.kalman-filter"] },
    { id: "aw07-l03-f4", front: "Kalman update equations", back: md`$K = P^-H^\top(HP^-H^\top + R)^{-1}$; $\hat x = \hat x^- + K(z - H\hat x^-)$; $P = (I - KH)P^-$.`, concepts: ["aw07.kalman-filter"] },
    { id: "aw07-l03-f5", front: "Lidar range from time of flight", back: md`$r = ct/2$; 1 ns is 15 cm.`, concepts: ["aw07.exteroception"] },
    { id: "aw07-l03-f6", front: "Spatial error from a timestamp error", back: md`$\delta x = v\,\delta t$ (or $\omega r\,\delta t$ for rotation). Stamp at exposure, not on arrival.`, concepts: ["aw07.time-sync"] },
    { id: "aw07-l03-f7", front: "Encoder resolution vs accuracy", back: "Resolution is counts per revolution (19 bits = 2.5 arcsec); accuracy is limited by eccentricity, mounting and interpolation errors, usually much larger.", concepts: ["aw07.proprioception"] },
  ],
};

export default lesson;
