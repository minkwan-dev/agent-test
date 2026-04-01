export const userProfile = {
  name: "원민관",
  email: "wonmin@novitas.kr",
  title: "운영 매니저",
  org: "엽기떡볶이 동대문본점",
  timezone: "Asia/Seoul (GMT+9)",
  locale: "한국어",
  memberSince: "2025.11.12",
};

export const connectedAccounts = [
  { id: "google", label: "Google", status: "connected" as const, hint: "로그인에 사용 중" },
];

export const recentSessions = [
  { device: "Chrome · Windows", where: "서울", when: "방금", current: true },
  { device: "Safari · iOS", where: "경기", when: "어제 09:14", current: false },
];

export const notificationPrefs = [
  { label: "재고 임계치·발주 결과", on: true },
  { label: "에이전트 오류·플로우 중단", on: true },
  { label: "주간 운영 리포트 이메일", on: false },
];
