import { Novitas } from "@/components/novitas";

export default function ProtoPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="프로토콜 설정"
        description="외부 연동에 사용할 프로토콜을 켜고 꺼요. 이 브라우저에서는 토글이 바로 반영돼요."
      />
      <Novitas.DashboardContent>
        <Novitas.ProtoProtocolList />
      </Novitas.DashboardContent>
    </div>
  );
}
