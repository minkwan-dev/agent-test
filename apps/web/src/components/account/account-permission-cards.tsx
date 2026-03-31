import { KeyRound, Shield } from "lucide-react";
import Link from "next/link";

export function AccountPermissionCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-[#e5e8eb] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-[#191f28]">
          <Shield className="h-4 w-4 text-[#3182f6]" />
          <p className="text-sm font-bold">권한</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#4e5968]">
          대시보드 전 메뉴 조회, 설정 변경, 감사 로그 열람, 재고·발주 데이터 내보내기
        </p>
      </div>
      <div className="rounded-xl border border-[#e5e8eb] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-[#191f28]">
          <KeyRound className="h-4 w-4 text-[#3182f6]" />
          <p className="text-sm font-bold">API · 연동</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#4e5968]">
          키와 엔드포인트는{" "}
          <Link href="/dashboard/settings" className="font-semibold text-[#3182f6] hover:underline">
            설정
          </Link>
          에서 관리해요.
        </p>
      </div>
    </div>
  );
}
