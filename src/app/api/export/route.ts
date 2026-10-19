import { NextResponse } from "next/server";
import { exportAll } from "@/server/repo";

export async function GET() {
  return new NextResponse(JSON.stringify(exportAll(), null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="mewre-progress-${new Date().toISOString().slice(0, 10)}.json"`,
    },
  });
}
