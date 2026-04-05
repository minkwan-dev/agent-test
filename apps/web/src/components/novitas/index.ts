import { AppShell } from "./app-shell";
import { StepChip, StatusBadge } from "./badge";
import { DashboardContent } from "./dashboard-content";
import { InventoryRegisterWizard } from "./inventory-register-wizard";
import { LogsViewer } from "./logs-viewer";
import { OnboardingWizard } from "./onboarding-wizard";
import { PageHeader } from "./page-header";
import { PipelineBaselineHint } from "./pipeline-baseline-hint";
import { ReflectInventoryDialog } from "./reflect-inventory-dialog";
import { RightPanel } from "./right-panel";
import { TablePagination } from "./table-pagination";
import {
  InventoryTableBlock,
  OrdersTableBlock,
} from "./tables";
import { OverviewContent } from "./overview-content";
import { AppShellLayout } from "./app-shell/index";
import { Overview } from "./overview/index";
import { RightPanelParts } from "./right-panel/index";

/** Novitas 대시보드·운영 UI 묶음 */
export const Novitas = {
  AppShell,
  RightPanel,
  AppShellLayout,
  OverviewParts: Overview,
  RightPanelParts,
  DashboardContent,
  PageHeader,
  OverviewContent,
  StepChip,
  StatusBadge,
  InventoryRegisterWizard,
  LogsViewer,
  OnboardingWizard,
  PipelineBaselineHint,
  ReflectInventoryDialog,
  TablePagination,
  InventoryTableBlock,
  OrdersTableBlock,
} as const;

export type NovitasNamespace = typeof Novitas;
