import { Monitor } from "lucide-react";
import { recentSessions } from "@/components/account/account-data";

export function AccountSessionsList() {
  return (
    <div className="rounded-2xl border border-[#e5e8eb] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Monitor className="h-4 w-4 text-[#6eb89a]" />
        <h3 className="text-sm font-bold text-[#191f28]">최근 로그인 기록</h3>
      </div>
      <p className="mt-1 text-xs text-[#8b95a1]">의심되는 기기가 있으면 비밀번호를 바꾸고 세션을 끊어 주세요.</p>
      <ul className="mt-4 divide-y divide-[#f2f4f6]">
        {recentSessions.map((s) => (
          <li key={s.device} className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0">
            <div>
              <p className="text-sm font-medium text-[#191f28]">{s.device}</p>
              <p className="text-xs text-[#8b95a1]">
                {s.where} · {s.when}
              </p>
            </div>
            {s.current ? (
              <span className="rounded-full bg-[#e8f5ee] px-2 py-0.5 text-[11px] font-bold text-[#2563eb]">
                이 기기
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
