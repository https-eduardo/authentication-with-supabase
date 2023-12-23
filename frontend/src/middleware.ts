import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_BASE_URL } from "./constants/api";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  if (isAuthRoute && access_token)
    return NextResponse.redirect(new URL("/", request.url));

  if (!isAuthRoute && access_token) {
    const fetchResponse = await fetch(`${API_BASE_URL}/users/me`, {
      method: "GET",
      headers: { Cookie: cookies().toString() },
    });

    if (!fetchResponse.ok) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      response.cookies.set("access_token", "", { maxAge: 0 });
      return response;
    }
  }

  if (!isAuthRoute && !access_token)
    return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
