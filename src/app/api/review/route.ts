import { NextResponse } from "next/server";
import { cardState, gradeCard, reviewQueue } from "@/server/repo";
import { getCard, getLesson } from "@/lib/content";
import { newCard, previewIntervals, type ReviewRating } from "@/lib/srs";

function cardPayload(id: string) {
  const c = getCard(id)!;
  const state = cardState(id) ?? newCard(id);
  const lesson = getLesson(c.lessonId);
  return {
    id,
    kind: c.kind,
    front: c.front,
    back: c.back,
    ar: c.ar,
    lessonId: c.lessonId,
    lessonTitle: lesson?.lesson.title ?? "",
    moduleId: c.moduleId,
    state: state.state,
    intervals: previewIntervals(state),
  };
}

export async function GET() {
  const q = reviewQueue();
  return NextResponse.json({
    due: q.due.map(cardPayload),
    fresh: q.fresh.map(cardPayload),
    unlockedTotal: q.unlockedTotal,
    known: q.known,
  });
}

export async function POST(req: Request) {
  const { cardId, rating } = await req.json();
  if (![1, 2, 3, 4].includes(rating)) return NextResponse.json({ error: "bad rating" }, { status: 400 });
  try {
    const s = gradeCard(cardId, rating as ReviewRating);
    return NextResponse.json({ due: s.due, state: s.state });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
