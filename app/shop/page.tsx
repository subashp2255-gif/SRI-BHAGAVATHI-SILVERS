"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { LiveSilverRateStrip } from "@/components/LiveSilverRateStrip";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { PRODUCTS, Product } from "@/data/products";
import { ShieldCheck, Filter, Grid3X3, Grid2X2, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { filterDrawer } from "@/lib/animations";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const styleParam = searchParams.get("style") || "all";
  const occasionParam = searchParams.get("occasion") || "all";
  const priceParam = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 50000;

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedStyle, setSelectedStyle] = useState<string>(styleParam);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(occasionParam);
  const [maxPrice, setMaxPrice] = useState<number>(priceParam);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const categoryOptions = [
    { id: "all", label: "All Silvers", count: PRODUCTS.length },
    { id: "rings", label: "Silver Rings", count: 18 },
    { id: "chains", label: "Silver Chains", count: 12 },
    { id: "anklets", label: "Silver Anklets (Kolusu)", count: 14 },
    { id: "bracelets", label: "Silver Bangles & Kadas", count: 16 },
    { id: "pooja", label: "Silver Pooja Articles", count: 22 },
    { id: "necklaces", label: "Antique Necklaces", count: 9 },
    { id: "articles", label: "Silver Articles & Dining", count: 15 },
    { id: "coins", label: "Silver Coins & Bullion", count: 10 },
  ];

  const styleOptions = [
    "all",
    "Traditional",
    "Temple",
    "Floral",
    "Divine",
    "Minimal",
    "Contemporary",
  ];

  const occasionOptions = [
    "all",
    "Wedding",
    "Pooja",
    "Housewarming",
    "Baby",
    "Festival",
    "Anniversary",
    "Gifting",
  ];

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (selectedStyle !== "all" && !p.style?.includes(selectedStyle)) return false;
      if (selectedOccasion !== "all" && !p.occasions?.includes(selectedOccasion)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      list = [...list].sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    return list;
  }, [selectedCategory, selectedStyle, selectedOccasion, maxPrice, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedStyle("all");
    setSelectedOccasion("all");
    setMaxPrice(50000);
  };

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

        {/* Header Catalogue Banner */}
        <div className="w-full bg-[#f5f3ee] py-8 border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="flex flex-col max-w-3xl">
              <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-[#444748] font-sans-editorial text-[11px] uppercase tracking-widest mb-3">
                <Link href="/" className="hover:text-[#010101] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#010101] font-bold">Shop Silver</span>
              </nav>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#010101] text-[#c5a880] flex items-center justify-center font-serif-luxury font-bold text-sm">
                  S
                </div>
                <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101] tracking-tight">
                  Shop Silver
                </h1>
              </div>
              <p className="font-sans-editorial text-sm text-[#444748] mt-2 max-w-2xl">
                Explore certified 92.5 sterling silver jewellery and 999 fine silver pooja articles, hand-finished by master silversmiths in South India.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#ffffff] border border-[#e8e8e8] text-[#725b38] font-sans-editorial text-[11px] uppercase tracking-widest font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>BIS Hallmarked 925 & 999 Fine</span>
              </div>
              <p className="font-sans-editorial text-xs text-[#444748] uppercase tracking-wider">
                Showing <span className="text-[#010101] font-bold">{filteredProducts.length}</span> curated pieces
              </p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar Bar */}
        <div className="w-full bg-[#ffffff] shadow-sm sticky top-20 sm:top-24 z-30 border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-widest font-bold"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#c5a880]" />
                <span>Filter Catalogue</span>
              </button>

              <span className="hidden lg:flex items-center gap-1 text-[#444748] font-sans-editorial text-[11px] uppercase tracking-wider mr-1">
                <Filter className="w-3.5 h-3.5 text-[#725b38]" /> Active Filters:
              </span>

              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f5f3ee] text-[#010101] font-sans-editorial text-xs border border-[#e8e8e8]">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")} aria-label="Clear category">
                    <X className="w-3.5 h-3.5 text-[#747878] hover:text-[#010101]" />
                  </button>
                </span>
              )}

              {selectedStyle !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f5f3ee] text-[#010101] font-sans-editorial text-xs border border-[#e8e8e8]">
                  Style: {selectedStyle}
                  <button onClick={() => setSelectedStyle("all")} aria-label="Clear style">
                    <X className="w-3.5 h-3.5 text-[#747878] hover:text-[#010101]" />
                  </button>
                </span>
              )}

              {selectedOccasion !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f5f3ee] text-[#010101] font-sans-editorial text-xs border border-[#e8e8e8]">
                  Occasion: {selectedOccasion}
                  <button onClick={() => setSelectedOccasion("all")} aria-label="Clear occasion">
                    <X className="w-3.5 h-3.5 text-[#747878] hover:text-[#010101]" />
                  </button>
                </span>
              )}

              {maxPrice < 50000 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f5f3ee] text-[#010101] font-sans-editorial text-xs border border-[#e8e8e8]">
                  Under ₹{maxPrice.toLocaleString('en-IN')}
                  <button onClick={() => setMaxPrice(50000)} aria-label="Reset price filter">
                    <X className="w-3.5 h-3.5 text-[#747878] hover:text-[#010101]" />
                  </button>
                </span>
              )}

              {(selectedCategory !== "all" || selectedStyle !== "all" || selectedOccasion !== "all" || maxPrice < 50000) && (
                <button
                  onClick={resetAllFilters}
                  className="font-sans-editorial text-[11px] uppercase tracking-widest text-[#725b38] hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select-desktop" className="font-sans-editorial text-xs uppercase tracking-wider text-[#444748] hidden sm:inline">
                  Sort By:
                </label>
                <select
                  id="sort-select-desktop"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#f5f3ee] text-[#010101] font-sans-editorial text-xs px-3 py-1.5 border border-[#e8e8e8] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Masterpieces</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center bg-[#f5f3ee] p-1 border border-[#e8e8e8] gap-1">
                <button
                  onClick={() => setGridCols(4)}
                  aria-label="4 columns"
                  className={`p-1.5 transition-all ${
                    gridCols === 4 ? "bg-[#ffffff] text-[#010101] shadow-sm" : "text-[#747878] hover:text-[#010101]"
                  }`}
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  aria-label="3 columns"
                  className={`p-1.5 transition-all ${
                    gridCols === 3 ? "bg-[#ffffff] text-[#010101] shadow-sm" : "text-[#747878] hover:text-[#010101]"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-40 bg-[#fbf9f4]">
              <div className="bg-[#ffffff] p-5 border border-[#e8e8e8] shadow-sm space-y-6">
                <div>
                  <h3 className="font-sans-editorial text-xs uppercase tracking-widest text-[#010101] font-bold pb-2 border-b border-[#e8e8e8] mb-3">
                    Categories
                  </h3>
                  <div className="space-y-1 font-sans-editorial text-xs">
                    {categoryOptions.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between py-1.5 px-2 text-left transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-[#f5f3ee] text-[#010101] font-bold"
                            : "text-[#444748] hover:text-[#010101]"
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className="text-[10px] text-[#747878]">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-sans-editorial text-xs uppercase tracking-widest text-[#010101] font-bold pb-2 border-b border-[#e8e8e8] mb-3">
                    Shop by Style
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {styleOptions.map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStyle(st)}
                        className={`px-2.5 py-1 font-sans-editorial text-xs border transition-colors ${
                          selectedStyle === st
                            ? "bg-[#010101] text-[#ffffff] border-[#010101]"
                            : "bg-[#f5f3ee] text-[#444748] border-[#e8e8e8] hover:border-[#725b38]"
                        }`}
                      >
                        {st === "all" ? "All Styles" : st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-sans-editorial text-xs uppercase tracking-widest text-[#010101] font-bold pb-2 border-b border-[#e8e8e8] mb-3">
                    Shop by Occasion
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {occasionOptions.map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`px-2.5 py-1 font-sans-editorial text-xs border transition-colors ${
                          selectedOccasion === occ
                            ? "bg-[#725b38] text-[#ffffff] border-[#725b38]"
                            : "bg-[#f5f3ee] text-[#444748] border-[#e8e8e8] hover:border-[#725b38]"
                        }`}
                      >
                        {occ === "all" ? "All Occasions" : occ}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-sans-editorial text-xs uppercase tracking-widest text-[#010101] font-bold pb-2 border-b border-[#e8e8e8] mb-3 flex items-center justify-between">
                    <span>Max Price</span>
                    <span className="text-[#725b38]">₹{maxPrice.toLocaleString('en-IN')}</span>
                  </h3>
                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#010101] cursor-pointer"
                  />
                </div>
              </div>
            </aside>

            {/* Product Catalogue Grid */}
            <div className="lg:col-span-9">
              {filteredProducts.length === 0 ? (
                <div className="bg-[#ffffff] p-12 text-center border border-[#e8e8e8]">
                  <p className="font-serif-luxury text-xl text-[#010101] mb-2">No silver pieces match the selected filters.</p>
                  <p className="font-sans-editorial text-sm text-[#444748] mb-4">Try adjusting your filters or price limit.</p>
                  <button
                    onClick={resetAllFilters}
                    className="bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase px-6 py-3 tracking-widest font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-3 sm:gap-6 ${
                    gridCols === 4
                      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom-Sheet Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              variants={filterDrawer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full bg-[#fbf9f4] border-t border-[#e8e8e8] shadow-2xl p-6 z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#e8e8e8] mb-4">
                <h3 className="font-serif-luxury text-lg font-bold text-[#010101]">Filter Catalogue</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-sans-editorial text-xs uppercase font-bold text-[#725b38] mb-2">Category</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryOptions.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`p-2 text-xs text-left font-sans-editorial border ${
                          selectedCategory === c.id ? "bg-[#010101] text-[#ffffff] border-[#010101]" : "bg-[#ffffff] text-[#444748]"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-sans-editorial text-xs uppercase font-bold text-[#725b38] mb-2">Style</h4>
                  <div className="flex flex-wrap gap-2">
                    {styleOptions.map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStyle(st)}
                        className={`px-3 py-1.5 text-xs font-sans-editorial border ${
                          selectedStyle === st ? "bg-[#010101] text-[#ffffff] border-[#010101]" : "bg-[#ffffff] text-[#444748]"
                        }`}
                      >
                        {st === "all" ? "All Styles" : st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e8e8e8] flex gap-3">
                  <button
                    onClick={resetAllFilters}
                    className="w-1/2 py-3 bg-[#f5f3ee] text-[#010101] font-sans-editorial text-xs uppercase font-bold border border-[#e8e8e8]"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-1/2 py-3 bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase font-bold"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbf9f4] flex items-center justify-center font-sans-editorial text-sm">Loading Catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
