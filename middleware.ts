import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isTokenExpired(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString()
    );

    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/logout")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (pathname.startsWith("/login")) {
    if (token && !isTokenExpired(token)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!token || isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Excluye archivos internos de Next.js y archivos estáticos
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};