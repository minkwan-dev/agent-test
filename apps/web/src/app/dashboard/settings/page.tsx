import { Novitas } from "@/components/novitas";
import {
  SettingsApiSection,
  SettingsAutobuySection,
  SettingsFormActions,
  SettingsNotifySection,
} from "@/app/dashboard/settings/settings-sections";

export default function SettingsPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="설정"
        description="자동 발주·알림 같은 규칙을 한곳에서 다루는 화면이에요. 지금은 데모라 이 브라우저에만 잠깐 남을 수 있어요."
      />
      <Novitas.DashboardContent innerClassName="space-y-8">
        <SettingsAutobuySection />
        <SettingsNotifySection />
        <SettingsApiSection />
        <SettingsFormActions />
      </Novitas.DashboardContent>
    </div>
  );
}
