import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getLatestSilverRate,
  createSilverRateRecord,
  getSilverRateHistory,
  updateSilverRateConfig,
  createAuditLog,
} from "@/lib/db/repo";
import { revalidatePublicSite } from "@/lib/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentRate = getLatestSilverRate();
  const history = getSilverRateHistory(30);

  return NextResponse.json({ currentRate, history });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const rate999 = parseFloat(body.ratePerGram999);

    if (isNaN(rate999) || rate999 <= 0) {
      return NextResponse.json({ error: "Rate per gram must be a positive number" }, { status: 400 });
    }

    const updated = createSilverRateRecord({
      ratePerGram999: rate999,
      ratePerGram925: body.ratePerGram925 ? parseFloat(body.ratePerGram925) : undefined,
      mode: body.mode || "MANUAL",
      manualOverride: body.manualOverride !== false,
      purity: body.purity || "999",
      source: body.source || "Certified Boutique Atelier",
      changeVal: body.changeVal || 0,
      changePercent: body.changePercent || 0,
      adminEmail: session.email,
    });

    createAuditLog({
      adminEmail: session.email,
      action: "SILVER_RATE_UPDATED",
      entity: "SILVER_RATE",
      details: `Updated 999 silver rate to ₹${rate999}/g (Mode: ${body.mode || "MANUAL"})`,
    });

    revalidatePublicSite(["/", "/api/silver-rate"]);

    return NextResponse.json({ success: true, rate: updated });
  } catch (err) {
    console.error("Error updating silver rate:", err);
    return NextResponse.json({ error: "Failed to update silver rate" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    updateSilverRateConfig(body);

    createAuditLog({
      adminEmail: session.email,
      action: "SILVER_RATE_CONFIG_UPDATED",
      entity: "SILVER_RATE",
      details: `Updated top rate bar display settings`,
    });

    revalidatePublicSite(["/", "/api/silver-rate"]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating silver rate config:", err);
    return NextResponse.json({ error: "Failed to update silver rate config" }, { status: 500 });
  }
}
