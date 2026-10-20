import { ReviewHeader, ReviewSession } from "../../review/ReviewSession";

export const metadata = { title: "المراجعة اليومية" };

export default function ReviewPage() {
  return (
    <div>
      <ReviewHeader />
      <ReviewSession />
    </div>
  );
}
