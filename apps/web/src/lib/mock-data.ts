/** 백엔드와 맞출 처리 단계 id — 프로토콜 코드와 무관 */
export type ProcessStep = "stock" | "decide" | "purchase" | "record";

export const processStepStyles: Record<
  ProcessStep,
  { label: string; chip: string; dot: string; chipLabel: string }
> = {
  stock: {
    label: "text-[#3d6b57]",
    chip: "border border-[#bfe0d0] bg-[#e8f5ee] text-[#2d5244]",
    dot: "bg-[#6eb89a]",
    chipLabel: "재고",
  },
  decide: {
    label: "text-[#6b5a9e]",
    chip: "border border-[#ddd6fe] bg-[#f5f3ff] text-[#5b4d8f]",
    dot: "bg-[#b8a0e8]",
    chipLabel: "판단",
  },
  purchase: {
    label: "text-[#b45309]",
    chip: "border border-[#fed7aa] bg-[#fff7ed] text-[#9a3412]",
    dot: "bg-[#f0b885]",
    chipLabel: "발주",
  },
  record: {
    label: "text-[#1e6b8a]",
    chip: "border border-[#bae6fd] bg-[#f0f9ff] text-[#0c4a6e]",
    dot: "bg-[#7ec8e3]",
    chipLabel: "기록",
  },
};

export const agents = [
  {
    id: "inv",
    name: "재고 살피기",
    emoji: "🔍",
    step: "stock" as ProcessStep,
    desc: "품목이 부족하거나 이상하면 먼저 알려요",
    status: "running" as const,
    badge: "실행 중",
    badgeClass:
      "border border-[#c8e4d6] bg-[#f2faf6] text-[#2d5244]",
    stat: "15분마다 확인 · 마지막 확인 2분 전",
    pct: 72,
    bar: "bg-[#6eb89a]",
  },
  {
    id: "dec",
    name: "발주 판단",
    emoji: "🧠",
    step: "decide" as ProcessStep,
    desc: "수량·가격·납기를 보고 어디서 살지 정해요",
    status: "running" as const,
    badge: "분석 중",
    badgeClass:
      "border border-[#ddd6fe] bg-[#f5f3ff] text-[#5b4d8f]",
    stat: "대기 2건 · 오늘 판단 18번",
    pct: 45,
    bar: "bg-[#b8a0e8]",
  },
  {
    id: "ord",
    name: "발주·결제 진행",
    emoji: "🛒",
    step: "purchase" as ProcessStep,
    desc: "정한 공급처에 주문하고 결제까지 이어 가요",
    status: "busy" as const,
    badge: "처리 중",
    badgeClass:
      "border border-[#fed7aa] bg-[#fff7ed] text-[#9a3412]",
    stat: "진행 중 2건 · 오늘 완료 16건",
    pct: 88,
    bar: "bg-[#f0b885]",
  },
  {
    id: "aud",
    name: "기록·확인",
    emoji: "✅",
    step: "record" as ProcessStep,
    desc: "금액과 정한 규칙을 다시 확인하고 남겨요",
    status: "running" as const,
    badge: "실행 중",
    badgeClass:
      "border border-[#bae6fd] bg-[#f0f9ff] text-[#0c4a6e]",
    stat: "오늘 확인 34건 · 문제 0건",
    pct: 100,
    bar: "bg-[#7ec8e3]",
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
  step: ProcessStep;
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
const AGENT_BY_STEP: Record<ProcessStep, string> = {
  stock: "재고 살피기",
  decide: "발주 판단",
  purchase: "발주·결제 진행",
  record: "기록·확인",
};

/** 시드 500행 — 구매 내역·개요 테이블 공용 */
export const orders: OrderRow[] = Array.from({ length: 500 }, (_, i) => {
  const item = ORDER_ITEMS[i % ORDER_ITEMS.length];
  const step = (["stock", "decide", "purchase", "record"] as const)[i % 4];
  const supplier = SUPPLIERS[i % SUPPLIERS.length];
  const agent = AGENT_BY_STEP[step];
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
    step,
    supplier,
    agent,
    state,
    time,
  };
});

export type LogLine = {
  step: ProcessStep;
  src: string;
  msg: string;
  /** 표시용 시각 HH:mm:ss */
  t: string;
  /** 최신순 정렬용 (epoch ms) */
  ts: number;
};

type LogLineRaw = Omit<LogLine, "t" | "ts">;

const LOG_SRC: Record<ProcessStep, string> = {
  stock: "재고 살피기",
  decide: "발주 판단",
  purchase: "발주·결제",
  record: "기록·확인",
};

const SEED_LOGS_BASE: LogLineRaw[] = [
  {
    step: "stock",
    src: "재고 살피기",
    msg: "CJ 고메 크림치즈 200g 지금 6개밖에 안 남았어요. 긴급으로 알림 띄워뒀어요.",
  },
  {
    step: "decide",
    src: "발주 판단",
    msg: "CJ 고메 크림치즈는 12개로 발주안 잡아뒀어요.",
  },
  {
    step: "purchase",
    src: "발주·결제",
    msg: "이마트에 주문 넣고 있어요. 주문번호 2891이에요.",
  },
  {
    step: "record",
    src: "기록·확인",
    msg: "주문 2891 금액 ₩24,600 맞는지 확인했어요.",
  },
  {
    step: "stock",
    src: "재고 살피기",
    msg: "정기로 돌렸는데 품목 7개가 안전재고 밑이에요.",
  },
  {
    step: "decide",
    src: "발주 판단",
    msg: "오뚜기 토마토 파스타소스 발주안 만들고 다음 단계로 넘길게요.",
  },
  {
    step: "purchase",
    src: "발주·결제",
    msg: "SSG에 없어서 쿠팡으로 바꿔 발주했어요",
  },
  {
    step: "decide",
    src: "발주 판단",
    msg: "쿠팡으로 바꿔도 되는지 봤는데, 가격 차이는 허용 범위 안이에요.",
  },
  {
    step: "purchase",
    src: "발주·결제",
    msg: "쿠팡에 12개 발주 끝났어요. ₩58,800, 주문 2890이에요.",
  },
  {
    step: "record",
    src: "기록·확인",
    msg: "2890번 금액은 그대로예요. 기록만 해뒀어요.",
  },
  {
    step: "stock",
    src: "재고 살피기",
    msg: "델몬트 바나나 재고가 없어요. 긴급으로 올려뒀어요.",
  },
  {
    step: "decide",
    src: "발주 판단",
    msg: "긴급이니까 마켓컬리부터 보내기로 할게요.",
  },
  {
    step: "purchase",
    src: "발주·결제",
    msg: "마켓컬리 발주 끝났어요. 델몬트 바나나 20송이 ₩42,000, 주문 2889예요.",
  },
  {
    step: "record",
    src: "기록·확인",
    msg: "주문 2889 조건 맞는지 확인했어요.",
  },
];

function buildExtraSeedLogs(count: number): LogLineRaw[] {
  const steps: ProcessStep[] = ["stock", "decide", "purchase", "record"];
  const suppliers = ["마켓컬리", "쿠팡", "SSG.COM", "이마트", "홈플러스", "오아시스"];
  const out: LogLineRaw[] = [];
  for (let i = 0; i < count; i++) {
    const step = steps[i % 4];
    const src = LOG_SRC[step];
    const tpl = INV_TEMPLATES[i % INV_TEMPLATES.length];
    const oid = 2100 + (i % 850);
    const sup = suppliers[i % suppliers.length];
    const q = 1 + (i % 48);
    const price = ((i * 137) % 89000) + 1200;
    const k = i % 12;
    let msg: string;
    if (step === "stock") {
      if (k < 4)
        msg = `${tpl.name} 살펴봤는데 지금고 ${q}개예요. 안전재고 대비 여유가 ${(i % 40) + 20}% 정도예요.`;
      else if (k < 8)
        msg = `${tpl.name} 유통기한이 D-${(i % 14) + 1}이에요. 앞에 거부터 먼저 쓰는 게 좋겠어요.`;
      else
        msg = `정기로 돌려봤는데 ${tpl.name} 쪽은 안전재고 ${(i % 2) === 0 ? "밑이에요" : "주의 구간이에요"}. 알림 보내 둘게요.`;
    } else if (step === "decide") {
      const deltaPct = ((i % 5) * 0.4).toFixed(1);
      msg = [
        `${tpl.name} 후보로 ${sup}가 제일 나아 보여요. 신뢰도는 ${88 + (i % 11)}% 정도예요.`,
        `${tpl.name} 단가랑 리드타임 비교해 봤어요. 이제 어디로 갈지만 정하면 돼요.`,
        `브랜드랑 예산은 다 통과했어요. 발주 단계로 넘길게요.`,
        `${sup}로 가는 대체 경로 승인했어요. 가격은 ${deltaPct}% 정도만 올라가요.`,
      ][k % 4];
    } else if (step === "purchase") {
      msg = [
        `${sup}에 주문 넣었어요. 주문번호 ${oid}예요.`,
        `${oid}번 주문은 결제 대기 중이에요. ${tpl.name} ${q}개요.`,
        `${sup} 재고 확인했어요. 발주 확정할게요.`,
        `${sup} 답변이 ${(i % 3) === 0 ? "조금 늦어요" : "정상이에요"}. ${i % 2 === 0 ? "한번 더 시도했어요." : "그대로 진행할게요."}`,
      ][k % 4];
    } else {
      msg = [
        `주문 ${oid} 한도랑 맺어 둔 조건에 맞는지 확인했어요.`,
        `금액 ₩${price.toLocaleString("ko-KR")} 이렇게 기록해뒀어요.`,
        `정해 둔 규칙은 어긴 거 없어요.`,
        `주문 ${oid} 금액 이상 없어요. 다음으로 넘어갈게요.`,
      ][k % 4];
    }
    out.push({ step, src, msg });
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

const NOTIFICATION_CATEGORIES = ["재고", "발주", "자동 처리", "알림", "예산", "안내"] as const;

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
        `${name} 안전재고 밑이에요. 자동 발주 대기에 넣어뒀어요.`,
        `${sup}에 연락이 잘 안 돼요. 한번 직접 확인해 주세요.`,
        `${name} 유통기한 임박 · 폐기 위험`,
        `오늘 쓸 수 있는 예산의 90% 썼어요`,
      ][i % 4];
    } else if (severity === "success") {
      msg = [
        `주문 ${oid} 발주 확정 · ${name}`,
        `밤에 재고 한번 돌렸는데 특별한 건 없었어요 (#${i + 1})`,
        `${sup} 정산 맞춰 둠`,
        `기록 백업해 둠 · ${t}`,
      ][i % 4];
    } else {
      msg = [
        `${name} 재고 ${(i % 30) + 1}개 · 확인 주기 정상`,
        `${name} ${sup}에서 살기로 한 발주안이 대기 중이에요 (${i % 5}건 앞)`,
        `쿠팡 주문 응답이 평소보다 ${120 + (i % 200)}ms 느림`,
        `오늘 자동 발주 예산의 ${30 + (i % 50)}% 썼어요`,
        `자동 처리 단계 정상 · ${category}`,
        `공급처 계정 비밀번호 바꿀 때가 가까움 (알림)`,
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
    title: "재고 살피기",
    detail: "부족하거나 이상한 징후를 먼저 잡아요",
    status: "ok" as const,
    lastEvent: "방금 확인 끝 · 2분 전",
  },
  {
    id: "2",
    title: "발주 판단",
    detail: "어디서·얼마나 살지 정해요",
    status: "ok" as const,
    lastEvent: "오늘 18번 판단 · 대기 2건",
  },
  {
    id: "3",
    title: "발주·결제 진행",
    detail: "정한 공급처에 주문하고 결제까지 이어요",
    status: "busy" as const,
    lastEvent: "지금 2건 진행 중",
  },
  {
    id: "4",
    title: "기록·확인",
    detail: "금액과 규칙을 다시 보고 남겨요",
    status: "ok" as const,
    lastEvent: "오늘 34건 확인 · 문제 0건",
  },
];

export const aiReplies = [
  "지금은 <b>발주 판단</b> 단계에서 어느 공급처가 나은지 고르는 중이에요. 가격·배송·재고를 함께 보면서 정해요.",
  "오늘 자동 발주는 <b>성공 34건</b>, 실패 0건, 대기 2건이에요. (화면에 보이는 숫자는 예시예요.)",
  "실제 매장에선 공급처마다 주문 방식이 달라요. 여기서는 그걸 한 흐름으로 보여 주려는 <b>데모 화면</b>이에요.",
  "오늘 나간 발주 금액은 정해 둔 예산 안에 있어요. 이상한 금액은 따로 짚어 줄 수 있게 해 두었어요.",
  "재고는 15분마다 한 번씩 다시 봐요. 안전재고 아래로 떨어지면 알림을 보내고, 규칙대로면 자동 발주로 이어져요.",
  "순서는 <b>재고 살피기 → 발주 판단 → 발주·결제 → 기록·확인</b>이에요. 한 단계가 끝나야 다음으로 넘어가요.",
  "오늘은 서울우유·비비고 왕교자 같은 품목까지 합쳐 <b>₩84,720</b> 정도 자동 발주로 처리된 것으로 보여요. (샘플 데이터예요.)",
];
