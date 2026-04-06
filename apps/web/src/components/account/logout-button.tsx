"use client";

import { useSetAtom } from "jotai";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { clearAuthSession } from "@/lib/auth-actions";
import { accessTokenAtom } from "@/lib/auth-atoms";

export function LogoutButton() {
  const router = useRouter();
  const setToken = useSetAtom(accessTokenAtom);
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e8eb] px-4 py-3 text-sm font-semibold text-[#4e5968] transition hover:bg-[#f9fafb] enabled:active:scale-[0.99] disabled:opacity-60 sm:w-auto"
      onClick={() => {
        setBusy(true);
        void (async () => {
          await clearAuthSession(setToken);
          queryClient.removeQueries({ queryKey: ["auth", "me"] });
          router.push("/");
        })().finally(() => setBusy(false));
      }}
    >
      <LogOut className="h-4 w-4" />
      {busy ? "로그아웃 중…" : "로그아웃 (세션 삭제)"}
    </button>
  );
}
