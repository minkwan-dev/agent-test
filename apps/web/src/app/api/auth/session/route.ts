import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { AUTH_JWT_COOKIE } from "@/lib/auth-cookie";
import { getJwtSecretKey } from "@/lib/jwt-verify";

export async function POST(req: Request) {
  const key = getJwtSecretKey();
  if (!key) {
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    typeof (body as { token?: unknown }).token !== "string"
  ) {
    return NextResponse.json({ error: "token_required" }, { status: 400 });
  }

  const token = (body as { token: string }).token.trim();
  if (!token) {
    return NextResponse.json({ error: "token_required" }, { status: 400 });
  }

  try {
    const { payload } = await jwtVerify(token, key);
    if (typeof payload.exp !== "number") {
      return NextResponse.json({ error: "invalid_token" }, { status: 401 });
    }
    const now = Math.floor(Date.now() / 1000);
    const maxAge = payload.exp - now;
    if (maxAge <= 0) {
      return NextResponse.json({ error: "token_expired" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(AUTH_JWT_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }
}
