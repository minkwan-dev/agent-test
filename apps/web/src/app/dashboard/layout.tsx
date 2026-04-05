import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Novitas } from "@/components/novitas";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const jar = await cookies();
  const session = jar.get(SESSION_COOKIE);
  if (!session || session.value !== SESSION_VALUE) {
    redirect("/login");
  }

  return <Novitas.AppShell>{children}</Novitas.AppShell>;
}
