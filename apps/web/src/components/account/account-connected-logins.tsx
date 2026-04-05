import { User } from "lucide-react";
import { connectedAccounts } from "@/components/account/account-data";

export function AccountConnectedLogins() {
  return (
    <div className="rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#191f28]">연결된 로그인</h3>
      <p className="mt-1 text-xs text-[#8b95a1]">소셜 계정을 연결하면 프로필 사진·이메일이 동기화돼요.</p>
      <ul className="mt-4 space-y-3">
        {connectedAccounts.map((acc) => (
          <li
            key={acc.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e5e8eb] bg-[#fafbfc] px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-2">
              <User className="h-4 w-4 shrink-0 text-[#8b95a1]" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#191f28]">{acc.label}</p>
                <p className="text-[11px] text-[#8b95a1]">{acc.hint}</p>
              </div>
            </div>
            <span
              className={
                acc.status === "connected"
                  ? "rounded-full bg-[#f0faf6] px-2 py-0.5 text-[11px] font-bold text-[#2d5244]"
                  : "rounded-full bg-[#f2f4f6] px-2 py-0.5 text-[11px] font-semibold text-[#4e5968]"
              }
            >
              {acc.status === "connected" ? "연결됨" : "연결 가능"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
