import {
  Bell,
  Menu,
  Package,
  Settings,
  ShoppingCart,
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

export const navSystem = [
  {
    href: "/dashboard/notify",
    id: "notify",
    label: "알림",
    icon: Bell,
    badge: 93,
  },
  { href: "/dashboard/logs", id: "logs", label: "처리 기록", icon: Menu },
  {
    href: "/dashboard/settings",
    id: "settings",
    label: "설정",
    icon: Settings,
  },
] as const;
