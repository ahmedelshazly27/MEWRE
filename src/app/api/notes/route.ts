import { NextResponse } from "next/server";
import { getNote, saveNote } from "@/server/repo";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("lessonId") ?? "";
  return NextResponse.json({ body: getNote(id) });
}

export async function POST(req: Request) {
  const { lessonId, body } = await req.json();
  if (typeof lessonId !== "string" || typeof body !== "string") return NextResponse.json({ error: "bad input" }, { status: 400 });
  saveNote(lessonId, body.slice(0, 50_000));
  return NextResponse.json({ ok: true });
}
