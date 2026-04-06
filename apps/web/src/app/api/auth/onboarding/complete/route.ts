import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api";
import { AUTH_JWT_COOKIE } from "@/lib/auth-cookie";
import { getJwtSecretKey } from "@/lib/jwt-verify";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_JWT_COOKIE)?.value;
  if (!token?.trim()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const key = getJwtSecretKey();
  if (!key) {
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const res = await fetch(`${getApiUrl()}/auth/onboarding/complete`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token.trim()}` },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "onboarding_complete_failed" },
      { status: res.status >= 500 ? 502 : res.status },
    );
  }

  const body = (await res.json()) as { token?: string };
  const newToken = body.token?.trim();
  if (!newToken) {
    return NextResponse.json({ error: "invalid_upstream" }, { status: 502 });
  }

  try {
    const { payload } = await jwtVerify(newToken, key);
    if (typeof payload.exp !== "number") {
      return NextResponse.json({ error: "invalid_token" }, { status: 401 });
    }
    const now = Math.floor(Date.now() / 1000);
    const maxAge = payload.exp - now;
    if (maxAge <= 0) {
      return NextResponse.json({ error: "token_expired" }, { status: 401 });
    }

    const out = NextResponse.json({ token: newToken });
    out.cookies.set(AUTH_JWT_COOKIE, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    return out;
  } catch {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }
}
