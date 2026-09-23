"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Eye } from "lucide-react";
import { CustomizedPiece } from "@/data/customized";

interface SilverReflectionCardProps {
  piece: CustomizedPiece;
  onEnquire?: (pieceName: string, category: string) => void;
  aspectRatio?: "square" | "tall" | "wide";
}

export function SilverReflectionCard({
  piece,
  onEnquire,
  aspectRatio = "square",
}: SilverReflectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectClasses = {
    square: "aspect-[4/3] sm:aspect-square",
    tall: "aspect-[3/4] sm:aspect-[4/5]",
    wide: "aspect-[16/9] sm:aspect-[16/10]",
  };

  return (
    <div
      className="group relative bg-[#ffffff] border border-[#e8e8e8] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div className={`relative w-full ${aspectClasses[aspectRatio]} overflow-hidden bg-[#f5f3ee]`}>
        {/* Main Image with Smooth Motion Scale */}
        <motion.img
          src={piece.image}
          alt={piece.name}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover object-center"
        />

        {/* Soft Dark Vignette Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.35 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-transparent pointer-events-none"
        />

        {/* SIGNATURE METALLIC SILVER REFLECTION SWEEP */}
        {/* CSS gradient light sweep triggered on hover */}
        <div
          className={`absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out z-20 ${
            isHovered ? "translate-x-full" : "-translate-x-full"
          }`}
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.03) 65%, transparent 100%)",
            width: "150%",
            left: "-150%",
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="font-sans-editorial text-[10px] uppercase tracking-[0.18em] bg-[#fbf9f4]/90 backdrop-blur-md text-[#010101] px-2.5 py-1 font-bold border border-[#e8e8e8]">
            {piece.category}
          </span>
          {piece.signature && (
            <span className="font-sans-editorial text-[9px] uppercase tracking-[0.2em] bg-[#725b38] text-[#ffffff] px-2 py-0.5 font-semibold flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" /> Signature Piece
            </span>
          )}
        </div>

        {/* Quick View / Action Button on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-4 left-4 right-4 flex gap-2 z-20"
        >
          <Link
            href={`/customized/${piece.slug}`}
            className="flex-1 bg-[#ffffff]/95 backdrop-blur-md hover:bg-[#010101] hover:text-white text-[#010101] py-2.5 px-3 text-center font-sans-editorial text-[11px] uppercase tracking-[0.16em] font-bold border border-[#e8e8e8] transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" /> View Piece
          </Link>
          {onEnquire && (
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => onEnquire(piece.name, piece.category)}
              className="bg-[#725b38] hover:bg-[#010101] text-white p-2.5 font-sans-editorial text-[11px] uppercase tracking-[0.16em] font-bold border border-[#725b38] transition-colors shrink-0 shadow-md"
              title="Start Custom Enquiry"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>

      {/* Card Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Occasion Tags */}
          {piece.occasions && piece.occasions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {piece.occasions.slice(0, 2).map((occ) => (
                <span
                  key={occ}
                  className="font-sans-editorial text-[10px] text-[#725b38] tracking-wider uppercase font-semibold"
                >
                  {occ} •
                </span>
              ))}
            </div>
          )}

          <h3 className="font-serif-luxury text-base sm:text-lg text-[#010101] font-semibold leading-snug group-hover:text-[#725b38] transition-colors">
            {piece.name}
          </h3>

          <p className="font-sans-editorial text-xs text-[#444748] line-clamp-2 mt-1.5 leading-relaxed">
            {piece.shortDescription}
          </p>
        </div>

        {/* Card Footer Link */}
        <div className="pt-3 border-t border-[#f5f3ee] flex items-center justify-between">
          <span className="font-sans-editorial text-[11px] text-[#725b38] uppercase tracking-[0.15em] font-bold">
            925 Hallmark Silver
          </span>
          <Link
            href={`/customized/${piece.slug}`}
            className="font-sans-editorial text-xs font-bold text-[#010101] group-hover:text-[#725b38] flex items-center gap-1 transition-colors"
          >
            Explore <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
