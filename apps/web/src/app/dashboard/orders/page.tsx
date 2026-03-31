import { Novitas } from "@/components/novitas";

export default function OrdersPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="구매 내역"
        description="자동구매로 처리된 발주와 상태를 확인해요."
      />
      <Novitas.DashboardContent>
        <Novitas.OrdersTableBlock pageSize={100} showOrdersPageLink={false} />
      </Novitas.DashboardContent>
    </div>
  );
}
