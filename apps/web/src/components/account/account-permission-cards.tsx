import { KeyRound, Shield } from "lucide-react";
import Link from "next/link";
import { nvSurface } from "@/components/novitas/dashboard-content";
import { cn } from "@/lib/utils";

export function AccountPermissionCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className={cn(nvSurface, "p-4")}>
        <div className="flex items-center gap-2 text-[var(--color-foreground)]">
          <Shield className="h-4 w-4 text-[#a78bfa]" />
          <p className="text-sm font-bold">권한</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#4e5968]">
          대시보드 전 메뉴 조회, 설정 변경, 처리 기록 열람, 재고·발주 데이터 내보내기
        </p>
      </div>
      <div className={cn(nvSurface, "p-4")}>
        <div className="flex items-center gap-2 text-[var(--color-foreground)]">
          <KeyRound className="h-4 w-4 text-[#a78bfa]" />
          <p className="text-sm font-bold">연동·알림</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#4e5968]">
          공급처·알림은{" "}
          <Link href="/dashboard/settings" className="font-semibold text-[#a78bfa] hover:underline">
            설정
          </Link>
          에서 관리해요.
        </p>
      </div>
    </div>
  );
}
