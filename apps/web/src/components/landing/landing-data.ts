import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Radio,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

export const landingProtocols: {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  points: string[];
  icon: LucideIcon;
}[] = [
  {
    id: "MCP",
    title: "MCP",
    subtitle: "Model Context Protocol",
    desc: "재고·도구 호출을 표준화해 에이전트가 POS·WMS·스프레드시트와 안전하게 연동해요. 스키마가 바뀌어도 어댑터만 갈아 끼우면 돼요.",
    points: ["도구 호출 단일 포맷", "권한·감사 추적에 유리"],
    icon: Radio,
  },
  {
    id: "A2A",
    title: "A2A",
    subtitle: "Agent-to-Agent",
    desc: "에이전트 간 메시지로 의사결정·우선순위·예외 처리를 분산 없이 전달해요. 사람 개입이 필요한 경우에만 큐에 남겨요.",
    points: ["역할 분리·확장 용이", "장애 시 부분 재시도"],
    icon: MessageSquare,
  },
  {
    id: "UCP",
    title: "UCP",
    subtitle: "Universal Commerce",
    desc: "마켓컬리·쿠팡·SSG 등 공급 채널 API를 한 파이프라인에서 발주·확정해요. 품절·지연 시 자동으로 대체 루트를 탐색해요.",
    points: ["채널별 정책 캡슐화", "발주 실패 복구"],
    icon: ShoppingCart,
  },
  {
    id: "AP2",
    title: "AP2",
    subtitle: "Audit & Policy",
    desc: "금액·한도·계약 조건을 자동 검증하고 감사 로그로 남겨요. 운영·컴플라이언스 리뷰에 필요한 근거를 한곳에 모아요.",
    points: ["정책 위반 차단", "감사 추적 가능"],
    icon: ShieldCheck,
  },
];

export const landingFlowSteps = [
  {
    n: "01",
    title: "재고 스캔",
    body: "InventoryWatcher가 주기적으로 임계치·유통기한·소진 속도를 점검해요. 긴급 구간에 들어가면 알림과 동시에 결정 에이전트에 시그널을 보내요.",
    tag: "실시간 감시",
  },
  {
    n: "02",
    title: "구매 결정",
    body: "PurchaseDecider가 가격·리드타임·신뢰도·과거 이슈를 묶어 최적 발주안을 만들어요. 예산·브랜드 정책은 이 단계에서 필터링돼요.",
    tag: "정책 반영",
  },
  {
    n: "03",
    title: "발주 실행",
    body: "OrderExecutor가 채널별 API로 주문을 넣고, 실패·지연 시 대체 루트로 전환해요. 재시도·큐잉은 이 레이어에서 처리해요.",
    tag: "채널 실행",
  },
  {
    n: "04",
    title: "감사·알림",
    body: "AuditLogger가 한도·정책·금액 이상을 검증하고, 대시보드·슬랙·메일 등으로 결과를 밀어 넣어요. 모든 단계가 로그에 남아요.",
    tag: "검증·통지",
  },
] as const;

export const landingFaqs = [
  {
    q: "기존 ERP나 재고 시스템과 연동할 수 있나요?",
    a: "MCP 어댑터와 웹훅으로 연동하는 것을 전제로 설계되어 있어요. 초기에는 CSV·스프레드시트 수동 입력으로 시작하고, 안정화 후 API로 옮기는 로드맵을 권장해요.",
  },
  {
    q: "실제 결제·주문까지 자동으로 나가나요?",
    a: "초기에는 이중 승인·일일 한도·키 로테이션·모의 발주(드라이런) 모드를 붙여 단계적으로 전개하는 편이 안전해요.",
  },
  {
    q: "에이전트는 몇 개까지 쓸 수 있나요?",
    a: "기본 구성은 4종(감시·결정·실행·감사) 기준이에요. 지역·카테고리별로 감시 에이전트를 늘리거나, 결정을 세분화해 확장할 수 있어요.",
  },
  {
    q: "데이터는 어디에 저장되나요?",
    a: "브라우저 세션과 서버 저장소를 함께 쓰고, 운영에서는 API·DB 보관 정책을 따르면 돼요. 민감 필드는 필드 단위 암호화·마스킹을 고려해 주세요.",
  },
  {
    q: "장애 시 어떻게 되나요?",
    a: "채널 API 장애는 재시도·대체 공급사로 우회하고, 결정 단계에서 보류할 수 있어요. 감사 로그에 원인 코드가 남도록 설계하는 편이 운영에 유리해요.",
  },
];

export const landingStatsGrid = [
  { label: "에이전트 역할", value: "4", unit: "종", hint: "감시·결정·실행·감사" },
  { label: "프로토콜 레이어", value: "4", unit: "개", hint: "MCP·A2A·UCP·AP2" },
  { label: "공급 채널", value: "4", unit: "곳", hint: "컬리·쿠팡·SSG·이마트" },
  { label: "실시간 패널", value: "2", unit: "개", hint: "요약 · 플로우 로그" },
] as const;

export const protocolLayers = [
  { id: "MCP", label: "도구·컨텍스트", tone: "from-[#dbeafe] to-[#eff6ff]" },
  { id: "A2A", label: "에이전트 메시지", tone: "from-[#e0e7ff] to-[#eef2ff]" },
  { id: "UCP", label: "거래·채널", tone: "from-[#dcfce7] to-[#f0fdf4]" },
  { id: "AP2", label: "감사·정책", tone: "from-[#ffedd5] to-[#fff7ed]" },
] as const;
