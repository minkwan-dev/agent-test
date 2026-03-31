export type Proto = "MCP" | "A2A" | "UCP" | "AP2";

export const protoStyles: Record<
  Proto,
  { label: string; chip: string; dot: string }
> = {
  MCP: {
    label: "text-blue-700",
    chip: "border border-blue-200 bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
  },
  A2A: {
    label: "text-indigo-700",
    chip: "border border-indigo-200 bg-indigo-50 text-indigo-700",
    dot: "bg-indigo-500",
  },
  UCP: {
    label: "text-amber-800",
    chip: "border border-amber-200 bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
  },
  AP2: {
    label: "text-emerald-800",
    chip: "border border-emerald-200 bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
  },
};

export const agents = [
  {
    id: "inv",
    name: "InventoryWatcher",
    emoji: "🔍",
    proto: "MCP" as Proto,
    desc: "재고 모니터링 에이전트",
    status: "running" as const,
    badge: "실행 중",
    badgeClass:
      "border border-emerald-200 bg-emerald-50 text-emerald-800",
    stat: "감시 주기: 15분 · 마지막 스캔 2분 전",
    pct: 72,
    bar: "bg-blue-500",
  },
  {
    id: "dec",
    name: "PurchaseDecider",
    emoji: "🧠",
    proto: "A2A" as Proto,
    desc: "구매 의사결정 에이전트",
    status: "running" as const,
    badge: "분석 중",
    badgeClass:
      "border border-indigo-200 bg-indigo-50 text-indigo-800",
    stat: "대기 작업 2건 · 오늘 결정 18회",
    pct: 45,
    bar: "bg-indigo-500",
  },
  {
    id: "ord",
    name: "OrderExecutor",
    emoji: "🛒",
    proto: "UCP" as Proto,
    desc: "발주 실행 에이전트",
    status: "busy" as const,
    badge: "처리 중",
    badgeClass:
      "border border-amber-200 bg-amber-50 text-amber-900",
    stat: "현재 발주 진행 2건 · 오늘 완료 16건",
    pct: 88,
    bar: "bg-amber-500",
  },
  {
    id: "aud",
    name: "AuditLogger",
    emoji: "✅",
    proto: "AP2" as Proto,
    desc: "감사 & 검증 에이전트",
    status: "running" as const,
    badge: "실행 중",
    badgeClass:
      "border border-emerald-200 bg-emerald-50 text-emerald-800",
    stat: "오늘 검증 34건 · 오류 0건",
    pct: 100,
    bar: "bg-emerald-500",
  },
];

export type InventoryAlertRow = {
  id: string;
  icon: string;
  name: string;
  cur: number;
  max: number;
  level: "urgent" | "warn";
};

/** 쿠팡·컬리 상품명 스타일 (브랜드 + 규격) */
const INV_TEMPLATES: { icon: string; name: string; max: number }[] = [
  { icon: "🥛", name: "서울우유 흰우유 900ml", max: 24 },
  { icon: "🥛", name: "매일 상하목장 우유 930ml", max: 18 },
  { icon: "🍶", name: "매일바이오 플레인 요거트 400g", max: 14 },
  { icon: "🥟", name: "CJ 비비고 왕교자 1kg", max: 10 },
  { icon: "🧈", name: "풀무원 생가득 연두부 300g", max: 20 },
  { icon: "🍜", name: "오뚜기 진짬뽕 6개입", max: 12 },
  { icon: "🥐", name: "삼립 호빵 야채 8개입", max: 9 },
  { icon: "🥗", name: "[컬리] 마이셰프 시저 샐러드", max: 16 },
  { icon: "🍫", name: "롯데 제로 초콜릿 50g", max: 30 },
  { icon: "🐟", name: "동원참치 살코기 150g×3", max: 22 },
  { icon: "🍗", name: "하림 닭가슴살 슬라이스 800g", max: 8 },
  { icon: "☕", name: "프렌치카페 바닐라라떼 200ml×6", max: 15 },
  { icon: "🍪", name: "오리온 마켓오 브라우니 12입", max: 11 },
  { icon: "🧊", name: "풀무원 생가득 두부 300g", max: 18 },
  { icon: "🥩", name: "[쿠팡] 로켓프레시 한우 국거리 300g", max: 6 },
  { icon: "🍲", name: "비비고 사골곰탕 500g", max: 14 },
  { icon: "🍚", name: "CJ 햇반 210g×12", max: 20 },
  { icon: "🍝", name: "오뚜기 미트 스파게티 3개입", max: 10 },
  { icon: "🍦", name: "롯데 월드콘 베스트 멀티", max: 8 },
  { icon: "🥫", name: "오뚜기 토마토 파스타소스 600g", max: 12 },
  { icon: "🧀", name: "CJ 고메 크림치즈 200g", max: 9 },
  { icon: "🍙", name: "김밥용 김 100매", max: 7 },
  { icon: "🫐", name: "[컬리] 국내산 블루베리 125g", max: 13 },
  { icon: "🥒", name: "풀무원 아삭이 오이 3입", max: 16 },
];

/** 시드 500행 — 재고 현황·개요 테이블 공용 */
export const inventoryAlerts: InventoryAlertRow[] = Array.from({ length: 500 }, (_, i) => {
  const t = INV_TEMPLATES[i % INV_TEMPLATES.length];
  const lot = Math.floor(i / INV_TEMPLATES.length);
  const name = lot === 0 ? t.name : `${t.name} · 동일 SKU ${lot + 1}차`;
  const seed = (i * 47 + 13) % 997;
  const cur = Math.max(0, Math.min(t.max, (seed % (t.max + 4)) - 1));
  const ratio = t.max > 0 ? cur / t.max : 0;
  const level: "urgent" | "warn" = ratio < 0.38 ? "urgent" : "warn";
  return {
    id: `inv-${i + 1}`,
    icon: t.icon,
    name,
    cur,
    max: t.max,
    level,
  };
});

export type OrderRow = {
  id: string;
  icon: string;
  name: string;
  qty: string;
  price: string;
  proto: Proto;
  supplier: string;
  agent: string;
  state: "done" | "pending";
  time: string;
};

const ORDER_ITEMS: {
  icon: string;
  name: string;
  qty: string;
  basePrice: number;
}[] = [
  { icon: "🍌", name: "델몬트 바나나 1송이", qty: "20송이", basePrice: 42900 },
  { icon: "🍗", name: "하림 닭가슴살 슬라이스 800g", qty: "30팩", basePrice: 168000 },
  { icon: "🍝", name: "데체코 스파게티면 500g", qty: "15개", basePrice: 38250 },
  { icon: "🥫", name: "오뚜기 토마토 파스타소스 600g", qty: "12개", basePrice: 59400 },
  { icon: "🧈", name: "풀무원 생가득 연두부 300g", qty: "25모", basePrice: 51200 },
  { icon: "🥛", name: "서울우유 흰우유 900ml", qty: "24개", basePrice: 65200 },
  { icon: "🧀", name: "CJ 고메 크림치즈 200g", qty: "10개", basePrice: 45900 },
  { icon: "🍫", name: "롯데 제로 초콜릿 50g", qty: "40개", basePrice: 89600 },
  { icon: "🥣", name: "퀘이커 오트밀 오리지널 1kg", qty: "8봉", basePrice: 32800 },
  { icon: "🍙", name: "김밥용 김 100매", qty: "30팩", basePrice: 54800 },
  { icon: "🥩", name: "[쿠팡] 로켓프레시 한우 국거리 300g", qty: "6팩", basePrice: 91200 },
  { icon: "🍤", name: "사조 오양 새우튀김 400g", qty: "10봉", basePrice: 73600 },
  { icon: "🥗", name: "[컬리] 마이셰프 시저 샐러드", qty: "14개", basePrice: 99600 },
  { icon: "🫐", name: "[컬리] 국내산 블루베리 125g", qty: "8팩", basePrice: 114400 },
  { icon: "🧀", name: "앵커 모짜렐라 슬라이스 200g", qty: "20개", basePrice: 76800 },
  { icon: "🥟", name: "CJ 비비고 왕교자 1kg", qty: "8박스", basePrice: 124000 },
  { icon: "🐟", name: "동원참치 살코기 150g×3", qty: "24세트", basePrice: 88200 },
  { icon: "☕", name: "프렌치카페 바닐라라떼 200ml×6", qty: "18박스", basePrice: 71200 },
  { icon: "🍜", name: "오뚜기 진짬뽕 6개입", qty: "36개", basePrice: 45600 },
  { icon: "🍚", name: "CJ 햇반 210g×12", qty: "10박스", basePrice: 99800 },
];

const SUPPLIERS = ["마켓컬리", "쿠팡", "SSG.COM", "이마트", "홈플러스", "오아시스"] as const;
const AGENT_BY_PROTO: Record<Proto, string> = {
  MCP: "InventoryWatcher",
  A2A: "PurchaseDecider",
  UCP: "OrderExecutor",
  AP2: "AuditLogger",
};

/** 시드 500행 — 구매 내역·개요 테이블 공용 */
export const orders: OrderRow[] = Array.from({ length: 500 }, (_, i) => {
  const item = ORDER_ITEMS[i % ORDER_ITEMS.length];
  const proto = (["MCP", "A2A", "UCP", "AP2"] as const)[i % 4];
  const supplier = SUPPLIERS[i % SUPPLIERS.length];
  const agent = AGENT_BY_PROTO[proto];
  const variation = 85 + ((i * 17) % 30);
  const priceNum = Math.round((item.basePrice * variation) / 1000) * 1000;
  const hour = 8 + ((i * 3) % 12);
  const minute = (i * 7) % 60;
  const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  const state = i % 7 === 0 || i % 11 === 0 ? ("pending" as const) : ("done" as const);
  const dup = Math.floor(i / ORDER_ITEMS.length);
  const name = dup === 0 ? item.name : `${item.name} (추가발주 ${dup})`;
  return {
    id: `ord-${i + 1}`,
    icon: item.icon,
    name,
    qty: item.qty,
    price: `₩${priceNum.toLocaleString("ko-KR")}`,
    proto,
    supplier,
    agent,
    state,
    time,
  };
});

export type LogLine = {
  proto: Proto;
  src: string;
  msg: string;
  /** 표시용 시각 HH:mm:ss */
  t: string;
  /** 최신순 정렬용 (epoch ms) */
  ts: number;
};

type LogLineRaw = Omit<LogLine, "t" | "ts">;

const LOG_SRC: Record<Proto, string> = {
  MCP: "InventoryWatcher",
  A2A: "PurchaseDecider",
  UCP: "OrderExecutor",
  AP2: "AuditLogger",
};

const SEED_LOGS_BASE: LogLineRaw[] = [
  {
    proto: "MCP",
    src: "InventoryWatcher",
    msg: "CJ 고메 크림치즈 200g 재고 2개 감지 → 임계치(6) 미만, 긴급 알림 발송",
  },
  {
    proto: "A2A",
    src: "PurchaseDecider",
    msg: "CJ 고메 크림치즈 구매 결정: 12개 승인 (신뢰도 94%)",
  },
  {
    proto: "UCP",
    src: "OrderExecutor",
    msg: "이마트 API 호출 → 주문 생성 중 ORDER-2891",
  },
  {
    proto: "AP2",
    src: "AuditLogger",
    msg: "ORDER-2891 감사 통과 — ₩24,600 검증 완료",
  },
  {
    proto: "MCP",
    src: "InventoryWatcher",
    msg: "정기 스캔 완료 — 7개 품목 임계치 이하",
  },
  {
    proto: "A2A",
    src: "PurchaseDecider",
    msg: "오뚜기 토마토 파스타소스 구매 결정 → OrderExecutor에 전달",
  },
  {
    proto: "UCP",
    src: "OrderExecutor",
    msg: "SSG 재고 부족 감지 → 쿠팡으로 자동 라우팅",
  },
  {
    proto: "A2A",
    src: "PurchaseDecider",
    msg: "대체 공급업체 쿠팡 승인 (+3.2% 가격 허용 범위 내)",
  },
  {
    proto: "UCP",
    src: "OrderExecutor",
    msg: "쿠팡 발주 성공 12개 ₩58,800 (ORDER-2890)",
  },
  {
    proto: "AP2",
    src: "AuditLogger",
    msg: "ORDER-2890 가격 이상 없음 — 레코드 저장",
  },
  {
    proto: "MCP",
    src: "InventoryWatcher",
    msg: "델몬트 바나나 1송이 재고 0개 감지 → 긴급 발주 플래그",
  },
  {
    proto: "A2A",
    src: "PurchaseDecider",
    msg: "긴급 주문 — 마켓컬리 우선 공급업체 선택",
  },
  {
    proto: "UCP",
    src: "OrderExecutor",
    msg: "마켓컬리 발주 완료 · 델몬트 바나나 20송이 ₩42,000 (ORDER-2889)",
  },
  {
    proto: "AP2",
    src: "AuditLogger",
    msg: "ORDER-2889 검증 완료 — 공급업체 계약 조건 충족",
  },
];

function buildExtraSeedLogs(count: number): LogLineRaw[] {
  const protos: Proto[] = ["MCP", "A2A", "UCP", "AP2"];
  const suppliers = ["마켓컬리", "쿠팡", "SSG.COM", "이마트", "홈플러스", "오아시스"];
  const out: LogLineRaw[] = [];
  for (let i = 0; i < count; i++) {
    const proto = protos[i % 4];
    const src = LOG_SRC[proto];
    const tpl = INV_TEMPLATES[i % INV_TEMPLATES.length];
    const oid = 2100 + (i % 850);
    const sup = suppliers[i % suppliers.length];
    const q = 1 + (i % 48);
    const price = ((i * 137) % 89000) + 1200;
    const k = i % 12;
    let msg: string;
    if (proto === "MCP") {
      if (k < 4) msg = `[스캔 #${i + 1}] ${tpl.name} 현재고 ${q} · 안전재고 대비 ${(i % 40) + 20}%`;
      else if (k < 8) msg = `${tpl.name} 유통기한 D-${(i % 14) + 1} — 선출고 권장`;
      else msg = `정기 스캔: ${tpl.name} 임계치 ${(i % 2) === 0 ? "이하" : "주의 구간"} · 알림 #${100 + i}`;
    } else if (proto === "A2A") {
      msg = [
        `${tpl.name} 후보 ${sup} 선정 (신뢰도 ${88 + (i % 11)}%)`,
        `배치 #${Math.floor(i / 20)}: ${tpl.name} 단가·리드타임 비교 완료`,
        `정책 필터: 브랜드·예산 통과 → OrderExecutor로 전달`,
        `대체 경로: ${sup} 승인 (Δ가격 +${(i % 5) * 0.4}%)`,
      ][k % 4];
    } else if (proto === "UCP") {
      msg = [
        `${sup} API POST /orders → ORDER-${oid} 생성`,
        `ORDER-${oid} 결제 대기 · ${tpl.name} ${q}개`,
        `${sup} 재고 확인 200 · 발주 확정`,
        `채널 ${sup} 응답 ${(i % 3) === 0 ? "지연" : "정상"} · 재시도 ${i % 2}`,
      ][k % 4];
    } else {
      msg = [
        `ORDER-${oid} 한도·계약 조건 검증 OK`,
        `금액 ₩${price.toLocaleString("ko-KR")} · 감사 레코드 저장`,
        `정책 위반 0건 · 서명 해시 기록`,
        `ORDER-${oid} 가격 이상 감지 없음 — 승인`,
      ][k % 4];
    }
    out.push({ proto, src, msg });
  }
  return out;
}

function assignLogTimestamps(lines: LogLineRaw[]): LogLine[] {
  const now = Date.now();
  const gapMs = 850;
  const n = lines.length;
  return lines.map((l, i) => {
    const ts = now - (n - 1 - i) * gapMs;
    const t = new Date(ts).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return { ...l, ts, t };
  });
}

/** 전체 로그·우측 패널 시드 — 기본 14건 + 생성 600건 (최신이 배열 끝) */
export const seedLogs: LogLine[] = assignLogTimestamps([
  ...SEED_LOGS_BASE,
  ...buildExtraSeedLogs(600),
]);

export type NotificationSeverity = "urgent" | "info" | "success";

export type NotificationRow = {
  id: string;
  t: string;
  msg: string;
  severity: NotificationSeverity;
  category: string;
};

const NOTIFICATION_CATEGORIES = ["재고", "발주", "에이전트", "연동", "예산", "시스템"] as const;

function buildNotifications(total: number): NotificationRow[] {
  const out: NotificationRow[] = [];
  for (let i = 0; i < total; i++) {
    const hour = 6 + Math.floor(i / 18) % 16;
    const min = (i * 11) % 60;
    const t = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    const category = NOTIFICATION_CATEGORIES[i % NOTIFICATION_CATEGORIES.length];
    const severity: NotificationSeverity =
      i % 23 === 0 ? "urgent" : i % 7 === 0 ? "success" : "info";
    const name = INV_TEMPLATES[i % INV_TEMPLATES.length].name;
    const oid = 2800 + (i % 400);
    const sup = ["마켓컬리", "쿠팡", "SSG", "이마트"][i % 4];
    let msg: string;
    if (severity === "urgent") {
      msg = [
        `${name} 긴급 임계치 이하 — 자동 발주 큐에 넣었어요`,
        `${sup} 연동 타임아웃 3회 — 수동 확인 필요`,
        `${name} 유통기한 임박 · 폐기 위험`,
        `예산 일일 한도 90% 도달`,
      ][i % 4];
    } else if (severity === "success") {
      msg = [
        `ORDER-${oid} 발주 확정 · ${name}`,
        `야간 스캔 완료 — 이상 없어요 (#${i + 1})`,
        `${sup} 정산 동기화 완료`,
        `감사 로그 백업 완료 · ${t}`,
      ][i % 4];
    } else {
      msg = [
        `${name} 재고 ${(i % 30) + 1}개 · 스캔 주기 정상`,
        `PurchaseDecider: ${name} 후보 ${sup} (대기 ${i % 5})`,
        `쿠팡 API p95 ${120 + (i % 200)}ms`,
        `일일 자동구매 예산 ${30 + (i % 50)}% 사용 중`,
        `에이전트 하트비트 OK · ${category}`,
        `연동 키 만료 D-${20 - (i % 15)} (알림)`,
      ][i % 6];
    }
    out.push({
      id: `n-${i + 1}`,
      t,
      msg,
      severity,
      category,
    });
  }
  return out;
}

/** 알림 목록 250건 */
export const notifications: NotificationRow[] = buildNotifications(250);

export const flowPipeline = [
  {
    id: "1",
    title: "InventoryWatcher",
    detail: "MCP · 재고 스캔 / 임계치 감지",
    latencyMs: 120,
    status: "ok" as const,
    lastEvent: "스캔 완료 · 2분 전",
  },
  {
    id: "2",
    title: "PurchaseDecider",
    detail: "A2A · 구매 의사결정",
    latencyMs: 890,
    status: "ok" as const,
    lastEvent: "결정 18회 · 대기 2건",
  },
  {
    id: "3",
    title: "OrderExecutor",
    detail: "UCP · 공급업체 발주",
    latencyMs: 2100,
    status: "busy" as const,
    lastEvent: "발주 진행 2건",
  },
  {
    id: "4",
    title: "AuditLogger",
    detail: "AP2 · 감사·검증",
    latencyMs: 45,
    status: "ok" as const,
    lastEvent: "검증 34건 · 오류 0",
  },
];

export const aiReplies = [
  "현재 PurchaseDecider(A2A) 에이전트가 최적 공급업체를 자동 선택 중이에요. 가격·배송속도·재고 가용성을 종합해 보통 2초 이내로 결정해요.",
  "오늘 자동구매 성공률은 <b>100%</b>예요. 34건 중 0건 실패, 2건이 대기 상태예요.",
  "UCP 프로토콜은 외부 공급업체 API와 통신할 때 써요. 현재 마켓컬리·쿠팡·SSG·이마트 4개 채널이 연결되어 있어요.",
  "AP2 감사 로그 기준 오늘 모든 발주가 예산 범위 안에서 처리됐어요. 가격 이상 감지 0건이에요.",
  "재고 스캔은 15분마다 돌아가요. 긴급 임계치 이하 품목은 바로 알림과 자동 발주가 트리거돼요.",
  "A2A 프로토콜은 에이전트 간 직접 통신을 맡아요. InventoryWatcher → PurchaseDecider → OrderExecutor 순서로 신호가 전달돼요.",
  "오늘 총 4개 에이전트가 쉬지 않고 돌아가고 있어요. 서울우유·비비고 왕교자 등 포함, 오류 없이 84,720원어치를 자동 구매 처리했어요.",
];
