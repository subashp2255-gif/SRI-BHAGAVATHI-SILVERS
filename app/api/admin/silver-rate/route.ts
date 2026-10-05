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

  const baseUrl = (process.env.NEXT_PUBLIC_RATE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
  let liveData: any = null;

  try {
    const res = await fetch(`${baseUrl}/rates`, { cache: "no-store" });
    if (res.ok) {
      liveData = await res.json();
    }
  } catch (err) {
    console.error("Failed to connect to FastAPI backend:", err);
  }

  const dbRate = getLatestSilverRate();
  const history = getSilverRateHistory(30);

  // If live backend rate is active, construct currentRate with live values
  const currentRate = liveData && liveData.silver ? {
    ratePerGram999: Number(liveData.silver),
    ratePerGram925: Math.round(Number(liveData.silver) * 0.925 * 100) / 100,
    gold22k: Number(liveData.gold22k) || 0,
    mode: "API",
    manualOverride: false,
    purity: "999",
    source: liveData.source || "MJDTA",
    timestamp: liveData.updatedAt || new Date().toISOString(),
    status: liveData.status || "success",
    config: dbRate.config,
  } : dbRate;

  return NextResponse.json({ currentRate, history, liveBackendRate: liveData });
}

export async function POST() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const baseUrl = (process.env.NEXT_PUBLIC_RATE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
    const apiKey = process.env.RATE_ADMIN_API_KEY || "sri_bhagavathi_admin_secret_key_2026";

    // Trigger on-demand sync from MJDTA via FastAPI backend
    const res = await fetch(`${baseUrl}/admin/rates/update`, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Backend scrape failed: ${res.status} ${errText}`);
    }

    const data = await res.json();
    const silverPrice = Number(data.silver);

    if (isNaN(silverPrice) || silverPrice <= 0) {
      throw new Error("Invalid silver rate received from backend");
    }

    // Save live synced rate into local records
    const updated = createSilverRateRecord({
      ratePerGram999: silverPrice,
      ratePerGram925: Math.round(silverPrice * 0.925 * 100) / 100,
      mode: "API",
      manualOverride: false,
      purity: "999",
      source: data.source || "MJDTA",
      adminEmail: session.email,
    });

    createAuditLog({
      adminEmail: session.email,
      action: "LIVE_RATE_SYNCED",
      entity: "SILVER_RATE",
      details: `Live synced MJDTA silver rate: ₹${silverPrice}/g (Gold: ₹${data.gold22k || "N/A"}/g)`,
    });

    revalidatePublicSite(["/", "/api/silver-rate"]);

    return NextResponse.json({
      success: true,
      rate: updated,
      liveData: data,
    });
  } catch (err: any) {
    console.error("Error syncing silver rate from MJDTA:", err);
    return NextResponse.json(
      { error: err.message || "Failed to sync silver rate from MJDTA" },
      { status: 500 }
    );
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
