from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import chat, inventory_scan

app = FastAPI(
    title="Novitas FastAPI",
    description="AI 채팅·에이전트 오케스트레이션용 서비스",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/v1", tags=["chat"])
app.include_router(
    inventory_scan.router,
    prefix="/v1",
    tags=["inventory-agent"],
)


@app.get("/health")
def health():
    return {"status": "ok", "service": "novitas-fastapi"}
