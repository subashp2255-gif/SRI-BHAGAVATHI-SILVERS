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
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const trendingProducts = PRODUCTS.slice(0, 6);

  return (
    <section className="w-full bg-[#fbf9f4] py-20 sm:py-28 border-b border-[#e8e8e8]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Arrow Triggers */}
        <ScrollReveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] font-bold block mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#c5a880]" />
              Curated Popular Choice
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] font-normal">
              Trending in Silver
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              suppressHydrationWarning
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="p-3 bg-[#ffffff] border border-[#e8e8e8] text-[#010101] hover:bg-[#f5f3ee] transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              suppressHydrationWarning
              onClick={scrollRight}
              aria-label="Scroll right"
              className="p-3 bg-[#ffffff] border border-[#e8e8e8] text-[#010101] hover:bg-[#f5f3ee] transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Scrollable / Draggable Track */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
