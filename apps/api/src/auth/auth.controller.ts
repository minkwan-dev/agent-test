import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Next,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AuthService } from "./auth.service";
import type { JwtUserPayload } from "./jwt-payload";
import { formatSupabaseError } from "../supabase/format-supabase-error";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  @Get("google")
  googleAuth(
    @Query("next") nextPath: string | undefined,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): void {
    const safeNext = nextPath?.startsWith("/") ? nextPath : "/dashboard/overview";
    const state = Buffer.from(JSON.stringify({ n: safeNext }), "utf8").toString(
      "base64url",
    );
    passport.authenticate("google", {
      scope: ["openid", "email", "profile"],
      state,
      session: false,
    })(req, res, next);
  }

  @Get("google/callback")
  googleCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): void {
    const frontend = this.config.get<string>(
      "FRONTEND_URL",
      "http://localhost:3000",
    );
    passport.authenticate(
      "google",
      { session: false },
      (
        err: Error | null,
        user: JwtUserPayload | false,
        info?: { message?: string } | string,
      ) => {
        void (async () => {
          if (err || !user) {
            const q = req.query as Record<string, string | string[] | undefined>;
            const gErr = [q.error, q.error_description].flat().filter(Boolean).join(" | ");
            const infoStr =
              typeof info === "string"
                ? info
                : info && typeof info === "object"
                  ? JSON.stringify(info)
                  : "";
            this.logger.warn(
              `Google OAuth 실패 — err=${err?.message ?? "(없음)"} user=${user === false ? "false" : String(user)} info=${infoStr || "(없음)"} google_err=${gErr || "(없음)"} query=${JSON.stringify(req.query)}`,
            );
            if (!res.headersSent) {
              res.redirect(`${frontend}/login?error=google`);
            }
            return;
          }
          try {
            const jwtUser = await this.usersService.upsertFromGoogle({
              googleSub: user.sub,
              email: user.email,
              name: user.name,
              picture: user.picture,
            });
            const access_token = this.authService.sign(jwtUser);
            let nextPath = "/dashboard/overview";
            const state = req.query.state as string | undefined;
            if (state) {
              try {
                const parsed = JSON.parse(
                  Buffer.from(state, "base64url").toString("utf8"),
                ) as { n?: string };
                if (parsed.n?.startsWith("/")) nextPath = parsed.n;
              } catch {
                /* ignore invalid state */
              }
            }
            const url = `${frontend}/auth/callback?token=${encodeURIComponent(access_token)}&next=${encodeURIComponent(nextPath)}`;
            if (!res.headersSent) {
              res.redirect(url);
            }
          } catch (e: unknown) {
            this.logger.error(
              `Supabase profiles 저장 실패: ${formatSupabaseError(e)}`,
            );
            if (!res.headersSent) {
              res.redirect(`${frontend}/login?error=sync`);
            }
          }
        })();
      },
    )(req, res, next);
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  me(@Req() req: Request & { user: JwtUserPayload }): JwtUserPayload {
    return req.user;
  }

  /** 온보딩 완료 후 JWT 갱신용 토큰 발급 */
  @Post("onboarding/complete")
  @HttpCode(200)
  @UseGuards(AuthGuard("jwt"))
  async completeOnboarding(
    @Req() req: Request & { user: JwtUserPayload },
  ): Promise<{ token: string }> {
    const jwtUser = await this.usersService.completeOnboarding(req.user.sub);
    return { token: this.authService.sign(jwtUser) };
  }
}
