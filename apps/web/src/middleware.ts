import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_JWT_COOKIE } from "@/lib/auth-cookie";

function redirectToLogin(req: NextRequest, pathname: string, error?: string) {
  const url = new URL("/login", req.url);
  url.searchParams.set("next", pathname + req.nextUrl.search);
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_JWT_COOKIE)?.value;
  const secret = process.env.JWT_SECRET;

  const withClearedAuth = (res: NextResponse) => {
    res.cookies.delete(AUTH_JWT_COOKIE);
    return res;
  };

  const needsAuth =
    pathname.startsWith("/dashboard") || pathname === "/onboarding";

  if (needsAuth && !secret) {
    return redirectToLogin(req, pathname, "config");
  }

  if (needsAuth && secret) {
    const key = new TextEncoder().encode(secret);
    if (!token) {
      return redirectToLogin(req, pathname);
    }
    try {
      const { payload } = await jwtVerify(token, key);
      const onboarding = payload.onboardingCompleted as boolean | undefined;

      if (onboarding === false && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
      if (onboarding === true && pathname === "/onboarding") {
        return NextResponse.redirect(
          new URL("/dashboard/overview", req.url),
        );
      }

      return NextResponse.next();
    } catch {
      return withClearedAuth(redirectToLogin(req, pathname, "session"));
    }
  }

  if (pathname === "/login" && secret) {
    const key = new TextEncoder().encode(secret);
    if (token) {
      try {
        await jwtVerify(token, key);
        return NextResponse.redirect(new URL("/dashboard/overview", req.url));
      } catch {
        return withClearedAuth(NextResponse.next());
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding", "/login"],
};
