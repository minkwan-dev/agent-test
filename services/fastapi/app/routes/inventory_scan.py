#POST /v1/agents/inventory/scan — ADK로 도구 한 번 호출해 저재고 목록을 만든다.

from __future__ import annotations
import json
import logging
import os
import uuid
from datetime import UTC, datetime
from typing import Any
from google.adk.agents.llm_agent import Agent
from google.adk.runners import InMemoryRunner
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException

logger = logging.getLogger(__name__)
router = APIRouter()

# HTTP 입·출력 (Nest가 보내는 JSON과 맞춤) 
class ScanItemInput(BaseModel):
    id: str
    name: str
    current_qty: int = Field(..., ge=0)
    safety_stock_max: int = Field(..., ge=1)


class ScanSettingsInput(BaseModel):
    autobuy_on_low_stock: bool = True


class InventoryScanRequest(BaseModel):
    items: list[ScanItemInput] = Field(default_factory=list)
    settings: ScanSettingsInput = Field(default_factory=ScanSettingsInput)


class LowStockAlert(BaseModel):
    item_id: str
    name: str
    current_qty: int
    safety_stock_max: int
    reason: str


class InventoryScanResponse(BaseModel):
    scan_id: str
    scanned_at: str
    low_stock_items: list[LowStockAlert]


# ADK에 등록하는 도구. LLM이 호출하면 실제 수치·저재고 판정은 여기서만 수행한다.
def evaluate_inventory_scan(request_json: str) -> dict[str, Any]:
    raw = json.loads(request_json)
    items = raw.get("items") or []
    settings = raw.get("settings") or {}
    if not settings.get("autobuy_on_low_stock", True):
        return {"low_stock_items": []}

    low: list[dict[str, Any]] = []
    for row in items:
        cur, safety = int(row["current_qty"]), int(row["safety_stock_max"])
        if cur < safety:
            low.append(
                {
                    "item_id": str(row["id"]),
                    "name": str(row["name"]),
                    "current_qty": cur,
                    "safety_stock_max": safety,
                    "reason": "current_qty_below_safety_threshold",
                }
            )
    return {"low_stock_items": low}


_runner: InMemoryRunner | None = None


# 프로세스당 Runner 한 번만 두고 재사용한다.
def _get_runner() -> InMemoryRunner:
    global _runner
    if _runner is None:
        _runner = InMemoryRunner(
            agent=Agent(
                # 모델명은 환경변수로 바꿀 수 있음(기본 gemini-2.0-flash)
                model=os.environ.get("ADK_INVENTORY_MODEL", "gemini-2.0-flash"),
                name="inventory_scan_agent",
                # instruction은 영어 권장(도구 호출 안정성)
                instruction=(
                    "The user message is raw JSON with keys items and settings. "
                    "You must call evaluate_inventory_scan once; pass the entire user message string as request_json."
                ),
                tools=[evaluate_inventory_scan],
            ),
            app_name="novitas_inventory_scan",
        )
    return _runner


# run_debug()가 돌려주는 이벤트 스트림에서 도구 응답(dict)만 골라낸다.
def _low_stock_from_events(events: list[Any]) -> list[dict[str, Any]] | None:
    for ev in events:
        gfr = getattr(ev, "get_function_responses", None)
        if not callable(gfr):
            continue
        for fr in gfr():
            r = getattr(fr, "response", None)
            if isinstance(r, dict) and isinstance(r.get("low_stock_items"), list):
                return r["low_stock_items"]
    return None


@router.post("/agents/inventory/scan", response_model=InventoryScanResponse)
async def inventory_scan(body: InventoryScanRequest) -> InventoryScanResponse:
    # Gemini(ADK)용 API 키 없으면 스캔 불가
    if not os.environ.get("GOOGLE_API_KEY"):
        raise HTTPException(
            status_code=503,
            detail="Set GOOGLE_API_KEY for Gemini (ADK inventory scan).",
        )

    # 사용자 한 턴 = JSON 문자열 한 덩어리 → 모델이 도구에 그대로 넘기도록 instruction과 맞춤
    payload = json.dumps(body.model_dump(), ensure_ascii=False)
    try:
        # ADK: LLM 호출 + 도구 실행 + 이벤트 수집 (개발용 편의 API)
        events = await _get_runner().run_debug(
            user_messages=payload,
            user_id="fastapi_inventory_scan",
            session_id=f"inv-scan-{uuid.uuid4()}",
            quiet=True,
        )
    except Exception as e:
        logger.exception("ADK inventory scan failed")
        raise HTTPException(status_code=502, detail=str(e)) from e

    rows = _low_stock_from_events(events)
    if rows is None:
        raise HTTPException(
            status_code=502,
            detail="Agent did not return evaluate_inventory_scan result.",
        )

    # scan_id / scanned_at 은 이 API 레이어에서 붙인다(도구 결과와 분리).
    now = datetime.now(UTC).isoformat().replace("+00:00", "Z")
    return InventoryScanResponse( 
        scan_id=str(uuid.uuid4()),
        scanned_at=now,
        low_stock_items=[LowStockAlert.model_validate(row) for row in rows],
    )
