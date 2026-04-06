import { BadRequestException } from "@nestjs/common";
import type { IntegrationPolicyDto } from "./settings.types";

export const DEFAULT_INTEGRATION_POLICY: IntegrationPolicyDto = {
  autobuy_only_linked_partners: true,
  require_store_session_for_autobuy: true,
  on_missing_store_session: "pause_and_notify",
  forbid_ad_hoc_marketplace_login: true,
};

const ACTIONS: IntegrationPolicyDto["on_missing_store_session"][] = [
  "pause_and_notify",
  "notify_only",
  "skip_partner_try_next",
];

function isAction(
  v: unknown,
): v is IntegrationPolicyDto["on_missing_store_session"] {
  return typeof v === "string" && ACTIONS.includes(v as never);
}

export function mergeIntegrationPolicy(
  stored: unknown,
): IntegrationPolicyDto {
  if (!stored || typeof stored !== "object") {
    return { ...DEFAULT_INTEGRATION_POLICY };
  }
  const o = stored as Record<string, unknown>;
  return {
    autobuy_only_linked_partners:
      typeof o.autobuy_only_linked_partners === "boolean"
        ? o.autobuy_only_linked_partners
        : DEFAULT_INTEGRATION_POLICY.autobuy_only_linked_partners,
    require_store_session_for_autobuy:
      typeof o.require_store_session_for_autobuy === "boolean"
        ? o.require_store_session_for_autobuy
        : DEFAULT_INTEGRATION_POLICY.require_store_session_for_autobuy,
    on_missing_store_session: isAction(o.on_missing_store_session)
      ? o.on_missing_store_session
      : DEFAULT_INTEGRATION_POLICY.on_missing_store_session,
    forbid_ad_hoc_marketplace_login:
      typeof o.forbid_ad_hoc_marketplace_login === "boolean"
        ? o.forbid_ad_hoc_marketplace_login
        : DEFAULT_INTEGRATION_POLICY.forbid_ad_hoc_marketplace_login,
  };
}

export function validateIntegrationPolicyPatch(
  patch: Partial<IntegrationPolicyDto>,
): void {
  if (patch.autobuy_only_linked_partners !== undefined) {
    if (typeof patch.autobuy_only_linked_partners !== "boolean") {
      throw new BadRequestException("autobuy_only_linked_partners must be boolean");
    }
  }
  if (patch.require_store_session_for_autobuy !== undefined) {
    if (typeof patch.require_store_session_for_autobuy !== "boolean") {
      throw new BadRequestException(
        "require_store_session_for_autobuy must be boolean",
      );
    }
  }
  if (patch.on_missing_store_session !== undefined) {
    if (!isAction(patch.on_missing_store_session)) {
      throw new BadRequestException("on_missing_store_session invalid");
    }
  }
  if (patch.forbid_ad_hoc_marketplace_login !== undefined) {
    if (typeof patch.forbid_ad_hoc_marketplace_login !== "boolean") {
      throw new BadRequestException(
        "forbid_ad_hoc_marketplace_login must be boolean",
      );
    }
  }
}
