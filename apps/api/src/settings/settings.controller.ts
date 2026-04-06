import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";
import type { JwtUserPayload } from "../auth/jwt-payload";
import type { PatchUserSettingsDto } from "./settings.types";
import { SettingsService } from "./settings.service";

@Controller("settings")
@UseGuards(AuthGuard("jwt"))
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get()
  get(@Req() req: Request & { user: JwtUserPayload }) {
    return this.settings.getForProfile(req.user.sub);
  }

  @Patch()
  patch(
    @Req() req: Request & { user: JwtUserPayload },
    @Body() body: PatchUserSettingsDto,
  ) {
    return this.settings.patchForProfile(req.user.sub, body);
  }
}
