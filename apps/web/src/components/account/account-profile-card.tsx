"use client";

import { useAtomValue } from "jotai";
import { LogoutButton } from "@/components/account/logout-button";
import { userProfile } from "@/components/account/account-data";
import { nvSurface } from "@/components/novitas/dashboard-content";
import { accessTokenAtom } from "@/lib/auth-atoms";
import { useHydrated } from "@/lib/use-hydrated";
import { useAuthMe } from "@/lib/use-auth-me";
import { cn } from "@/lib/utils";

export function AccountProfileCard() {
  const hydrated = useHydrated();
  const token = useAtomValue(accessTokenAtom);
  const sessionToken = hydrated ? token : null;
  const { data: me } = useAuthMe();

  const displayName = me?.name ?? userProfile.name;
  const displayEmail = me?.email ?? userProfile.email;

  if (!hydrated) {
    return (
      <div className={cn(nvSurface, "p-6")}>
        <p className="text-sm text-[var(--color-muted)]">불러오는 중…</p>
      </div>
    );
  }

  if (!sessionToken) {
    return (
      <div className={cn(nvSurface, "p-6")}>
        <p className="text-sm text-[var(--color-muted)]">로그인이 필요해요.</p>
      </div>
    );
  }

  return (
    <div className={cn(nvSurface, "p-6")}>
      <div className="min-w-0">
        <p className="text-lg font-bold text-[var(--color-foreground)]">{displayName}</p>
        <p className="text-sm text-[var(--color-muted)]">{displayEmail}</p>
        <p className="mt-1 text-sm text-[var(--color-foreground)]">
          {userProfile.org} {userProfile.title}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#f8fafc] px-2.5 py-0.5 text-[11px] font-bold text-[#1e293b]">
            세션 활성
          </span>
          <span className="rounded-full bg-[#f2f4f6] px-2.5 py-0.5 text-[11px] font-semibold text-[#4e5968]">
            역할: admin
          </span>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 border-t border-[var(--color-border)] pt-6 text-sm sm:grid-cols-2">
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-1">
          <dt className="text-[var(--color-muted)]">타임존</dt>
          <dd className="font-medium text-[var(--color-foreground)]">{userProfile.timezone}</dd>
        </div>
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-1">
          <dt className="text-[var(--color-muted)]">언어</dt>
          <dd className="font-medium text-[var(--color-foreground)]">{userProfile.locale}</dd>
        </div>
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-1">
          <dt className="text-[var(--color-muted)]">가입</dt>
          <dd className="font-medium tabular-nums text-[var(--color-foreground)]">
            {userProfile.memberSince}
          </dd>
        </div>
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-1">
          <dt className="text-[var(--color-muted)]">2단계 인증</dt>
          <dd className="font-medium text-amber-700">미설정 · 보안 설정에서 등록할 수 있어요</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-[var(--color-border)] pt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
