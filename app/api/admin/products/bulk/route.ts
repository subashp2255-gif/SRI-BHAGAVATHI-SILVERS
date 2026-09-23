import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { bulkUpdateProductsStatus, createAuditLog } from "@/lib/db/repo";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { ids, action } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0 || !["PUBLISHED", "DRAFT", "ARCHIVED"].includes(action)) {
      return NextResponse.json({ error: "Invalid bulk operation request" }, { status: 400 });
    }

    bulkUpdateProductsStatus(ids, action as any);

    createAuditLog({
      adminEmail: session.email,
      action: `BULK_PRODUCT_${action}`,
      entity: "PRODUCT",
      details: `Bulk updated ${ids.length} products to status ${action}`,
    });

    revalidatePublicSite(["/", "/shop"]);

    return NextResponse.json({ success: true, updatedCount: ids.length });
  } catch (err) {
    console.error("Bulk action failed:", err);
    return NextResponse.json({ error: "Failed to perform bulk action" }, { status: 500 });
  }
}
