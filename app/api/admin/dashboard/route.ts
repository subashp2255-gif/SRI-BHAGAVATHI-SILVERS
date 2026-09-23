import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDashboardMetrics } from "@/lib/db/repo";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const metrics = getDashboardMetrics();
    return NextResponse.json({ metrics });
  } catch (err) {
    console.error("Error fetching dashboard metrics:", err);
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}
