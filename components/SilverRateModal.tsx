"use client";

import React from "react";
import { X, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SilverRate } from "@/lib/silverRate";
import { ratePanelOpen } from "@/lib/animations";

interface SilverRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  rate: SilverRate;
  onRefresh: () => void;
}

export function SilverRateModal({
  isOpen,
  onClose,
  rate,
  onRefresh,
}: SilverRateModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4 pointer-events-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#010101]/60 backdrop-blur-xs pointer-events-auto"
        />

        {/* Desktop Panel Container */}
        <motion.div
          variants={ratePanelOpen}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-lg bg-[#010101] text-[#ffffff] border border-[#333333] shadow-2xl p-6 sm:p-8 z-10 pointer-events-auto metallic-sheen"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-ping" />
              <span className="font-serif-luxury text-lg text-[#ffffff] font-semibold tracking-wide">
                Today&apos;s Silver Rate
              </span>
            </div>
            <button
              suppressHydrationWarning
              onClick={onClose}
              className="p-1 text-[#888888] hover:text-[#ffffff] transition-colors rounded-full"
              aria-label="Close Silver Rate Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Customer Final Rate Card */}
          <div className="my-5 space-y-3 font-sans-editorial">
            <div className="p-4 bg-[#121212] border border-[#222222] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#888888] uppercase tracking-wider block">Customer Price per Gram (1g)</span>
                <span className="text-[#c5a880] font-bold text-xs uppercase">
                  BIS 925 Hallmarked Silver
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-[#ffffff] tabular-nums">
                  {rate.formattedFinalPrice || `₹${rate.finalPrice.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#121212] border border-[#222222]">
                <span className="text-[10px] text-[#888888] uppercase tracking-wider block">10 Grams (1 Tola)</span>
                <span className="font-mono text-base font-bold text-[#ffffff] tabular-nums">
                  ₹{(rate.finalPrice * 10).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3.5 bg-[#121212] border border-[#222222]">
                <span className="text-[10px] text-[#888888] uppercase tracking-wider block">1 Kilogram (1kg)</span>
                <span className="font-mono text-base font-bold text-[#ffffff] tabular-nums">
                  ₹{(rate.finalPrice * 1000).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Date & Trust Footer */}
          <div className="mt-6 pt-4 border-t border-[#222222] space-y-3 font-sans-editorial text-xs text-[#888888]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#aaaaaa]">
                <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
                Confirmed: {rate.formattedDate || rate.date}
              </span>
              <button
                suppressHydrationWarning
                onClick={onRefresh}
                className="flex items-center gap-1 text-[#c5a880] hover:underline font-semibold"
              >
                <RefreshCw className="w-3 h-3" /> Refresh Price
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#666666]">
              <span>Sri Bhagavathi Silvers Atelier</span>
              <span className="flex items-center gap-1 text-[#c5a880]">
                <ShieldCheck className="w-3.5 h-3.5" /> Certified Hallmark 925
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
