"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, MessageCircle, Scale, Award, Truck, Heart, Share2, Check } from "lucide-react";
import { Product } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export function QuickViewModal({
  product,
  onClose,
  onToggleWishlist,
  isWishlisted = false,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("14 (US 7)");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isWish, setIsWish] = useState<boolean>(isWishlisted);
  const [copied, setCopied] = useState<boolean>(false);

  if (!product) return null;

  // Clean description removing prompt artifacts if any exist in raw dataset
  const cleanedDescription = product.description.replace(
    /High luxury studio macro photo of /i,
    ""
  );

  const ringSizes = ["12 (US 6)", "14 (US 7)", "16 (US 8)", "Adjustable"];

  // Gallery angles fallback
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
  ];

  const handleWhatsAppInquiry = () => {
    const sizeInfo = product.categoryLabel.toLowerCase().includes("ring")
      ? `, Selected Size: ${selectedSize}`
      : "";
    const text = encodeURIComponent(
      `Hello Sri Bhagavathi Silvers, I would like to inquire about purchasing "${product.name}" (Net Weight: ${product.netWeight}, Price: ${product.formattedPrice}${sizeInfo}). Please guide me.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWishlistToggle = () => {
    setIsWish(!isWish);
    if (onToggleWishlist) onToggleWishlist(product);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#010101]/60 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative bg-[#ffffff] w-full max-w-4xl shadow-2xl border border-[#e8e8e8] z-10 overflow-hidden my-8"
        >
          {/* Enhanced Close button with 48x48px touch target */}
          <button
            suppressHydrationWarning
            onClick={onClose}
            aria-label="Close product quick view"
            className="absolute top-3 right-3 z-30 w-12 h-12 flex items-center justify-center text-[#444748] hover:text-[#010101] bg-[#f5f3ee] hover:bg-[#eae8e3] transition-colors border border-[#e8e8e8]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Left Image Media Panel */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="relative aspect-[3/4] w-full bg-[#f5f3ee] border border-[#e8e8e8] overflow-hidden group">
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#ffffff]/95 backdrop-blur-sm px-3 py-1 font-sans-editorial text-[10px] uppercase tracking-widest text-[#010101] font-bold border border-[#e8e8e8] shadow-sm z-10">
                  {product.purityBadge}
                </span>

                {/* Wishlist quick toggle overlay button */}
                <button
                  suppressHydrationWarning
                  onClick={handleWishlistToggle}
                  aria-label="Add to Wishlist"
                  className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all z-10 ${
                    isWish
                      ? "bg-[#725b38] text-[#ffffff] scale-110"
                      : "bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#444748]"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWish ? "fill-current text-[#ffffff]" : ""}`} />
                </button>
              </div>

              {/* Multi-angle Thumbnail Strip */}
              <div className="flex items-center gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    suppressHydrationWarning
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 border bg-[#f5f3ee] overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? "border-[#010101] ring-1 ring-[#010101]"
                        : "border-[#e8e8e8] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Product Specifications & CRO Controls */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-1">
                  {product.categoryLabel}
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101] mb-2 font-medium">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                  <span className="font-serif-luxury text-2xl text-[#010101] font-semibold">
                    {product.formattedPrice}
                  </span>
                  <span className="font-sans-editorial text-xs text-[#725b38] font-bold bg-[#f5f3ee] px-2.5 py-1 border border-[#e8e8e8]">
                    Net Silver Wt: {product.netWeight}
                  </span>
                </div>

                <p className="font-sans-editorial text-sm text-[#444748] leading-relaxed mb-5 capitalize-first">
                  {cleanedDescription}
                </p>

                {/* Ring Size Selector (If Ring Category) */}
                {product.categoryLabel.toLowerCase().includes("ring") && (
                  <div className="mb-5 border-t border-b border-[#f5f3ee] py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans-editorial text-xs uppercase tracking-wider text-[#010101] font-bold">
                        Select Ring Size:
                      </span>
                      <span className="font-sans-editorial text-[11px] text-[#725b38] cursor-pointer hover:underline font-semibold">
                        Size Guide
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {ringSizes.map((size) => (
                        <button
                          suppressHydrationWarning
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`font-sans-editorial text-xs px-3.5 py-2 border transition-all font-medium ${
                            selectedSize === size
                              ? "bg-[#010101] text-[#ffffff] border-[#010101]"
                              : "bg-[#f5f3ee] text-[#444748] border-[#e8e8e8] hover:border-[#010101]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specs Metadata Table */}
                <div className="bg-[#f5f3ee] p-4 border border-[#e8e8e8] space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#444748] flex items-center gap-1.5 font-semibold">
                      <Award className="w-3.5 h-3.5 text-[#725b38]" /> Metal Purity:
                    </span>
                    <span className="text-[#010101] font-semibold">
                      {product.specs?.metal || "925 Sterling Silver"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#444748] flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#725b38]" /> Hallmark Status:
                    </span>
                    <span className="text-[#010101] font-semibold flex items-center gap-1">
                      {product.specs?.hallmark || "BIS 925 Stamped"}
                      <span className="text-[10px] text-[#725b38] bg-[#ffffff] px-1.5 py-0.5 border border-[#e8e8e8] font-bold">
                        VERIFIED
                      </span>
                    </span>
                  </div>
                  {product.specs?.finish && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#444748] flex items-center gap-1.5 font-semibold">
                        <Scale className="w-3.5 h-3.5 text-[#725b38]" /> Finish & Style:
                      </span>
                      <span className="text-[#010101] font-semibold">{product.specs.finish}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#444748] flex items-center gap-1.5 font-semibold">
                      <Truck className="w-3.5 h-3.5 text-[#725b38]" /> Transit Insurance:
                    </span>
                    <span className="text-[#010101] font-semibold">100% Fully Covered</span>
                  </div>
                </div>
              </div>

              {/* Action Zone with Primary & Secondary CTAs */}
              <div className="space-y-3 pt-3 border-t border-[#e8e8e8]">
                <div className="flex items-center gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={handleWhatsAppInquiry}
                    className="btn-light-sweep flex-grow bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-[0.16em] py-4 px-6 hover:bg-[#262626] transition-colors flex items-center justify-center gap-2 shadow-md font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 text-[#c5a880]" />
                    <span>Inquire via WhatsApp Boutique</span>
                  </button>

                  <button
                    suppressHydrationWarning
                    onClick={handleShare}
                    aria-label="Share product"
                    className="p-4 bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#010101] border border-[#e8e8e8] transition-colors flex items-center justify-center"
                    title="Share product link"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#725b38]" />
                    ) : (
                      <Share2 className="w-4 h-4 text-[#444748]" />
                    )}
                  </button>
                </div>

                <p className="text-center font-sans-editorial text-[11px] text-[#444748] font-medium">
                  Immediate weight break-up, video consultation & doorstep delivery guidance available.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
