import { userProfile } from "@/components/account/account-data";
import { LogoutButton } from "@/components/account/logout-button";

export function AccountProfileCard() {
  return (
    <div className="rounded-2xl border border-[#e5e8eb] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] text-xl font-bold text-[#2563eb] ring-2 ring-white ring-offset-2 ring-offset-[#f9fafb]">
          원
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-[#191f28]">{userProfile.name}</p>
          <p className="text-sm text-[#8b95a1]">{userProfile.email}</p>
          <p className="mt-1 text-sm text-[#4e5968]">
            {userProfile.org} {userProfile.title}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
              세션 활성
            </span>
            <span className="rounded-full bg-[#f2f4f6] px-2.5 py-0.5 text-[11px] font-semibold text-[#4e5968]">
              역할: admin
            </span>
          </div>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 border-t border-[#f2f4f6] pt-6 text-sm sm:grid-cols-2">
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-1">
          <dt className="text-[#8b95a1]">타임존</dt>
          <dd className="font-medium text-[#191f28]">{userProfile.timezone}</dd>
        </div>
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-1">
          <dt className="text-[#8b95a1]">언어</dt>
          <dd className="font-medium text-[#191f28]">{userProfile.locale}</dd>
        </div>
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-1">
          <dt className="text-[#8b95a1]">워크스페이스 가입</dt>
          <dd className="font-medium tabular-nums text-[#191f28]">{userProfile.memberSince}</dd>
        </div>
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-1">
          <dt className="text-[#8b95a1]">2단계 인증</dt>
          <dd className="font-medium text-amber-700">미설정 · 보안 설정에서 등록할 수 있어요</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-[#f2f4f6] pt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
