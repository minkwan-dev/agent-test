import { cn } from "@/lib/utils";

/**
 * 페이지 제목·본문·테이블이 같은 수직선에 오도록 하는 공통 폭·여백.
 * 헤더(`PageHeader`)와 반드시 동일한 값을 씁니다.
 */
export const DASHBOARD_CONTENT_MAX = "max-w-[min(100%,1280px)]";
export const DASHBOARD_GUTTER_X = "px-4 sm:px-6 lg:px-8";

/** 테이블이 가로로 패널 끝까지 닿을 때 — 본문 gutter와 상쇄 */
export const dashboardPanelBleedX = cn(
  "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
);

/** 페이지 제목(스티키 헤더) 아래 본문 첫 블록까지 */
export const DASHBOARD_BODY_TOP_PAD = "pt-6 sm:pt-8";

/** 블록 내: 툴바(h2·검색) ↔ 테이블 ↔ 페이지네이션 간격 */
export const dashboardSectionStackClass = "flex flex-col gap-6";

/**
 * 대시보드 테이블 블록과 동일한 톤 — 설정·시스템(계정) 본문 통일용
 * (개별 행마다 shadow-sm 카드를 쌓지 않고 한 겹 테두리)
 */
export const nvSurface =
  "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]";
export const nvSurfaceMuted =
  "rounded-xl border border-[var(--color-border)] bg-[#fafbfc]";
export const nvSectionTitle =
  "text-sm font-bold leading-none text-[var(--color-foreground)]";
export const nvSectionDesc = "mt-1 text-xs text-[var(--color-muted)]";
/** 폼 행을 세로로만 나눔 — 상위에 overflow-hidden + rounded-xl */
export const nvFormStack =
  "mt-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] divide-y divide-[var(--color-border)]";
export const nvFormRow =
  "flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between";

/**
 * 처리 기록 테이블과 동일 타이포 — 본문·행 제목·보조·검색
 * (Pretendard는 `globals.css` body 기본, 여기서는 크기·색·행간만 통일)
 */
export const nvLogListBody =
  "text-xs leading-relaxed break-words text-[#4e5968] [overflow-wrap:anywhere]";
/** 처리 기록 역할 열 기본(단계 색은 `processStepStyles.*.label`과 합성) */
export const nvLogListRole =
  "text-xs font-semibold break-words [overflow-wrap:anywhere]";
/** 품목명·알림 본문 등 행 제목 톤 */
export const nvLogListRowTitle =
  "text-xs font-semibold leading-relaxed text-[#4e5968]";
/** 시각·보조 숫자 */
export const nvLogListMuted = "text-xs tabular-nums text-[var(--color-muted)]";
/** 처리 기록 툴바 검색창과 동일 */
export const nvLogSearchInput =
  "w-full rounded-lg border border-[var(--color-border)] py-1.5 pl-8 pr-2 text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] outline-none focus:border-[#a78bfa]";
/** 툴바 보조 버튼(복사·필터 등) */
export const nvLogToolbarButton =
  "inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[#4e5968] hover:bg-[#fafbfc]";
/** 설정 등 폼 라벨 — 처리 기록 역할과 같은 크기·무게 */
export const nvFormLabel = "text-xs font-semibold text-[#4e5968]";

/** 대시보드 본문 래퍼 — 둥근 카드 없이 한 겹의 작업 영역만 유지 */
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
    <div className={cn("min-h-0 flex-1", className)}>
      <div
        className={cn(
          "mx-auto w-full pb-8 sm:pb-10",
          DASHBOARD_BODY_TOP_PAD,
          DASHBOARD_CONTENT_MAX,
          DASHBOARD_GUTTER_X,
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
