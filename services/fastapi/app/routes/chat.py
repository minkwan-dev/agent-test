from pydantic import BaseModel, Field

from fastapi import APIRouter

router = APIRouter()


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=8000)


class ChatResponse(BaseModel):
    reply: str


@router.post("/chat", response_model=ChatResponse)
def chat(body: ChatRequest) -> ChatResponse:
    """
    실제 배포 시 LLM/에이전트 그래프로 교체.
    """
    return ChatResponse(
        reply=(
            f"[FastAPI 스텁] 메시지 수신: {body.message[:120]}"
            + ("…" if len(body.message) > 120 else "")
            + " — Nest 게이트웨이를 통해 연결되었습니다."
        )
    )
