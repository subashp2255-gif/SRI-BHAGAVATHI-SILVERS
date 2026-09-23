"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS, Product } from "@/data/products";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

interface NewArrivalsProps {
  onQuickView: (product: Product) => void;
}

export function NewArrivalsSection({ onQuickView }: NewArrivalsProps) {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.badgeType === "primary").slice(0, 5);
  const featuredProduct = newArrivals[0] || PRODUCTS[0];
  const supportingProducts = newArrivals.slice(1, 5);

  return (
    <section className="py-20 lg:py-28 bg-[#fbf9f4] border-b border-[#e8e8e8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#e8e8e8] pb-6 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-[#725b38] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              Fresh From Master Workshops
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-tight">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center gap-2 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold text-[#010101] hover:text-[#725b38] transition-colors"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Asymmetric Editorial Grid (1 Large Featured + 4 Supporting) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Featured Spotlight Card (Left 5 Cols) */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 bg-[#ffffff] border border-[#e8e8e8] p-6 lg:p-8 flex flex-col justify-between group metallic-sheen"
          >
            <div>
              <div className="relative w-full h-[360px] lg:h-[420px] overflow-hidden mb-6 bg-[#f5f3ee]">
                <span className="absolute top-4 left-4 z-10 bg-[#010101] text-[#ffffff] font-sans-editorial text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                  {featuredProduct.purityBadge || "NEW RELEASE"}
                </span>
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    suppressHydrationWarning
                    onClick={() => onQuickView(featuredProduct)}
                    className="p-3 bg-[#ffffff] text-[#010101] rounded-full hover:bg-[#725b38] hover:text-[#ffffff] transition-colors shadow-lg"
                    aria-label="Quick View"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <span className="font-sans-editorial text-[11px] uppercase tracking-widest text-[#725b38] font-semibold block mb-1">
                {featuredProduct.categoryLabel}
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#010101] mb-2 font-semibold">
                {featuredProduct.name}
              </h3>
              <p className="font-sans-editorial text-xs text-[#444748] line-clamp-2 mb-4">
                {featuredProduct.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#e8e8e8]">
              <span className="font-serif-luxury text-xl font-bold text-[#010101]">
                {featuredProduct.formattedPrice}
              </span>
              <button
                suppressHydrationWarning
                onClick={() => onQuickView(featuredProduct)}
                className="font-sans-editorial text-xs uppercase tracking-widest font-bold text-[#010101] hover:text-[#725b38] flex items-center gap-1"
              >
                Quick View <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Supporting 4 Product Cards Grid (Right 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
            {supportingProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                className="bg-[#ffffff] border border-[#e8e8e8] p-4 flex flex-col justify-between group hover:border-[#725b38] transition-colors metallic-sheen"
              >
                <div>
                  <div className="relative w-full h-[220px] overflow-hidden mb-4 bg-[#f5f3ee]">
                    <span className="absolute top-2 left-2 z-10 bg-[#725b38] text-[#ffffff] font-sans-editorial text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold">
                      {product.purityBadge}
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        suppressHydrationWarning
                        onClick={() => onQuickView(product)}
                        className="p-2.5 bg-[#ffffff] text-[#010101] rounded-full hover:bg-[#725b38] hover:text-[#ffffff] transition-colors shadow-md"
                        aria-label="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#725b38] font-bold block mb-1">
                    {product.categoryLabel}
                  </span>
                  <h4 className="font-serif-luxury text-base text-[#010101] font-semibold line-clamp-1 mb-1">
                    {product.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f0eee9] mt-2">
                  <span className="font-serif-luxury text-base font-bold text-[#010101]">
                    {product.formattedPrice}
                  </span>
                  <span className="font-sans-editorial text-[10px] text-[#725b38] uppercase tracking-wider font-semibold">
                    {product.netWeight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
