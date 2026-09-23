"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { PRODUCTS, Product } from "@/data/products";
import { Sparkles } from "lucide-react";

export default function PoojaAndArticlesPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Filter only pooja and articles items
  const poojaProducts = PRODUCTS.filter(
    (p) => p.category === "pooja" || p.category === "articles"
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4]">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      <main className="flex-grow w-full pt-24">
        {/* Editorial Banner */}
        <div className="w-full bg-[#f5f3ee] py-12 border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="font-sans-editorial text-xs uppercase tracking-[0.25em] text-[#725b38] block font-bold mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              Sacred Sanctum & Tableware
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#010101] tracking-tight mb-4">
              Pooja Collection & Silver Articles
            </h1>
            <p className="font-sans-editorial text-sm sm:text-base text-[#444748] leading-relaxed">
              Consecrated Kamakshi Vilakku deepams, Lakshmi idols, kalash pots, and traditional mirror-polish silver dining thali sets. Each artifact is crafted in 99.9 fine or 92.5 hallmarked silver for sacred worship and royal hospitality.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {poojaProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />

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
