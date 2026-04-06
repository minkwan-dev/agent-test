import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import type { JwtUserPayload } from "../auth/jwt-payload";

export type GoogleProfileInput = {
  googleSub: string;
  email?: string;
  name?: string;
  picture?: string;
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  onboarding_completed_at: string | null;
};

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly supabase: SupabaseService) {}

  private rowToJwt(row: ProfileRow): JwtUserPayload {
    return {
      sub: row.id,
      email: row.email ?? undefined,
      name: row.full_name ?? undefined,
      picture: row.avatar_url ?? undefined,
      onboardingCompleted: row.onboarding_completed_at != null,
    };
  }

  /**
   * Google OAuth 프로필을 `profiles`에 반영하고, JWT에 넣을 payload를 반환합니다.
   * 신규 행은 `onboarding_completed_at` null, 기존 행은 해당 컬럼을 덮어쓰지 않습니다.
   */
  async upsertFromGoogle(input: GoogleProfileInput): Promise<JwtUserPayload> {
    const updatedAt = new Date().toISOString();
    const base = {
      email: input.email ?? null,
      full_name: input.name ?? null,
      avatar_url: input.picture ?? null,
      updated_at: updatedAt,
    };

    const { data: existing, error: findErr } = await this.supabase.client
      .from("profiles")
      .select("id")
      .eq("google_sub", input.googleSub)
      .maybeSingle();

    if (findErr) {
      this.logger.error(`profiles lookup: ${findErr.message}`);
      throw findErr;
    }

    if (existing) {
      const { data, error } = await this.supabase.client
        .from("profiles")
        .update(base)
        .eq("id", existing.id)
        .select(
          "id, email, full_name, avatar_url, onboarding_completed_at",
        )
        .single();

      if (error) {
        this.logger.error(
          `profiles update failed: ${error.message} (code=${error.code ?? "?"})`,
        );
        throw error;
      }
      return this.rowToJwt(data as ProfileRow);
    }

    const { data, error } = await this.supabase.client
      .from("profiles")
      .insert({
        google_sub: input.googleSub,
        ...base,
      })
      .select("id, email, full_name, avatar_url, onboarding_completed_at")
      .single();

    if (error) {
      this.logger.error(
        `profiles insert failed: ${error.message} (code=${error.code ?? "?"})`,
      );
      throw error;
    }
    return this.rowToJwt(data as ProfileRow);
  }

  /**
   * 온보딩 완료 처리 후 JWT 갱신용 payload를 반환합니다.
   */
  async completeOnboarding(profileId: string): Promise<JwtUserPayload> {
    const now = new Date().toISOString();
    const { data, error } = await this.supabase.client
      .from("profiles")
      .update({
        onboarding_completed_at: now,
        updated_at: now,
      })
      .eq("id", profileId)
      .select("id, email, full_name, avatar_url, onboarding_completed_at")
      .single();

    if (error) {
      this.logger.error(`complete onboarding: ${error.message}`);
      throw error;
    }
    if (!data) {
      throw new NotFoundException("profile not found");
    }
    return this.rowToJwt(data as ProfileRow);
  }
}
