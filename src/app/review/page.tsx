import { ReviewHeader, ReviewSession } from "./ReviewSession";

export const metadata = { title: "Daily review" };

export default function ReviewPage() {
  return (
    <div>
      <ReviewHeader />
      <ReviewSession />
    </div>
  );
}
