import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ProfileController } from "./profile.controller";
import { UsersModule } from "./users.module";

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
