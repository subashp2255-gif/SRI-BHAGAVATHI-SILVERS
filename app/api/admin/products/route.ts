import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getProducts, saveProduct, createAuditLog } from "@/lib/db/repo";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const status = searchParams.get("status") || undefined;

  const products = getProducts({ search, category, status });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.name || !body.category || body.price === undefined || !body.image) {
      return NextResponse.json(
        { error: "Product name, category, price, and image are required" },
        { status: 400 }
      );
    }

    const saved = saveProduct(body);

    createAuditLog({
      adminEmail: session.email,
      action: "PRODUCT_CREATED",
      entity: "PRODUCT",
      entityId: saved?.id,
      details: `Created product '${saved?.name}' in status ${saved?.status}`,
    });

    if (saved?.status === "PUBLISHED") {
      revalidatePublicSite(["/", "/shop"]);
    }

    return NextResponse.json({ product: saved }, { status: 201 });
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
