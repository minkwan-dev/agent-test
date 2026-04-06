/** PostgREST / Supabase-js 에러 객체를 로그용 문자열로 만듭니다. */
export function formatSupabaseError(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "object" && e !== null) {
    const o = e as Record<string, unknown>;
    const message = typeof o.message === "string" ? o.message : "";
    const code = o.code != null ? String(o.code) : "";
    const details = typeof o.details === "string" ? o.details : "";
    const hint = typeof o.hint === "string" ? o.hint : "";
    const parts = [message, code && `code=${code}`, details, hint].filter(
      Boolean,
    );
    if (parts.length) return parts.join(" | ");
    try {
      return JSON.stringify(e);
    } catch {
      return String(e);
    }
  }
  return String(e);
}
