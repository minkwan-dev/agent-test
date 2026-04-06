import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import {
  DEFAULT_INTEGRATION_POLICY,
  mergeIntegrationPolicy,
  validateIntegrationPolicyPatch,
} from "./integration-policy";
import type { PatchUserSettingsDto, UserSettingsDto } from "./settings.types";

type UserSettingsRow = {
  profile_id: string;
  inventory_scan_interval_minutes: number;
  autobuy_on_low_stock: boolean;
  daily_budget_ceiling_krw: number | null;
  notify_push_urgent: boolean;
  notify_daily_email: boolean;
  notify_webhook_url: string | null;
  integration_policy: unknown | null;
  updated_at: string;
};

const DEFAULTS: Omit<UserSettingsDto, "profile_id" | "updated_at"> = {
  inventory_scan_interval_minutes: 15,
  autobuy_on_low_stock: true,
  daily_budget_ceiling_krw: 2_000_000,
  notify_push_urgent: true,
  notify_daily_email: false,
  notify_webhook_url: null,
  integration_policy: DEFAULT_INTEGRATION_POLICY,
};

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private readonly supabase: SupabaseService) {}

  private rowToDto(row: UserSettingsRow): UserSettingsDto {
    return {
      profile_id: row.profile_id,
      inventory_scan_interval_minutes: row.inventory_scan_interval_minutes,
      autobuy_on_low_stock: row.autobuy_on_low_stock,
      daily_budget_ceiling_krw: row.daily_budget_ceiling_krw,
      notify_push_urgent: row.notify_push_urgent,
      notify_daily_email: row.notify_daily_email,
      notify_webhook_url: row.notify_webhook_url,
      integration_policy: mergeIntegrationPolicy(row.integration_policy),
      updated_at: row.updated_at,
    };
  }

  async getForProfile(profileId: string): Promise<UserSettingsDto> {
    const { data, error } = await this.supabase.client
      .from("user_settings")
      .select("*")
      .eq("profile_id", profileId)
      .maybeSingle();

    if (error) {
      this.logger.error(`user_settings get: ${error.message}`);
      throw error;
    }

    if (!data) {
      return { ...DEFAULTS };
    }

    return this.rowToDto(data as UserSettingsRow);
  }

  private validatePatch(patch: PatchUserSettingsDto): void {
    if (patch.inventory_scan_interval_minutes !== undefined) {
      const v = patch.inventory_scan_interval_minutes;
      if (!Number.isInteger(v) || v < 5 || v > 120) {
        throw new BadRequestException(
          "inventory_scan_interval_minutes must be 5–120",
        );
      }
    }
    if (patch.daily_budget_ceiling_krw !== undefined) {
      const v = patch.daily_budget_ceiling_krw;
      if (v !== null && (typeof v !== "number" || v < 0 || v > 9_999_999_999_999)) {
        throw new BadRequestException("daily_budget_ceiling_krw invalid");
      }
    }
    if (patch.notify_webhook_url !== undefined && patch.notify_webhook_url !== null) {
      const s = patch.notify_webhook_url.trim();
      if (s.length > 2000) {
        throw new BadRequestException("notify_webhook_url too long");
      }
    }
    if (patch.integration_policy !== undefined) {
      validateIntegrationPolicyPatch(patch.integration_policy);
    }
  }

  async patchForProfile(
    profileId: string,
    patch: PatchUserSettingsDto,
  ): Promise<UserSettingsDto> {
    this.validatePatch(patch);
    const current = await this.getForProfile(profileId);
    const nextIntegrationPolicy =
      patch.integration_policy !== undefined
        ? mergeIntegrationPolicy({
            ...current.integration_policy,
            ...patch.integration_policy,
          })
        : current.integration_policy;

    const next: UserSettingsDto = {
      ...current,
      ...patch,
      integration_policy: nextIntegrationPolicy,
      notify_webhook_url:
        patch.notify_webhook_url === undefined
          ? current.notify_webhook_url
          : patch.notify_webhook_url === null || patch.notify_webhook_url === ""
            ? null
            : patch.notify_webhook_url.trim(),
    };

    const now = new Date().toISOString();
    const row = {
      profile_id: profileId,
      inventory_scan_interval_minutes: next.inventory_scan_interval_minutes,
      autobuy_on_low_stock: next.autobuy_on_low_stock,
      daily_budget_ceiling_krw: next.daily_budget_ceiling_krw,
      notify_push_urgent: next.notify_push_urgent,
      notify_daily_email: next.notify_daily_email,
      notify_webhook_url: next.notify_webhook_url,
      integration_policy: next.integration_policy,
      updated_at: now,
    };

    const { data, error } = await this.supabase.client
      .from("user_settings")
      .upsert(row, { onConflict: "profile_id" })
      .select("*")
      .single();

    if (error) {
      this.logger.error(`user_settings upsert: ${error.message}`);
      throw error;
    }

    return this.rowToDto(data as UserSettingsRow);
  }
}
