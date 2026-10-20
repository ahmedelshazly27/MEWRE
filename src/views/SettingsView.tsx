import { t, type Lang } from "@/lib/i18n";
import { PageHeader } from "@/components/ui";
import { SettingsForm } from "@/app/settings/SettingsForm";

export function SettingsView({ lang }: { lang: Lang }) {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={t(lang, "Settings")} subtitle={t(lang, "Language, sync, offline download, study plan and your data.")} />
      <SettingsForm />
    </div>
  );
}
