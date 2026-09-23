"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, TrendingUp, ShieldCheck, ArrowRight, RefreshCw, ChevronDown, CheckCircle2 } from "lucide-react";
import { useSilverRate } from "@/lib/silverRate";
import { SilverRateModal } from "@/components/SilverRateModal";

/**
 * LargeSilverRateShowcase Component
 * 
 * A signature, editorial, large-format silver rate experience placed immediately
 * after the Hero section.
 * 
 * Visual Hierarchy:
 * TODAY'S SILVER RATE -> 1 GRAM -> ₹250 (80px - 140px dominant typography)
 */
export function LargeSilverRateShowcase() {
  const {
    rate,
    loading,
    error,
    selectedPurity,
    setSelectedPurity,
    activePrice,
    recentlyUpdated,
    refreshRate,
  } = useSilverRate();

  const [modalOpen, setModalOpen] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(showcaseRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Animated Count-up effect when section enters viewport or rate updates
  useEffect(() => {
    if (loading || error) return;

    if (prefersReducedMotion) {
      setDisplayPrice(activePrice);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1400; // 1.4 seconds smooth counter
    const startVal = displayPrice > 0 && Math.abs(displayPrice - activePrice) < 50 ? displayPrice : 0;
    const endVal = activePrice;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth easeOutExpo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = startVal + (endVal - startVal) * easeProgress;

      setDisplayPrice(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayPrice(endVal);
      }
    };

    const animFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, activePrice, loading, error, prefersReducedMotion]);

  return (
    <section
      id="silver-rate"
      ref={showcaseRef}
      className="py-16 sm:py-24 bg-[#0a0b0d] text-[#ffffff] relative overflow-hidden border-y border-[#c5a880]/20"
    >
      {/* 1. Subtle Moving Ambient Silver Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e12] via-[#161821] to-[#0a0b0d] opacity-90" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#e8e8e8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Oversized Background Editorial Typography Watermark */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <span className="font-serif-luxury text-[22vw] uppercase tracking-widest text-[#ffffff]/[0.025] whitespace-nowrap font-bold">
          SILVER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#12141a]/80 backdrop-blur-md border border-[#ffffff]/10 rounded-sm p-6 sm:p-10 lg:p-14 shadow-2xl metallic-sheen">
          
          {/* Top Section Header & Purity Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#ffffff]/10">
            <div>
              <div className="inline-flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold mb-2">
                <Sparkles className="w-4 h-4 text-[#c5a880] animate-pulse" />
                <span>TODAY'S SILVER RATE</span>
              </div>
              <p className="font-sans-editorial text-xs sm:text-sm text-[#a4a7a7]">
                Official Live Market Rate • BIS Hallmarked Benchmark
              </p>
            </div>

            {/* Purity Switcher Tabs */}
            <div className="flex items-center gap-2 bg-[#0a0b0d] p-1 border border-[#ffffff]/15 rounded-sm self-start md:self-auto">
              <button
                suppressHydrationWarning
                onClick={() => setSelectedPurity("999")}
                className={`px-4 py-2 font-sans-editorial text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedPurity === "999"
                    ? "bg-[#c5a880] text-[#010101] shadow-md"
                    : "text-[#a4a7a7] hover:text-[#ffffff]"
                }`}
              >
                999 Fine Pure
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setSelectedPurity("925")}
                className={`px-4 py-2 font-sans-editorial text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedPurity === "925"
                    ? "bg-[#c5a880] text-[#010101] shadow-md"
                    : "text-[#a4a7a7] hover:text-[#ffffff]"
                }`}
              >
                925 Sterling BIS
              </button>
            </div>
          </div>

          {/* MAIN EDITORIAL RATE DISPLAY AREA */}
          <div className="py-10 lg:py-14 text-center flex flex-col items-center justify-center relative">
            
            {/* 1 GRAM Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-3"
            >
              <span className="font-sans-editorial text-sm sm:text-base lg:text-lg font-bold tracking-[0.35em] text-[#c5a880] uppercase border-b border-[#c5a880]/30 pb-1 px-4">
                1 GRAM
              </span>
            </motion.div>

            {/* MASSIVE 80px - 140px PRICE HERO DISPLAY */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group cursor-pointer my-2"
              onClick={() => setModalOpen(true)}
              title="Click to view complete rate breakdown"
            >
              {loading ? (
                /* Shimmer loading skeleton preserving exact height */
                <div className="h-[90px] sm:h-[120px] lg:h-[150px] w-64 sm:w-96 bg-[#1f222e]/80 animate-pulse rounded-sm my-2 flex items-center justify-center">
                  <span className="font-mono text-2xl text-[#888888]">Loading Rate...</span>
                </div>
              ) : error ? (
                /* Error Fallback State */
                <div className="py-4">
                  <span className="font-serif-luxury text-3xl sm:text-5xl text-[#e53e3e] font-semibold">
                    Rate Currently Unavailable
                  </span>
                  <p className="font-sans-editorial text-xs text-[#a4a7a7] mt-2">
                    Please check back shortly or refresh connection.
                  </p>
                </div>
              ) : (
                /* DOMINANT RATE NUMBER */
                <div className="relative inline-block overflow-hidden">
                  <span className="font-serif-luxury text-[68px] sm:text-[96px] md:text-[115px] lg:text-[140px] font-bold text-[#ffffff] tracking-tight leading-none tabular-nums select-none group-hover:text-[#c5a880] transition-colors duration-300 drop-shadow-2xl">
                    ₹{displayPrice.toFixed(0)}
                  </span>
                  
                  {/* Metallic Light Sweep Line */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={isInView ? { x: "200%" } : {}}
                    transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[#ffffff]/40 to-transparent skew-x-12 pointer-events-none"
                  />
                </div>
              )}
            </motion.div>

            {/* Live Indicator, Timestamp & Verified Change Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-xs font-sans-editorial"
            >
              {/* Pulsing Live Dot */}
              <div className="flex items-center gap-2 bg-[#0a0b0d] px-3.5 py-1.5 border border-[#ffffff]/15 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] animate-ping" />
                <span className="font-bold tracking-widest text-[#34d399] uppercase text-[11px]">
                  {rate.isLive ? "● LIVE RATE" : "● UPDATED RATE"}
                </span>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-1.5 text-[#a4a7a7] bg-[#0a0b0d] px-3.5 py-1.5 border border-[#ffffff]/15 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Updated {rate.updatedAt}</span>
              </div>

              {/* Verified Rate Change */}
              {rate.change !== undefined && (
                <div className="flex items-center gap-1 text-[#34d399] font-bold bg-[#0a0b0d] px-3.5 py-1.5 border border-[#ffffff]/15 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+₹{rate.change.toFixed(2)} ({rate.changePercent}%) Today</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* SECONDARY QUANTITY BREAKDOWN (10 Grams & 1 Kilogram) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#ffffff]/10">
            {/* 1 Gram */}
            <div className="bg-[#0a0b0d] p-4 border border-[#ffffff]/10 rounded-sm flex items-center justify-between">
              <div>
                <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#a4a7a7] block">
                  1 Gram ({selectedPurity === "999" ? "999 Fine" : "925 BIS"})
                </span>
                <span className="font-serif-luxury text-xl font-bold text-[#ffffff] tabular-nums">
                  ₹{activePrice.toFixed(0)}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#c5a880]/60" />
            </div>

            {/* 10 Grams (1 Tola) */}
            <div className="bg-[#0a0b0d] p-4 border border-[#ffffff]/10 rounded-sm flex items-center justify-between">
              <div>
                <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#a4a7a7] block">
                  10 Grams (1 Tola)
                </span>
                <span className="font-serif-luxury text-xl font-bold text-[#ffffff] tabular-nums">
                  ₹{(activePrice * 10).toLocaleString("en-IN")}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#c5a880]/60" />
            </div>

            {/* 1 Kilogram */}
            <div className="bg-[#0a0b0d] p-4 border border-[#ffffff]/10 rounded-sm flex items-center justify-between">
              <div>
                <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#a4a7a7] block">
                  1 Kilogram (1 kg)
                </span>
                <span className="font-serif-luxury text-xl font-bold text-[#c5a880] tabular-nums">
                  ₹{(activePrice * 1000).toLocaleString("en-IN")}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#c5a880]" />
            </div>
          </div>

          {/* Action Footer: Expandable Modal Trigger */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#ffffff]/10 text-xs font-sans-editorial text-[#a4a7a7]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>Source: {rate.source} • Transparent Hallmark Certified</span>
            </div>

            <button
              suppressHydrationWarning
              onClick={() => setModalOpen(true)}
              className="btn-light-sweep px-6 py-3 bg-[#c5a880] hover:bg-[#ffffff] text-[#010101] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 self-stretch sm:self-auto justify-center"
            >
              <span>VIEW FULL RATE DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Rate Details Modal */}
      <SilverRateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        rate={rate}
        onRefresh={refreshRate}
      />
    </section>
  );
}
