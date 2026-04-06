"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Novitas } from "@/components/novitas";
import {
  SettingsApiSection,
  SettingsAutobuySection,
  SettingsFormActions,
  SettingsIntegrationPolicySection,
  SettingsNotifySection,
} from "@/app/dashboard/settings/settings-sections";
import { accessTokenAtom } from "@/lib/auth-atoms";
import { getApiUrl } from "@/lib/api";
import {
  DEFAULT_INTEGRATION_POLICY,
  fetchUserSettings,
  isSettingsFetchNetworkError,
  patchUserSettings,
  type UserSettingsDto,
} from "@/lib/settings-api";

function dtoToFormState(d: UserSettingsDto) {
  return {
    inventory_scan_interval_minutes: d.inventory_scan_interval_minutes,
    autobuy_on_low_stock: d.autobuy_on_low_stock,
    daily_budget_ceiling_krw: d.daily_budget_ceiling_krw ?? 2_000_000,
    notify_push_urgent: d.notify_push_urgent,
    notify_daily_email: d.notify_daily_email,
    notify_webhook_url: d.notify_webhook_url ?? "",
    integration_policy: {
      ...DEFAULT_INTEGRATION_POLICY,
      ...d.integration_policy,
    },
  };
}

export function SettingsClient() {
  const token = useAtomValue(accessTokenAtom);
  const setToken = useSetAtom(accessTokenAtom);
  const queryClient = useQueryClient();
  /** sessionStorage 토큰은 서버와 클라 첫 페인트가 달라 hydration 오류가 나므로, 마운트 후에만 분기합니다. */
  const [mounted, setMounted] = useState(false);
  const [cookieSyncDone, setCookieSyncDone] = useState(false);
  const [form, setForm] = useState<ReturnType<typeof dtoToFormState> | null>(
    null,
  );
  const [saveErr, setSaveErr] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /** 미들웨어는 HttpOnly JWT로 통과했는데 sessionStorage에 토큰이 없으면 Nest 호출이 막힘 → 쿠키에서 복구 */
  useEffect(() => {
    if (!mounted) return;
    if (token) {
      setCookieSyncDone(true);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/auth/resolve-token", {
          credentials: "same-origin",
        });
        if (!res.ok) {
          return;
        }
        const body = (await res.json()) as { token?: string };
        if (body.token && !cancelled) setToken(body.token);
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setCookieSyncDone(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mounted, token, setToken]);

  const canQuery = mounted && cookieSyncDone && Boolean(token);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["settings", token],
    queryFn: () => fetchUserSettings(token!),
    enabled: canQuery,
    retry: 1,
  });

  useEffect(() => {
    if (data) setForm(dtoToFormState(data));
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (patch: Partial<UserSettingsDto>) => {
      if (!token) throw new Error("no token");
      return patchUserSettings(token, patch);
    },
    onSuccess: (next) => {
      queryClient.setQueryData(["settings", token], next);
      setForm(dtoToFormState(next));
      setSaveErr(null);
    },
    onError: () => {
      setSaveErr("저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
    },
  });

  const onSave = useCallback(() => {
    if (!form || !token) return;
    setSaveErr(null);
    mutation.mutate({
      inventory_scan_interval_minutes: form.inventory_scan_interval_minutes,
      autobuy_on_low_stock: form.autobuy_on_low_stock,
      daily_budget_ceiling_krw: form.daily_budget_ceiling_krw,
      notify_push_urgent: form.notify_push_urgent,
      notify_daily_email: form.notify_daily_email,
      notify_webhook_url: form.notify_webhook_url.trim() || null,
      integration_policy: form.integration_policy,
    });
  }, [form, token, mutation]);

  const onReset = useCallback(() => {
    if (data) setForm(dtoToFormState(data));
    setSaveErr(null);
  }, [data]);

  if (!mounted) {
    return (
      <div className="flex flex-col">
        <Novitas.PageHeader
          title="설정"
          description="자동 발주·알림 규칙은 계정에 저장돼요."
        />
        <Novitas.DashboardContent>
          <p className="text-xs leading-relaxed text-[var(--color-muted)]">불러오는 중…</p>
        </Novitas.DashboardContent>
      </div>
    );
  }

  if (mounted && !token && !cookieSyncDone) {
    return (
      <div className="flex flex-col">
        <Novitas.PageHeader
          title="설정"
          description="자동 발주·알림 규칙은 계정에 저장돼요."
        />
        <Novitas.DashboardContent>
          <p className="text-xs leading-relaxed text-[var(--color-muted)]">
            세션을 연결하는 중이에요…
          </p>
        </Novitas.DashboardContent>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col">
        <Novitas.PageHeader
          title="설정"
          description="자동 발주·알림 규칙은 계정에 저장돼요."
        />
        <Novitas.DashboardContent>
          <p className="text-xs leading-relaxed text-[var(--color-muted)]">로그인이 필요해요.</p>
        </Novitas.DashboardContent>
      </div>
    );
  }

  if (isError) {
    const apiBase = getApiUrl();
    const network = isSettingsFetchNetworkError(error);
    return (
      <div className="flex flex-col">
        <Novitas.PageHeader
          title="설정"
          description="자동 발주·알림 규칙은 계정에 저장돼요."
        />
        <Novitas.DashboardContent>
          {network ? (
            <p className="text-xs leading-relaxed text-rose-600">
              API 서버에 연결할 수 없어요. apps/api에서 개발 서버를 켜 주세요. (예: npm run dev,
              기본 포트 4000) 웹 앱의 NEXT_PUBLIC_API_URL이 지금{" "}
              <span className="font-mono text-xs">{apiBase}</span> 로 맞는지도 확인해 주세요.
            </p>
          ) : (
            <p className="text-xs leading-relaxed text-rose-600">
              설정을 불러오지 못했어요. 로그인·NEXT_PUBLIC_API_URL·Supabase 마이그레이션을 확인해
              주세요.
            </p>
          )}
        </Novitas.DashboardContent>
      </div>
    );
  }

  if (isPending || !form) {
    return (
      <div className="flex flex-col">
        <Novitas.PageHeader
          title="설정"
          description="자동 발주·알림 규칙은 계정에 저장돼요. 재고 스캔 주기는 이후 에이전트가 참고합니다."
        />
        <Novitas.DashboardContent>
          <p className="text-xs leading-relaxed text-[var(--color-muted)]">
            설정을 불러오는 중이에요…
          </p>
        </Novitas.DashboardContent>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Novitas.PageHeader
        title="설정"
        description="자동 발주·알림 규칙은 계정에 저장돼요. 재고 스캔 주기는 이후 에이전트가 참고합니다."
      />
      <Novitas.DashboardContent innerClassName="space-y-10 pb-10 sm:pb-12">
        <SettingsAutobuySection
          scanInterval={form.inventory_scan_interval_minutes}
          onScanIntervalChange={(v) =>
            setForm((f) => (f ? { ...f, inventory_scan_interval_minutes: v } : f))
          }
          autobuyOnLow={form.autobuy_on_low_stock}
          onAutobuyOnLowChange={(v) =>
            setForm((f) => (f ? { ...f, autobuy_on_low_stock: v } : f))
          }
          dailyBudgetKrw={form.daily_budget_ceiling_krw}
          onDailyBudgetChange={(v) =>
            setForm((f) => (f ? { ...f, daily_budget_ceiling_krw: v } : f))
          }
        />
        <SettingsNotifySection
          pushUrgent={form.notify_push_urgent}
          onPushUrgent={(v) =>
            setForm((f) => (f ? { ...f, notify_push_urgent: v } : f))
          }
          dailyEmail={form.notify_daily_email}
          onDailyEmail={(v) =>
            setForm((f) => (f ? { ...f, notify_daily_email: v } : f))
          }
          webhookUrl={form.notify_webhook_url}
          onWebhookUrl={(v) =>
            setForm((f) => (f ? { ...f, notify_webhook_url: v } : f))
          }
        />
        <SettingsIntegrationPolicySection
          policy={form.integration_policy}
          onPolicyChange={(patch) =>
            setForm((f) =>
              f
                ? {
                    ...f,
                    integration_policy: { ...f.integration_policy, ...patch },
                  }
                : f,
            )
          }
        />
        <SettingsApiSection />
        {saveErr ? (
          <p className="text-xs font-medium leading-relaxed text-rose-600" role="alert">
            {saveErr}
          </p>
        ) : null}
        <SettingsFormActions
          onSave={onSave}
          onReset={onReset}
          saving={mutation.isPending}
        />
      </Novitas.DashboardContent>
    </div>
  );
}
