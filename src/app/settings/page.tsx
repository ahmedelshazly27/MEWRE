import { getSettings } from "@/server/repo";
import { aiAvailable } from "@/server/ai";
import { dbPath } from "@/server/db";
import { PageHeader } from "@/components/ui";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Settings" subtitle="Your study plan drives the weekly target on the dashboard." />
      <SettingsForm initial={getSettings()} aiOn={aiAvailable()} dbFile={dbPath()} />
    </div>
  );
}
