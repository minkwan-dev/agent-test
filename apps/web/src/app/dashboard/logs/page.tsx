import { Novitas } from "@/components/novitas";

export default function LogsPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="처리 기록"
        description="재고 반영 이후 어떤 일이 있었는지, 단계별로 찾아볼 수 있어요."
      />
      <Novitas.DashboardContent>
        <Novitas.LogsViewer />
      </Novitas.DashboardContent>
    </div>
  );
}
