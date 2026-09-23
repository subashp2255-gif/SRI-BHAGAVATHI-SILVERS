"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { LiveSilverRateStrip } from "@/components/LiveSilverRateStrip";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { PRODUCTS, Product } from "@/data/products";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, imageReveal } from "@/lib/animations";

export default function CollectionsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [activeCollectionTab, setActiveCollectionTab] = useState<string>("Sanctum & Temple");

  const collections = [
    {
      id: "Sanctum & Temple",
      name: "Sanctum & Temple Series",
      subtitle: "Consecrated Sacred Craftsmanship",
      description: "Cast in pure 999 fine silver and 925 hallmark sterling, featuring divine Kamakshi lamps, kalash pots, and traditional temple Kemp ornaments.",
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebFltOEMAcE6R6mZ6Z1TBZfH4-TijfaIpJ__GrkTG0O29yBaY3abO2Jol3K4nvXyBF1AS-Hez068b7KSVSZYh1KHRXCPQwTUJMAFDani3kGocj-Rz6LWGSXwaVjigaazw-JBmCfAzeQF_u8vBFv0zzFLYnAWTCAT0DeXBM6RE6t2ztp-hodot759T_d38hxC__x7oD3TNdK6TKvh9n4bcwrvRqfAF3wIXdUrrMHuDswNK1MH68jTz",
      story: "Crafted for sanctums and home altars, every piece in this collection reflects centuries of South Indian spiritual metalworking.",
    },
    {
      id: "Royal Silver Heritage",
      name: "Royal Silver Heritage",
      subtitle: "Heirloom Masterpieces & Dining Sets",
      description: "Heavy gauge silver thali plates, traditional kolusu payal anklets, and intricate filigree chains designed as family heirlooms.",
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL4ZHJballUMddbhgvJ07QygDrNZxq2vQ-msqoHsNhByUh7jbOpM6vrXsxNPn-bv3etyswE4p5D8FlXWIbkXViizn276ukWrMdMVxvTG3kc6ZN2GM4abAixgMDSG4cW7A3B1EQm5ZX--xTLPQLPh4PDvu8Lomk5lAERZylDSVs0cLlKYCg_jSlE2K0JyQFBXi1mCnz-IqFnOJTC9no3pXWc_zdYfU4wz3yk8Q2SbiVh8D5bPZIhxD7",
      story: "Inspired by royal South Indian court banquets and heritage bridal ceremonies.",
    },
    {
      id: "Modern Silver",
      name: "Modern Silver Expressions",
      subtitle: "Contemporary Sterling Elegance",
      description: "Clean geometric cocktail rings, engraved temple cuffs, and minimalist everyday chains forged for modern luxury.",
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U",
      story: "Refining traditional motifs into sleek contemporary silhouettes for daily wear.",
    },
  ];

  const currentCollection = collections.find((c) => c.id === activeCollectionTab) || collections[0];

  const collectionProducts = PRODUCTS.filter(
    (p) => p.collection === activeCollectionTab || activeCollectionTab === "all"
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4]">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      <main className="flex-grow w-full pt-20 sm:pt-24">
        {/* Live Silver Rate Strip */}
        <LiveSilverRateStrip />

        {/* Collection Hero */}
        <section className="relative w-full bg-[#010101] text-[#ffffff] py-20 lg:py-28 overflow-hidden border-b border-[#333333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="lg:col-span-6 space-y-6"
              >
                <div className="flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.25em] font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Editorial Campaigns
                </div>

                <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#ffffff] tracking-tight leading-tight">
                  {currentCollection.name}
                </h1>

                <p className="font-sans-editorial text-sm sm:text-base text-[#c4c7c7] leading-relaxed max-w-xl">
                  {currentCollection.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  Official BIS 925 Hallmark & Assay Certified
                </div>
              </motion.div>

              <motion.div
                variants={imageReveal}
                initial="hidden"
                animate="visible"
                className="lg:col-span-6 relative"
              >
                <div className="w-full h-[400px] sm:h-[500px] border border-[#333333] overflow-hidden metallic-sheen">
                  <img
                    src={currentCollection.heroImage}
                    alt={currentCollection.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collection Selection Tabs */}
        <section className="bg-[#f5f3ee] py-6 border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
            {collections.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCollectionTab(c.id)}
                className={`px-6 py-3 font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap border ${
                  activeCollectionTab === c.id
                    ? "bg-[#010101] text-[#ffffff] border-[#010101]"
                    : "bg-[#ffffff] text-[#444748] border-[#e8e8e8] hover:border-[#725b38]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </section>

        {/* Collection Story */}
        <section className="py-12 bg-[#fbf9f4] border-b border-[#e8e8e8]">
          <div className="max-w-3xl mx-auto text-center px-4">
            <span className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-2">
              Collection Narrative
            </span>
            <p className="font-serif-luxury text-xl sm:text-2xl text-[#010101] italic leading-relaxed">
              &ldquo;{currentCollection.story}&rdquo;
            </p>
          </div>
        </section>

        {/* Complete Collection Grid */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e8e8e8]">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101]">
              Collection Catalogue ({collectionProducts.length} pieces)
            </h2>
            <Link
              href="/shop"
              className="font-sans-editorial text-xs uppercase tracking-widest font-bold text-[#010101] hover:text-[#725b38] flex items-center gap-1"
            >
              View Full Shop <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {collectionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </motion.div>
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
        onSelectProduct={setSelectedProduct}
      />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onQuickView={setSelectedProduct}
      />
    </div>
  );
}
