"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSilverRate } from "@/lib/silverRate";
import { rateStripEnter, statusPulse } from "@/lib/animations";

export function SilverRateBar() {
  const { rate, loading, error } = useSilverRate();
  const [triggerSheen, setTriggerSheen] = useState<boolean>(false);

  useEffect(() => {
    setTriggerSheen(true);
    const timer = setTimeout(() => setTriggerSheen(false), 1200);
    return () => clearTimeout(timer);
  }, [rate?.finalPrice]);

  return (
    <motion.div
      variants={rateStripEnter}
      initial="hidden"
      animate="visible"
      className="w-full bg-[#171716] text-[#F7F4EE] border-b border-[#2A2926] relative z-40 select-none overflow-hidden"
      style={{ minHeight: "38px" }}
    >
      {/* Subtle Metallic Sheen Sweep Overlay */}
      {triggerSheen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#BFC3C6]/15 to-transparent z-10"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 sm:h-10 flex items-center justify-between text-xs font-sans-editorial">
        {/* Left: Status Dot & Label */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-1.5 bg-[#242321] px-2 py-0.5 rounded-full border border-[#33322E]">
            <motion.span
              variants={statusPulse}
              initial="initial"
              animate="animate"
              className={`w-1.5 h-1.5 rounded-full ${error ? "bg-[#D98A8A]" : "bg-[#C4AD80]"}`}
            />
            <span className="font-sans-editorial text-[9px] sm:text-[10px] font-bold tracking-widest text-[#C4AD80] uppercase">
              {loading ? "LOADING" : error ? "UNAVAILABLE" : "TODAY"}
            </span>
          </div>

          <span className="text-[#C4AD80] font-bold hidden sm:inline">✦</span>
        </div>

        {/* Center: Clean Customer-Facing Silver Rate Display */}
        <div className="flex items-center gap-2 font-sans-editorial">
          {loading && !rate ? (
            <div className="flex items-center gap-1.5 text-[#BFC3C6] font-medium tracking-wider text-[11px] uppercase animate-pulse">
              <span>✦ SILVER RATE</span>
              <span className="text-[#888888]">Loading...</span>
            </div>
          ) : !rate ? (
            <div className="flex items-center gap-1.5 text-[#D98A8A] text-[11px] font-medium tracking-wider uppercase">
              <span>✦ SILVER RATE</span>
              <span>Currently unavailable</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 font-medium tracking-wider text-[11px] uppercase">
              <span className="text-[#BFC3C6] font-bold">
                <span className="text-[#C4AD80] mr-1">✦</span>
                TODAY&apos;S SILVER RATE
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#F7F4EE] tracking-tight tabular-nums">
                {rate.formattedFinalPrice || `₹${rate.finalPrice.toFixed(2)}`}
                <span className="text-[10px] font-normal text-[#BFC3C6] ml-1">/ gram</span>
              </span>
            </div>
          )}
        </div>

        {/* Right: Date Badge */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#BFC3C6] font-sans-editorial">
          {rate && !loading && !error && (
            <span className="text-[#C4AD80] font-semibold uppercase tracking-wider">
              {rate.formattedDate || rate.date}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
