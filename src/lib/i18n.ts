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
  "Your turn: faded example": "دورك — مثال متدرّج",
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
  // tracks
  Tracks: "المسارات",
  "Shazly Academy": "أكاديمية الشاذلي",
  "Founder & energy tracks": "مسارات ريادة الأعمال والطاقة",
  // crash course
  "{n} concepts": "{n} مفاهيم",
  "Read the must-know concepts (say each one out loud once)": "اقرأ المفاهيم الأساسية (قل كل مفهوم بصوت مرتفع مرة واحدة)",
  "Self-test the concepts out loud": "اختبر نفسك في المفاهيم بصوت مرتفع",
  "Every morning": "كل صباح",
  "Daily review first (15 min): it brings back yesterday's concepts and lessons just before you forget them.": "المراجعة اليومية أولاً (15 دقيقة): تعيد إليك مفاهيم ودروس الأمس قبل أن تنساها مباشرة.",
  "Then self-test yesterday's concepts with “Hide the ones I can explain” on.": "ثم اختبر نفسك في مفاهيم الأمس مع تفعيل «أخفِ ما أستطيع شرحه».",
  "Every module — the steps are listed in this order below": "كل وحدة — الخطوات مرتبة بهذا الترتيب في الأسفل",
  "📄 Cheat sheet: skim it for the big picture. Don't memorize yet.": "📄 الملخص المركّز: تصفّحه لترى الصورة الكاملة. لا تحفظ بعد.",
  "🧠 Must-know concepts: read each card and say “Say it like this” out loud once.": "🧠 المفاهيم الأساسية: اقرأ كل بطاقة وقل «قلها هكذا» بصوت مرتفع مرة واحدة.",
  "📘 Lessons: read properly, do the worked examples and finish the lesson quiz. Core lessons first.": "📘 الدروس: اقرأها جيداً، وحلّ الأمثلة، وأنهِ اختبار الدرس. الدروس الأساسية أولاً.",
  "🎯 Scenario: make the decisions, read the feedback.": "🎯 السيناريو: اتخذ القرارات واقرأ التقييم.",
  "🗣️ Self-test the concepts: say each one out loud before you reveal. Be honest.": "🗣️ اختبر نفسك في المفاهيم: قل كل مفهوم بصوت مرتفع قبل الكشف. وكن صادقاً.",
  "✅ Retrieval check: 8 questions, no notes. Misses go to your error log.": "✅ اختبار التذكّر: 8 أسئلة دون ملاحظات. تُضاف الأخطاء إلى سجل الأخطاء.",
  "✍️ Writing task: keep it — it is material for the trial week.": "✍️ المهمة الكتابية: احتفظ بها — فهي مادة لأسبوع التجربة.",
  "Running behind?": "متأخر عن الخطة؟",
  "Never skip the cheat sheet, the concepts and the check — they are what covers all 16 modules. Then Core lessons. Drop extra lessons, scenarios and writing first.":
    "لا تتخطَّ الملخص والمفاهيم واختبار التذكّر — فهي ما يغطي الوحدات الست عشرة. ثم الدروس الأساسية. واترك الدروس الإضافية والسيناريوهات والكتابة أولاً.",
  "Under 6/8 on a check? Re-read the cheat-sheet sections behind your misses before moving on.": "أقل من 6/8 في اختبار التذكّر؟ أعد قراءة أجزاء الملخص المتعلقة بأخطائك قبل أن تنتقل.",
  "Last day: do the self-test once more in Arabic (عربي toggle) so you can explain every concept in both languages.": "في اليوم الأخير: أعد الاختبار الذاتي بالعربية حتى تستطيع شرح كل مفهوم باللغتين.",
  "Must-know concepts": "مفاهيم يجب أن تعرفها",
  "{n} concepts you should be able to explain on the spot if a colleague asks — each with the one sentence to memorize, how to say it, a picture to remember it by, why it matters and the classic mix-up.":
    "{n} مفهوماً يجب أن تستطيع شرحها فوراً إن سألك زميل — لكل منها الجملة التي تحفظها، وكيف تقولها، وصورة تتذكرها بها، ولماذا تهم، والخلط الشائع.",
  "What to memorize and be able to explain on the spot — with a self-test that feeds your daily review.": "ما يجب أن تحفظه وتستطيع شرحه فوراً — مع اختبار ذاتي يغذّي مراجعتك اليومية.",
  "Must-know concepts: learn to explain them": "مفاهيم يجب أن تعرفها: تعلّم شرحها",
  "Completed when you can explain every concept": "يكتمل عندما تستطيع شرح كل المفاهيم",
  "Must know": "يجب أن تعرفه",
  "Good to know": "من المفيد معرفته",
  "I can explain it": "أستطيع شرحه",
  "I could explain it": "استطعت شرحه",
  "Not yet": "ليس بعد",
  Reveal: "اكشف",
  Memorize: "احفظ",
  "Say it like this": "قلها هكذا",
  "Picture it": "تخيّلها",
  Example: "مثال",
  "Don't confuse": "لا تخلط",
  "Say the definition and explain it out loud, with an example, before you reveal.": "قل التعريف واشرحه بصوت مرتفع مع مثال قبل أن تكشف الإجابة.",
  "Taught in": "يُشرح في",
  "Must know — can explain": "يجب معرفته — أستطيع شرحه",
  "All concepts — can explain": "كل المفاهيم — أستطيع شرحها",
  "All modules": "كل الوحدات",
  "Self-test": "اختبار ذاتي",
  "Must know only": "ما يجب معرفته فقط",
  "Hide the ones I can explain": "أخفِ ما أستطيع شرحه",
  "Self-test: say it out loud, reveal, then be honest. Your answers schedule each concept in your daily review, so the shaky ones come back.":
    "الاختبار الذاتي: قلها بصوت مرتفع، ثم اكشف، ثم كن صادقاً. إجاباتك تجدول كل مفهوم في مراجعتك اليومية، فتعود إليك المفاهيم غير الراسخة.",
  "Nothing left here — you can explain all of them.": "لم يتبقَّ شيء هنا — تستطيع شرحها كلها.",
  "Be able to explain these on the spot after this lesson": "يجب أن تستطيع شرح هذه فوراً بعد هذا الدرس",
  "Must-know ({n})": "يجب معرفته ({n})",
  "Must-know": "يجب معرفته",
  "Trial-week sprint": "خطة أسبوع التجربة المكثفة",
  "Cover all 16 modules in 3, 4 or 5 days: every cheat sheet with a retrieval check, the most job-critical lessons in full, written outputs to bring with you, and a playbook for the week itself.":
    "غطِّ الوحدات الست عشرة في 3 أو 4 أو 5 أيام: كل ملخص مركّز مع اختبار تذكّر، وأهم الدروس للوظيفة كاملةً، ومُخرَجات مكتوبة تحملها معك، ودليل للأسبوع نفسه.",
  "Work through each module in order: cheat sheet, lessons, scenario, then the retrieval check. Misses go to your error log.":
    "تقدّم في كل وحدة بالترتيب: الملخص المركّز، ثم الدروس، ثم السيناريو، ثم اختبار التذكّر. تُضاف الأخطاء إلى سجل الأخطاء.",
  "Start each morning with 15 minutes of daily review — it brings back yesterday's material.": "ابدأ كل صباح بـ 15 دقيقة من المراجعة اليومية، فهي تستعيد مادة الأمس.",
  "Lessons marked Core come first. If a day runs long, finish the Core lessons and the checks and move on.": "الدروس المعلَّمة «أساسي» أولاً. إن طال اليوم، أنهِ الدروس الأساسية واختبارات التذكّر وانتقل.",
  "Keep every written output: together they are what you bring to the trial week.": "احتفظ بكل مُخرَج مكتوب: مجتمعةً هي ما تحمله معك إلى أسبوع التجربة.",
  "Read it on the last day and again the night before. Print it if that helps.": "اقرأه في اليوم الأخير ثم مرة أخرى في الليلة السابقة. اطبعه إن كان ذلك يفيدك.",
  "Final exam across all modules": "الاختبار النهائي لجميع الوحدات",
  "{n} questions with at least one from every module, feedback at the end. Aim for 80% before the trial week. Time limit: {m} minutes.":
    "{n} سؤالاً، منها سؤال واحد على الأقل من كل وحدة، والتقييم في النهاية. استهدف 80% قبل أسبوع التجربة. المدة: {m} دقيقة.",
  "Retrieval check · M{n} {title}": "اختبار التذكّر · M{n} {title}",
  "{n} random questions from the whole module, with feedback after each one. Read the cheat sheet first.": "{n} أسئلة عشوائية من الوحدة كلها، مع تقييم بعد كل سؤال. اقرأ الملخص المركّز أولاً.",
  "How many days do you have?": "كم يوماً لديك؟",
  "Every plan covers all 16 modules (cheat sheet + retrieval check). Longer plans add more full lessons, scenarios and written outputs.":
    "كل خطة تغطي الوحدات الست عشرة (ملخص مركّز + اختبار تذكّر). الخطط الأطول تضيف دروساً كاملة وسيناريوهات ومُخرَجات مكتوبة أكثر.",
  "Study time": "وقت الدراسة",
  "≈ {h} per day": "≈ {h} يومياً",
  Progress: "التقدّم",
  continued: "تكملة",
  "Finish line": "خط النهاية",
  "Mark as read": "وضع علامة «مقروء»",
  "Read the cheat sheet": "اقرأ الملخص المركّز",
  "Completed by finishing the lesson quiz": "يكتمل بإنهاء اختبار الدرس",
  "Completed by playing the scenario": "يكتمل بلعب السيناريو",
  "Completed by taking the check": "يكتمل بأداء اختبار التذكّر",
  "Completed by taking the exam": "يكتمل بأداء الاختبار",
  Core: "أساسي",
  "Retrieval check ({n} questions)": "اختبار التذكّر ({n} أسئلة)",
  Write: "اكتب",
  "Read the trial-week playbook": "اقرأ دليل أسبوع التجربة",
  "Trial week coming up? 3–5 day sprint": "أسبوع التجربة قريب؟ خطة مكثفة من 3 إلى 5 أيام",
  "All 16 modules in 3, 4 or 5 days: cheat sheets, retrieval checks, the core lessons and a playbook for the week itself.": "الوحدات الست عشرة في 3 أو 4 أو 5 أيام: ملخصات مركّزة واختبارات تذكّر والدروس الأساسية ودليل للأسبوع نفسه.",
  "Crash course": "الخطة المكثفة",
  "Two-week crash course": "الدورة المكثفة لأسبوعين",
  "The shortest path to walking into the MEWRE trial week prepared: {n} high-yield lessons in 14 days (about {h} hours), a written output each day, and a playbook for the week itself.":
    "أقصر طريق لتدخل أسبوع التجربة في الوزارة مستعداً: {n} درساً عالي الأثر في 14 يوماً (نحو {h} ساعة)، ومُخرَج مكتوب كل يوم، ودليل للأسبوع نفسه.",
  "Crash lessons done": "دروس الدورة المكتملة",
  "Trial week starts in": "يبدأ أسبوع التجربة بعد",
  "{n} days": "{n} يوماً",
  Today: "اليوم",
  Started: "بدأ",
  "Trial week start date": "تاريخ بدء أسبوع التجربة",
  "Plan day": "يوم الخطة",
  "Day {n}": "اليوم {n}",
  "Reset start date": "إعادة ضبط تاريخ البدء",
  "Start the plan today": "ابدأ الخطة اليوم",
  "You have fewer days than the plan: do the first lesson and the output of each day, and skim the rest.": "لديك أيام أقل من الخطة: أنجز الدرس الأول والمُخرَج في كل يوم، وتصفّح الباقي.",
  "Go to day {n}": "انتقل إلى اليوم {n}",
  Done: "تم",
  "Output done": "أنجزتُ المُخرَج",
  "How to use it": "طريقة الاستخدام",
  "Every day: 15 minutes of daily review first, then the lessons, then the scenario, then the written output.": "كل يوم: 15 دقيقة من المراجعة اليومية أولاً، ثم الدروس، ثم السيناريو، ثم المُخرَج المكتوب.",
  "Short on time? Do the first lesson and the output; skim the rest of the day's cheat sheet.": "وقتك ضيق؟ أنجز الدرس الأول والمُخرَج، وتصفّح الملخص المركّز لبقية اليوم.",
  "Keep every output: together they are the material you bring to the trial week.": "احتفظ بكل مُخرَج: مجتمعةً هي المادة التي تحملها معك إلى أسبوع التجربة.",
  "~{n} min of lessons": "~{n} دقيقة من الدروس",
  "Crash exam": "اختبار الدورة المكثفة",
  "Today's output": "مُخرَج اليوم",
  "Trial-week playbook": "دليل أسبوع التجربة",
  "Read it on day 14 and again the night before. Print it if that helps.": "اقرأه في اليوم 14 ثم مرة أخرى في الليلة السابقة. اطبعه إن كان ذلك يفيدك.",
  "Terms to use in Arabic": "مصطلحات استخدمها بالعربية",
  "Using the right Arabic term in a meeting lands well. These are the ones you will hear most.": "استخدام المصطلح العربي الصحيح في الاجتماع يترك انطباعاً جيداً. هذه أكثر المصطلحات التي ستسمعها.",
  "Take the crash exam": "أدِّ اختبار الدورة المكثفة",
  "{n} questions drawn at random from every crash-course lesson, feedback at the end. Aim for 80% before the trial week. Time limit: {m} minutes.":
    "{n} سؤالاً تُختار عشوائياً من جميع دروس الدورة المكثفة، والتقييم في النهاية. استهدف 80% قبل أسبوع التجربة. المدة: {m} دقيقة.",
  "Trial week coming up? Two-week crash course": "أسبوع التجربة قريب؟ الدورة المكثفة لأسبوعين",
  "14 days of the highest-yield lessons, a daily written output, and a playbook for the week itself.": "14 يوماً من أعلى الدروس أثراً، ومُخرَج مكتوب يومياً، ودليل للأسبوع نفسه.",
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
