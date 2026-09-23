import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getCollections, saveCollection, createAuditLog } from "@/lib/db/repo";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const collections = getCollections();
  return NextResponse.json({ collections });
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

    saveCollection(body);

    createAuditLog({
      adminEmail: session.email,
      action: "COLLECTION_SAVED",
      entity: "COLLECTION",
      details: `Saved collection '${body.name}'`,
    });

    revalidatePublicSite(["/", "/collections"]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saving collection:", err);
    return NextResponse.json({ error: "Failed to save collection" }, { status: 500 });
  }
}
