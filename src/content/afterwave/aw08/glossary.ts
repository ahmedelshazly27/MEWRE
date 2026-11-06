import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw08-aliasing", en: "Aliasing", ar: "التشويه الترددي (التعرّج)", definition: md`Folding of content above the Nyquist frequency onto false lower frequencies when a signal is sampled without adequate anti-alias filtering.`, lesson: "aw08-l01", category: "technical" },
  { id: "aw08-nyquist-frequency", en: "Nyquist frequency", ar: "تردد نايكويست", definition: md`Half the sampling rate, $f_s/2$: the highest frequency a sampled record can represent.`, lesson: "aw08-l01", category: "technical" },
  { id: "aw08-decimation", en: "Decimation", ar: "تخفيض معدل أخذ العينات", definition: md`Reducing a channel's sampling rate by low-pass filtering below the new Nyquist frequency and then keeping every M-th sample.`, lesson: "aw08-l01", category: "technical" },
  { id: "aw08-fft", en: "Fast Fourier transform (FFT)", ar: "تحويل فورييه السريع", definition: md`An $O(N\log N)$ algorithm for computing the discrete Fourier transform, which expresses a record as sinusoids at bins spaced $f_s/N$ apart.`, lesson: "aw08-l01", category: "technical" },
  { id: "aw08-spectral-leakage", en: "Spectral leakage", ar: "التسرب الطيفي", definition: md`Spreading of a tone's energy into neighbouring FFT bins when it does not complete a whole number of cycles in the record; reduced with window functions.`, lesson: "aw08-l01", category: "technical" },
  { id: "aw08-window-function", en: "Window function (Hann, flat-top)", ar: "دالة النافذة", definition: md`A taper applied to a record before the FFT to reduce leakage; Hann for general spectra, flat-top for accurate tone amplitudes.`, lesson: "aw08-l01", category: "technical" },
  { id: "aw08-crest-factor", en: "Crest factor", ar: "معامل الذروة", definition: md`Peak divided by RMS of a window; 1.41 for a sine, rising with impulsive faults.`, lesson: "aw08-l01", category: "technical" },
  { id: "aw08-kurtosis", en: "Kurtosis", ar: "التفرطح", definition: md`Fourth standardised moment of a window; 3 for Gaussian noise, well above 3 for impulsive signals.`, lesson: "aw08-l01", category: "technical" },
  { id: "aw08-order-analysis", en: "Order analysis", ar: "تحليل الرتب الدورانية", definition: md`Expressing rotating-machine frequencies as multiples of shaft speed, often with resampling at constant shaft angle (order tracking).`, lesson: "aw08-l01", category: "technical" },
  // l02
  { id: "aw08-robust-z", en: "Robust (modified) z-score", ar: "الدرجة المعيارية المتينة", definition: md`$0.6745(x - \text{median})/\text{MAD}$; resists masking by outliers in the baseline.`, lesson: "aw08-l02", category: "technical" },
  { id: "aw08-isolation-forest", en: "Isolation forest", ar: "غابة العزل", definition: md`Unsupervised anomaly detector that isolates points with random splits; anomalies need fewer splits and score near 1.`, lesson: "aw08-l02", category: "technical" },
  { id: "aw08-autoencoder", en: "Autoencoder", ar: "المشفّر التلقائي", definition: md`Neural network trained to reconstruct healthy inputs through a compressed representation; high reconstruction error flags anomalies.`, lesson: "aw08-l02", category: "technical" },
  { id: "aw08-precision", en: "Precision", ar: "الدقة (نسبة الإنذارات الصحيحة)", definition: md`Share of alarms that are real anomalies, $TP/(TP+FP)$; falls sharply when anomalies are rare.`, lesson: "aw08-l02", category: "technical" },
  { id: "aw08-recall", en: "Recall", ar: "الاستدعاء (معدل الكشف)", definition: md`Share of real anomalies the detector catches, $TP/(TP+FN)$.`, lesson: "aw08-l02", category: "technical" },
  { id: "aw08-alarm-budget", en: "Alarm budget", ar: "ميزانية الإنذارات", definition: md`Number of alarms per day a team agrees it will triage; a constraint for setting thresholds.`, lesson: "aw08-l02", category: "pm" },
  // l03
  { id: "aw08-data-leakage", en: "Data leakage (train/test)", ar: "تسرّب البيانات بين التدريب والاختبار", definition: md`Information from the test set reaching training, for example windows of the same unit on both sides of a random split; inflates reported performance.`, lesson: "aw08-l03", category: "technical" },
  { id: "aw08-group-k-fold", en: "Group k-fold cross-validation", ar: "التحقق المتقاطع حسب المجموعات", definition: md`Cross-validation in which whole groups (unit serials, campaigns) are kept together in one fold.`, lesson: "aw08-l03", category: "technical" },
  { id: "aw08-active-learning", en: "Active learning", ar: "التعلم النشط", definition: md`Asking experts to label the examples a model is least certain about, to get the most value per label.`, lesson: "aw08-l03", category: "technical" },
  { id: "aw08-lora", en: "LoRA (low-rank adaptation)", ar: "التكييف منخفض الرتبة", definition: md`Fine-tuning method that trains small low-rank matrices added to a frozen model; cuts memory, less so compute.`, lesson: "aw08-l03", category: "technical" },
  { id: "aw08-model-card", en: "Model card", ar: "بطاقة النموذج", definition: md`Document stating a model's training data, split, baseline, metrics with intervals, blind spots, retraining trigger and owner.`, lesson: "aw08-l03", category: "pm" },
  // l04
  { id: "aw08-approval-gate", en: "Approval gate", ar: "بوابة الموافقة البشرية", definition: md`Point where a human must approve an agent's plan or action before rig time or hardware is committed.`, lesson: "aw08-l04", category: "pm" },
  { id: "aw08-replay-suite", en: "Replay evaluation suite", ar: "مجموعة تقييم بإعادة التشغيل", definition: md`Historical changes with known correct retests and outcomes, used to evaluate an agent offline and rerun on every model or prompt change.`, lesson: "aw08-l04", category: "technical" },
  { id: "aw08-pass-k", en: "pass^k", ar: "مقياس الاتساق عبر k محاولات", definition: md`Probability that all $k$ independent attempts at a task succeed; measures agent consistency.`, lesson: "aw08-l04", category: "technical" },
  // l05
  { id: "aw08-air-gapped", en: "Air-gapped deployment", ar: "النشر المعزول عن الشبكة", definition: md`Installation on systems with no network route to the internet; updates arrive as signed offline bundles.`, lesson: "aw08-l05", category: "technical" },
  { id: "aw08-isolated-tenant", en: "Isolated (single) tenant", ar: "بيئة مستأجر معزولة", definition: md`Vendor-operated deployment with dedicated compute, storage, network and keys for one customer.`, lesson: "aw08-l05", category: "technical" },
  { id: "aw08-tee", en: "Trusted execution environment (TEE)", ar: "بيئة التنفيذ الموثوقة", definition: md`Hardware-isolated, memory-encrypted execution context (for example AMD SEV-SNP, Intel TDX) that the host cannot read.`, lesson: "aw08-l05", category: "technical" },
  { id: "aw08-remote-attestation", en: "Remote attestation", ar: "الإثبات عن بُعد", definition: md`Hardware-signed proof of exactly what software runs in a TEE, checked before keys are released.`, lesson: "aw08-l05", category: "technical" },
  { id: "aw08-trade-secret", en: "Trade secret", ar: "السر التجاري", definition: md`Information that is secret, valuable because secret, and subject to reasonable steps to keep it secret (EU Directive 2016/943).`, lesson: "aw08-l05", category: "contractual" },
  // l06
  { id: "aw08-data-flywheel", en: "Data flywheel", ar: "دولاب البيانات (الحلقة المعززة)", definition: md`Loop where usage generates data that improves the product and drives more usage; compounds only with material gains, lasting relevance and usage rights.`, lesson: "aw08-l06", category: "financial" },
  { id: "aw08-switching-cost", en: "Switching cost", ar: "تكلفة التحول", definition: md`What a customer loses or must spend to replace a vendor: history, trained models, integrations, retraining people, revalidation.`, lesson: "aw08-l06", category: "financial" },
];

export default glossary;
