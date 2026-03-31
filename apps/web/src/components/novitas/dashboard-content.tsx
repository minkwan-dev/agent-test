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
    <div className={cn("px-4 py-6 sm:px-6 lg:px-8", className)}>
      <div className={cn("mx-auto w-full max-w-[1600px]", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
