"use client";

import { GripVertical, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RightPanelParts } from "@/components/novitas/right-panel/index";
import { aiReplies } from "@/lib/mock-data";
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
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string; time: string }[]
  >([
    {
      role: "ai",
      text: "안녕하세요! **semoso AI**예요.\n\n재고 부족이면 발주 후보부터 결제까지 한 흐름으로 같이 잡아볼게요.",
      time: "지금",
    },
    {
      role: "user",
      text: "분모자랑 마라 소스가 부족한 것 같은데, 두 품목만 주문부터 결제까지 한 번에 진행해 줄 수 있어?",
      time: "14:22",
    },
    {
      role: "ai",
      text:
        "**분모자·마라 소스** 둘 다 안전재고 아래로 내려가 있어요.\n\n**분모자**는 **쿠팡**에서 최저가·내일 오전 입고로 **3봉** 추천, **마라 소스**는 **마켓컬리**에서 **2병**이 가장 싸요.\n\n수량 확정하면 장바구니에 담고 **결제 단계까지** 같이 진행할 수 있어요. 지금 그대로 진행할까요?",
      time: "14:22",
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const replyIdx = useRef(0);
  const chatEnd = useRef<HTMLDivElement>(null);
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

  /** 드래그 중 다른 state로 리렌더되면 React style이 덮어쓰므로 ref 너비를 다시 적용 */
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
            "hidden shrink-0 lg:flex lg:w-3 lg:flex-col lg:items-center lg:justify-center lg:border-l lg:border-[var(--color-border)] lg:bg-[#f8f9f9]",
            "lg:cursor-col-resize lg:hover:bg-[#f5f3ff] lg:active:bg-[#ede9fe]",
          )}
        >
          <GripVertical className="h-5 w-5 text-[#b0b8c1]" aria-hidden />
        </button>
        <aside
          ref={asideRef}
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl max-lg:max-h-none max-lg:w-full",
            "lg:border-l lg:border-[var(--color-border)] lg:shadow-none",
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
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 lg:hidden">
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
        <div className="flex shrink-0 items-center border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
          <span className="text-sm font-bold text-[#191f28]">semoso AI</span>
        </div>

        <RightPanelParts.Chat
          messages={messages}
          thinking={thinking}
          input={input}
          onInputChange={setInput}
          onSend={send}
          chatEndRef={chatEnd}
        />
        </aside>
      </div>
    </>
  );
}
