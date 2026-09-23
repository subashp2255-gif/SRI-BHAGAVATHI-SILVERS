import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAuditLogs } from "@/lib/db/repo";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100", 10);

  const logs = getAuditLogs(limit);
  return NextResponse.json({ logs });
}
