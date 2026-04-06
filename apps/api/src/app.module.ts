import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { AiProxyController } from "./ai/ai-proxy.controller";
import { AuthModule } from "./auth/auth.module";
import { HealthController } from "./health/health.controller";
import { RootController } from "./root.controller";
import { SupabaseModule } from "./supabase/supabase.module";
import { InventoryModule } from "./inventory/inventory.module";
import { SettingsModule } from "./settings/index";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    /** `.env` 는 `main.ts` 최상단 `import "./bootstrap-env"` 에서 먼저 로드합니다. */
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    UsersModule,
    AuthModule,
    InventoryModule,
    SettingsModule,
    HttpModule.register({
      timeout: 30_000,
      maxRedirects: 3,
    }),
  ],
  controllers: [RootController, HealthController, AiProxyController],
})
export class AppModule {}
