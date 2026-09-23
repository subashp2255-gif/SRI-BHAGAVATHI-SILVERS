"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Eye, MessageCircle, Check } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onQuickView,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [wish, setWish] = useState(isWishlisted);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWish(!wish);
    if (onToggleWishlist) onToggleWishlist(product);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Sri Bhagavathi Silvers, I am interested in inquiring about "${product.name}" (${product.netWeight}, ${product.formattedPrice}). Please share more details.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#ffffff] p-2.5 sm:p-4 border border-[#e8e8e8] shadow-sm hover:shadow-xl hover:border-[#c5a880] transition-all duration-300 flex flex-col group relative h-full metallic-sheen"
      data-cursor="QUICK VIEW"
    >
      {/* Image Plinth Container */}
      <div className="aspect-[3/4] w-full bg-[#f5f3ee] overflow-hidden relative mb-2.5 sm:mb-4 border border-[#e8e8e8]/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />

        {/* Top Purity / Hallmark Badge */}
        <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#ffffff]/95 backdrop-blur-sm px-1.5 sm:px-2.5 py-0.5 sm:py-1 font-sans-editorial text-[8px] sm:text-[10px] uppercase tracking-widest text-[#010101] font-bold border border-[#e8e8e8] shadow-sm z-10">
          {product.purityBadge}
        </span>

        {/* Wishlist Button - 44px Touch Target */}
        <button
          suppressHydrationWarning
          onClick={handleWishlist}
          aria-label="Add to Wishlist"
          className={`absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 p-2 sm:p-2.5 rounded-full transition-all duration-300 z-10 ${
            wish
              ? "bg-[#725b38] text-[#ffffff] shadow-md scale-110"
              : "bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#444748] hover:text-[#010101]"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wish ? "fill-current text-[#ffffff]" : ""}`} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-[#010101]/85 via-[#010101]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <button
            suppressHydrationWarning
            onClick={() => onQuickView && onQuickView(product)}
            className="btn-light-sweep bg-[#fbf9f4] text-[#010101] font-sans-editorial text-[9px] sm:text-[11px] uppercase tracking-widest px-3 py-1.5 sm:px-4 sm:py-2 shadow hover:bg-[#f0eee9] transition-colors flex items-center gap-1 font-semibold"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#725b38]" /> Quick View
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <p className="font-sans-editorial text-[9px] sm:text-[11px] text-[#725b38] uppercase tracking-widest mb-0.5 sm:mb-1 font-semibold">
            Net Wt: {product.netWeight}
          </p>
          <h3 className="font-serif-luxury text-xs sm:text-base text-[#010101] mb-1.5 sm:mb-2 group-hover:text-[#725b38] transition-colors line-clamp-2 font-medium leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="pt-2 border-t border-[#f5f3ee] flex flex-col gap-1.5 sm:gap-2 mt-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <span className="font-serif-luxury text-sm sm:text-lg text-[#010101] font-semibold">
              {product.formattedPrice}
            </span>
            <span className="font-sans-editorial text-[9px] sm:text-[11px] text-[#444748] flex items-center gap-0.5">
              <Check className="w-2.5 h-2.5 text-[#725b38]" /> BIS 925
            </span>
          </div>

          <button
            suppressHydrationWarning
            onClick={handleWhatsApp}
            className="btn-light-sweep w-full py-2 px-2 sm:px-3 bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#010101] font-sans-editorial text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 border border-[#e8e8e8] font-semibold"
          >
            <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#725b38]" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
