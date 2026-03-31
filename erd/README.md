```mermaid
erDiagram
    user ||--o{ inventory_item : owns
    user ||--o{ purchase_order : places
    user ||--o{ notification : receives
    user ||--o{ event_log : emits
    user ||--o{ protocol_setting : configures
    user ||--o{ integration_credential : stores

    supplier ||--o{ purchase_order : fulfills

    purchase_order ||--|{ order_line : contains
    inventory_item ||--o{ order_line : "line item ref"

    agent_definition ||--o{ purchase_order : "via agent_key"

    user {
        uuid id PK
        string email UK
        string role
        timestamptz created_at
    }

    inventory_item {
        uuid id PK
        uuid user_id FK
        string sku UK "per user"
        string display_name
        string icon_emoji
        int current_qty
        int safety_stock_max
        string level "urgent | warn"
        timestamptz updated_at
    }

    supplier {
        uuid id PK
        string name
        string code UK
    }

    agent_definition {
        uuid id PK
        string key UK "inv|dec|ord|aud"
        string name
        string proto "MCP|A2A|UCP|AP2"
    }

    purchase_order {
        uuid id PK
        uuid user_id FK
        uuid supplier_id FK
        string agent_key FK
        string proto "MCP|A2A|UCP|AP2"
        string state "pending|done|cancelled"
        string external_ref "ORDER-…"
        bigint total_amount_minor
        timestamptz placed_at
    }

    order_line {
        uuid id PK
        uuid purchase_order_id FK
        uuid inventory_item_id FK
        int qty
        bigint unit_price_minor
    }

    notification {
        uuid id PK
        uuid user_id FK "nullable broadcast"
        string severity "urgent|info|success"
        string category
        text body
        boolean read
        timestamptz created_at
    }

    event_log {
        uuid id PK
        uuid user_id FK
        string proto "MCP|A2A|UCP|AP2"
        string source_agent
        text message
        timestamptz created_at
    }

    protocol_setting {
        uuid id PK
        uuid user_id FK
        string protocol "MCP|A2A|UCP|AP2"
        boolean enabled
    }

    integration_credential {
        uuid id PK
        uuid user_id FK
        string kind "webhook|slack|nest_base_url|fastapi_url"
        text secret_ref "vault pointer"
        text value_preview
    }
```

[sample-data.md](sample-data.md)

**확장 시:** 멀티 테넌시(매장·팀)가 필요하면 `organization`을 두고 `user.organization_id`와 리소스의 `organization_id`를 넣으면 됩니다. 과금·구독은 `plan` / `subscription`을 `organization` 또는 `user`에 다시 연결하면 됩니다.
