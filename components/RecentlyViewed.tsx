"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { Eye } from "lucide-react";

interface RecentlyViewedProps {
  onQuickView: (product: Product) => void;
}

export function RecentlyViewed({ onQuickView }: RecentlyViewedProps) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sb_recently_viewed");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed.slice(0, 4));
        }
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="w-full bg-[#f5f3ee] py-16 border-b border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-sans-editorial text-[10px] uppercase tracking-[0.25em] text-[#725b38] font-bold block mb-1">
              Your Browsing History
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101]">
              Continue Exploring
            </h3>
          </div>
          <span className="font-sans-editorial text-xs text-[#444748] font-semibold">
            {items.length} {items.length === 1 ? "Item" : "Items"} Viewed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {items.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onQuickView(prod)}
              className="bg-[#ffffff] p-3.5 border border-[#e8e8e8] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex items-center gap-3.5"
            >
              <div className="relative w-16 h-20 bg-[#f5f3ee] border border-[#e8e8e8] shrink-0 overflow-hidden">
                <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex-grow min-w-0">
                <span className="font-sans-editorial text-[10px] text-[#725b38] uppercase font-bold block mb-0.5">
                  {prod.netWeight}
                </span>
                <h4 className="font-serif-luxury text-sm text-[#010101] truncate group-hover:text-[#725b38] transition-colors font-medium">
                  {prod.name}
                </h4>
                <p className="font-serif-luxury text-sm font-semibold text-[#010101] mt-1">
                  {prod.formattedPrice}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#f5f3ee] flex items-center justify-center shrink-0 text-[#725b38] group-hover:bg-[#010101] group-hover:text-[#ffffff] transition-colors">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Utility function to save viewed item to localStorage
export function recordRecentlyViewed(product: Product) {
  try {
    const stored = localStorage.getItem("sb_recently_viewed");
    let list: Product[] = stored ? JSON.parse(stored) : [];
    list = list.filter((p) => p.id !== product.id);
    list.unshift(product);
    localStorage.setItem("sb_recently_viewed", JSON.stringify(list.slice(0, 10)));
  } catch {
    // Ignore storage failure
  }
}
