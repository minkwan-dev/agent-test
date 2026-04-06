import { NextResponse } from "next/server";
import { AUTH_JWT_COOKIE } from "@/lib/auth-cookie";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(AUTH_JWT_COOKIE);
  return res;
}
