# Novitas 백엔드 — 기능별 흐름 (도식)

브라우저·MCP는 **Nest만** 호출한다. FastAPI는 **내부 HTTP**·`X-Internal-Key`로만 연결된다. 아래 각 절마다 **단계 번호**가 그 기능 안에서의 순서이다.

---

## 1. 인증 (Auth)

로그인·세션·`/me`·대시보드 가드까지 한 흐름.

```mermaid
sequenceDiagram
  autonumber
  participant U as 사용자
  participant N as Next.js
  participant A as Nest AuthModule
  participant DB as DB

  U->>N: ① 로그인 폼 제출
  N->>A: ② POST /auth/login (id·pw)
  A->>DB: ③ 사용자·테넌트 조회·비밀번호 검증
  DB-->>A: ④ 레코드 또는 실패
  alt 성공
    A-->>N: ⑤ Set-Cookie HttpOnly 또는 body에 access/refresh 토큰
    N-->>U: ⑥ 대시보드로 이동
  else 실패
    A-->>N: ⑦ 401 + 메시지
  end

  U->>N: ⑧ 이후 페이지 요청
  N->>A: ⑨ GET /auth/me 또는 /session (쿠키·Bearer)
  A->>A: ⑩ JwtAuthGuard 검증·payload에서 userId·tenantId
  A->>DB: ⑪ 필요 시 사용자 프로필 재조회
  A-->>N: ⑫ 200 + 사용자·테넌트 컨텍스트
```

```mermaid
flowchart LR
  subgraph 가드["보호된 Nest 라우트"]
    G[JwtAuthGuard]
    D[CurrentUser 데코레이터\nuserId tenantId]
  end
  G --> D
```

---

## 2. MCP (도구 목록·호출)

MCP 클라이언트는 **Nest 베이스 URL**만 알고, 도구 이름은 **레지스트리**에서 FastAPI 경로로 매핑된다.

```mermaid
flowchart TB
  subgraph C["클라이언트"]
    MCP[MCP Client]
  end
  subgraph Nest["Nest"]
    EP[POST /mcp]
    MG[McpAuthGuard\nJWT 또는 Mcp-Session]
    REG[mcp-tool-registry\ninventory.scan → URL]
    SVC[McpService\ntools/list tools/call]
    PXY[AgentsProxyService]
  end
  subgraph F["FastAPI 내부"]
    FA[해당 에이전트 라우트]
  end

  MCP -->|① 연결| EP
  EP -->|② 인증| MG
  MG -->|③ 메서드 분기| SVC
  SVC -->|④ tools/list| REG
  REG -->|⑤ 응답 조립| EP
  SVC -->|⑥ tools/call 이름·인자| REG
  REG -->|⑦ 경로 확정| PXY
  PXY -->|⑧ X-Internal-Key\nX-Tenant-Id X-User-Id| FA
  FA -->|⑨ JSON 결과| PXY
  PXY -->|⑩ MCP 응답 포맷| EP
```

---

## 3. 재고 조회 (Inventory)

**경로 A: 대시보드 REST**와 **경로 B: MCP 도구**가 합쳐진 그림. 연산 본체는 FastAPI `inventory` 에이전트.

```mermaid
flowchart TB
  subgraph A["경로 A — 웹 REST"]
    W1[Next] -->|① GET /inventory …| R1[Nest REST Controller]
    R1 -->|② JwtAuthGuard| G1[인증·tenantId 확보]
    G1 -->|③ tenantId로 스코프| DB[(DB\n재고 스냅샷·정책)]
    G1 -->|④ 실시간 연산 필요 시| PXY[AgentsProxyService]
  end

  subgraph B["경로 B — MCP"]
    M1[MCP] -->|① tools/call\ninventory.scan| M2[McpModule]
    M2 -->|② McpAuth·레지스트리| PXY
  end

  PXY -->|⑤ POST /v1/agents/inventory/scan\n내부 헤더| INV[FastAPI inventory]
  INV -->|⑥ LLM·규칙·임계치 연산| INV
  INV -->|⑦ 응답| PXY
  PXY -->|⑧ REST 응답 병합| R1
  PXY -->|⑧ MCP 응답 조립| M2

  INV -->|⑨ 선택 PUBLISH| REDIS[(Redis\n예: threshold_breached)]
```

---

## 4. 발주 (Order)

발주 생성·시뮬레이션·외부 마켓 연동은 도메인에 따라 Nest DB와 FastAPI가 나뉜다. **주문의 진실한 상태**는 보통 Nest DB에 둔다.

```mermaid
sequenceDiagram
  autonumber
  participant W as Next
  participant N as Nest REST
  participant P as AgentsProxy
  participant F as FastAPI order agent
  participant DB as DB
  participant R as Redis

  W->>N: ① POST /orders 또는 발주 UI 액션
  N->>N: ② JwtAuthGuard·tenantId
  N->>DB: ③ 주문 초안·라인아이템 저장 (선택 순서)
  N->>P: ④ POST /v1/agents/order/execute (시뮬·규칙)
  P->>F: ⑤ 내부 헤더 부착
  F->>F: ⑥ 수량·리드타임·LLM 보조
  F-->>P: ⑦ 실행 결과·경고
  P-->>N: ⑧ JSON
  N->>DB: ⑨ 주문 상태 확정·갱신
  N->>R: ⑩ 선택 PUBLISH order.placed
  N-->>W: ⑪ 200 + 주문 요약
```

```mermaid
flowchart LR
  F[FastAPI order] -.->|외부 API는\nNest 또는 FastAPI\n정책에 따름| EXT[외부 마켓/ERP]
```

---

## 5. 결제 (Payment)

토스와 **직접 HTTP**하는 것은 **Nest만**. FastAPI `payment` 에이전트는 **판단·한도**만.

### 5-1. 사용자 수동 결제 (위젯 → 승인)

```mermaid
sequenceDiagram
  autonumber
  participant U as 사용자
  participant W as Next
  participant T as 토스 PG
  participant Nest as Nest Payments
  participant DB as DB
  participant R as Redis

  U->>W: ① 결제 페이지
  W->>T: ② 결제위젯 SDK (client key)
  U->>T: ③ 카드·결제
  T-->>W: ④ success redirect + paymentKey·orderId·amount
  W->>Nest: ⑤ POST /payments/confirm
  Nest->>T: ⑥ 토스 결제 승인 API (secret)
  T-->>Nest: ⑦ 승인 결과
  Nest->>DB: ⑧ 주문·결제 상태 반영
  Nest->>R: ⑨ 선택 PUBLISH payments.succeeded
  Nest-->>W: ⑩ 200 + 표시용 상태
```

### 5-2. 토스 웹훅 (보완·동기화)

```mermaid
flowchart LR
  T[토스] -->|① POST /webhooks/toss| WH[Nest Webhooks]
  WH -->|② raw body·서명 검증| WH
  WH -->|③ 멱등 paymentKey·orderId| DB[(DB)]
  WH -->|④ EventBus| PUB[Redis PUBLISH]
```

### 5-3. 에이전트 자동 결제 (판단은 FastAPI, PG는 Nest)

```mermaid
sequenceDiagram
  autonumber
  participant F as FastAPI payment agent
  participant Nest as Nest
  participant T as 토스
  participant DB as DB

  F->>F: ① 결제 필요·금액·orderId·정책 확정
  F->>Nest: ② POST /internal/payments/… (X-Internal-Key)
  Nest->>T: ③ 토스 API (자동결제·키인 등 문서 절차)
  T-->>Nest: ④ 결과
  Nest->>DB: ⑤ 반영
  Note over F,T: FastAPI는 시크릿 키 없음
```

---

## 6. 감사 (Audit)

로그 검증·요약·이상 탐지는 FastAPI `audit` 에이전트, **저장·조회 API**는 Nest 쪽에 둘 수 있다.

```mermaid
flowchart TB
  subgraph 트리거["호출 트리거"]
    REST[Nest REST\n감사 요청]
    MCP[MCP tools/call\naudit.*]
    SUB[Redis SUB\norder.placed 등]
  end

  subgraph 처리["FastAPI audit"]
    A[audit agent\n검증·요약·이상탐지]
  end

  subgraph 저장["영속"]
    DB[(DB\n감사 로그·메타)]
    NA[Nest Audit API\nPOST 저장]
  end

  REST -->|①| PXY[AgentsProxy]
  MCP -->|②| PXY
  PXY -->|③| A
  SUB -->|④| W[FastAPI worker\n핸들러]
  W -->|⑤| A
  A -->|⑥ 결과·요약| NA
  NA -->|⑦| DB
  A -.->|⑧ 대용량 원천 로그\nNest에서 재조회| NA
```

---

## 7. AI 채팅 (ai-proxy)

기존 채팅은 Nest가 **프록시**로 FastAPI에 연결한다.

```mermaid
sequenceDiagram
  autonumber
  participant W as Next
  participant N as Nest ai-proxy
  participant F as FastAPI /v1/chat

  W->>N: ① POST /ai/chat (SSE 또는 JSON)
  N->>N: ② JwtAuthGuard (정책에 따라)
  N->>F: ③ proxy to FASTAPI_URL
  F-->>N: ④ 스트림 또는 토큰
  N-->>W: ⑤ 그대로 전달
```

---

## 8. Redis 이벤트·후속 처리 (비동기)

HTTP **동기 응답**과 달리, pub/sub은 **방송**이며 리스너가 꺼져 있으면 메시지를 못 받을 수 있다. **반드시 남길 데이터는 DB 먼저.**

```mermaid
flowchart TB
  subgraph 발행["PUBLISH 주체"]
    N1[Nest\n웹훅·승인 후]
    F1[FastAPI\n에이전트 완료 후]
  end

  subgraph 채널["Redis"]
    CH["novitas:tenant:<id>:<event>\n+ correlationId"]
  end

  subgraph 소비["SUBSCRIBE"]
    S1[Nest subscriber\n선택]
    S2[FastAPI redis_subscriber]
  end

  N1 -->|①| CH
  F1 -->|②| CH
  CH -->|③| S1
  CH -->|④| S2
```

---

## 번호 매기기 규칙

- **각 절(1~8)의 `autonumber` / ①②③**은 그 기능 **안에서만** 순서를 나타낸다.
- **절 5**는 하위로 **5-1 수동·5-2 웹훅·5-3 자동**으로 나눈다.
