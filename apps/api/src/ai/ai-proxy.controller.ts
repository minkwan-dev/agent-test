import { HttpService } from "@nestjs/axios";
import {
  Body,
  Controller,
  Get,
  Post,
  ServiceUnavailableException,
} from "@nestjs/common";
import { firstValueFrom } from "rxjs";

const FASTAPI_URL = process.env.FASTAPI_URL ?? "http://127.0.0.1:8000";

@Controller("ai")
export class AiProxyController {
  constructor(private readonly http: HttpService) {}

  @Get("status")
  async proxyStatus() {
    try {
      const res = await firstValueFrom(
        this.http.get<{ status: string }>(`${FASTAPI_URL}/health`),
      );
      return { fastapi: res.data, gateway: "nest" };
    } catch {
      throw new ServiceUnavailableException(
        "FastAPI unavailable — start services/fastapi (uv run uvicorn app.main:app --reload --port 8000)",
      );
    }
  }

  @Post("chat")
  async proxyChat(@Body() body: { message: string }) {
    try {
      const res = await firstValueFrom(
        this.http.post<{ reply: string }>(`${FASTAPI_URL}/v1/chat`, body),
      );
      return res.data;
    } catch {
      throw new ServiceUnavailableException(
        "FastAPI chat endpoint unavailable",
      );
    }
  }
}
