"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, Gift, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShowroomFinalCTA } from "@/components/ShowroomFinalCTA";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { OCCASIONS } from "@/data/occasions";
import { PRODUCTS, Product } from "@/data/products";

export default function OccasionsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4]">
      {/* Mega Navigation */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      <main className="flex-grow w-full pt-20 sm:pt-24">
        {/* BREADCRUMBS */}
        <div className="w-full bg-[#f5f3ee] border-b border-[#e8e8e8] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 font-sans-editorial text-xs text-[#725b38]">
            <Link href="/" className="hover:text-[#010101] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c5a880]" />
            <span className="font-bold text-[#010101] uppercase tracking-wider">
              Occasions
            </span>
          </div>
        </div>

        {/* EDITORIAL HERO */}
        <section className="relative w-full py-20 lg:py-28 bg-[#0a0b0d] text-[#ffffff] overflow-hidden border-b border-[#c5a880]/20">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=2000&q=85"
              alt="Sri Bhagavathi Silvers Occasion Celebrations"
              className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/75 to-transparent" />
          </div>

          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <span className="font-serif-luxury text-[20vw] uppercase tracking-widest text-[#ffffff]/[0.02] whitespace-nowrap font-bold">
              CELEBRATE
            </span>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.25em] font-bold">
                <Sparkles className="w-4 h-4 text-[#c5a880] animate-pulse" />
                <span>CURATED MOMENTS & HEIRLOOMS</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] tracking-tight font-normal leading-tight">
                SILVER FOR EVERY MOMENT
              </h1>

              <p className="font-serif-luxury text-lg sm:text-2xl text-[#c5a880] italic max-w-2xl mx-auto">
                Celebrate meaningful moments with timeless silver.
              </p>

              <p className="font-sans-editorial text-xs sm:text-sm text-[#a4a7a7] max-w-xl mx-auto leading-relaxed pt-2">
                Explore certified 925 sterling & 999 fine silver collections specifically curated for weddings, housewarmings, birth ceremonies, and sacred pooja rituals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* OCCASION CATEGORIES GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#e8e8e8] pb-6 gap-4">
            <div>
              <span className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-1">
                DISCOVER BY CELEBRATION
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-tight">
                SELECT AN OCCASION
              </h2>
            </div>
            <span className="font-sans-editorial text-xs text-[#725b38] font-semibold">
              Certified BIS Hallmarked Silver • 8 Curated Categories
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {OCCASIONS.map((occ) => {
              const productCount = PRODUCTS.filter((p) =>
                p.occasions?.some(
                  (o) => o.toLowerCase() === occ.productTag.toLowerCase()
                )
              ).length;

              return (
                <motion.div key={occ.slug} variants={cardVariants}>
                  <Link
                    href={`/occasions/${occ.slug}`}
                    className="group flex flex-col h-full bg-[#ffffff] border border-[#e8e8e8] overflow-hidden hover:border-[#725b38] transition-all duration-500 shadow-sm hover:shadow-2xl metallic-sheen"
                  >
                    {/* Image Container with Hover Scale */}
                    <div className="relative aspect-[4/3] w-full bg-[#f5f3ee] overflow-hidden">
                      <Image
                        src={occ.heroImage || occ.image}
                        alt={occ.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <span className="absolute top-3 left-3 bg-[#010101]/90 text-[#c5a880] px-2.5 py-1 font-sans-editorial text-[10px] uppercase font-bold border border-[#c5a880]/30 z-10">
                        {productCount > 0 ? `${productCount} PIECES AVAILABLE` : "CURATED COLLECTION"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                      <div>
                        <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#725b38] font-bold block mb-1">
                          {occ.tagline}
                        </span>
                        <h3 className="font-serif-luxury text-xl font-bold text-[#010101] group-hover:text-[#725b38] transition-colors mb-2">
                          {occ.name}
                        </h3>
                        <p className="font-sans-editorial text-xs text-[#444748] line-clamp-3 leading-relaxed">
                          {occ.shortDescription}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#f0eee9] flex items-center justify-between font-sans-editorial text-xs font-bold text-[#010101] group-hover:text-[#725b38]">
                        <span className="uppercase tracking-wider">Explore Collection</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* GUIDED GIFT FINDER BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#0a0b0d] text-[#ffffff] p-8 sm:p-12 border border-[#c5a880]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 metallic-sheen">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold">
                <Gift className="w-4 h-4 text-[#c5a880]" />
                <span>INTERACTIVE GIFTING ASSISTANT</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#ffffff]">
                Need Help Finding the Right Gift?
              </h3>
              <p className="font-sans-editorial text-xs sm:text-sm text-[#a4a7a7] leading-relaxed">
                Use our step-by-step guided gifting experience to filter by recipient, celebration type, and budget threshold.
              </p>
            </div>

            <Link
              href="/occasions/gifting"
              className="btn-light-sweep px-8 py-4 bg-[#c5a880] hover:bg-[#ffffff] text-[#010101] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg flex items-center gap-2 shrink-0"
            >
              <span>LAUNCH GIFT FINDER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* SHOWROOM FINAL CONVERSION CTA */}
        <ShowroomFinalCTA />
      </main>

      <Footer />

      {/* Drawers & Quick View Modals */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onQuickView={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
