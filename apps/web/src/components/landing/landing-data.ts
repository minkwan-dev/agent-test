import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Radio,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

export const landingProtocols: {
  key: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  points: string[];
  icon: LucideIcon;
  iconWrapClass: string;
  badgeClass: string;
  listCheckClass: string;
}[] = [
  {
    key: "connect",
    badge: "연결",
    title: "매장 데이터를 한곳에",
    subtitle: "적어 둔 재고·엑셀·쓰시던 방식까지",
    desc: "숫자와 알림을 한곳에서 보면, 장부와 화면을 왔다 갔다 할 일이 줄어요. 처음엔 수기·엑셀로 시작하셔도 되고, 나중에 익숙해지면 더 붙여 가면 돼요.",
    points: ["알림과 업무 요청을 한곳에서 받기", "누가 무엇을 처리했는지 나중에 찾기 쉬움"],
    icon: Radio,
    iconWrapClass: "bg-[#f1f5f9] text-[#475569]",
    badgeClass: "text-[#475569]",
    listCheckClass: "text-[#64748b]",
  },
  {
    key: "collab",
    badge: "역할 나누기",
    title: "맡은 일만 빠르게 이어 받기",
    subtitle: "재고·발주·확인을 나눠 맡아요",
    desc: "재고 확인, 발주안 만들기, 실제 주문 넣기, 마지막 점검까지 단계마다 맡는 일이 달라요. 처리해야 할 일만 순서대로 넘어가면 매장은 덜 헷갈려요.",
    points: ["일이 겹치지 않게 단계 정리", "한 단계에서 문제 나면 그 부분만 다시 시도"],
    icon: MessageSquare,
    iconWrapClass: "bg-[#f5f3ff] text-[#a78bfa]",
    badgeClass: "text-[#a78bfa]",
    listCheckClass: "text-[#a78bfa]",
  },
  {
    key: "channels",
    badge: "발주·거래",
    title: "채널마다 다른 발주도 한 흐름으로",
    subtitle: "온라인 몰·납품처 정책을 반영해요",
    desc: "거래처·플랫폼마다 발주 방식이 달라도, 화면에서는 같은 순서로 진행해요. 품절이나 지연이 나오면 다른 경로를 찾는 것도 규칙에 맞춰 도와줄 수 있어요.",
    points: ["채널별 규칙을 따로 기억하지 않아도 됨", "실패했을 때 자동으로 다시 시도·우회"],
    icon: ShoppingCart,
    iconWrapClass: "bg-[#fff7ed] text-[#ea580c]",
    badgeClass: "text-[#c2410c]",
    listCheckClass: "text-[#ea580c]",
  },
  {
    key: "audit",
    badge: "기록·점검",
    title: "금액·한도·규칙을 자동으로 확인",
    subtitle: "나중에 보더라도 근거가 남아요",
    desc: "정해 둔 예산·계약·내부 규칙에 맞는지 자동으로 짚어 주고, 결과는 기록으로 남겨요. 감사나 정산 때 필요한 자료를 한곳에서 모을 수 있어요.",
    points: ["규칙 어긋나면 막거나 알려 줌", "처리 과정을 나중에 따라가기 쉬움"],
    icon: ShieldCheck,
    iconWrapClass: "bg-[#f0f9ff] text-[#0284c7]",
    badgeClass: "text-[#0369a1]",
    listCheckClass: "text-[#0284c7]",
  },
];

export const landingFlowSteps = [
  {
    n: "01",
    title: "재고 살피기",
    body: "재고가 부족해지거나 유통기한이 임박하면 미리 알려 줘요. 급한 경우에는 바로 다음 단계로 넘겨서 놓치지 않게 해요.",
    tag: "알림",
  },
  {
    n: "02",
    title: "발주안 만들기",
    body: "가격·납기·과거 이슈를 참고해 발주 초안을 만들어요. 예산이나 매장 정책은 이 단계에서 걸러져요.",
    tag: "정책 반영",
  },
  {
    n: "03",
    title: "주문 실행",
    body: "거래처·플랫폼에 맞춰 실제 주문을 넣어요. 전송이 실패하면 같은 규칙으로 다시 시도하거나 다른 경로를 찾아요.",
    tag: "실행",
  },
  {
    n: "04",
    title: "기록·알림",
    body: "금액·한도 이상 여부를 확인하고, 결과는 화면·메일·팀 알림으로 전달해요. 각 단계가 기록으로 남아요.",
    tag: "확인",
  },
] as const;

export const landingFaqs = [
  {
    q: "기존에 쓰던 재고 프로그램이랑 붙일 수 있나요?",
    a: "나중에 차근차근 맞춰 갈 수 있어요. 지금은 혼자 만드는 단계라 자동으로 긁어 오는 연동보다, 매장에서 재고만 정확히 반영해 주시는 쪽을 먼저 염두에 두었어요.",
  },
  {
    q: "실제 결제·주문까지 자동으로 나가나요?",
    a: "매장 정책에 맞게 단계를 나눌 수 있어요. 처음에는 두 번 확인(승인)이나 하루 한도, 연습 모드처럼 안전장치를 켜 두고, 익숙해지면 범위를 넓히는 식으로 가져가면 좋아요.",
  },
  {
    q: "자동으로 돌아가는 업무는 몇 단계까지 지원하나요?",
    a: "기본은 재고 살피기 → 발주안 → 주문 실행 → 기록·알림 네 단계예요. 매장이나 품목별로 앞단을 나누는 식으로 늘리는 것도 가능해요.",
  },
  {
    q: "데이터는 어디에 저장되나요?",
    a: "로그인과 화면에서 쓰는 정보는 서비스 정책에 따라 보관돼요. 민감한 정보는 암호화·마스킹 같은 보안 설정을 같이 논의하시면 됩니다.",
  },
  {
    q: "장애나 오류가 나면 어떻게 되나요?",
    a: "거래처 연결이 끊기면 자동으로 다시 보내거나, 다른 납품 경로를 찾도록 할 수 있어요. 막힌 이유는 나중에 화면에서도 추적할 수 있게 남겨 두는 걸 목표로 해요.",
  },
];

export const landingStatsGrid = [
  { label: "자동 업무 단계", value: "4", unit: "단계", hint: "살피기·정하기·실행·기록" },
  { label: "운영 구성 블록", value: "4", unit: "가지", hint: "연결·역할·발주·점검" },
  { label: "납품처 예시", value: "4", unit: "곳", hint: "화면에 보이는 샘플" },
  { label: "핵심 화면", value: "2", unit: "개", hint: "요약 · 진행 기록" },
] as const;

export const protocolLayers = [
  {
    id: "L1",
    headline: "재고·데이터 연결",
    sub: "매장에서 쓰는 자료를 한곳으로",
    tone: "from-[#f1f5f9] to-[#f8fafc]",
  },
  {
    id: "L2",
    headline: "역할 나누기",
    sub: "단계마다 맡는 일을 정리",
    tone: "from-[#ede9fe] to-[#f5f3ff]",
  },
  { id: "L3", headline: "발주·거래", sub: "채널별 발주를 같은 흐름으로", tone: "from-[#ffedd5] to-[#fff8f0]" },
  { id: "L4", headline: "기록·점검", sub: "규칙 확인과 남길 기록", tone: "from-[#e0f2fe] to-[#f6fbff]" },
] as const;
