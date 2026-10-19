import { NextResponse } from "next/server";
import { addTime, completeLesson, startLesson } from "@/server/repo";
import { getLesson } from "@/lib/content";

export async function POST(req: Request) {
  const { action, lessonId, seconds } = await req.json();
  if (lessonId && !getLesson(lessonId)) return NextResponse.json({ error: "unknown lesson" }, { status: 400 });
  if (action === "start") startLesson(lessonId);
  else if (action === "time") addTime(lessonId ?? null, Number(seconds) || 0);
  else if (action === "complete") completeLesson(lessonId);
  else return NextResponse.json({ error: "bad action" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
