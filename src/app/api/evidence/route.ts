import { NextResponse } from "next/server";
import { recordEvidence } from "@/server/repo";
import { getConcept } from "@/lib/content";

/** Concept evidence from scenarios, simulations and Feynman checks. */
export async function POST(req: Request) {
  const { concepts, score, source } = await req.json();
  const valid = (Array.isArray(concepts) ? concepts : []).filter((c: string) => getConcept(c));
  if (typeof score !== "number" || !source) return NextResponse.json({ error: "bad input" }, { status: 400 });
  recordEvidence(valid, Math.max(0, Math.min(1, score)), String(source));
  return NextResponse.json({ ok: true, recorded: valid.length });
}
