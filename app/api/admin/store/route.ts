import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getStoreConfig, updateStoreConfig, createAuditLog } from "@/lib/db/repo";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = getStoreConfig();
  return NextResponse.json({ store });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    updateStoreConfig(body);

    createAuditLog({
      adminEmail: session.email,
      action: "STORE_CONFIG_UPDATED",
      entity: "STORE",
      details: "Updated showroom contact & location information",
    });

    revalidatePublicSite(["/", "/contact", "/visit-our-store"]);

    return NextResponse.json({ success: true, store: getStoreConfig() });
  } catch (err) {
    console.error("Error updating store config:", err);
    return NextResponse.json({ error: "Failed to update store config" }, { status: 500 });
  }
}
