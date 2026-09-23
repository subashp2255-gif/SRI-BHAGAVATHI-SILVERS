"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, slideReveal } from "@/lib/animations";

export function FeaturedCollectionSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#010101] text-[#ffffff] relative overflow-hidden border-b border-[#333333]">
      {/* Background Watermark */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 watermark-editorial-dark text-7xl lg:text-[160px] opacity-[0.03] select-none pointer-events-none whitespace-nowrap">
        SANCTUM COLLECTION
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Dominating Asymmetric Campaign Image */}
          <motion.div
            variants={slideReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden border border-[#333333] metallic-sheen">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBebFltOEMAcE6R6mZ6Z1TBZfH4-TijfaIpJ__GrkTG0O29yBaY3abO2Jol3K4nvXyBF1AS-Hez068b7KSVSZYh1KHRXCPQwTUJMAFDani3kGocj-Rz6LWGSXwaVjigaazw-JBmCfAzeQF_u8vBFv0zzFLYnAWTCAT0DeXBM6RE6t2ztp-hodot759T_d38hxC__x7oD3TNdK6TKvh9n4bcwrvRqfAF3wIXdUrrMHuDswNK1MH68jTz"
                alt="Sanctum & Temple Heritage Collection"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Tag */}
            <div className="absolute top-6 left-6 bg-[#010101]/90 backdrop-blur-md px-4 py-2 border border-[#c5a880] text-[#c5a880] font-sans-editorial text-[10px] uppercase tracking-[0.25em] font-bold">
              SPOTLIGHT COLLECTION
            </div>
          </motion.div>

          {/* Asymmetric Content Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            <div className="flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold">
              <Sparkles className="w-4 h-4" />
              Heritage Edition 2026
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#ffffff] tracking-tight leading-[1.1]">
              Sanctum & Temple Heritage Collection
            </h2>

            <p className="font-sans-editorial text-sm sm:text-base text-[#c4c7c7] leading-relaxed">
              Consecrated in spirit and forged with ancestral precision, our Sanctum Collection brings together heavy 999 fine silver Kalash vessels, tall Kamakshi deepams, and authentic South Indian temple Kemp ornaments.
            </p>

            <div className="pt-4 space-y-3 border-t border-[#222222]">
              <div className="flex items-center justify-between font-sans-editorial text-xs text-[#e4e2dd]">
                <span className="text-[#888888]">Material Purity</span>
                <span className="font-bold text-[#c5a880]">99.9 Fine Silver / 92.5 Hallmark</span>
              </div>
              <div className="flex items-center justify-between font-sans-editorial text-xs text-[#e4e2dd]">
                <span className="text-[#888888]">Artisan Heritage</span>
                <span className="font-bold">Hereditary Master Silversmiths</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c5a880] text-[#010101] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold btn-light-sweep hover:bg-[#ffffff] transition-colors"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
