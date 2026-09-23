"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhyUsSection } from "@/components/WhyUsSection";
import { OurStorySection } from "@/components/OurStorySection";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Product } from "@/data/products";
import { ShieldCheck, Award, Sparkles } from "lucide-react";

export default function AboutUsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4]">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      <main className="flex-grow w-full pt-24">
        {/* Banner */}
        <div className="w-full bg-[#f5f3ee] py-16 border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="font-sans-editorial text-xs uppercase tracking-[0.25em] text-[#725b38] block font-bold mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              Our Heritage & Philosophy
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#010101] tracking-tight mb-4">
              Generations of Sacred Silver Craft
            </h1>
            <p className="font-sans-editorial text-sm sm:text-base text-[#444748] leading-relaxed">
              Sri Bhagavathi Silvers stands as a beacon of metallurgical purity, traditional South Indian silversmithing heritage, and transparent hallmark integrity.
            </p>
          </div>
        </div>

        <OurStorySection />
        <WhyUsSection />

        {/* BIS Hallmark Certification & Purity Deep Dive */}
        <section className="w-full bg-[#ffffff] py-16 sm:py-24 border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold">
                  Assaying & Certification
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] font-normal">
                  The 925 BIS Hallmark Promise
                </h2>
                <p className="font-sans-editorial text-sm sm:text-base text-[#444748] leading-relaxed">
                  Every article produced at Sri Bhagavathi Silvers undergoes rigorous laser assay testing at government-authorized center facilities. The official Bureau of Indian Standards (BIS) mark, metallurgical purity seal (925 or 999), and our brand insignia are laser-inscribed into every piece.
                </p>
                <div className="pt-4 flex flex-col gap-3 font-sans-editorial text-xs text-[#010101]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#725b38]" />
                    <span>Transparent weight break-up: Net silver weight vs Tare gemstone weight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#725b38]" />
                    <span>Lifetime purity guarantee & buyback policy on all hallmarked silver</span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[4/3] bg-[#f5f3ee] border border-[#e8e8e8] shadow-lg overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA44lCpazxIH8yCH2520Khg4pCPSC1YOJyis7bwy4N0brunyyI2QjXFSAGiJCcd4W6AMstAZm2DNgtz9mZq3ZgB62zgtRVcGVoHDGLb_SEM3rGS1ZfheFTfHFUOju-RmyPhSkz_iaWMpBZhwpM2hzBy5WUTMxx7zpSVH9p4p4XHP25r0UmRF4OZnSeszIV83yZyN3RqRYGWkZ5UrIqv4CLxF1HM99Z_FFgZv8rppBNw_atF9z9ISVR6"
                  alt="BIS 925 Hallmark certification demonstration"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
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
