import { buildContentIndex } from "@/lib/content-json";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildContentIndex("ar"));
}
