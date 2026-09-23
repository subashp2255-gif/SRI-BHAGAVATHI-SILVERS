import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getProductById, saveProduct, archiveProduct, createAuditLog } from "@/lib/db/repo";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = saveProduct({ ...body, id });

    createAuditLog({
      adminEmail: session.email,
      action: "PRODUCT_UPDATED",
      entity: "PRODUCT",
      entityId: id,
      details: `Updated product '${updated?.name}' status=${updated?.status}`,
    });

    revalidatePublicSite(["/", "/shop"]);

    return NextResponse.json({ product: updated });
  } catch (err) {
    console.error("Error updating product:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  archiveProduct(id);

  createAuditLog({
    adminEmail: session.email,
    action: "PRODUCT_ARCHIVED",
    entity: "PRODUCT",
    entityId: id,
    details: `Archived product '${product.name}'`,
  });

  revalidatePublicSite(["/", "/shop"]);

  return NextResponse.json({ success: true, message: "Product archived successfully" });
}
