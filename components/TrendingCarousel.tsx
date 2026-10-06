"use client";

import React, { useRef } from "react";

import { PRODUCTS, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface TrendingCarouselProps {
  onQuickView: (product: Product) => void;
}

export function TrendingCarousel({ onQuickView }: TrendingCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 640 ? -260 : -320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 260 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const trendingProducts = PRODUCTS.slice(0, 6);

  return (
    <section className="w-full bg-[#fbf9f4] py-14 sm:py-20 lg:py-28 border-b border-[#e8e8e8]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Arrow Triggers */}
        <ScrollReveal className="flex items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="font-sans-editorial text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#725b38] font-bold block mb-1.5 sm:mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#c5a880]" />
              Curated Popular Choice
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl text-[#010101] font-normal">
              Trending in Silver
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              suppressHydrationWarning
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-[#ffffff] border border-[#e8e8e8] text-[#010101] hover:bg-[#f5f3ee] transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              suppressHydrationWarning
              onClick={scrollRight}
              aria-label="Scroll right"
              className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-[#ffffff] border border-[#e8e8e8] text-[#010101] hover:bg-[#f5f3ee] transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Scrollable / Draggable Track */}
        <div
          ref={carouselRef}
          className="flex gap-3.5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 sm:pb-6 pt-2 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="w-[220px] xs:w-[260px] sm:w-[300px] lg:w-[320px] shrink-0 snap-start"
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
