import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getCategories, saveCategory, createAuditLog } from "@/lib/db/repo";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = getCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.image) {
      return NextResponse.json({ error: "Name and image are required" }, { status: 400 });
    }

    const id = body.id || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    saveCategory({ ...body, id });

    createAuditLog({
      adminEmail: session.email,
      action: "CATEGORY_SAVED",
      entity: "CATEGORY",
      entityId: id,
      details: `Saved category '${body.name}'`,
    });

    revalidatePublicSite(["/", "/shop"]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saving category:", err);
    return NextResponse.json({ error: "Failed to save category" }, { status: 500 });
  }
}
