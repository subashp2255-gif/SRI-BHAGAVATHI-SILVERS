"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function FeaturedCollectionSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#050505] text-[#ffffff] relative overflow-hidden border-b border-[#222222]">
      {/* Visible Heritage Jewel Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz1IRM1yCDzdU7AK_pwkQOPxzqZKYu-x-p2iIGUCNt6hoRKIaRzxWLH5XzuEhJMVzLtatSojNm63kN3rRw-A145i7MD94S3F7-RJ84O39AacDLRjJvA85xTEUPUfvheJVXNTNGOj5sWXb7tdwcLOZA5jHy3aE5Oao4kgc0HcBFk5I7vZNtW5EMyzBwj_QOE-Se2MvicqD6l0xg2rKDd7hH7bi_pgZFdYrY5sNxMq_HM86tWWwtrqrH"
          alt="Sanctum Heritage Silver Jewellery"
          className="w-full h-full object-cover object-center opacity-45 sm:opacity-80 filter contrast-60 brightness-130 scale-105"
        />
        {/* Balanced Vignette & Soft Gradient to preserve high text contrast while keeping jewel clearly visible */}
        <div className="absolute inset-0 bg-[#050505]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(5,5,5,0.3)_0%,_rgba(5,5,5,0.75)_85%,_#050505_100%)]" />
      </div>

      {/* Subtle Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 watermark-editorial-dark text-5xl sm:text-7xl lg:text-[130px] opacity-[0.025] select-none pointer-events-none whitespace-nowrap z-[1]">
        SANCTUM COLLECTION
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[680px] mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#c5a880] font-sans-editorial text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold">
            <span>✦</span>
            <span>HERITAGE EDITION 2026</span>
          </div>

          {/* Main Heading */}
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#ffffff] tracking-tight leading-[1.2] max-w-xl">
            Sanctum &amp; Temple<br className="hidden sm:inline" /> Heritage Collection
          </h2>

          {/* Descriptive Paragraph */}
          <p className="font-sans-editorial text-sm sm:text-base text-[#c4c7c7] leading-relaxed max-w-xl mx-auto">
            Consecrated in spirit and forged with ancestral precision, our Sanctum Collection brings together heavy 999 fine silver Kalash vessels, tall Kamakshi deepams, and authentic South Indian temple Kemp ornaments.
          </p>

          {/* Main CTA */}
          <div className="pt-2 sm:pt-3">
            <Link
              href="/collections"
              className="group inline-flex items-center justify-center gap-3.5 px-8 sm:px-11 py-4 bg-[#c5a880] hover:bg-[#d5bc98] text-[#050505] font-sans-editorial text-xs sm:text-[13px] uppercase tracking-[0.22em] font-bold rounded-[2px] transition-all duration-300 ease-out shadow-[0_2px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_24px_rgba(197,168,128,0.25)]"
            >
              <span>EXPLORE COLLECTION</span>
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 font-sans text-sm">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
