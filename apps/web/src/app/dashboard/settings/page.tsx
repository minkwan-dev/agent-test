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
        description="운영 규칙·알림·연동 키를 한곳에서 관리해요. 저장하면 계정에 반영돼요."
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
