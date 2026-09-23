"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  Filter,
  ArrowRight,
  Gift,
  MessageCircle,
  MapPin,
  RefreshCw,
  SlidersHorizontal,
  X,
  Check,
  Eye,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShowroomFinalCTA } from "@/components/ShowroomFinalCTA";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Occasion, getOccasionBySlug, OCCASIONS } from "@/data/occasions";
import { PRODUCTS, Product } from "@/data/products";
import { STORE_CONFIG } from "@/lib/storeConfig";

interface OccasionDetailClientProps {
  occasion: Occasion;
}

export function OccasionDetailClient({ occasion }: OccasionDetailClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Subcategory tab filter
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");

  // Advanced Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Guided Gifting State (for gifting occasion)
  const [giftRecipient, setGiftRecipient] = useState<string>("all");
  const [giftOccasionTag, setGiftOccasionTag] = useState<string>("all");
  const [giftBudget, setGiftBudget] = useState<number>(50000);

  // 1. Initial Products matching this Occasion
  const baseProducts = useMemo(() => {
    return PRODUCTS.filter((p) =>
      p.occasions?.some(
        (o) => o.toLowerCase() === occasion.productTag.toLowerCase()
      )
    );
  }, [occasion]);

  // 2. Filtered Products
  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    // Subcategory filter
    if (selectedSubcategory !== "all") {
      result = result.filter(
        (p) =>
          p.categoryLabel.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
          p.tags?.some((t) => t.toLowerCase().includes(selectedSubcategory.toLowerCase())) ||
          p.name.toLowerCase().includes(selectedSubcategory.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Style Filter
    if (selectedStyle !== "all") {
      result = result.filter((p) => p.style?.includes(selectedStyle));
    }

    // Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // Gifting Guided Filters (if applicable)
    if (occasion.slug === "gifting") {
      if (giftRecipient !== "all") {
        result = result.filter(
          (p) =>
            p.tags?.some((t) => t.toLowerCase().includes(giftRecipient.toLowerCase())) ||
            p.categoryLabel.toLowerCase().includes(giftRecipient.toLowerCase()) ||
            p.name.toLowerCase().includes(giftRecipient.toLowerCase())
        );
      }
      if (giftOccasionTag !== "all") {
        result = result.filter((p) =>
          p.occasions?.some((o) => o.toLowerCase() === giftOccasionTag.toLowerCase())
        );
      }
      result = result.filter((p) => p.price <= giftBudget);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [
    baseProducts,
    selectedSubcategory,
    selectedCategory,
    selectedStyle,
    maxPrice,
    sortBy,
    occasion,
    giftRecipient,
    giftOccasionTag,
    giftBudget,
  ]);

  // Related Occasions
  const relatedOccasions = useMemo(() => {
    return occasion.relatedSlugs
      .map((slug) => getOccasionBySlug(slug))
      .filter((o): o is Occasion => o !== undefined);
  }, [occasion]);

  const handleWhatsAppConsult = () => {
    const text = `Hello Sri Bhagavathi Silvers, I am interested in silver items for ${occasion.name}. Please share details.`;
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4]">
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
            <Link href="/occasions" className="hover:text-[#010101] transition-colors">
              Occasions
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c5a880]" />
            <span className="font-bold text-[#010101] uppercase tracking-wider">
              {occasion.name}
            </span>
          </div>
        </div>

        {/* OCCASION HERO */}
        <section className="relative w-full py-20 lg:py-28 bg-[#0a0b0d] text-[#ffffff] overflow-hidden border-b border-[#c5a880]/20">
          <div className="absolute inset-0 z-0">
            <img
              src={occasion.heroImage || occasion.image}
              alt={occasion.name}
              className="w-full h-full object-cover object-center opacity-35 filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/70 to-transparent" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.25em] font-bold">
                <Sparkles className="w-4 h-4 text-[#c5a880] animate-pulse" />
                <span>{occasion.tagline}</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] tracking-tight font-normal leading-tight">
                {occasion.heroTitle}
              </h1>

              <p className="font-serif-luxury text-lg sm:text-2xl text-[#c5a880] italic max-w-2xl mx-auto">
                {occasion.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* EDITORIAL STORY & SUBCATEGORY FILTER TABS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Editorial Story Box */}
          <div className="bg-[#ffffff] border border-[#e8e8e8] p-6 sm:p-10 shadow-sm mb-10 metallic-sheen">
            <span className="font-sans-editorial text-[10px] uppercase tracking-[0.25em] text-[#725b38] font-bold block mb-2">
              TRADITIONAL SIGNIFICANCE
            </span>
            <h2 className="font-serif-luxury text-2xl text-[#010101] mb-3">
              The Grace of {occasion.name} Silver
            </h2>
            <p className="font-sans-editorial text-sm text-[#444748] leading-relaxed max-w-4xl">
              {occasion.editorialStory}
            </p>
          </div>

          {/* Subcategories Filter Buttons */}
          <div className="mb-8">
            <span className="font-sans-editorial text-xs uppercase tracking-widest text-[#725b38] font-bold block mb-3">
              EXPLORE {occasion.name.toUpperCase()} CATEGORIES
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                suppressHydrationWarning
                onClick={() => setSelectedSubcategory("all")}
                className={`px-4 py-2.5 font-sans-editorial text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                  selectedSubcategory === "all"
                    ? "bg-[#010101] text-[#ffffff] border-[#010101]"
                    : "bg-[#ffffff] text-[#444748] border-[#e8e8e8] hover:border-[#725b38]"
                }`}
              >
                All {occasion.name} Silver ({baseProducts.length})
              </button>
              {occasion.subcategories.map((subcat) => (
                <button
                  key={subcat}
                  suppressHydrationWarning
                  onClick={() => setSelectedSubcategory(subcat)}
                  className={`px-4 py-2.5 font-sans-editorial text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                    selectedSubcategory === subcat
                      ? "bg-[#010101] text-[#ffffff] border-[#010101]"
                      : "bg-[#ffffff] text-[#444748] border-[#e8e8e8] hover:border-[#725b38]"
                  }`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          </div>

          {/* GUIDED GIFT FINDER (IF GIFTING OCCASION) */}
          {occasion.slug === "gifting" && (
            <div className="bg-[#0a0b0d] text-[#ffffff] p-6 sm:p-10 border border-[#c5a880]/30 mb-12 shadow-2xl">
              <div className="flex items-center gap-2 text-[#c5a880] font-sans-editorial text-xs uppercase tracking-[0.2em] font-bold mb-4">
                <Gift className="w-4 h-4 text-[#c5a880]" />
                <span>STEP-BY-STEP GUIDED GIFT FINDER</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans-editorial text-xs">
                {/* Step 1: Recipient */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#c5a880] font-bold mb-2">
                    STEP 1: WHO ARE YOU GIFTING?
                  </label>
                  <select
                    suppressHydrationWarning
                    value={giftRecipient}
                    onChange={(e) => setGiftRecipient(e.target.value)}
                    className="w-full bg-[#161821] text-[#ffffff] p-3 border border-[#ffffff]/20 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="all">Everyone / Any Recipient</option>
                    <option value="baby">For Baby & Children</option>
                    <option value="bride">For Bride & Women</option>
                    <option value="groomsman">For Him / Groom</option>
                    <option value="parents">For Parents & Elders</option>
                    <option value="devotee">For Devotees & Temple</option>
                  </select>
                </div>

                {/* Step 2: Occasion Tag */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#c5a880] font-bold mb-2">
                    STEP 2: CELEBRATION TYPE
                  </label>
                  <select
                    suppressHydrationWarning
                    value={giftOccasionTag}
                    onChange={(e) => setGiftOccasionTag(e.target.value)}
                    className="w-full bg-[#161821] text-[#ffffff] p-3 border border-[#ffffff]/20 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="all">All Celebrations</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Housewarming">Housewarming</option>
                    <option value="Pooja">Pooja & Sanctum</option>
                    <option value="Festival">Festival</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Baby">Baby Birth</option>
                  </select>
                </div>

                {/* Step 3: Budget */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#c5a880] font-bold mb-2">
                    STEP 3: MAX BUDGET (₹{giftBudget.toLocaleString()})
                  </label>
                  <input
                    type="range"
                    min="2000"
                    max="50000"
                    step="1000"
                    value={giftBudget}
                    onChange={(e) => setGiftBudget(Number(e.target.value))}
                    className="w-full accent-[#c5a880]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* DESKTOP FILTERS & SORTING BAR */}
          <div className="bg-[#ffffff] p-4 border border-[#e8e8e8] flex flex-wrap items-center justify-between gap-4 mb-8 font-sans-editorial text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold text-[#010101] uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#725b38]" />
                Filter Products:
              </span>

              {/* Category Filter */}
              <select
                suppressHydrationWarning
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#f5f3ee] p-2 border border-[#e8e8e8] focus:outline-none text-[#010101]"
              >
                <option value="all">All Product Types</option>
                <option value="rings">Silver Rings</option>
                <option value="anklets">Silver Anklets</option>
                <option value="chains">Silver Chains</option>
                <option value="bracelets">Silver Bracelets & Bangles</option>
                <option value="pooja">Pooja Collection</option>
                <option value="necklaces">Silver Necklaces</option>
                <option value="articles">Silver Articles & Dining</option>
                <option value="coins">Silver Coins & Bullion</option>
              </select>

              {/* Style Filter */}
              <select
                suppressHydrationWarning
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-[#f5f3ee] p-2 border border-[#e8e8e8] focus:outline-none text-[#010101]"
              >
                <option value="all">All Styles</option>
                <option value="Traditional">Traditional Heritage</option>
                <option value="Temple">Temple & Kemp</option>
                <option value="Floral">Floral & Botanical</option>
                <option value="Divine">Sacred & Divine</option>
                <option value="Minimal">Minimal & Modern</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-3">
              <span className="text-[#444748]">Sort by:</span>
              <select
                suppressHydrationWarning
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#f5f3ee] p-2 border border-[#e8e8e8] focus:outline-none font-bold text-[#010101]"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Releases</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* PRODUCT GRID */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#ffffff] border border-[#e8e8e8] p-4 flex flex-col justify-between group hover:border-[#725b38] transition-colors duration-300 metallic-sheen"
                >
                  <div>
                    {/* Image Preview */}
                    <div className="relative aspect-square w-full bg-[#f5f3ee] mb-4 overflow-hidden">
                      <span className="absolute top-2 left-2 z-10 bg-[#010101] text-[#ffffff] font-sans-editorial text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold">
                        {product.purityBadge}
                      </span>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          suppressHydrationWarning
                          onClick={() => setSelectedProduct(product)}
                          className="p-3 bg-[#ffffff] text-[#010101] rounded-full hover:bg-[#725b38] hover:text-[#ffffff] transition-colors shadow-md"
                          aria-label="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#725b38] font-bold block mb-1">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-serif-luxury text-base text-[#010101] font-semibold line-clamp-1 mb-1 group-hover:text-[#725b38] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#f0eee9] mt-3 flex items-center justify-between font-sans-editorial">
                    <span className="font-serif-luxury text-lg font-bold text-[#010101]">
                      {product.formattedPrice}
                    </span>
                    <button
                      suppressHydrationWarning
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs uppercase tracking-wider font-bold text-[#725b38] hover:underline flex items-center gap-1"
                    >
                      Quick View <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="bg-[#ffffff] border border-[#e8e8e8] p-12 text-center my-8 max-w-2xl mx-auto space-y-4">
              <Sparkles className="w-8 h-8 text-[#725b38] mx-auto opacity-50" />
              <h3 className="font-serif-luxury text-2xl text-[#010101]">
                No Products Found For This Selection
              </h3>
              <p className="font-sans-editorial text-xs text-[#444748]">
                Try expanding your price range or resetting the subcategory filters to view full catalogue.
              </p>
              <button
                suppressHydrationWarning
                onClick={() => {
                  setSelectedSubcategory("all");
                  setSelectedCategory("all");
                  setSelectedStyle("all");
                  setMaxPrice(50000);
                }}
                className="px-6 py-3 bg-[#010101] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-widest font-bold hover:bg-[#725b38] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* RELATED OCCASIONS SECTION */}
        {relatedOccasions.length > 0 && (
          <section className="bg-[#f5f3ee] border-t border-[#e8e8e8] py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-1">
                  CONTINUE DISCOVERY
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#010101]">
                  YOU MAY ALSO EXPLORE
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedOccasions.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/occasions/${rel.slug}`}
                    className="group bg-[#ffffff] border border-[#e8e8e8] p-6 flex flex-col justify-between hover:border-[#725b38] transition-all shadow-sm hover:shadow-xl metallic-sheen"
                  >
                    <div>
                      <div className="relative aspect-[16/9] w-full bg-[#f5f3ee] mb-4 overflow-hidden">
                        <Image
                          src={rel.heroImage || rel.image}
                          alt={rel.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="font-sans-editorial text-[10px] uppercase tracking-widest text-[#725b38] font-bold block mb-1">
                        {rel.tagline}
                      </span>
                      <h3 className="font-serif-luxury text-xl font-bold text-[#010101] mb-2 group-hover:text-[#725b38]">
                        {rel.name} Silver
                      </h3>
                      <p className="font-sans-editorial text-xs text-[#444748] line-clamp-2">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#f0eee9] mt-4 flex items-center justify-between font-sans-editorial text-xs font-bold text-[#010101] group-hover:text-[#725b38]">
                      <span>View Collection</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* OCCASION SPECIFIC CONCIERGE CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-[#ffffff] p-8 sm:p-12 border border-[#e8e8e8] shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <span className="font-sans-editorial text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold block mb-1">
                CUSTOM OCCASION COMMISSIONS
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#010101] mb-2">
                LOOKING FOR SOMETHING SPECIAL FOR {occasion.name.toUpperCase()}?
              </h3>
              <p className="font-sans-editorial text-xs sm:text-sm text-[#444748] max-w-xl">
                Our master silversmiths craft custom hallmarked bullion coins, engraved thali sets, and bulk return gift boxes tailored to your family celebrations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                suppressHydrationWarning
                onClick={handleWhatsAppConsult}
                className="btn-light-sweep px-6 py-3.5 bg-[#010101] hover:bg-[#725b38] text-[#ffffff] font-sans-editorial text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#c5a880]" />
                <span>TALK TO AN EXPERT</span>
              </button>

              <a
                suppressHydrationWarning
                href={STORE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#f5f3ee] hover:bg-[#e8e8e8] text-[#010101] border border-[#e8e8e8] font-sans-editorial text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#725b38]" />
                <span>VISIT OUR STORE</span>
              </a>
            </div>
          </div>
        </section>

        {/* PRE-FOOTER SHOWROOM CTA */}
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
