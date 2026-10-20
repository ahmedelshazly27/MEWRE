/**
 * Interface language. Content is translated per module (src/content/ar); this file holds the UI chrome.
 * Arabic pages live under the /ar prefix, so the language is always derivable from the URL
 * (works for static export, offline caching and server components alike).
 */
import { AR_PAGES } from "./i18n-pages";

export type Lang = "en" | "ar";
export const LANGS: Lang[] = ["en", "ar"];

export function langFromPath(pathname: string | null | undefined): Lang {
  return pathname === "/ar" || pathname?.startsWith("/ar/") ? "ar" : "en";
}

/** Prefix an app path for a language: lp("ar", "/learn") → "/ar/learn". */
export function lp(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

/** The same page in the other language. */
export function switchPath(pathname: string, to: Lang): string {
  const bare = langFromPath(pathname) === "ar" ? pathname.slice(3) || "/" : pathname;
  return lp(to, bare);
}

export const dirOf = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");

/**
 * Arabic UI strings keyed by their English text. Placeholders use {name}.
 * Missing keys fall back to English, so partial coverage never breaks a page.
 */
const AR: Record<string, string> = {
  // navigation
  Study: "الدراسة",
  Apply: "التطبيق",
  Reference: "المراجع",
  Dashboard: "لوحة المتابعة",
  Curriculum: "المنهج",
  "Daily review": "المراجعة اليومية",
  "Practice & exams": "التدريب والاختبارات",
  "Error log": "سجل الأخطاء",
  Diagnostic: "الاختبار التشخيصي",
  "Day in the life": "يوم في حياة مدير المشروع",
  Capstone: "المحاكاة الختامية",
  "AI tutor": "المعلم الذكي",
  "Glossary EN/AR": "المسرد إنجليزي/عربي",
  "Formula sheet": "ورقة المعادلات",
  "Concept map": "خريطة المفاهيم",
  Library: "المكتبة",
  "My notes": "ملاحظاتي",
  Settings: "الإعدادات",
  Home: "الرئيسية",
  Learn: "تعلّم",
  Review: "مراجعة",
  Practice: "تدريب",
  Menu: "القائمة",
  "Toggle dark mode": "تبديل الوضع الداكن",
  "Renewables · Kuwait": "الطاقة المتجددة · الكويت",
  Language: "اللغة",
  "Arabic content falls back to English where a module is not translated yet.": "يُعرض المحتوى بالإنجليزية في أي وحدة لم تُترجم بعد.",

  // layers and lesson page
  Theory: "النظرية",
  Applied: "التطبيق",
  "Field practice": "الممارسة الميدانية",
  "The science and the why": "العلم والسبب",
  "Worked examples with Kuwait numbers": "أمثلة محلولة بأرقام الكويت",
  "How it is really done on projects": "كيف يُنفَّذ فعلاً في المشاريع",
  "Lesson {n} of {total}": "الدرس {n} من {total}",
  "{n} min": "{n} دقيقة",
  "By the end you can": "في نهاية الدرس تستطيع أن",
  Quiz: "الاختبار",
  "Retrieval practice": "التذكّر النشط",
  "Answer from memory — that is what makes it stick": "أجب من الذاكرة، فهذا ما يرسّخ المعلومة",
  "Lesson quiz": "اختبار الدرس",
  "{title} — quiz": "{title} — اختبار",
  "Flashcards from this lesson": "البطاقات التعليمية لهذا الدرس",
  "Unlocked into your daily review when you complete the lesson (finish the quiz).": "تُضاف إلى مراجعتك اليومية عند إكمال الدرس (إنهاء الاختبار).",
  "+{n} more": "+{n} أخرى",
  "Ask tutor": "اسأل المعلم",
  Close: "إغلاق",
  "✓ Completed": "✓ مكتمل",
  Completed: "مكتمل",
  "Mark complete without quiz": "وضع علامة الإكمال دون اختبار",
  "Your notes for this lesson (markdown supported). Saved on this device and synced.": "ملاحظاتك لهذا الدرس (يدعم Markdown). تُحفظ على هذا الجهاز وتُزامَن.",
  "Saving…": "جارٍ الحفظ…",
  Saved: "تم الحفظ",
  "{t} spent": "{t} مستغرقة",
  "Quiz {n}%": "الاختبار {n}%",
  Lessons: "الدروس",
  Mastery: "الإتقان",
  "Previous runs: {list}": "المحاولات السابقة: {list}",

  // callouts and blocks
  "Why it works": "لماذا ينجح",
  "PM must check": "ما يجب أن يتحقق منه مدير المشروع",
  "What goes wrong": "ما الذي يسوء عادةً",
  "Kuwait context": "السياق الكويتي",
  "Unverified — check before relying on it": "غير مُتحقَّق منه — تأكّد قبل الاعتماد عليه",
  Tip: "نصيحة",
  "Use AI here": "استخدم الذكاء الاصطناعي هنا",
  "Questions to ask the contractor": "أسئلة تطرحها على المقاول",
  Download: "تنزيل",
  Sources: "المصادر",
  unverified: "غير مُتحقَّق منه",
  Formula: "معادلة",
  "Missing formula {id}": "معادلة غير موجودة {id}",
  "Interactive tools and diagrams are shown in English.": "الأدوات التفاعلية والرسوم التوضيحية معروضة بالإنجليزية.",

  // worked examples
  "Worked example": "مثال محلول",
  "Your turn — faded example": "دورك — مثال متدرّج",
  Given: "المعطيات",
  Answer: "الإجابة",
  Check: "تحقّق",
  "Show step": "أظهر الخطوة",
  "Not yet — re-check units and arithmetic.": "ليس بعد — راجع الوحدات والحساب.",
  "Try this step yourself, then reveal": "جرّب هذه الخطوة بنفسك ثم اكشفها",
  "✓ You got it": "✓ أحسنت",
  Result: "النتيجة",

  // scenario
  "You are the PM": "أنت مدير المشروع",
  "Start scenario": "ابدأ السيناريو",
  Decide: "قرّر",
  "Scenario score": "نتيجة السيناريو",
  Replay: "أعد المحاولة",

  // feynman
  "Feynman check": "اختبار فاينمان",
  "Explain it simply, in your own words.": "اشرحها ببساطة وبكلماتك.",
  "Imagine explaining this to a ministry official with no engineering background…": "تخيّل أنك تشرح هذا لمسؤول في الوزارة بلا خلفية هندسية…",
  "Reviewing…": "جارٍ المراجعة…",
  "Get feedback": "احصل على تقييم",
  "Tick the key points your explanation covered:": "اختر النقاط الرئيسية التي غطّاها شرحك:",
  Record: "سجّل",
  "Coverage: {n}%": "التغطية: {n}%",
  "Key points": "النقاط الرئيسية",

  // questions
  "Independent problem": "مسألة مستقلة",
  "Multiple choice": "اختيار من متعدد",
  "Select all that apply": "اختر كل ما ينطبق",
  Calculation: "حساب",
  "Put in order": "رتّب",
  "PM decision": "قرار مدير المشروع",
  "Label the diagram": "سمِّ أجزاء المخطط",
  "Written answer": "إجابة مكتوبة",
  "Your answer": "إجابتك",
  "tolerance ±{x}": "السماحية ±{x}",
  "Move up": "إلى الأعلى",
  "Move down": "إلى الأسفل",
  "Choose…": "اختر…",
  "Write your answer (English or Arabic)…": "اكتب إجابتك (بالعربية أو الإنجليزية)…",
  "AI grader unavailable — grade yourself against the rubric and model answer.": "المصحّح الذكي غير متاح — قيّم نفسك وفق معايير التصحيح والإجابة النموذجية.",
  "Model answer": "الإجابة النموذجية",
  "Record self-grade": "سجّل التقييم الذاتي",
  "Checking…": "جارٍ التحقق…",
  "Submit for grading": "أرسل للتصحيح",
  "Check answer": "تحقّق من الإجابة",
  "Answer recorded.": "تم تسجيل الإجابة.",
  Correct: "صحيح",
  "Partly right ({n}%)": "صحيح جزئياً ({n}%)",
  "Not quite": "ليس تماماً",
  "Answer: ": "الإجابة: ",
  "Tutor feedback": "ملاحظات المعلم",
  "Model answer & rubric": "الإجابة النموذجية ومعايير التصحيح",

  // quiz runner
  "No questions available yet.": "لا توجد أسئلة متاحة بعد.",
  "{c} of {n} correct": "{c} من {n} صحيحة",
  " · {n} unanswered": " · {n} دون إجابة",
  "Strong. These concepts will now resurface on a spaced schedule.": "أداء قوي. ستعود هذه المفاهيم وفق جدول التكرار المتباعد.",
  "Every miss has been added to your error log and will resurface in mixed practice until you get it right twice.":
    "أُضيف كل خطأ إلى سجل الأخطاء، وسيعود في التدريب المختلط حتى تجيب عنه صحيحاً مرتين.",
  "Lesson marked complete — its flashcards are now in your daily review.": "تم إكمال الدرس — بطاقاته الآن ضمن مراجعتك اليومية.",
  "Review your answers": "راجع إجاباتك",
  "Next question": "السؤال التالي",
  Finish: "إنهاء",
  "End now": "أنهِ الآن",

  // mastery levels
  "Not started": "لم يبدأ",
  Novice: "مبتدئ",
  Developing: "قيد التطور",
  Proficient: "متمكّن",
  Mastered: "متقن",

  // curriculum and module pages
  "Curriculum — {n} modules": "المنهج — {n} وحدة",
  Module: "الوحدة",
  "Module {n}": "الوحدة {n}",
  "Why it matters": "لماذا يهم",
  "Module exam": "اختبار الوحدة",
  "Cheat sheet": "الملخص المركّز",
  "Print cheat sheet": "اطبع الملخص",
  Print: "طباعة",
  Continue: "تابع",
  Start: "ابدأ",
  Exam: "الاختبار",
  "Not taken": "لم يُؤدَّ بعد",
  "Best {n}%": "الأفضل {n}%",
  "Coming soon": "قريباً",
  "Scenarios": "السيناريوهات",
  "Capstone simulation": "المحاكاة الختامية",
  "Day-in-the-life scenarios": "سيناريوهات يوم في حياة مدير المشروع",
  Formulas: "المعادلات",
  Glossary: "المسرد",
  Competencies: "الكفاءات",
  Lesson: "الدرس",
  "Sixteen modules, each with theory, applied worked examples using Kuwait numbers, and field practice. Recommended order follows job relevance (shown as Step N).":
    "ست عشرة وحدة، لكل منها جانب نظري وأمثلة تطبيقية محلولة بأرقام الكويت وممارسة ميدانية. الترتيب المقترح يتبع أهمية الموضوع للوظيفة (مبيَّن كـ«الخطوة N»).",
  "Module {n} · Step {s}": "الوحدة {n} · الخطوة {s}",
  "{n} lessons": "{n} دروس",
  "In preparation": "قيد الإعداد",
  "~{n} h": "~{n} ساعة",
  "Exam best": "أفضل نتيجة في الاختبار",
  Best: "الأفضل",
  "Why this matters for a MEWRE PM": "لماذا يهم هذا مدير مشروع في الوزارة",
  "{n} quiz Qs": "{n} أسئلة اختبار",
  "{n} cards": "{n} بطاقات",
  "Integrative questions across all lessons, feedback at the end.": "أسئلة تكاملية تغطي جميع الدروس، والتقييم في النهاية.",
  "Concept mastery": "إتقان المفاهيم",
  "Module at a glance": "الوحدة في لمحة",
  "~{n} hours": "~{n} ساعة",
  "{n} glossary terms": "{n} مصطلحاً في المسرد",
  "{n} formulas": "{n} معادلات",
  "{n} references": "{n} مراجع",
  "How the concepts connect": "كيف تترابط المفاهيم",
  "Module exam · {title}": "اختبار الوحدة · {title}",
  "{n} questions mixing the module exam bank with lesson questions. Feedback is shown at the end, like a real exam. Time limit: {m} minutes.":
    "{n} سؤالاً تجمع بين بنك اختبار الوحدة وأسئلة الدروس. يظهر التقييم في النهاية كما في الاختبار الحقيقي. المدة: {m} دقيقة.",
  "{title} — module exam": "{title} — اختبار الوحدة",
  "Preparing exam…": "جارٍ إعداد الاختبار…",
  "Back to module": "العودة إلى الوحدة",
  "{title} — cheat sheet": "{title} — الملخص المركّز",
  "Key terms": "المصطلحات الرئيسية",
  "All scenarios": "كل السيناريوهات",
  "Field scenarios a MEWRE renewable PM actually faces — contractor notices, committee questions, site incidents, commercial calls. Each decision is scored with expert feedback.":
    "سيناريوهات ميدانية يواجهها فعلاً مدير مشاريع الطاقة المتجددة في الوزارة — إخطارات المقاولين وأسئلة اللجان وحوادث الموقع والقرارات التجارية. كل قرار يُقيَّم مع ملاحظات الخبير.",
  "Scenarios are being written": "السيناريوهات قيد الكتابة",
  "More scenarios from the lessons ({n})": "سيناريوهات أخرى من الدروس ({n})",
  "Print / save as PDF": "اطبع / احفظ PDF",
  "This module is not translated yet — showing English.": "لم تُترجم هذه الوحدة بعد — يُعرض المحتوى بالإنجليزية.",

  // competencies
  "Kuwait sector & institutions": "قطاع الكهرباء في الكويت ومؤسساته",
  "Power engineering fundamentals": "أساسيات هندسة القوى الكهربائية",
  "Solar PV & CSP technology": "تقنيات الطاقة الشمسية الكهروضوئية والمركّزة",
  "Wind & energy storage": "طاقة الرياح وتخزين الطاقة",
  "Grid integration": "الربط بالشبكة",
  "Project lifecycle & delivery": "دورة حياة المشروع وتنفيذه",
  "Schedule & cost control": "ضبط الجدول الزمني والتكلفة",
  "Risk, quality & HSE": "المخاطر والجودة والصحة والسلامة والبيئة",
  "Contracts & commercial": "العقود والشؤون التجارية",
  "Finance & economics": "التمويل والاقتصاديات",
  "Public procurement": "المشتريات الحكومية",
  "Operations & asset performance": "التشغيل وأداء الأصول",
  "Leadership & communication": "القيادة والتواصل",
  "AI-native project management": "إدارة المشاريع المعتمدة على الذكاء الاصطناعي",
};

Object.assign(AR, AR_PAGES);

export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  let s = lang === "ar" ? (AR[key] ?? key) : key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

/** Arrow pointing "forward" in reading direction. */
export const fwd = (lang: Lang) => (lang === "ar" ? "←" : "→");
export const back = (lang: Lang) => (lang === "ar" ? "→" : "←");
