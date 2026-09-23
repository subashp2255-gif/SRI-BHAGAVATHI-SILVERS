"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, ArrowRight, Flame, ShieldCheck, Tag } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

const POPULAR_SEARCHES = [
  { name: "Anklets (Kolusu)", query: "anklet" },
  { name: "Silver Rings", query: "ring" },
  { name: "Kamakshi Deepam", query: "deepam" },
  { name: "Kasu Mala", query: "kasu" },
  { name: "Silver Chains", query: "chain" },
  { name: "999 Silver Coins", query: "coin" },
  { name: "Pooja Kalash", query: "kalash" },
];

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState("");

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.occasions?.some((o) => o.toLowerCase().includes(query.toLowerCase())) ||
          p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
        {/* Dark Frosted Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#010101]/75 backdrop-blur-md transition-opacity"
        />

        {/* Luxury Search Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-[#ffffff] w-full max-w-2xl border border-[#c5a880]/40 shadow-2xl z-10 overflow-hidden rounded-sm metallic-sheen"
        >
          {/* Top Search Input Header Bar */}
          <div className="relative flex items-center gap-3 p-4 sm:p-5 border-b border-[#e8e8e8] bg-[#fbf9f4]">
            <Search className="w-5 h-5 text-[#c5a880] shrink-0" />
            
            <input
              suppressHydrationWarning
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search silver anklets, Kamakshi deepam, Kasu Mala..."
              className="flex-grow bg-transparent font-sans-editorial text-sm sm:text-base text-[#010101] focus:outline-none placeholder-[#888888] tracking-wide"
            />

            {/* Clear Input Icon */}
            {query.trim() && (
              <button
                suppressHydrationWarning
                onClick={() => setQuery("")}
                className="p-1 text-[#888888] hover:text-[#010101] transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* ESC Badge */}
            <span className="hidden sm:inline-block font-sans-editorial text-[10px] text-[#725b38] bg-[#f5f3ee] border border-[#e8e8e8] px-2 py-0.5 uppercase font-bold tracking-wider">
              ESC
            </span>

            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={onClose}
              className="p-2 text-[#444748] hover:text-[#010101] hover:bg-[#eae8e3] transition-colors rounded-full"
              aria-label="Close Search Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results / Suggestions Area */}
          <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto font-sans-editorial">
            {/* 1. Empty Query State: Show Popular Searches */}
            {!query.trim() && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-[#725b38] text-xs uppercase tracking-[0.2em] font-bold pb-2 border-b border-[#f0eee9]">
                  <Flame className="w-4 h-4 text-[#c5a880]" />
                  <span>Popular Search Keywords</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item.name}
                      suppressHydrationWarning
                      onClick={() => setQuery(item.query)}
                      className="bg-[#f5f3ee] hover:bg-[#010101] text-[#010101] hover:text-[#ffffff] px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-[#e8e8e8] hover:border-[#010101] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Tag className="w-3 h-3 text-[#725b38]" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#f0eee9] flex items-center justify-between text-xs text-[#888888]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                    <span>All pieces are 100% BIS 925 / 999 Hallmarked</span>
                  </span>
                </div>
              </div>
            )}

            {/* 2. No Matching Results */}
            {query.trim() && results.length === 0 && (
              <div className="py-10 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#725b38] mx-auto opacity-50" />
                <p className="font-serif-luxury text-lg text-[#010101]">
                  No silver items found matching &quot;{query}&quot;
                </p>
                <p className="text-xs text-[#747878] max-w-sm mx-auto">
                  Try searching for &quot;kolusu&quot;, &quot;deepam&quot;, &quot;ring&quot;, or &quot;kasu mala&quot;.
                </p>
                <button
                  suppressHydrationWarning
                  onClick={() => setQuery("")}
                  className="px-4 py-2 bg-[#f5f3ee] text-[#010101] text-xs uppercase tracking-wider font-bold border border-[#e8e8e8] hover:bg-[#010101] hover:text-[#ffffff] transition-colors mt-2"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* 3. Matching Search Results List */}
            {results.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#725b38] font-bold pb-2 border-b border-[#f0eee9]">
                  <span>FOUND {results.length} MATCHING ITEMS</span>
                  <span>TAP ITEM TO VIEW DETAILS</span>
                </div>

                <div className="space-y-2.5">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center justify-between gap-4 p-3 bg-[#ffffff] hover:bg-[#fbf9f4] border border-[#e8e8e8] hover:border-[#c5a880] cursor-pointer transition-all duration-200 shadow-sm group"
                    >
                      {/* Thumbnail Image */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 bg-[#f5f3ee] border border-[#e8e8e8] overflow-hidden shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="56px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div>
                          <p className="font-serif-luxury text-sm font-semibold text-[#010101] group-hover:text-[#725b38] transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#725b38] flex items-center gap-2 mt-0.5">
                            <span>{product.categoryLabel}</span>
                            <span>•</span>
                            <span className="font-bold text-[#010101]">{product.netWeight}</span>
                          </p>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="text-right shrink-0">
                        <p className="font-serif-luxury text-sm font-bold text-[#010101]">
                          {product.formattedPrice}
                        </p>
                        <span className="text-[10px] uppercase font-bold text-[#c5a880] group-hover:text-[#725b38] flex items-center justify-end gap-1 mt-0.5">
                          <span>Quick View</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
