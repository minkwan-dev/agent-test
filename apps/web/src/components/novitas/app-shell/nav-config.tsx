import {
  Bell,
  Hexagon,
  Home,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Workflow,
} from "lucide-react";
import { LayoutIcon } from "@/components/novitas/app-shell/layout-icon";

export const navMain = [
  { href: "/dashboard/overview", id: "overview", label: "개요", icon: LayoutIcon },
  { href: "/dashboard/stock", id: "stock", label: "재고 현황", icon: Package },
  {
    href: "/dashboard/orders",
    id: "orders",
    label: "구매 내역",
    icon: ShoppingCart,
  },
] as const;

export const navAgents = [
  {
    href: "/dashboard/agents",
    id: "agents",
    label: "에이전트 현황",
    icon: Workflow,
  },
  { href: "/dashboard/flow", id: "flow", label: "플로우 관리", icon: Hexagon },
  {
    href: "/dashboard/proto",
    id: "proto",
    label: "프로토콜 설정",
    icon: Settings,
  },
] as const;

export const navSystem = [
  {
    href: "/dashboard/notify",
    id: "notify",
    label: "알림",
    icon: Bell,
    badge: 7,
  },
  { href: "/dashboard/logs", id: "logs", label: "전체 로그", icon: Menu },
  {
    href: "/dashboard/settings",
    id: "settings",
    label: "설정",
    icon: Settings,
  },
] as const;

export const topLinks = [
  { label: "홈", href: "/", id: "home", icon: Home },
  {
    label: "운영",
    href: "/dashboard/overview",
    id: "ops",
    icon: LayoutIcon,
  },
] as const;
