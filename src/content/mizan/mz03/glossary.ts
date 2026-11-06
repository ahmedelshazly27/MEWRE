import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "mz03-soiling-ratio", en: "Soiling ratio (SR)", ar: "نسبة الاتساخ", definition: md`Power of the array as it is divided by the power of the same array clean under the same conditions; 1 means clean.`, lesson: "mz03-l01", category: "technical" },
  { id: "mz03-performance-index", en: "Performance index (normalised energy)", ar: "مؤشر الأداء (الطاقة المعيارية)", definition: md`Measured energy divided by modelled expected energy of a clean plant; the series soiling methods work on.`, lesson: "mz03-l01", category: "technical" },
  { id: "mz03-expected-energy", en: "Expected energy", ar: "الطاقة المتوقعة", definition: md`Energy a clean, undegraded plant should produce under the measured weather, from a physical model.`, lesson: "mz03-l01", category: "technical" },
  { id: "mz03-clipping", en: "Inverter clipping", ar: "قص قدرة العاكس", definition: md`Flat AC output at the inverter limit when available DC power exceeds it; hides soiling in those intervals.`, lesson: "mz03-l01", category: "technical" },
  { id: "mz03-curtailment", en: "Curtailment", ar: "تقييد الإنتاج", definition: md`Export limited by the power plant controller on grid instruction; a flat top below the inverter rating.`, lesson: "mz03-l01", category: "technical" },
  { id: "mz03-sensor-drift", en: "Irradiance sensor drift and soiling", ar: "انحراف واتساخ حساس الإشعاع", definition: md`A pyranometer or reference cell reading low from dirt or calibration drift, which lowers expected energy and hides plant soiling.`, lesson: "mz03-l01", category: "technical" },
  { id: "mz03-weather-corrected-pr", en: "Weather-corrected performance ratio", ar: "نسبة الأداء المصححة للطقس", definition: md`PR with expected energy corrected to the annual average cell temperature (NREL method), removing the seasonal temperature swing.`, lesson: "mz03-l01", category: "technical" },
  // l02
  { id: "mz03-srr", en: "Stochastic rate and recovery (SRR) method", ar: "طريقة المعدل والاستعادة العشوائية", definition: md`Soiling extraction from plant data: cleaning detection, Theil-Sen slopes per interval and Monte Carlo over rates and recoveries (Deceglie, Micheli, Muller 2018).`, lesson: "mz03-l02", category: "technical" },
  { id: "mz03-soiling-interval", en: "Soiling interval", ar: "فترة الاتساخ", definition: md`Stretch of days between two cleaning events over which a soiling rate is fitted.`, lesson: "mz03-l02", category: "technical" },
  { id: "mz03-cleaning-event", en: "Cleaning event detection", ar: "رصد أحداث التنظيف", definition: md`Identifying cleanings as positive shifts in the smoothed performance index, from rain, or from logs.`, lesson: "mz03-l02", category: "technical" },
  { id: "mz03-theil-sen", en: "Theil-Sen estimator", ar: "مقدّر ثايل-سين", definition: md`Robust slope: the median of all pairwise slopes.`, lesson: "mz03-l02", category: "technical" },
  { id: "mz03-change-point", en: "Change point", ar: "نقطة التغيّر", definition: md`A time inside a soiling interval where the rate changes or a negative step (dust storm) occurs.`, lesson: "mz03-l02", category: "technical" },
  { id: "mz03-monte-carlo", en: "Monte Carlo simulation", ar: "محاكاة مونت كارلو", definition: md`Repeating a calculation many times with uncertain inputs drawn at random to obtain a distribution of results.`, lesson: "mz03-l02", category: "technical" },
  // l03
  { id: "mz03-transposition", en: "Irradiance transposition", ar: "تحويل الإشعاع إلى مستوى الألواح", definition: md`Converting GHI, DNI and DHI to plane-of-array irradiance with a sky diffuse model and ground reflection.`, lesson: "mz03-l03", category: "technical" },
  { id: "mz03-cell-temperature", en: "Cell temperature model", ar: "نموذج درجة حرارة الخلية", definition: md`Empirical model (SAPM, Faiman, PVsyst) giving cell temperature from irradiance, ambient temperature and wind.`, lesson: "mz03-l03", category: "technical" },
  { id: "mz03-residual", en: "Model residual", ar: "البواقي (الفرق بين القياس والنموذج)", definition: md`Log ratio of measured to modelled power; structure in it against a driver signals model error.`, lesson: "mz03-l03", category: "technical" },
  { id: "mz03-pvlib", en: "pvlib python", ar: "مكتبة pvlib البرمجية", definition: md`Open-source Python library for modelling PV systems: solar position, irradiance, temperature, DC and AC models, soiling.`, lesson: "mz03-l03", category: "technical" },
  // l04
  { id: "mz03-aod", en: "Aerosol optical depth (AOD)", ar: "العمق البصري للهباء الجوي", definition: md`Column-integrated measure of how much aerosol attenuates sunlight at a given wavelength.`, lesson: "mz03-l04", category: "technical" },
  { id: "mz03-reanalysis", en: "Atmospheric reanalysis", ar: "إعادة التحليل الجوي", definition: md`A model run over past decades assimilating observations to give consistent gridded fields (CAMS EAC4, MERRA-2).`, lesson: "mz03-l04", category: "technical" },
  { id: "mz03-particulate-matter", en: "Particulate matter (PM2.5, PM10)", ar: "الجسيمات العالقة", definition: md`Mass concentration of airborne particles below 2.5 and 10 micrometres; the input to deposition models.`, lesson: "mz03-l04", category: "technical" },
  { id: "mz03-deposition-velocity", en: "Deposition velocity", ar: "سرعة الترسّب", definition: md`Ratio of deposition flux to concentration for a particle size; the most uncertain input of mass-based soiling models.`, lesson: "mz03-l04", category: "technical" },
  // l05
  { id: "mz03-ground-truth", en: "Ground truth", ar: "الحقيقة الميدانية (القياس المرجعي)", definition: md`Independent measurement (soiling station, cleaning test, control rows) used to validate an inferred estimate.`, lesson: "mz03-l05", category: "technical" },
  { id: "mz03-natural-experiment", en: "Natural experiment", ar: "تجربة طبيعية", definition: md`An unplanned event that changes the treatment for some units or periods, analysed with designs that control for confounders.`, lesson: "mz03-l05", category: "technical" },
  { id: "mz03-did", en: "Difference-in-differences", ar: "طريقة الفرق في الفروق", definition: md`Effect estimate from the change in an affected group minus the change in a comparison group, under parallel trends.`, lesson: "mz03-l05", category: "technical" },
  { id: "mz03-pre-registration", en: "Pre-registration", ar: "التسجيل المسبق لخطة التحليل", definition: md`Fixing hypotheses, method and metrics before seeing outcome data, so the analysis cannot be tuned to the result.`, lesson: "mz03-l05", category: "pm" },
  // l06
  { id: "mz03-optimal-interval", en: "Optimal cleaning interval", ar: "فترة التنظيف المثلى", definition: md`Interval minimising cleaning plus soiling cost per day; $\sqrt{2C/(Vr)}$ for linear soiling.`, lesson: "mz03-l06", category: "financial" },
  { id: "mz03-mde", en: "Minimum detectable change", ar: "أصغر تغيّر قابل للرصد", definition: md`Smallest shift in mean performance index a monitoring window can detect at chosen false-alarm and detection rates.`, lesson: "mz03-l06", category: "technical" },
  { id: "mz03-cleaning-verification", en: "Cleaning verification", ar: "التحقق من فعالية التنظيف", definition: md`Comparing the recovery achieved by a logged cleaning with the recovery expected from the soiling estimate.`, lesson: "mz03-l06", category: "technical" },
];

export default glossary;
