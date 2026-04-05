import { Bot, LayoutDashboard, Package, Settings } from "lucide-react";

export function OverviewPageFooter() {
  return (
    <footer className="flex flex-nowrap items-center justify-center gap-x-8 overflow-x-auto border-t border-[#e5e8eb] pt-6 text-xs text-[#8b95a1]">
      <span className="flex items-center gap-1.5">
        <LayoutDashboard className="h-3.5 w-3.5" /> 개요
      </span>
      <span className="flex items-center gap-1.5">
        <Package className="h-3.5 w-3.5" /> 재고 맞추기
      </span>
      <span className="flex items-center gap-1.5">
        <Bot className="h-3.5 w-3.5" /> 자동 처리
      </span>
      <span className="flex items-center gap-1.5">
        <Settings className="h-3.5 w-3.5" /> 설정
      </span>
    </footer>
  );
}
