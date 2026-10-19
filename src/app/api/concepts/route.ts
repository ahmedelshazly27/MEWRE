import { NextResponse } from "next/server";
import { liveModules } from "@/lib/content";

/** Compact concept graph for the concept-map widget (keeps the full curriculum out of the client bundle). */
export async function GET() {
  return NextResponse.json(
    liveModules().map((m) => ({
      id: m.id,
      title: m.title,
      lessons: m.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        concepts: l.concepts.map((c) => ({ id: c.id, name: c.name, description: c.description, related: c.related ?? [] })),
      })),
    })),
  );
}
