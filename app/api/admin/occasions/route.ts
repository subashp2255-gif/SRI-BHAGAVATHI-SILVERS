import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getOccasions, saveOccasion, createAuditLog } from "@/lib/db/repo";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const occasions = getOccasions();
  return NextResponse.json({ occasions });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.heroImage) {
      return NextResponse.json({ error: "Name and hero image are required" }, { status: 400 });
    }

    saveOccasion(body);

    createAuditLog({
      adminEmail: session.email,
      action: "OCCASION_SAVED",
      entity: "OCCASION",
      details: `Saved occasion '${body.name}'`,
    });

    revalidatePublicSite(["/", "/occasions"]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saving occasion:", err);
    return NextResponse.json({ error: "Failed to save occasion" }, { status: 500 });
  }
}
