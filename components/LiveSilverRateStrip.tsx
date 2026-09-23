"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useSilverRate } from "@/lib/silverRate";
import { rateStripEnter, statusPulse } from "@/lib/animations";
import { SilverRateModal } from "./SilverRateModal";

export function LiveSilverRateStrip() {
  const { rate, loading, error, refreshRate } = useSilverRate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <motion.div
        variants={rateStripEnter}
        initial="hidden"
        animate="visible"
        className="w-full bg-[#010101] text-[#ffffff] border-b border-[#222222] relative z-40 metallic-sheen shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 sm:h-12 flex items-center justify-between gap-4 text-xs font-sans-editorial">
          {/* Left: Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#121212] px-2.5 py-1 border border-[#333333]">
              <motion.span
                variants={statusPulse}
                initial="initial"
                animate="animate"
                className={`w-2 h-2 rounded-full ${error ? "bg-[#D98A8A]" : "bg-[#c5a880]"}`}
              />
              <span className="font-sans-editorial text-[10px] font-bold tracking-widest text-[#c5a880] uppercase">
                {loading ? "LOADING" : error ? "UNAVAILABLE" : "TODAY"}
              </span>
            </div>
          </div>

          {/* Center: Customer Silver Rate */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => rate && setModalOpen(true)}>
            {loading ? (
              <span className="font-mono text-sm tracking-wider text-[#888888] animate-pulse">
                ✦ SILVER RATE Loading...
              </span>
            ) : error || !rate ? (
              <span className="text-[#D98A8A] text-[11px] font-semibold">
                ✦ SILVER RATE Currently unavailable
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[#c5a880] font-bold">✦</span>
                <span className="text-[#aaaaaa] font-semibold tracking-wider text-[11px] uppercase">
                  TODAY&apos;S SILVER RATE
                </span>
                <span className="font-mono text-sm font-bold text-[#ffffff] tracking-tight tabular-nums">
                  {rate.formattedFinalPrice || `₹${rate.finalPrice.toFixed(2)}`}
                  <span className="text-[10px] font-normal text-[#888888] ml-1">/ gram</span>
                </span>
              </div>
            )}
          </div>

          {/* Right: Date */}
          <div className="flex items-center gap-3">
            {rate && (
              <span className="hidden lg:flex items-center gap-1 text-[10px] text-[#888888]">
                <Clock className="w-3 h-3 text-[#c5a880]" />
                {rate.formattedDate || rate.date}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <SilverRateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        rate={rate}
        onRefresh={refreshRate}
      />
    </>
  );
}
