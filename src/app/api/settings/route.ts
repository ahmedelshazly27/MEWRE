import { NextResponse } from "next/server";
import { getSettings, resetAll, saveSettings } from "@/server/repo";

export async function GET() {
  return NextResponse.json(getSettings());
}

export async function POST(req: Request) {
  const body = await req.json();
  if (body.reset === "RESET") {
    resetAll();
    return NextResponse.json({ ok: true, reset: true });
  }
  saveSettings(body);
  return NextResponse.json(getSettings());
}
