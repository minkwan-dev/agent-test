import { Novitas } from "@/components/novitas";

export default function LogsPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="전체 로그"
        description="에이전트·API 이벤트 스트림을 검색·필터링해요."
      />
      <Novitas.DashboardContent>
        <Novitas.LogsViewer />
      </Novitas.DashboardContent>
    </div>
  );
}
