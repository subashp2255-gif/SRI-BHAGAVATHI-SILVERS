"use client";

import React from "react";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#010101] text-[#fbf9f4] py-2 px-4 text-center border-b border-[#1c1c1c] overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.18em] font-semibold text-[#eae8e3]">
        <span className="hidden sm:inline-flex items-center gap-1 text-[#c5a880]">
          <ShieldCheck className="w-3.5 h-3.5" /> BIS 925 Hallmark Assured
        </span>
        <span className="hidden sm:inline text-[#747878]">•</span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880] animate-pulse" />
          Authentic Silver • Traditional Craftsmanship • Free Express Insured Shipping Across India
        </span>
        <span className="hidden lg:inline text-[#747878]">•</span>
        <span className="hidden lg:inline-flex items-center gap-1 text-[#c5a880]">
          <Truck className="w-3.5 h-3.5" /> Insured Doorstep Delivery
        </span>
      </div>
    </div>
  );
}
