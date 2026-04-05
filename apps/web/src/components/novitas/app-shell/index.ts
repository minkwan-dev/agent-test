import { AppShellHeader } from "./app-shell-header";
import { AppShellSidebar } from "./app-shell-sidebar";
import { LayoutIcon } from "./layout-icon";
import { NavLink } from "./nav-link";
import { NavSection } from "./nav-section";
import * as NavConfig from "./nav-config";

/** 대시보드 앱 셸(헤더·사이드) 하위 조각 */
export const AppShellLayout = {
  Header: AppShellHeader,
  Sidebar: AppShellSidebar,
  NavLink,
  NavSection,
  LayoutIcon,
  config: NavConfig,
} as const;

export type AppShellLayoutNamespace = typeof AppShellLayout;
