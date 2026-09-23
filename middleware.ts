import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "sri-bhagavathi-silvers-admin-super-secret-key-2026-production"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login routes
  if (pathname === "/admin/login" || pathname === "/api/admin/auth/login") {
    return NextResponse.next();
  }

  // Check if target is an admin route
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  // Get session token
  const token = request.cookies.get("admin_session")?.value;

  if (!token) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // Check super admin only routes
    const isSuperAdminOnly =
      pathname.startsWith("/admin/users") ||
      pathname.startsWith("/api/admin/users") ||
      pathname.startsWith("/admin/settings");

    if (isSuperAdminOnly && role !== "SUPER_ADMIN") {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Forbidden: Super Admin access required" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/admin?error=forbidden", request.url));
    }

    return NextResponse.next();
  } catch {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Session expired or invalid" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
