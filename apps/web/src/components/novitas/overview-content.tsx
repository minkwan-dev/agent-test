"use client";

import { DashboardContent } from "@/components/novitas/dashboard-content";
import { Overview } from "@/components/novitas/overview";
import { PageHeader } from "@/components/novitas/page-header";
import { InventoryTableBlock, OrdersTableBlock } from "@/components/novitas/tables";

export function OverviewContent() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="개요"
        description="오늘 숫자와 재고·발주 흐름을 한 화면에서 볼 수 있어요."
      />

      <DashboardContent innerClassName="space-y-6">
        <Overview.TopSummary />

        <InventoryTableBlock pageSize={8} />

        <OrdersTableBlock pageSize={8} />
      </DashboardContent>
    </div>
  );
}
