"use client";

import { GripVertical, MessageSquare, Radio, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RightPanelParts } from "@/components/novitas/right-panel/index";
import { aiReplies, seedLogs, type Proto } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PANEL_WIDTH_KEY = "novitas.panelWidth.v1";
const MIN_PANEL_W = 260;
const MAX_PANEL_W = 640;
const DEFAULT_PANEL_W = 320;

function clampPanelW(n: number) {
  return Math.max(MIN_PANEL_W, Math.min(MAX_PANEL_W, Math.round(n)));
}

function readStoredWidth(): number {
  if (typeof window === "undefined") return DEFAULT_PANEL_W;
  try {
    const raw = localStorage.getItem(PANEL_WIDTH_KEY);
    if (!raw) return DEFAULT_PANEL_W;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? clampPanelW(n) : DEFAULT_PANEL_W;
  } catch {
    return DEFAULT_PANEL_W;
  }
}

type Tab = "chat" | "log";

const liveTemplates: { proto: Proto; src: string; msg: string }[] = [
  { proto: "MCP", src: "InventoryWatcher", msg: "재고 스캔 완료 — 이상 없음" },
  { proto: "A2A", src: "PurchaseDecider", msg: "구매 결정 알고리즘 갱신 중..." },
  { proto: "UCP", src: "OrderExecutor", msg: "공급업체 API 응답 수신 — 200 OK" },
  { proto: "AP2", src: "AuditLogger", msg: "감사 레코드 갱신 완료" },
];

export function RightPanel({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string; time: string }[]
  >([
    {
      role: "ai",
      text: "안녕하세요! **Novitas AI**예요.\n\n재고 현황, 에이전트 상태, 구매 내역, 프로토콜 동작 등 무엇이든 물어보세요.",
      time: "지금",
    },
    {
      role: "user",
      text: "서울우유 흰우유 재고 왜 이렇게 적어?",
      time: "14:22",
    },
    {
      role: "ai",
      text:
        "**서울우유 흰우유 900ml 재고 분석**\n\n현재 **4개**로 안전재고(24개) 대비 **17%** 수준이에요.\n\nInventoryWatcher(MCP)가 13:05에 감지 → PurchaseDecider(A2A)가 즉시 구매 결정 → OrderExecutor가 마켓컬리에 **24개 발주 진행 중**이에요.\n\n예상 입고는 **오늘 18:00~20:00 로켓배송** 기준이에요.",
      time: "14:22",
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const [logs, setLogs] = useState<
    { id: string; proto: Proto; src: string; msg: string; t: string }[]
  >([]);
  const replyIdx = useRef(0);
  const chatEnd = useRef<HTMLDivElement>(null);
  const liveIdx = useRef(0);
  const panelWidthRef = useRef(DEFAULT_PANEL_W);
  const asideRef = useRef<HTMLElement | null>(null);
  const resizeRafRef = useRef(0);
  const draggingResizeRef = useRef(false);

  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_W);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    setPanelWidth(readStoredWidth());
    panelWidthRef.current = readStoredWidth();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsLg(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    panelWidthRef.current = panelWidth;
  }, [panelWidth]);

  /** 드래그 중 다른 state(로그 등)로 리렌더되면 React style이 덮어쓰므로 ref 너비를 다시 적용 */
  useLayoutEffect(() => {
    if (!draggingResizeRef.current || !asideRef.current) return;
    asideRef.current.style.width = `${panelWidthRef.current}px`;
  });

  const applyPanelWidthDom = useCallback((w: number) => {
    const el = asideRef.current;
    if (el) el.style.width = `${w}px`;
  }, []);

  const onResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (!isLg) return;
      e.preventDefault();
      const startX = e.clientX;
      const startW = panelWidthRef.current;
      draggingResizeRef.current = true;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const onMove = (ev: MouseEvent) => {
        const delta = ev.clientX - startX;
        const next = clampPanelW(startW - delta);
        panelWidthRef.current = next;
        cancelAnimationFrame(resizeRafRef.current);
        resizeRafRef.current = requestAnimationFrame(() => {
          applyPanelWidthDom(next);
        });
      };
      const onUp = () => {
        draggingResizeRef.current = false;
        cancelAnimationFrame(resizeRafRef.current);
        resizeRafRef.current = 0;
        const finalW = panelWidthRef.current;
        setPanelWidth(finalW);
        applyPanelWidthDom(finalW);
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        try {
          localStorage.setItem(PANEL_WIDTH_KEY, String(finalW));
        } catch {
          /* ignore */
        }
      };
      document.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseup", onUp);
    },
    [isLg, applyPanelWidthDom],
  );

  useEffect(() => {
    const recent = seedLogs.slice(-50);
    const initial = recent.map((l, idx) => ({
      id: `s-${idx}`,
      proto: l.proto,
      src: l.src,
      msg: l.msg,
      t: l.t,
    }));
    setLogs(initial);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const tpl = liveTemplates[liveIdx.current % liveTemplates.length];
      liveIdx.current++;
      const t = new Date().toTimeString().slice(0, 8);
      setLogs((prev) => {
        const next = [
          {
            id: `l-${Date.now()}`,
            proto: tpl.proto,
            src: tpl.src,
            msg: tpl.msg,
            t,
          },
          ...prev,
        ];
        return next.slice(0, 50);
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    if (!mobileOpen || isLg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onMobileClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, isLg, onMobileClose]);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setInput("");
    setMessages((m) => [...m, { role: "user", text, time: now }]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      const raw = aiReplies[replyIdx.current % aiReplies.length];
      replyIdx.current++;
      setMessages((m) => [
        ...m,
        { role: "ai", text: raw.replace(/<b>/g, "**").replace(/<\/b>/g, ""), time: now },
      ]);
    }, 900 + Math.random() * 400);
  }, [input]);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[199] cursor-default bg-black/25 lg:hidden"
          aria-label="패널 닫기"
          onClick={onMobileClose}
        />
      )}
      <div
        className={cn(
          "flex h-full shrink-0 max-lg:w-full max-lg:max-w-[400px]",
          "lg:min-h-0 lg:self-stretch",
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:translate-x-full",
          "max-lg:fixed max-lg:inset-y-0 max-lg:right-0 max-lg:top-14 max-lg:z-[200] max-lg:h-[calc(100dvh-3.5rem)] max-lg:flex-col",
          "lg:static lg:z-auto lg:translate-x-0 lg:flex-row",
        )}
      >
        <button
          type="button"
          aria-label="패널 너비 조절"
          title="드래그하여 너비 조절"
          onMouseDown={onResizeStart}
          className={cn(
            "hidden shrink-0 lg:flex lg:w-3 lg:flex-col lg:items-center lg:justify-center lg:border-l lg:border-[#e5e8eb] lg:bg-[#fafbfc]",
            "lg:cursor-col-resize lg:hover:bg-[#eff6ff] lg:active:bg-[#dbeafe]",
          )}
        >
          <GripVertical className="h-5 w-5 text-[#b0b8c1]" aria-hidden />
        </button>
        <aside
          ref={asideRef}
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col border-l border-[#e5e8eb] bg-white shadow-xl max-lg:max-h-none max-lg:w-full",
            "lg:border-l-0 lg:shadow-none",
          )}
          style={
            isLg
              ? {
                  width: panelWidth,
                  flex: "0 0 auto",
                  maxWidth: "min(50vw, 640px)",
                }
              : undefined
          }
        >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#e5e8eb] bg-white px-2 py-2 lg:hidden">
          <span className="min-w-0 truncate pl-1 text-sm font-semibold text-[#191f28]">
            AI 패널
          </span>
          <button
            type="button"
            onClick={onMobileClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#4e5968] transition hover:bg-[#f2f4f6] active:bg-[#e5e8eb]"
            aria-label="패널 닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex shrink-0 border-b border-[#e5e8eb] bg-white">
          <button
            type="button"
            onClick={() => setTab("chat")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-b-2 py-3.5 text-sm font-bold transition",
              tab === "chat"
                ? "border-[#3182f6] text-[#191f28]"
                : "border-transparent text-[#8b95a1] hover:text-[#191f28]",
            )}
          >
            <MessageSquare className="h-4 w-4" />
            AI 어시스턴트
          </button>
          <button
            type="button"
            onClick={() => setTab("log")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-b-2 py-3.5 text-sm font-bold transition",
              tab === "log"
                ? "border-[#3182f6] text-[#191f28]"
                : "border-transparent text-[#8b95a1] hover:text-[#191f28]",
            )}
          >
            <Radio className="h-4 w-4" />
            플로우 로그
          </button>
        </div>

        {tab === "chat" && (
          <RightPanelParts.Chat
            messages={messages}
            thinking={thinking}
            input={input}
            onInputChange={setInput}
            onSend={send}
            chatEndRef={chatEnd}
          />
        )}

        {tab === "log" && <RightPanelParts.Log logs={logs} />}
        </aside>
      </div>
    </>
  );
}
