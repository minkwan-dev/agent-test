"use client";

import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function DemoToast({
  message,
  variant = "success",
  onDismiss,
}: {
  message: string;
  variant?: "success" | "info";
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4200);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-6 left-1/2 z-[300] flex max-w-[min(100%,24rem)] -translate-x-1/2 items-start gap-3 rounded-xl border px-4 py-3 shadow-lg sm:left-auto sm:right-6 sm:translate-x-0",
        variant === "success"
          ? "border-emerald-200 bg-white text-[#191f28]"
          : "border-[#dbeafe] bg-white text-[#191f28]",
      )}
    >
      <CheckCircle2
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0",
          variant === "success" ? "text-emerald-600" : "text-[#3182f6]",
        )}
      />
      <p className="text-sm font-medium leading-snug">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded-lg p-1 text-[#8b95a1] hover:bg-[#f2f4f6] hover:text-[#191f28]"
        aria-label="닫기"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
