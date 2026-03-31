import { OverviewAgentCards } from "./overview-agent-cards";
import { OverviewHeroBanner } from "./overview-hero-banner";
import { OverviewKpiTile } from "./overview-kpi-tile";
import { OverviewPageFooter } from "./overview-page-footer";
import { OverviewTodaySummary } from "./overview-today-summary";

/** 대시보드 개요(Overview) 페이지 블록 */
export const Overview = {
  KpiTile: OverviewKpiTile,
  AgentCards: OverviewAgentCards,
  HeroBanner: OverviewHeroBanner,
  TodaySummary: OverviewTodaySummary,
  PageFooter: OverviewPageFooter,
} as const;

export type OverviewNamespace = typeof Overview;
