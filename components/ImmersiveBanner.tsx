"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { SilverParticlesCanvas } from "./SilverParticlesCanvas";
import { MagneticButton } from "./MagneticButton";

export function ImmersiveBanner() {
  return (
    <section className="w-full relative py-24 sm:py-32 bg-[#010101] text-[#ffffff] overflow-hidden border-y border-[#1c1c1c]">
      {/* Background Silver Particle Dust */}
      <SilverParticlesCanvas />

      {/* Background Watermark Typography (Prompt Rule 10) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-serif-luxury text-white/[0.03] tracking-widest pointer-events-none uppercase whitespace-nowrap font-bold select-none">
        BHAGAVATHI
      </div>

      {/* Background Radial Lighting */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c5a880] via-[#1c1c1c] to-[#010101]" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="font-sans-editorial text-[11px] sm:text-[12px] uppercase tracking-[0.3em] text-[#c5a880] mb-4 font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c5a880]" />
          Artistry • Authenticity • Devotion
        </span>

        <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-7xl text-[#ffffff] tracking-tight mb-6 font-normal">
          CRAFTED IN SILVER
        </h2>

        <p className="font-sans-editorial text-base sm:text-lg text-[#e4e2dd] max-w-2xl font-light mb-10 leading-relaxed">
          Where centuries of sacred traditional craftsmanship meet contemporary luxury design. Every curve, chased pattern, and hallmarked stamp reflects our commitment to eternal beauty.
        </p>

        <MagneticButton>
          <Link
            href="/shop"
            className="btn-light-sweep bg-[#ffffff] text-[#010101] font-sans-editorial text-xs sm:text-sm uppercase tracking-[0.2em] px-9 py-4.5 hover:bg-[#f5f3ee] transition-all duration-300 shadow-xl flex items-center gap-2.5 font-semibold group"
          >
            <span>DISCOVER THE COLLECTION</span>
            <ArrowRight className="w-4 h-4 text-[#725b38] transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </MagneticButton>
      </div>
    </section>
  );
}
