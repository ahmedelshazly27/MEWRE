import { aiAvailable, lessonContext, tutorStream, type ChatMessage } from "@/server/ai";
import { getLesson } from "@/lib/content";
import { requireUser } from "@/server/auth";

export async function GET() {
  return Response.json({ available: aiAvailable() });
}

export async function POST(req: Request) {
  if (!aiAvailable()) {
    return new Response("The AI tutor needs an API key: set ANTHROPIC_API_KEY (Vercel → Project → Settings → Environment Variables, or .env.local when running locally) and redeploy.", { status: 503 });
  }
  const auth = await requireUser(req);
  if (!auth.ok) return new Response(auth.message, { status: auth.status });
  const { messages, lessonId, lang } = (await req.json()) as { messages: ChatMessage[]; lessonId?: string; lang?: string };
  const arabic = lang === "ar";
  const clean = (messages ?? []).filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim());
  if (!clean.length || clean[0].role !== "user") return new Response("bad request", { status: 400 });
  const ref = lessonId ? getLesson(lessonId, arabic ? "ar" : "en") : undefined;
  const ctx = ref ? lessonContext(ref.module, ref.lesson) : undefined;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of tutorStream(clean, ctx, arabic)) controller.enqueue(encoder.encode(chunk));
      } catch (e) {
        controller.enqueue(encoder.encode(`\n\n_Tutor error: ${(e as Error).message}_`));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
