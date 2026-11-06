import { aiAvailable, lessonContext, tutorStream, type ChatMessage } from "@/server/ai";
import { getLesson, getQuestion, getTrack, trackOfModule } from "@/lib/content";
import { aiWorkflow } from "@/lib/aiWorkflow";
import { VENTURES } from "@/content/venture-context";
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
  const { messages, lessonId, exerciseId, lang } = (await req.json()) as { messages: ChatMessage[]; lessonId?: string; exerciseId?: string; lang?: string };
  const arabic = lang === "ar";
  const clean = (messages ?? []).filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim());
  if (!clean.length || clean[0].role !== "user") return new Response("bad request", { status: 400 });
  // Exercise workshop: the tutor helps produce one real artifact for a venture (see AiWorkflowPanel).
  const ex = exerciseId ? getQuestion(exerciseId, arabic ? "ar" : "en") : undefined;
  const exercise = ex?.question.type === "short" ? ex.question : undefined;
  const ref = ex?.lesson ? { module: ex.module, lesson: ex.lesson } : lessonId ? getLesson(lessonId, arabic ? "ar" : "en") : undefined;
  let ctx = ref ? lessonContext(ref.module, ref.lesson) : undefined;
  if (exercise && ex) {
    const w = aiWorkflow(exercise, ex.module.id);
    ctx = [
      `WORKSHOP MODE. The learner is producing this exercise as a real working document for ${VENTURES[w.venture].name}.`,
      `Exercise:\n${exercise.prompt}`,
      `Rubric:\n${exercise.rubric.map((r) => `- ${r}`).join("\n")}`,
      `Venture facts you may use (nothing else about the venture):\n${VENTURES[w.venture].facts.map((f) => `- ${f}`).join("\n")}`,
      `Suggested tool for the final artifact: ${w.toolName}.`,
      "How to help: first ask for the facts and numbers you need, one short list. Then co-draft section by section, and push the learner to decide rather than deciding for them. Label every number as sourced, measured or assumption. Never invent customers, pilots, partners, revenue, team members or quotes. When the draft is complete, critique it against the rubric, list the hand checks still open, and tell the learner to paste the final version (and the first AI draft) into the exercise to be graded. Do not reveal the model answer.",
      ctx ? `Lesson context:\n${ctx}` : "",
    ].filter(Boolean).join("\n\n");
  }
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of tutorStream(clean, ctx, arabic, (ex ?? ref) ? getTrack(trackOfModule((ex ?? ref)!.module.id))?.tutorContext : undefined)) controller.enqueue(encoder.encode(chunk));
      } catch (e) {
        controller.enqueue(encoder.encode(`\n\n_Tutor error: ${(e as Error).message}_`));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
