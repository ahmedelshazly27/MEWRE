import { PageHeader } from "@/components/ui";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Settings" subtitle="Sync, offline download, study plan and your data." />
      <SettingsForm />
    </div>
  );
}
