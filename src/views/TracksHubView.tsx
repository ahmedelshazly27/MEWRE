import { PageHeader } from "@/components/ui";
import { TrackCards } from "@/components/tracks";

/** /learn: every track at a glance. */
export function TracksHubView() {
  return (
    <div>
      <PageHeader
        title="Tracks"
        subtitle="Founder Core holds what every venture shares; the venture tracks link to it and add only what is specific to that company. One review queue and one concept graph run across all of them."
      />
      <TrackCards />
    </div>
  );
}
