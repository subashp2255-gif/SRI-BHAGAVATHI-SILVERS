import { NextResponse } from "next/server";
import { COOKIE_NAME, getAdminSession } from "@/lib/auth";
import { createAuditLog } from "@/lib/db/repo";

export async function POST() {
  const session = await getAdminSession();
  if (session) {
    createAuditLog({
      adminEmail: session.email,
      action: "ADMIN_LOGOUT",
      entity: "AUTH",
      entityId: session.id,
      details: "Admin logged out successfully",
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
