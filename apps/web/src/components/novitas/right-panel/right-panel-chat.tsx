import type { RefObject } from "react";
import { AiMessageContent } from "@/components/novitas/right-panel/ai-message-content";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "ai"; text: string; time: string };

type RightPanelChatProps = {
  messages: Msg[];
  thinking: boolean;
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  chatEndRef: RefObject<HTMLDivElement | null>;
};

export function RightPanelChat({
  messages,
  thinking,
  input,
  onInputChange,
  onSend,
  chatEndRef,
}: RightPanelChatProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f9fafb]">
      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff6ff] text-2xl">
            🤖
          </div>
          <p className="text-xs text-[#8b95a1]">
            Novitas AI · 재고/에이전트 전문
          </p>
        </div>
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-1",
              m.role === "user" ? "items-end" : "items-start",
            )}
          >
            <div
              className={cn(
                "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "rounded-br-md bg-[#3182f6] text-white"
                  : "rounded-bl-md border border-[#e5e8eb] bg-white text-[#191f28]",
              )}
            >
              {m.role === "ai" ? <AiMessageContent text={m.text} /> : m.text}
            </div>
            <span
              className={cn(
                "text-[10px] text-[#8b95a1]",
                m.role === "user" && "text-right",
              )}
            >
              {m.time}
            </span>
          </div>
        ))}
        {thinking && (
          <div className="flex w-fit items-center gap-1.5 rounded-2xl border border-[#e5e8eb] bg-white px-4 py-3">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b95a1]"
                style={{ animationDelay: `${d * 150}ms` }}
              />
            ))}
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="flex shrink-0 gap-2 border-t border-[#e5e8eb] bg-white p-3">
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="에이전트나 재고에 대해 질문하세요..."
          rows={2}
          className="min-h-[44px] flex-1 resize-none rounded-xl border border-[#e5e8eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#191f28] placeholder:text-[#8b95a1] outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6]/30"
        />
        <button
          type="button"
          onClick={onSend}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3182f6] text-white transition hover:bg-[#256dd4]"
          aria-label="전송"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
