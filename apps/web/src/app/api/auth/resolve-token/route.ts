import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_JWT_COOKIE } from "@/lib/auth-cookie";
import { getJwtSecretKey } from "@/lib/jwt-verify";

/** HttpOnly 쿠키에만 JWT가 있을 때 클라이언트가 Bearer로 Nest를 호출할 수 있게 토큰 문자열을 돌려줍니다. */
export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(AUTH_JWT_COOKIE)?.value;
  if (!raw?.trim()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const key = getJwtSecretKey();
  if (!key) {
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const token = raw.trim();
  try {
    const { payload } = await jwtVerify(token, key);
    if (typeof payload.exp !== "number") {
      return NextResponse.json({ error: "invalid_token" }, { status: 401 });
    }
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) {
      return NextResponse.json({ error: "token_expired" }, { status: 401 });
    }
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }
}
