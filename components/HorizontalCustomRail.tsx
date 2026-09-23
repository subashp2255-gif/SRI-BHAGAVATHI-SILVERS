"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { CUSTOMIZED_PIECES } from "@/data/customized";
import { SilverReflectionCard } from "./SilverReflectionCard";

interface HorizontalCustomRailProps {
  onEnquire?: (pieceName: string, category: string) => void;
}

export function HorizontalCustomRail({ onEnquire }: HorizontalCustomRailProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const signaturePieces = CUSTOMIZED_PIECES.filter((p) => p.featured || p.signature);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-[#fbf9f4] border-b border-[#e8e8e8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5f3ee] border border-[#e8e8e8] text-[#725b38]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] font-bold">
                Atelier Masterworks
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-wide">
              SIGNATURE CUSTOM PIECES
            </h2>
            <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] max-w-xl">
              Curated showcase of bespoke silver ornaments commissioned by clients for milestones and sacred occasions.
            </p>
          </div>

          {/* Rail Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scroll("left")}
              className="p-3 bg-[#ffffff] border border-[#e8e8e8] hover:border-[#010101] hover:bg-[#010101] hover:text-white text-[#010101] transition-all shadow-sm"
              aria-label="Previous custom piece"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scroll("right")}
              className="p-3 bg-[#ffffff] border border-[#e8e8e8] hover:border-[#010101] hover:bg-[#010101] hover:text-white text-[#010101] transition-all shadow-sm"
              aria-label="Next custom piece"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Rail Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-6 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {signaturePieces.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-[290px] sm:w-[350px] shrink-0 snap-start"
            >
              <SilverReflectionCard piece={piece} onEnquire={onEnquire} aspectRatio="tall" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
