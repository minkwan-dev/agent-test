import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import type { JwtUserPayload } from "../auth/jwt-payload";
import type { PatchProfileDto, ProfileDto } from "./profile.types";

export type GoogleProfileInput = {
  googleSub: string;
  email?: string;
  name?: string;
  picture?: string;
};

export type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  onboarding_completed_at: string | null;
  created_at?: string;
  updated_at?: string;
};

const AVATAR_BUCKET = "avatars";
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

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
      /** 기존 사용자: 직접 올린 프로필 사진을 덮어쓰지 않음 (avatar_url 제외) */
      const { data, error } = await this.supabase.client
        .from("profiles")
        .update({
          email: base.email,
          full_name: base.full_name,
          updated_at: updatedAt,
        })
        .eq("id", existing.id)
        .select(
          "id, email, full_name, avatar_url, onboarding_completed_at, created_at, updated_at",
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
      .select(
        "id, email, full_name, avatar_url, onboarding_completed_at, created_at, updated_at",
      )
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
      .select(
        "id, email, full_name, avatar_url, onboarding_completed_at, created_at, updated_at",
      )
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

  toProfileDto(row: ProfileRow): ProfileDto {
    return {
      id: row.id,
      email: row.email,
      full_name: row.full_name,
      avatar_url: row.avatar_url,
      onboarding_completed_at: row.onboarding_completed_at,
      created_at: row.created_at ?? "",
      updated_at: row.updated_at ?? "",
    };
  }

  async getProfile(profileId: string): Promise<ProfileDto> {
    const { data, error } = await this.supabase.client
      .from("profiles")
      .select(
        "id, email, full_name, avatar_url, onboarding_completed_at, created_at, updated_at",
      )
      .eq("id", profileId)
      .maybeSingle();

    if (error) {
      this.logger.error(`getProfile: ${error.message}`);
      throw error;
    }
    if (!data) {
      throw new NotFoundException("profile not found");
    }
    return this.toProfileDto(data as ProfileRow);
  }

  async patchProfile(
    profileId: string,
    patch: PatchProfileDto,
  ): Promise<ProfileRow> {
    if (patch.full_name === undefined) {
      throw new BadRequestException("full_name is required");
    }
    const t = patch.full_name.trim();
    if (t.length === 0) {
      throw new BadRequestException("full_name must not be empty");
    }
    if (t.length > 200) {
      throw new BadRequestException("full_name too long (max 200)");
    }

    const updatedAt = new Date().toISOString();
    const { data, error } = await this.supabase.client
      .from("profiles")
      .update({
        full_name: t,
        updated_at: updatedAt,
      })
      .eq("id", profileId)
      .select(
        "id, email, full_name, avatar_url, onboarding_completed_at, created_at, updated_at",
      )
      .single();

    if (error) {
      this.logger.error(`patchProfile: ${error.message}`);
      throw error;
    }
    if (!data) {
      throw new NotFoundException("profile not found");
    }
    return data as ProfileRow;
  }

  async uploadAvatar(
    profileId: string,
    buffer: Buffer,
    mimetype: string,
  ): Promise<ProfileRow> {
    if (buffer.length > AVATAR_MAX_BYTES) {
      throw new BadRequestException("file too large (max 2MB)");
    }
    const allowed = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ]);
    if (!allowed.has(mimetype)) {
      throw new BadRequestException("unsupported image type");
    }

    const ext =
      mimetype === "image/png"
        ? "png"
        : mimetype === "image/webp"
          ? "webp"
          : mimetype === "image/gif"
            ? "gif"
            : "jpg";

    const path = `${profileId}/avatar.${ext}`;
    const { error: upErr } = await this.supabase.client.storage
      .from(AVATAR_BUCKET)
      .upload(path, buffer, {
        contentType: mimetype,
        upsert: true,
      });

    if (upErr) {
      this.logger.error(`storage upload: ${upErr.message}`);
      throw new BadRequestException(`upload failed: ${upErr.message}`);
    }

    const { data: pub } = this.supabase.client.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(path);

    const publicUrl = pub.publicUrl;
    const updatedAt = new Date().toISOString();

    const { data, error } = await this.supabase.client
      .from("profiles")
      .update({
        avatar_url: publicUrl,
        updated_at: updatedAt,
      })
      .eq("id", profileId)
      .select(
        "id, email, full_name, avatar_url, onboarding_completed_at, created_at, updated_at",
      )
      .single();

    if (error) {
      this.logger.error(`uploadAvatar profile update: ${error.message}`);
      throw error;
    }
    if (!data) {
      throw new NotFoundException("profile not found");
    }
    return data as ProfileRow;
  }

  /** JWT 발급용 — 외부에서 프로필 행으로 페이로드 생성 */
  jwtPayloadFromRow(row: ProfileRow): JwtUserPayload {
    return this.rowToJwt(row);
  }
}
