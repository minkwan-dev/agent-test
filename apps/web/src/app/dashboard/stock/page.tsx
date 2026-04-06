import Link from "next/link";
import { StockRegisteredBanner } from "@/app/dashboard/stock/stock-registered-banner";
import { Novitas } from "@/components/novitas";

export default function StockPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="재고 현황"
        description="부족한 품목과 마지막으로 맞춰 둔 재고를 한눈에 볼 수 있어요."
        actions={
          <Link
            href="/dashboard/stock/register"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#a78bfa] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#8b5cf6]"
          >
            재고 등록
          </Link>
        }
      />
      <Novitas.DashboardContent innerClassName="space-y-10">
      
        <StockRegisteredBanner />
        <Novitas.InventoryTableBlock title="재고 목록" showAutoBuy pageSize={100} />
      </Novitas.DashboardContent>
    </div>
  );
}
