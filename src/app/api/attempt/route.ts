import { NextResponse } from "next/server";
import { recordAttempt } from "@/server/repo";

export async function POST(req: Request) {
  const { questionId, source, response, runId } = await req.json();
  try {
    return NextResponse.json(recordAttempt({ questionId, source: source ?? "quiz", response, runId }));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
