import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { HealthController } from "./health/health.controller";
import { AiProxyController } from "./ai/ai-proxy.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({
      timeout: 30_000,
      maxRedirects: 3,
    }),
  ],
  controllers: [HealthController, AiProxyController],
})
export class AppModule {}
