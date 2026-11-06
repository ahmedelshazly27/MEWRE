import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "mz01-shamal", en: "Shamal", ar: "رياح الشمال (الشمال)", definition: md`Northwesterly wind over Kuwait and the Gulf; persistent in early summer, episodic behind winter cold fronts; the main carrier of regional dust.`, lesson: "mz01-l01", category: "technical" },
  { id: "mz01-dust-storm", en: "Dust storm", ar: "عاصفة غبارية", definition: md`Dust event with visibility below 1 km (severe below about 200 m), as distinct from blowing dust and suspended dust (haze).`, lesson: "mz01-l01", category: "technical" },
  { id: "mz01-saltation", en: "Saltation", ar: "القفز الرملي (التقافز)", definition: md`Hopping motion of sand grains (about 60 to 2,000 µm) near the ground once wind exceeds a threshold; their impacts sandblast fine dust into the air.`, lesson: "mz01-l01", category: "technical" },
  { id: "mz01-pm10-pm25", en: "PM10 and PM2.5", ar: "الجسيمات العالقة PM10 وPM2.5", definition: md`Mass concentration of particles below 10 µm and 2.5 µm aerodynamic diameter; health metrics that miss the giant particles dominating deposition on modules.`, lesson: "mz01-l01", category: "technical" },
  { id: "mz01-aod", en: "Aerosol optical depth (AOD)", ar: "العمق البصري للهباء الجوي", definition: md`Column-integrated aerosol extinction at a wavelength; beam transmittance is $e^{-m\tau_a}$.`, lesson: "mz01-l01", category: "technical" },
  { id: "mz01-angstrom-exponent", en: "Ångström exponent", ar: "أُس أنغستروم", definition: md`Spectral slope of AOD; below about 0.5 indicates coarse dust, above about 1.5 fine-mode aerosol.`, lesson: "mz01-l01", category: "technical" },
  { id: "mz01-aeronet", en: "AERONET", ar: "شبكة أيرونت لرصد الهباء الجوي", definition: md`NASA's global network of sun photometers; the Kuwait University site has operated since 2008.`, lesson: "mz01-l01", category: "institutional" },
  { id: "mz01-mineralogy", en: "Dust mineralogy", ar: "التركيب المعدني للغبار", definition: md`Mineral make-up of dust (quartz, carbonates, clays, salts, iron oxides), which sets abrasion, cementation and optical absorption.`, lesson: "mz01-l01", category: "technical" },
  // l02
  { id: "mz01-settling-velocity", en: "Settling velocity (Stokes)", ar: "سرعة الترسيب (قانون ستوكس)", definition: md`Terminal fall speed of a particle, $v_s = \rho_p g d^2 C_c/(18\mu)$; scales with diameter squared.`, lesson: "mz01-l02", category: "technical" },
  { id: "mz01-impaction", en: "Inertial impaction", ar: "الاصطدام بالقصور الذاتي", definition: md`Deposition of particles too heavy to follow streamlines around an obstacle; governed by the Stokes number.`, lesson: "mz01-l02", category: "technical" },
  { id: "mz01-stokes-number", en: "Stokes number", ar: "عدد ستوكس", definition: md`$Stk = \tau_p U/L$: particle relaxation time relative to the flow time around an obstacle.`, lesson: "mz01-l02", category: "technical" },
  { id: "mz01-deposition-velocity", en: "Deposition velocity", ar: "سرعة الترسب", definition: md`Flux divided by concentration, $v_d = F/C$, lumping settling, impaction and diffusion for a size bin.`, lesson: "mz01-l02", category: "technical" },
  { id: "mz01-resuspension", en: "Resuspension", ar: "إعادة التعليق (رفع الغبار المترسب)", definition: md`Removal of deposited particles by wind when aerodynamic moments exceed adhesion; affects large particles first.`, lesson: "mz01-l02", category: "technical" },
  // l03
  { id: "mz01-van-der-waals", en: "Van der Waals adhesion", ar: "قوى فان دير فالس للالتصاق", definition: md`Short-range attraction between particle and glass, $F = A d/(12 z_0^2)$ for a sphere on a plate.`, lesson: "mz01-l03", category: "technical" },
  { id: "mz01-capillary-force", en: "Capillary force", ar: "القوة الشعرية", definition: md`Force of a water meniscus at a particle contact, about $2\pi\gamma d\cos\theta$; usually the strongest adhesion force when water is present.`, lesson: "mz01-l03", category: "technical" },
  { id: "mz01-dew-point", en: "Dew point", ar: "نقطة الندى", definition: md`Temperature at which air becomes saturated; dew forms on glass colder than it.`, lesson: "mz01-l03", category: "technical" },
  { id: "mz01-radiative-cooling", en: "Radiative cooling", ar: "التبريد الإشعاعي", definition: md`Night-time loss of heat from the glass to the cold clear sky, cooling it below air temperature.`, lesson: "mz01-l03", category: "technical" },
  { id: "mz01-cementation", en: "Cementation", ar: "التكلس (تصلّب الغبار والتصاقه)", definition: md`Dissolution and reprecipitation of salts, carbonates and clays by dew cycles, binding dust to glass as a crust.`, lesson: "mz01-l03", category: "technical" },
  // l04
  { id: "mz01-soiling-ratio", en: "Soiling ratio (SR)", ar: "نسبة الاتساخ", definition: md`Output of a naturally soiled reference divided by a clean one (IEC 61724-1); soiling loss is $1 - SR$.`, lesson: "mz01-l04", category: "technical" },
  { id: "mz01-mass-density", en: "Deposited mass density", ar: "الكثافة السطحية للغبار المترسب", definition: md`Mass of dust per unit glass area (g/m²); related to transmittance loss only through site-specific empirical relations.`, lesson: "mz01-l04", category: "technical" },
  { id: "mz01-nonuniform-soiling", en: "Non-uniform soiling", ar: "الاتساخ غير المنتظم", definition: md`Uneven dust, typically bands at the lower edge, that limits series cell current and can exceed the area-average loss.`, lesson: "mz01-l04", category: "technical" },
  { id: "mz01-bypass-diode", en: "Bypass diode", ar: "صمام التجاوز (الثنائي الجانبي)", definition: md`Diode across a substring of cells that conducts when the substring is shaded or soiled, capping its loss at one substring.`, lesson: "mz01-l04", category: "technical" },
  { id: "mz01-bifaciality", en: "Bifaciality factor", ar: "معامل ثنائية الوجه", definition: md`Rear-side efficiency relative to front-side efficiency of a bifacial module, typically about 0.65 to 0.9.`, lesson: "mz01-l04", category: "technical" },
  // l05
  { id: "mz01-anti-soiling-coating", en: "Anti-soiling coating", ar: "طلاء مقاوم للاتساخ", definition: md`Hydrophobic, hydrophilic or antistatic surface layer intended to reduce dust adhesion or ease removal.`, lesson: "mz01-l05", category: "technical" },
  { id: "mz01-contact-angle", en: "Contact angle", ar: "زاوية التلامس", definition: md`Angle a water droplet makes with a surface; above 90° hydrophobic, above about 150° superhydrophobic.`, lesson: "mz01-l05", category: "technical" },
  { id: "mz01-night-stow", en: "Night-time soiling stow", ar: "وضعية التخزين الليلي لتقليل الاتساخ", definition: md`Holding trackers at a steep or vertical angle at night to reduce settling, dew and retention.`, lesson: "mz01-l05", category: "technical" },
  { id: "mz01-sky-view-factor", en: "Sky view factor", ar: "معامل رؤية السماء", definition: md`Fraction of a surface's view occupied by sky, $(1+\cos\beta)/2$ for a tilted plate; drives night radiative cooling.`, lesson: "mz01-l05", category: "technical" },
];

export default glossary;
