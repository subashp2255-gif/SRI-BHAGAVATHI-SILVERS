"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { PRODUCTS, Product } from "@/data/products";
import { ScrollReveal, ScrollItem } from "./ScrollReveal";

interface ProductGridProps {
  onQuickView: (product: Product) => void;
}

export function ProductGrid({ onQuickView }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<"featured" | "new" | "bestseller">("featured");

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === "new") return p.isNewArrival;
    if (activeTab === "bestseller") return p.isBestSeller;
    return p.featured;
  });

  const tabs: Array<{ id: "featured" | "new" | "bestseller"; label: string }> = [
    { id: "featured", label: "Featured Masterpieces" },
    { id: "new", label: "New Arrivals" },
    { id: "bestseller", label: "Best Sellers" },
  ];

  return (
    <section className="w-full bg-[#f5f3ee] py-16 sm:py-24 border-b border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-sans-editorial text-[11px] uppercase tracking-[0.25em] text-[#725b38] block font-semibold mb-1">
            Curated Selection
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-tight mb-2">
            Featured Collection
          </h2>
          <p className="font-sans-editorial text-sm sm:text-base text-[#444748]">
            Timeless pieces chosen for their extraordinary craftsmanship, purity, and enduring grace.
          </p>

          {/* Animated Tab Selector */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  suppressHydrationWarning
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative font-sans-editorial text-xs uppercase tracking-[0.16em] px-5 py-2.5 transition-colors ${
                    isActive
                      ? "text-[#ffffff] font-semibold"
                      : "bg-[#ffffff] text-[#444748] hover:text-[#010101] border border-[#e8e8e8]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProductTab"
                      className="absolute inset-0 bg-[#010101] shadow-sm -z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 2-Column Mobile / 4-Column Desktop Product Grid */}
        <ScrollReveal key={activeTab} stagger className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ScrollItem key={product.id}>
              <ProductCard product={product} onQuickView={onQuickView} />
            </ScrollItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
