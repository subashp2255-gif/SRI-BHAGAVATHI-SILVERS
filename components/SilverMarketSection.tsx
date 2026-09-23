"use client";

import React, { useState } from "react";
import { TrendingUp, Clock, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSilverRate } from "@/lib/silverRate";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SilverRateModal } from "./SilverRateModal";

export function SilverMarketSection() {
  const { rate, selectedPurity, setSelectedPurity, refreshRate } = useSilverRate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 lg:py-28 bg-[#010101] text-[#ffffff] border-b border-[#222222] relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 watermark-editorial-dark text-7xl lg:text-[140px] opacity-[0.025] select-none pointer-events-none whitespace-nowrap">
          SILVER MARKET
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#222222] pb-6 gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold mb-2">
                <Sparkles className="w-4 h-4 text-[#c5a880]" />
                Bullion Market Intelligence
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#ffffff] tracking-tight">
                TODAY'S SILVER RATE
              </h2>
            </div>
            <p className="font-sans-editorial text-xs sm:text-sm text-[#aaaaaa] max-w-md">
              Transparent, daily-updated bullion rates for certified 999 fine silver and 925 sterling hallmarks.
            </p>
          </motion.div>

          {/* Editorial Rate Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10"
          >
            {/* Card 1: 999 Fine Bullion Silver */}
            <motion.div
              variants={fadeUp}
              className="bg-[#0d0d0d] border border-[#222222] hover:border-[#c5a880] transition-colors p-6 flex flex-col justify-between metallic-sheen"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#c5a880] font-bold bg-[#121212] px-2.5 py-1 border border-[#333333]">
                    99.9% PURE BULLION
                  </span>
                  <span className="text-[11px] text-[#34d399] font-mono font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +{rate.changePercent}%
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl text-[#ffffff] mb-1 font-semibold">
                  999 Fine Silver Rate
                </h3>
                <p className="font-sans-editorial text-xs text-[#888888] mb-6">
                  Sanctum idols, kalash vessels, and investment bullion bars.
                </p>

                <div className="space-y-2 font-mono">
                  <div className="flex items-baseline justify-between pt-3 border-t border-[#222222]">
                    <span className="font-sans-editorial text-xs text-[#aaaaaa]">Per Gram (1g)</span>
                    <span className="text-2xl font-bold text-[#ffffff] tabular-nums">
                      ₹{rate.perGram.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-[#888888]">
                    <span className="font-sans-editorial">10 Grams (1 Tola)</span>
                    <span className="tabular-nums">₹{rate.per10Gram.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-[#888888]">
                    <span className="font-sans-editorial">1 Kilogram (1kg)</span>
                    <span className="tabular-nums">₹{rate.perKg.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#222222] mt-6 flex items-center justify-between font-sans-editorial text-xs text-[#888888]">
                <span>Source: {rate.source}</span>
                <span className="text-[#c5a880] font-bold">Assay Certified</span>
              </div>
            </motion.div>

            {/* Card 2: 925 Sterling Silver */}
            <motion.div
              variants={fadeUp}
              className="bg-[#0d0d0d] border border-[#222222] hover:border-[#c5a880] transition-colors p-6 flex flex-col justify-between metallic-sheen"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#c5a880] font-bold bg-[#121212] px-2.5 py-1 border border-[#333333]">
                    92.5% BIS HALLMARK
                  </span>
                  <span className="text-[11px] text-[#34d399] font-mono font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +{rate.changePercent}%
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl text-[#ffffff] mb-1 font-semibold">
                  925 Sterling Silver Rate
                </h3>
                <p className="font-sans-editorial text-xs text-[#888888] mb-6">
                  Artisanal rings, kolusu payals, chokers, and kadas.
                </p>

                <div className="space-y-2 font-mono">
                  <div className="flex items-baseline justify-between pt-3 border-t border-[#222222]">
                    <span className="font-sans-editorial text-xs text-[#aaaaaa]">Per Gram (1g)</span>
                    <span className="text-2xl font-bold text-[#ffffff] tabular-nums">
                      ₹{rate.perGram925.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-[#888888]">
                    <span className="font-sans-editorial">10 Grams (1 Tola)</span>
                    <span className="tabular-nums">₹{(rate.perGram925 * 10).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-[#888888]">
                    <span className="font-sans-editorial">1 Kilogram (1kg)</span>
                    <span className="tabular-nums">₹{(rate.perGram925 * 1000).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#222222] mt-6 flex items-center justify-between font-sans-editorial text-xs text-[#888888]">
                <span>BIS Laser Hallmarked</span>
                <span className="text-[#c5a880] font-bold">100% Purity</span>
              </div>
            </motion.div>

            {/* Card 3: Transparency & Consultation */}
            <motion.div
              variants={fadeUp}
              className="bg-[#121212] border border-[#222222] p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block mb-2">
                  TRANSPARENT PRICING
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#ffffff] font-semibold mb-3">
                  Fair Weight & Purity Assurance
                </h3>
                <p className="font-sans-editorial text-xs text-[#aaaaaa] leading-relaxed mb-6">
                  Every silver piece at Sri Bhagavathi Silvers is weighed on precision calibrated balances with explicit net weight and purity hallmarking disclosed prior to purchase.
                </p>

                <div className="space-y-2 font-sans-editorial text-xs text-[#c5a880]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>No hidden wastage or uncertified metal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Live rates locked at time of order</span>
                  </div>
                </div>
              </div>

              <button
                suppressHydrationWarning
                onClick={() => setModalOpen(true)}
                className="w-full py-3 bg-[#c5a880] text-[#010101] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#ffffff] transition-colors flex items-center justify-center gap-2 mt-6 btn-light-sweep"
              >
                <span>View Full Rate Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SilverRateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        rate={rate}
        onRefresh={refreshRate}
      />
    </>
  );
}
