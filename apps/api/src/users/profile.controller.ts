import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Request } from "express";
import type { JwtUserPayload } from "../auth/jwt-payload";
import { AuthService } from "../auth/auth.service";
import type { PatchProfileDto, ProfileDto } from "./profile.types";
import { UsersService } from "./users.service";

@Controller("profile")
@UseGuards(AuthGuard("jwt"))
export class ProfileController {
  constructor(
    private readonly users: UsersService,
    private readonly auth: AuthService,
  ) {}

  @Get()
  get(@Req() req: Request & { user: JwtUserPayload }): Promise<ProfileDto> {
    return this.users.getProfile(req.user.sub);
  }

  @Patch()
  patch(
    @Req() req: Request & { user: JwtUserPayload },
    @Body() body: PatchProfileDto,
  ): Promise<{ profile: ProfileDto; token: string }> {
    return this.users.patchProfile(req.user.sub, body).then((row) => {
      const profile = this.users.toProfileDto(row);
      const token = this.auth.sign(this.users.jwtPayloadFromRow(row));
      return { profile, token };
    });
  }

  @Post("avatar")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async uploadAvatar(
    @Req() req: Request & { user: JwtUserPayload },
    @UploadedFile() file: Express.Multer.File | undefined,
  ): Promise<{ profile: ProfileDto; token: string }> {
    if (!file?.buffer) {
      throw new BadRequestException("file is required");
    }
    const row = await this.users.uploadAvatar(
      req.user.sub,
      file.buffer,
      file.mimetype,
    );
    const profile = this.users.toProfileDto(row);
    const token = this.auth.sign(this.users.jwtPayloadFromRow(row));
    return { profile, token };
  }
}
