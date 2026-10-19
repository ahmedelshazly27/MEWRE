import { NextResponse } from "next/server";
import { aiAvailable, gradeFeynman, gradeShortAnswer, lessonContext } from "@/server/ai";
import { getLesson, getQuestion } from "@/lib/content";
import { requireUser } from "@/server/auth";

export async function POST(req: Request) {
  if (!aiAvailable()) return NextResponse.json({ available: false });
  const auth = await requireUser(req);
  if (!auth.ok) return NextResponse.json({ available: false, error: auth.message });
  const body = await req.json();
  try {
    if (body.mode === "feynman") {
      const ref = body.lessonId ? getLesson(body.lessonId) : undefined;
      const ctx = ref ? lessonContext(ref.module, ref.lesson, 8000) : undefined;
      const r = await gradeFeynman(String(body.prompt), body.keyPoints ?? [], String(body.answer ?? ""), ctx);
      return NextResponse.json({ available: true, ...r });
    }
    const ref = getQuestion(body.questionId);
    if (!ref || ref.question.type !== "short") return NextResponse.json({ error: "not a short-answer question" }, { status: 400 });
    const r = await gradeShortAnswer(ref.question, String(body.answer ?? ""));
    return NextResponse.json({ available: true, ...r });
  } catch (e) {
    console.error("grade error", e);
    return NextResponse.json({ available: false, error: (e as Error).message });
  }
}
