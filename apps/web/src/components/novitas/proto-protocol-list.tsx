"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Row = { name: string; on: boolean; note: string };

const defaultRows: Row[] = [
  { name: "MCP", on: true, note: "재고·도구 호출" },
  { name: "A2A", on: true, note: "에이전트 간 메시지" },
  { name: "UCP", on: true, note: "공급업체 API" },
  { name: "AP2", on: true, note: "감사 로그" },
];

export function ProtoProtocolList() {
  const [rows, setRows] = useState<Row[]>(defaultRows);

  const toggle = (name: string) => {
    setRows((prev) =>
      prev.map((r) => (r.name === name ? { ...r, on: !r.on } : r)),
    );
  };

  return (
    <div className="w-full divide-y divide-[#e5e8eb] rounded-xl border border-[#e5e8eb] bg-white shadow-sm">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#191f28]">{r.name}</p>
            <p className="text-xs text-[#8b95a1]">{r.note}</p>
          </div>
          <button
            type="button"
            onClick={() => toggle(r.name)}
            className={cnToggle(r.on)}
            aria-pressed={r.on}
          >
            {r.on ? "사용" : "끔"}
          </button>
        </div>
      ))}
      <p className="px-4 py-3 text-center text-xs text-[#8b95a1]">
        변경 사항은 브라우저 세션에만 반영돼요. 서버와 연동하면 계정에 저장돼요.
      </p>
    </div>
  );
}

function cnToggle(on: boolean) {
  return on
    ? "shrink-0 rounded-full bg-[#e8f3ff] px-3 py-1.5 text-xs font-bold text-[#3182f6] transition hover:bg-[#d9ebff]"
    : "shrink-0 rounded-full bg-[#f2f4f6] px-3 py-1.5 text-xs font-semibold text-[#8b95a1] transition hover:bg-[#e5e8eb]";
}
