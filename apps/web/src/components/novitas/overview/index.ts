import { OverviewKpiTile } from "./overview-kpi-tile";
import { OverviewTopSummary } from "./overview-top-summary";

/** 대시보드 개요(Overview) 페이지 블록 */
export const Overview = {
  KpiTile: OverviewKpiTile,
  TopSummary: OverviewTopSummary,
} as const;

export type OverviewNamespace = typeof Overview;
