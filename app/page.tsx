"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustStrip } from "@/components/TrustStrip";
import { ExploreSilverSection } from "@/components/ExploreSilverSection";
import { ShopByStyleSection } from "@/components/ShopByStyleSection";
import { OccasionDiscoveryGrid } from "@/components/OccasionDiscoveryGrid";
import { FeaturedCollectionSection } from "@/components/FeaturedCollectionSection";
import { TrendingCarousel } from "@/components/TrendingCarousel";
import { NewArrivalsSection } from "@/components/NewArrivalsSection";
import { GuidedGiftingTool } from "@/components/GuidedGiftingTool";
import { SilverJourneyHorizontal } from "@/components/SilverJourneyHorizontal";
import { OurStorySection } from "@/components/OurStorySection";
import { NeedHelpChoosingSection } from "@/components/NeedHelpChoosingSection";
import { SilverGuideSection } from "@/components/SilverGuideSection";
import { FromOurWorldSection } from "@/components/FromOurWorldSection";
import { StoreLocatorSection } from "@/components/StoreLocatorSection";
import { ShowroomFinalCTA } from "@/components/ShowroomFinalCTA";
import { RecentlyViewed, recordRecentlyViewed } from "@/components/RecentlyViewed";
import { WhatsAppConcierge } from "@/components/WhatsAppConcierge";
import { Footer } from "@/components/Footer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { CustomCursor } from "@/components/CustomCursor";
import { Product } from "@/data/products";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    recordRecentlyViewed(p);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4]">
      {/* Refined Desktop Custom Cursor */}
      <CustomCursor />

      {/* Luxury Mega Navigation Header with Top Rate Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Main E-Commerce Discovery Showroom */}
      <main className="flex-grow w-full pt-28 sm:pt-32">
        {/* 1. HERO */}
        <HeroSection />

        {/* 2. THE BHAGAVATHI PROMISE */}
        <TrustStrip />

        {/* 3. EXPLORE SILVER */}
        <ExploreSilverSection />

        {/* 4. SHOP BY STYLE */}
        <ShopByStyleSection />

        {/* 5. SHOP BY MOMENT */}
        <OccasionDiscoveryGrid />

        {/* 6. FEATURED COLLECTION */}
        <FeaturedCollectionSection />

        {/* 7. TRENDING IN SILVER */}
        <TrendingCarousel onQuickView={handleSelectProduct} />

        {/* 8. NEW ARRIVALS */}
        <NewArrivalsSection onQuickView={handleSelectProduct} />

        {/* 9. GIFTING EXPERIENCE */}
        <GuidedGiftingTool />

        {/* 10. CRAFT & HERITAGE */}
        <SilverJourneyHorizontal />
        <OurStorySection />

        {/* 13. NEED HELP CHOOSING? */}
        <NeedHelpChoosingSection />

        {/* 14. SILVER GUIDE KNOWLEDGE HUB */}
        <SilverGuideSection />

        {/* 15. FROM OUR WORLD */}
        <FromOurWorldSection />

        {/* 16. VISIT US — FLAGSHIP SHOWROOM LOCATION */}
        <StoreLocatorSection />

        {/* 17. PRE-FOOTER SHOWROOM FINAL CONVERSION CTA */}
        <ShowroomFinalCTA />

        {/* 18. RECENTLY VIEWED & CONCIERGE */}
        <RecentlyViewed onQuickView={handleSelectProduct} />
        <WhatsAppConcierge />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Interactive Modals */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={recordRecentlyViewed}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onQuickView={handleSelectProduct}
      />
    </div>
  );
}
