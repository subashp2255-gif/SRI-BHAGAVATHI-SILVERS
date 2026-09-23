"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Eye } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
}

export function WishlistDrawer({ isOpen, onClose, onQuickView }: WishlistDrawerProps) {
  if (!isOpen) return null;

  // Sample wishlist items
  const wishlistItems = [PRODUCTS[0], PRODUCTS[1]];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#010101]/60 backdrop-blur-sm"
        />

        {/* Sliding Tray */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#ffffff] h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#e8e8e8]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#e8e8e8] flex items-center justify-between bg-[#fbf9f4]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#725b38] fill-current" />
              <h3 className="font-serif-luxury text-xl text-[#010101] font-semibold">
                Saved Silver Treasures ({wishlistItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#444748] hover:text-[#010101] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="p-6 flex-grow overflow-y-auto space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 bg-[#f5f3ee] border border-[#e8e8e8] group"
              >
                <div className="w-16 h-20 relative bg-[#eae8e3] shrink-0 border border-[#e8e8e8]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <span className="font-sans-editorial text-[10px] uppercase text-[#725b38] font-bold">
                    Net Wt: {item.netWeight}
                  </span>
                  <h4 className="font-serif-luxury text-sm text-[#010101] font-medium leading-tight mb-1">
                    {item.name}
                  </h4>
                  <p className="font-serif-luxury text-sm text-[#010101] font-semibold">
                    {item.formattedPrice}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onQuickView(item);
                    onClose();
                  }}
                  className="p-2 bg-[#ffffff] hover:bg-[#eae8e3] text-[#010101] border border-[#e8e8e8] transition-colors"
                  aria-label="Quick View"
                >
                  <Eye className="w-4 h-4 text-[#725b38]" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#e8e8e8] bg-[#fbf9f4]">
            <button
              onClick={onClose}
              className="w-full bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-[0.18em] py-3.5 shadow hover:bg-[#333333] transition-colors font-semibold"
            >
              CONTINUE EXPLORING
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
