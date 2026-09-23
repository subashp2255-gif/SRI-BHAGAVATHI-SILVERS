"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal, ScrollItem } from "./ScrollReveal";
import { OCCASIONS } from "@/data/occasions";

export function OccasionDiscoveryGrid() {
  const featuredOccasions = OCCASIONS.slice(0, 4);

  return (
    <section className="w-full bg-[#fbf9f4] py-20 sm:py-28 border-b border-[#e8e8e8]/60 relative overflow-hidden">
      {/* Background Watermark Typography */}
      <div className="absolute top-10 right-0 text-[18vw] font-serif-luxury text-black/[0.02] tracking-widest pointer-events-none uppercase whitespace-nowrap font-bold select-none">
        MOMENTS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] block font-bold mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            Curated Occasion Discovery
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#010101] tracking-tight mb-3 font-normal">
            Shop by Sacred Occasion
          </h2>
          <p className="font-sans-editorial text-sm sm:text-base text-[#444748] font-normal leading-relaxed">
            Find the perfect hallmarked silver gift tailored to life’s most cherished celebrations and traditional milestones.
          </p>
        </ScrollReveal>

        {/* 4-Grid Occasion Cards */}
        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredOccasions.map((occ) => (
            <ScrollItem key={occ.slug}>
              <Link
                href={`/occasions/${occ.slug}`}
                className="group relative block aspect-[16/10] sm:aspect-[16/9] w-full bg-[#eae8e3] border border-[#e8e8e8] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 metallic-sheen"
                data-cursor="EXPLORE"
              >
                <Image
                  src={occ.heroImage || occ.image}
                  alt={occ.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/90 via-[#010101]/40 to-transparent transition-opacity duration-300" />

                {/* Content Container */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-[#ffffff] z-10">
                  <span className="font-sans-editorial text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold mb-1">
                    {occ.tagline}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#ffffff] mb-2 font-medium group-hover:text-[#c5a880] transition-colors">
                    {occ.name} Silver Collection
                  </h3>
                  <p className="font-sans-editorial text-xs sm:text-sm text-[#e4e2dd] mb-4 line-clamp-2 font-light max-w-lg leading-relaxed">
                    {occ.shortDescription}
                  </p>

                  <div className="inline-flex items-center gap-2 font-sans-editorial text-xs uppercase tracking-widest font-bold text-[#c5a880] group-hover:text-[#ffffff] transition-colors">
                    <span>EXPLORE COLLECTION</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </ScrollItem>
          ))}
        </ScrollReveal>

        {/* View All Occasions CTA Footer */}
        <div className="mt-12 text-center">
          <Link
            href="/occasions"
            className="btn-light-sweep inline-flex items-center gap-3 px-8 py-4 bg-[#010101] hover:bg-[#725b38] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg group"
          >
            <span>VIEW ALL OCCASIONS & CELEBRATIONS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
