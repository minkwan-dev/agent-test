"use client";

import { GripVertical, MessageSquare, Radio, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RightPanelParts } from "@/components/novitas/right-panel/index";
import { aiReplies, seedLogs, type ProcessStep } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PANEL_WIDTH_KEY = "novitas.panelWidth.v1";
const MIN_PANEL_W = 260;
const MAX_PANEL_W = 640;
/** 저장·초기 기본 패널 너비 */
const DEFAULT_PANEL_W = 320;
/** 이 너비를 넘겨야 겹침 모드(그 전에는 flex로 본문과 나란히 — 너무 빨리 덮이지 않게) */
const PANEL_OVERLAY_THRESHOLD = 420;
/** 드래그 핸들 너비(lg:w-3) — 본문 가로 스크롤 폭 계산에 포함 */
const GRIP_W_PX = 12;

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

const liveTemplates: { step: ProcessStep; src: string; msg: string }[] = [
  { step: "stock", src: "재고 살피기", msg: "한 바퀴 돌아봤는데 눈에 띄는 건 없었어요." },
  { step: "decide", src: "발주 판단", msg: "가격이랑 납기 보고 어디서 살지 정해볼게요." },
  { step: "purchase", src: "발주·결제", msg: "지금 공급처에 주문 넣어볼게요." },
  { step: "record", src: "기록·확인", msg: "금액이랑 정한 규칙 다시 한번 맞춰볼게요." },
];

export function RightPanel({
  mobileOpen,
  onMobileClose,
  onLgOverlayMetrics,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
  /** 겹침 여부 + 패널(그립+본체) 픽셀 너비 — 본문에 calc(100% + width)로 가로 스크롤 여유 */
  onLgOverlayMetrics?: (state: { overlaps: boolean; widthPx: number }) => void;
}) {
  const [tab, setTab] = useState<Tab>("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string; time: string }[]
  >([
    {
      role: "ai",
      text: "안녕하세요! **semoso AI**예요.\n\n재고, 자동 발주, 구매 내역 같은 걸 편하게 물어보세요. (답은 화면에 맞춰 둔 예시예요.)",
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
        "**서울우유 흰우유 900ml**\n\n지금 **4개**라서 안전재고(24개)보다 많이 부족해요.\n\n13:05에 재고 살피기에서 잡혔고, 발주 판단을 거쳐 마켓컬리에 **24개 발주**가 진행 중으로 보여요.\n\n입고는 **오늘 저녁 무렵**으로 잡혀 있어요. (실제 연동은 매장 설정에 따라 달라요.)",
      time: "14:22",
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const [logs, setLogs] = useState<
    { id: string; step: ProcessStep; src: string; msg: string; t: string }[]
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
  /** lg에서 panelWidth > PANEL_OVERLAY_THRESHOLD → 본문 위 오버레이 */
  const [lgOverlaps, setLgOverlaps] = useState(false);

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

  useEffect(() => {
    if (!isLg) {
      setLgOverlaps(false);
      onLgOverlayMetrics?.({ overlaps: false, widthPx: 0 });
      return;
    }
    const overlaps = panelWidth > PANEL_OVERLAY_THRESHOLD;
    setLgOverlaps(overlaps);
    const widthPx = overlaps ? GRIP_W_PX + panelWidth : 0;
    onLgOverlayMetrics?.({ overlaps, widthPx });
  }, [isLg, panelWidth, onLgOverlayMetrics]);

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
        const overlaps = next > PANEL_OVERLAY_THRESHOLD;
        setLgOverlaps(overlaps);
        onLgOverlayMetrics?.({
          overlaps,
          widthPx: overlaps ? GRIP_W_PX + next : 0,
        });
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
    [isLg, applyPanelWidthDom, onLgOverlayMetrics],
  );

  useEffect(() => {
    const recent = seedLogs.slice(-50);
    const initial = recent.map((l, idx) => ({
      id: `s-${idx}`,
      step: l.step,
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
            step: tpl.step,
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
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:translate-x-full",
          "max-lg:fixed max-lg:inset-y-0 max-lg:right-0 max-lg:top-14 max-lg:z-[200] max-lg:h-[calc(100dvh-3.5rem)] max-lg:flex-col",
          "lg:min-h-0 lg:translate-x-0 lg:flex-row",
          lgOverlaps
            ? "lg:absolute lg:inset-y-0 lg:right-0 lg:z-[50] lg:h-full lg:shadow-[-12px_0_32px_-8px_rgba(15,23,42,0.12)]"
            : "lg:static lg:z-auto lg:self-stretch lg:shadow-none",
        )}
      >
        <button
          type="button"
          aria-label="패널 너비 조절"
          title="드래그하여 너비 조절"
          onMouseDown={onResizeStart}
          className={cn(
            "hidden shrink-0 lg:flex lg:w-3 lg:flex-col lg:items-center lg:justify-center lg:border-l lg:border-[#e5e8eb] lg:bg-[#fafbfc]",
            "lg:cursor-col-resize lg:hover:bg-[#e8f5ee] lg:active:bg-[#c8e4d6]",
          )}
        >
          <GripVertical className="h-5 w-5 text-[#b0b8c1]" aria-hidden />
        </button>
        <aside
          ref={asideRef}
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col border-l border-[#e5e8eb] bg-white shadow-xl max-lg:max-h-none max-lg:w-full",
            "lg:border-l lg:border-[#e5e8eb] lg:shadow-none",
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
                ? "border-[#6eb89a] text-[#191f28]"
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
                ? "border-[#6eb89a] text-[#191f28]"
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
