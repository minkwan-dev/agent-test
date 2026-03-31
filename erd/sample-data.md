### user

```json
{
  "id": "00000002-0000-4000-8000-000000000001",
  "email": "demo@novitas.local",
  "role": "admin",
  "created_at": "2024-06-01T06:10:00.000Z"
}
```

### inventory_item

```json
{
  "id": "00000003-0000-4000-8000-000000000001",
  "user_id": "00000002-0000-4000-8000-000000000001",
  "sku": "YP-SAUCE-RED-2KG",
  "display_name": "엽기 소스(레드) 2kg",
  "icon_emoji": "🌶️",
  "current_qty": 8,
  "safety_stock_max": 36,
  "level": "warn",
  "updated_at": "2026-03-31T11:20:00.000Z"
}
```

### supplier

```json
{
  "id": "00000005-0000-4000-8000-000000000001",
  "name": "식자재몰",
  "code": "sikjemall"
}
```

### agent_definition

```json
{
  "id": "00000006-0000-4000-8000-000000000001",
  "key": "ord",
  "name": "OrderExecutor",
  "proto": "UCP"
}
```

### purchase_order

```json
{
  "id": "00000007-0000-4000-8000-000000000001",
  "user_id": "00000002-0000-4000-8000-000000000001",
  "supplier_id": "00000005-0000-4000-8000-000000000001",
  "agent_key": "ord",
  "proto": "UCP",
  "state": "pending",
  "external_ref": "ORDER-20260331-동대문-0142",
  "total_amount_minor": 1848000,
  "placed_at": "2026-03-31T11:25:00.000Z"
}
```

### order_line

```json
{
  "id": "00000008-0000-4000-8000-000000000001",
  "purchase_order_id": "00000007-0000-4000-8000-000000000001",
  "inventory_item_id": "00000003-0000-4000-8000-000000000001",
  "qty": 12,
  "unit_price_minor": 154000
}
```

### notification

```json
{
  "id": "00000009-0000-4000-8000-000000000001",
  "user_id": "00000002-0000-4000-8000-000000000001",
  "severity": "info",
  "category": "inventory",
  "body": "[동대문본점] 엽기 소스(레드) 2kg 안전재고 36개 대비 22%입니다. 식자재몰 발주가 접수됐어요.",
  "read": false,
  "created_at": "2026-03-31T11:20:15.000Z"
}
```

### event_log

```json
{
  "id": "0000000a-0000-4000-8000-000000000001",
  "user_id": "00000002-0000-4000-8000-000000000001",
  "proto": "UCP",
  "source_agent": "OrderExecutor",
  "message": "식자재몰 API 발주 생성 · ORDER-20260331-동대문-0142 · 금액 ₩1,848,000",
  "created_at": "2026-03-31T11:25:00.000Z"
}
```

### protocol_setting

```json
{
  "id": "0000000b-0000-4000-8000-000000000001",
  "user_id": "00000002-0000-4000-8000-000000000001",
  "protocol": "UCP",
  "enabled": true
}
```

### integration_credential

```json
{
  "id": "0000000e-0000-4000-8000-000000000001",
  "user_id": "00000002-0000-4000-8000-000000000001",
  "kind": "webhook",
  "secret_ref": "vault://kv/novitas/user_demo/webhook_hmac",
  "value_preview": "whsec_••••••••a9c1"
}
```

[README.md](README.md)
