import { NextResponse } from "next/server";
import { getLatestSilverRate } from "@/lib/db/repo";

export async function GET() {
  try {
    const baseUrl = (process.env.NEXT_PUBLIC_RATE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
    try {
      const res = await fetch(`${baseUrl}/rates`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const silverPrice = Number(data.silver);
        if (!isNaN(silverPrice) && silverPrice > 0) {
          return NextResponse.json({
            finalPrice: silverPrice,
            formattedFinalPrice: `₹${silverPrice.toFixed(2)}`,
            currency: "INR",
            unit: data.unit || "gram",
            date: new Date().toISOString().split("T")[0],
            formattedDate: new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            perGram: silverPrice,
            perGram925: silverPrice,
            per10Gram: Math.round(silverPrice * 10 * 100) / 100,
            perKg: Math.round(silverPrice * 1000 * 100) / 100,
            source: data.source || "MJDTA",
            isLive: true,
          }, {
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          });
        }
      }
    } catch {
      // Fallback to local DB if backend fetch fails
    }

    const activeRate = getLatestSilverRate();

    const payload = {
      finalPrice: activeRate.ratePerGram999,
      formattedFinalPrice: `₹${activeRate.ratePerGram999.toFixed(2)}`,
      currency: "INR",
      unit: "gram",
      date: new Date().toISOString().split("T")[0],
      formattedDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      perGram: activeRate.ratePerGram999,
      perGram925: activeRate.ratePerGram925,
      per10Gram: Math.round(activeRate.ratePerGram999 * 10 * 100) / 100,
      perKg: Math.round(activeRate.ratePerGram999 * 1000 * 100) / 100,
      source: activeRate.source || "Certified Boutique Atelier",
      isLive: activeRate.mode === "API",
      config: activeRate.config,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("Error in silver-rate API:", err);
    return NextResponse.json(
      { error: "Silver Rate · Currently unavailable" },
      { status: 503 }
    );
  }
}
