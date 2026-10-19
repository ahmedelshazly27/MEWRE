import { NextResponse } from "next/server";
import { saveRun } from "@/server/repo";

export async function POST(req: Request) {
  const { id, kind, ref, score, total, detail, startedAt } = await req.json();
  if (!id || !kind || typeof score !== "number") return NextResponse.json({ error: "bad input" }, { status: 400 });
  saveRun({ id, kind, ref, score: Math.max(0, Math.min(1, score)), total, detail, startedAt });
  return NextResponse.json({ ok: true });
}
