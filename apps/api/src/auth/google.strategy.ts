import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Profile } from "passport-google-oauth20";
import { Strategy } from "passport-google-oauth20";
import type { JwtUserPayload } from "./jwt-payload";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(config: ConfigService) {
    super({
      clientID: config.getOrThrow<string>("GOOGLE_CLIENT_ID"),
      clientSecret: config.getOrThrow<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: config.get<string>(
        "GOOGLE_CALLBACK_URL",
        "http://localhost:4000/auth/google/callback",
      ),
      scope: ["openid", "email", "profile"],
    });
  }

  /**
   * Nest `PassportStrategy`는 `validate` 반환값으로 `done(null, result)`를 호출합니다.
   * 여기서 `done()`을 직접 호출하면 이어서 `done(null, undefined)`가 나가 `user=false`가 됩니다.
   */
  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): JwtUserPayload {
    if (!profile?.id) {
      throw new Error(
        "Google profile에 id가 없습니다. OAuth 동의 화면·스코프(openid)를 확인하세요.",
      );
    }
    const email = profile.emails?.[0]?.value;
    const picture = profile.photos?.[0]?.value;
    const name = profile.displayName ?? email ?? "User";
    return {
      sub: profile.id,
      email,
      name,
      picture,
    };
  }
}
