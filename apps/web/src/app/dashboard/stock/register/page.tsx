import Link from "next/link";
import { Novitas } from "@/components/novitas";

export default function InventoryRegisterPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="재고 등록"
        description="품목과 수량을 넣어 두면, 부족할 때 알림과 자동 발주 규칙이 맞춰져요."
        actions={
          <Link
            href="/dashboard/stock"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#e5e8eb] bg-white px-4 py-2 text-sm font-bold text-[#4e5968] transition hover:bg-[#f9fafb]"
          >
            목록으로
          </Link>
        }
      />
      <Novitas.DashboardContent>
        <Novitas.InventoryRegisterWizard />
      </Novitas.DashboardContent>
    </div>
  );
}
