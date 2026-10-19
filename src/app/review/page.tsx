import { reviewForecast, reviewQueue } from "@/server/repo";
import { PageHeader } from "@/components/ui";
import { ReviewSession } from "./ReviewSession";

export const metadata = { title: "Daily review" };

export default function ReviewPage() {
  const q = reviewQueue();
  const forecast = reviewForecast(7);
  const max = Math.max(1, ...forecast);
  return (
    <div>
      <PageHeader
        title="Daily review"
        subtitle={`Spaced repetition (FSRS). ${q.due.length} due · ${q.fresh.length} new today · ${q.known} cards learning · ${q.unlockedTotal} unlocked.`}
      >
        <div className="flex items-end gap-1" title="Reviews due over the next 7 days">
          {forecast.map((n, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-5 rounded-sm bg-accent/70" style={{ height: `${4 + (n / max) * 36}px` }} />
              <span className="text-[10px] text-muted">{i === 0 ? "T" : `+${i}`}</span>
            </div>
          ))}
        </div>
      </PageHeader>
      <ReviewSession />
    </div>
  );
}
