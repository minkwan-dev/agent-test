"use client";

import { Account } from "@/components/account";
import { Novitas } from "@/components/novitas";

export default function AdminPage() {
  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="내 계정"
        description="프로필·보안·연결 계정을 한곳에서 관리해요."
      />
      <Novitas.DashboardContent innerClassName="space-y-10">
        <Account.ProfileCard />
        <Account.PermissionCards />
        <Account.ConnectedLogins />
        <Account.SessionsList />
        <Account.NotificationPrefs />
      </Novitas.DashboardContent>
    </div>
  );
}
