import { Novitas } from "@/components/novitas";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Novitas.AppShell>{children}</Novitas.AppShell>;
}
