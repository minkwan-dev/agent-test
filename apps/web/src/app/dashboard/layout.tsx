import type { ReactNode } from "react";
import { Novitas } from "@/components/novitas";

/** 인증·리다이렉트는 `src/middleware.ts`에서 JWT(HttpOnly 쿠키)로 처리합니다. */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <Novitas.AppShell>{children}</Novitas.AppShell>;
}
