import { cn } from "@/lib/utils";

/** 개요(overview)와 동일한 가운데 패널 폭 — 대시보드 본문 공통 래퍼 */
export function DashboardContent({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={cn("px-3 py-5 @min-[40rem]:px-5 @min-[64rem]:px-6", className)}>
      <div className={cn("mx-auto w-full max-w-[1440px]", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
