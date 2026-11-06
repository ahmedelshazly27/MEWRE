import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // l01
  {
    id: "mz05-sun-vector",
    name: "Sun unit vector (East, North, Up)",
    tex: String.raw`\mathbf{s} = (\sin\theta_z\sin\gamma_s,\ \sin\theta_z\cos\gamma_s,\ \cos\theta_z)`,
    vars: [
      { sym: String.raw`\theta_z`, meaning: "Solar zenith angle", unit: "°" },
      { sym: String.raw`\gamma_s`, meaning: "Solar azimuth, clockwise from north", unit: "°" },
    ],
    explanation: md`Components $s_E$, $s_N$, $s_U$ of the direction to the sun. Every tracking equation follows from projecting this vector onto the tracker's rotation plane.`,
    lesson: "mz05-l01",
  },
  {
    id: "mz05-true-tracking",
    name: "True-tracking angle, horizontal single-axis tracker",
    tex: String.raw`\tan R = \tan\theta_z \,\sin(\gamma_s - \gamma_a)`,
    vars: [
      { sym: "R", meaning: "Rotation angle from flat (negative east, positive west)", unit: "°" },
      { sym: String.raw`\theta_z`, meaning: "Solar zenith angle", unit: "°" },
      { sym: String.raw`\gamma_s`, meaning: "Solar azimuth", unit: "°" },
      { sym: String.raw`\gamma_a`, meaning: "Axis azimuth (180° for a north-south axis pointing south)", unit: "°" },
    ],
    explanation: md`Equivalent to $\tan R = s_E/s_U$. Clip to the mechanical limit (typically 52 to 60°). Use atan2 to keep the right quadrant.`,
    lesson: "mz05-l01",
  },
  {
    id: "mz05-tracking-tilted-axis",
    name: "True-tracking angle, tilted axis (Marion and Dobos)",
    tex: String.raw`\tan R = \dfrac{\sin\theta_z\sin(\gamma_s-\gamma_a)}{\sin\theta_z\cos(\gamma_s-\gamma_a)\sin\beta_a + \cos\theta_z\cos\beta_a}`,
    vars: [
      { sym: "R", meaning: "Rotation angle", unit: "°" },
      { sym: String.raw`\beta_a`, meaning: "Axis tilt from horizontal", unit: "°" },
      { sym: String.raw`\gamma_a`, meaning: "Axis azimuth", unit: "°" },
    ],
    explanation: md`NREL/TP-6A20-58891 (2013). Reduces to the horizontal form for $\beta_a = 0$. Used for sloped sites and tilted single-axis designs.`,
    lesson: "mz05-l01",
  },
  {
    id: "mz05-tracker-aoi",
    name: "Residual incidence angle under true tracking (horizontal axis)",
    tex: String.raw`\cos\theta = \sqrt{1 - \left(\sin\theta_z\cos(\gamma_s-\gamma_a)\right)^2}`,
    vars: [
      { sym: String.raw`\theta`, meaning: "Angle of incidence on the module", unit: "°" },
      { sym: String.raw`\theta_z`, meaning: "Solar zenith angle", unit: "°" },
    ],
    explanation: md`The axial sun component $s_N$ cannot be tracked out. Small on summer mornings at 29°N (about 13° at 07:00 on 21 June), large in winter (about 35° at 08:00 on 21 December).`,
    lesson: "mz05-l01",
  },
  {
    id: "mz05-backtrack-condition",
    name: "Backtracking condition",
    tex: String.raw`\cos R_\text{true} < \text{GCR} = \dfrac{L}{p}`,
    vars: [
      { sym: String.raw`R_\text{true}`, meaning: "True-tracking angle", unit: "°" },
      { sym: "L", meaning: "Row chord (module width across the axis)", unit: "m" },
      { sym: "p", meaning: "Row pitch", unit: "m" },
    ],
    explanation: md`From shadow width $L$ against ray spacing $p\cos R$. Threshold $\arccos(\text{GCR})$: 69.5° at GCR 0.35, 63.3° at GCR 0.45.`,
    lesson: "mz05-l01",
  },
  {
    id: "mz05-backtrack-angle",
    name: "Backtracked rotation angle",
    tex: String.raw`R_b = \operatorname{sign}(R_\text{true})\left(|R_\text{true}| - \arccos\dfrac{\cos R_\text{true}}{\text{GCR}}\right)`,
    vars: [
      { sym: String.raw`R_b`, meaning: "Backtracked angle", unit: "°" },
      { sym: String.raw`R_\text{true}`, meaning: "True-tracking angle", unit: "°" },
      { sym: String.raw`\text{GCR}`, meaning: "Ground coverage ratio", unit: "-" },
    ],
    explanation: md`From $L\cos(R_\text{true} - R_b) = p\cos R_\text{true}$. Beam on the plane falls by the cosine of the correction. Flat at sunrise.`,
    lesson: "mz05-l01",
  },
  {
    id: "mz05-poa-isotropic-tracker",
    name: "Plane-of-array irradiance, isotropic sky, tracker at angle R",
    tex: String.raw`G_\text{POA} = \text{DNI}\cos\theta + \text{DHI}\,\dfrac{1+\cos R}{2} + \rho\,\text{GHI}\,\dfrac{1-\cos R}{2}`,
    vars: [
      { sym: String.raw`\text{DNI},\ \text{DHI},\ \text{GHI}`, meaning: "Direct normal, diffuse horizontal, global horizontal irradiance", unit: "W/m²" },
      { sym: String.raw`\theta`, meaning: "Incidence angle", unit: "°" },
      { sym: String.raw`\rho`, meaning: "Ground albedo", unit: "-" },
    ],
    explanation: md`Pointing maximises the beam term, flat maximises the sky term. Under heavy dust the two positions come within a few percent; forward scattering in dust means the crossover should be measured.`,
    lesson: "mz05-l01",
  },
  // l02
  {
    id: "mz05-dynamic-pressure",
    name: "Dynamic pressure",
    tex: String.raw`q = \tfrac{1}{2}\rho V^2`,
    vars: [
      { sym: "q", meaning: "Dynamic pressure", unit: "Pa" },
      { sym: String.raw`\rho`, meaning: "Air density", unit: "kg/m³" },
      { sym: "V", meaning: "Wind speed", unit: "m/s" },
    ],
    explanation: md`Load scales with speed squared: 18 to 22 m/s is 49% more load. 20 m/s at 45 °C gives 222 Pa.`,
    lesson: "mz05-l02",
  },
  {
    id: "mz05-air-density",
    name: "Air density (ideal gas)",
    tex: String.raw`\rho = \dfrac{p}{R_d T}`,
    vars: [
      { sym: "p", meaning: "Air pressure (101,325 Pa at sea level)", unit: "Pa" },
      { sym: String.raw`R_d`, meaning: "Specific gas constant of dry air, 287.05", unit: "J/(kg·K)" },
      { sym: "T", meaning: "Absolute temperature", unit: "K" },
    ],
    explanation: md`1.225 kg/m³ at 15 °C, 1.109 kg/m³ at 45 °C (9% lower). Margin, not a reason to raise thresholds.`,
    lesson: "mz05-l02",
  },
  {
    id: "mz05-wind-force-moment",
    name: "Wind force and torsional moment per metre of row",
    tex: String.raw`F' = q\,C_F\,c \qquad M' = q\,C_M\,c^2`,
    vars: [
      { sym: "F'", meaning: "Force per metre of row", unit: "N/m" },
      { sym: "M'", meaning: "Torsional moment per metre of row", unit: "N·m/m" },
      { sym: String.raw`C_F,\ C_M`, meaning: "Force and moment coefficients (wind tunnel; depend on tilt and row zone)", unit: "-" },
      { sym: "c", meaning: "Chord (about 2.3 m 1P, 4.6 m 2P)", unit: "m" },
    ],
    explanation: md`Torque scales with chord squared: 2P carries four times the torque of 1P at the same wind. Dynamic effects add an amplification on top of the static value.`,
    lesson: "mz05-l02",
  },
  {
    id: "mz05-reduced-velocity",
    name: "Reduced velocity (torsional galloping)",
    tex: String.raw`V_r = \dfrac{V}{f_t\,c}`,
    vars: [
      { sym: String.raw`V_r`, meaning: "Reduced velocity", unit: "-" },
      { sym: String.raw`f_t`, meaning: "Torsional natural frequency of the row", unit: "Hz" },
      { sym: "c", meaning: "Chord", unit: "m" },
    ],
    explanation: md`Instability begins above a critical $V_r$ that depends on section and tilt, measured in the wind tunnel. Low stiffness (low $f_t$) lowers the critical wind speed.`,
    lesson: "mz05-l02",
  },
  {
    id: "mz05-wind-profile",
    name: "Power-law wind profile",
    tex: String.raw`V(z) = V_\text{ref}\left(\dfrac{z}{z_\text{ref}}\right)^{\alpha}`,
    vars: [
      { sym: "z", meaning: "Height", unit: "m" },
      { sym: String.raw`z_\text{ref}`, meaning: "Reference height (usually 10 m)", unit: "m" },
      { sym: String.raw`\alpha`, meaning: "Shear exponent (about 0.14 over open flat terrain)", unit: "-" },
    ],
    explanation: md`Converts a threshold between heights: 18 m/s at 10 m is about 15.2 m/s at 3 m. Use site data for contractual values.`,
    lesson: "mz05-l02",
  },
  {
    id: "mz05-gust-factor",
    name: "Gust factor",
    tex: String.raw`G = \dfrac{V_\text{3 s}}{\bar V_\text{10 min}}`,
    vars: [
      { sym: String.raw`V_\text{3 s}`, meaning: "Peak 3-second gust", unit: "m/s" },
      { sym: String.raw`\bar V_\text{10 min}`, meaning: "10-minute mean wind", unit: "m/s" },
    ],
    explanation: md`About 1.4 to 1.5 at 10 m over open terrain; higher near the ground. Converts mean-wind forecasts into expected gusts.`,
    lesson: "mz05-l02",
  },
  {
    id: "mz05-stow-lead-time",
    name: "Stow lead-time requirement",
    tex: String.raw`t_\text{trigger} \ge t_\text{detect} + t_\text{comm} + \dfrac{\Delta\theta}{\omega} + t_\text{margin}`,
    vars: [
      { sym: String.raw`t_\text{trigger}`, meaning: "Time between trigger and the gust arriving", unit: "s" },
      { sym: String.raw`\Delta\theta`, meaning: "Rotation to the stow angle", unit: "°" },
      { sym: String.raw`\omega`, meaning: "Rotation rate", unit: "°/s" },
    ],
    explanation: md`Rotation takes minutes, so stow must be triggered by trends or forecasts, not the gust itself.`,
    lesson: "mz05-l02",
  },
  // l03
  {
    id: "mz05-sky-view-factor",
    name: "Sky view factor of a tilted surface",
    tex: String.raw`F_\text{sky} = \dfrac{1+\cos\beta}{2}`,
    vars: [{ sym: String.raw`\beta`, meaning: "Tilt from horizontal", unit: "°" }],
    explanation: md`1 flat, 0.75 at 60°, 0.5 vertical. Less sky view means less night radiative cooling and less dew, one mechanism behind steep night stow.`,
    lesson: "mz05-l03",
  },
  {
    id: "mz05-stow-net-benefit",
    name: "Net benefit of a discretionary stow",
    tex: String.raw`\Delta C = p_\text{dmg}\,D + S - L`,
    vars: [
      { sym: String.raw`p_\text{dmg}`, meaning: "Probability of damage if not stowed", unit: "-" },
      { sym: "D", meaning: "Damage cost", unit: "USD" },
      { sym: "S", meaning: "Value of soiling avoided", unit: "USD" },
      { sym: "L", meaning: "Value of energy lost while stowed", unit: "USD" },
    ],
    explanation: md`Stow if wind is at or above the vendor threshold; otherwise stow if $\Delta C > 0$. At night and in dust, $L$ is small.`,
    lesson: "mz05-l03",
  },
  {
    id: "mz05-stow-energy-lost",
    name: "Energy lost while stowed",
    tex: String.raw`L = P_\text{ac}\,h\,f_\text{out}\,f_\text{loss}\,v`,
    vars: [
      { sym: String.raw`P_\text{ac}`, meaning: "Block AC capacity", unit: "MW" },
      { sym: "h", meaning: "Stow duration", unit: "h" },
      { sym: String.raw`f_\text{out}`, meaning: "Output while tracking, fraction of capacity", unit: "-" },
      { sym: String.raw`f_\text{loss}`, meaning: "Fraction of that output lost at stow", unit: "-" },
      { sym: "v", meaning: "Energy value", unit: "USD/MWh" },
    ],
    explanation: md`100 MWac, 3 h, 0.6, 0.35, USD 15/MWh gives 63 MWh and USD 945.`,
    lesson: "mz05-l03",
  },
  {
    id: "mz05-soiling-avoided-value",
    name: "Value of soiling avoided",
    tex: String.raw`S = \Delta s\,E_d\,N\,v`,
    vars: [
      { sym: String.raw`\Delta s`, meaning: "Soiling loss avoided (fraction of yield)", unit: "-" },
      { sym: String.raw`E_d`, meaning: "Daily yield", unit: "MWh/day" },
      { sym: "N", meaning: "Days until the next cleaning", unit: "day" },
      { sym: "v", meaning: "Energy value", unit: "USD/MWh" },
    ],
    explanation: md`The avoided loss persists until the next clean. $\Delta s$ is the unmeasured quantity a pilot must establish.`,
    lesson: "mz05-l03",
  },
  {
    id: "mz05-average-soiling-loss",
    name: "Average loss of a linear soiling sawtooth",
    tex: String.raw`\bar s = \dfrac{r\,T}{2}`,
    vars: [
      { sym: "r", meaning: "Soiling rate", unit: "%/day" },
      { sym: "T", meaning: "Cleaning interval", unit: "day" },
    ],
    explanation: md`0.4%/day and 30 days gives 6%. A 30% rate reduction gives 4.2%.`,
    lesson: "mz05-l03",
  },
  {
    id: "mz05-thermal-expansion",
    name: "Linear thermal expansion",
    tex: String.raw`\Delta L = \alpha\,L\,\Delta T`,
    vars: [
      { sym: String.raw`\alpha`, meaning: "Expansion coefficient (steel about 12e-6)", unit: "1/K" },
      { sym: "L", meaning: "Length", unit: "m" },
      { sym: String.raw`\Delta T`, meaning: "Temperature change", unit: "K" },
    ],
    explanation: md`100 m of torque tube and 60 K gives 72 mm, which bearings and joints must accommodate.`,
    lesson: "mz05-l03",
  },
  // l04
  {
    id: "mz05-latency-budget",
    name: "Stow latency budget",
    tex: String.raw`t_\text{confirm} + t_\text{decide} + t_\text{comm} + \dfrac{\Delta\theta}{\omega} + t_\text{verify} < t_\text{event} = \dfrac{d}{u}`,
    vars: [
      { sym: String.raw`t_\text{event}`, meaning: "Time for the event to reach the plant", unit: "s" },
      { sym: "d", meaning: "Detection distance upwind", unit: "m" },
      { sym: "u", meaning: "Speed of the front", unit: "m/s" },
    ],
    explanation: md`15 km at 12 m/s gives 20.8 min against an 8.5-minute budget. Edge sensors on a 3 km-deep plant give 4.2 min and lose.`,
    lesson: "mz05-l04",
  },
  // l05
  {
    id: "mz05-paired-sample-size",
    name: "Sample size for a paired difference",
    tex: String.raw`n = \left(\dfrac{(z_{\alpha/2} + z_{\beta})\,\sigma_d}{\delta}\right)^2`,
    vars: [
      { sym: "n", meaning: "Independent pair-periods (for soiling, pair-cleaning-cycles)", unit: "-" },
      { sym: String.raw`\sigma_d`, meaning: "Standard deviation of the paired difference", unit: "percentage points" },
      { sym: String.raw`\delta`, meaning: "Effect to detect", unit: "percentage points" },
      { sym: String.raw`z_{\alpha/2} + z_\beta`, meaning: "2.80 for 5% two-sided and 80% power", unit: "-" },
    ],
    explanation: md`$\sigma_d = 1.5$, $\delta = 1.2$ gives 13 pair-cycles. Count only independent observations.`,
    lesson: "mz05-l05",
  },
];

export default formulas;
