import { Bot, Send } from "lucide-react";
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
    <div className="flex min-h-0 flex-1 flex-col bg-[#f5f6f6]">
      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5f3ff] to-[#f8fafc] text-[#a78bfa]">
            <Bot className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </div>
          <p className="text-xs text-[#8b95a1]">
            semoso AI · 재고·발주 도우미
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
                  ? "rounded-br-md bg-[#a78bfa] text-white"
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
      <div className="shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-4">
        <label className="block">
          <span className="sr-only">메시지 입력</span>
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[#f8fafc] p-2 pl-3 shadow-[0_1px_2px_rgba(15,23,42,0.03)] ring-1 ring-[var(--color-border)]/60 transition",
              "focus-within:border-[#a78bfa]/70 focus-within:bg-white focus-within:shadow-md focus-within:ring-[#a78bfa]/18",
            )}
          >
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder="재고나 발주에 대해 물어보세요…"
              rows={1}
              className={cn(
                "max-h-[min(28vh,168px)] min-h-[44px] flex-1 resize-none overflow-y-auto",
                "border-0 bg-transparent py-2.5 text-sm leading-[1.5] text-[var(--color-foreground)]",
                "placeholder:text-[var(--color-muted)] outline-none",
              )}
            />
            <button
              type="button"
              onClick={onSend}
              disabled={!input.trim()}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white transition",
                "bg-[#a78bfa] shadow-sm hover:bg-[#8b5cf6] hover:shadow",
                "active:translate-y-px disabled:cursor-not-allowed disabled:bg-[#a78bfa]/35 disabled:text-white/90 disabled:shadow-none",
              )}
              aria-label="메시지 보내기"
            >
              <Send className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}
