import Link from "next/link";
import { StockRegisteredBanner } from "@/app/dashboard/stock/stock-registered-banner";
import { Novitas } from "@/components/novitas";

export default function StockPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="재고 현황"
        description="임계치 이하 품목과 스캔 주기를 한눈에 확인해요."
        actions={
          <Link
            href="/dashboard/stock/register"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#3182f6] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#256dd4]"
          >
            재고 등록
          </Link>
        }
      />
      <Novitas.DashboardContent>
        <Novitas.PipelineBaselineHint />
        <StockRegisteredBanner />
        <Novitas.InventoryTableBlock title="재고 목록" showAutoBuy pageSize={100} />
      </Novitas.DashboardContent>
    </div>
  );
}
