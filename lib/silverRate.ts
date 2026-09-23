"use client";

import { useState, useEffect, useCallback } from "react";

export interface SilverRate {
  finalPrice: number;
  formattedFinalPrice: string;
  currency: string;
  unit: string;
  date: string;
  formattedDate: string;
  // Compatibility fields for showcase views
  perGram: number;
  perGram925: number;
  per10Gram: number;
  perKg: number;
  purity?: string;
  source?: string;
  updatedAt?: string;
  isLive?: boolean;
  change?: number;
  changePercent?: number;
  isStale?: boolean;
}

export const INITIAL_SILVER_RATE: SilverRate = {
  finalPrice: 247.04,
  formattedFinalPrice: "₹247.04",
  currency: "INR",
  unit: "gram",
  date: new Date().toISOString().split("T")[0],
  formattedDate: new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  perGram: 247.04,
  perGram925: 247.04,
  per10Gram: 2470.40,
  perKg: 247040,
  source: "Certified Boutique Atelier",
  updatedAt: new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  isLive: false,
};

export function useSilverRate() {
  const [rate, setRate] = useState<SilverRate>(INITIAL_SILVER_RATE);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedPurity, setSelectedPurity] = useState<"999" | "925">("925");

  const fetchRate = useCallback(async () => {
    setLoading(true);
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_RATE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/rates`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch daily silver rate");
      const data = await res.json();
      
      const silverPrice = Number(data.silver);
      if (isNaN(silverPrice) || silverPrice <= 0) throw new Error("Invalid silver rate value received");

      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      const formattedDateStr = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const customerRate: SilverRate = {
        finalPrice: silverPrice,
        formattedFinalPrice: `₹${silverPrice.toFixed(2)}`,
        currency: "INR",
        unit: data.unit || "INR/gram",
        date: dateStr,
        formattedDate: formattedDateStr,
        perGram: silverPrice,
        perGram925: silverPrice,
        per10Gram: Math.round(silverPrice * 10 * 100) / 100,
        perKg: Math.round(silverPrice * 1000 * 100) / 100,
        source: data.source || "MJDTA",
        updatedAt: formattedDateStr,
        isLive: true,
      };

      setRate(customerRate);
      setError(false);
    } catch (err) {
      console.error("Error fetching silver rate from backend API:", err);
      setError(true);
      // Retain previous rate / fallback value if API fails
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRate();

    // Auto-refresh rate every 15 minutes (15 * 60 * 1000 ms)
    const interval = setInterval(() => {
      fetchRate();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchRate]);

  return {
    rate,
    loading,
    error,
    selectedPurity,
    setSelectedPurity,
    activePrice: rate.finalPrice,
    recentlyUpdated: false,
    refreshRate: fetchRate,
  };
}
