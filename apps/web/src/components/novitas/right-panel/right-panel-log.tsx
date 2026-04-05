import type { ProcessStep } from "@/lib/mock-data";
import { processStepStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type LogRow = { id: string; step: ProcessStep; src: string; msg: string; t: string };

export function RightPanelLog({ logs }: { logs: LogRow[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f9fafb]">
      <div className="flex shrink-0 items-center gap-2 border-b border-[#e5e8eb] bg-white px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-[#7ec8e3]" />
        <span className="text-xs font-bold text-[#4e5968]">최근 처리</span>
        <span className="ml-auto text-[11px] text-[#8b95a1]">
          {logs.length}개
        </span>
      </div>
      <div className="scrollbar-thin flex-1 overflow-y-auto p-3">
        {logs.map((log) => (
          <div key={log.id} className="mb-4 flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-7 min-w-[1.75rem] items-center justify-center rounded-lg px-1 text-[10px] font-bold",
                  processStepStyles[log.step].chip,
                )}
              >
                {processStepStyles[log.step].chipLabel}
              </div>
              <div className="mt-1 min-h-[8px] w-px flex-1 bg-[#e5e8eb]" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs font-bold",
                    processStepStyles[log.step].label,
                  )}
                >
                  {log.src}
                </span>
                <span className="ml-auto text-[10px] text-[#8b95a1]">
                  {log.t}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#4e5968]">
                {log.msg}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
