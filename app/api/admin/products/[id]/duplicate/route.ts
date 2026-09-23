import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { duplicateProduct, createAuditLog } from "@/lib/db/repo";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const duplicated = duplicateProduct(id);

  if (!duplicated) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  createAuditLog({
    adminEmail: session.email,
    action: "PRODUCT_DUPLICATED",
    entity: "PRODUCT",
    entityId: duplicated.id,
    details: `Duplicated product from '${id}' to '${duplicated.id}'`,
  });

  return NextResponse.json({ product: duplicated });
}
