import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      service: "novitas-api",
      status: "ok",
      ts: new Date().toISOString(),
    };
  }
}
