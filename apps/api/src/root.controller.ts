import { Controller, Get } from "@nestjs/common";

@Controller()
export class RootController {
  @Get()
  root() {
    return {
      service: "novitas-api",
      health: "/health",
      authGoogle: "/auth/google",
    };
  }
}
